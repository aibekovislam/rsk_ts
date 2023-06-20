import React from "react";
import "../static/style.scss";
import styles from "./Client.module.scss";
import { ReactComponent as ClockSVG } from "../images/pepicons-print_clock.svg";
import { ReactComponent as ChangeSVG } from "../images/Group (7).svg";
import { ReactComponent as PrintSCG } from "../images/prime_print.svg";

const ClientPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_left}>
        <div className={styles.clock}>
          <ClockSVG />
          20:10
        </div>
        <div className={styles.info}>
          <h1 className={styles.client_number}>Б201</h1>
          <p className={styles.operation}>Оформить кредит</p>
        </div>
        <div className={styles.data}>
          <h5>Данные клиетна:</h5>
          <button>
            <ChangeSVG />
          </button>
        </div>
        <div className={styles.client_data}>
          <p>Джамалбеков</p>
          <p>Эмиль</p>
          <p>Садырбаевич</p>
          <p>ID 421234</p>
          <p>12.06.1956</p>
          <p>+996 778342178</p>
          <p>Пенсионер</p>
        </div>
        <div className={styles.notes}>Заметки</div>
        <div className={styles.btns}>
          <button className={styles.cancel}>Отменить</button>
          <button className={styles.translate}>Перевести</button>
          <button className={styles.complete}>Завершить</button>
        </div>
      </div>
      <div className={styles.wrapper_right}>
        Талон клиента
        <div className={styles.ticket}>
          <h2 className={styles.ticket_number}>Б201</h2>
          <h4 className={styles.ticket_pin}>
            ПИН: <p className={styles.pin}>235412</p>
          </h4>
        </div>
        <div className={styles.ticket_subinfo}>
          <h4>Юридическое лицо/ Открытие счета</h4>
          <p>
            Талон создан: <span>10.06.2023</span>
          </p>
        </div>
        <div className={styles.buttons}>
          <button className={styles.print}>
            <PrintSCG /> Распечатать
          </button>
          <button className={styles.edit}>
            <ChangeSVG /> Изменить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
