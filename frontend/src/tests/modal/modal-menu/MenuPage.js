import React, { useState } from "react";
import Logo from "../../../components/Logo";
import Navbar from "../../../components/Navbar";
import TryPage from "../../TryPage";
import Modal from "./Modal-menu";
const MenuPage = () => {
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
      </Modal>
      <div className="NavbarWrapper">
        <Navbar />
      </div>
      <TryPage />
      <Logo />
    </div>
  );
};

export default MenuPage;
