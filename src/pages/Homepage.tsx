import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useQueueContext } from "../context/QueueContext";
import styles from "./QueueOperatorPage.module.scss";

export const Homepage = () => {
  const { user } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/auth");
    }
  }, [user]);

  console.log(user);

  return (
    <div className={styles.heyThere}>
      Добро пожаловать!
      <p className={styles.niceWork}>Приятной работы</p>
    </div>
  );
};
