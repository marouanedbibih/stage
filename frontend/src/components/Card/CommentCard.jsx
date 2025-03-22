import React from "react";

function CommentCard({ comment }) {
    console.log(comment)
  return (
    <div class="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border my-4">
      <div class="p-6">
        <img
          className="w-16 h-16 rounded-[40px]"
          src={`${import.meta.env.VITE_API_BASE_URL}/${comment.user.image}`}
        />
        <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {comment.user.name}
        </h5>
        <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            {comment.comment}
        </p>
      </div>
    </div>

  );
}

export default CommentCard;
