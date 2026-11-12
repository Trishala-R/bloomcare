import React, { useEffect, useMemo, useState } from "react";

/*
  BloomCare Women's Health page
  Save this file as: src/WomensHealth.jsx
  Uses React only. Styling is scoped to this component and stored locally in the browser.
*/

const STORAGE_KEY = "bloomcare_womens_health_v1";
const DAY = 24 * 60 * 60 * 1000;

const toISO = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
const parseDate = (value) => {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d, 12);
};
const addDays = (date, days) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + days, 12);
const daysBetween = (a, b) => Math.round((parseDate(toISO(b)) - parseDate(toISO(a))) / DAY);
const formatDate = (date, options = { day: "numeric", month: "short" }) =>
  date ? date.toLocaleDateString("en-IN", options) : "—";
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const starterArticles = [
  { category: "MENSTRUAL HEALTH", title: "Getting to know your cycle", text: "Your menstrual cycle is more than your period. Learn how its phases work together.", image: "/images/menstrual.jpg", read: "A menstrual cycle is counted from the first day of one period to the first day of the next. Cycle length can vary from person to person and from month to month. Tracking your dates and symptoms can help you notice your own patterns." },
  { category: "WELLNESS", title: "Gentle ways to ease cramps", text: "Small comfort measures that may help you feel more at ease during your period.", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80", read: "A warm compress, gentle movement, rest and staying hydrated may help with period discomfort. Severe, new or disruptive pain deserves medical advice rather than being dismissed as normal." },
  { category: "HORMONES", title: "Hormones through the month", text: "A simple introduction to the hormonal changes that occur during a cycle.", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80", read: "Oestrogen and progesterone change throughout the cycle. These hormones help regulate the uterine lining and are involved in ovulation. Experiences such as energy, mood and skin changes differ widely." },
  { category: "FERTILITY", title: "Understanding the fertile window", text: "Learn why the days around ovulation are often considered the most fertile.", image: "/images/fertility image.jpg", read: "The fertile window is commonly estimated as the five days before ovulation and the day of ovulation. Calendar estimates cannot confirm ovulation or prevent pregnancy." },
];
const laterArticles = [
  { title: "Build a period care kit", text: "Prepare a few essentials for comfort at home or on the go.", image: "/images/period care kit.jpg" },
  { title: "Ovulation: the basics", text: "What ovulation means and how it fits into the menstrual cycle.", image: "/images/ovulation.jpg" },
  { title: "Everyday intimate hygiene", text: "Gentle, practical information for caring for your intimate health.", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80" },
  { title: "Make space for self-care", text: "Simple ways to check in with your body and wellbeing.", image: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=800&q=80" },
];
const symptomOptions = ["Cramps", "Headache", "Bloating", "Acne", "Fatigue", "Breast tenderness", "Backache", "Mood changes", "Nausea", "Other"];

function loadSaved() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return value && typeof value === "object" ? value : null;
  } catch {
    return null;
  }
}
function saveSaved(value) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(value)); } catch { /* storage may be unavailable */ }
}

function calculateCycle(records, fallbackLength = 28, fallbackPeriod = 5) {
  const sorted = [...records].sort((a, b) => a.start.localeCompare(b.start));
  const starts = sorted.map((r) => parseDate(r.start)).filter(Boolean);
  const intervals = starts.slice(1).map((date, i) => daysBetween(starts[i], date)).filter((n) => n >= 15 && n <= 60);
  const averageCycle = intervals.length
    ? Math.round(intervals.reduce((sum, n) => sum + n, 0) / intervals.length)
    : clamp(Number(fallbackLength) || 28, 21, 45);
  const durations = sorted.map((r) => r.end && r.start ? daysBetween(parseDate(r.start), parseDate(r.end)) + 1 : null)
    .filter((n) => n && n >= 1 && n <= 10);
  const averagePeriod = durations.length
    ? Math.round(durations.reduce((sum, n) => sum + n, 0) / durations.length)
    : clamp(Number(fallbackPeriod) || 5, 1, 10);
  const lastStart = starts[starts.length - 1] || null;
  const nextPeriod = lastStart ? addDays(lastStart, averageCycle) : null;
  const ovulation = nextPeriod ? addDays(nextPeriod, -14) : null;
  const fertileStart = ovulation ? addDays(ovulation, -5) : null;
  const fertileEnd = ovulation ? addDays(ovulation, 1) : null;
  return { averageCycle, averagePeriod, lastStart, nextPeriod, ovulation, fertileStart, fertileEnd, sorted };
}

function Icon({ children }) { return <span className="wh-icon" aria-hidden="true">{children}</span>; }

function CalendarCard({ cycle, records }) {
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1, 12));
  const today = new Date();
  const first = new Date(month.getFullYear(), month.getMonth(), 1, 12);
  const startOffset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells = Array.from({ length: Math.ceil((startOffset + daysInMonth) / 7) * 7 }, (_, i) => {
    const day = i - startOffset + 1;
    return day > 0 && day <= daysInMonth ? new Date(month.getFullYear(), month.getMonth(), day, 12) : null;
  });
  const isLoggedPeriod = (date) => records.some((r) => {
    const start = parseDate(r.start); const end = parseDate(r.end || r.start);
    return date >= start && date <= end;
  });
  const isPredictedPeriod = (date) => {
    if (!cycle.nextPeriod) return false;
    for (let i = -1; i < 3; i++) {
      const start = addDays(cycle.nextPeriod, cycle.averageCycle * i);
      if (date >= start && date <= addDays(start, cycle.averagePeriod - 1)) return true;
    }
    return false;
  };
  const isFertile = (date) => {
    if (!cycle.fertileStart || !cycle.fertileEnd) return false;
    for (let i = -1; i < 3; i++) {
      const start = addDays(cycle.fertileStart, cycle.averageCycle * i);
      const end = addDays(cycle.fertileEnd, cycle.averageCycle * i);
      if (date >= start && date <= end) return true;
    }
    return false;
  };
  const isOvulation = (date) => {
    if (!cycle.ovulation) return false;
    for (let i = -1; i < 3; i++) if (toISO(date) === toISO(addDays(cycle.ovulation, cycle.averageCycle * i))) return true;
    return false;
  };
  return (
    <section className="wh-card wh-calendar">
      <div className="wh-card-heading">
        <div><span className="wh-kicker">YOUR CYCLE</span><h2>Cycle calendar</h2></div>
        <div className="wh-month-controls">
          <button aria-label="Previous month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1, 12))}>‹</button>
          <strong>{month.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</strong>
          <button aria-label="Next month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1, 12))}>›</button>
        </div>
      </div>
      <div className="wh-calendar-grid">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <span className="wh-weekday" key={d}>{d}</span>)}
        {cells.map((date, i) => {
          if (!date) return <span className="wh-day empty" key={`e${i}`} />;
          const todayClass = toISO(date) === toISO(today) ? " today" : "";
          const logged = isLoggedPeriod(date);
          const predicted = isPredictedPeriod(date) && !logged;
          const fertile = isFertile(date);
          const ovulation = isOvulation(date);
          return <span key={toISO(date)} className={`wh-day${todayClass}${logged ? " logged" : ""}${predicted ? " predicted" : ""}${fertile ? " fertile" : ""}${ovulation ? " ovulation" : ""}`} title={logged ? "Logged period" : ovulation ? "Estimated ovulation" : fertile ? "Estimated fertile window" : predicted ? "Predicted period" : ""}>{date.getDate()}{ovulation && <i>✦</i>}</span>;
        })}
      </div>
      <div className="wh-legend">
        <span><i className="dot logged-dot" />Logged period</span><span><i className="dot predicted-dot" />Predicted period</span><span><i className="dot fertile-dot" />Fertile window</span><span><i className="dot ovulation-dot" />Ovulation</span>
      </div>
    </section>
  );
}

function ArticleCard({ article, onRead }) {
  return <article className="wh-article-card">
    <img src={article.image} alt="" loading="lazy" />
    <div className="wh-article-body">
      {article.category && <span className="wh-kicker">{article.category}</span>}
      <h3>{article.title}</h3><p>{article.text}</p>
      <button className="wh-text-button" onClick={() => onRead(article)}>Read more <span>→</span></button>
    </div>
  </article>;
}

function InsightsTab({ onRead }) {
  return <div className="wh-page-content">
    <div className="wh-page-intro"><span className="wh-kicker">LEARN ABOUT YOUR BODY</span><h1>Insights for every phase</h1><p>Clear, supportive information to help you understand your cycle and wellbeing.</p></div>
    <div className="wh-article-grid">{starterArticles.map((a) => <ArticleCard key={a.title} article={a} onRead={onRead} />)}</div>
    <div className="wh-card wh-note"><strong>A note about your health</strong><p>These articles are for general education and are not a substitute for personal medical advice. Speak with a qualified healthcare professional about concerns or symptoms.</p></div>
  </div>;
}

function SecretChatsTab() {
  const [messages, setMessages] = useState([{ from: "guide", text: "Hi, this is a private educational space. What would you like to learn about today?" }]);
  const [draft, setDraft] = useState("");
  const send = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    const question = draft.trim();
    setMessages((old) => [...old, { from: "you", text: question }, { from: "guide", text: "Thanks for sharing. I can offer general women's-health information, but I can't diagnose symptoms. For severe pain, heavy bleeding, or an urgent concern, please contact a healthcare professional." }]);
    setDraft("");
  };
  return <div className="wh-page-content"><div className="wh-page-intro"><span className="wh-kicker">A PRIVATE LEARNING SPACE</span><h1>Secret Chats</h1><p>Ask general questions about periods, fertility, sexual health and reproductive wellness.</p></div>
    <div className="wh-chat-panel"><div className="wh-chat-top"><span className="wh-chat-avatar">♡</span><div><strong>BloomCare Guide</strong><small>Educational support · Not a medical professional</small></div><span className="wh-private">Private on this device</span></div>
      <div className="wh-chat-messages">{messages.map((m, i) => <div key={i} className={`wh-chat-bubble ${m.from === "you" ? "mine" : ""}`}>{m.text}</div>)}</div>
      <form className="wh-chat-form" onSubmit={send}><input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type your question…" aria-label="Your question" /><button type="submit">Send</button></form>
      <p className="wh-small-note">Chat messages stay in this page session and are not sent to a server.</p>
    </div>
  </div>;
}

function MessagesTab({ cycle }) {
  const items = [
    { title: "Your cycle overview", text: cycle.nextPeriod ? `Your next period is estimated around ${formatDate(cycle.nextPeriod, { day: "numeric", month: "long" })}.` : "Add your period dates to see cycle reminders.", icon: "♡" },
    { title: "Cycle tracking reminder", text: "Log your period when it begins to keep your predictions up to date.", icon: "◷" },
    { title: "Wellness check-in", text: "Notice any symptoms or changes and record them if you find tracking helpful.", icon: "✦" },
  ];
  return <div className="wh-page-content"><div className="wh-page-intro"><span className="wh-kicker">YOUR UPDATES</span><h1>Messages</h1><p>Helpful reminders and cycle updates from BloomCare.</p></div>
    <div className="wh-message-list">{items.map((item) => <div className="wh-message-item" key={item.title}><span className="wh-message-icon">{item.icon}</span><div><strong>{item.title}</strong><p>{item.text}</p><small>BloomCare · Today</small></div></div>)}</div>
  </div>;
}

function PartnerTab({ cycle }) {
  const [enabled, setEnabled] = useState(false);
  const [sharePeriod, setSharePeriod] = useState(true);
  const [shareFertile, setShareFertile] = useState(false);
  const [shareSymptoms, setShareSymptoms] = useState(false);
  return <div className="wh-page-content"><div className="wh-page-intro"><span className="wh-kicker">YOU'RE IN CONTROL</span><h1>Partner connection</h1><p>Choose if and what you would like to share. Nothing is shared automatically.</p></div>
    <div className="wh-partner-card"><div className="wh-partner-illustration">♡</div><h2>Share only what feels right</h2><p>This demo keeps your choices on this device. It does not invite a partner or send information.</p>
      <label className="wh-toggle-row"><span><strong>Enable partner sharing</strong><small>Turn on your sharing preferences</small></span><input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} /></label>
      <div className={`wh-share-options ${!enabled ? "disabled" : ""}`}>
        <label className="wh-toggle-row"><span><strong>Cycle overview</strong><small>Estimated next period: {cycle.nextPeriod ? formatDate(cycle.nextPeriod, { day: "numeric", month: "short" }) : "Not available"}</small></span><input type="checkbox" checked={sharePeriod} disabled={!enabled} onChange={(e) => setSharePeriod(e.target.checked)} /></label>
        <label className="wh-toggle-row"><span><strong>Fertile window estimate</strong><small>Share an approximate window</small></span><input type="checkbox" checked={shareFertile} disabled={!enabled} onChange={(e) => setShareFertile(e.target.checked)} /></label>
        <label className="wh-toggle-row"><span><strong>Symptoms</strong><small>Share selected symptom notes</small></span><input type="checkbox" checked={shareSymptoms} disabled={!enabled} onChange={(e) => setShareSymptoms(e.target.checked)} /></label>
      </div>
      <div className="wh-privacy-note">Your cycle and reproductive health information is personal. Review your choices before sharing them with anyone.</div>
    </div>
  </div>;
}

export default function WomensHealth() {
  const [saved, setSaved] = useState(() => loadSaved());
  const [activeTab, setActiveTab] = useState("Today");
  const [modal, setModal] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [article, setArticle] = useState(null);
  const [form, setForm] = useState({ start: toISO(new Date()), end: toISO(new Date()), cycleLength: "28", periodLength: "5" });
  const [symptoms, setSymptoms] = useState([]);
  const [symptomDate, setSymptomDate] = useState(toISO(new Date()));
  const [sexDate, setSexDate] = useState(toISO(new Date()));
  const [sexNote, setSexNote] = useState("");

  useEffect(() => { if (saved) saveSaved(saved); }, [saved]);

  const records = saved?.records || [];
  const cycle = useMemo(() => calculateCycle(records, saved?.cycleLength || 28, saved?.periodLength || 5), [records, saved]);
  const today = new Date();
  const daysLeft = cycle.nextPeriod ? daysBetween(today, cycle.nextPeriod) : null;
  const cycleDay = cycle.lastStart ? daysBetween(cycle.lastStart, today) + 1 : null;
  const daysToOvulation = cycle.ovulation ? daysBetween(today, cycle.ovulation) : null;
  const chance = daysToOvulation !== null && daysToOvulation >= -1 && daysToOvulation <= 1
    ? { label: "Higher estimated chance", detail: "You may be near your estimated ovulation date.", tone: "high" }
    : daysToOvulation !== null && daysToOvulation >= -3 && daysToOvulation <= 4
      ? { label: "Medium estimated chance", detail: "This may be within or near your estimated fertile window.", tone: "medium" }
      : { label: "Lower estimated chance", detail: "This is outside the estimated fertile window.", tone: "low" };

  const updateSaved = (patch) => setSaved((old) => ({ ...(old || {}), ...patch }));
  const openPeriodModal = (record = null) => {
    setEditingId(record?.id || null);
    setForm(record ? { start: record.start, end: record.end || record.start, cycleLength: String(saved?.cycleLength || 28), periodLength: String(saved?.periodLength || 5) } : { start: toISO(new Date()), end: toISO(new Date()), cycleLength: String(saved?.cycleLength || 28), periodLength: String(saved?.periodLength || 5) });
    setModal("period");
  };
  const savePeriod = (e) => {
    e.preventDefault();
    if (!form.start || !form.end || form.end < form.start) return;
    const record = { id: editingId || `${Date.now()}`, start: form.start, end: form.end };
    const nextRecords = editingId ? records.map((r) => r.id === editingId ? record : r) : [...records, record];
    setSaved({ ...(saved || {}), cycleLength: clamp(Number(form.cycleLength) || 28, 21, 45), periodLength: clamp(Number(form.periodLength) || 5, 1, 10), records: nextRecords });
    setModal("");
  };
  const deletePeriod = (id) => {
    if (window.confirm("Delete this period record?")) setSaved((old) => ({ ...old, records: (old?.records || []).filter((r) => r.id !== id) }));
  };
  const saveSetup = (e) => {
    e.preventDefault();
    if (!form.start || !form.end || form.end < form.start) return;
    setSaved({ cycleLength: clamp(Number(form.cycleLength) || 28, 21, 45), periodLength: clamp(Number(form.periodLength) || 5, 1, 10), records: [{ id: `${Date.now()}`, start: form.start, end: form.end }], symptomLogs: [], sexLogs: [] });
  };
  const saveSymptoms = (e) => {
    e.preventDefault();
    updateSaved({ symptomLogs: [...(saved?.symptomLogs || []), { id: `${Date.now()}`, date: symptomDate, symptoms }] });
    setSymptoms([]); setModal("");
  };
  const saveSexLog = (e) => {
    e.preventDefault();
    updateSaved({ sexLogs: [...(saved?.sexLogs || []), { id: `${Date.now()}`, date: sexDate, note: sexNote }] });
    setSexNote(""); setModal("");
  };

  const css = `
  .wh-root{--ink:#493d45;--muted:#897b83;--pink:#d97991;--pink-dark:#b95f79;--blush:#fff0f2;--peach:#fff4eb;--line:#f1e3e6;--lav:#f3effa;color:var(--ink);font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#fffafb;min-height:100vh;padding-bottom:104px}
  .wh-root *{box-sizing:border-box}.wh-shell{max-width:1180px;margin:auto;padding:0 24px}.wh-topbar{background:rgba(255,250,251,.94);border-bottom:1px solid var(--line);position:sticky;top:0;z-index:20;backdrop-filter:blur(12px)}.wh-topbar-inner{max-width:1180px;margin:auto;padding:17px 24px;display:flex;align-items:center;justify-content:space-between}.wh-brand{font-family:Georgia,serif;font-size:25px;font-weight:700;color:#b95f79;letter-spacing:-.8px}.wh-date{font-size:13px;color:var(--muted)}
  .wh-hero{padding:36px 0 22px;background:radial-gradient(circle at 85% 15%,#ffe4e8 0,transparent 30%),linear-gradient(120deg,#fff2f2,#fff8f2 65%,#f8f3fb)}.wh-hero-grid{display:grid;grid-template-columns:1.02fr .98fr;gap:22px;align-items:stretch}.wh-hero-copy{padding:24px 4px}.wh-kicker{font-size:10px;font-weight:800;letter-spacing:1.5px;color:#c4778b}.wh-hero h1,.wh-page-intro h1{font-family:Georgia,serif;font-size:clamp(32px,4vw,48px);line-height:1.08;margin:10px 0;color:#4a3d45;font-weight:500}.wh-hero p,.wh-page-intro p{color:var(--muted);line-height:1.7;max-width:530px;font-size:14px}.wh-count-card{background:rgba(255,255,255,.88);border:1px solid #f4dfe4;border-radius:25px;padding:28px;box-shadow:0 14px 40px rgba(125,75,91,.08);display:flex;flex-direction:column;justify-content:center;min-height:250px}.wh-count-label{font-size:13px;color:var(--muted);font-weight:600}.wh-count-number{font-family:Georgia,serif;font-size:clamp(50px,7vw,76px);line-height:1.05;color:#c66d86;margin:10px 0}.wh-count-number small{font-family:inherit;font-size:25px;color:#806c75}.wh-count-sub{font-size:13px;color:var(--muted)}.wh-chance{margin-top:18px;padding:12px 14px;border-radius:14px;background:#fff4f4;font-size:13px}.wh-chance strong{display:block;margin-bottom:3px}.wh-chance.high{background:#ffedf0}.wh-chance.medium{background:#fff3e7}.wh-chance.low{background:#f2f0f8}
  .wh-main{padding-top:24px}.wh-two-col{display:grid;grid-template-columns:1.25fr .75fr;gap:20px;align-items:start}.wh-card{background:#fff;border:1px solid var(--line);border-radius:21px;padding:22px;box-shadow:0 8px 28px rgba(97,63,76,.045);margin-bottom:20px}.wh-card-heading{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:18px}.wh-card h2{font-family:Georgia,serif;font-size:23px;font-weight:500;margin:4px 0 0}.wh-month-controls{display:flex;align-items:center;gap:12px;font-size:13px}.wh-month-controls button{border:1px solid var(--line);background:#fff;border-radius:50%;width:30px;height:30px;color:#a75f75;font-size:20px;line-height:1;cursor:pointer}.wh-calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:7px;text-align:center}.wh-weekday{font-size:11px;color:#a1939b;padding:5px 0}.wh-day{height:39px;display:grid;place-items:center;border-radius:50%;font-size:12px;position:relative;color:#62545d}.wh-day.today{outline:2px solid #bc7188;outline-offset:1px;font-weight:800}.wh-day.logged{background:#d97891;color:white}.wh-day.predicted{background:#f9dce3;color:#a54d68}.wh-day.fertile{box-shadow:inset 0 0 0 1.5px #b9a8d7}.wh-day.ovulation{background:#b7a6d3;color:white}.wh-day i{position:absolute;font-size:8px;top:1px;right:5px;font-style:normal}.wh-legend{display:flex;flex-wrap:wrap;gap:12px;margin-top:17px;color:var(--muted);font-size:10px}.wh-legend span{display:flex;align-items:center;gap:5px}.dot{width:8px;height:8px;border-radius:50%;display:inline-block}.logged-dot{background:#d97891}.predicted-dot{background:#f2bdca}.fertile-dot{border:1px solid #b9a8d7}.ovulation-dot{background:#b7a6d3}
  .wh-stat-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.wh-stat{padding:15px;border-radius:15px;background:#fff6f4}.wh-stat:nth-child(2){background:#f7f2fb}.wh-stat:nth-child(3){background:#fff4e9}.wh-stat:nth-child(4){background:#fdf0f4}.wh-stat span{font-size:11px;color:var(--muted);display:block}.wh-stat strong{display:block;font-family:Georgia,serif;font-size:23px;font-weight:500;margin-top:5px}.wh-actions{display:grid;grid-template-columns:repeat(3,1fr);gap:13px;margin:2px 0 30px}.wh-action{border:0;background:transparent;color:var(--ink);display:flex;align-items:center;flex-direction:column;gap:9px;cursor:pointer;font-size:12px;font-weight:650}.wh-action-circle{width:68px;height:68px;border-radius:50%;display:grid;place-items:center;background:#ffe9ed;color:#b95f79;font-size:26px;box-shadow:0 5px 14px rgba(185,95,121,.1);transition:.2s}.wh-action:nth-child(2) .wh-action-circle{background:#f1eafa;color:#8d79ad}.wh-action:nth-child(3) .wh-action-circle{background:#fff0e3;color:#c18a5c}.wh-action:hover .wh-action-circle{transform:translateY(-3px);box-shadow:0 9px 20px rgba(185,95,121,.16)}
  .wh-section-title{display:flex;align-items:end;justify-content:space-between;margin:26px 0 14px}.wh-section-title h2{font-family:Georgia,serif;font-size:26px;font-weight:500;margin:3px 0}.wh-section-title p{font-size:12px;color:var(--muted);margin:0}.wh-horizontal{display:flex;gap:15px;overflow-x:auto;padding:2px 2px 16px;scroll-snap-type:x mandatory}.wh-article-card{flex:0 0 245px;background:white;border:1px solid var(--line);border-radius:17px;overflow:hidden;scroll-snap-align:start;box-shadow:0 7px 20px rgba(97,63,76,.05)}.wh-article-card img{width:100%;height:138px;object-fit:cover;display:block}.wh-article-body{padding:15px}.wh-article-body h3{font-family:Georgia,serif;font-size:18px;font-weight:500;margin:7px 0}.wh-article-body p{font-size:12px;color:var(--muted);line-height:1.55;min-height:38px}.wh-text-button{border:0;background:none;padding:0;color:#b95f79;font-size:12px;font-weight:750;cursor:pointer}.wh-text-button span{font-size:17px;margin-left:4px}.wh-later-card{flex:0 0 220px}.wh-later-card img{height:125px}.wh-disclaimer{font-size:11px;color:#8f8188;line-height:1.6;margin:16px 0 4px;padding:13px 15px;background:#fff5f4;border-radius:13px}
  .wh-bottom-nav{position:fixed;z-index:30;bottom:0;left:0;right:0;background:rgba(255,255,255,.96);border-top:1px solid var(--line);backdrop-filter:blur(14px);padding:9px 10px calc(9px + env(safe-area-inset-bottom));display:flex;justify-content:center;gap:clamp(10px,5vw,65px)}.wh-tab{border:0;background:none;color:#9b8d94;display:flex;align-items:center;flex-direction:column;gap:4px;font-size:10px;min-width:54px;cursor:pointer}.wh-tab-icon{font-size:21px;line-height:1.1}.wh-tab.active{color:#bd6680;font-weight:800}.wh-tab.active .wh-tab-icon{transform:translateY(-2px)}
  .wh-page-content{max-width:1180px;margin:0 auto;padding:38px 24px}.wh-page-intro{margin:0 0 25px}.wh-page-intro h1{font-size:40px}.wh-article-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:17px}.wh-article-grid .wh-article-card{min-width:0}.wh-note{margin-top:22px;background:#fff7f3}.wh-chat-panel{max-width:760px;border:1px solid var(--line);border-radius:22px;background:white;overflow:hidden;box-shadow:0 10px 30px rgba(97,63,76,.05)}.wh-chat-top{display:flex;align-items:center;gap:12px;padding:17px;border-bottom:1px solid var(--line)}.wh-chat-avatar{width:42px;height:42px;display:grid;place-items:center;border-radius:50%;background:#ffedf0;color:#bd6680;font-size:24px}.wh-chat-top strong,.wh-chat-top small{display:block}.wh-chat-top small{font-size:10px;color:var(--muted);margin-top:3px}.wh-private{margin-left:auto;color:#8a7c84;font-size:10px}.wh-chat-messages{padding:20px;min-height:210px;display:flex;flex-direction:column;gap:10px}.wh-chat-bubble{max-width:85%;padding:12px 14px;border-radius:15px 15px 15px 3px;background:#fff1f2;font-size:13px;line-height:1.55}.wh-chat-bubble.mine{align-self:flex-end;background:#f2edf8;border-radius:15px 15px 3px 15px}.wh-chat-form{display:flex;gap:9px;padding:14px;border-top:1px solid var(--line)}.wh-chat-form input{flex:1;min-width:0;border:1px solid var(--line);border-radius:25px;padding:11px 15px;outline:none}.wh-chat-form button,.wh-primary{border:0;border-radius:25px;background:#c56e87;color:white;padding:10px 20px;font-weight:700;cursor:pointer}.wh-small-note{padding:0 16px 13px;color:#9a8c93;font-size:10px;margin:0}.wh-message-list{max-width:800px}.wh-message-item{display:flex;gap:15px;padding:19px;background:#fff;border:1px solid var(--line);border-radius:17px;margin-bottom:12px}.wh-message-icon{width:42px;height:42px;flex:0 0 42px;border-radius:50%;background:#fff0f2;display:grid;place-items:center;color:#bb6680;font-size:21px}.wh-message-item strong{font-size:14px}.wh-message-item p{font-size:13px;color:var(--muted);margin:5px 0}.wh-message-item small{font-size:10px;color:#a99ba2}.wh-partner-card{max-width:680px;padding:28px;background:#fff;border:1px solid var(--line);border-radius:22px}.wh-partner-illustration{width:70px;height:70px;border-radius:50%;display:grid;place-items:center;background:#ffedf0;color:#bd6680;font-size:35px}.wh-partner-card h2{font-family:Georgia,serif;font-weight:500;margin:18px 0 7px}.wh-partner-card>p{font-size:13px;color:var(--muted);line-height:1.6}.wh-toggle-row{display:flex;align-items:center;justify-content:space-between;gap:15px;padding:16px 0;border-top:1px solid var(--line)}.wh-toggle-row strong,.wh-toggle-row small{display:block}.wh-toggle-row strong{font-size:13px}.wh-toggle-row small{font-size:11px;color:var(--muted);margin-top:4px}.wh-toggle-row input{accent-color:#bd6680;width:18px;height:18px}.wh-share-options.disabled{opacity:.45}.wh-privacy-note{padding:13px;border-radius:12px;background:#fff5f3;color:#8b7881;font-size:11px;line-height:1.6;margin-top:12px}
  .wh-modal-backdrop{position:fixed;inset:0;background:rgba(50,35,44,.42);z-index:60;display:grid;place-items:center;padding:18px}.wh-modal{background:#fff;border-radius:21px;padding:24px;width:min(100%,480px);max-height:90vh;overflow:auto;box-shadow:0 20px 70px rgba(0,0,0,.2)}.wh-modal h2{font-family:Georgia,serif;font-weight:500;margin:0 0 5px}.wh-modal p{font-size:12px;color:var(--muted);line-height:1.5}.wh-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.wh-field{display:flex;flex-direction:column;gap:6px;margin:12px 0}.wh-field label{font-size:11px;font-weight:700;color:#75666f}.wh-field input,.wh-field select{border:1px solid var(--line);border-radius:10px;padding:10px;color:var(--ink);background:white;width:100%}.wh-modal-actions{display:flex;justify-content:flex-end;gap:9px;margin-top:18px}.wh-secondary{border:1px solid var(--line);background:white;border-radius:25px;padding:10px 17px;color:#766872;cursor:pointer}.wh-symptom-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.wh-check{display:flex;align-items:center;gap:8px;padding:9px;border:1px solid var(--line);border-radius:10px;font-size:12px}.wh-check input{accent-color:#bd6680}.wh-history{margin-top:18px}.wh-history-row{display:flex;align-items:center;justify-content:space-between;gap:10px;border-top:1px solid var(--line);padding:10px 0;font-size:12px}.wh-history-row button{border:0;background:none;color:#b95f79;cursor:pointer;font-size:11px}.wh-empty{padding:18px;text-align:center;color:var(--muted);font-size:12px}.wh-article-modal img{width:100%;height:170px;object-fit:cover;border-radius:13px;margin:12px 0}.wh-article-modal p{font-size:13px;line-height:1.7}
  @media(max-width:850px){.wh-hero-grid,.wh-two-col{grid-template-columns:1fr}.wh-hero-copy{padding:8px 2px}.wh-count-card{min-height:0}.wh-article-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.wh-article-grid .wh-article-card{width:auto}.wh-page-content{padding:30px 18px}}
  @media(max-width:540px){.wh-shell{padding:0 15px}.wh-topbar-inner{padding:13px 16px}.wh-hero{padding:24px 0 16px}.wh-hero h1{font-size:34px}.wh-count-card{padding:21px}.wh-card{padding:17px}.wh-card-heading{align-items:flex-start;flex-direction:column}.wh-calendar-grid{gap:4px}.wh-day{height:34px;font-size:11px}.wh-legend{gap:8px}.wh-legend span{font-size:9px}.wh-actions{gap:5px}.wh-action-circle{width:59px;height:59px}.wh-action{font-size:10px}.wh-section-title h2{font-size:23px}.wh-article-grid{grid-template-columns:1fr}.wh-article-grid .wh-article-card{display:grid;grid-template-columns:112px 1fr}.wh-article-grid .wh-article-card img{height:100%;min-height:150px}.wh-article-grid .wh-article-body{padding:12px}.wh-article-grid .wh-article-body p{min-height:0}.wh-page-intro h1{font-size:34px}.wh-bottom-nav{gap:clamp(7px,4vw,25px)}.wh-tab{min-width:48px;font-size:9px}.wh-tab-icon{font-size:19px}.wh-form-grid{grid-template-columns:1fr}.wh-private{display:none}}
  `;

  const tabItems = [{ name: "Today", icon: "⌂" }, { name: "Insights", icon: "✧" }, { name: "Secret Chats", icon: "♡" }, { name: "Messages", icon: "▤" }, { name: "Partner", icon: "♧" }];

  if (!saved) {
    return <div className="wh-root"><style>{css}</style><header className="wh-topbar"><div className="wh-topbar-inner"><div className="wh-brand">BloomCare</div><div className="wh-date">{formatDate(today, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</div></div></header>
      <main className="wh-page-content"><div className="wh-page-intro"><span className="wh-kicker">YOUR CYCLE, YOUR WAY</span><h1>Let's get to know your cycle.</h1><p>Add your recent period details to begin. BloomCare will use these records to make personal estimates that you can update anytime.</p></div>
        <form className="wh-card" onSubmit={saveSetup} style={{ maxWidth: 650 }}>
          <div className="wh-form-grid"><div className="wh-field"><label>Last period start date</label><input required type="date" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} /></div><div className="wh-field"><label>Last period end date</label><input required type="date" min={form.start} value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} /></div><div className="wh-field"><label>Average cycle length (days)</label><input required type="number" min="21" max="45" value={form.cycleLength} onChange={(e) => setForm({ ...form, cycleLength: e.target.value })} /></div><div className="wh-field"><label>Average period duration (days)</label><input required type="number" min="1" max="10" value={form.periodLength} onChange={(e) => setForm({ ...form, periodLength: e.target.value })} /></div></div>
          <button className="wh-primary" type="submit">Start tracking</button><p className="wh-small-note" style={{ padding: "14px 0 0" }}>Your records are stored in localStorage on this browser. Cycle and fertility estimates are not medical guarantees or contraception.</p>
        </form>
      </main>
    </div>;
  }

  return <div className="wh-root"><style>{css}</style>
    <header className="wh-topbar"><div className="wh-topbar-inner"><div className="wh-brand">BloomCare</div><div className="wh-date">{formatDate(today, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</div></div></header>
    {activeTab === "Today" && <>
      <section className="wh-hero"><div className="wh-shell wh-hero-grid"><div className="wh-hero-copy"><span className="wh-kicker">YOUR DAILY CHECK-IN</span><h1>Hello, take a moment for you.</h1><p>Every cycle is unique. Keep track of your patterns, notice how you feel, and find helpful information along the way.</p></div>
        <div className="wh-count-card"><span className="wh-count-label">{daysLeft >= 0 ? "Your next period is estimated in" : "Your period estimate was"}</span><div className="wh-count-number">{daysLeft === null ? "—" : Math.abs(daysLeft)} <small>{daysLeft === 1 || daysLeft === -1 ? "day" : "days"}</small></div><div className="wh-count-sub">{cycle.nextPeriod ? `Estimated date · ${formatDate(cycle.nextPeriod, { day: "numeric", month: "long" })}` : "Add period dates to begin"}</div><div className={`wh-chance ${chance.tone}`}><strong>{chance.label}</strong>{chance.detail}</div></div>
      </div></section>
      <main className="wh-shell wh-main"><div className="wh-two-col"><CalendarCard cycle={cycle} records={records} /><section className="wh-card"><div className="wh-card-heading"><div><span className="wh-kicker">YOUR CYCLE AT A GLANCE</span><h2>Cycle details</h2></div><button className="wh-text-button" onClick={() => openPeriodModal()}>+ Log dates</button></div><div className="wh-stat-grid"><div className="wh-stat"><span>Average cycle</span><strong>{cycle.averageCycle} days</strong></div><div className="wh-stat"><span>Period duration</span><strong>{cycle.averagePeriod} days</strong></div><div className="wh-stat"><span>Estimated ovulation</span><strong>{formatDate(cycle.ovulation)}</strong></div><div className="wh-stat"><span>Fertile window</span><strong>{cycle.fertileStart ? `${formatDate(cycle.fertileStart)} – ${formatDate(cycle.fertileEnd)}` : "—"}</strong></div></div><div className="wh-history"><strong style={{ fontSize: 13 }}>Recent period records</strong>{cycle.sorted.length ? cycle.sorted.slice(-4).reverse().map((r) => <div className="wh-history-row" key={r.id}><span>{formatDate(parseDate(r.start), { day: "numeric", month: "short", year: "numeric" })} – {formatDate(parseDate(r.end || r.start), { day: "numeric", month: "short" })}</span><span><button onClick={() => openPeriodModal(r)}>Edit</button><button onClick={() => deletePeriod(r.id)}>Delete</button></span></div>) : <div className="wh-empty">No period records yet.</div>}</div></section></div>
        <div className="wh-section-title"><div><span className="wh-kicker">QUICK CHECK-IN</span><h2>How are you feeling today?</h2></div></div>
        <div className="wh-actions"><button className="wh-action" onClick={() => openPeriodModal()}><span className="wh-action-circle">♡</span>Log Period</button><button className="wh-action" onClick={() => setModal("symptoms")}><span className="wh-action-circle">✿</span>Symptoms</button><button className="wh-action" onClick={() => setModal("sex")}><span className="wh-action-circle">✧</span>Sex Tracking</button></div>
        <div className="wh-section-title"><div><span className="wh-kicker">MY DAILY INSIGHTS · TODAY</span><h2>A little knowledge, a little care</h2><p>Explore trusted, easy-to-understand topics.</p></div></div>
        <div className="wh-horizontal">{starterArticles.map((a) => <ArticleCard key={a.title} article={a} onRead={setArticle} />)}</div>
        <div className="wh-section-title"><div><span className="wh-kicker">COMING UP IN YOUR CYCLE</span><h2>Later in your cycle</h2><p>Ideas and guidance to explore at your own pace.</p></div></div>
        <div className="wh-horizontal">{laterArticles.map((a) => <ArticleCard key={a.title} article={{ ...a, category: "WELLNESS", read: a.text }} onRead={setArticle} />)}</div>
        <p className="wh-disclaimer">BloomCare cycle, ovulation and fertility information is estimated from the dates you enter. Ovulation can shift, and these estimates cannot confirm fertile days, diagnose a condition, or be used as contraception. Consult a qualified healthcare professional for personal medical advice.</p>
      </main>
    </>}
    {activeTab === "Insights" && <InsightsTab onRead={setArticle} />}
    {activeTab === "Secret Chats" && <SecretChatsTab />}
    {activeTab === "Messages" && <MessagesTab cycle={cycle} />}
    {activeTab === "Partner" && <PartnerTab cycle={cycle} />}
    <nav className="wh-bottom-nav" aria-label="Women's Health navigation">{tabItems.map((tab) => <button key={tab.name} className={`wh-tab ${activeTab === tab.name ? "active" : ""}`} onClick={() => setActiveTab(tab.name)}><span className="wh-tab-icon">{tab.icon}</span>{tab.name}</button>)}</nav>

    {modal && <div className="wh-modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setModal(""); }}><div className="wh-modal" role="dialog" aria-modal="true">
      {modal === "period" && <><h2>{editingId ? "Edit period record" : "Log your period"}</h2><p>Add the dates you want to keep in your cycle history.</p><form onSubmit={savePeriod}><div className="wh-form-grid"><div className="wh-field"><label>Period start</label><input required type="date" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value, end: form.end < e.target.value ? e.target.value : form.end })} /></div><div className="wh-field"><label>Period end</label><input required type="date" min={form.start} value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} /></div><div className="wh-field"><label>Typical cycle length</label><input type="number" min="21" max="45" value={form.cycleLength} onChange={(e) => setForm({ ...form, cycleLength: e.target.value })} /></div><div className="wh-field"><label>Typical period duration</label><input type="number" min="1" max="10" value={form.periodLength} onChange={(e) => setForm({ ...form, periodLength: e.target.value })} /></div></div><div className="wh-modal-actions"><button type="button" className="wh-secondary" onClick={() => setModal("")}>Cancel</button><button className="wh-primary">Save record</button></div></form></>}
      {modal === "symptoms" && <><h2>Log symptoms</h2><p>Select anything you noticed. Your entries stay on this browser.</p><form onSubmit={saveSymptoms}><div className="wh-field"><label>Date</label><input type="date" value={symptomDate} onChange={(e) => setSymptomDate(e.target.value)} /></div><div className="wh-symptom-grid">{symptomOptions.map((s) => <label className="wh-check" key={s}><input type="checkbox" checked={symptoms.includes(s)} onChange={(e) => setSymptoms((old) => e.target.checked ? [...old, s] : old.filter((x) => x !== s))} />{s}</label>)}</div><div className="wh-modal-actions"><button type="button" className="wh-secondary" onClick={() => setModal("")}>Cancel</button><button className="wh-primary">Save symptoms</button></div></form></>}
      {modal === "sex" && <><h2>Private sex tracking</h2><p>Optional entry for your personal records. This information is stored locally on this browser only.</p><form onSubmit={saveSexLog}><div className="wh-field"><label>Date</label><input type="date" value={sexDate} onChange={(e) => setSexDate(e.target.value)} /></div><div className="wh-field"><label>Optional note</label><input value={sexNote} onChange={(e) => setSexNote(e.target.value)} placeholder="Add a private note (optional)" /></div><div className="wh-modal-actions"><button type="button" className="wh-secondary" onClick={() => setModal("")}>Cancel</button><button className="wh-primary">Save privately</button></div></form></>}
    </div></div>}
    {article && <div className="wh-modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setArticle(null); }}><div className="wh-modal wh-article-modal" role="dialog" aria-modal="true"><span className="wh-kicker">{article.category || "BLOOMCARE WELLNESS"}</span><h2>{article.title}</h2><img src={article.image} alt="" /><p>{article.read || article.text}</p><button className="wh-primary" onClick={() => setArticle(null)}>Close</button></div></div>}
  </div>;
}
