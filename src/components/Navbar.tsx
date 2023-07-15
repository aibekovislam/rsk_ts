import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";
import "../static/style.scss";
import { ReactComponent as LogoSVG } from "../images/RSK_Bank_Logo 1.svg";
import { ReactComponent as IconSVG } from "../images/Vector (1).svg";
import { ReactComponent as Icon2SVG } from "../images/Group (4).svg";
import { ReactComponent as Icon3SVG } from "../images/Group (3).svg";
import { ReactComponent as Icon4SVG } from "../images/Vector (3).svg";
import { ReactComponent as AvatarSVG } from "../images/изображение 5.svg";
import { ReactComponent as SwitchoffSVG } from "../images/Switch (1).svg";
import { ReactComponent as SwitchonSVG } from "../images/Switch (2).svg";
import { ReactComponent as ChatSVG } from "../images/chatbubble-ellipses-outline (1).svg";
import { ReactComponent as ChartSVG } from "../images/chart.svg";
import { ReactComponent as RecordSVG } from "../images/records.svg";

import { Link, Navigate } from "react-router-dom";
import { useQueueContext } from "../context/QueueContext";
import { useAuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/consts";

const Navbar: React.FC = () => {
  const { operatorChangeStatus, status } = useQueueContext();
  const { user, logout } = useAuthContext();

  interface Ipage {
    icon: React.FC<React.SVGProps<SVGSVGElement>> | any;
    title: string;
    link: string;
  }

  const pages: Ipage[] = [
    {
      icon: <IconSVG />,
      title: "Клиент",
      link: "/client",
    },
    {
      icon: <Icon2SVG />,
      title: "Список очередей",
      link: "/operator/queue",
    },
    {
      icon: <Icon3SVG />,
      title: "Список операций",
      link: "/operator/queue_history",
    },
    {
      icon: <RecordSVG />,
      title: "Записи",
      link: "/operator/queue_booking",
    },
    {
      icon: <ChartSVG />,
      title: "Статистика",
      link: "/operator_stat",
    },
  ];

  interface IadminPage {
    title: string;
    link: string;
  }
  

  const adminPages: IadminPage[] = [
    {
      title: "admin",
      link: "",
    },
  ];

  const savedStatus = localStorage.getItem('status');
  const initialStatus = savedStatus === 'Online' ? { status: 'Online' } : { status: "Отключен" };

  if(status === "Offline") {
    return <Navigate replace to="/offline"></Navigate>
  }

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.header_nav}>
          <div className={styles.header__nav__start}>
            <div className={styles.header_logo}>
              <LogoSVG />
            </div>
            <div className={styles.timeBreak}>
           {initialStatus.status === "Online" ? "Онлайн" : "Отключен"}
                { initialStatus.status === 'Online' ? (
                  <>
                    <input type="checkbox" id="switch" checked onClick={() => {
                      operatorChangeStatus();
                      localStorage.setItem("status", "Online");
                    }} />
                    <label className={styles.label} htmlFor="switch">Toggle</label>
                  </>
                ) : (
                  <>
                    <input type="checkbox" id="switch" onClick={() => {
                      operatorChangeStatus();
                      localStorage.setItem("status", "Offline");
                    }}  />
                    <label className={styles.label} htmlFor="switch">Toggle</label>
                  </>
                )}
          </div>
            
            <div className={styles.chat}>
              Рабочий чат
              <ChatSVG className={styles.chatSVG} />
            </div>
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
      <div className={styles.navigation}>
        <div className={styles.nav}>
          {pages.map((page) => (
            <ul className={styles.nav_items} key={page.title}>
              <li className={styles.nav_link_item}>
                <Link to={page.link}>
                  <button className={styles.nav_link_item}>
                    {page.icon}
                    {page.title}
                  </button>
                </Link>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
