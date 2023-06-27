import React, { useEffect } from "react";
import styles from "./TranslateModal.module.scss";
import { ReactComponent as ArrowSVG } from "../../images/fluent_ios-arrow-ltr-24-regular.svg";
import { ReactComponent as CLoseSVG } from "../../images/Vector (4).svg";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const TranslateModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const closeModal = () => {
    onClose();
  };

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.body.addEventListener("keydown", closeOnEscapeKey);

    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [closeModal]);

  return <>{isOpen && <>{children}</>}</>;
};
