import React from "react";
import styles from "./Stat.module.scss";
import { LineChart, data, options } from "../components/chart/LineChart";

function Statistics() {
  return (
    <div className={styles.header}>
      <div className={styles.stat_bar}>
        <div>
          <h1 className={styles.title}>Статистика</h1>
        </div>
        <div className={styles.timelaps}>
          <button>Сегодня</button>
          <button>За неделю</button>
          <button>За месяц</button>
          <button>за 3 месяца</button>
          <button>За полгода</button>
          <button>За год</button>
        </div>
      </div>

      <LineChart options={options} data={data} />
    </div>
  );
}

export default Statistics;
