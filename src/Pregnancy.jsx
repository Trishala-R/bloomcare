import React, { useEffect, useMemo, useState, useRef } from "react";

const STORAGE_KEY = "bloomcare_pregnancy_v1";
const DAY = 24 * 60 * 60 * 1000;

const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const parseDate = (value) => {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d, 12);
};

const toISO = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const addDays = (date, days) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + days, 12);
const formatDate = (value) => (value ? parseDate(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—");
const daysBetween = (a, b) => Math.round((parseDate(a) - parseDate(b)) / DAY);

const weekData = Array.from({ length: 40 }, (_, i) => {
  const week = i + 1;
  const trimester = week <= 13 ? "First trimester" : week <= 27 ? "Second trimester" : "Third trimester";
  const sizes = ["poppy seed", "sesame seed", "lentil", "poppy seed", "sesame seed", "lentil", "blueberry", "raspberry", "cherry", "strawberry", "lime", "plum", "peach", "lemon", "apple", "avocado", "pear", "sweet potato", "mango", "banana", "carrot", "papaya", "grapefruit", "cantaloupe", "rutabaga", "lettuce", "cauliflower", "eggplant", "butternut squash", "cabbage", "coconut", "cucumber", "pineapple", "cantaloupe", "honeydew", "papaya", "watermelon", "pumpkin", "small pumpkin", "watermelon"];
  return {
    week,
    trimester,
    size: sizes[i],
    baby: week < 10 ? "Early development is underway as the baby's major structures begin forming." : week < 20 ? "The baby is continuing to develop rapidly, with movement and organ development progressing." : week < 30 ? "The baby is growing and becoming more active while the brain and other systems continue to mature." : "The baby is continuing to gain weight and prepare for life outside the womb.",
    mother: week <= 13 ? "You may notice fatigue, nausea, breast tenderness or changing emotions." : week <= 27 ? "Your body is adapting to a growing uterus and you may notice changing energy, appetite or movement sensations." : "You may notice increased tiredness, pelvic pressure, back discomfort or changes in sleep as pregnancy progresses.",
    tips: ["Keep regular prenatal appointments.", "Stay hydrated and follow your healthcare professional's nutrition guidance.", "Rest when you need to and listen to your body's signals."],
  };
});

const defaultState = {
  profile: { lmp: "", dueDate: "", pregnancyType: "singleton", knownWeek: "" },
  symptoms: [],
  weights: [],
  movements: [],
  contractions: [],
  appointments: [],
  journal: [],
  birthPlan: { environment: "", support: "", painRelief: "", movement: "", newborn: "", questions: "" },
  checklist: {},
};

const symptoms = ["Nausea", "Fatigue", "Headache", "Back pain", "Cramps", "Heartburn", "Swelling", "Breast tenderness", "Constipation", "Mood changes", "Sleep problems"];
const pregnancySectionOrder = [
  ["home", "Pregnancy Home"],
  ["journey", "My Pregnancy"],
  ["baby", "Baby"],
  ["symptoms", "Symptoms"],
  ["movement", "Kick Counter"],
  ["contractions", "Contractions"],
  ["appointments", "Appointments"],
  ["journal", "Journal"],
  ["checklist", "Checklist"],
  ["birth", "Birth Plan"],
  ["articles", "Articles"],
];

const checklistItems = {
  "During pregnancy": ["Keep prenatal appointments", "Prepare questions for your healthcare provider", "Organize important test reports", "Review nutrition and self-care guidance"],
  "Hospital preparation": ["Prepare hospital bag", "Keep important documents together", "Pack comfortable clothes", "Add personal essentials"],
  "Baby preparation": ["Prepare newborn clothes", "Keep diapers ready", "Plan a safe sleep space", "Prepare basic feeding supplies"],
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved ? { ...defaultState, ...saved, profile: { ...defaultState.profile, ...(saved.profile || {}) }, birthPlan: { ...defaultState.birthPlan, ...(saved.birthPlan || {}) } } : defaultState;
  } catch {
    return defaultState;
  }
}

function calculateDueDate(lmp) {
  const date = parseDate(lmp);
  return date ? toISO(addDays(date, 280)) : "";
}

function calculatePregnancy(lmp, dueDate, knownWeek) {
  if (knownWeek) return { week: Math.min(40, Math.max(1, Number(knownWeek))), days: 0, due: dueDate || "" };
  if (!lmp) return { week: 1, days: 0, due: dueDate || "" };
  const today = parseDate(todayISO());
  const start = parseDate(lmp);
  const elapsed = Math.max(0, Math.floor((today - start) / DAY));
  return { week: Math.min(40, Math.floor(elapsed / 7) + 1), days: elapsed % 7, due: dueDate || calculateDueDate(lmp) };
}

export default function Pregnancy() {
  const [state, setState] = useState(loadState);
  const [activeTab, setActiveTab] = useState("home");
  const pregnancyNavRef = useRef(null);
  const [navCanPrev, setNavCanPrev] = useState(false);
  const [navCanNext, setNavCanNext] = useState(false);
  const [week, setWeek] = useState(1);
  const [setupOpen, setSetupOpen] = useState(false);
  const [symptomOpen, setSymptomOpen] = useState(false);
  const [weightOpen, setWeightOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [journalOpen, setJournalOpen] = useState(false);
  const [ask, setAsk] = useState("");
  const [contractionStart, setContractionStart] = useState(null);
  const [contractionElapsed, setContractionElapsed] = useState(0);
  const [kickSession, setKickSession] = useState(false);
  const [setup, setSetup] = useState(state.profile);
  const [symptomForm, setSymptomForm] = useState({ symptom: symptoms[0], severity: "Mild", notes: "" });
  const [weight, setWeight] = useState("");
  const [appointment, setAppointment] = useState({ name: "", date: todayISO(), time: "10:00", type: "Prenatal checkup", notes: "" });
  const [journal, setJournal] = useState({ title: "", text: "" });

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(state)), [state]);

  useEffect(() => {
    const nav = pregnancyNavRef.current;
    if (!nav) return undefined;

    const updateNavButtons = () => {
      setNavCanPrev(nav.scrollLeft > 2);
      setNavCanNext(nav.scrollLeft + nav.clientWidth < nav.scrollWidth - 2);
    };

    updateNavButtons();
    nav.addEventListener("scroll", updateNavButtons, { passive: true });
    window.addEventListener("resize", updateNavButtons);

    return () => {
      nav.removeEventListener("scroll", updateNavButtons);
      window.removeEventListener("resize", updateNavButtons);
    };
  }, []);

  const slidePregnancyNav = (direction) => {
    const nav = pregnancyNavRef.current;
    if (!nav) return;

    nav.scrollBy({
      left: direction * nav.clientWidth * 0.7,
      behavior: "smooth",
    });
  };

  const activeSectionIndex = pregnancySectionOrder.findIndex(([id]) => id === activeTab);
  const activeSectionLabel = pregnancySectionOrder[activeSectionIndex]?.[1] || "Pregnancy Home";

  const changePregnancySection = (direction) => {
    const nextIndex = activeSectionIndex + direction;
    if (nextIndex < 0 || nextIndex >= pregnancySectionOrder.length) return;
    setActiveTab(pregnancySectionOrder[nextIndex][0]);
  };

  const pregnancy = useMemo(() => calculatePregnancy(state.profile.lmp, state.profile.dueDate, state.profile.knownWeek), [state.profile]);
  const currentWeek = pregnancy.week;
  const selectedWeek = weekData[week - 1];
  const progress = Math.min(100, Math.round((currentWeek / 40) * 100));
  const daysRemaining = pregnancy.due ? Math.max(0, daysBetween(pregnancy.due, todayISO())) : 0;
  const trimester = selectedWeek.trimester;

  useEffect(() => {
    setWeek(currentWeek);
  }, [currentWeek]);

  useEffect(() => {
    if (!contractionStart) return undefined;
    const timer = setInterval(() => setContractionElapsed(Math.floor((Date.now() - contractionStart) / 1000)), 250);
    return () => clearInterval(timer);
  }, [contractionStart]);

  const saveState = (changes) => setState((prev) => ({ ...prev, ...changes }));

  const saveSetup = (e) => {
    e.preventDefault();
    const due = setup.dueDate || calculateDueDate(setup.lmp);
    saveState({ profile: { ...setup, dueDate: due } });
    setSetupOpen(false);
  };

  const logSymptom = (e) => {
    e.preventDefault();
    saveState({ symptoms: [{ id: Date.now(), date: todayISO(), ...symptomForm }, ...state.symptoms] });
    setSymptomOpen(false);
    setSymptomForm({ symptom: symptoms[0], severity: "Mild", notes: "" });
  };

  const logWeight = (e) => {
    e.preventDefault();
    if (!weight) return;
    saveState({ weights: [{ id: Date.now(), date: todayISO(), value: Number(weight) }, ...state.weights] });
    setWeight("");
    setWeightOpen(false);
  };

  const addKick = () => {
    saveState({ movements: [{ id: Date.now(), date: todayISO(), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }, ...state.movements] });
    setKickSession(true);
  };

  const startContraction = () => {
    if (contractionStart) {
      const duration = Math.floor((Date.now() - contractionStart) / 1000);
      const previous = state.contractions[0];
      const interval = previous ? Math.floor((Date.now() - previous.timestamp) / 1000) : null;
      saveState({ contractions: [{ id: Date.now(), timestamp: Date.now(), date: todayISO(), duration, interval }, ...state.contractions] });
      setContractionStart(null);
      setContractionElapsed(0);
    } else {
      setContractionStart(Date.now());
      setContractionElapsed(0);
    }
  };

  const addAppointment = (e) => {
    e.preventDefault();
    if (!appointment.name || !appointment.date) return;
    saveState({ appointments: [{ id: Date.now(), ...appointment }, ...state.appointments] });
    setAppointmentOpen(false);
    setAppointment({ name: "", date: todayISO(), time: "10:00", type: "Prenatal checkup", notes: "" });
  };

  const addJournal = (e) => {
    e.preventDefault();
    if (!journal.text.trim()) return;
    saveState({ journal: [{ id: Date.now(), date: todayISO(), week: currentWeek, ...journal }, ...state.journal] });
    setJournal({ title: "", text: "" });
    setJournalOpen(false);
  };

  const askAnswer = ask.trim() ? `BloomCare can provide general pregnancy education, but it cannot diagnose symptoms. For “${ask.trim()}”, consider reading the information for your current week and discussing personal concerns with your healthcare professional.` : "";

  const formatSeconds = (seconds) => `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
  const todayMovements = state.movements.filter((m) => m.date === todayISO());
  const todaySymptoms = state.symptoms.filter((s) => s.date === todayISO());
  const latestWeight = state.weights[0]?.value;
  const previousWeight = state.weights[1]?.value;
  const averageDuration = state.contractions.length ? Math.round(state.contractions.reduce((a, c) => a + c.duration, 0) / state.contractions.length) : 0;
  const intervals = state.contractions.filter((c) => c.interval).map((c) => c.interval);
  const averageInterval = intervals.length ? Math.round(intervals.reduce((a, c) => a + c, 0) / intervals.length) : 0;

  return (
    <div className="pregnancy-page">
      <style>{styles}</style>
      <header className="pregnancy-header">
        <div>
          <div className="eyebrow">BLOOMCARE · PREGNANCY</div>
          <h1>Your Pregnancy Companion</h1>
          <p>Track your journey, learn about each week and keep important pregnancy details together.</p>
        </div>
        <button className="outline-btn" onClick={() => setSetupOpen(true)}>Edit pregnancy details</button>
      </header>

      
<div className="pregnancy-nav-shell">
  <button
    type="button"
    className="pregnancy-nav-arrow"
    onClick={() => slidePregnancyNav(-1)}
    disabled={!navCanPrev}
    aria-label="Previous navigation items"
  >
    <i className="bi bi-chevron-left" aria-hidden="true"></i>
  </button>

  <nav className="pregnancy-nav" ref={pregnancyNavRef} aria-label="Pregnancy sections">
    {[
      ["home", "bi-house-heart", "Pregnancy Home"],
      ["journey", "bi-heart-pulse", "My Pregnancy"],
      ["baby", "bi-emoji-smile", "Baby"],
      ["symptoms", "bi-clipboard2-pulse", "Symptoms"],
      ["movement", "bi-activity", "Kick Counter"],
      ["contractions", "bi-clock-history", "Contractions"],
      ["appointments", "bi-calendar-heart", "Appointments"],
      ["journal", "bi-journal-text", "Journal"],
      ["checklist", "bi-check2-square", "Checklist"],
      ["birth", "bi-balloon-heart", "Birth Plan"],
      ["articles", "bi-book-half", "Articles"]
    ].map(([id, icon, label]) => (
      <button
        type="button"
        key={id}
        className={activeTab === id ? "active" : ""}
        onClick={() => setActiveTab(id)}
      >
        <i className={`bi ${icon}`} aria-hidden="true"></i>
        <span>{label}</span>
      </button>
    ))}
  </nav>

  <button
    type="button"
    className="pregnancy-nav-arrow"
    onClick={() => slidePregnancyNav(1)}
    disabled={!navCanNext}
    aria-label="Next navigation items"
  >
    <i className="bi bi-chevron-right" aria-hidden="true"></i>
  </button>
</div>

      <div className="pregnancy-section-switcher" aria-label="Navigate between pregnancy sections">
        <button
          type="button"
          className="pregnancy-section-switcher-btn"
          onClick={() => changePregnancySection(-1)}
          disabled={activeSectionIndex <= 0}
          aria-label="Go to previous section"
        >
          <i className="bi bi-chevron-left" aria-hidden="true"></i>
          <span>Previous</span>
        </button>

        <span className="pregnancy-section-current" aria-live="polite">
          {activeSectionLabel}
        </span>

        <button
          type="button"
          className="pregnancy-section-switcher-btn"
          onClick={() => changePregnancySection(1)}
          disabled={activeSectionIndex >= pregnancySectionOrder.length - 1}
          aria-label="Go to next section"
        >
          <span>Next</span>
          <i className="bi bi-chevron-right" aria-hidden="true"></i>
        </button>
      </div>

      {activeTab === "home" && <>
        <section className="hero-grid">
          <div className="hero-card">
            <div className="small-label">YOUR PREGNANCY TODAY</div>
            <h2>{state.profile.lmp ? `You are ${currentWeek} weeks + ${pregnancy.days} days pregnant` : "Start your pregnancy journey"}</h2>
            <p>{state.profile.lmp ? `${selectedWeek.trimester}. You are about ${progress}% through a 40-week pregnancy.` : "Add your last menstrual period or known pregnancy week to personalize your dashboard."}</p>
            <div className="progress-track"><div style={{ width: `${progress}%` }} /></div>
            <div className="progress-meta"><span>Week 1</span><strong>Week {currentWeek}</strong><span>Week 40</span></div>
            <div className="hero-actions"><button className="primary-btn" onClick={() => setWeek(currentWeek) || setActiveTab("journey")}>View This Week</button><button className="soft-btn" onClick={() => setSetupOpen(true)}>Update details</button></div>
          </div>
          <div className="due-card">
            <div className="circle-progress"><strong>{progress}%</strong><span>journey</span></div>
            <div><span className="small-label">ESTIMATED DUE DATE</span><h3>{formatDate(pregnancy.due)}</h3><p>{pregnancy.due ? `${daysRemaining} days remaining` : "Add your LMP to calculate"}</p></div>
          </div>
        </section>

        <section className="section-block">
          <div className="section-heading"><div><span className="small-label">THIS WEEK</span><h2>Baby development</h2></div><button className="text-btn" onClick={() => setActiveTab("baby")}>Explore week {currentWeek} →</button></div>
          <div className="baby-card"><div className="baby-visual"><span>♡</span><small>about the size of</small><strong>{selectedWeek.size}</strong></div><div><div className="week-pill">WEEK {selectedWeek.week} · {selectedWeek.trimester.toUpperCase()}</div><h3>Your baby this week</h3><p>{selectedWeek.baby}</p><div className="mini-list"><div>• Development continues at its own pace.</div><div>• Your prenatal care remains important.</div></div></div></div>
        </section>

        <section className="section-block">
          <div className="section-heading"><div><span className="small-label">TODAY</span><h2>Your tracking</h2></div></div>
          <div className="tracking-grid">
            <TrackCard icon="✦" title="Symptoms" value={todaySymptoms.length ? `${todaySymptoms.length} logged today` : "Nothing logged"} action={() => setSymptomOpen(true)} />
            <TrackCard icon="☺" title="Mood & energy" value="Add a note" action={() => setJournalOpen(true)} />
            <TrackCard icon="⚖" title="Weight" value={latestWeight ? `${latestWeight} kg` : "Not added"} action={() => setWeightOpen(true)} />
            <TrackCard icon="👣" title="Baby movements" value={`${todayMovements.length} today`} action={() => setActiveTab("movement")} />
          </div>
        </section>

        <section className="section-block two-column">
          <div className="panel"><div className="section-heading"><div><span className="small-label">UP NEXT</span><h2>Pregnancy timeline</h2></div></div><Timeline currentWeek={currentWeek} /></div>
          <div className="panel companion"><span className="small-label">PERSONALIZED</span><h2>Your Pregnancy Today</h2><p>You are currently in your <strong>{selectedWeek.trimester.toLowerCase()}</strong>.</p><p>{selectedWeek.mother}</p><div className="suggestions"><button onClick={() => setActiveTab("journey")}>→ Read about Week {currentWeek}</button><button onClick={() => setSymptomOpen(true)}>→ Log how you're feeling</button><button onClick={() => setActiveTab("appointments")}>→ Review appointments</button></div></div>
        </section>

        <section className="section-block ask-panel"><div><span className="small-label">BLOOMCARE GUIDE</span><h2>Ask BloomCare 💬</h2><p>Get general pregnancy education without replacing professional medical care.</p></div><div className="ask-box"><input value={ask} onChange={(e) => setAsk(e.target.value)} placeholder="What would you like to know?" /><button className="primary-btn" onClick={() => {}}>Ask</button></div>{askAnswer && <div className="answer">{askAnswer}</div>}</section>

        <SafetyBox />
      </>}

      {activeTab === "journey" && <WeekTracker week={week} setWeek={setWeek} selectedWeek={selectedWeek} currentWeek={currentWeek} />}
      {activeTab === "baby" && <BabyTab week={selectedWeek} />}
      {activeTab === "symptoms" && <SymptomsTab symptoms={state.symptoms} onAdd={() => setSymptomOpen(true)} onDelete={(id) => saveState({ symptoms: state.symptoms.filter((s) => s.id !== id) })} />}
      {activeTab === "movement" && <MovementTab count={todayMovements.length} movements={todayMovements} onKick={addKick} session={kickSession} setSession={setKickSession} />}
      {activeTab === "contractions" && <ContractionsTab start={contractionStart} elapsed={contractionElapsed} onToggle={startContraction} contractions={state.contractions} averageDuration={averageDuration} averageInterval={averageInterval} formatSeconds={formatSeconds} />}
      {activeTab === "appointments" && <AppointmentsTab appointments={state.appointments} onAdd={() => setAppointmentOpen(true)} onDelete={(id) => saveState({ appointments: state.appointments.filter((a) => a.id !== id) })} />}
      {activeTab === "journal" && <JournalTab entries={state.journal} onAdd={() => setJournalOpen(true)} onDelete={(id) => saveState({ journal: state.journal.filter((j) => j.id !== id) })} />}
      {activeTab === "checklist" && <ChecklistTab checklist={state.checklist} onToggle={(key) => saveState({ checklist: { ...state.checklist, [key]: !state.checklist[key] } })} />}
      {activeTab === "birth" && <BirthPlanTab birthPlan={state.birthPlan} onSave={(birthPlan) => saveState({ birthPlan })} />}
      {activeTab === "articles" && <ArticlesTab />}

      {setupOpen && <Modal title="Pregnancy details" onClose={() => setSetupOpen(false)}><form onSubmit={saveSetup} className="form-grid"><label>Last menstrual period<input type="date" value={setup.lmp} onChange={(e) => setSetup({ ...setup, lmp: e.target.value, dueDate: calculateDueDate(e.target.value) })} /></label><label>Estimated due date<input type="date" value={setup.dueDate} onChange={(e) => setSetup({ ...setup, dueDate: e.target.value })} /></label><label>Pregnancy type<select value={setup.pregnancyType} onChange={(e) => setSetup({ ...setup, pregnancyType: e.target.value })}><option value="singleton">Singleton</option><option value="multiple">Multiple</option></select></label><label>Known current week (optional)<input type="number" min="1" max="40" value={setup.knownWeek} onChange={(e) => setSetup({ ...setup, knownWeek: e.target.value })} /></label><div className="form-note">If you already know your pregnancy week, you can enter it above. Your healthcare professional's dating information should take priority over app estimates.</div><button className="primary-btn" type="submit">Save details</button></form></Modal>}
      {symptomOpen && <Modal title="Log a symptom" onClose={() => setSymptomOpen(false)}><form onSubmit={logSymptom} className="form-grid"><label>Symptom<select value={symptomForm.symptom} onChange={(e) => setSymptomForm({ ...symptomForm, symptom: e.target.value })}>{symptoms.map((s) => <option key={s}>{s}</option>)}</select></label><label>Severity<select value={symptomForm.severity} onChange={(e) => setSymptomForm({ ...symptomForm, severity: e.target.value })}><option>None</option><option>Mild</option><option>Moderate</option><option>Severe</option></select></label><label className="full">Notes<textarea value={symptomForm.notes} onChange={(e) => setSymptomForm({ ...symptomForm, notes: e.target.value })} placeholder="Optional notes" /></label><button className="primary-btn" type="submit">Save symptom</button></form></Modal>}
      {weightOpen && <Modal title="Add weight" onClose={() => setWeightOpen(false)}><form onSubmit={logWeight} className="form-grid"><label>Weight (kg)<input type="number" step="0.1" min="0" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 58.5" /></label><div className="form-note">Pregnancy weight changes vary between people. Use your healthcare professional's advice for personal guidance.</div><button className="primary-btn" type="submit">Save weight</button></form></Modal>}
      {appointmentOpen && <Modal title="Add appointment" onClose={() => setAppointmentOpen(false)}><form onSubmit={addAppointment} className="form-grid"><label>Doctor / clinic<input required value={appointment.name} onChange={(e) => setAppointment({ ...appointment, name: e.target.value })} placeholder="Clinic or doctor name" /></label><label>Type<select value={appointment.type} onChange={(e) => setAppointment({ ...appointment, type: e.target.value })}><option>Prenatal checkup</option><option>Ultrasound</option><option>Blood test</option><option>Screening</option><option>Follow-up</option></select></label><label>Date<input type="date" value={appointment.date} onChange={(e) => setAppointment({ ...appointment, date: e.target.value })} /></label><label>Time<input type="time" value={appointment.time} onChange={(e) => setAppointment({ ...appointment, time: e.target.value })} /></label><label className="full">Notes<textarea value={appointment.notes} onChange={(e) => setAppointment({ ...appointment, notes: e.target.value })} /></label><button className="primary-btn" type="submit">Save appointment</button></form></Modal>}
      {journalOpen && <Modal title="Add journal entry" onClose={() => setJournalOpen(false)}><form onSubmit={addJournal} className="form-grid"><label className="full">Title<input value={journal.title} onChange={(e) => setJournal({ ...journal, title: e.target.value })} placeholder="A little about today" /></label><label className="full">Your entry<textarea required rows="6" value={journal.text} onChange={(e) => setJournal({ ...journal, text: e.target.value })} placeholder="Write your thoughts, feelings or questions..." /></label><button className="primary-btn" type="submit">Save entry</button></form></Modal>}
    </div>
  );
}

function TrackCard({ icon, title, value, action }) { return <button className="track-card" onClick={action}><span className="track-icon">{icon}</span><span><strong>{title}</strong><small>{value}</small></span><b>+</b></button>; }

function Timeline({ currentWeek }) {
  const milestones = [8, 12, 20, 28, 32, 36, 40];
  return <div className="timeline">{milestones.map((w) => <div className={currentWeek === w ? "timeline-item current" : currentWeek > w ? "timeline-item done" : "timeline-item"} key={w}><span>{currentWeek > w ? "✓" : currentWeek === w ? "●" : "○"}</span><div><strong>Week {w}</strong><small>{w === 20 ? "Anatomy scan period" : w === 40 ? "Estimated due period" : w < currentWeek ? "Milestone passed" : "Upcoming milestone"}</small></div></div>)}</div>;
}

function WeekTracker({ week, setWeek, selectedWeek, currentWeek }) { return <section className="section-block standalone"><div className="section-heading"><div><span className="small-label">MY PREGNANCY</span><h2>Week-by-week journey</h2></div><select className="week-select" value={week} onChange={(e) => setWeek(Number(e.target.value))}>{weekData.map((w) => <option key={w.week} value={w.week}>Week {w.week}</option>)}</select></div><div className="week-hero"><div className="week-number">{selectedWeek.week}</div><div><span className="week-pill">{selectedWeek.trimester}</span><h2>Week {selectedWeek.week}</h2><p>You're currently in week {selectedWeek.week}. </p></div></div><div className="info-grid"><InfoCard title="Baby development" text={selectedWeek.baby} /><InfoCard title="Your body" text={selectedWeek.mother} /><InfoCard title="Helpful reminders" text={selectedWeek.tips.join(" ")} /><InfoCard title="Talk with your healthcare professional" text="Bring personal questions or concerns to your prenatal appointments. Individual advice depends on your health and pregnancy." /></div><div className="week-actions"><button disabled={week <= 1} onClick={() => setWeek(week - 1)}>← Previous week</button><button onClick={() => setWeek(currentWeek)}>Current week</button><button disabled={week >= 40} onClick={() => setWeek(week + 1)}>Next week →</button></div></section>; }

function BabyTab({ week }) { return <section className="section-block standalone"><span className="small-label">BABY</span><h2>Your baby this week</h2><div className="baby-card large"><div className="baby-visual"><span>♡</span><small>approximate size</small><strong>{week.size}</strong></div><div><div className="week-pill">WEEK {week.week}</div><h3>Development highlights</h3><p>{week.baby}</p><h3>About your body</h3><p>{week.mother}</p></div></div><div className="notice">Baby size comparisons are only simple illustrations. Development varies, and healthcare professionals are the right source for individualized pregnancy information.</div></section>; }

function SymptomsTab({ symptoms, onAdd, onDelete }) { return <section className="section-block standalone"><div className="section-heading"><div><span className="small-label">TRACKING</span><h2>Symptoms</h2></div><button className="primary-btn" onClick={onAdd}>+ Log symptom</button></div>{symptoms.length ? <div className="entry-list">{symptoms.map((s) => <div className="entry" key={s.id}><div><strong>{s.symptom}</strong><small>{formatDate(s.date)} · {s.severity}</small>{s.notes && <p>{s.notes}</p>}</div><button className="delete-btn" onClick={() => onDelete(s.id)}>Delete</button></div>)}</div> : <Empty text="No symptoms logged yet." />}</section>; }

function MovementTab({ count, movements, onKick, session, setSession }) { return <section className="section-block standalone"><div className="section-heading"><div><span className="small-label">BABY MOVEMENTS</span><h2>Kick Counter</h2></div><span className="date-pill">{formatDate(todayISO())}</span></div><div className="kick-card"><div className="kick-count">{count}</div><span>movements logged today</span><button className="kick-btn" onClick={onKick}>👣 KICK</button><button className="reset-link" onClick={() => setSession(false)}>{session ? "Session active" : "Start a new session"}</button></div><div className="entry-list movement-list">{movements.slice(0, 12).map((m) => <div className="entry" key={m.id}><strong>👣 Baby movement</strong><small>{m.time}</small></div>)}</div><div className="notice">Use this as a personal tracking tool. Follow the movement guidance given by your own healthcare professional and seek medical advice if you notice a concerning change from your baby's usual movement pattern.</div></section>; }

function ContractionsTab({ start, elapsed, onToggle, contractions, averageDuration, averageInterval, formatSeconds }) { return <section className="section-block standalone"><span className="small-label">LABOUR TRACKING TOOL</span><h2>Contraction Timer</h2><div className="timer-card"><div className="timer">{formatSeconds(elapsed)}</div><button className="primary-btn" onClick={onToggle}>{start ? "STOP CONTRACTION" : "START CONTRACTION"}</button><p>Tap once when a contraction starts and again when it ends.</p></div><div className="stats-grid"><Stat title="Average duration" value={averageDuration ? `${formatSeconds(averageDuration)}` : "—"} /><Stat title="Average interval" value={averageInterval ? formatSeconds(averageInterval) : "—"} /><Stat title="Recorded" value={`${contractions.length}`} /></div><div className="entry-list">{contractions.slice(0, 8).map((c, i) => <div className="entry" key={c.id}><strong>Contraction {i + 1}</strong><small>{formatSeconds(c.duration)} {c.interval ? `· interval ${formatSeconds(c.interval)}` : ""}</small></div>)}</div><div className="notice">This timer only records timing. It cannot determine whether labour has started. Follow your healthcare professional's instructions about when to contact them.</div></section>; }

function AppointmentsTab({ appointments, onAdd, onDelete }) { const sorted = [...appointments].sort((a, b) => a.date.localeCompare(b.date)); return <section className="section-block standalone"><div className="section-heading"><div><span className="small-label">CARE</span><h2>Appointments</h2></div><button className="primary-btn" onClick={onAdd}>+ Add appointment</button></div>{sorted.length ? <div className="entry-list">{sorted.map((a) => <div className="entry" key={a.id}><div><strong>{a.name}</strong><small>{formatDate(a.date)} · {a.time} · {a.type}</small>{a.notes && <p>{a.notes}</p>}</div><button className="delete-btn" onClick={() => onDelete(a.id)}>Delete</button></div>)}</div> : <Empty text="No appointments added yet." />}</section>; }

function JournalTab({ entries, onAdd, onDelete }) { return <section className="section-block standalone"><div className="section-heading"><div><span className="small-label">PRIVATE JOURNAL</span><h2>Pregnancy memories</h2></div><button className="primary-btn" onClick={onAdd}>+ Add entry</button></div>{entries.length ? <div className="entry-list">{entries.map((j) => <div className="entry" key={j.id}><div><strong>{j.title || `Week ${j.week} journal`}</strong><small>{formatDate(j.date)} · Week {j.week}</small><p>{j.text}</p></div><button className="delete-btn" onClick={() => onDelete(j.id)}>Delete</button></div>)}</div> : <Empty text="Your private pregnancy journal is ready for your first entry." />}</section>; }

function ChecklistTab({ checklist, onToggle }) { return <section className="section-block standalone"><span className="small-label">PREPARATION</span><h2>Pregnancy checklist</h2>{Object.entries(checklistItems).map(([group, items]) => <div className="check-group" key={group}><h3>{group}</h3>{items.map((item) => { const key = `${group}:${item}`; return <label className={checklist[key] ? "check-item checked" : "check-item"} key={item}><input type="checkbox" checked={!!checklist[key]} onChange={() => onToggle(key)} /><span>{item}</span></label>; })}</div>)}</section>; }

function BirthPlanTab({ birthPlan, onSave }) { const [form, setForm] = useState(birthPlan); return <section className="section-block standalone"><span className="small-label">PREFERENCES</span><h2>Birth plan</h2><p className="muted">A birth plan records preferences. Plans may change depending on medical needs and circumstances.</p><div className="form-grid birth-form">{[["environment","Birth environment"],["support","Support person"],["painRelief","Pain-relief preferences"],["movement","Movement preferences"],["newborn","Newborn care preferences"],["questions","Questions for healthcare provider"]].map(([key,label]) => <label key={key}>{label}<textarea value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder="Add your preferences..." /></label>)}</div><button className="primary-btn" onClick={() => onSave(form)}>Save birth plan</button></section>; }

function ArticlesTab() { const articles = [{ cat: "PREGNANCY", title: "Understanding your pregnancy week", text: "Learn how pregnancy is commonly organized into weeks and trimesters." }, { cat: "BABY DEVELOPMENT", title: "How baby development changes", text: "Explore broad developmental themes across the pregnancy journey." }, { cat: "SYMPTOMS", title: "Tracking how you feel", text: "Keeping notes can help you communicate clearly during prenatal visits." }, { cat: "APPOINTMENTS", title: "Preparing for prenatal visits", text: "Write down questions and keep your appointment information together." }, { cat: "PREPARING FOR BIRTH", title: "Building a practical checklist", text: "Break preparation into small steps rather than trying to do everything at once." }, { cat: "NEWBORN", title: "Getting ready for baby", text: "Start with simple essentials and adapt your preparation to your family's needs." }]; return <section className="section-block standalone"><span className="small-label">LEARN</span><h2>Pregnancy articles</h2><div className="article-grid">{articles.map((a) => <article className="article-card" key={a.title}><span>{a.cat}</span><h3>{a.title}</h3><p>{a.text}</p><button className="text-btn">Read more →</button></article>)}</div></section>; }

function SafetyBox() { return <section className="safety-box"><div><span className="small-label">HEALTH & SAFETY</span><h2>When to seek medical advice</h2><p>BloomCare cannot decide whether a pregnancy symptom is an emergency. If you have a concerning symptom, feel seriously unwell, or are worried about your pregnancy, contact your healthcare professional or local emergency service as appropriate.</p></div><button className="outline-btn">View safety information</button></section>; }
function InfoCard({ title, text }) { return <div className="info-card"><h3>{title}</h3><p>{text}</p></div>; }
function Stat({ title, value }) { return <div className="stat"><small>{title}</small><strong>{value}</strong></div>; }
function Empty({ text }) { return <div className="empty">{text}</div>; }
function Modal({ title, children, onClose }) { return <div className="modal-backdrop" onMouseDown={onClose}><div className="modal" onMouseDown={(e) => e.stopPropagation()}><div className="modal-head"><h2>{title}</h2><button onClick={onClose}>×</button></div>{children}</div></div>; }

const styles = `
.pregnancy-page{--ink:#24323a;--muted:#71808a;--line:#e5e9e7;--soft:#f5f7f5;--accent:#6c8d84;--accent-dark:#4d7168;--cream:#faf9f5;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--ink);background:#fff;min-height:100vh;padding:30px;box-sizing:border-box}.pregnancy-page *{box-sizing:border-box}.pregnancy-header{max-width:1180px;margin:0 auto 22px;display:flex;justify-content:space-between;gap:20px;align-items:flex-end}.eyebrow,.small-label{font-size:11px;letter-spacing:.16em;font-weight:800;color:#82908c}.pregnancy-header h1{font-size:38px;line-height:1.08;margin:8px 0}.pregnancy-header p,.muted{color:var(--muted);margin:0;line-height:1.6}.outline-btn,.soft-btn,.week-actions button{border:1px solid var(--line);background:#fff;border-radius:12px;padding:11px 16px;color:var(--ink);cursor:pointer}.pregnancy-nav-shell{max-width:1180px;margin:0 auto 28px;display:flex;align-items:center;gap:10px;min-width:0}
.pregnancy-nav{flex:1;min-width:0;display:flex;gap:6px;overflow-x:auto;overflow-y:hidden;padding:4px 0;scrollbar-width:none;-ms-overflow-style:none;scroll-behavior:smooth}
.pregnancy-nav::-webkit-scrollbar{display:none}
.pregnancy-nav button{flex:0 0 auto;white-space:nowrap;border:0;background:transparent;padding:10px 12px;border-radius:12px;color:var(--muted);cursor:pointer;font-weight:650}
.pregnancy-nav button.active{background:var(--soft);color:var(--accent-dark)}
.pregnancy-nav span{margin-right:6px}
.pregnancy-nav-arrow{width:36px;height:36px;flex:0 0 36px;display:flex;align-items:center;justify-content:center;border:1px solid var(--line);border-radius:50%;background:#fff;color:var(--accent-dark);cursor:pointer;transition:background .2s,opacity .2s}
.pregnancy-nav-arrow:hover:not(:disabled){background:var(--soft)}
.pregnancy-nav-arrow:disabled{opacity:.3;cursor:not-allowed}
.pregnancy-section-switcher{max-width:1180px;margin:-12px auto 24px;display:flex;align-items:center;justify-content:center;gap:18px}
.pregnancy-section-switcher-btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;border:1px solid var(--line);background:#fff;color:var(--accent-dark);border-radius:999px;padding:8px 13px;font:inherit;font-size:13px;font-weight:650;cursor:pointer;transition:background .2s,opacity .2s}
.pregnancy-section-switcher-btn:hover:not(:disabled){background:var(--soft)}
.pregnancy-section-switcher-btn:disabled{opacity:.35;cursor:not-allowed}
.pregnancy-section-current{min-width:120px;text-align:center;color:var(--accent-dark);font-size:14px;font-weight:750}
@media(max-width:600px){.pregnancy-section-switcher{gap:10px;margin-top:-8px}.pregnancy-section-switcher-btn{padding:8px 10px;font-size:12px}.pregnancy-section-current{min-width:0;max-width:145px;font-size:13px}}
.hero-grid,.two-column,.tracking-grid,.info-grid,.stats-grid{max-width:1180px;margin:0 auto;display:grid;gap:16px}.hero-grid{grid-template-columns:1.6fr .8fr}.hero-card,.due-card,.panel,.baby-card,.ask-panel,.safety-box,.standalone{border:1px solid var(--line);border-radius:24px;background:#fff}.hero-card{padding:32px;background:var(--cream)}.hero-card h2{font-size:31px;margin:10px 0 8px;max-width:650px}.hero-card p{color:var(--muted);line-height:1.65;max-width:650px}.progress-track{height:9px;background:#e6ebe8;border-radius:99px;margin:26px 0 8px;overflow:hidden}.progress-track div{height:100%;background:var(--accent);border-radius:99px}.progress-meta{display:flex;justify-content:space-between;font-size:12px;color:var(--muted)}.hero-actions{display:flex;gap:10px;margin-top:22px}.primary-btn{border:0;background:var(--accent-dark);color:#fff;border-radius:12px;padding:12px 18px;font-weight:750;cursor:pointer}.due-card{padding:28px;display:flex;align-items:center;gap:22px}.circle-progress{width:122px;height:122px;border-radius:50%;border:8px solid #e7eeeb;display:flex;flex-direction:column;align-items:center;justify-content:center;flex:none}.circle-progress strong{font-size:23px}.circle-progress span{font-size:11px;color:var(--muted)}.due-card h3{margin:8px 0 5px;font-size:23px}.due-card p{color:var(--muted);margin:0}.section-block{max-width:1180px;margin:26px auto}.section-heading{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;margin-bottom:14px}.section-heading h2,.standalone h2{font-size:26px;margin:5px 0}.text-btn{border:0;background:none;color:var(--accent-dark);font-weight:750;cursor:pointer}.baby-card{padding:26px;display:grid;grid-template-columns:210px 1fr;gap:28px;align-items:center}.baby-card.large{max-width:900px}.baby-visual{min-height:180px;border-radius:20px;background:var(--soft);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}.baby-visual span{font-size:58px;color:var(--accent)}.baby-visual small{color:var(--muted)}.baby-visual strong{font-size:23px;margin-top:4px}.week-pill,.date-pill{display:inline-block;padding:7px 10px;border-radius:99px;background:var(--soft);font-size:11px;font-weight:800;letter-spacing:.08em;color:var(--accent-dark)}.baby-card h3{font-size:22px;margin:12px 0 7px}.baby-card p,.info-card p,.article-card p{color:var(--muted);line-height:1.65}.mini-list{display:grid;gap:8px;color:#52635d;font-size:14px}.tracking-grid{grid-template-columns:repeat(4,1fr)}.track-card{border:1px solid var(--line);background:#fff;border-radius:18px;padding:18px;text-align:left;display:flex;align-items:center;gap:12px;cursor:pointer}.track-icon{width:40px;height:40px;border-radius:12px;background:var(--soft);display:grid;place-items:center;font-size:18px}.track-card span:nth-child(2){display:grid;gap:4px;flex:1}.track-card small{color:var(--muted)}.track-card b{font-size:20px;color:var(--accent)}.two-column{grid-template-columns:1.1fr .9fr}.panel{padding:24px}.timeline{display:grid;gap:15px}.timeline-item{display:flex;gap:13px;align-items:flex-start}.timeline-item>span{width:28px;height:28px;border-radius:50%;background:var(--soft);display:grid;place-items:center;color:#87928f;font-size:12px}.timeline-item.done>span,.timeline-item.current>span{background:#e2ece8;color:var(--accent-dark)}.timeline-item.current strong{color:var(--accent-dark)}.timeline-item div{display:grid;gap:3px}.timeline-item small{color:var(--muted)}.companion{background:var(--cream)}.suggestions{display:grid;gap:8px;margin-top:18px}.suggestions button{border:0;background:#fff;border-radius:12px;padding:12px;text-align:left;color:var(--accent-dark);cursor:pointer}.ask-panel{padding:26px}.ask-box{display:flex;gap:10px;margin-top:18px}.ask-box input{flex:1;border:1px solid var(--line);border-radius:12px;padding:13px 14px;font:inherit}.answer{margin-top:14px;padding:15px;border-radius:14px;background:var(--soft);color:#52635d;line-height:1.6}.safety-box{max-width:1180px;margin:26px auto;padding:24px;background:#faf8f4;display:flex;justify-content:space-between;gap:20px;align-items:center}.safety-box h2{margin:6px 0}.safety-box p{color:var(--muted);line-height:1.6;max-width:780px}.standalone{padding:28px}.week-select{border:1px solid var(--line);border-radius:12px;padding:10px;background:#fff}.week-hero{display:flex;gap:24px;align-items:center;padding:24px;border-radius:20px;background:var(--cream);margin-bottom:18px}.week-number{width:90px;height:90px;border-radius:22px;background:#fff;display:grid;place-items:center;font-size:34px;font-weight:800;color:var(--accent-dark)}.info-grid{grid-template-columns:repeat(2,1fr)}.info-card{border:1px solid var(--line);border-radius:18px;padding:20px}.info-card h3{margin:0 0 8px}.week-actions{display:flex;justify-content:center;gap:10px;margin-top:22px}.week-actions button:disabled{opacity:.4;cursor:not-allowed}.notice,.form-note{margin-top:18px;padding:14px 16px;border-radius:14px;background:#f7f8f6;color:#65736e;line-height:1.55;font-size:13px}.entry-list{display:grid;gap:10px}.entry{border:1px solid var(--line);border-radius:15px;padding:16px;display:flex;justify-content:space-between;gap:15px;align-items:flex-start}.entry>div{min-width:0}.entry strong,.entry small{display:block}.entry small{color:var(--muted);margin-top:4px}.entry p{color:#596963;line-height:1.55;margin:8px 0 0}.delete-btn{border:0;background:transparent;color:#9a5d5d;cursor:pointer}.empty{padding:35px;text-align:center;border:1px dashed var(--line);border-radius:16px;color:var(--muted)}.kick-card,.timer-card{text-align:center;border:1px solid var(--line);border-radius:22px;padding:30px;background:var(--cream);max-width:600px;margin:0 auto 18px}.kick-count{font-size:56px;font-weight:800}.kick-card>span{display:block;color:var(--muted);margin-bottom:18px}.kick-btn{width:150px;height:150px;border-radius:50%;border:0;background:#fff;box-shadow:0 8px 28px rgba(40,60,55,.08);font-size:20px;font-weight:800;color:var(--accent-dark);cursor:pointer}.reset-link{display:block;margin:15px auto 0;border:0;background:none;color:var(--muted);cursor:pointer}.timer{font-size:62px;font-variant-numeric:tabular-nums;font-weight:800;margin-bottom:20px}.timer-card p{color:var(--muted)}.stats-grid{grid-template-columns:repeat(3,1fr);margin:18px auto;max-width:700px}.stat{border:1px solid var(--line);border-radius:16px;padding:17px;text-align:center}.stat small,.stat strong{display:block}.stat small{color:var(--muted)}.stat strong{font-size:22px;margin-top:6px}.check-group{margin-top:22px}.check-group h3{font-size:17px}.check-item{display:flex;gap:12px;align-items:center;border:1px solid var(--line);border-radius:14px;padding:14px;margin:8px 0;cursor:pointer}.check-item input{width:18px;height:18px}.check-item.checked span{text-decoration:line-through;color:var(--muted)}.birth-form{max-width:900px;margin:20px 0}.article-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:15px}.article-card{border:1px solid var(--line);border-radius:18px;padding:20px}.article-card>span{font-size:10px;letter-spacing:.12em;font-weight:800;color:var(--accent)}.article-card h3{margin:10px 0 7px}.form-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.form-grid label{display:grid;gap:7px;font-size:13px;font-weight:700;color:#51615c}.form-grid .full{grid-column:1/-1}.form-grid input,.form-grid select,.form-grid textarea{width:100%;border:1px solid var(--line);border-radius:11px;padding:11px 12px;font:inherit;font-weight:400;color:var(--ink);background:#fff}.form-grid textarea{min-height:95px;resize:vertical}.modal-backdrop{position:fixed;inset:0;background:rgba(20,30,28,.38);display:grid;place-items:center;padding:20px;z-index:50}.modal{width:min(620px,100%);max-height:90vh;overflow:auto;background:#fff;border-radius:22px;padding:22px}.modal-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}.modal-head h2{margin:0}.modal-head button{border:0;background:var(--soft);border-radius:10px;width:34px;height:34px;font-size:22px;cursor:pointer}
@media(max-width:900px){.pregnancy-page{padding:18px}.pregnancy-header{display:block}.pregnancy-header .outline-btn{margin-top:15px}.hero-grid,.two-column,.info-grid,.article-grid{grid-template-columns:1fr}.tracking-grid{grid-template-columns:repeat(2,1fr)}.baby-card{grid-template-columns:1fr}.safety-box{display:block}.safety-box .outline-btn{margin-top:10px}.pregnancy-nav-shell{margin-bottom:18px}.hero-card h2{font-size:26px}}
@media(max-width:600px){.pregnancy-nav-shell{gap:5px}.pregnancy-nav-arrow{width:32px;height:32px;flex-basis:32px}.pregnancy-nav button{padding:10px 9px;font-size:13px}.tracking-grid,.stats-grid,.form-grid{grid-template-columns:1fr}.form-grid .full{grid-column:auto}.hero-card,.due-card,.panel,.baby-card,.ask-panel,.safety-box,.standalone{border-radius:18px}.hero-actions,.ask-box,.week-actions{flex-direction:column}.week-actions button{width:100%}.week-hero{align-items:flex-start}.week-number{width:70px;height:70px;font-size:26px;flex:none}.circle-progress{width:90px;height:90px}.due-card{padding:20px}.pregnancy-header h1{font-size:30px}}
`;
