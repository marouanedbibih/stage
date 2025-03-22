import React from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import { Navigate, Outlet } from 'react-router-dom';

function AuthLayout() {
    const { user, token, role } = useStateContext();
    const roleInt = parseInt(role);
  
    if (token) {
      if (roleInt === 1) {
        return <Navigate to={`/users`} />;
      } else if (roleInt === 0) {
        return <Navigate to={`/portfolio/${user.id}`}/>;
      }
    }
    return (
      <div className="bg-light flex flex-col h-screen">
        <div className="w-full h-20 relative bg-white shadow" />
        <div className="w-full flex-1 flex justify-center items-center">
          <Outlet />
        </div>
      </div>
    );
}

export default AuthLayout