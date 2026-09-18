import React from 'react';

export const LoadingSkeleton: React.FC<{ rows?: number }> = ({ rows = 4 }) => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-gray-200 rounded-md w-1/3"></div>
      <div className="h-4 bg-gray-100 rounded-md w-1/2"></div>
      <div className="space-y-2.5 pt-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-lg w-full"></div>
        ))}
      </div>
    </div>
  );
};

