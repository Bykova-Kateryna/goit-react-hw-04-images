import PropTypes from 'prop-types';
import { ModalOverlay, ModalSection } from './Modal.styled';
import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {
  const handleDownInEscape = e => {
    if (e.code === 'Escape') {
      onClose();
      console.log('close in Escape');
    }
  };

  useEffect(() => {
    console.log('modal open');
    window.addEventListener('keydown', handleDownInEscape);
    return () => {
      return window.removeEventListener('keydown', handleDownInEscape);
    };
  }, []);

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
