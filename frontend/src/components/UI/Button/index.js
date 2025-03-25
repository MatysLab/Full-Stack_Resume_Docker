import React from 'react';
import './styles.css';

/**
 * Button component for consistent button styling across the application
 * 
 * @param {Object} props - Component props
 * @param {string} props.variant - Button variant (primary, secondary, outline)
 * @param {string} props.size - Button size (small, medium, large)
 * @param {boolean} props.fullWidth - Whether the button should take full width
 * @param {Function} props.onClick - Click handler function
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.rest - Additional props to pass to the button element
 */
function Button({ 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false, 
  onClick, 
  children, 
  className = '',
  ...rest 
}) {
  const buttonClasses = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? 'btn-full-width' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={buttonClasses} 
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;