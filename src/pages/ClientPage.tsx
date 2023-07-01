import React, { useEffect } from "react";
import "../static/style.scss";
import styles from "./Client.module.scss";
import { ReactComponent as ClockSVG } from "../images/pepicons-print_clock.svg";
import { ReactComponent as ChangeSVG } from "../images/Group (7).svg";
import { ReactComponent as PrintSCG } from "../images/prime_print.svg";
import { useNavigate } from "react-router-dom";
import { TranslateModal } from "../components/modals/clientModals/TranslateModal";
import { useState } from "react";
import { ReactComponent as ArrowSVG } from "../images/fluent_ios-arrow-ltr-24-regular.svg";
import { ReactComponent as CLoseSVG } from "../images/close btn.svg";
import moment from 'moment';
import 'moment-timezone';
import Accordion, {
  IFullname,
  IPost,
} from "../components/modals/accordion/Accordion";
import { useQueueContext } from "../context/QueueContext";

export const ClientPage: React.FC = () => {

  const { getCustomers, queue, operatorEndServed } = useQueueContext();
  const [ queueLoading, setQueueLoading ] = useState(true);
  const [ queuePage, setQueuePage ] = useState();

  useEffect(() => {
    getCustomers();
  }, []);

  useEffect(() => {
    if(queue) {
      setQueuePage(queue)
    }
  }, [queue])

  console.log(queue)

  const handleSelectPost = (post: IPost) => {
    console.log("Должность", post);
    // Другая логика обработки выбранной фирмы
  };
  const handleSelectWorker = (worker: IFullname) => {
    console.log("ФИО", worker);
  };

  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  }

  const handleNavigation = () => {
    navigate("/auth");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setQueueLoading(true);
        await getCustomers();
        setQueueLoading(false);
      } catch (error) {
        console.log(error);
        setQueueLoading(false); 
      }
    };

    fetchData();
  }, []);

  console.log(queue);

  if (queueLoading) {
    return <div>Loading...</div>; // Или отобразите спиннер загрузки или другой индикатор
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_left}>
        <div className={styles.clock}>
          <ClockSVG />
          20:10
        </div>
        <div className={styles.info}>
          <h1 className={styles.client_number}>{ queue?.ticket_number }</h1>
          <p className={styles.operation}>{ queue?.queue }</p>
        </div>
        <div className={styles.data}>
          <h5>Данные клиента:</h5>
          <button>
            <ChangeSVG />
          </button>
        </div>
        <div className={styles.client_data}>
          <p>{ queue?.last_name }</p>
          <p>{ queue?.first_name }</p>
          <p>{ queue?.surname }</p>
          <p>{ queue?.pasport }</p>
          <p>12.06.1956</p>
          <p>{ queue?.phone_number }</p>
          <p>{ queue?.category }</p>
        </div>
        <div className={styles.notes}>Заметки</div>
        <div className={styles.btns}>
          <button className={styles.cancel}>Отменить</button>
          <button onClick={openModal} className={styles.translate}>
            Перевести
          </button>
          <button className={styles.complete} onClick={() => operatorEndServed(queue?.id)} >Завершить</button>
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
                {isAccordionOpen && (
                  <>
                    <Accordion
                      onSelectPost={handleSelectPost}
                      onSelectWorker={handleSelectWorker}
                    />
                    <ArrowSVG />
                  </>
                )}
              </div>
              <div className={styles.right_accordion}>
                <Accordion
                  onSelectPost={handleSelectPost}
                  onSelectWorker={handleSelectWorker}
                />{" "}
                {<ArrowSVG />}
              </div>
            </div>
            <button className={styles.btn}>Перевести</button>
          </div>
        </div>
      </TranslateModal>
      <div className={styles.wrapper_right}>
        <h1>Талон клиента</h1>
        <div className={styles.ticket}>
          <h2 className={styles.ticket_number}>{ queue.ticket_number }</h2>
          <h4 className={styles.ticket_pin}>
            ПИН: <p className={styles.pin}>{ queue.pasport }</p>
          </h4>
        </div>
        <div className={styles.ticket_subinfo}>
          <h4>Юридическое лицо/ { queue?.queue }</h4>
          <p>
            Талон создан: <span>{ queue?.created_at }</span>
          </p>
        </div>
        <div className={styles.buttons}>
          <button className={styles.print} onClick={handlePrint}>
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
