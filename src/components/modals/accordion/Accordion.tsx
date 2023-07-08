import React, { useEffect, useState } from "react";
import { useQueueContext } from "../../../context/QueueContext";
import styles from "./Accordion.module.scss";
export interface IWindow {
  id: number;
  number: any;
}

export interface IFullname {
  id: number;
  name: string;
}

export interface AccordionProps {
  onSelectWindow: (window: IWindow) => void;
  windowData: (newWindowData: any) => void;
}

const Accordion: React.FC<AccordionProps> = ({
  onSelectWindow, windowData
}) => {
  const [selectedPost, setSelectedPost] = useState<IWindow | null>(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const { windows, getAllWindows } = useQueueContext();

  useEffect(() => {
    getAllWindows()
  }, [])

  const handlePostSelect = (widnow: IWindow) => {
    setSelectedPost(widnow);
    setIsAccordionOpen(false);
    windowData(widnow?.id);
  };


  return (
    <div>
      <h1
        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        className={`${selectedPost ? styles.active : ""} ${
          isAccordionOpen ? styles.open : ""
        }`}
      >
        {selectedPost
          ? `Окно №${selectedPost.number}`
          : "Окно"}
      </h1>
      <div
        className={`${styles.accordionContent} ${
          isAccordionOpen ? styles.open : styles.closed
        }`}
      >
        {isAccordionOpen && (
          <>
            {windows?.map((window: any) => (
              <p
                key={window.id}
                onClick={() => handlePostSelect(window)}
                className={selectedPost === window ? styles.active : ""}
              >
                Окно №{ window.number }
              </p>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Accordion;
