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
import { Book, Circle, Home, MessageCircle, Tag, User } from "lucide-react";

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
                <Link to="/" className="font-semibold">
                  Home
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem className={"mb-1 "}>
              <SidebarMenuButton>
                <Tag />
                <Link to="/category" className="font-semibold">
                  Category
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem className={"mb-1 "}>
              <SidebarMenuButton>
                <Book />
                <Link to="/blogs" className="font-semibold">
                  Blogs
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem className={"mb-1 "}>
              <SidebarMenuButton>
                <MessageCircle />
                <Link to="/comments" className="font-semibold">
                  Comments
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem className={"mb-1 "}>
              <SidebarMenuButton>
                <User />
                <Link to="/user" className="font-semibold">
                  User
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarGroupLabel className={"text-lg mt-5"}>
              Filter
            </SidebarGroupLabel>

            <SidebarMenuItem className={"mb-1 "}>
              <SidebarMenuButton>
                <Circle />
                <Link to="/filter" className="font-semibold">
                  Filter
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
