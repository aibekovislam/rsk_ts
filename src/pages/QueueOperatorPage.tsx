import React, { useState, useEffect } from 'react';
import styles from './QueueOperatorPage.module.scss';
import { ReactComponent as ArrowRightSVG } from '../images/chevron-forward-outline (2).svg';
import { ReactComponent as SwitchSVG } from '../images/Vector (4).svg';
import { ReactComponent as TripleDotsSVG } from '../images/Vector (5).svg';
import { useQueueContext } from '../context/QueueContext';

const QueueOperatorPage = () => {
  const { getCustomers, queues, deleteQueue, rejectQueue, rejectedQueue } = useQueueContext();

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

  const [ newItem, setNewItem ] = useState(false);


  interface currentITEMType {
    id: number,
    ticket_number: string,
    queue: string,
    waiting_time: number,
    category: string,
    position: number
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
      circleColor: "rgba(234, 237, 93, 1)",
      title: "Пенсионер" 
    },
    {
      circleColor: "rgba(252, 190, 183, 1)",
      title: "Беременные" 
    },
    {
      circleColor: "rgba(155, 228, 129, 1)",
      title: "Ветеран" 
    },
    {
      circleColor: "rgba(228, 129, 201, 1)",
      title: "С ограниченными возможностями" 
    },
  ]


  return (
    <div className={styles.hero}>
      <div className={styles.categoryBlock}>
        <div className={styles.bottomNav}>
          <div className={styles.allCounter}>
            Всего - <span>{queues?.length}</span>
          </div>
        </div>
        <div className={styles.categories}>
              { category.map((item) => (
                <div className={styles.category__block}>
                  <div className={styles.circle_category} style={{ backgroundColor: item.circleColor }} ></div>
                  <div className={styles.category__title}>{ item.title }</div>
                </div>
              )) } 
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
          <table className={`${styles.table}`}>
            <thead>
              <tr>
                <th>Клиент №</th>
                <th>Вопрос</th>
                <th>Время ожидания</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {queues?.map((item: any, index: number) => (
                <tr
                  key={index}
                  draggable={true}
                >
                  <td className={styles.counter}>
                    {index + 1}.{' '}
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
                    <p>{item.ticket_number}</p>
                  </td>
                  <td>{item.queue}</td>
                  <td className={styles.time}>{convertTime(item.waiting_time)}</td>
                  <td className={styles.buttonTD}>
                    <button className={styles.accept__button}>Принять</button>
                  </td>
                  <td className={styles.svgBTN}>
                    <SwitchSVG className={styles.switch} />
                  </td>
                  <td
                    className={styles.svgBTN}
                    onClick={() => handleOptionsClick(item.id, item.ticket_number)}
                  >
                    <TripleDotsSVG className={styles.tripleDots} />
                  </td>
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
                          rejectQueue(item.id, newItem);
                          // console.log(rejectedQueue)
                        }}
                      >
                        Отклонить
                      </button>
                    </div>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
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
