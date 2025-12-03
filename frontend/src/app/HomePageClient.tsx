"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useInfiniteQuery } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql-client";
import { getAllTweetsQuery } from "@/graphql/queries/tweet";
import { Tweet } from "@/gql/graphql";
import FeedCard from "./components/FeedCard";
import CreateTweet from "./components/CreateTweet";
import LeftSidebar from "./components/LeftSidebar";
import { useEffect, useRef } from "react";
import { SkeletonLoader } from "./components/SkeletonLoader";

const TWEET_LIMIT = 10;

export function HomePageClient() {
  const { user } = useCurrentUser();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null); 

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["all-tweets"],
      queryFn: async ({ pageParam = 0 }) => {
        try {
          const skip = pageParam * TWEET_LIMIT;
          const data: any = await graphqlClient.request(getAllTweetsQuery, {
            skip,
            take: TWEET_LIMIT,
          });
          return data.getAllTweets as Tweet[];
        } catch (error) {
          console.error("Error fetching tweets:", error);
          throw error;
        }
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === TWEET_LIMIT) {
          return allPages.length;
        }
        return undefined;
      },
    });

  useEffect(() => {
    if (!containerRef.current || !bottomRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      {
        root: containerRef.current,            
        rootMargin: "0px 0px 200px 0px",     
        threshold: 0.1,                      
      }
    );

    observer.observe(bottomRef.current);
    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage]);

  const tweets = data?.pages.flatMap((page) => page) ?? [];

  return (
    <div className="grid grid-cols-12 h-screen w-screen sm:px-32">
      <div className="col-span-2 sm:col-span-3 pt-1 flex sm:justify-end pr-4 relative">
        <LeftSidebar user={user} />
      </div>

      <div
        ref={containerRef}
        className="col-span-10 sm:col-span-5 border-x-[0.5px] border-zinc-700 overflow-y-scroll"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <CreateTweet />
        {isLoading && (
          <>
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </>
        )}
        {isError && (
          <div className="p-4 text-red-500 text-center">
            Error loading tweets.
          </div>
        )}

        {!isLoading &&
          tweets.map((tweet) =>
            tweet ? <FeedCard key={tweet.id} data={tweet} /> : null
          )}

        {!isLoading && hasNextPage && (
          <div ref={bottomRef} style={{ height: "60px" }} />
        )}
      </div>
      <div className="col-span-0 hidden sm:block sm:col-span-4 p-5 ">
        <span className="text-xl">People You Would Like to Follow</span>
        <p className="flex items-center justify-center text-zinc-500 h-full">Currently No Data Available</p>
      </div>
    </div>
  );
}
