import * as React from "react";

// Type for the props
interface NavbarProps {
  className?: string;  
  content: React.ReactNode;  
}

export const Navbar: React.FC<NavbarProps> = ({ className = "", content }) => {
  return (
    <div
      className={`
        bg-white 
        rounded 
        shadow-md 
        px-4 
        sm:px-6 
        md:px-8 
        py-2 
        sm:py-3 
        md:py-4 
        z-50 
        m-4 
        sm:m-3 
        md:m-4 
        fixed 
        w-[95%] 
        sm:w-[90%] 
        md:w-[85%] 
        mx-auto 
        left-1/2 
        transform 
        -translate-x-1/2
        ${className}  // Concatenate custom className
      `}
    >
      {content}  
    </div>
  );
};
