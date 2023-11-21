import React from "react";
import { useLocation } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { GoOrganization } from "react-icons/go";
import {AiFillHome} from "react-icons/ai";
import { useStateContext } from "../../contexts/ContextProvider";
import MenuLink from "../Link/MenuLink";

function Sidebar() {
  const location = useLocation();
  const { role } = useStateContext();
  const roleInt = parseInt(role);
  const { user } = useStateContext();

  const isActive = (route) => {
    return location.pathname === route ? "bg-zinc-300 bg-opacity-50" : "";
  };

  return (
    <aside className="w-60 bg-gray-800 px-4 h-screen fixed z-20">
      <div className="h-20 flex items-center">
        <div className="text-white text-lg font-bold font-['Roboto'] leading-normal">
          Dashboard
        </div>
      </div>
      <MenuLink
        route={`/home`}
        label="Home"
        icon={<AiFillHome color="white" />}
        top_vl="40px"
      />
      <MenuLink
        route={`/portfolio/${user.id}`}
        label="Portfolio"
        icon={<BiUser color="white" />}
        top_vl="40px"
      />
      <MenuLink
        route="/sections"
        label="Sections"
        icon={<GoOrganization color="white" />}
        top_vl="40px"
      />
      {roleInt === 2 && (
        <div>
          <MenuLink
            route="/users"
            label="Users"
            icon={<FiUsers color="white" />}
            top_vl="40px"
          />
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
