import { FC, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="p-4">{children}</div>;
};
