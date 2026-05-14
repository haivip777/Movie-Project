import React from 'react';

const SkeletonCard = () => {
  return (
    <div className='movie-card animate-pulse border border-white/5'>
      <div className="w-full aspect-[2/3] bg-dark-100/80 rounded-lg"></div>
      <div className="mt-4">
        <div className="h-5 bg-dark-100/80 rounded w-3/4"></div>
        <div className="content mt-3 flex items-center gap-2">
          <div className="h-4 bg-dark-100/80 rounded w-10"></div>
          <span>•</span>
          <div className="h-4 bg-dark-100/80 rounded w-6"></div>
          <span>•</span>
          <div className="h-4 bg-dark-100/80 rounded w-10"></div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonList = ({ count = 8 }) => {
  return (
    <ul>
      {Array(count).fill(0).map((_, index) => (
        <li key={index}><SkeletonCard /></li>
      ))}
    </ul>
  );
};
