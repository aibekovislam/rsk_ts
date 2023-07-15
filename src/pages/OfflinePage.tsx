import React from 'react'
import styles from './QueueOperatorPage.module.scss';

const OfflinePage = () => {
  return (
    <div className={styles.offline} >
        Вы отключены от системы, поменяйте статус чтобы начать работу.
    </div>
  )
}

export default OfflinePage