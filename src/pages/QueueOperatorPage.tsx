import React, { useState, useEffect } from 'react';
import styles from './QueueOperatorPage.module.scss';
import { ReactComponent as ArrowRightSVG } from '../images/chevron-forward-outline (2).svg';
import { ReactComponent as SwitchSVG } from '../images/Vector (4).svg';
import { ReactComponent as TripleDotsSVG } from '../images/Vector (5).svg';
import { useQueueContext } from '../context/QueueContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const QueueOperatorPage = () => {
  const { getCustomers, queues, deleteQueue, rejectQueue, rejectedQueue, handleDragEnd } = useQueueContext();

  useEffect(() => {
    getCustomers();
  }, []);

  const [content1, setContent1] = useState(false);
  const [content2, setContent2] = useState(false);
  const [content3, setContent3] = useState(false);
  const [content4, setContent4] = useState(false);

  const [showOptions, setShowOptions] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedTicketNumber, setSelectedTicketNumber] = useState('');

  const [newItem, setNewItem] = useState(false);

  interface currentITEMType {
    id: number;
    ticket_number: string;
    queue: string;
    waiting_time: number;
    category: string;
    position: number;
  }

  const handleOptionsClick = (itemId: any, ticketNumber: any) => {
    setSelectedItemId(itemId);
    setSelectedTicketNumber(ticketNumber);
    setShowOptions(!showOptions);
    setShowTable(!showTable);
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

  interface categories {
    circleColor?: string;
    title?: string;
  }

  const category: categories[] = [
    {
      circleColor: 'rgba(234, 237, 93, 1)',
      title: 'Пенсионер',
    },
    {
      circleColor: 'rgba(252, 190, 183, 1)',
      title: 'Беременные',
    },
    {
      circleColor: 'rgba(155, 228, 129, 1)',
      title: 'Ветеран',
    },
    {
      circleColor: 'rgba(228, 129, 201, 1)',
      title: 'С ограниченными возможностями',
    },
  ];

  console.log(queues);

  return (
    <div className={styles.hero}>
      <div className={styles.categoryBlock}>
        <div className={styles.bottomNav}>
          <div className={styles.allCounter}>
            Всего - <span>{queues?.length}</span>
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
        </div>
      </div>
      <div className={styles.content__queue}>
        <div onClick={(e) => setContent1(!content1)} className={styles.queue__state}>
          <div className={styles.queue__state__title}>
            <ArrowRightSVG
              className={`${styles.arrowRight} ${content1 ? `${styles.reverseArrow}` : ``}`}
            />
            Ожидает
          </div>
          <div className={styles.queue__state__counter}>{queues?.length}</div>
        </div>
        <div
          style={
            content1
              ? { maxHeight: '100%', display: 'block' }
              : { maxHeight: '0px', display: 'none' }
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
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="queue-list">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {queues?.map((item: any, index: number) => (
                          <Draggable key={item.id.toString()} draggableId={item.id.toString()} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`${styles.tbody__item__talon} ${snapshot.isDragging ? styles.dragging : ''}`}
                                style={index % 2 === 1 ? { background: 'rgba(248, 248, 248, 1)' } : undefined}
                              >
                                <div className={styles.tbody__talon}>
                                  <div className={styles.tbody__number}>{index + 1}.</div>
                                  <span
                                    style={
                                      item.category === 'pregnant'
                                        ? { background: 'rgba(252, 190, 183, 1)' }
                                        : item.category === 'veteran'
                                        ? { background: 'rgba(155, 228, 129, 1)' }
                                        : item.category === 'pensioner'
                                        ? { background: 'rgba(234, 237, 93, 1)' }
                                        : item.category === 'disabled person'
                                        ? { background: 'rgba(228, 129, 201, 1)' }
                                        : undefined
                                    }
                                  ></span>{' '}
                                  {item.ticket_number}
                                </div>
                                <div className={styles.tbody__question}>{item.queue}</div>
                                <div className={styles.tbody__time}>{convertTime(item.waiting_time)}</div>
                                <div className={styles.tbody__buttons}>
                                  <button>Принять</button>
                                    {provided.dragHandleProps && (
                                      <div {...provided.dragHandleProps} className={styles.switch}>
                                        <SwitchSVG className={styles.switchIcon} />
                                      </div>
                                    )}
                                  <TripleDotsSVG
                                    className={styles.tripledots}
                                    onClick={() => handleOptionsClick(item.id, item.ticket_number)}
                                  />
                                </div>
                                {showOptions && item.id === selectedItemId && (
                                  <div className={styles.optionsBlock}>
                                    <button>Посмотреть талон</button>
                                    <button>Перенести в другую очередь</button>
                                    <button
                                      style={{
                                        color: 'red',
                                        backgroundColor: '#f5f5f5',
                                        borderRadius: '5px',
                                      }}
                                      onClick={() => {
                                        setShowModal(true);
                                        setShowOptions(false);
                                      }}
                                    >
                                      Удалить
                                    </button>
                                    <button
                                      style={{
                                        color: 'red',
                                        backgroundColor: '#f5f5f5',
                                        borderRadius: '5px',
                                      }}
                                      onClick={() => {
                                        setNewItem(false);
                                      }}
                                    >
                                      Отклонить
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>
          </div>
        </div>
        <div onClick={(e) => setContent2(!content2)} className={styles.queue__state}>
          <div className={styles.queue__state__title}>
            <ArrowRightSVG
              className={`${styles.arrowRight} ${content2 ? `${styles.reverseArrow}` : ``}`}
            />
            Переведен
          </div>
          <div className={styles.queue__state__counter}>8</div>
        </div>
        <div onClick={(e) => setContent3(!content3)} className={styles.queue__state}>
          <div className={styles.queue__state__title}>
            <ArrowRightSVG
              className={`${styles.arrowRight} ${content3 ? `${styles.reverseArrow}` : ``}`}
            />
            Отклонен
          </div>
          <div className={styles.queue__state__counter}>8</div>
        </div>
        <div onClick={(e) => setContent4(!content4)} className={styles.queue__state}>
          <div className={styles.queue__state__title}>
            <ArrowRightSVG
              className={`${styles.arrowRight} ${content4 ? `${styles.reverseArrow}` : ``}`}
            />
            Принимается
          </div>
          <div className={styles.queue__state__counter}>8</div>
        </div>
      </div>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>
              Вы действительно хотите удалить <br /> клиента{' '}
              <span className={styles.modalSpan}>№{selectedTicketNumber}</span>
            </p>
            <div className={styles.modalButtons}>
              <button onClick={() => setShowModal(false)} className={styles.cancelBTN}>
                Отмена
              </button>
              <button onClick={handleDeleteConfirm} className={styles.deleteBTN}>
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QueueOperatorPage;
