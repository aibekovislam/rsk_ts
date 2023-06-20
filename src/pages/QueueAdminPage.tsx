import React from 'react';
import styles from './QueueAdminPage.module.scss';
import { ReactComponent as ArrowRightSVG } from '../images/chevron-forward-outline (2).svg';

const QueueAdminPage = () => {

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

  interface qState {
    title?: string
    counter?: number
  }

  const queueState: qState[] = [
    {
      title: "Ожидает",
      counter: 5 
    },
    {
      title: "Переведен",
      counter: 8
    },
    {
      title: "Отклонен",
      counter: 8
    },
    {
      title: "Принимается",
      counter: 8
    },
  ]

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
              { queueState.map((queue) => (
                <>
                  <div className={styles.queue__state}>
                    <div className={styles.queue__state__title}><ArrowRightSVG className={ styles.arrowRight } /> { queue.title }</div>
                    <div className={styles.queue__state__counter}>{ queue.counter }</div>
                  </div>
                </>
              )) }
        </div>
    </div>
  )
}

export default QueueAdminPage