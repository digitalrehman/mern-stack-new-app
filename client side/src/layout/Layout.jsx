import { AppSidebar } from "@/components/AppSidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <SidebarProvider>
      <Navbar />
      <AppSidebar />
      <main className="w-full">
        <div className="pt-20 px-4 min-h-[calc(100vh-4rem-2.5rem)]">
          <Outlet />
        </div>
        <Footer />
      </main>
    </SidebarProvider>
  );
}
