import React, { useEffect, useMemo, useState } from "react";
import "./BabyCare.css";

const PREGNANCY_STORAGE_KEY = "bloomcare_pregnancy_v1";
const BABY_CARE_STORAGE_KEY = "bloomcare_baby_care_v1";
const DAY = 24 * 60 * 60 * 1000;

const monthGuides = [
  {
    month: 1, weeks: "Weeks 1–4", trimester: "First trimester", size: "A tiny poppy seed by the end of the month",
    babyTitle: "The earliest foundations begin",
    baby: [
      "Pregnancy is dated from the first day of the last menstrual period, so the first two weeks usually happen before conception.",
      "After fertilisation, the developing group of cells travels towards the uterus and may implant in its lining.",
      "The early structures that will form the placenta and embryo begin to develop. The neural plate, which contributes to the brain and spinal cord, starts forming.",
      "There are no movements that a mother can feel at this stage. Development is microscopic and changes quickly."
    ],
    mom: {
      nutrition: ["Choose a varied diet with vegetables, fruits, whole grains, pulses, nuts and protein foods.", "Include folate-rich foods such as leafy greens, beans and citrus fruits; take folic acid only as advised by your clinician.", "Drink water regularly and eat small, balanced meals if nausea begins.", "Avoid alcohol; handle raw meat, eggs and unpasteurised dairy carefully, and follow local food-safety advice."],
      wellness: ["If pregnancy is possible, arrange a healthcare appointment and review any medicines or supplements with a clinician.", "Gentle walking and usual daily activity are generally reasonable if you feel well and have no restriction from your clinician.", "Prioritise sleep, regular meals and calm routines. Be kind to yourself if energy or emotions fluctuate.", "Wash hands and practise safe food preparation."],
      bonding: ["You may begin a private pregnancy journal or note how you are feeling.", "Invite your partner or support person to join an early appointment if you wish.", "Talk together about hopes, questions and the kind of support that would feel helpful."],
      medical: ["Arrange an antenatal appointment to confirm the pregnancy and discuss your health history.", "Ask which medicines, supplements and vaccinations are appropriate for you.", "Ask when an ultrasound or blood tests are recommended in your location and situation.", "Seek prompt medical advice for heavy bleeding, severe or one-sided abdominal pain, fainting or severe dizziness."]
    },
    activities: ["Start a pregnancy journal", "Write down medicines and supplements to review with your clinician", "Plan simple, nourishing meals", "Choose one person who can support you"],
    focus: "Arrange early pregnancy care and establish safe daily habits.",
    avoid: "Avoid alcohol, smoking and recreational drugs. Do not start or stop prescription medicines or supplements without professional advice.",
    reminders: ["Pregnancy dating begins before conception.", "Development varies; a size comparison is only an illustration."],
    questions: ["Which folic acid dose and prenatal supplements are right for me?", "Are my current medicines and health conditions relevant to pregnancy?", "When should I have my first scan and blood tests?"],
    bondingActivity: "Write a short note to your future baby about how you are feeling today."
  },
  {
    month: 2, weeks: "Weeks 5–8", trimester: "First trimester", size: "Around the size of a raspberry by week 8",
    babyTitle: "Early organs and body structures take shape",
    baby: [
      "The embryo grows rapidly and begins to develop a more recognisable head and body shape.",
      "The neural tube closes during this period; it develops into the brain and spinal cord. The heart begins early activity and may be seen on an ultrasound at an appropriate time.",
      "Foundations of the eyes, ears, arms, legs and major organs are forming. These structures are still immature.",
      "Small spontaneous movements may begin, but they are far too subtle for the mother to feel."
    ],
    mom: {
      nutrition: ["Try small, frequent meals if nausea makes larger meals difficult.", "Include protein such as well-cooked eggs, beans, lentils, tofu, fish low in mercury or lean meat.", "Choose iron-containing foods such as lentils, beans and leafy greens; pair plant sources with vitamin-C-rich foods.", "Continue prescribed folic acid or prenatal supplements; ask before adding extra products."],
      wellness: ["Rest when tired and choose gentle activity if comfortable and medically appropriate.", "Try slow breathing, a short walk or talking with someone you trust when stress feels high.", "Keep food surfaces clean and cook meat, seafood and eggs thoroughly.", "Avoid overheating and ask your clinician about activities or travel relevant to your health."],
      bonding: ["Talk or sing if it feels meaningful, even though the embryo cannot hear you yet.", "Share an appointment or weekly update with your partner or support person.", "Take a private photo or journal note if you would like to remember this stage."],
      medical: ["Attend the first antenatal visit and discuss medical, family and pregnancy history.", "Your clinician may offer blood group, anaemia, infection and other screening tests according to local guidance.", "Ask about the timing and purpose of an early ultrasound.", "Seek urgent care for heavy bleeding, severe pain, fainting, fever or persistent vomiting with inability to keep fluids down."]
    },
    activities: ["Create a list of questions for the first antenatal visit", "Try a gentle relaxation routine", "Prepare one easy protein-rich snack", "Record a weekly journal entry"],
    focus: "Attend early antenatal care and find ways to manage nausea and fatigue.",
    avoid: "Avoid alcohol and tobacco; do not use herbal remedies or over-the-counter medicines without checking suitability.",
    reminders: ["Not everyone has the same symptoms.", "Take prescribed supplements consistently and discuss side effects with your clinician."],
    questions: ["Which screening tests are recommended for me?", "What can I safely use for nausea?", "Are my exercise and work routines suitable?"],
    bondingActivity: "Choose a song that you and your partner would like to make part of your pregnancy memories."
  },
  {
    month: 3, weeks: "Weeks 9–13", trimester: "First trimester", size: "Around the size of a peach by week 13",
    babyTitle: "The body becomes more recognisable",
    baby: [
      "The embryo is called a fetus from around week 10 of pregnancy, as measured from the last menstrual period.",
      "The head is still proportionally large, while the face, fingers, toes and limbs become more defined.",
      "Major organs have formed their early structures and continue to mature; the kidneys, liver and digestive system are developing.",
      "The fetus can make small movements, stretch and bend, although these are not usually felt yet. Early sensory structures continue developing."
    ],
    mom: {
      nutrition: ["Eat a mix of whole grains, vegetables, fruits, dairy or calcium-fortified alternatives and protein foods.", "Include calcium sources such as milk, curd, paneer made from pasteurised milk, tofu set with calcium or fortified alternatives.", "Continue iron- and folate-containing foods and prescribed supplements.", "Wash produce, avoid unpasteurised foods and choose fish according to local low-mercury advice."],
      wellness: ["If you feel well and have no medical restriction, continue gentle movement such as walking, swimming or pregnancy-appropriate mobility.", "Use rest breaks and a consistent sleep routine.", "Check in with your emotional wellbeing; speak with a trusted person or clinician if anxiety or low mood persists.", "Use comfortable clothing and gentle skin care; avoid harsh or irritating products if skin is sensitive."],
      bonding: ["You can talk or sing to your baby, although hearing develops later.", "Invite your partner to attend a scan or appointment where possible.", "Take a bump photo if you wish; there may be little visible change yet."],
      medical: ["Discuss first-trimester screening options and the timing of the dating scan or nuchal translucency scan where offered.", "Review blood and urine test results with your clinician.", "Ask how to contact your maternity team outside appointment hours.", "Seek prompt care for bleeding, fluid leakage, severe abdominal pain, fever or severe dehydration."]
    },
    activities: ["Take a month-three bump or milestone photo if comfortable", "Organise scan and test reports", "Plan a few balanced meals for busy days", "Write down emotional and physical changes"],
    focus: "Complete recommended first-trimester checks and build a manageable routine.",
    avoid: "Avoid crash diets, smoking, alcohol and unreviewed supplements. Do not compare your symptoms or bump with others.",
    reminders: ["A scan schedule depends on your care setting and individual needs.", "Contact your care team if symptoms worry you."],
    questions: ["What did my screening results mean?", "When is my next appointment or scan?", "Which activities should I modify, if any?"],
    bondingActivity: "Record a short voice note or letter describing one thing you are looking forward to sharing with your baby."
  },
  {
    month: 4, weeks: "Weeks 14–17", trimester: "Second trimester", size: "Around the size of an avocado by week 16",
    babyTitle: "Growth and movement become more active",
    baby: [
      "The fetus lengthens and its bones continue to harden. The neck becomes more defined and facial features are clearer.",
      "The brain and nervous system continue coordinating movement. Muscles and joints allow more stretching and flexing.",
      "The heart pumps blood and organs continue maturing; the kidneys produce urine that contributes to amniotic fluid.",
      "The fetus may move, turn and bring hands towards the face. Some mothers may begin to notice fluttering later in this period, while others feel movement later."
    ],
    mom: {
      nutrition: ["Include protein at meals and snacks: pulses, beans, tofu, eggs, dairy, nuts or thoroughly cooked lean meats.", "Choose calcium-rich foods and iron sources; ask whether your blood results require any changes.", "Eat colourful vegetables and fruits and drink water throughout the day.", "Continue prescribed prenatal supplements; avoid high-dose vitamin products unless prescribed."],
      wellness: ["Consider walking, swimming or prenatal movement classes after checking suitability with your clinician.", "Use supportive footwear and take breaks if standing for long periods.", "Try side-lying rest with pillows if comfortable; choose a regular sleep routine.", "Make time for enjoyable, low-pressure activities and ask for help when needed."],
      bonding: ["Talk, read or sing to your baby as a relaxing routine.", "Invite your partner to feel involved through appointments, meal planning or preparing the nursery.", "Begin noticing your own body changes without expecting a particular bump size."],
      medical: ["Ask about the recommended timing of the detailed anatomy scan, commonly offered around 18–22 weeks.", "Review blood pressure, urine and any screening results at appointments.", "Discuss travel, dental care, work demands and exercise questions with your clinician.", "Seek care for bleeding, fluid leakage, severe pain, fever or symptoms that feel urgent."]
    },
    activities: ["Start a simple meal-planning page", "Take a bump photo if you wish", "Explore safe prenatal activity options", "Read about the upcoming anatomy scan"],
    focus: "Support steady wellbeing and prepare for the mid-pregnancy scan.",
    avoid: "Avoid contact sports, activities with a high risk of falling or abdominal impact, and exercise that causes pain, dizziness or breathlessness.",
    reminders: ["First movements can feel like bubbles or flutters and timing varies.", "Do not use a home Doppler to reassure yourself about fetal wellbeing."],
    questions: ["When should my anatomy scan take place?", "Do I need iron or other supplements based on my tests?", "Are there any restrictions based on my pregnancy?"],
    bondingActivity: "Read a short story aloud and invite your partner or support person to join."
  },
  {
    month: 5, weeks: "Weeks 18–22", trimester: "Second trimester", size: "Around the size of a banana by week 20",
    babyTitle: "Hearing and sensory pathways develop",
    baby: [
      "The fetus grows longer and stronger, and the skin is covered by a protective coating called vernix and fine hair called lanugo.",
      "The brain develops rapidly, building networks that support movement and sensory processing.",
      "The ears and hearing pathways continue to develop; the fetus may begin responding to sounds, though responses are not a reliable wellbeing test.",
      "Many mothers begin to feel movements during this broad period. The pattern may be irregular at first and becomes more familiar over time."
    ],
    mom: {
      nutrition: ["Keep eating varied meals with protein, whole grains, fruits and vegetables.", "Include iron-rich foods and pair plant iron with vitamin C; include calcium-rich foods daily.", "Drink enough fluids, especially in hot weather or when active.", "Follow food safety: avoid raw or undercooked animal products and unpasteurised dairy; follow local advice on fish."],
      wellness: ["Continue comfortable, moderate activity if your clinician has not advised otherwise.", "Try side sleeping if comfortable; either side is generally acceptable unless your clinician advises a particular position.", "Use relaxation, social support and enjoyable breaks to support emotional wellbeing.", "Discuss back or pelvic discomfort rather than pushing through pain."],
      bonding: ["Talk, sing or read aloud; familiar voices may become more meaningful as hearing develops.", "Notice your baby's emerging movement pattern without trying to force movement.", "Invite your partner to share a quiet talking or reading moment."],
      medical: ["Attend the anatomy scan if recommended and ask the clinician to explain what it can and cannot assess.", "Discuss fetal movement guidance and when to contact your maternity unit.", "Ask about screening for anaemia and gestational diabetes at the appropriate time in your care plan.", "Seek urgent advice for bleeding, fluid leakage, severe headache, vision changes, severe abdominal pain or reduced movement once a usual pattern is established."]
    },
    activities: ["Create a small playlist for quiet bonding", "Attend or schedule the anatomy scan", "Write down questions about baby movements", "Prepare one iron- and calcium-rich meal"],
    focus: "Understand scan results and learn the movement advice for your maternity team.",
    avoid: "Avoid comparing movement frequency with another pregnancy. Do not delay reporting a concerning change in movement once a pattern is established.",
    reminders: ["The timing of first movement varies, especially in a first pregnancy.", "A scan cannot identify every possible condition."],
    questions: ["Were all structures that could be assessed seen on the scan?", "When and how should I monitor movements?", "When is my glucose screening planned?"],
    bondingActivity: "Share a favourite song or story with your baby during a calm moment."
  },
  {
    month: 6, weeks: "Weeks 23–27", trimester: "Second trimester", size: "Around the size of a cauliflower by week 27",
    babyTitle: "Lungs, brain and senses continue maturing",
    baby: [
      "The fetus gains weight and body proportions continue changing. The skin is still thin and may look wrinkled.",
      "The brain grows and forms more complex connections. Sleep and activity cycles begin to become more organised.",
      "The lungs develop airways and cells involved in surfactant production, but they are not yet mature for life outside the womb.",
      "The fetus responds to touch and sound and may have periods of movement and rest. Movement strength and pattern differ between babies."
    ],
    mom: {
      nutrition: ["Continue balanced meals with protein, fibre-rich grains, vegetables and fruit.", "Include iron-rich foods and calcium sources; follow prescribed supplements and blood-test advice.", "Drink water regularly and include fibre to help with constipation.", "Avoid excess caffeine and follow local advice on safe fish choices and food handling."],
      wellness: ["Choose gentle activity such as walking or swimming if comfortable and cleared for you.", "Try pillows for support during rest and take breaks during long periods of sitting or standing.", "Use breathing exercises, mindfulness or supportive conversations to manage stress.", "Discuss persistent heartburn, constipation, pain or sleep problems with your clinician."],
      bonding: ["Talk or sing during a relaxed daily routine.", "Learn the movement pattern your maternity team wants you to pay attention to.", "Let your partner or support person know how they can help you rest and attend appointments."],
      medical: ["Ask when gestational diabetes screening and repeat blood tests are due in your setting.", "Review blood pressure, urine checks and any symptoms at antenatal visits.", "Discuss preterm labour warning signs and the right number to call.", "Seek urgent assessment for regular painful contractions, fluid leakage, bleeding, severe headache, vision changes or a concerning reduction in movements."]
    },
    activities: ["Practise a short daily relaxation exercise", "Make a list of questions about birth preparation", "Organise pregnancy records in one folder", "Learn how to recognise your baby's usual movement pattern"],
    focus: "Keep antenatal checks up to date and learn which symptoms need prompt attention.",
    avoid: "Avoid ignoring regular painful tightening, fluid leakage, bleeding or a change in your baby's usual movement pattern.",
    reminders: ["Movement awareness matters more than reaching a universal kick-count number unless your clinician gives a specific plan.", "Call your maternity team if you are unsure."],
    questions: ["When should I complete glucose screening?", "What symptoms could indicate preterm labour?", "What is the recommended movement plan for me?"],
    bondingActivity: "Create a shared playlist or read a few pages of a book aloud with your partner."
  },
  {
    month: 7, weeks: "Weeks 28–31", trimester: "Third trimester", size: "Around the size of a coconut by week 31",
    babyTitle: "Rapid brain growth and stronger movements",
    baby: [
      "The fetus gains body fat and weight, and the skin gradually becomes less transparent.",
      "The brain develops rapidly, with increasing folds and connections. The nervous system continues refining control of body functions.",
      "The lungs continue maturing, and the fetus practises breathing-like movements, although oxygen is still received through the placenta.",
      "Movements may feel stronger and more recognisable. Babies also have sleep periods; know the pattern that is usual for your baby."
    ],
    mom: {
      nutrition: ["Continue varied meals with protein, vegetables, fruit, whole grains and calcium-rich foods.", "Prioritise iron-containing foods and take supplements only as prescribed.", "Keep water nearby and choose fibre-rich foods to support digestion.", "Avoid unsafe food handling and check any herbal teas or supplements with your clinician."],
      wellness: ["Continue suitable activity if comfortable; reduce intensity as needed and avoid overheating.", "Use pillows to support your back and legs during sleep.", "Plan rest breaks and accept practical help with chores.", "Talk about mood, anxiety or sleep difficulties with someone you trust or your healthcare team."],
      bonding: ["Talk, sing or read at a time when you are relaxed.", "Notice your baby's usual active and quiet periods.", "Invite your partner to help prepare a comfortable space for feeding and rest."],
      medical: ["Antenatal visits may become more frequent; follow your clinic's schedule.", "Review blood pressure, urine, fetal growth and any tests recommended for your circumstances.", "Ask about vaccinations recommended during pregnancy in your region.", "Seek urgent care for reduced or changed fetal movements, bleeding, fluid leakage, severe headache, vision changes or severe abdominal pain."]
    },
    activities: ["Take a month-seven bump photo if you wish", "Begin a practical newborn essentials list", "Discuss birth preferences with your support person", "Review emergency contact numbers"],
    focus: "Become familiar with your baby's movement pattern and start practical birth preparation.",
    avoid: "Avoid strenuous activity that causes warning symptoms, and do not postpone assessment for reduced movements.",
    reminders: ["There is no need to buy every newborn product before birth.", "Follow your own maternity team's movement advice."],
    questions: ["How often will my antenatal visits happen now?", "Which vaccinations are recommended during pregnancy?", "What should I do if movements change?"],
    bondingActivity: "Spend a few quiet minutes talking to your baby and sharing the moment with your partner."
  },
  {
    month: 8, weeks: "Weeks 32–35", trimester: "Third trimester", size: "Around the size of a pineapple by week 35",
    babyTitle: "The body prepares for birth",
    baby: [
      "The fetus continues gaining weight and storing fat, which helps with temperature regulation after birth.",
      "The brain and nervous system continue maturing, and the skull remains flexible to help with birth.",
      "The lungs and other organs continue development. Many babies move into a head-down position, although position can still change.",
      "Movements may feel more like rolls, stretches and pushes as space becomes more limited, but they should not simply become less frequent."
    ],
    mom: {
      nutrition: ["Choose regular meals and snacks with protein, vegetables, fruit, whole grains and calcium sources.", "Continue prescribed iron, folic acid or other supplements according to your clinician's plan.", "Drink fluids regularly and use fibre-rich foods if constipation is an issue.", "Eat safely prepared foods; avoid alcohol and follow local guidance on caffeine and fish."],
      wellness: ["Use gentle walking or other approved movement, taking breaks when needed.", "Experiment with pillows and a calming bedtime routine.", "Practise breathing or relaxation techniques for comfort, not as a guarantee of a particular birth outcome.", "Ask for help with lifting, errands and tiring tasks."],
      bonding: ["Continue talking, singing or reading aloud.", "Discuss how your partner can support you during labour and after birth.", "Learn about skin-to-skin contact and early feeding with your maternity team."],
      medical: ["Attend scheduled antenatal visits and ask about baby's position and growth assessment if indicated.", "Discuss birth location, transport, warning signs and whom to contact at any hour.", "Ask about tests or vaccinations that remain due in your care plan.", "Seek urgent care for reduced movements, bleeding, fluid leakage, regular painful contractions, severe headache or vision changes."]
    },
    activities: ["Prepare a hospital bag checklist", "Wash and organise a few newborn clothes", "Learn the basics of breastfeeding or chosen feeding method", "Plan transport to your birth facility"],
    focus: "Prepare practical birth arrangements and learn what to expect in early newborn care.",
    avoid: "Avoid exhausting last-minute tasks and avoid delaying care for any warning sign.",
    reminders: ["A baby should continue to move; a change in the usual pattern needs prompt assessment.", "Birth preferences are flexible and may change for safety."],
    questions: ["What is my baby's position and does it need follow-up?", "When should I come to the hospital or call the maternity unit?", "What feeding and newborn support is available after birth?"],
    bondingActivity: "Pack one small item for the baby together and talk about the first quiet moments after birth."
  },
  {
    month: 9, weeks: "Weeks 36–40", trimester: "Third trimester", size: "Around the size of a small pumpkin near week 40",
    babyTitle: "Final preparation for life outside the womb",
    baby: [
      "The fetus continues gaining weight and building fat stores. The body is generally more rounded and readying for birth.",
      "The brain and nervous system continue maturing through the final weeks and beyond birth.",
      "The lungs and other organs continue preparing for life outside the uterus. The placenta continues supporting the baby until birth.",
      "The baby may settle lower into the pelvis. Movements may feel different because of less room, but should not become less frequent; any reduction or change from the usual pattern needs immediate contact with maternity care."
    ],
    mom: {
      nutrition: ["Eat nourishing, manageable meals and snacks; there is no need to follow a special labour-inducing diet.", "Continue prescribed supplements and keep hydrated.", "Include protein, iron and calcium sources as part of a varied diet.", "Avoid unproven foods, herbs or supplements promoted to start labour."],
      wellness: ["Rest when possible and use gentle movement if comfortable and approved.", "Keep your phone, transport plan and support contacts ready.", "Use relaxation and supportive company to manage waiting and uncertainty.", "Follow your clinician's advice about sleep, activity and when to attend the hospital."],
      bonding: ["Talk, sing or read to your baby whenever you like.", "Share final preparations with your partner or support person.", "Discuss early skin-to-skin contact and feeding preferences with your maternity team."],
      medical: ["Attend all scheduled late-pregnancy visits; your clinician may check baby's position and discuss birth planning.", "Ask about group B strep testing where it is part of local practice, and what your results mean.", "Know the instructions for contractions, waters breaking, bleeding and reduced movements.", "Contact maternity care immediately for reduced or changed movements, bleeding, fluid leakage, severe headache, vision changes, fever or any urgent concern."]
    },
    activities: ["Keep the hospital bag and documents ready", "Confirm transport and support contacts", "Prepare a safe, flat baby sleep space", "Review newborn feeding and follow-up support"],
    focus: "Stay in contact with your maternity team, rest and keep birth arrangements flexible.",
    avoid: "Do not try home methods, herbs or medicines to induce labour unless specifically prescribed. Never wait until the next day to report reduced movements.",
    reminders: ["Your due date is an estimate; birth may happen before or after it.", "Seek professional advice rather than relying on contraction timers or online checklists alone."],
    questions: ["What is the plan if I go past my due date?", "When should I call or come in during labour?", "Who can help with feeding and newborn care after birth?"],
    bondingActivity: "Write a welcome note to your baby or record a message to share with them in the future."
  }
];

function readPregnancyProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(PREGNANCY_STORAGE_KEY) || "null");
    if (saved?.profile && (saved.profile.lmp || saved.profile.dueDate || saved.profile.knownWeek)) return saved.profile;
    const ownLmp = localStorage.getItem("bloomcare_baby_care_lmp_v1");
    return ownLmp ? { lmp: ownLmp, dueDate: "", knownWeek: "" } : null;
  } catch {
    return null;
  }
}

function parseLocalDate(value) {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day, 12);
}

function getCurrentWeek(profile) {
  if (!profile) return null;
  if (profile.knownWeek) return Math.min(40, Math.max(1, Number(profile.knownWeek)));
  const lmp = parseLocalDate(profile.lmp);
  const dueDate = parseLocalDate(profile.dueDate);
  const start = lmp || (dueDate ? new Date(dueDate.getTime() - 280 * DAY) : null);
  if (!start) return null;
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  return Math.min(42, Math.max(1, Math.floor((today - start) / (7 * DAY)) + 1));
}

function getMonthFromWeek(week) {
  if (!week) return null;
  if (week <= 4) return 1;
  if (week <= 8) return 2;
  if (week <= 13) return 3;
  if (week <= 17) return 4;
  if (week <= 22) return 5;
  if (week <= 27) return 6;
  if (week <= 31) return 7;
  if (week <= 35) return 8;
  return 9;
}

function loadCompleted() {
  try {
    return JSON.parse(localStorage.getItem(BABY_CARE_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export default function BabyCare() {
  const [profile, setProfile] = useState(readPregnancyProfile);
  const [manualLmp, setManualLmp] = useState(() => localStorage.getItem("bloomcare_baby_care_lmp_v1") || "");
  const [activeMonth, setActiveMonth] = useState(null);
  const [completed, setCompleted] = useState(loadCompleted);
  const [showSetup, setShowSetup] = useState(false);

  useEffect(() => {
    const refreshProfile = () => setProfile(readPregnancyProfile());
    window.addEventListener("storage", refreshProfile);
    return () => window.removeEventListener("storage", refreshProfile);
  }, []);

  useEffect(() => {
    localStorage.setItem(BABY_CARE_STORAGE_KEY, JSON.stringify(completed));
  }, [completed]);

  const currentWeek = useMemo(() => {
    if (profile) return getCurrentWeek(profile);
    if (manualLmp) return getCurrentWeek({ lmp: manualLmp });
    return null;
  }, [profile, manualLmp]);

  const currentMonth = getMonthFromWeek(currentWeek);
  const selectedMonth = activeMonth || currentMonth || 1;
  const guide = monthGuides[selectedMonth - 1];
  const monthCompleted = completed[selectedMonth] || [];
  const totalActivities = monthGuides.reduce((sum, item) => sum + item.activities.length, 0);
  const completedCount = Object.values(completed).reduce((sum, list) => sum + (Array.isArray(list) ? list.length : 0), 0);
  const overallProgress = Math.round((completedCount / totalActivities) * 100);
  const monthProgress = Math.round((monthCompleted.length / guide.activities.length) * 100);

  const toggleActivity = (activity) => {
    setCompleted((previous) => {
      const current = previous[selectedMonth] || [];
      const next = current.includes(activity) ? current.filter((item) => item !== activity) : [...current, activity];
      return { ...previous, [selectedMonth]: next };
    });
  };

  const saveManualDate = (event) => {
    event.preventDefault();
    if (!manualLmp) return;
    localStorage.setItem("bloomcare_baby_care_lmp_v1", manualLmp);
    setProfile({ lmp: manualLmp, dueDate: "", knownWeek: "" });
    setShowSetup(false);
  };

  return (
    <main className="baby-care-page">
      <section className="bc-hero">
        <div className="bc-hero-copy">
          <span className="bc-eyebrow">BLOOMCARE · MOM & BABY</span>
          <h1>Growing Together <span>– A Month-by-Month Guide for Mom & Baby</span></h1>
          <p>Gentle, practical guidance for your baby's development and your wellbeing through all nine months.</p>
          <div className="bc-hero-meta">
            <span><i className="bi bi-heart-pulse" /> 9 months of guidance</span>
            <span><i className="bi bi-check2-circle" /> Your progress is saved</span>
          </div>
        </div>
        <div className="bc-hero-art" aria-label="Illustration of a parent holding a baby">
          <div className="bc-art-circle"><span className="bc-art-sun">✦</span><span className="bc-art-mom">♡</span><span className="bc-art-leaf leaf-one">❧</span><span className="bc-art-leaf leaf-two">❧</span></div>
          <div className="bc-art-caption">Growing with love, one month at a time</div>
        </div>
      </section>

      <section className="bc-progress-panel">
        <div>
          <span className="bc-eyebrow">YOUR GUIDE PROGRESS</span>
          <h2>{completedCount} of {totalActivities} activities completed</h2>
          <p>Tick off activities as you complete them. Your checklist stays saved on this device.</p>
        </div>
        <div className="bc-progress-ring" style={{ "--progress": `${overallProgress}%` }}>
          <strong>{overallProgress}%</strong><span>complete</span>
        </div>
      </section>

      <section className="bc-month-section">
        <div className="bc-section-heading">
          <div><span className="bc-eyebrow">EXPLORE YOUR JOURNEY</span><h2>Your nine months</h2><p>Select a month to explore baby development and care ideas.</p></div>
          <button className="bc-outline-btn" onClick={() => setShowSetup((value) => !value)}><i className="bi bi-calendar-heart" /> {currentMonth ? "Update dating" : "Set pregnancy date"}</button>
        </div>

        {showSetup && (
          <form className="bc-date-form" onSubmit={saveManualDate}>
            <label htmlFor="bc-lmp">Last menstrual period (LMP) date</label>
            <div><input id="bc-lmp" type="date" value={manualLmp} onChange={(event) => setManualLmp(event.target.value)} required /><button className="bc-primary-btn" type="submit">Calculate my month</button></div>
            <small>If you already entered pregnancy details in the Pregnancy section, this guide uses those details automatically. If not, you can enter an LMP date here. Your clinician's dating information takes priority.</small>
          </form>
        )}

        {currentMonth ? (
          <div className="bc-current-note"><i className="bi bi-stars" /><span>Based on your saved pregnancy details, <strong>Month {currentMonth}</strong> is highlighted. You can still explore any month.</span></div>
        ) : (
          <div className="bc-current-note"><i className="bi bi-info-circle" /><span>Set your pregnancy date in the Pregnancy section or enter your LMP above to highlight your current month automatically.</span></div>
        )}

        <div className="bc-month-grid">
          {monthGuides.map((item) => {
            const done = completed[item.month]?.length || 0;
            const isCurrent = currentMonth === item.month;
            return (
              <button key={item.month} className={`bc-month-card ${selectedMonth === item.month ? "selected" : ""} ${isCurrent ? "current" : ""}`} onClick={() => setActiveMonth(item.month)}>
                <span className="bc-month-number">0{item.month}</span>
                <span className="bc-month-title">Month {item.month}</span>
                <small>{item.weeks}</small>
                <span className="bc-month-card-bottom">{isCurrent ? <b><i className="bi bi-geo-alt-fill" /> Current month</b> : <b>{item.trimester}</b>}<em>{done}/{item.activities.length} done</em></span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="bc-detail-section" key={selectedMonth}>
        <div className="bc-detail-header">
          <div><span className="bc-eyebrow">MONTH {guide.month} · {guide.trimester.toUpperCase()}</span><h2>{guide.month === currentMonth ? "Your current month" : `Month ${guide.month}`} <span>{guide.weeks}</span></h2><p>{guide.babyTitle}</p></div>
          <div className="bc-size-chip"><span>Approximate size</span><strong>{guide.size}</strong></div>
        </div>

        <div className="bc-two-panels">
          <article className="bc-info-panel bc-baby-panel">
            <div className="bc-panel-heading"><div className="bc-panel-icon"><i className="bi bi-stars" /></div><div><span>FOR YOUR LITTLE ONE</span><h3>Your Baby's Development</h3></div></div>
            <ul>{guide.baby.map((item, index) => <li key={index}>{item}</li>)}</ul>
            <div className="bc-panel-footnote">Development and size are approximate. Every pregnancy and baby develops at an individual pace.</div>
          </article>

          <article className="bc-info-panel bc-mom-panel">
            <div className="bc-panel-heading"><div className="bc-panel-icon"><i className="bi bi-heart" /></div><div><span>CARE FOR YOURSELF</span><h3>What Mom Can Do This Month</h3></div></div>
            <div className="bc-care-group"><h4><i className="bi bi-egg-fried" /> Nutrition</h4><ul>{guide.mom.nutrition.map((item, index) => <li key={index}>{item}</li>)}</ul></div>
            <div className="bc-care-group"><h4><i className="bi bi-flower1" /> Health & Wellness</h4><ul>{guide.mom.wellness.map((item, index) => <li key={index}>{item}</li>)}</ul></div>
            <div className="bc-care-group"><h4><i className="bi bi-chat-heart" /> Baby Bonding</h4><ul>{guide.mom.bonding.map((item, index) => <li key={index}>{item}</li>)}</ul></div>
            <div className="bc-care-group"><h4><i className="bi bi-clipboard2-pulse" /> Medical Care</h4><ul>{guide.mom.medical.map((item, index) => <li key={index}>{item}</li>)}</ul></div>
          </article>
        </div>

        <div className="bc-activities-panel">
          <div className="bc-activities-heading"><div><span className="bc-eyebrow">SMALL STEPS, LOVING MEMORIES</span><h3>Monthly Activities</h3><p>Complete these at your own pace.</p></div><div className="bc-month-progress"><strong>{monthProgress}%</strong><span>month done</span></div></div>
          <div className="bc-activity-list">
            {guide.activities.map((activity) => (
              <label key={activity} className={`bc-activity ${monthCompleted.includes(activity) ? "done" : ""}`}>
                <input type="checkbox" checked={monthCompleted.includes(activity)} onChange={() => toggleActivity(activity)} />
                <span className="bc-custom-check"><i className="bi bi-check" /></span><span>{activity}</span>
              </label>
            ))}
          </div>
          <div className="bc-activity-bar"><span style={{ width: `${monthProgress}%` }} /></div>
        </div>

        <div className="bc-tips-panel">
          <div className="bc-tips-title"><span className="bc-eyebrow">A LITTLE GUIDANCE FOR THIS MONTH</span><h3>Monthly Personalised Tips</h3></div>
          <div className="bc-tip-grid">
            <article><span className="bc-tip-icon"><i className="bi bi-bullseye" /></span><h4>What to focus on</h4><p>{guide.focus}</p></article>
            <article><span className="bc-tip-icon"><i className="bi bi-shield-check" /></span><h4>What to avoid</h4><p>{guide.avoid}</p></article>
            <article><span className="bc-tip-icon"><i className="bi bi-bell" /></span><h4>Important reminders</h4><ul>{guide.reminders.map((item, index) => <li key={index}>{item}</li>)}</ul></article>
            <article><span className="bc-tip-icon"><i className="bi bi-question-circle" /></span><h4>Ask your doctor</h4><ul>{guide.questions.map((item, index) => <li key={index}>{item}</li>)}</ul></article>
          </div>
          <div className="bc-bonding-highlight"><span><i className="bi bi-heart-fill" /></span><div><small>YOUR SPECIAL MOM & BABY MOMENT</small><h4>{guide.bondingActivity}</h4></div></div>
        </div>

        <div className="bc-month-navigation">
          <button disabled={selectedMonth === 1} onClick={() => setActiveMonth(selectedMonth - 1)}><i className="bi bi-arrow-left" /> Previous month</button>
          <button className="bc-primary-btn" onClick={() => setActiveMonth(currentMonth || 1)}>Back to my month</button>
          <button disabled={selectedMonth === 9} onClick={() => setActiveMonth(selectedMonth + 1)}>Next month <i className="bi bi-arrow-right" /></button>
        </div>
      </section>

      <section className="bc-medical-note">
        <i className="bi bi-info-circle-fill" />
        <div><h3>Important health note</h3><p>This guide is general pregnancy education, not a diagnosis or a personalised care plan. Food, activity, tests and supplements may need to be adjusted for your health, pregnancy and local clinical guidance. Follow your antenatal team's advice. Contact your maternity team promptly for bleeding, fluid leakage, severe pain, severe headache or vision changes, fever, or a concerning change or reduction in your baby's usual movements. If you feel seriously unwell or have an emergency, seek urgent local medical care.</p></div>
      </section>
    </main>
  );
}
