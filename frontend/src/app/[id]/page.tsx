"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql-client";
import { getUserByIdQuery } from "@/graphql/queries/user";
import {
  followUserMutation,
  unfollowUserMutation,
} from "@/graphql/mutations/user";
import { User } from "@/gql/graphql";
import  LeftSidebar  from "../components/LeftSidebar";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import ProfilePageSkeleton from "../components/ProfilePageSkeleton";
import RenderContent from "./RenderContent";

type ProfileTab = "tweets" | "replies" | "likes";

export default function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { user: currentUser } = useCurrentUser();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ProfileTab>("tweets");

  const { data: userProfile, isLoading } = useQuery<User, Error>({
    queryKey: ["user-profile", params.id],
    queryFn: () =>
      graphqlClient
        .request(getUserByIdQuery, { id: params.id })
        .then((data: any) => data.getUserById as User),
    enabled: !!params.id,
  });

  const amIFollowing = useMemo(() => {
    if (!userProfile || !currentUser) return false;
    return (
      currentUser.following?.some((el: any) => el?.id === userProfile.id) ??
      false
    );
  }, [currentUser, userProfile]);

  const followMutation = useMutation({
    mutationFn: () =>
      graphqlClient.request(followUserMutation, { to: userProfile!.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      queryClient.invalidateQueries({ queryKey: ["user-profile", params.id] });
      toast.success(`You are now following ${userProfile?.firstName}`);
    },
    onError: () => toast.error("Failed to follow user."),
  });

  const unfollowMutation = useMutation({
    mutationFn: () =>
      graphqlClient.request(unfollowUserMutation, { to: userProfile!.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      queryClient.invalidateQueries({ queryKey: ["user-profile", params.id] });
      toast.success(`You have unfollowed ${userProfile?.firstName}`);
    },
    onError: () => toast.error("Failed to unfollow user."),
  });

  const handleFollowClick = () => {
    if (!userProfile) return;
    if (amIFollowing) {
      unfollowMutation.mutate();
    } else {
      followMutation.mutate();
    }
  };

  if (isLoading)
    return <ProfilePageSkeleton/>
  if (!userProfile)
    return <div className="p-4 text-center">User not found.</div>;

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
          <div>
            <h1 className="text-lg font-bold">
              {userProfile.firstName} {userProfile.lastName}
            </h1>
            <p className="text-xs text-zinc-500">
              {userProfile.tweets?.length || 0} Tweets
            </p>
          </div>
        </div>

        <div>
          <div className="h-40 sm:h-60 relative"></div>
          <div className="flex justify-between items-start p-4">
            {userProfile.profileImageUrl ? (
              <Image
                src={userProfile.profileImageUrl}
                alt="user-profile-image"
                className="rounded-full -mt-16 sm:-mt-20 border-4 border-black"
                width={120}
                height={120}
              />
            ) : (
              <div className="w-[120px] h-[120px] rounded-full -mt-16 sm:-mt-20 border-4 border-black bg-zinc-800"></div>
            )}

            {currentUser?.id !== userProfile.id && (
              <button
                onClick={handleFollowClick}
                disabled={
                  followMutation.isPending || unfollowMutation.isPending
                }
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors duration-200 ${
                  amIFollowing
                    ? "bg-transparent text-white border border-white hover:bg-red-900/40"
                    : "bg-white text-black hover:bg-white/90"
                } disabled:opacity-50`}
              >
                {amIFollowing ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>

          <div className="px-4 mt-2">
            <h1 className="text-2xl font-bold">
              {userProfile.firstName} {userProfile.lastName}
            </h1>
            <p className="text-sm text-zinc-500">
              @{userProfile.email?.split("@")[0]}
            </p>
            <div className="flex gap-4 mt-2 text-sm text-zinc-500">
              <span>
                <span className="font-bold text-white">
                  {userProfile.followers?.length || 0}
                </span>{" "}
                Followers
              </span>
              <span>
                <span className="font-bold text-white">
                  {userProfile.following?.length || 0}
                </span>{" "}
                Following
              </span>
            </div>
          </div>
          <div className="flex border-b border-zinc-700 mt-4">
            <div
              onClick={() => setActiveTab("tweets")}
              className={`flex-1 text-center font-semibold p-4 hover:bg-zinc-800 cursor-pointer ${
                activeTab === "tweets"
                  ? "border-b-2 border-blue-500 text-white"
                  : "text-zinc-500"
              }`}
            >
              Tweets
            </div>
            <div
              onClick={() => setActiveTab("replies")}
              className={`flex-1 text-center font-semibold p-4 hover:bg-zinc-800 cursor-pointer ${
                activeTab === "replies"
                  ? "border-b-2 border-blue-500 text-white"
                  : "text-zinc-500"
              }`}
            >
              Replies
            </div>
            <div
              onClick={() => setActiveTab("likes")}
              className={`flex-1 text-center font-semibold p-4 hover:bg-zinc-800 cursor-pointer ${
                activeTab === "likes"
                  ? "border-b-2 border-blue-500 text-white"
                  : "text-zinc-500"
              }`}
            >
              Likes
            </div>
          </div>
        </div>

        <div>{RenderContent({activeTab,userProfile})}</div>
      </div>
      <div className="hidden sm:block col-span-0 sm:col-span-2 p-5"></div>
    </div>
  );
}
