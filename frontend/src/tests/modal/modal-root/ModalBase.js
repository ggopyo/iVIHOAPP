// import React, { useState } from "react";
// import Modal, { ModalProvider } from "styled-react-modal";
// import { ThemeProvider } from "styled-components";
// import RegistrationForm from "../../../components/RegistrationForm";
// const StyledModal = Modal.styled`
//   width: 20rem;
//   height: 20rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: white;
// `;

// function FancyModalButton() {
//   const [isOpen, setIsOpen] = useState(false);

//   function toggleModal(e) {
//     setIsOpen(!isOpen);
//   }

//   return (
//     <div>
//       <button onClick={toggleModal}>Click me</button>
//       <Modal
//         isOpen={isOpen}
//         onBackgroundClick={toggleModal}
//         onEscapeKeydown={toggleModal}
//       >
//         <RegistrationForm/>
//       </Modal>
//     </div>
//   );
// }

// export default function ModalBase() {
//   return (
//     <ThemeProvider theme={{}}>
//       <ModalProvider>
//         <FancyModalButton />
//       </ModalProvider>
//     </ThemeProvider>
//   );
// }
