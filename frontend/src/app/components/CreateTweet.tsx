"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql-client";
import { createTweetMutation } from "@/graphql/mutations/tweet";
import { getSignedURLForTweetImageQuery } from "@/graphql/queries/tweet";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { FaImage } from "react-icons/fa6";
import axios from "axios";

function CreateTweet () {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(imageFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

const mutation: any = useMutation({
    mutationFn: (payload: { content: string; imageURL?: string }) =>
      graphqlClient.request(createTweetMutation, { payload }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-tweets"] });
      setContent("");
      setImageFile(null);
      toast.success("Tweet posted!");
    },
    onError: () => {
      toast.error("Failed to post tweet. Please try again.");
    },
  });

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setImageFile(file);
  }, []);

  const handleCreateTweet = useCallback(async () => {
    if (!content.trim() && !imageFile) return toast.error("Cannot post an empty tweet.");

    let imageURL = "";
    if (imageFile) {
      toast.loading("Uploading image...", { id: "image-upload" });
      try {
        const data :any = await graphqlClient.request(
          getSignedURLForTweetImageQuery,
          {
            imageName: imageFile.name,
            imageType: imageFile.type,
          }
        );
        let signedURL = data.getSignedURLForTweetImage;

        if (!signedURL) throw new Error("No signed URL received.");

        const formData = new FormData();
        formData.append("file", imageFile);

        const response = await axios.post(signedURL, formData);
        let rawUrl = response.data.secure_url;
        if (rawUrl?.startsWith("http://")) {
          rawUrl = rawUrl.replace("http://", "https://");
        }
        imageURL = rawUrl;
        toast.success("Image uploaded!", { id: "image-upload" });
      } catch (error) {
        toast.error("Failed to upload image.", { id: "image-upload" });
        return;
      }
    }

    mutation.mutate({ content, imageURL });
  }, [content, imageFile, mutation]);

  if (!user) return null;
  const canPost = content.trim().length > 0 || imageFile !== null;

  return (
    <div className="border-b border-gray-600 p-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-shrink-0">
          {user.profileImageUrl && (
            <Image
              className="rounded-full"
              src={user.profileImageUrl}
              alt="user-image"
              height={50}
              width={50}
            />
          )}
        </div>
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-transparent text-lg sm:text-xl px-3 border-b border-slate-700 focus:outline-none resize-none"
            placeholder="What's happening?"
            rows={3}
          />
          {previewUrl && (
            <div className="mt-2 w-full max-w-full">
              <Image
                src={previewUrl}
                alt="tweet-image-preview"
                width={200}
                height={200}
                className="rounded-lg max-w-full h-auto"
              />
            </div>
          )}
          <div className="mt-3 flex justify-between items-center flex-wrap gap-2">
            <label
              htmlFor="image-input"
              className="cursor-pointer text-blue-500 hover:text-blue-400 flex items-center gap-1"
            >
              <FaImage className="text-xl" />
              <span className="hidden sm:inline">Add image</span>
            </label>
            <input
              id="image-input"
              type="file"
              className="hidden"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileSelect}
            />
            <button
              onClick={handleCreateTweet}
              disabled={mutation.isLoading|| !canPost}
              className="bg-[#1d9bf0] font-semibold text-sm py-2 px-4 rounded-full disabled:opacity-50"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTweet;