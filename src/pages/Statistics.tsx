import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useReportContext } from "../context/ReportsContext";
import { exportToExcel } from "../utils/excelExportUtils";
import styles from "./Stat.module.scss";

// Вставьте здесь функцию exportToExcel из предыдущего ответа

function Statistics() {
  const { downloadExcelFile, error2  } = useReportContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true); // State to track loading state
  const [error, setError] = useState<string | null>(null); // State to track errors  

  const savedStatus = localStorage.getItem("status");
  const initialStatus =
    savedStatus === "Online" ? { status: "Online" } : { status: "Отключен" };
  return (
    initialStatus.status === "Online" ? (
      <div className={styles.header}>
        <div className={styles.stat_bar}>
          <div>
            <h1 className={styles.title}>Отчеты и статистики</h1>
          </div>
          <div className={styles.timelaps}>
            {/* Добавляем кнопку для скачивания Excel файла */}
            <button onClick={() => downloadExcelFile(user?.id, "2023")}>Скачать Excel</button>
            <button>Сегодня</button>
            <button>За неделю</button>
            <button>За месяц</button>
            <button>за 3 месяца</button>
            <button>За полгода</button>
            <button>За год</button>
          </div>
        </div>
        <h1
          style={{
            fontSize: "24px",
            textAlign: "center",
            marginTop: "50px",
            fontWeight: "500",
          }}
        >
          Выберите время для отчетов или статистики <br /> Excel, Word и PDF
          файлы
        </h1>
      </div>
    ) : (
      <div>Отклонен от системы</div>
    )
  );
}

export default Statistics;
