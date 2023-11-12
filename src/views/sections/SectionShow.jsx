import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axios";
import { useParams } from "react-router-dom";
import ResponsableCard from "../../components/Card/ResponsableCard";

function SectionShow() {
  const [section, setSection] = useState({});
  const [responsables, setResponsables] = useState([]);
  let { id } = useParams();

  const backgroundImageStyle = {
    backgroundImage: `url(${import.meta.env.VITE_API_BASE_URL}/${
      section.cover_image
    })`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  useEffect(() => {
    getSections();
    getResponsables();
  }, [id]); // Include id in the dependency array to fetch data when id changes

  const getSections = () => {
    axiosClient
      .get(`/sections/${id}`)
      .then(({ data }) => {
        console.log("Section", data.section);
        setSection(data.section);
      })
      .catch((error) => {
        console.error("Error fetching section:", error);
      });
  };
  const getResponsables = () => {
    axiosClient
      .get(`/sections/${id}/responsables`)
      .then(({ data }) => {
        console.log("Responsables", data.responsables);
        setResponsables(data.responsables);
      })
      .catch((error) => {
        console.error("Error fetching section:", error);
      });
  };

  if (!section) {
    // If section is still undefined, return null or loading indicator
    return null;
  }

  return (
    <div>
      <div className="w-full h-[601px] relative" style={backgroundImageStyle}>
        <div className="w-full h-[601px] left-0 top-0 absolute bg-black bg-opacity-50" />
        <div className="w-1/2 left-[102.05px] top-[192px] absolute text-white text-5xl font-bold font-['Roboto'] leading-[72px]">
          {section.name}
        </div>
        <div className="w-1/2 left-[102.05px] top-[264px] absolute text-white text-xl font-medium font-['Roboto'] leading-[30px] ">
          {section.description}
        </div>
      </div>
      <div className="w-full h-[183px] flex-col justify-center items-center inline-flex">
        <div className="w-full justify-center items-center inline-flex">
          <div className="grow shrink basis-0 text-center text-neutral-800 text-5xl font-extrabold font-['Roboto'] leading-[64px]">
            The Executive Team
          </div>
        </div>
        <div className="w-full pb-4 justify-center items-center inline-flex">
          <div className="grow shrink basis-0 text-center text-slate-500 text-lg font-normal font-['Roboto'] leading-loose">
            This is the paragraph where you can write more details about your
            team. Keep you user engaged <br />
            by providing meaningful information.
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 gap-8">
        {responsables.map((responsable) => (
          <ResponsableCard key={responsable.id} responsable={responsable} />
        ))}
      </div>
    </div>
  );
}

export default SectionShow;
