import PropTypes from 'prop-types';
import { ModalOverlay, ModalSection } from './Modal.styled';
import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {
  const [modal] = useState(modalRoot);
  useEffect(() => {
    console.log('modal open');

    const handleDownInEscape = e => {
      if (e.code === 'Escape') {
        onClose();
        console.log('close in Escape');
      }
    };
    window.addEventListener('keydown', handleDownInEscape);
    return () => {
      return window.removeEventListener('keydown', handleDownInEscape);
    };
  }, [modal]);

  const handleDown = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <ModalOverlay onClick={handleDown}>
      <ModalSection>{children}</ModalSection>
    </ModalOverlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
