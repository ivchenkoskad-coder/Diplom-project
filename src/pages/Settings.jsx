import { useState } from "react";
import {
  BellRing,
  CheckCircle2,
  DatabaseBackup,
  Mail,
  RotateCcw,
  Save,
  Settings2,
  Shield,
} from "lucide-react";

const defaultSystem = {
  companyName: "АС Управління підприємством",
  interfaceLanguage: "uk",
  dateFormat: "dd.mm.yyyy",
  currency: "UAH",
};

const defaultSecurity = {
  twoFactor: true,
  sessionTimeout: 30,
  passwordLength: 8,
  loginAttempts: 5,
};

const defaultNotifications = {
  orderStatus: true,
  lowStock: true,
  dailyReport: false,
  systemErrors: true,
};

const defaultBackup = {
  frequency: "daily",
  backupTime: "22:00",
  keepCopies: 14,
};

const defaultBackupLog = [
  { date: "07.06.2024 22:00", type: "Автоматична", status: "Виконано" },
  { date: "06.06.2024 22:00", type: "Автоматична", status: "Виконано" },
  { date: "05.06.2024 12:35", type: "Ручна", status: "Виконано" },
];

function readStorage(key, fallback) {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const saved = window.localStorage.getItem(key);
    return saved ? { ...fallback, ...JSON.parse(saved) } : fallback;
  } catch {
    return fallback;
  }
}

function readStorageList(key, fallback) {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const saved = window.localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function saveStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function Toggle({ checked, label, name, onChange }) {
  return (
    <label className="settings-toggle">
      <span>{label}</span>
      <input checked={checked} name={name} onChange={onChange} type="checkbox" />
      <span aria-hidden="true" />
    </label>
  );
}

export default function Settings() {
  const [system, setSystem] = useState(() => readStorage("system-settings", defaultSystem));
  const [security, setSecurity] = useState(() => readStorage("security-settings", defaultSecurity));
  const [notifications, setNotifications] = useState(() => readStorage("notification-settings", defaultNotifications));
  const [backup, setBackup] = useState(() => readStorage("backup-settings", defaultBackup));
  const [backupLog, setBackupLog] = useState(() => readStorageList("backup-log", defaultBackupLog));
  const [message, setMessage] = useState("Налаштування готові до редагування");

  function updateSystem(event) {
    const { name, value } = event.target;
    setSystem((current) => ({ ...current, [name]: value }));
  }

  function updateSecurity(event) {
    const { name, value } = event.target;
    setSecurity((current) => ({ ...current, [name]: Number(value) }));
  }

  function updateSecurityToggle(event) {
    setSecurity((current) => ({ ...current, twoFactor: event.target.checked }));
  }

  function updateNotification(event) {
    const { name, checked } = event.target;
    setNotifications((current) => ({ ...current, [name]: checked }));
  }

  function updateBackup(event) {
    const { name, value } = event.target;
    setBackup((current) => ({
      ...current,
      [name]: name === "keepCopies" ? Number(value) : value,
    }));
  }

  function saveAllSettings() {
    saveStorage("system-settings", system);
    saveStorage("security-settings", security);
    saveStorage("notification-settings", notifications);
    saveStorage("backup-settings", backup);
    saveStorage("backup-log", backupLog);
    setMessage("Налаштування збережено");
  }

  function resetSettings() {
    setSystem(defaultSystem);
    setSecurity(defaultSecurity);
    setNotifications(defaultNotifications);
    setBackup(defaultBackup);
    setBackupLog(defaultBackupLog);
    saveStorage("system-settings", defaultSystem);
    saveStorage("security-settings", defaultSecurity);
    saveStorage("notification-settings", defaultNotifications);
    saveStorage("backup-settings", defaultBackup);
    saveStorage("backup-log", defaultBackupLog);
    setMessage("Параметри повернено до стандартних значень");
  }

  function createBackup() {
    const now = new Date();
    const date = now.toLocaleString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const nextLog = [{ date, type: "Ручна", status: "Виконано" }, ...backupLog].slice(0, backup.keepCopies);
    setBackupLog(nextLog);
    saveStorage("backup-log", nextLog);
    setMessage("Резервну копію створено");
  }

  function sendTestEmail() {
    setMessage("Тестове сповіщення сформовано для admin@enterprise.local");
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Налаштування</h1>
          <p>Адміністрування параметрів автоматизованої системи</p>
        </div>
        <div className="settings-actions">
          <button className="secondary-button" type="button" onClick={resetSettings}>
            <RotateCcw size={18} />
            <span>Скинути</span>
          </button>
          <button className="primary-button" type="button" onClick={saveAllSettings}>
            <Save size={18} />
            <span>Зберегти</span>
          </button>
        </div>
      </header>

      <div className="settings-status">
        <CheckCircle2 size={18} />
        <span>{message}</span>
      </div>

      <section className="settings-board">
        <article className="panel settings-panel">
          <div className="panel-heading">
            <h2>Параметри системи</h2>
            <Settings2 size={22} />
          </div>
          <div className="settings-form-grid">
            <label>
              Назва системи
              <input name="companyName" value={system.companyName} onChange={updateSystem} />
            </label>
            <label>
              Мова інтерфейсу
              <select name="interfaceLanguage" value={system.interfaceLanguage} onChange={updateSystem}>
                <option value="uk">Українська</option>
                <option value="ru">Російська</option>
                <option value="en">English</option>
              </select>
            </label>
            <label>
              Формат дати
              <select name="dateFormat" value={system.dateFormat} onChange={updateSystem}>
                <option value="dd.mm.yyyy">31.12.2024</option>
                <option value="yyyy-mm-dd">2024-12-31</option>
                <option value="dd/mm/yyyy">31/12/2024</option>
              </select>
            </label>
            <label>
              Валюта
              <select name="currency" value={system.currency} onChange={updateSystem}>
                <option value="UAH">Гривня (₴)</option>
                <option value="EUR">Євро (€)</option>
                <option value="USD">Долар ($)</option>
              </select>
            </label>
          </div>
        </article>

        <article className="panel settings-panel">
          <div className="panel-heading">
            <h2>Безпека</h2>
            <Shield size={22} />
          </div>
          <div className="settings-form-grid">
            <Toggle checked={security.twoFactor} label="Двофакторна авторизація" name="twoFactor" onChange={updateSecurityToggle} />
            <label>
              Сесія, хв
              <input min="5" name="sessionTimeout" type="number" value={security.sessionTimeout} onChange={updateSecurity} />
            </label>
            <label>
              Мін. довжина пароля
              <input min="6" name="passwordLength" type="number" value={security.passwordLength} onChange={updateSecurity} />
            </label>
            <label>
              Спроб входу
              <input min="3" name="loginAttempts" type="number" value={security.loginAttempts} onChange={updateSecurity} />
            </label>
          </div>
        </article>

        <article className="panel settings-panel">
          <div className="panel-heading">
            <h2>Сповіщення</h2>
            <BellRing size={22} />
          </div>
          <div className="settings-list">
            <Toggle checked={notifications.orderStatus} label="Зміна статусу замовлення" name="orderStatus" onChange={updateNotification} />
            <Toggle checked={notifications.lowStock} label="Низький залишок товарів" name="lowStock" onChange={updateNotification} />
            <Toggle checked={notifications.dailyReport} label="Щоденний звіт керівнику" name="dailyReport" onChange={updateNotification} />
            <Toggle checked={notifications.systemErrors} label="Системні помилки" name="systemErrors" onChange={updateNotification} />
          </div>
          <button className="secondary-button full-button" type="button" onClick={sendTestEmail}>
            <Mail size={18} />
            <span>Надіслати тест</span>
          </button>
        </article>

        <article className="panel settings-panel">
          <div className="panel-heading">
            <h2>Резервне копіювання</h2>
            <DatabaseBackup size={22} />
          </div>
          <div className="settings-form-grid">
            <label>
              Періодичність
              <select name="frequency" value={backup.frequency} onChange={updateBackup}>
                <option value="daily">Щодня</option>
                <option value="weekly">Щотижня</option>
                <option value="manual">Вручну</option>
              </select>
            </label>
            <label>
              Час копії
              <input name="backupTime" type="time" value={backup.backupTime} onChange={updateBackup} />
            </label>
            <label>
              Кількість копій
              <input min="3" name="keepCopies" type="number" value={backup.keepCopies} onChange={updateBackup} />
            </label>
          </div>
          <button className="primary-button full-button" type="button" onClick={createBackup}>
            <DatabaseBackup size={18} />
            <span>Створити копію</span>
          </button>
        </article>
      </section>

      <section className="panel backup-panel">
        <div className="panel-heading">
          <h2>Журнал резервних копій</h2>
        </div>
        <div className="backup-log">
          {backupLog.map((entry, index) => (
            <div className="backup-row" key={`${entry.date}-${index}`}>
              <span>{entry.date}</span>
              <strong>{entry.type}</strong>
              <em>{entry.status}</em>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
