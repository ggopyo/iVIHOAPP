import React, { useState } from "react";
import Logo from "../../../components/Logo";
import MuiNavbar from "../../../components/MuiNavbar";
import RegistrationForm from "../../../components/RegistrationForm";
import Modal from "./Modal-root";
const RegistrationModal = () => {
  const [visible, setVisible] = useState(true);

  // className,
  // onClose,
  return (
    <div>
      <Modal
        maskClosable="false"
        visible={visible}
        closable="true"
        onClick={() => console.log(1234123)}
      >
        {/* <button onClick={() => setVisible((visible) => !visible)}></button> */}
        <RegistrationForm />
      </Modal>
      <div className="NavbarWrapper">
        <MuiNavbar />
      </div>
      <Logo />
    </div>
  );
};

export default RegistrationModal;
