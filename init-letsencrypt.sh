#!/bin/bash

if ! [ -x "$(command -v docker-compose)" ]; then
  echo 'Error: docker-compose is not installed.' >&2
  exit 1
fi

# IMPORTANT: Replace with your real email address
email="semphas.inc@hotmail.com"

# IMPORTANT: Make sure these domains point to your server's IP address
domains=(semphas.com www.semphas.com)

rsa_key_size=4096
data_path="./certbot"

echo "### Preparing for Let's Encrypt SSL certificate setup for ${domains[*]} ###"
echo "IMPORTANT: Before continuing, please make sure that:"
echo "1. Your domain(s) are pointing to this server's IP address"
echo "2. You've updated the email address in this script"
echo "3. Ports 80 and 443 are open on your firewall"
echo ""
read -p "Continue? (y/N) " decision
if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
  exit
fi

if [ -d "$data_path/conf/live/${domains[0]}" ]; then
  read -p "Existing certificate found. Continue and replace? (y/N) " decision
  if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
    exit
  fi
fi

if [ ! -d "$data_path/conf" ]; then
  mkdir -p "$data_path/conf"
fi

if [ ! -d "$data_path/www" ]; then
  mkdir -p "$data_path/www"
fi

echo "### Creating dummy certificate for ${domains[0]} ..."
path="/etc/letsencrypt/live/${domains[0]}"
mkdir -p "$data_path/conf/live/${domains[0]}"

docker-compose run --rm --entrypoint "\
  openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1\
    -keyout '$path/privkey.pem' \
    -out '$path/fullchain.pem' \
    -subj '/CN=localhost'" certbot

# After creating the dummy certificate, we need to update nginx.conf to use HTTPS
echo "### Updating nginx configuration for HTTPS ..."
cat > frontend/nginx/nginx.conf << EOF
server {
    listen 80;
    server_name ${domains[*]};
    
    # For Let's Encrypt verification
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    # Redirect HTTP to HTTPS
    location / {
        return 301 https://\$host\$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name ${domains[*]};

    # SSL configuration
    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_session_timeout 10m;
    ssl_session_cache shared:SSL:10m;
    ssl_prefer_server_ciphers on;
    
    # Add security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;

    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }
    
    location /api/ {
        proxy_pass http://backend:8000/;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Update docker-compose to mount the certificates
echo "### Updating docker-compose.yml to mount certificates ..."
sed -i.bak 's|# - ./certbot/conf/live/semphas.com:/etc/nginx/ssl:ro|- ./certbot/conf/live/semphas.com:/etc/nginx/ssl:ro|g' docker-compose.yml
if [ $? -ne 0 ]; then
  echo "Could not update docker-compose.yml. Please add the volume mount manually:"
  echo "  volumes:"
  echo "    - ./certbot/conf/live/semphas.com:/etc/nginx/ssl:ro"
fi

echo "### Starting nginx ..."
docker-compose up --force-recreate -d frontend

echo "### Deleting dummy certificate for ${domains[0]} ..."
docker-compose run --rm --entrypoint "\
  rm -Rf /etc/letsencrypt/live/${domains[0]} && \
  rm -Rf /etc/letsencrypt/archive/${domains[0]} && \
  rm -Rf /etc/letsencrypt/renewal/${domains[0]}.conf" certbot

echo "### Requesting Let's Encrypt certificate for ${domains[*]} ..."
domain_args=""
for domain in "${domains[@]}"; do
  domain_args="$domain_args -d $domain"
done

docker-compose run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    $domain_args \
    --email $email \
    --rsa-key-size $rsa_key_size \
    --agree-tos \
    --force-renewal" certbot

echo "### Reloading nginx ..."
docker-compose exec frontend nginx -s reload

echo "### Done! HTTPS is now set up for ${domains[*]}"
echo "Your website should now be accessible at https://${domains[0]}" 