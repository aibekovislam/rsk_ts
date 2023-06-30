import React, { useState } from "react";
import styles from "./Accordion.module.scss";
export interface IPost {
  id: number;
  name: string;
}

export interface IFullname {
  id: number;
  name: string;
}

export interface AccordionProps {
  onSelectPost: (post: IPost) => void;
  onSelectWorker: (worker: IFullname) => void;
}

const Accordion: React.FC<AccordionProps> = ({
  onSelectPost,
  onSelectWorker,
}) => {
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<IFullname | null>(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const posts: IPost[] = [
    { id: 1, name: "Кассир" },
    { id: 2, name: "Гл.Менеджер" },
  ];

  const workers: IFullname[] = [
    { id: 1, name: "Аманова Г.Д" },
    { id: 2, name: "Исламова Р.М" },
  ];

  const handlePostSelect = (post: IPost) => {
    setSelectedPost(post);
    onSelectPost(post);
    setIsAccordionOpen(false);
  };

  const handleWorkerSelect = (worker: IFullname) => {
    setSelectedWorker(worker);
    onSelectWorker(worker);
    setIsAccordionOpen(false);
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
          ? selectedPost.name
          : selectedWorker
          ? selectedWorker.name
          : "Должность"}
      </h1>
      <div
        className={`${styles.accordionContent} ${
          isAccordionOpen ? styles.open : styles.closed
        }`}
      >
        {isAccordionOpen && (
          <>
            {posts.map((post) => (
              <p
                key={post.id}
                onClick={() => handlePostSelect(post)}
                className={selectedPost === post ? styles.active : ""}
              >
                {post.name}
              </p>
            ))}
            {workers.map((worker) => (
              <p
                key={worker.id}
                onClick={() => handleWorkerSelect(worker)}
                className={selectedWorker === worker ? styles.active : ""}
              >
                {worker.name}
              </p>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Accordion;
