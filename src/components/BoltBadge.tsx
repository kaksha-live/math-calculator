import React from 'react';

interface BoltBadgeProps {
  className?: string;
  isDarkMode?: boolean;
}

const BoltBadge: React.FC<BoltBadgeProps> = ({ className, isDarkMode }) => {
  const badgeSrc = isDarkMode 
    ? '/white_circle_360x360.png'
    : '/black_circle_360x360.png';

  const defaultClasses = "transition-all duration-300 hover:opacity-80 hover:scale-105";

  return (
    <a 
      href="https://bolt.new/" 
      target="_blank" 
      rel="noopener noreferrer"
      className={`${defaultClasses} ${className || ''}`}
      title="Powered by Bolt.new"
    >
      <img 
        src={badgeSrc}
        alt="Powered by Bolt.new" 
        className="w-full h-full object-contain drop-shadow-sm"
      />
    </a>
  );
};

export default BoltBadge;