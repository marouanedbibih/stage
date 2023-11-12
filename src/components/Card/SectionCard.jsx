import React from "react";
import { Link } from "react-router-dom";
import defaultCoverImage from "../../../public/images/cover.webp";
import defaultProfile1 from "../../../public/images/profile-1.jpg";
import defaultProfile2 from "../../../public/images/profile-2.jpg";

function SectionCard({ section, onDeleteClick }) {
  const {
    id,
    name,
    description,
    cover_image: coverImage = defaultCoverImage,
    user = [],
  } = section;

  const renderProfileImages = () => {
    console.log('Users',user)
    // if (user.length === 0) {
    //   // Return default profile images if users data is not available
    //   return (
    //     <>
    //       <img
    //         alt="Default Profile 1"
    //         src={defaultProfile1}
    //         className="inline-block object-cover object-center border-2 border-white rounded-full h-9 w-9 hover:z-10"
    //       />
    //       {/* <img
    //         alt="Default Profile 2"
    //         src={defaultProfile2}
    //         className="inline-block object-cover object-center border-2 border-white rounded-full h-9 w-9 hover:z-10"
    //       /> */}
    //     </>
    //   );
    // }
    return user
      .slice(0, 2)
      .map((u) => (
        <img
          key={u.id}
          alt={u.name}
          src={
            `${import.meta.env.VITE_API_BASE_URL}/${u.image}` ||
            defaultProfile1
          }
          className="inline-block object-cover object-center border-2 border-white rounded-full h-9 w-9 hover:z-10"
          data-tooltip-target="author-2"
        />
      ));
  };

  const truncatedDescription = description.substring(0, 50);

  return (
    <div className="flex max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md hover:scale-105 duration-500">
      <div className="m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
        <img
          src={`${import.meta.env.VITE_API_BASE_URL}/${coverImage}`}
          alt={name}
          className="w-[24rem] h-[16rem] object-cover"
        />
      </div>
      <div className="p-6">
        <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {name}
        </h4>
        <p className="block mt-3 font-sans text-xl antialiased font-normal leading-relaxed text-gray-700">
          {truncatedDescription}
        </p>
      </div>
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center -space-x-3">
          {renderProfileImages()}
        </div>
        <div className="flex space-x-2">
          <Link
            to={`/section/${id}`} // Replace with the correct route for viewing a section
            className="whitespace-normal break-words rounded-lg bg-gray-800 hover:bg-gray-700 active:bg-gray-900 py-1.5 px-3 font-['Roboto'] text-sm text-white focus:outline-none"
          >
            View
          </Link>
          <Link
            to={"/sections/update/" + id}
            className="w-auto px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 rounded-lg shadow justify-center items-center gap-2 flex"
          >
            <div className="text-white text-xs font-bold font-['Roboto'] uppercase leading-[18px]">
              Edit
            </div>
          </Link>
          <button
            onClick={() => onDeleteClick(section)}
            className="w-auto px-3.5 py-2 bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-lg shadow justify-center items-center gap-2 flex"
          >
            <div className="text-white text-xs font-bold font-['Roboto'] uppercase leading-[18px]">
              Delete
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SectionCard;
