import React from "react";
import "../static/style.scss";
import styles from "./Client.module.scss";
import { ReactComponent as ClockSVG } from "../images/pepicons-print_clock.svg";
import { ReactComponent as ChangeSVG } from "../images/Group (7).svg";
import { ReactComponent as PrintSCG } from "../images/prime_print.svg";
import { useNavigate } from "react-router-dom";
import { TranslateModal } from "../modals/ClientModals/TranslateModal";
import { useState } from "react";
import { ReactComponent as ArrowSVG } from "../images/fluent_ios-arrow-ltr-24-regular.svg";
import { ReactComponent as CLoseSVG } from "../images/Vector (4).svg";

export const ClientPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/auth");
  };

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
          <button onClick={openModal} className={styles.translate}>
            Перевести
          </button>
          <button className={styles.complete}>Завершить</button>
        </div>
      </div>
      <TranslateModal isOpen={isOpen} onClose={closeModal}>
        <div className={styles.wrapper_modal}>
          <div className={styles.modal}>
            <div onClick={closeModal} className={styles.close}>
              <div>
                <button>
                  <CLoseSVG />
                </button>
              </div>
            </div>
            <h1 className={styles.modal_text}>
              Перевод к другому специалисту{" "}
            </h1>
            <div className={styles.choice}>
              <div className={styles.left_accordion}>
                Должность {<ArrowSVG />}
              </div>
              <div className={styles.right_accordion}>ФИО {<ArrowSVG />}</div>
            </div>
            <button className={styles.btn}>Перевести</button>
          </div>
        </div>
      </TranslateModal>
      <div className={styles.wrapper_right}>
        <h1>Талон клиента</h1>
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
