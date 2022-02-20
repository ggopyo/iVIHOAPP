// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import styled from "styled-components";
// import Portal from "../Portal";

// function Modal({
//   className,
//   onClose,
//   maskClosable,
//   closable,
//   visible,
//   children,
// }) {
//   var [visible, setVisible] = useState(true);
//   const onMaskClick = (e) => {
//     if (e.target === e.currentTarget) {
//       setVisible(false);
//     }
//   };
//   const close = (e) => {
//     if (onClose) {
//       setVisible(false);
//     }
//   };

//   useEffect(() => {
//     return () => {
//       document.body.style.cssText = `top: -1000px`; //styled-component를 사용하기 위함.
//       const scrollY = document.body.style.top;
//       document.body.style.cssText = `position: ""; top: "";`;
//     };
//   }, []);

//   return (
//     <Portal elementId="root">
//       <ModalOverlay visible={visible} />
//       <ModalWrapper
//         className={className}
//         onClick={maskClosable ? onMaskClick : null}
//         tabIndex={-1}
//         visible={visible}
//       >
//         {children}
//       </ModalWrapper>
//     </Portal>
//   );
// }

// Modal.defaultProps = {
//   visible: false,
//   closable: true,
//   maskClosable: true,
// };

// Modal.propTypes = {
//   visible: PropTypes.bool,
// };

// const ModalWrapper = styled.div`
//   box-sizing: border-box;
//   display: ${(props) => (props.visible ? "block" : "none")};
//   position: fixed;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
//   z-index: 1000;
//   overflow: auto;
//   outline: 0;
// `;

// const ModalOverlay = styled.div`
//   box-sizing: border-box;
//   display: ${(props) => (props.visible ? "block" : "none")};
//   position: fixed;
//   top: 0;
//   left: 0;
//   bottom: 0;
//   right: 0;
//   background-color: rgba(0, 0, 0, 0.6);
//   z-index: 999;
// `;

// const ModalInner = styled.div`
//   box-sizing: border-box;
//   box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
//   background-color: #fff;
//   border-radius: 10px;
//   width: 360px;
//   max-width: 480px;
//   top: 50%;
//   margin: 0 auto;
//   padding: 40px 20px;
// `;

// export default Modal;