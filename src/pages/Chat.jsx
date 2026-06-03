import { useMemo, useState } from "react";
import { CheckCheck, MessageSquareText, Search, Send, UsersRound } from "lucide-react";

const conversations = [
  {
    id: "general",
    name: "Загальний чат",
    type: "Канал",
    members: "18 працівників",
    unread: 2,
    online: true,
  },
  {
    id: "sales",
    name: "Відділ продажів",
    type: "Канал",
    members: "6 працівників",
    unread: 1,
    online: true,
  },
  {
    id: "warehouse",
    name: "Склад",
    type: "Канал",
    members: "5 працівників",
    unread: 0,
    online: true,
  },
  {
    id: "manager",
    name: "Марина Бойко",
    type: "Менеджер",
    members: "онлайн",
    unread: 0,
    online: true,
  },
  {
    id: "logistics",
    name: "Дмитро Коваль",
    type: "Логіст",
    members: "був 12 хв тому",
    unread: 0,
    online: false,
  },
];

const initialMessages = {
  general: [
    { id: 1, author: "Ірина Савчук", role: "Адміністратор", text: "Оновлено графік резервного копіювання.", time: "09:15", mine: false },
    { id: 2, author: "Олександр Дяченко", role: "Аналітик", text: "Підготував звіт по замовленнях за тиждень.", time: "09:40", mine: false },
    { id: 3, author: "Ви", role: "Адміністратор", text: "Перевірю і додам у розділ звітів.", time: "09:44", mine: true },
  ],
  sales: [
    { id: 1, author: "Марина Бойко", role: "Менеджер", text: "Клієнт ТОВ Компанія А просить підтвердити наявність товару.", time: "10:10", mine: false },
    { id: 2, author: "Ви", role: "Адміністратор", text: "Передайте запит на склад, відповідь потрібна до обіду.", time: "10:12", mine: true },
  ],
  warehouse: [
    { id: 1, author: "Андрій Мороз", role: "Комірник", text: "Ноутбуки Lenovo отримано, 12 одиниць вже на складі.", time: "08:55", mine: false },
  ],
  manager: [
    { id: 1, author: "Марина Бойко", role: "Менеджер", text: "Можу додати нового клієнта після погодження договору?", time: "11:05", mine: false },
  ],
  logistics: [
    { id: 1, author: "Дмитро Коваль", role: "Логіст", text: "Доставка по замовленню #10045 запланована на завтра.", time: "Вчора", mine: false },
  ],
};

function getCurrentTime() {
  return new Date().toLocaleTimeString("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Chat() {
  const [activeId, setActiveId] = useState("general");
  const [query, setQuery] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [readConversations, setReadConversations] = useState([]);
  const [status, setStatus] = useState("Чат готовий до роботи");

  const filteredConversations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return conversations.filter((conversation) => conversation.name.toLowerCase().includes(normalizedQuery));
  }, [query]);

  const activeConversation = conversations.find((conversation) => conversation.id === activeId) ?? conversations[0];
  const activeMessages = messages[activeConversation.id] ?? [];

  function openConversation(conversationId) {
    setActiveId(conversationId);
    setReadConversations((current) => [...new Set([...current, conversationId])]);
    setStatus("Відкрито переписку");
  }

  function sendMessage(event) {
    event.preventDefault();
    const text = messageText.trim();

    if (!text) {
      setStatus("Введіть текст повідомлення");
      return;
    }

    setMessages((current) => ({
      ...current,
      [activeConversation.id]: [
        ...(current[activeConversation.id] ?? []),
        {
          id: Date.now(),
          author: "Ви",
          role: "Адміністратор",
          text,
          time: getCurrentTime(),
          mine: true,
        },
      ],
    }));
    setMessageText("");
    setStatus("Повідомлення надіслано");
  }

  function markAllRead() {
    setReadConversations(conversations.map((conversation) => conversation.id));
    setStatus("Усі повідомлення позначено як прочитані");
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Чат працівників</h1>
          <p>Внутрішня комунікація між підрозділами підприємства</p>
        </div>
        <button className="secondary-button" type="button" onClick={markAllRead}>
          <CheckCheck size={18} />
          <span>Позначити прочитаним</span>
        </button>
      </header>

      <div className="settings-status">
        <MessageSquareText size={18} />
        <span>{status}</span>
      </div>

      <section className="chat-shell">
        <aside className="chat-sidebar panel">
          <div className="chat-search">
            <Search size={18} />
            <input placeholder="Пошук працівника або каналу..." value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>

          <div className="chat-list">
            {filteredConversations.map((conversation) => {
              const unread = readConversations.includes(conversation.id) ? 0 : conversation.unread;

              return (
                <button
                  className={`chat-list-item ${conversation.id === activeConversation.id ? "active" : ""}`}
                  key={conversation.id}
                  type="button"
                  onClick={() => openConversation(conversation.id)}
                >
                  <span className="chat-avatar">
                    <UsersRound size={18} />
                    {conversation.online ? <i /> : null}
                  </span>
                  <span>
                    <strong>{conversation.name}</strong>
                    <small>
                      {conversation.type} · {conversation.members}
                    </small>
                  </span>
                  {unread ? <em>{unread}</em> : null}
                </button>
              );
            })}
          </div>
        </aside>

        <article className="chat-panel panel">
          <header className="chat-header">
            <div>
              <h2>{activeConversation.name}</h2>
              <p>
                {activeConversation.type} · {activeConversation.members}
              </p>
            </div>
          </header>

          <div className="message-list">
            {activeMessages.map((message) => (
              <div className={`message ${message.mine ? "mine" : ""}`} key={message.id}>
                <div>
                  <strong>{message.author}</strong>
                  <span>{message.role}</span>
                </div>
                <p>{message.text}</p>
                <small>{message.time}</small>
              </div>
            ))}
          </div>

          <form className="chat-compose" onSubmit={sendMessage}>
            <input
              aria-label="Текст повідомлення"
              placeholder={`Написати у "${activeConversation.name}"...`}
              value={messageText}
              onChange={(event) => setMessageText(event.target.value)}
            />
            <button className="primary-button" type="submit">
              <Send size={18} />
              <span>Надіслати</span>
            </button>
          </form>
        </article>
      </section>
    </div>
  );
}
