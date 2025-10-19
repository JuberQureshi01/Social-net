"use client";

import {  Comment } from "@/gql/graphql"; 
import Image from "next/image";
import Link from "next/link";


function CommentCard({ data }:{data:Comment}) { 
  return (
    <div className="grid grid-cols-12 gap-3 p-4 border-b border-zinc-700">
      <div className="col-span-1">
        {data.author?.profileImageUrl && (
          <Link href={`/${data.author.id}`}>
            <Image
              src={data.author.profileImageUrl}
              alt="comment-author"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          </Link>
        )}
      </div>
      <div className="col-span-11">
        <h5 className="font-bold text-sm">
          <Link href={`/${data.author?.id}`} className="hover:underline">
            {data.author?.firstName} {data.author?.lastName}
          </Link>
          <span className="text-xs text-zinc-500 font-normal ml-2">
            @{data.author?.email?.split("@")[0]}
          </span>
        </h5>
        <p className="text-sm text-white mt-1">{data.content}</p>
      </div>
    </div>
  );
};

export default CommentCard;