import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Circle, Home, MessageCircle, User, Wifi } from "lucide-react";

import { Link } from "react-router-dom";

export function AppSidebar() {
  return (
    <Sidebar className={"top-16"}>
      <SidebarContent className={"bg-white p-4"}>
        <SidebarGroupContent>
          <SidebarMenu>

            <SidebarMenuItem className={"mb-1 "}>
              <SidebarMenuButton>
                <Home />
                <Link to="/" className="font-semibold">Home</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

                    
            <SidebarMenuItem className={"mb-1 "}>
              <SidebarMenuButton>
                <Wifi />
                <Link to="/" className="font-semibold">Blogs</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

                    
            <SidebarMenuItem className={"mb-1 "}>
              <SidebarMenuButton>
                <User />
                <Link to="/" className="font-semibold">User</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

                    
            <SidebarMenuItem className={"mb-1 "}>
              <SidebarMenuButton>
                <MessageCircle />
                <Link to="/" className="font-semibold">Comments</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarGroupLabel className={"text-lg mt-5"}>Filter</SidebarGroupLabel>

            <SidebarMenuItem className={"mb-1 "}>
              <SidebarMenuButton>
                <Circle />
                <Link to="/" className="font-semibold">Blogs</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
