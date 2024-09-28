import { Navbar, NavbarBrand, NavbarContent, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { NavBarLogo } from "./functions/NavBarLogo";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Importar useSelector para acceder al estado global

export default function NavBar() {
  const navigate = useNavigate();
  
  
  const { username, role } = useSelector((state) => state.user);

  const handleLogOut = () => {
    navigate('/');
  };

  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <NavBarLogo />
          <p className="hidden sm:block font-bold text-inherit">GIFA</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          type="search"
        />

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={username || "User"} // Muestra el nombre del usuario o "User"
              size="sm"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{username || "No User"}</p> {/* Muestra el username */}
              <p className="text-sm">Role: {role || "No Role"}</p> {/* Muestra el role */}
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogOut}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
