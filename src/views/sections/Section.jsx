import React, { useEffect, useState } from "react";
import SectionHeader from "../../components/Header/SectionHeader";
import SectionCard from "../../components/Card/SectionCard";
import axiosClient from "../../api/axios";
import { Navigate, useNavigate } from "react-router-dom";

function Section() {
  const [sections, setSections] = useState([]);


  useEffect(() => {
    getSectionsForMenu();
  }, []);

  const getSectionsForMenu = () => {
    axiosClient
      .get("/getSectionsWithResponsables")
      .then((response) => {
        setSections(response.data.sections);
        // console.log(response.data.sections)
      })
      .catch((error) => {
        console.error("Error fetching sections:", error);
      });
  };

  const onDeleteClick = (section) => {
    if (!window.confirm("Are you sure you want to delete this section ?")) {
      return;
    }
    axiosClient
      .delete(`/sections/${section.id}`)
      .then(() => {
        // displayNotification("User was successfully deleted");
        getSectionsForMenu();
    })
      .catch((error) => {
        console.error(error);
      });
  };
  console.log('Sections',sections)

  return (
    <div className="grid grid-cols-1 justify-items-center content-center gap-4">
      <SectionHeader />
      <div className="grid grid-cols-3 gap-16">
        {sections.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </div>
    </div>
  );
}

export default Section;
