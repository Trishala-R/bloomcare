import React, { useMemo, useState } from "react";
import "./ParentingResources.css";

const ageGuides = [
  {
    id: "1-3",
    age: "1–3 years",
    title: "Little explorers",
    intro:
      "Build language, movement, communication and early independence through safe everyday play.",
    milestones: [
      "Uses gestures and begins combining words into short phrases",
      "Practises walking, climbing and using small objects",
      "Begins recognising familiar colours, shapes and objects",
      "Communicates needs and starts learning simple routines",
      "May show readiness for toilet learning; progress varies",
      "Names simple feelings and seeks comfort from trusted adults",
      "Practises small independent tasks such as putting toys away",
    ],
    activities: [
      "Name everyday objects together during meals and walks",
      "Sort large safe toys by colour or shape",
      "Read a short picture book and let your child point to objects",
      "Offer two simple choices to practise communication",
      "Use a predictable handwashing and bedtime routine",
    ],
    parentTip:
      "Keep activities short, playful and supervised. Children develop at different rates; celebrate effort rather than comparing milestones.",
  },
  {
    id: "4-6",
    age: "4–6 years",
    title: "Curious creators",
    intro:
      "Support school readiness, creativity, friendships and emotional vocabulary with playful practice.",
    milestones: [
      "Recognises letters, sounds and some numbers",
      "Builds early reading, counting and pattern skills",
      "Enjoys drawing, pretend play, music and creative tasks",
      "Practises sharing, turn-taking and making friends",
      "Explains needs with more detailed sentences",
      "Begins identifying feelings and calming with adult support",
      "Learns hygiene routines such as brushing teeth and washing hands",
    ],
    activities: [
      "Read a story and ask what might happen next",
      "Count steps, fruit or toys during everyday routines",
      "Draw a picture and invite your child to describe it",
      "Practise taking turns in a simple board game",
      "Use a feelings chart to name emotions",
    ],
    parentTip:
      "Use encouragement, routines and open-ended questions. Make learning active and avoid pressure around early academic skills.",
  },
  {
    id: "7-9",
    age: "7–9 years",
    title: "Growing thinkers",
    intro:
      "Encourage school learning, friendships, confidence, problem-solving and safe digital habits.",
    milestones: [
      "Develops reading fluency, writing and comprehension",
      "Builds maths, science and classroom learning skills",
      "Enjoys projects, experiments and asking how things work",
      "Forms closer friendships and learns to handle disagreements",
      "Builds confidence through practice and achievable goals",
      "Begins understanding different perspectives and emotions",
      "Practises problem-solving and age-appropriate internet safety",
    ],
    activities: [
      "Keep a small reading or nature journal",
      "Try simple supervised kitchen or garden science",
      "Plan a small task together using three steps",
      "Discuss kind ways to respond to friendship problems",
      "Review online privacy rules before using a device",
    ],
    parentTip:
      "Show interest in school and friendships without immediately solving every problem. Help your child think through possible next steps.",
  },
  {
    id: "10-12",
    age: "10–12 years",
    title: "Ready for change",
    intro:
      "Create a calm, respectful space for puberty, body changes, confidence, boundaries and growing independence.",
    milestones: [
      "May begin puberty; timing and sequence vary widely",
      "Learns about physical changes in girls and boys",
      "Can prepare for menstruation before a first period",
      "Needs clear, practical information about menstrual hygiene",
      "May experience stronger or changing emotions",
      "Develops body image, identity and confidence",
      "Needs support with boundaries, peer pressure and digital safety",
    ],
    activities: [
      "Create a private puberty question box",
      "Practise how to say no and seek help",
      "Prepare a small period-care kit if relevant",
      "Discuss respectful friendships and peer pressure",
      "Agree on family rules for privacy and online sharing",
    ],
    parentTip:
      "Talk early, calmly and without shame. Use correct body-part names, respect privacy and reassure your child that development happens at different times.",
  },
];

const activities = [
  {
    id: "a1",
    title: "Alphabet treasure hunt",
    age: "4–6 years",
    category: "Language",
    time: "10 min",
    materials: "Picture book or familiar objects",
    steps:
      "Choose one letter. Find three objects that begin with its sound, say each word slowly and draw one object.",
    skills: "Letter awareness, vocabulary and observation",
  },
  {
    id: "a2",
    title: "Count and sort",
    age: "4–6 years",
    category: "Numbers",
    time: "10 min",
    materials: "Large blocks, spoons or safe household objects",
    steps:
      "Make small groups, count each group aloud and sort objects by size or colour. Stay with your child and avoid small items for children who may mouth objects.",
    skills: "Counting, sorting and comparison",
  },
  {
    id: "a3",
    title: "Colour detective",
    age: "1–3 years",
    category: "Colours",
    time: "5 min",
    materials: "Large toys or picture cards",
    steps:
      "Name one colour and invite your child to point to a matching object. Repeat with only a few colours at a time.",
    skills: "Colour recognition, listening and language",
  },
  {
    id: "a4",
    title: "Draw a story",
    age: "4–9 years",
    category: "Creative",
    time: "15 min",
    materials: "Paper and washable crayons",
    steps:
      "Invite your child to draw a place, person or imaginary animal, then tell you a short story about the picture.",
    skills: "Creativity, fine motor skills and communication",
  },
  {
    id: "a5",
    title: "Memory match",
    age: "7–9 years",
    category: "Logic",
    time: "10 min",
    materials: "Pairs of picture cards",
    steps:
      "Place cards face down. Take turns turning over two cards and remembering where matching pictures are.",
    skills: "Memory, attention and turn-taking",
  },
  {
    id: "a6",
    title: "Floating or sinking?",
    age: "7–12 years",
    category: "Science",
    time: "15 min",
    materials: "Bowl of water and a few large household objects",
    steps:
      "Ask your child to predict what may float. Test one object at a time with adult supervision, then talk about what happened. Keep water away from young children unless an adult is within arm's reach.",
    skills: "Prediction, observation and reasoning",
  },
  {
    id: "a7",
    title: "Feelings story cards",
    age: "4–12 years",
    category: "Emotional",
    time: "10 min",
    materials: "Paper cards and crayons",
    steps:
      "Draw simple faces showing happy, sad, worried, angry and calm. Ask what might help someone feeling that way.",
    skills: "Emotional vocabulary and empathy",
  },
  {
    id: "a8",
    title: "Make a mini book",
    age: "7–12 years",
    category: "Reading & writing",
    time: "20 min",
    materials: "Folded paper and pencils",
    steps:
      "Create a four-page story with a beginning, a problem, an idea and an ending. Younger children can dictate while an adult writes.",
    skills: "Sequencing, writing and imagination",
  },
  {
    id: "a9",
    title: "Pattern builder",
    age: "4–9 years",
    category: "Numbers",
    time: "10 min",
    materials: "Large blocks or coloured paper",
    steps:
      "Make a simple repeating pattern such as red-blue-red-blue and ask your child what comes next.",
    skills: "Patterns, prediction and early maths",
  },
  {
    id: "a10",
    title: "Everyday problem solver",
    age: "7–12 years",
    category: "Logic",
    time: "10 min",
    materials: "A familiar everyday challenge",
    steps:
      "Choose a small problem, brainstorm at least two possible solutions and talk about which one is safe and practical.",
    skills: "Reasoning, decision-making and confidence",
  },
];

const quizBank = [
  {
    id: "safety",
    title: "Body safety",
    age: "All age groups · parent-led",
    questions: [
      {
        q: "If a touch or situation makes a child uncomfortable, what should they know they can do?",
        options: [
          "Stay quiet",
          "Say no, move away and tell a trusted adult",
          "Keep it a secret",
        ],
        answer: 1,
        why: "Children can say no, move to a safe place and tell a trusted adult. Keep listening calmly if they share something.",
      },
      {
        q: "Who can a child tell if the first adult does not listen?",
        options: ["Another trusted adult", "Nobody", "Only a friend"],
        answer: 0,
        why: "Keep telling safe adults until someone helps. A child is never responsible for another person's unsafe behaviour.",
      },
      {
        q: "Should a child be forced to hug or kiss someone?",
        options: [
          "Yes, always",
          "Only at family events",
          "No; their body boundaries should be respected",
        ],
        answer: 2,
        why: "Offer alternatives such as waving. Respecting a child's boundaries helps them practise consent.",
      },
    ],
  },
  {
    id: "hygiene",
    title: "Healthy habits",
    age: "4–12 years",
    questions: [
      {
        q: "When should we wash our hands?",
        options: [
          "Before eating and after using the toilet",
          "Only before sleeping",
          "Only when hands look dirty",
        ],
        answer: 0,
        why: "Wash with soap and water before eating, after using the toilet and whenever hands are dirty.",
      },
      {
        q: "How often should children brush their teeth?",
        options: ["Once a week", "Twice a day", "Only after sweets"],
        answer: 1,
        why: "Brushing twice daily with age-appropriate fluoride toothpaste supports dental health.",
      },
      {
        q: "What is a helpful everyday drink?",
        options: ["Water", "Sugary soda", "Energy drinks"],
        answer: 0,
        why: "Water is a good everyday drink. Follow individual medical or dietary advice when needed.",
      },
    ],
  },
  {
    id: "puberty",
    title: "Puberty basics",
    age: "10–12 years · parent-led",
    questions: [
      {
        q: "Do all children begin puberty at exactly the same age?",
        options: [
          "Yes",
          "No, timing varies",
          "Only during school holidays",
        ],
        answer: 1,
        why: "Puberty timing and the order of changes vary. A healthcare professional can answer individual concerns.",
      },
      {
        q: "What is menstruation?",
        options: [
          "A normal process where blood and tissue leave the uterus",
          "An illness",
          "A sign that someone did something wrong",
        ],
        answer: 0,
        why: "Menstruation is a normal body process. It is not an illness and is nothing to be ashamed of.",
      },
      {
        q: "What should a young person do if they have questions about body changes?",
        options: [
          "Feel ashamed",
          "Ask a trusted adult or healthcare professional",
          "Ignore every question",
        ],
        answer: 1,
        why: "Questions are normal. Encourage open, respectful conversations with a trusted adult or healthcare professional.",
      },
    ],
  },
  {
    id: "personal",
    title: "Personal safety",
    age: "7–12 years",
    questions: [
      {
        q: "What should you do if you become separated from your parent in a public place?",
        options: [
          "Run outside alone",
          "Ask a trusted staff member or safe adult for help",
          "Hide somewhere",
        ],
        answer: 1,
        why: "Move to a safe, visible place and ask an appropriate trusted adult for help.",
      },
      {
        q: "Should you share your home address with strangers online?",
        options: ["Yes", "Only if they ask nicely", "No"],
        answer: 2,
        why: "Personal information such as your address should be kept private.",
      },
      {
        q: "What should you do if someone online makes you uncomfortable?",
        options: [
          "Keep chatting",
          "Stop communicating and tell a trusted adult",
          "Send them more information",
        ],
        answer: 1,
        why: "Stop the interaction, save evidence if appropriate and tell a trusted adult.",
      },
    ],
  },
];

const articleData = [
  {
    id: "article-1",
    category: "Child Development",
    age: "1–6 years",
    title: "Helping children build independence",
    description:
      "Simple ways to let young children practise everyday tasks while giving them the support they need.",
    icon: "bi-stars",
    body: "Independence grows through small opportunities. Let your child choose between two suitable options, put toys away, help with simple routines and try age-appropriate tasks before stepping in.",
  },
  {
    id: "article-2",
    category: "Education",
    age: "4–12 years",
    title: "Making learning part of everyday life",
    description:
      "Turn cooking, shopping, reading and outdoor time into simple learning opportunities.",
    icon: "bi-book",
    body: "Children learn through everyday experiences. Count objects while shopping, read signs together, compare sizes and colours, ask questions and encourage your child to explain their thinking.",
  },
  {
    id: "article-3",
    category: "Behaviour",
    age: "1–12 years",
    title: "Understanding big feelings",
    description:
      "A calm approach can help children learn to recognise and manage difficult emotions.",
    icon: "bi-heart",
    body: "Name the feeling without judging it. Stay calm, set clear limits and help your child find a safe way to express what they need. After the situation settles, talk about what happened.",
  },
  {
    id: "article-4",
    category: "Safety",
    age: "All ages",
    title: "Building a family safety routine",
    description:
      "Create simple safety habits for home, school, travel, playgrounds and digital spaces.",
    icon: "bi-shield-check",
    body: "Teach children how to identify trusted adults, what information should stay private and how to ask for help. Practise emergency contacts and safe routes regularly.",
  },
  {
    id: "article-5",
    category: "Puberty",
    age: "10–12 years",
    title: "Starting puberty conversations early",
    description:
      "Open, age-appropriate conversations can make body changes feel less confusing.",
    icon: "bi-chat-heart",
    body: "Start before changes happen. Use clear language, answer the question that was asked and let your child know they can come back with more questions later.",
  },
  {
    id: "article-6",
    category: "Menstrual Health",
    age: "10–12 years",
    title: "Preparing for a first period",
    description:
      "A practical, calm guide to helping a child feel prepared for menstruation.",
    icon: "bi-droplet",
    body: "Explain what menstruation is, show how to use a sanitary pad and prepare a small period-care kit. Reassure your child that periods are a normal body process.",
  },
  {
    id: "article-7",
    category: "Emotional Wellness",
    age: "7–12 years",
    title: "Supporting confidence",
    description:
      "Help children develop confidence through effort, encouragement and realistic expectations.",
    icon: "bi-sun",
    body: "Praise effort, progress and problem-solving rather than only results. Give children opportunities to make appropriate choices and learn from small mistakes.",
  },
  {
    id: "article-8",
    category: "Parenting Tips",
    age: "All ages",
    title: "Talking so children feel heard",
    description:
      "Small changes in the way we listen can make everyday conversations more meaningful.",
    icon: "bi-people",
    body: "Give your child your attention, ask open questions and avoid rushing to solve every problem. Reflect back what you heard before offering advice.",
  },
];

const navItems = [
  ["overview", "Overview"],
  ["age-guide", "Age Guide"],
  ["learning-activities", "Learning Activities"],
  ["child-safety", "Child Safety"],
  ["puberty-education", "Puberty Education"],
  ["parent-guide", "Parent Guide"],
];

const habitGroups = [
  {
    title: "Morning & hygiene",
    items: [
      "Brush teeth",
      "Wash hands before eating",
      "Take a bath or shower as needed",
      "Wear clean clothes",
    ],
  },
  {
    title: "Food & movement",
    items: [
      "Eat a balanced meal",
      "Drink water regularly",
      "Get active through age-appropriate play",
      "Include fruits or vegetables",
    ],
  },
  {
    title: "Rest & screen habits",
    items: [
      "Follow a consistent bedtime routine",
      "Take breaks from screens",
      "Keep devices away during important family routines",
      "Spend time in offline play or conversation",
    ],
  },
];

function ParentingResources() {
  const [activeAge, setActiveAge] = useState("1-3");
  const [activityFilter, setActivityFilter] = useState("All");
  const [savedActivities, setSavedActivities] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("bloomcareSavedActivities")) || [];
    } catch {
      return [];
    }
  });

  const [activeQuiz, setActiveQuiz] = useState("safety");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const [completedHabits, setCompletedHabits] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("bloomcareHabits")) || {};
    } catch {
      return {};
    }
  });

  const [openParentTopic, setOpenParentTopic] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const currentAge = ageGuides.find((item) => item.id === activeAge);

  const categories = useMemo(
    () => ["All", ...new Set(activities.map((item) => item.category))],
    []
  );

  const filteredActivities = useMemo(() => {
    if (activityFilter === "All") return activities;

    return activities.filter(
      (item) => item.category === activityFilter
    );
  }, [activityFilter]);

  const currentQuiz =
    quizBank.find((quiz) => quiz.id === activeQuiz) || quizBank[0];

  const quizScore = currentQuiz.questions.reduce(
    (score, question, index) =>
      score + (quizAnswers[index] === question.answer ? 1 : 0),
    0
  );

  const toggleSavedActivity = (id) => {
    setSavedActivities((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];

      localStorage.setItem(
        "bloomcareSavedActivities",
        JSON.stringify(next)
      );

      return next;
    });
  };

  const selectQuiz = (id) => {
    setActiveQuiz(id);
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const submitQuiz = () => {
    setQuizSubmitted(true);
  };

  const retryQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const toggleHabit = (key) => {
    setCompletedHabits((current) => {
      const next = {
        ...current,
        [key]: !current[key],
      };

      localStorage.setItem(
        "bloomcareHabits",
        JSON.stringify(next)
      );

      return next;
    });
  };

  const resetHabits = () => {
    setCompletedHabits({});
    localStorage.removeItem("bloomcareHabits");
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const totalHabits = habitGroups.reduce(
    (total, group) => total + group.items.length,
    0
  );

  const completedHabitCount = Object.values(completedHabits).filter(
    Boolean
  ).length;

  return (
    <div className="parenting-resources">
      {/* Intro */}
      <section id="overview" className="pr-intro">
        <div className="pr-intro-copy">
          <span className="pr-eyebrow">
            <i className="bi bi-heart-fill"></i>
            BLOOMCARE PARENTING RESOURCES
          </span>

          <h2>Growing Together, One Step at a Time.</h2>

          <p>
            Practical, age-appropriate guidance for parents and caregivers
            covering child development, safety, learning, emotions, puberty
            and healthy habits.
          </p>

          <div className="pr-intro-points">
            <span>
              <i className="bi bi-check-circle-fill"></i> Ages 1–12
            </span>
            <span>
              <i className="bi bi-check-circle-fill"></i> Parent-friendly
            </span>
            <span>
              <i className="bi bi-check-circle-fill"></i> Interactive
            </span>
          </div>
        </div>

        <div className="pr-intro-art">
          <div className="pr-art-circle">
            <i className="bi bi-people-fill"></i>
          </div>
          <span className="pr-art-note">Learn • Talk • Grow</span>
          <span className="pr-art-spark">
            <i className="bi bi-stars"></i>
          </span>
        </div>
      </section>

      {/* Internal Navigation */}
      <nav className="pr-nav" aria-label="Parenting resources navigation">
        {navItems.map(([id, label], index) => (
          <button
            key={id}
            type="button"
            className={`pr-nav-link ${index === 0 ? "active" : ""}`}
            onClick={() => scrollToSection(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Age Guide */}
      <section id="age-guide" className="pr-section">
        <div className="pr-heading">
          <span className="pr-eyebrow">AGE GUIDE</span>
          <h2>Understanding Every Stage</h2>
          <p>
            Children grow and learn at different rates. Use these guides as
            practical starting points for everyday conversations and activities.
          </p>
        </div>

        <div className="pr-age-tabs">
          {ageGuides.map((guide) => (
            <button
              key={guide.id}
              type="button"
              className={activeAge === guide.id ? "active" : ""}
              onClick={() => setActiveAge(guide.id)}
            >
              {guide.age}
            </button>
          ))}
        </div>

        <div className="pr-age-panel">
          <div className="pr-age-title">
            <div className="pr-age-icon">
              <i className="bi bi-flower1"></i>
            </div>

            <div>
              <span>{currentAge.age}</span>
              <h3>{currentAge.title}</h3>
              <p>{currentAge.intro}</p>
            </div>
          </div>

          <div className="pr-two-col">
            <div>
              <h4>
                <i className="bi bi-check2-circle"></i> Development areas
              </h4>

              <ul className="pr-check-list">
                {currentAge.milestones.map((item) => (
                  <li key={item}>
                    <i className="bi bi-check-circle"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4>
                <i className="bi bi-lightbulb"></i> Try together
              </h4>

              <ul className="pr-bullet-list">
                {currentAge.activities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pr-tip">
            <i className="bi bi-heart"></i>
            <div>
              <strong>Parent tip</strong>
              <p>{currentAge.parentTip}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Activities */}
      <section id="learning-activities" className="pr-section pr-tint">
        <div className="pr-heading">
          <span className="pr-eyebrow">LEARNING ACTIVITIES</span>
          <h2>Learn Through Play</h2>
          <p>
            Simple activities that support language, numbers, creativity,
            science, memory, reading and problem-solving.
          </p>
        </div>

        <div className="pr-filter-row">
          <div className="pr-filter-buttons">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={activityFilter === category ? "active" : ""}
                onClick={() => setActivityFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <span className="pr-saved-count">
            <i className="bi bi-bookmark-heart"></i>
            {savedActivities.length} saved
          </span>
        </div>

        <div className="pr-activity-grid">
          {filteredActivities.map((activity) => {
            const saved = savedActivities.includes(activity.id);

            return (
              <article className="pr-card pr-activity-card" key={activity.id}>
                <div className="pr-card-top">
                  <span className="pr-chip">{activity.age}</span>

                  <button
                    type="button"
                    className={`pr-save-btn ${saved ? "saved" : ""}`}
                    onClick={() => toggleSavedActivity(activity.id)}
                    aria-label={
                      saved
                        ? `Remove ${activity.title} from favourites`
                        : `Save ${activity.title}`
                    }
                  >
                    <i
                      className={`bi ${
                        saved ? "bi-bookmark-heart-fill" : "bi-bookmark-heart"
                      }`}
                    ></i>
                  </button>
                </div>

                <h3>{activity.title}</h3>

                <div className="pr-meta">
                  <span>
                    <i className="bi bi-tag"></i> {activity.category}
                  </span>
                  <span>
                    <i className="bi bi-clock"></i> {activity.time}
                  </span>
                </div>

                <div className="pr-activity-info">
                  <strong>Materials</strong>
                  <p>{activity.materials}</p>

                  <strong>How to play</strong>
                  <p>{activity.steps}</p>

                  <strong>Skills</strong>
                  <p>{activity.skills}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Child Safety */}
      <section id="child-safety" className="pr-section">
        <div className="pr-heading">
          <span className="pr-eyebrow">CHILD SAFETY</span>
          <h2>Helping Children Feel Safe and Heard</h2>
          <p>
            Teach body boundaries, trusted adults, safe choices and how to ask
            for help in simple age-appropriate language.
          </p>
        </div>

        <div className="pr-safety-grid">
          <article className="pr-card pr-safety-card">
            <div className="pr-safety-icon">
              <i className="bi bi-hand-index-thumb"></i>
            </div>
            <h3>Safe & unsafe touch</h3>
            <p>
              Help children understand that they can tell a trusted adult if a
              touch or situation feels uncomfortable, confusing or unsafe.
            </p>
          </article>

          <article className="pr-card pr-safety-card">
            <div className="pr-safety-icon">
              <i className="bi bi-shield-lock"></i>
            </div>
            <h3>Body boundaries</h3>
            <p>
              Teach children that their body belongs to them and that they can
              say no to unwanted physical contact.
            </p>
          </article>

          <article className="pr-card pr-safety-card">
            <div className="pr-safety-icon">
              <i className="bi bi-person-check"></i>
            </div>
            <h3>Trusted adults</h3>
            <p>
              Help your child identify several safe adults they can approach at
              home, school and in their wider support network.
            </p>
          </article>

          <article className="pr-card pr-safety-card">
            <div className="pr-safety-icon">
              <i className="bi bi-megaphone"></i>
            </div>
            <h3>Ask for help</h3>
            <p>
              Reassure children that they should keep telling trusted adults
              until someone listens and helps them.
            </p>
          </article>
        </div>

        <div className="pr-scenario">
          <div className="pr-scenario-icon">
            <i className="bi bi-chat-square-heart"></i>
          </div>

          <div>
            <span className="pr-small-label">PRACTISE TOGETHER</span>
            <h3>What would you do?</h3>
            <p>
              Talk through simple situations without frightening your child.
              Focus on moving to safety, saying no when possible and telling a
              trusted adult.
            </p>

            <ol>
              <li>Move away from an uncomfortable situation.</li>
              <li>Find a trusted adult or safe place.</li>
              <li>Explain what happened in your own words.</li>
              <li>Keep asking for help if the first person does not listen.</li>
            </ol>
          </div>
        </div>

        <div className="pr-safety-reminder">
          <i className="bi bi-info-circle"></i>
          <p>
            Children should never be blamed for unsafe behaviour by another
            person. If you are concerned about a child's immediate safety,
            contact appropriate local emergency or child-protection services.
          </p>
        </div>

        <div className="pr-online-grid">
          <div className="pr-heading pr-heading-left">
            <span className="pr-eyebrow">ONLINE & OFFLINE SAFETY</span>
            <h2>Safety Habits for Everyday Life</h2>
          </div>

          <div className="pr-safety-grid">
            <article className="pr-card pr-safety-card">
              <h3>At home</h3>
              <p>
                Learn emergency contacts, safe exits and which household items
                need adult supervision.
              </p>
            </article>

            <article className="pr-card pr-safety-card">
              <h3>Road & playground</h3>
              <p>
                Practise road-crossing rules, staying within safe areas and
                asking a trusted adult before leaving.
              </p>
            </article>

            <article className="pr-card pr-safety-card">
              <h3>School</h3>
              <p>
                Encourage children to identify teachers and other trusted
                adults they can approach when something feels wrong.
              </p>
            </article>

            <article className="pr-card pr-safety-card">
              <h3>Internet</h3>
              <p>
                Keep personal information private, use strong privacy settings
                and tell an adult about uncomfortable messages or bullying.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Puberty */}
      <section id="puberty-education" className="pr-section pr-tint">
        <div className="pr-heading">
          <span className="pr-eyebrow">PUBERTY EDUCATION</span>
          <h2>Growing, Changing and Understanding</h2>
          <p>
            Puberty happens at different times. Calm conversations can help
            children understand changes without shame or confusion.
          </p>
        </div>

        <div className="pr-puberty-grid">
          <article className="pr-card pr-puberty-card">
            <div className="pr-puberty-symbol">
              <i className="bi bi-person-standing"></i>
            </div>

            <h3>For boys</h3>

            <p>
              Explain that puberty may involve changes such as growth, body
              hair, voice changes, sweating and changes in the reproductive
              system. Timing varies from person to person.
            </p>
          </article>

          <article className="pr-card pr-puberty-card">
            <div className="pr-puberty-symbol">
              <i className="bi bi-person-standing-dress"></i>
            </div>

            <h3>For girls</h3>

            <p>
              Explain possible changes such as breast development, body hair,
              growth, skin changes and menstruation. Reassure children that
              puberty does not happen on one fixed schedule.
            </p>
          </article>
        </div>

        <div className="pr-first-period">
          <div className="pr-period-art">
            <i className="bi bi-droplet-half"></i>
            <span>First Period Guide</span>
          </div>

          <div>
            <span className="pr-small-label">MENSTRUAL HEALTH</span>
            <h3>Preparing for a first period</h3>

            <ol>
              <li>
                <strong>What is a period?</strong> Menstruation is a normal
                process where blood and tissue leave the uterus.
              </li>

              <li>
                <strong>What can you expect?</strong> Periods may begin with
                bleeding and can come with cramps or other symptoms. Experiences
                vary.
              </li>

              <li>
                <strong>Using a pad:</strong> Open the wrapper, place the
                adhesive side into the underwear and change the pad regularly.
              </li>

              <li>
                <strong>Hygiene:</strong> Wash hands before and after changing
                a pad and dispose of used products appropriately.
              </li>

              <li>
                <strong>Be prepared:</strong> Keep a small period-care kit with
                pads, spare underwear and a bag for carrying supplies.
              </li>
            </ol>
          </div>
        </div>

        <div className="pr-health-note">
          <i className="bi bi-heart-pulse"></i>
          <p>
            Puberty can bring questions and strong emotions. Encourage children
            to ask questions and seek guidance from a trusted adult or
            healthcare professional when something concerns them.
          </p>
        </div>
      </section>

      {/* Parent Guide */}
      <section id="parent-guide" className="pr-section">
        <div className="pr-heading">
          <span className="pr-eyebrow">PARENT GUIDE</span>
          <h2>Practical Support for Parents</h2>
          <p>
            Use simple conversations and consistent support to help children
            develop confidence, independence and emotional skills.
          </p>
        </div>

        <div className="pr-parent-layout">
          <div className="pr-parent-accordion">
            {[
              {
                title: "Communication",
                text: "Listen without immediately interrupting or fixing the problem. Ask open questions and let your child know that questions are welcome.",
              },
              {
                title: "School support",
                text: "Ask what your child enjoyed, found difficult or wants help with. Work with teachers when concerns continue.",
              },
              {
                title: "Confidence & independence",
                text: "Give children age-appropriate choices and responsibilities. Praise effort, practice and problem-solving rather than perfection.",
              },
              {
                title: "Friendship & bullying",
                text: "Take concerns seriously, listen calmly and work with the school or appropriate adults when repeated bullying or safety concerns arise.",
              },
              {
                title: "Emotional development",
                text: "Name feelings, set clear limits and help children practise safe ways to calm down and communicate what they need.",
              },
              {
                title: "Puberty & menstruation",
                text: "Start conversations early and answer questions honestly using age-appropriate language. Respect privacy and avoid shame.",
              },
            ].map((item, index) => (
              <div className="pr-parent-item" key={item.title}>
                <button
                  type="button"
                  onClick={() =>
                    setOpenParentTopic(
                      openParentTopic === index ? -1 : index
                    )
                  }
                >
                  {item.title}
                  <i
                    className={`bi ${
                      openParentTopic === index
                        ? "bi-chevron-up"
                        : "bi-chevron-down"
                    }`}
                  ></i>
                </button>

                {openParentTopic === index && <p>{item.text}</p>}
              </div>
            ))}
          </div>

          <div className="pr-conversation">
            <i className="bi bi-chat-heart"></i>

            <h3>Try this conversation</h3>

            <p>
              “You can always come to me if something feels confusing,
              uncomfortable or worrying. You won't be in trouble for telling me
              what happened.”
            </p>

            <div className="pr-conversation-tip">
              <i className="bi bi-lightbulb"></i>
              <span>
                Keep your tone calm so your child feels safe to continue
                talking.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quizzes */}
      <section className="pr-section pr-tint">
        <div className="pr-heading">
          <span className="pr-eyebrow">INTERACTIVE QUIZZES</span>
          <h2>Learn, Answer and Check</h2>
          <p>
            Short parent-led quizzes covering safety, hygiene, puberty and
            healthy habits.
          </p>
        </div>

        <div className="pr-quiz-shell">
          <aside className="pr-quiz-sidebar">
            <span className="pr-small-label">QUIZ TOPICS</span>

            {quizBank.map((quiz) => (
              <button
                key={quiz.id}
                type="button"
                className={activeQuiz === quiz.id ? "active" : ""}
                onClick={() => selectQuiz(quiz.id)}
              >
                {quiz.title}
                <small>{quiz.age}</small>
              </button>
            ))}
          </aside>

          <div className="pr-quiz-content">
            <div className="pr-quiz-header">
              <div>
                <span className="pr-small-label">PARENT-LED QUIZ</span>
                <h3>{currentQuiz.title}</h3>
              </div>

              <span className="pr-question-count">
                {currentQuiz.questions.length} questions
              </span>
            </div>

            {currentQuiz.questions.map((question, index) => (
              <div className="pr-question" key={question.q}>
                <h4>
                  {index + 1}. {question.q}
                </h4>

                <div className="pr-options">
                  {question.options.map((option, optionIndex) => (
                    <label key={option}>
                      <input
                        type="radio"
                        name={`quiz-${currentQuiz.id}-${index}`}
                        checked={quizAnswers[index] === optionIndex}
                        onChange={() =>
                          setQuizAnswers((current) => ({
                            ...current,
                            [index]: optionIndex,
                          }))
                        }
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>

                {quizSubmitted && (
                  <div
                    className={`pr-answer-feedback ${
                      quizAnswers[index] === question.answer
                        ? "correct"
                        : "incorrect"
                    }`}
                  >
                    <strong>
                      {quizAnswers[index] === question.answer
                        ? "Correct!"
                        : "Not quite"}
                    </strong>

                    <p>{question.why}</p>
                  </div>
                )}
              </div>
            ))}

            <div className="pr-quiz-actions">
              {!quizSubmitted ? (
                <button
                  type="button"
                  className="pr-primary-btn"
                  onClick={submitQuiz}
                  disabled={
                    Object.keys(quizAnswers).length !==
                    currentQuiz.questions.length
                  }
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  type="button"
                  className="pr-primary-btn"
                  onClick={retryQuiz}
                >
                  Retry Quiz
                </button>
              )}

              {quizSubmitted && (
                <div className="pr-score">
                  <strong>
                    {quizScore}/{currentQuiz.questions.length}
                  </strong>
                  <span>Your score</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Healthy Habits */}
      <section className="pr-section">
        <div className="pr-heading">
          <span className="pr-eyebrow">HEALTHY HABITS</span>
          <h2>A Simple Daily Checklist</h2>
          <p>
            Use the checklist as a gentle routine guide. Adjust it for your
            child's age and individual needs.
          </p>
        </div>

        <div className="pr-habit-progress">
          <strong>
            {completedHabitCount}/{totalHabits} completed
          </strong>

          <div>
            <span
              style={{
                width: `${(completedHabitCount / totalHabits) * 100}%`,
              }}
            ></span>
          </div>

          <button type="button" onClick={resetHabits}>
            Reset
          </button>
        </div>

        <div className="pr-habit-grid">
          {habitGroups.map((group) => (
            <article className="pr-card pr-habit-card" key={group.title}>
              <h3>{group.title}</h3>

              {group.items.map((item) => {
                const key = `${group.title}-${item}`;

                return (
                  <label
                    key={key}
                    className={completedHabits[key] ? "done" : ""}
                  >
                    <input
                      type="checkbox"
                      checked={Boolean(completedHabits[key])}
                      onChange={() => toggleHabit(key)}
                    />

                    <span>{item}</span>
                  </label>
                );
              })}
            </article>
          ))}
        </div>
      </section>

      {/* Articles */}
      <section className="pr-section pr-tint" id="parenting-articles">
        <div className="pr-heading">
          <span className="pr-eyebrow">GROWING TOGETHER</span>
          <h2>Parenting Insights</h2>
          <p>
            Helpful reads on development, education, behaviour, safety, puberty
            and everyday parenting.
          </p>
        </div>

        <div className="pr-article-grid">
          {articleData.map((article) => (
            <article className="pr-card pr-article-card" key={article.id}>
              <div className="pr-article-visual">
                <i className={`bi ${article.icon}`}></i>
              </div>

              <div className="pr-article-body">
                <div className="pr-article-meta">
                  <span>{article.category}</span>
                  <span>{article.age}</span>
                </div>

                <h3>{article.title}</h3>

                <p>{article.description}</p>

                <button
                  type="button"
                  onClick={() => setSelectedArticle(article)}
                >
                  Read more
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <div className="pr-disclaimer">
        <i className="bi bi-info-circle"></i>

        <p>
          BloomCare Parenting Resources are intended for general educational
          information and do not replace personalised medical, developmental or
          professional advice. If you have concerns about a child's health,
          development or safety, speak with an appropriate qualified
          professional.
        </p>
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div
          className="pr-modal-backdrop"
          onClick={() => setSelectedArticle(null)}
        >
          <article
            className="pr-article-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="pr-modal-close"
              onClick={() => setSelectedArticle(null)}
              aria-label="Close article"
            >
              <i className="bi bi-x-lg"></i>
            </button>

            <span className="pr-small-label">
              {selectedArticle.category}
            </span>

            <h2>{selectedArticle.title}</h2>

            <p>{selectedArticle.body}</p>

            <button
              type="button"
              className="pr-primary-btn"
              onClick={() => setSelectedArticle(null)}
            >
              Close
            </button>
          </article>
        </div>
      )}
    </div>
  );
}

export default ParentingResources;