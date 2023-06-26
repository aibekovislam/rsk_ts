import React from "react";
import styles from "./Accordion.module.scss";
import type { FC, PropsWithChildren } from "react";

interface IProps extends PropsWithChildren {
  isActive?: boolean;
  title: string;
}

export const Accordion: FC<IProps> = ({ children, isActive, title }) => {
  return (
    <>
      <div className={styles.accordion}>
        <h1>{title}</h1>
        {children}
      </div>
    </>
  );
};

export default Accordion;
