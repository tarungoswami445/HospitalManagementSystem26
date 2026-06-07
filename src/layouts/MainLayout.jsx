import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex bg-gray-100 min-h-screen overflow-x-hidden">

      {/* SIDEBAR */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* MAIN CONTENT */}
      <div
  className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
    sidebarOpen ? "ml-64" : "ml-20"
  }`}
>

        {/* NAVBAR */}
        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* PAGE CONTENT */}
      <main className="flex-1 p-6">
  <Outlet />
</main>

<Footer />

      </div>
    </div>
  );
};

export default MainLayout;