import { AppSidebar } from "@/components/AppSidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Navbar />
      <main>
        <Outlet />
        <Footer />
      </main>
    </SidebarProvider>
  );
}
