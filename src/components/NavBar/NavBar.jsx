import { Navbar, NavbarBrand, NavbarContent, Avatar, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { NavBarLogo } from "../functions/NavBarLogo";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import '../NavBar/styles/navbar.css';
import { logout } from "../../services/authService";

export default function NavBar() {
  const navigate = useNavigate();
  const { username, role, token } = useSelector((state) => state.user); 

  const handleLogOut = async () => {
    try {
      await logout(token); 
      navigate('/'); 
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <Navbar isBordered className="navbar">
      <NavbarContent justify="start" className="navbar-content">
        <NavbarBrand className="mr-4">
          <NavBarLogo />
          <p className="hidden sm:block font-bold text-inherit">GIFA</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center navbar-content" justify="end">
        <p className="role-text">{role || "No Role"}</p>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="avatar transition-transform"
              color="secondary"
              name={username || "User"}
              size="sm"
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Profile Actions"
            variant="flat"
            className="dropdown-menu"
          >
            <DropdownItem key="profile" className="h-14 gap-2 dropdown-item">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{username || "No User"}</p>
              <p className="text-sm">Role: {role || "No Role"}</p>
            </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              onClick={handleLogOut}
              className="dropdown-item"
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
