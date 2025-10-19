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
  const bottomRef = useRef(null);

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
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => {
      if (bottomRef.current) observer.unobserve(bottomRef.current);
    };
  }, [bottomRef, hasNextPage, fetchNextPage]);

  const tweets = data?.pages.flatMap((page) => page) ?? [];

  return (
    <div className="grid grid-cols-12 h-screen w-screen sm:px-32">
      <div className="col-span-2 sm:col-span-3 pt-1 flex sm:justify-end pr-4 relative">
        <LeftSidebar user={user} />
      </div>
      <div className="col-span-10 sm:col-span-7 border-x-[0.5px] border-zinc-700 overflow-y-scroll">
        {user && <CreateTweet />}
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
          <div ref={bottomRef} style={{ height: "1px" }} />
        )}
      </div>
      <div className="col-span-0 sm:col-span-2 p-5">
      </div>
    </div>
  );
}
