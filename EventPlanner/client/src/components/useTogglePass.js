import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

 function useTogglePass() {
  const [visible, setVisibility] = useState(false);

  const Icon = <FontAwesomeIcon color="white" icon={visible ? "eye-slash" : "eye"} />;
  const btnclick = () => {
    setVisibility(!visible);}

  const InputType = visible ? "text" : "password";

  return [InputType, Icon];
};
export default useTogglePass;