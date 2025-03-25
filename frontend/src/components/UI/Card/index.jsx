import React from 'react';
import './styles.css';

/**
 * Card component for consistent card styling across the application
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.hoverable - Whether the card should have hover effects
 * @param {Object} props.rest - Additional props to pass to the div element
 */
function Card({ children, className = '', hoverable = false, ...rest }) {
  const cardClasses = [
    'card',
    hoverable ? 'card-hoverable' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
}

export default Card;