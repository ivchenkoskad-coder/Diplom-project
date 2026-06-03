import { useMemo, useState } from "react";
import { CheckCheck, MessageSquareText, Search, Send, UsersRound } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { conversations, initialMessages } from "../features/employee-chat/data";

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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const requestedConversation = searchParams.get("conversation");
  const requestedName = searchParams.get("name");
  const requestedRole = searchParams.get("role") ?? "Працівник";
  const requestedPresence = searchParams.get("presence") ?? "новий працівник";

  const visibleConversations = useMemo(() => {
    const hasConversation = conversations.some((conversation) => conversation.id === requestedConversation);

    if (!requestedConversation || !requestedName || hasConversation) {
      return conversations;
    }

    return [
      {
        id: requestedConversation,
        name: requestedName,
        type: requestedRole,
        members: requestedPresence,
        unread: 0,
        online: requestedPresence === "онлайн" || requestedPresence === "новий працівник",
      },
      ...conversations,
    ];
  }, [requestedConversation, requestedName, requestedPresence, requestedRole]);

  const requestedExists = visibleConversations.some((conversation) => conversation.id === requestedConversation);
  const selectedId = requestedExists ? requestedConversation : activeId;

  const filteredConversations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return visibleConversations.filter((conversation) => conversation.name.toLowerCase().includes(normalizedQuery));
  }, [query, visibleConversations]);

  const activeConversation = visibleConversations.find((conversation) => conversation.id === selectedId) ?? visibleConversations[0];
  const activeMessages = messages[activeConversation.id] ?? [];

  function openConversation(conversationId) {
    setActiveId(conversationId);
    setReadConversations((current) => [...new Set([...current, conversationId])]);
    setStatus("Відкрито переписку");

    if (requestedConversation) {
      navigate("/chat", { replace: true });
    }
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
    setReadConversations(visibleConversations.map((conversation) => conversation.id));
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
            {activeMessages.length ? (
              activeMessages.map((message) => (
                <div className={`message ${message.mine ? "mine" : ""}`} key={message.id}>
                  <div>
                    <strong>{message.author}</strong>
                    <span>{message.role}</span>
                  </div>
                  <p>{message.text}</p>
                  <small>{message.time}</small>
                </div>
              ))
            ) : (
              <div className="empty-chat">
                <strong>Нова переписка</strong>
                <span>Напишіть перше повідомлення працівнику.</span>
              </div>
            )}
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
