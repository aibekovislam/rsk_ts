import React, { useEffect } from "react";
import "../static/style.scss";
import styles from "./Client.module.scss";
import { ReactComponent as ClockSVG } from "../images/pepicons-print_clock.svg";
import { ReactComponent as ChangeSVG } from "../images/Group (7).svg";
import { ReactComponent as PrintSCG } from "../images/prime_print.svg";
import { Navigate, useNavigate } from "react-router-dom";
import { TranslateModal } from "../components/modals/clientModals/TranslateModal";
import { useState } from "react";
import { ReactComponent as ArrowSVG } from "../images/fluent_ios-arrow-ltr-24-regular.svg";
import { ReactComponent as CLoseSVG } from "../images/close btn.svg";
import moment from 'moment';
import 'moment-timezone';
import Accordion, {
  IWindow,
} from "../components/modals/accordion/Accordion";
import { useQueueContext } from "../context/QueueContext";

export const ClientPage: React.FC = () => {

  const { getCustomers, queue, operatorEndServed, rejectQueue, shiftQueue, error400, sendToWaitingList  } = useQueueContext();
  const [ queueLoading, setQueueLoading ] = useState(true);
  const [ queuePage, setQueuePage ] = useState();

  const [ windowData, setWindowData ] = useState<IWindow | null>(null);

  const handleChangeWindowData = (newWindowData: any) => {
    setWindowData(newWindowData)
  }

  useEffect(() => {
    getCustomers();
  }, []);

  useEffect(() => {
    if(queue) {
      setQueuePage(queue)
    }
  }, [queue])


  const handleSelectPost = (post: IWindow) => {
    console.log("Окно", post);
    // Другая логика обработки выбранной фирмы
  };

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

  const [ changeDATA, setChangeDATA ] = useState(false);

  
  if (queueLoading) {
    return <div>Loading...</div>; // Или отобразите спиннер загрузки или другой индикатор
  }

  const savedStatus = localStorage.getItem('status');
  const initialStatus = savedStatus === 'Online' ? { status: 'Online' } : { status: "Отключен" };

  return (
    initialStatus.status === "Online" ? (
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
        { changeDATA ? (
          <div>
            <input type="text" name="first_name" value={queue?.first_name} />
            <input type="text" name="last_name" value={queue?.last_name} />
            <input type="text" name="surname" value={queue?.surname} />
            <input type="text" name="pasport" value={queue?.pasport} />
            <input type="text" name="phone_number" value={queue?.phone_number} />
            <select name="category" >
              { queue.map((item: any) => (
                <option>{ item }</option>
              )) }
            </select>
          </div>
        ) : (
          <div className={styles.client_data}>
          <p>{ queue?.last_name }</p>
          <p>{ queue?.first_name }</p>
          <p>{ queue?.surname }</p>
          <p>{ queue?.pasport }</p>
          <p>12.06.1956</p>
          <p>{ queue?.phone_number }</p>
          <p>{ queue?.category }</p>
        </div>
        ) }
        <div className={styles.notes}>Заметки</div>
        <div className={styles.btns}>
          <button className={styles.cancel} onClick={() => rejectQueue(queue?.id)}>Отменить</button>
          <button onClick={openModal} className={styles.translate}>
            Перевести
          </button>
          <button className={styles.complete} onClick={() => operatorEndServed(queue?.id)} >Завершить</button>
          <button className={styles.btn} onClick={() => {sendToWaitingList(queue?.id)}}>В ожиданиe</button>
        </div>
      </div>
      { error400 ? (
        <div>Вы слишком много переводили</div>
      ) : (
        <>
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
                      onSelectWindow={handleSelectPost}
                      windowData={handleChangeWindowData}
                    />
                    <ArrowSVG />
                  </>
                )}
              </div>
            </div>
            <button className={styles.btn} onClick={() => shiftQueue(windowData?.toString(), queue?.id)}>Перевести</button>
          </div>
        </div>
      </TranslateModal>
      <div className={styles.wrapper_right}>
        <h1>Талон клиента</h1>
        <div className={styles.ticket}>
          <h2 className={styles.ticket_number}>{ queue?.ticket_number }</h2>
          <h4 className={styles.ticket_pin}>
            ПИН: <p className={styles.pin}>{ queue?.pasport }</p>
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
        </div>
      </div>
        </>
      ) }
    </div>
    ) : (
      <div>Отключен от системы</div>
    )
  );
};

export default ClientPage;
