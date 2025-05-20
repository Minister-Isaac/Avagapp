import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from '../../components/SideBar'
import NavBar from "../../components/NavBar";
import { AvatarEditorDialogProvider } from "../../components/AvatarEditorDialog/AvatarEditorDialogContext";
function StudentLayout() {
  return (
    <div className="flex w-full h-screen">
      <AvatarEditorDialogProvider>
         <SideBar />
        <main className="overflow-y-auto w-[100%] bg-white">
          <NavBar />
          <Outlet />
        </main>
      </AvatarEditorDialogProvider>
    </div>
  );
}

export default StudentLayout;
