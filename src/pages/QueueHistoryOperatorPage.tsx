import React from 'react';
import { useEffect } from 'react';
import { useQueueContext } from '../context/QueueContext';
import styles from './QueueOperatorPage.module.scss';

const QueueHistoryOperatorPage = () => {

    const { allQueues, getAllQueues } = useQueueContext();

    useEffect(() => {
      getAllQueues()
    }, [])

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
    

  return (
    <div className={styles.hero}>
      <div className={styles.categoryBlock}>
        <div className={styles.bottomNav}>
          <div className={styles.allCounter}>
            Всего - <span>{allQueues?.length}</span>
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
                  <div className={styles.tableItem__thead} style={{ width: "100%" }} >
                    <div className={styles.thead__number}>Клиент №</div>
                    <div className={styles.thead__question} style={{ marginLeft: "125px" }}>Операция</div>
                    <div className={styles.thead__time}>Дата/Время</div>
                    <div className={styles.thead__time}>Результат</div>
                  </div>      
                  {allQueues?.map((item: any, index: number) => (
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
                                <div className={styles.tbody__time}>{ formattedDateTime(item.served_at) }</div>
                                <div className={styles.tbody__result} style={ item.old_operator === null ? { color: "#57C955" } : { color: "lightcoral" } } >{ item.old_operator === null ? "Завершен" : "Переведен" }</div>
                              </div>
                            ))}
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default QueueHistoryOperatorPage