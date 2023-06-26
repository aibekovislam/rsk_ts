import React from "react";
import styles from "./Navbar.module.scss";
import "../static/style.scss";
import { ReactComponent as LogoSVG } from "../images/RSK_Bank_Logo 1.svg";
import { ReactComponent as IconSVG } from "../images/Vector (1).svg";
import { ReactComponent as Icon2SVG } from "../images/Group (4).svg";
import { ReactComponent as Icon3SVG } from "../images/Group (3).svg";
import { ReactComponent as Icon4SVG } from "../images/Vector (3).svg";
import { ReactComponent as AvatarSVG } from "../images/изображение 5.svg";
import { ReactComponent as SwitchoffSVG } from "../images/Switch (1).svg";
import { ReactComponent as SwitchonSVG } from "../images/Switch.svg";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  // const user: Iuser[] = [{}];

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
      link: "/",
    },
    {
      icon: <Icon3SVG />,
      title: "Список операций",
      link: "/",
    },
    {
      icon: <Icon4SVG />,
      title: "Рабочий чат",
      link: "/",
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

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.header_nav}>
          <div className={styles.header_logo}>
            <LogoSVG />
          </div>
          <div className={styles.window_number}>Oкно 5</div>
          <div className={styles.user}>
            <div className={styles.user_name}>Анарбекова А.Т</div>
            <div className={styles.user_photo}>
              <AvatarSVG />
              {/*photo_URL*/}
            </div>
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

        {/* <ul className={styles.nav_items}>
          <li className={styles.nav_link_item}>
            <IconSVG />
            Клиент
          </li>
          <li className={styles.nav_link_item}>
            <Icon2SVG />
            Список очередей
          </li>
          <li className={styles.nav_link_item}>
            <Icon3SVG /> История операций
          </li>
          <li className={styles.nav_link_item}>
            <Icon4SVG />
            Рабочий чат
          </li>
        </ul> */}
      </div>
    </header>
  );
};

export default Navbar;
