import { DatabaseBackup, Mail, Settings2, Shield } from "lucide-react";

const settings = [
  { title: "Параметри системи", text: "Назва підприємства, мова інтерфейсу та формат дат.", icon: Settings2 },
  { title: "Безпека", text: "Авторизація, ролі користувачів і політика паролів.", icon: Shield },
  { title: "Сповіщення", text: "Email-повідомлення про статуси замовлень і системні події.", icon: Mail },
  { title: "Резервне копіювання", text: "Періодичність створення копій бази даних.", icon: DatabaseBackup },
];

export default function Settings() {
  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Налаштування</h1>
          <p>Адміністрування параметрів автоматизованої системи</p>
        </div>
      </header>

      <section className="settings-grid">
        {settings.map(({ title, text, icon: Icon }) => (
          <article className="panel setting-card" key={title}>
            <Icon size={28} />
            <div>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
