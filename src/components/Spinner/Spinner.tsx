import React from "react";

interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <div className={className}>
      <div className="w-10 h-10  animate-spin bg-gray-600" />
    </div>
  );
}
