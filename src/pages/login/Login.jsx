import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {roles} from "./roles/roles";
import { useNavigate } from "react-router-dom";

export function Login() {
const navigate = useNavigate();

const handleSelection = (selectedKey) => {
  switch (selectedKey) {
    case "admin":
      navigate("/home"); 
      break;
  
  }
};

  return (
    <Autocomplete
      isRequired
      label="Selecciona tu rol"
      defaultItems={roles}
      placeholder="Roles"
      defaultSelectedKey="cat"
      className="max-w-xs"
      onSelectionChange={handleSelection}
    >
      {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
    </Autocomplete>
  );
}

export default Login;