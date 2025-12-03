"use client";

import React, { useCallback, useMemo } from "react";
import Image from "next/image";
import { FaRegComment, FaRetweet } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { Tweet } from "@/gql/graphql";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql-client";
import {
  likeTweetMutation,
  unlikeTweetMutation,
} from "@/graphql/mutations/tweet";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function FeedCard({ data }: { data: Tweet }) {
  const { user: currentUser } = useCurrentUser();
  const queryClient = useQueryClient();
  const router = useRouter();
  const likeMutation = useMutation({
    mutationFn: async() => {
      const res = await graphqlClient.request(likeTweetMutation, {
        id: data.id,
      });
      queryClient.invalidateQueries({ queryKey: ["all-tweets"] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-tweets"] });
    },
    onError: () => {
      toast.error("Failed to like tweet.");
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: () =>
      graphqlClient.request(unlikeTweetMutation, { id: data.id }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-tweets"] });
    },

    onError: () => {
      toast.error("Failed to unlike tweet.");
    },
  });

  const amILiking = useMemo(() => {
    if (!currentUser || !data.likes) return false;
    return data.likes.some((like) => like?.id === currentUser.id);
  }, [currentUser, data.likes]);

  const handleLikeClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      if (!currentUser) return toast.error("Please login to like a tweet.");
      const res = amILiking ? unlikeMutation.mutate() : likeMutation.mutate();
    },
    [amILiking, currentUser, likeMutation, unlikeMutation]
  );

  const handleCardClick = useCallback(() => {
    router.push(`/tweet/${data.id}`);
  }, [router, data.id]);
  return (
    <div
      onClick={handleCardClick}
      className="border-b border-zinc-700 p-4 hover:bg-zinc-900 transition-all duration-200 cursor-pointer"
    >
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-2 sm:col-span-1">
          {data.author?.profileImageUrl && (
            <Link
              href={`/${data.author.id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                className="rounded-full"
                src={data.author.profileImageUrl}
                alt="user-image"
                height={48}
                width={48}
              />
            </Link>
          )}
        </div>

        <div className="col-span-10 sm:col-span-11">
          <h5 className="font-bold text-sm">
            <Link
              href={`/${data.author?.id}`}
              onClick={(e) => e.stopPropagation()}
              className="hover:underline"
            >
              {data.author?.firstName} {data.author?.lastName}
            </Link>
            <span className="text-xs text-zinc-500 font-normal ml-2">
              @{data.author?.email?.split("@")[0]}
            </span>
          </h5>

          <p className="text-sm text-white mt-1">{data.content}</p>

          {data.imageURL && (
            <Image
              width={250}
              height={150}
              src={data.imageURL}
              alt="tweet-image"
              className="rounded-xl mt-3 max-h-[250px] border border-zinc-700 object-cover bg-red-300"
            />
          )}

          <div className="flex justify-between mt-4 text-md text-zinc-500 max-w-[80%]">
            <div className="flex items-center gap-1 group">
              <div className="p-2 group-hover:bg-sky-500/20 group-hover:text-sky-500 rounded-full transition-colors duration-200">
                <FaRegComment />
              </div>
              <span className="text-xs group-hover:text-sky-500">
                {data.comments?.length || 0}
              </span>
            </div>

            <div className="flex items-center gap-1 group">
              <div className="p-2 group-hover:bg-green-500/20 group-hover:text-green-500 rounded-full transition-colors duration-200">
                <FaRetweet />
              </div>
            </div>

            <div
              onClick={handleLikeClick}
              className="flex items-center gap-1 group"
            >
              <div
                className={`p-2 group-hover:bg-red-500/20 group-hover:text-red-500 rounded-full transition-colors duration-200 ${
                  amILiking ? "text-red-500" : "text-zinc-500"
                }`}
              >
                {amILiking ? <FaHeart /> : <CiHeart />}
              </div>
              <span
                className={`text-xs group-hover:text-red-500 ${
                  amILiking ? "text-red-500" : "text-zinc-500"
                }`}
              >
                {data.likes?.length || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedCard;
