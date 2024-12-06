import React from "react";

interface ButtonProps {
  className?: string;
  content: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}
export default function Button({ className, content, onClick, type = "button", disabled = false }: ButtonProps) {
  return (
    <button type={type} className={className} onClick={onClick}  disabled={disabled}>
      {content}
    </button>
  );
}