import React, { useState } from "react";
import Logo from "../../../components/Logo";
import LoginForm from "../../../components/LoginForm";
import Navbar from "../../../components/Navbar";
import Modal from "./Modal-root";

const LoginModal = () => {
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
        <LoginForm />
      </Modal>
      <div className="NavbarWrapper">
        <Navbar />
      </div>
      <Logo />
    </div>
  );
};

export default LoginModal;
