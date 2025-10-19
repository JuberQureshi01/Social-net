export const TweetDetailSkeleton = () => (
  <div className="animate-pulse">
    <div className="flex items-center gap-6 p-2 border-b border-zinc-700">
      <div className="w-8 h-8 rounded-full bg-zinc-800"></div>
      <div className="h-6 w-20 bg-zinc-800 rounded-md"></div>
    </div>
    <div className="p-4 border-b border-zinc-700">
      <div className="flex space-x-3">
        <div className="w-12 h-12 bg-zinc-800 rounded-full"></div>
        <div className="flex-1 space-y-3 py-1">
          <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
          <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
          <div className="h-24 bg-zinc-800 rounded-lg w-full"></div>
        </div>
      </div>
    </div>
    <div className="p-4 border-b border-zinc-700">
      <div className="flex space-x-3">
        <div className="w-10 h-10 bg-zinc-800 rounded-full"></div>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
          <div className="h-4 bg-zinc-800 rounded w-full"></div>
        </div>
      </div>
    </div>
  </div>
);