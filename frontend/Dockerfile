# Step 1: Build the React app
FROM node:18 AS build

COPY ./package.json ./package-lock.json ./
RUN npm install
COPY ./ ./
RUN npm run build

# Step 2: Serve the React app
FROM nginx:alpine

# Copy the custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built app to nginx html directory
COPY --from=build /build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
