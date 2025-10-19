import React from "react";

function ProfilePageSkeleton() {
  return (
    <div className="grid grid-cols-12 h-screen w-screen sm:px-32">
      <div className="col-span-2 sm:col-span-3 pt-1 flex sm:justify-end pr-4 relative">
      </div>
      <div className="col-span-10 sm:col-span-7 border-x-[0.5px] border-zinc-700 overflow-y-auto">
        <div className="animate-pulse">
          <div className="flex items-center gap-6 p-2 border-b border-zinc-700">
            <div className="w-8 h-8 rounded-full bg-zinc-800"></div>
            <div>
              <div className="h-5 w-24 bg-zinc-800 rounded-md"></div>
              <div className="h-3 w-16 bg-zinc-800 rounded-md mt-2"></div>
            </div>
          </div>

          <div>
            <div className="h-40 sm:h-60 bg-zinc-800"></div>
            <div className="p-4">
              <div className="w-32 h-32 rounded-full -mt-20 border-4 border-black bg-zinc-700"></div>
              <div className="h-8 w-48 bg-zinc-800 rounded-md mt-4"></div>
              <div className="h-4 w-32 bg-zinc-800 rounded-md mt-2"></div>
              <div className="flex gap-4 mt-2">
                <div className="h-4 w-20 bg-zinc-800 rounded-md"></div>
                <div className="h-4 w-20 bg-zinc-800 rounded-md"></div>
              </div>
            </div>
            <div className="flex border-b border-zinc-700 mt-4">
              <div className="flex-1 h-12"></div>
              <div className="flex-1 h-12"></div>
              <div className="flex-1 h-12"></div>
            </div>
          </div>
          <div className="p-4 border-b border-zinc-700">
             <div className="flex space-x-3">
               <div className="w-12 h-12 bg-zinc-800 rounded-full"></div>
               <div className="flex-1 space-y-3 py-1">
                 <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
                 <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
               </div>
             </div>
           </div>
        </div>
      </div>
      <div className="hidden sm:block col-span-0 sm:col-span-2 p-5"></div>
    </div>
  );
};

export default ProfilePageSkeleton;