import { useState } from "react";
import { BarChart3, Download, FileSpreadsheet, PieChart } from "lucide-react";

const reports = [
  { title: "Продажі за місяць", text: "Фінансові показники, динаміка доходу та кількість замовлень.", icon: BarChart3 },
  { title: "Залишки товарів", text: "Поточний стан складу, дефіцитні позиції та оборотність.", icon: FileSpreadsheet },
  { title: "Категорії продажів", text: "Порівняння продажів за основними товарними групами.", icon: PieChart },
];

export default function Reports() {
  const [message, setMessage] = useState("Звіти готові до експорту");

  function exportData() {
    const rows = [
      ["Звіт", "Опис"],
      ...reports.map((report) => [report.title, report.text]),
    ];
    const csv = rows.map((row) => row.map((cell) => `"${cell}"`).join(";")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "reports.csv";
    link.click();
    URL.revokeObjectURL(url);
    setMessage("Файл reports.csv сформовано");
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Звіти</h1>
          <p>Аналітика діяльності підприємства</p>
        </div>
        <button className="primary-button" type="button" onClick={exportData}>
          <Download size={18} />
          <span>Експорт даних</span>
        </button>
      </header>

      <div className="settings-status">
        <FileSpreadsheet size={18} />
        <span>{message}</span>
      </div>

      <section className="report-grid">
        {reports.map(({ title, text, icon: Icon }) => (
          <article className="panel report-card" key={title}>
            <Icon size={30} />
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
