import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../../utils/const';
import styles from '../../../pages/QueueOperatorPage.module.scss';
import { ReactComponent as TimeSVG } from '../../../images/pepicons-print_clock.svg';
import { ReactComponent as StreamLineSVG } from '../../../images/streamline_interface-edit-write-2-change-document-edit-modify-paper-pencil-write-writing.svg';
 

interface TicketInfo {
  ticket_number: string;
  queue: string;
  minutes_in_queue: number,
  category: string
}

const TicketModal: React.FC<{ ticketId: any }> = ({ ticketId }) => {
  const [ticketInfo, setTicketInfo] = useState<TicketInfo | null>(null);


  useEffect(() => {
    const fetchTicketInfo = async () => {
      try {
        const response = await fetch(`${BASE_URL}/customers/${ticketId}`);
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
    <div className={styles.modal2}>
      <div className={styles.modalContent2}>
        {ticketInfo ? (
          <>
            {/* <p>Ticket Number: {ticketInfo.ticket_number}</p>
            <p>Queue: {ticketInfo.queue}</p> */}
            {/* Display other ticket information */}
            <div className={styles.modalHeader}>
                <div className={styles.modalTime}>
                    <TimeSVG/>
                    <span>{ convertTime(ticketInfo.minutes_in_queue) }</span>
                </div>
                <div className={ styles.modalInfo }>
                    <div className={styles.modalInfo__talon__question}>
                        <div className={styles.modalInfo__talon}>
                            <span style={
                                      ticketInfo.category === 'pregnant'
                                        ? { background: 'rgba(252, 190, 183, 1)' }
                                        : ticketInfo.category === 'veteran'
                                        ? { background: 'rgba(155, 228, 129, 1)' }
                                        : ticketInfo.category === 'pensioner'
                                        ? { background: 'rgba(234, 237, 93, 1)' }
                                        : ticketInfo.category === 'disabled person'
                                        ? { background: 'rgba(228, 129, 201, 1)' }
                                        : undefined
                                    }></span>
                            <div className={styles.talonInfo}>{ ticketInfo.ticket_number }</div>
                        </div>
                        <div className={styles.modalInfo__quesiton}>
                            { ticketInfo.queue }
                        </div>
                    </div>
                </div>
                <div className={styles.modalData}>
                    <div className={styles.modalData__item}>
                        Данные клиента
                    </div>
                    <div className={styles.modalData__item}>
                        <StreamLineSVG className={styles.streamLine} />
                    </div>
                </div>
                <div className={styles.modal}></div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default TicketModal;