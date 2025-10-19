"use client";
import Link from "next/link";
import { Tweet, User } from "@/gql/graphql";
import  FeedCard  from "../components/FeedCard";

const RenderContent = ({
  activeTab,
  userProfile,
}: {
  activeTab: string;
  userProfile: User;
}) => {
  switch (activeTab) {
    case "tweets":
      if (
        userProfile &&
        (!userProfile.tweets || userProfile.tweets.length === 0)
      ) {
        return (
          <div className="p-8 text-center text-zinc-500">
            This user has no tweets.
          </div>
        );
      }
      return (
        userProfile?.tweets &&
        userProfile.tweets.map((tweet) => (
          <FeedCard data={tweet as Tweet} key={tweet?.id} />
        ))
      );

    case "replies":
      if (
        userProfile &&
        (!userProfile.comments || userProfile.comments.length === 0)
      ) {
        return (
          <div className="p-8 text-center text-zinc-500">
            This user has no replies.
          </div>
        );
      }
      return (
        userProfile?.comments &&
        userProfile.comments.map((comment) => (
          <div
            key={comment?.id}
            className="p-4 border-b border-zinc-700 hover:bg-zinc-900/50"
          >
            <p className="text-sm text-zinc-500">
              Replied to{" "}
              <Link
                href={`/tweet/${comment?.tweet?.id}`}
                className="text-blue-500 hover:underline"
              >
                a tweet
              </Link>
            </p>
            <p className="text-white mt-1">{comment?.content}</p>
          </div>
        ))
      );

    case "likes":
      if (
        userProfile &&
        (!userProfile.likes || userProfile.likes.length === 0)
      ) {
        return (
          <div className="p-8 text-center text-zinc-500">
            This user hasn't liked any tweets.
          </div>
        );
      }
      return (
        userProfile?.likes &&
        userProfile.likes.map(
          (like) =>
            like?.tweet && (
              <FeedCard data={like.tweet as Tweet} key={like.tweet.id} />
            )
        )
      );

    default:
      return null;
  }
};

export default RenderContent;
