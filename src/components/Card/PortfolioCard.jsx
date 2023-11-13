import React from "react";

function PortfolioCard({ user }) {
  return (
    <div class="flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border justify-center items-center">
      <div class="mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg h-80 w-80 rounded-full bg-clip-border">
        <img
          src={`${import.meta.env.VITE_API_BASE_URL}/${user.image}`}
          alt="profile-picture"
        />
      </div>
      <div class="p-6 text-center">
        <h4 class="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {user.name}
        </h4>
        <p class="block font-sans text-base antialiased font-medium leading-relaxed text-transparent bg-gradient-to-tr from-gray-600 to-gray-400 bg-clip-text">
          {user.email}
        </p>
      </div>
    </div>
  );
}

export default PortfolioCard;
