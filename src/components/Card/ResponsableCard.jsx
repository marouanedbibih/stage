import React from "react";

function ResponsableCard({responsable}) {
  return (
    <div class="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-none p-8">
      <div class="relative flex items-center gap-4 pt-0 pb-8 mx-0 mt-4 overflow-hidden text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
        <img
          src={`${import.meta.env.VITE_API_BASE_URL}/${responsable.image}`}
          class="relative inline-block h-[58px] w-[58px] !rounded-full object-cover object-center"
        />
        <div class="flex w-full flex-col gap-0.5">
          <div class="flex items-center justify-between">
            <h5 class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {responsable.name}
            </h5>
          </div>
          <p class="block font-sans text-base antialiased font-light leading-relaxed text-blue-gray-900">
            {responsable.email}
          </p>
        </div>
      </div>

    </div>
  );
}

export default ResponsableCard;
