import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./QueueOperatorPage.module.scss";
import { ReactComponent as ArrowRightSVG } from "../images/chevron-forward-outline (2).svg";
import { ReactComponent as SwitchSVG } from "../images/Vector (4).svg";
import { ReactComponent as TripleDotsSVG } from "../images/Vector (5).svg";
import { useQueueContext } from "../context/QueueContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TicketModal from "../modals/ClientModals/OperatorModal/TicketModal";
import { useNavigate } from "react-router-dom";
import Accordion, {
  IFullname,
  IWindow,
} from "../components/modals/accordion/Accordion";
import { ReactComponent as ArrowSVG } from "../images/fluent_ios-arrow-ltr-24-regular.svg";
import { ReactComponent as CloseSVG } from "../images/Vector (6).svg";
import useWebSocket from "../context/UseWebSocket";

export let operator: string;

const QueueOperatorPage = () => {
  const {
    getCustomers,
    queues,
    deleteQueue,
    handleDragEnd,
    operatorStartServed,
    inQueueTALONDetail,
    inQueue,
    rejectedQueues,
    getRejectedQueue,
    shiftedQueues,
    getShiftedQueues,
    getWaitingList,
    callCustomer,
    moveToTheCustomer,
  } = useQueueContext();

  const navigate = useNavigate();

  useEffect(() => {
    getCustomers();
    getWaitingList();
    getRejectedQueue();
    getShiftedQueues();
  }, []);

  const [content1, setContent1] = useState(false);
  const [content2, setContent2] = useState(false);
  const [content3, setContent3] = useState(false);
  const [content4, setContent4] = useState(false);

  const [showOptions, setShowOptions] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedTicketNumber, setSelectedTicketNumber] = useState("");

  const [showTicketModal, setShowTicketModal] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const handleOptionsClick = (itemId: any, ticketNumber: any) => {
    setSelectedItemId(itemId);
    setSelectedTicketNumber(ticketNumber);
    setShowOptions(!showOptions);
    setShowTable(!showTable);
  };

  const handleTicketModalOpen = (ticketId: any) => {
    setSelectedTicketId(ticketId);
    setShowTicketModal(true);
  };

  const closeModal = () => {
    setSelectedTicketId(null);
    setShowTicketModal(false);
  };

  const handleDeleteConfirm = () => {
    if (selectedItemId) {
      deleteQueue(selectedItemId);
    }
    setShowModal(false);
  };

  const convertTime = (timeInMinutes: number) => {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    return `${hours}ч ${minutes}мин`;
  };

  function convertCreatedAtToHours(created_at: string) {
    const date = new Date(created_at);

    const minutes = date.getMinutes();
    const hours = date.getHours();

    if (minutes > 60) {
      return `${hours} час, ${minutes} минут`;
    } else {
      return `${minutes} мин`;
    }
  }

  interface categories {
    circleColor?: string;
    title?: string;
  }

  const category: categories[] = [
    {
      circleColor: "rgba(234, 237, 93, 1)",
      title: "Пенсионер",
    },
    {
      circleColor: "rgba(252, 190, 183, 1)",
      title: "Беременные",
    },
    {
      circleColor: "rgba(155, 228, 129, 1)",
      title: "Ветеран",
    },
    {
      circleColor: "rgba(228, 129, 201, 1)",
      title: "С ограниченными возможностями",
    },
  ];

  const [queueDETAILS, setQueueDETAILS] = useState([]);

  const [windowData, setWindowData] = useState<IWindow | null>(null);

  const handleChangeWindowData = (newWindowData: any) => {
    setWindowData(newWindowData);
  };

  useEffect(() => {
    if (inQueue) {
      setQueueDETAILS(inQueue);
    }
  }, [inQueue]);

  const [handleModal, setHandleModal] = useState(false);

  const handleSelectPost = (post: IWindow) => {
    console.log("Должность", post);
  };

  const savedStatus = localStorage.getItem("status");
  const initialStatus =
    savedStatus === "Online" ? { status: "Online" } : { status: "Отключен" };

  return initialStatus.status === "Online" ? (
    <div className={styles.hero}>
      <div className={styles.categoryBlock}>
        <div className={styles.bottomNav}>
          <div className={styles.allCounter}>
            Всего -{" "}
            <span>
              {queues?.length + rejectedQueues?.length + shiftedQueues?.length}
            </span>
          </div>
        </div>
        <div className={styles.categories}>
          {category.map((item) => (
            <div key={item.title} className={styles.category__block}>
              <div
                className={styles.circle_category}
                style={{ backgroundColor: item.circleColor }}
              ></div>
              <div className={styles.category__title}>{item.title}</div>
            </div>
          ))}
          <div className={styles.category__block}>
            <div
              className={styles.circle_category}
              style={{ background: "orange" }}
            ></div>
            <div className={styles.category__title}>В листе ожидания</div>
          </div>
        </div>
      </div>
      <div className={styles.content__queue}>
        <div
          onClick={(e) => setContent1(!content1)}
          className={styles.queue__state}
        >
          <div className={styles.queue__state__title}>
            <ArrowRightSVG
              className={`${styles.arrowRight} ${
                content1 ? `${styles.reverseArrow}` : ``
              }`}
            />
            Ожидает
          </div>
          <div className={styles.queue__state__counter}>{queues?.length}</div>
        </div>
        <div
          style={
            content1
              ? { maxHeight: "100%", display: "block" }
              : { maxHeight: "0px", display: "none" }
          }
          className={styles.tableBlock}
        >
          <div className={styles.table}>
            <div className={styles.tableItems}>
              <div className={styles.tableItem__tbody}>
                <div className={styles.tableItem__thead}>
                  <div className={styles.thead__number}>Клиент №</div>
                  <div className={styles.thead__question}>Вопрос</div>
                  <div className={styles.thead__time}>Время ожидания</div>
                </div>
                <div>
                  {queues?.map((item: any, index: number) => {
                    return (
                      <div
                        className={`${styles.tbody__item__talon} ${
                          item.position === 0 ? `${styles.isWaiting}` : ``
                        }`}
                        style={
                          index % 2 === 1
                            ? { background: "rgba(248, 248, 248, 1)" }
                            : undefined
                        }
                      >
                        <div
                          className={styles.tbody__talon}
                          style={item.position === 0 ? { color: "orange" } : {}}
                        >
                          <div
                            className={styles.tbody__number}
                            style={
                              item.position === 0 ? { color: "orange" } : {}
                            }
                          >
                            {index + 1}.
                          </div>
                          <span
                            style={
                              item.category === "pregnant"
                                ? { background: "rgba(252, 190, 183, 1)" }
                                : item.category === "veteran"
                                ? { background: "rgba(155, 228, 129, 1)" }
                                : item.category === "pensioner"
                                ? { background: "rgba(234, 237, 93, 1)" }
                                : item.category === "disabled person"
                                ? { background: "rgba(228, 129, 201, 1)" }
                                : undefined
                            }
                          ></span>{" "}
                          {item.ticket_number}
                        </div>
                        <div className={styles.tbody__question}>
                          {item.queue}
                        </div>
                        <div
                          className={styles.tbody__time}
                          style={
                            item.position === 0
                              ? { color: "orange", border: "1px solid orange" }
                              : {}
                          }
                        >
                          {convertCreatedAtToHours(item.created_at)}
                        </div>
                        <div className={styles.tbody__buttons}>
                          <button
                            style={
                              item.position === 0
                                ? { backgroundColor: "orange" }
                                : {}
                            }
                            onClick={() => {
                              operatorStartServed(item.id);
                              inQueueTALONDetail(item.id);
                              navigate("/client");
                            }}
                          >
                            Принять
                          </button>
                          <div
                            className={styles.switch}
                            onClick={() => moveToTheCustomer(item.id)}
                          >
                            <SwitchSVG className={styles.switchIcon} />
                          </div>
                          <TripleDotsSVG
                            className={styles.tripledots}
                            onClick={() =>
                              handleOptionsClick(item.id, item.ticket_number)
                            }
                          />
                        </div>
                        {showOptions && item.id === selectedItemId && (
                          <div className={styles.optionsBlock}>
                            <button
                              style={{
                                color: "white",
                                backgroundColor: "green",
                                borderRadius: "5px",
                              }}
                              onClick={() => {
                                callCustomer(item.id);
                                setShowOptions(false);
                              }}
                            >
                              Вызвать
                            </button>
                            <button
                              onClick={(e) => {
                                handleTicketModalOpen(item.id);
                                setShowOptions(false);
                              }}
                            >
                              Посмотреть талон
                            </button>

                            <button
                              style={{
                                color: "red",
                                backgroundColor: "#f5f5f5",
                                borderRadius: "5px",
                              }}
                              onClick={() => {
                                setShowModal(true);
                                setShowOptions(false);
                              }}
                            >
                              Удалить
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={(e) => setContent2(!content2)}
          className={styles.queue__state}
        >
          <div className={styles.queue__state__title}>
            <ArrowRightSVG
              className={`${styles.arrowRight} ${
                content2 ? `${styles.reverseArrow}` : ``
              }`}
            />
            Переведен
          </div>
          <div className={styles.queue__state__counter}>
            {shiftedQueues?.length}
          </div>
        </div>
        <div
          style={
            content2
              ? { maxHeight: "100%", display: "block" }
              : { maxHeight: "0px", display: "none" }
          }
          className={styles.tableBlock}
        >
          <div className={styles.table}>
            <div className={styles.tableItems}>
              <div className={styles.tableItem__tbody}>
                <div className={styles.tableItem__thead}>
                  <div className={styles.thead__number}>Клиент №</div>
                  <div className={styles.thead__question}>Вопрос</div>
                  <div className={styles.thead__time}>Перевел</div>
                </div>
                {shiftedQueues?.map((item: any, index: number) => (
                  <div
                    key={item.id}
                    className={`${styles.tbody__item__talon}`}
                    style={
                      index % 2 === 1
                        ? { background: "rgba(248, 248, 248, 1)" }
                        : undefined
                    }
                  >
                    <div className={styles.tbody__talon}>
                      <div className={styles.tbody__number}>{index + 1}.</div>
                      <span
                        style={
                          item.category === "pregnant"
                            ? { background: "rgba(252, 190, 183, 1)" }
                            : item.category === "veteran"
                            ? { background: "rgba(155, 228, 129, 1)" }
                            : item.category === "pensioner"
                            ? { background: "rgba(234, 237, 93, 1)" }
                            : item.category === "disabled person"
                            ? { background: "rgba(228, 129, 201, 1)" }
                            : undefined
                        }
                      ></span>{" "}
                      {item.ticket_number}
                    </div>
                    <div className={styles.tbody__question}>{item.queue}</div>
                    <div className={styles.tbody__operator}>
                      {item.old_operator}
                    </div>
                    <div className={styles.tbody__buttons}>
                      <TripleDotsSVG
                        className={styles.tripledots}
                        onClick={() =>
                          handleOptionsClick(item.id, item.ticket_number)
                        }
                      />
                    </div>
                    {showOptions && item.id === selectedItemId && (
                      <div className={styles.optionsBlock2}>
                        <button
                          onClick={(e) => {
                            handleTicketModalOpen(item.id);
                            setShowOptions(false);
                          }}
                        >
                          Посмотреть талон
                        </button>

                        <button
                          style={{
                            color: "red",
                            backgroundColor: "#f5f5f5",
                            borderRadius: "5px",
                          }}
                          onClick={() => {
                            setShowModal(true);
                            setShowOptions(false);
                          }}
                        >
                          Удалить
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={(e) => setContent3(!content3)}
          className={styles.queue__state}
        >
          <div className={styles.queue__state__title}>
            <ArrowRightSVG
              className={`${styles.arrowRight} ${
                content3 ? `${styles.reverseArrow}` : ``
              }`}
            />
            Отклонен
          </div>
          <div className={styles.queue__state__counter}>
            {rejectedQueues?.length}
          </div>
        </div>
        <div
          style={
            content3
              ? { maxHeight: "100%", display: "block" }
              : { maxHeight: "0px", display: "none" }
          }
          className={styles.tableBlock}
        >
          <div className={styles.table}>
            <div className={styles.tableItems}>
              <div className={styles.tableItem__tbody}>
                <div className={styles.tableItem__thead}>
                  <div className={styles.thead__number}>Клиент №</div>
                  <div className={styles.thead__question}>Вопрос</div>
                  <div className={styles.thead__time}>Время ожидания</div>
                </div>
                {rejectedQueues?.map((item: any, index: number) => (
                  <div
                    key={item.id}
                    className={`${styles.tbody__item__talon}`}
                    style={
                      index % 2 === 1
                        ? { background: "rgba(248, 248, 248, 1)" }
                        : undefined
                    }
                  >
                    <div className={styles.tbody__talon}>
                      <div className={styles.tbody__number}>{index + 1}.</div>
                      <span
                        style={
                          item.category === "pregnant"
                            ? { background: "rgba(252, 190, 183, 1)" }
                            : item.category === "veteran"
                            ? { background: "rgba(155, 228, 129, 1)" }
                            : item.category === "pensioner"
                            ? { background: "rgba(234, 237, 93, 1)" }
                            : item.category === "disabled person"
                            ? { background: "rgba(228, 129, 201, 1)" }
                            : undefined
                        }
                      ></span>{" "}
                      {item.ticket_number}
                    </div>
                    <div className={styles.tbody__question}>{item.queue}</div>
                    <div className={styles.tbody__time}>
                      {item.waiting_time} минут
                    </div>
                    <div className={styles.tbody__buttons}>
                      <TripleDotsSVG
                        className={styles.tripledots}
                        onClick={() =>
                          handleOptionsClick(item.id, item.ticket_number)
                        }
                      />
                    </div>
                    {showOptions && item.id === selectedItemId && (
                      <div className={styles.optionsBlock2}>
                        <button
                          onClick={(e) => {
                            handleTicketModalOpen(item.id);
                            setShowOptions(false);
                          }}
                        >
                          Посмотреть талон
                        </button>

                        <button
                          style={{
                            color: "red",
                            backgroundColor: "#f5f5f5",
                            borderRadius: "5px",
                          }}
                          onClick={() => {
                            setShowModal(true);
                            setShowOptions(false);
                          }}
                        >
                          Удалить
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>
              Вы действительно хотите удалить <br /> клиента{" "}
              <span className={styles.modalSpan}>№{selectedTicketNumber}</span>
            </p>
            <div className={styles.modalButtons}>
              <button
                onClick={() => setShowModal(false)}
                className={styles.cancelBTN}
              >
                Отмена
              </button>
              <button
                onClick={handleDeleteConfirm}
                className={styles.deleteBTN}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
      {showTicketModal && (
        <TicketModal ticketId={selectedTicketId} closeModal={closeModal} />
      )}
      {handleModal && (
        <div className={styles.modal3}>
          <div className={styles.modalContent3}>
            <div className={styles.modalContent3__title}>
              Перевод к другой очереди
            </div>
            <CloseSVG
              className={styles.closeSVG}
              onClick={() => setHandleModal(false)}
            />
            <div className={styles.modalContent3__items}>
              <div className={styles.modal3Content__accordion}>
                <Accordion
                  onSelectWindow={handleSelectPost}
                  windowData={handleChangeWindowData}
                />
                <ArrowSVG />
              </div>
            </div>
            <button className={styles.shift}>Перевести</button>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className={styles.offlineText}>Система отключена</div>
  );
};

export default QueueOperatorPage;
