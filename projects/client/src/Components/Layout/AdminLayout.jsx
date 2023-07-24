import React, { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';

export const AdminLayout = (props) => {
  const { user } = useSelector((state) => state.user);
  console.log(props);
  useEffect(() => {
    setTimeout(
      () => {
        //   props.setAuthStorage(JSON.parse(localStorage.getItem('auth')));
        //   checkToken();
      },
      5 * 60 * 1000,
    );
  }, []);
  // console.log('layout', user);
  // if (!user) return <Navigate to={'/login'} />;

  return (
    <div className="flex ">
      <Sidebar />
      <div
        className="lg:ml-[275px] sm:ml-[80px] ml-0 grow    md:flex flex-col  
       h-[100vh] md:min-h-[full]  w-full   md:grow  md:w-[50vw] overflow-auto"
      >
        <div className="bg-gradient-to-b from-[#D6F5F3] from-10% via-[#F7FCFC] via-90% to-[#F1F5FC]  min-h-[full] px-5 py-5">
          {props?.children[0]}
        </div>
      </div>
    </div>
  );
};