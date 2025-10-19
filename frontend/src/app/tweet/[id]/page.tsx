"use client";

import  LeftSidebar  from "../../components/LeftSidebar";
import  FeedCard  from "../../components/FeedCard";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { graphqlClient } from "@/lib/graphql-client";
import { getTweetByIdQuery } from "@/graphql/queries/tweet";
import { createCommentMutation } from "@/graphql/mutations/comment";
import { Tweet } from "@/gql/graphql"; 
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { TweetDetailSkeleton } from "@/app/components/TweetDetailSkeleton";
import CommentCard from "@/app/components/CommentCard";



export default function TweetDetailPage({ params }: { params: { id: string } }) {
  const { user: currentUser } = useCurrentUser();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [commentContent, setCommentContent] = useState("");

  const { data: tweet, isLoading } = useQuery({
    queryKey: ["tweet", params.id],
    queryFn: () =>
      graphqlClient
        .request(getTweetByIdQuery, { id: params.id })
        .then((data: any) => data.getTweetById as Tweet),
    enabled: !!params.id,
  });

  const commentMutation = useMutation({
    mutationFn: (payload: { content: string; tweetId: string }) =>
      graphqlClient.request(createCommentMutation, { payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tweet", params.id] });
      setCommentContent("");
      toast.success("Your reply was sent!");
    },
    onError: () => toast.error("Failed to post reply."),
  });

  const handleCreateComment = useCallback(() => {
    if (!commentContent.trim()) return;
    commentMutation.mutate({
      content: commentContent,
      tweetId: params.id,
    });
  }, [commentContent, commentMutation, params.id]);

  if (isLoading)
    return (
      <div className="grid grid-cols-12 h-screen w-screen sm:px-32">
        <div className="col-span-2 sm:col-span-3 pt-1 flex sm:justify-end pr-4 relative">
          <LeftSidebar user={currentUser} />
        </div>
        <div className="col-span-10 sm:col-span-7 border-x border-zinc-700">
          <TweetDetailSkeleton />
        </div>
      </div>
    );

  if (!tweet) return <div className="p-4 text-center">Tweet not found.</div>;

  return (
    <div className="grid grid-cols-12 h-screen w-screen sm:px-32">
      <div className="col-span-2 sm:col-span-3 pt-1 flex sm:justify-end pr-4 relative">
        <LeftSidebar user={currentUser} />
      </div>

      <div className="col-span-10 sm:col-span-7 border-x-[0.5px] border-zinc-700 overflow-y-auto">
        <div className="flex items-center gap-6 p-2 border-b border-zinc-700 sticky top-0 bg-black/80 backdrop-blur-md z-10">
          <div
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-zinc-800 cursor-pointer"
          >
            <IoArrowBack />
          </div>
          <h1 className="text-lg font-bold">Post</h1>
        </div>

        <FeedCard data={tweet} />

        {currentUser && (
          <div className="p-4 border-b border-zinc-700 flex items-start gap-3">
            {currentUser.profileImageUrl && (
              <Image
                src={currentUser.profileImageUrl}
                alt="current-user-avatar"
                height={40}
                width={40}
                className="rounded-full"
              />
            )}
            <div className="flex-1">
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                rows={2}
                className="w-full bg-transparent text-lg focus:outline-none resize-none"
                placeholder="Post your reply"
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleCreateComment}
                  disabled={!commentContent.trim() || commentMutation.isPending}
                  className="bg-[#1d9bf0] hover:bg-opacity-90 text-white font-semibold px-4 py-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        )}

        {tweet.comments?.map(
          (comment) =>
            comment && <CommentCard key={comment.id} data={comment} />
        )}
      </div>

      <div className="hidden sm:block col-span-0 sm:col-span-2 p-5" />
    </div>
  );
}
