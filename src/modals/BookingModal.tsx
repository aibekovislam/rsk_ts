import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../utils/consts';
import styles from '../pages/QueueOperatorPage.module.scss';
import { ReactComponent as TimeSVG } from '../images/pepicons-print_clock.svg';
import { ReactComponent as StreamLineSVG } from '../images/streamline_interface-edit-write-2-change-document-edit-modify-paper-pencil-write-writing.svg';
import { ReactComponent as CloseSVG } from '../images/Vector (6).svg';

interface TicketInfo {
  date: string
  pin: number,
  time: string,
  first_name: string,
  last_name: string,
  surname: string,
  phone_number: any
}

const BookingModal: React.FC<{ ticketId: any; closeModal: () => void }> = ({ ticketId, closeModal  }) => {
  const [ticketInfo, setTicketInfo] = useState<TicketInfo | null>(null);

  const [ editDataTicket, setEditDataTicket ] = useState(false);

  console.log(ticketInfo)

  useEffect(() => {
    const fetchTicketInfo = async () => {
      try {
        const response = await fetch(`${BASE_URL}/booking/${ticketId}`);
        const data = await response.json();
        setTicketInfo(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTicketInfo();
  }, [ticketId]);

  const convertTime = (timeInMinutes: number) => {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    return `${hours}ч ${minutes}мин`;
  };

  return (
    <>
        <div className={styles.modal2}>
        <div className={styles.modalContent2}>
          {ticketInfo ? (
            <>
              <div className={styles.modalHeader}>
                  <div className={styles.modalTime}>
                        <TimeSVG/>
                        <span>{ ticketInfo?.date }</span>
                  </div>
                  <CloseSVG className={styles.closeSVGBTN} onClick={closeModal} />
                  <div className={ styles.modalInfo }>
                      <div className={styles.modalInfo__talon__question}>
                          <div className={styles.modalInfo__talon}>
                              <div className={styles.talonInfo}>Предварительная запись.</div>
                          </div>
                          <div className={styles.modalInfo__quesiton}>
                              Открытие счета.
                          </div>
                      </div>
                  </div>
                  <div className={styles.modalData}>
                      <div className={styles.modalData__item}>
                          Данные клиента
                      </div>
                      <div className={styles.modalData__item}>
                          <StreamLineSVG onClick={(e) => {
                            setEditDataTicket(true)
                          }} className={styles.streamLine} />
                      </div>
                  </div>
                  <form className={styles.modalData__form}>
                    { editDataTicket ? (
                      <>
                        <input type="text" placeholder="first_name" className={styles.editData__name} />
                        <input type="text" placeholder="last_name" className={styles.editData__lastName} />
                        <input type="text" placeholder="surname" className={styles.editData__surname} />
                        <input type="text" placeholder="passport" className={styles.editData__passport} />
                        <input type="date" placeholder="date" className={styles.editData__date} />
                        <input type="phone" placeholder="phone" className={styles.editData__phone} />
                        <input type="text" placeholder="category" className={styles.editData__category} />
                      </>
                    ) : (
                      <>
                        <input className={styles.modalData__name} readOnly placeholder={ ticketInfo.first_name } />
                        <input className={styles.modalData__lastName} readOnly placeholder={ticketInfo.last_name} />
                        <input className={styles.modalData__surname} readOnly placeholder={ticketInfo.surname} />
                        <input className={styles.modalData__passport} readOnly placeholder={`ID ${ticketId?.pin}`} />
                        <input className={styles.modalData__date} readOnly placeholder={ticketInfo.date} />
                        <input className={styles.modalData__phone} readOnly placeholder={ticketInfo?.phone_number} /> 
                        <input className={styles.modalData__category} readOnly placeholder={ticketInfo.time} />
                      </>
                    ) }
                  </form>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingModal;