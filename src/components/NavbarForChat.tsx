import React, { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.scss";
import "../static/style.scss";
import { ReactComponent as LogoSVG } from "../images/RSK_Bank_Logo 1.svg";
import { ReactComponent as IconSVG } from "../images/Vector (1).svg";
import { ReactComponent as Icon2SVG } from "../images/Group (4).svg";
import { ReactComponent as Icon3SVG } from "../images/Group (3).svg";
import { ReactComponent as ChatSVG } from "../images/chatbubble-ellipses-outline (1).svg";
import { ReactComponent as ChartSVG } from "../images/chart.svg";
import { ReactComponent as RecordSVG } from "../images/records.svg";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { useQueueContext } from "../context/QueueContext";
import { useAuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/consts";

const NavbarForChat: React.FC = () => {
  const { operatorChangeStatus, status } = useQueueContext();
  const { user, logout } = useAuthContext();

  interface Ipage {
    icon: React.FC<React.SVGProps<SVGSVGElement>> | any;
    title: string;
    link: string;
  }

  const savedStatus = localStorage.getItem('status');
  const initialStatus = savedStatus === 'Online' ? { status: 'Online' } : { status: "Отключен" };

  const [switchOn, setSwitchOn] = useState(initialStatus.status === "Online");

  const handleSwitchChange = () => {
    setSwitchOn(!switchOn);
    operatorChangeStatus();
  };

  const navigate = useNavigate();


  return (
    <header style={{ borderBottom: "1px solid darkblue" }} >
      <div className={styles.container}>
        <div className={styles.header_nav}>
          <div className={styles.header__nav__start}>
            <div className={styles.header_logo} onClick={() => navigate("/")} >
              <LogoSVG />
            </div>
            <div className={styles.timeBreak}>
           {initialStatus.status === "Online" ? "Онлайн" : "Отключен"}
                <label className={styles.switch}>
                  <input type="checkbox" id="switch" checked={switchOn} onChange={handleSwitchChange}
                  />
                  <span className={styles.slider}></span>
                </label>
          </div>
            
            { initialStatus.status === "Online" ? (
              <div style={{ cursor: "pointer" }} className={styles.chat} onClick={() => navigate("/chat")} >
                Рабочий чат
                <ChatSVG className={styles.chatSVG} />
              </div>
            ) : (
              null
            ) }
          </div>
          <div className={styles.user}>
            <div className={styles.user_name}>Оператор: { user?.first_name }</div>
            <div className={styles.user_photo}>
              <img src={`${BASE_URL}${user?.avatar}`} className={styles.avatar}  />
            </div>
            <button className={styles.logOut} onClick={() => logout()}>Выйти</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavbarForChat;
