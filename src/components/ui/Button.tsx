import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
  href?: string;
};

export const Button = ({
  children,
  variant = 'primary',
  className = '',
  onClick,
  href,
  ...props
}: ButtonProps) => {
  const baseStyles = 'px-6 py-3 rounded-full font-medium text-lg transition-all duration-200';
  
  const variants = {
    primary: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    secondary: 'bg-white text-gray-900 hover:bg-gray-100 shadow-md',
    outline: 'border-2 border-white text-white hover:bg-white hover:bg-opacity-10',
  };

  const buttonClass = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={buttonClass} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={buttonClass} {...props}>
      {children}
    </button>
  );
};
