import React from 'react'
import { useQueueContext } from '../context/QueueContext'
import { useEffect, useState } from 'react';
import styles from './QueueOperatorPage.module.scss';
import { ReactComponent as TripleDotsSVG } from '../images/Vector (5).svg';
import BookingModal from '../modals/BookingModal';

const BookingOperatorPage = () => {
  const { booking, getBooking,deleteBooking } = useQueueContext();

  useEffect(() => {
    getBooking()
  }, [])
  
  console.log(booking)

  const formattedDateTime = (date: any) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const day = ('0' + dateObj.getDate()).slice(-2);
    const hours = ('0' + dateObj.getHours()).slice(-2);
    const minutes = ('0' + dateObj.getMinutes()).slice(-2);
    const seconds = ('0' + dateObj.getSeconds()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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

  const [showOptions, setShowOptions] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedTicketNumber, setSelectedTicketNumber] = useState('');

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

  const savedStatus = localStorage.getItem('status');
  const initialStatus = savedStatus === 'Online' ? { status: 'Online' } : { status: "Отключен" };

  return (
    initialStatus.status === "Online" ? (
      <div className={styles.hero}>
      <div className={styles.categoryBlock}>
        <div className={styles.bottomNav}>
          <div className={styles.allCounter}>
          Предварительные записи
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
      <div className={styles.tableBlock}>
            <div className={styles.table}>
              <div className={styles.tableItems}>
                <div className={styles.tableItem__tbody}>
                  <div className={styles.tableItem__thead} style={{ width: "68%" }} >
                    <div className={styles.thead__number}>Клиент №</div>
                    <div className={styles.thead__question} style={{ marginLeft: "85px" }}>Операция</div>
                    <div className={styles.thead__time}>Дата/Время</div>
                  </div>      
                            {booking?.map((item: any, index: number) => (
                              <div
                                key={item.id}
                                className={`${styles.tbody__item__talon}`}
                                style={index % 2 === 1 ? { background: 'rgba(248, 248, 248, 1)' } : undefined}>
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
                                <div className={styles.tbody__question}>Открытие счета</div>
                                <div className={styles.tbody__time}>{ formattedDateTime(item.created_at) }</div>
                                <div className={styles.tbody__buttons}>
                                  <TripleDotsSVG
                                    className={styles.tripledots}
                                    onClick={() => handleOptionsClick(item.id, item.ticket_number)}
                                  />
                                </div>
                                {showOptions && item.id === selectedItemId && (
                                  <div className={styles.optionsBlock2} style={{ top: "65%" }} >
                                    <button onClick={(e) => {
                                      handleTicketModalOpen(item.id)
                                      setShowOptions(false)
                                      }} >Посмотреть талон</button>
                                    
                                    <button
                                      style={{
                                        color: 'red',
                                        backgroundColor: '#f5f5f5',
                                        borderRadius: '5px',
                                      }}
                                      onClick={() => {
                                        deleteBooking(item.id)
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
      {showTicketModal && (
        <BookingModal ticketId={selectedTicketId} closeModal={closeModal}/>
      )}
    </div>
    ) : (
      <div>Отключен от системы</div>
    )
  )
}

export default BookingOperatorPage