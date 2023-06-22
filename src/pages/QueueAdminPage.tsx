import React, { useState, useEffect } from 'react';
import styles from './QueueAdminPage.module.scss';
import { ReactComponent as ArrowRightSVG } from '../images/chevron-forward-outline (2).svg';
import { ReactComponent as SwitchSVG } from '../images/Vector (4).svg';
import { ReactComponent as TripleDotsSVG } from '../images/Vector (5).svg';
import { useQueueContext } from '../contexts/QueueContext';

const QueueAdminPage = () => {
  const { getCustomers, queues } = useQueueContext()

  useEffect(() => {
    getCustomers()
  }, [])

  console.log(queues)

  const [ content1, setContent1 ] = useState(false);
  const [ content2, setContent2 ] = useState(false);
  const [ content3, setContent3 ] = useState(false);
  const [ content4, setContent4 ] = useState(false);

  const [showOptions, setShowOptions] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const handleOptionsClick = () => {
    setShowOptions(!showOptions);
    setShowTable(!showTable);
  }

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

  interface qCards {
    id: number,
    talonID?: string,
    question?: string,
    timeQueue?: string,
    accepted?: boolean,
    isSpecial?: boolean
  }

  interface qState {
    title?: string
    counter?: number
  }

  const queueCards: qCards[] = [
    {
      id: 1,
      talonID: "Б201",
      question: "Открытие вклада",
      timeQueue: "20мин",
      accepted: false,
      isSpecial: true
    },
    {
      id: 2,
      talonID: "Б201",
      question: "Открытие вклада",
      timeQueue: "20мин",
      accepted: false,
      isSpecial: true
    },
    {
      id: 3,
      talonID: "Б201",
      question: "Открытие вклада",
      timeQueue: "20мин",
      accepted: false,
      isSpecial: false
    },
    {
      id: 4,
      talonID: "Б201",
      question: "Открытие вклада",
      timeQueue: "20мин",
      accepted: false,
      isSpecial: false
    },
    {
      id: 5,
      talonID: "Б201",
      question: "Открытие вклада",
      timeQueue: "20мин",
      accepted: false,
      isSpecial: false
    }
  ]

  const counter: number[] = [];

  for(let i = 1; i < queueCards.length; i++) {
    counter.push(i);
  }
  console.log(counter)

  return (
    <div className={styles.hero}>
        <div className={styles.bottomNav}>
          <div className={styles.allCounter}>
            Всего - <span>8</span>
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
              <div className={styles.queue__state__title}><ArrowRightSVG className={`${styles.arrowRight} ${ content1 ? `${styles.reverseArrow}` : `` }`} />Ожидает</div>
              <div className={styles.queue__state__counter}>5</div>
            </div>
              <div style={ content1 ? { maxHeight: "100%", display: "block" } : { maxHeight: "0px", display: 'none' } } className={styles.tableBlock}>
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
                  {queueCards.map((item) => (
                    <tr>
                      <td className={styles.counter}>
                        {item.id}. {item.isSpecial && <span style={{ background: category[0].circleColor }}></span>} {item.talonID}
                      </td>
                      <td>{item.question}</td>
                      <td className={styles.time}>{item.timeQueue}</td>
                      <td className={styles.buttonTD}>
                        <button className={styles.accept__button}>Принять</button>
                      </td>
                      <td className={styles.svgBTN}>
                        <SwitchSVG className={styles.switch} />
                      </td>
                      <td className={styles.svgBTN} onClick={handleOptionsClick}>
                        <TripleDotsSVG className={styles.tripleDots} />
                      </td>
                      {showOptions && (
                          <div className={styles.optionsBlock}>
                            <button>Посмотреть талон</button>
                            <button>Перенести в другую очередь</button>
                            <button style={{ color: "red", backgroundColor: "#f5f5f5", borderRadius: "5px" }}>Удалить</button>
                          </div>
                        )}
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            <div onClick={(e) => setContent2(!content2)} className={styles.queue__state}>
              <div className={styles.queue__state__title}><ArrowRightSVG className={`${styles.arrowRight} ${ content2 ? `${styles.reverseArrow}` : `` }`} />Переведен</div>
              <div className={styles.queue__state__counter}>8</div>
            </div>
            <div onClick={(e) => setContent3(!content3)} className={styles.queue__state}>
              <div className={styles.queue__state__title}><ArrowRightSVG className={`${styles.arrowRight} ${ content3 ? `${styles.reverseArrow}` : `` }`} />Отклонен</div>
              <div className={styles.queue__state__counter}>8</div>
            </div>
            <div onClick={(e) => setContent4(!content4)} className={styles.queue__state}>
              <div className={styles.queue__state__title}><ArrowRightSVG className={`${styles.arrowRight} ${ content4 ? `${styles.reverseArrow}` : `` }`} />Принимается</div>
              <div className={styles.queue__state__counter}>8</div>
            </div>
        </div>
    </div>
  )
}

export default QueueAdminPage