import React from "react";

interface ButtonProps {
  className?: string;
  content: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({ className, content, onClick, type = "button" }: ButtonProps) {
  return (
    <button type={type} className={className} onClick={onClick}>
      {content}
    </button>
  );
}