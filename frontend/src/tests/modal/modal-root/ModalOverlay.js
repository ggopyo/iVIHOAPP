// import React, { useState } from "react";
// import styled from "styled-components";
// import Modal from "react-overlays/Modal";
// import RegistrationForm from "../../../components/RegistrationForm";
// const Backdrop = styled.div`
//   position: fixed;
//   z-index: 1040;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   background-color: #000;
//   opacity: 0.5;
// `;

// const AModal = styled(Modal)`
//   position: fixed;
//   width: 400px;
//   z-index: 1040;
//   top: 20px;
//   left: 30px;
//   border: 1px solid #e5e5e5;
//   background-color: white;
//   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
//   padding: 20px;
// `;

// export default function ModalOverlay() {
//   const [show, setShow] = useState(false);

//   const renderBackdrop = (props) => <Backdrop {...props} />;

//   return (
//     <div className="modal-example">
//       <button
//         type="button"
//         className="btn btn-primary mb-4"
//         onClick={() => setShow(true)}
//       >
//         Open Modal
//       </button>
//       <div></div>
//       <AModal
//         show={show}
//         onHide={() => setShow(false)}
//         renderBackdrop={renderBackdrop}
//       >
//        <RegistrationForm/>
//       </AModal>
//     </div>
//   );
// }
