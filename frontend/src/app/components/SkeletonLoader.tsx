export const SkeletonLoader = () => (
  <div className="p-4 border-b border-zinc-700 animate-pulse">
    <div className="flex space-x-3">
      <div className="w-12 h-12 bg-zinc-700 rounded-full"></div>
      <div className="flex-1 space-y-3 py-1">
        <div className="h-4 bg-zinc-700 rounded w-3/4"></div>
        <div className="h-4 bg-zinc-700 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);