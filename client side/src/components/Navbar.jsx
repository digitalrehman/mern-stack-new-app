import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { User } from "lucide-react";
import { setLogout } from "@/store/auth";
import axios from "axios";
const Navbar = () => {
  let { isLogin, user } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  async function logoutHandler() {
    await axios.get(`${import.meta.env.VITE_BASE_URL}/logout`);
    navigate("/form");
    dispatch(setLogout());
  }
  return (
    <div className="h-16 w-full flex items-center justify-between px-4 fixed z-20 border-b bg-white">
      <h1 className="text-4xl font-extrabold">News</h1>
      <form className="flex items-center gap-2">
        <Input type="text" placeholder="Search here.. " className={"w-96"} />
        <Button>Search</Button>
      </form>
      {isLogin ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {" "}
              <User className="w-6 h-6" /> {user.name}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button onClick={logoutHandler} variant={"ghost"}>
                  Log out
                </Button>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={() => navigate("/form")}>Login</Button>
      )}
    </div>
  );
};

export default Navbar;
