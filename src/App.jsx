import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import WomensHealth from "./WomensHealth";
import Pregnancy from "./Pregnancy";
import BabyCare from "./BabyCare";
import ParentingResources from "./ParentingResources";
import IntimateWellness from "./IntimateWellness";
import ConsultDoctor from "./ConsultDoctor";
import Login from "./Login";
import Register from "./Register";

const journeyCards = [
  {
    icon: "bi-calendar-heart",
    title: "Track My Periods",
    text: ["Menstrual cycle tracking.", "Period predictions.", "Ovulation estimates.", "Symptoms and mood tracking."],
    button: "Explore Period Tracking"
  },
  {
    icon: "bi-heart-pulse",
    title: "Trying to Conceive",
    text: ["Fertility window information.", "Ovulation tracking.", "Cycle insights.", "Preconception guidance."],
    button: "Explore Fertility"
  },
  {
    icon: "bi-person-hearts",
    title: "I'm Pregnant",
    text: ["Pregnancy week tracking.", "Estimated due date.", "Baby development updates.", "Pregnancy wellness info."],
    button: "Explore Pregnancy"
  },
  {
    icon: "bi-balloon-heart",
    title: "My Baby's Growth",
    text: ["Baby growth from birth to 2 years.", "Developmental milestones.", "Parenting tips.", "Learning activities."],
    button: "Explore Baby Care"
  },
  {
    icon: "bi-person-badge",
    title: "Consult a Gynaecologist",
    text: ["Doctor consultations.", "Chat, audio & video options.", "Find nearby doctors.", "Appointment booking."],
    button: "Find a Doctor"
  }
];

const articles = [
  ["https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80", "10 Tips for a Healthy Pregnancy", "Simple everyday guidance for a comfortable pregnancy journey."],
  ["https://images.unsplash.com/photo-1607453998774-d533f65dac99?auto=format&fit=crop&w=700&q=80", "Baby Sleep Tips for New Moms", "Helpful ideas for building gentle sleep routines."],
  ["https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=700&q=80", "Nutrition Guide During Pregnancy", "Understand balanced meals and everyday nutrition."],
  ["https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=700&q=80", "Understanding Baby Milestones", "A simple look at development from newborn to toddler."],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showWomensHealth, setShowWomensHealth] = useState(false);
  const [showPregnancy, setShowPregnancy] = useState(false);
  const [showBabyCare, setShowBabyCare] = useState(false);
  const [showParentingResources, setShowParentingResources] = useState(false);
  const [showIntimateWellness, setShowIntimateWellness] = useState(false);
  const [showConsultDoctor, setShowConsultDoctor] = useState(false);
  const [authPage, setAuthPage] = useState("home");
const [currentUser, setCurrentUser] = useState(null);
  const closeMenu = () => setMenuOpen(false);

  const submitContact = (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity()) {
      setSubmitted(true);
      e.currentTarget.reset();
    } else {
      e.currentTarget.classList.add("was-validated");
    }
  };

  const handleAuthSuccess = (user) => {
  setCurrentUser(user);
  setAuthPage("dashboard");
};

  
if (showPregnancy) {
  return (
    <>
      <button
        onClick={() => setShowPregnancy(false)}
        style={{
          position: "fixed",
          top: "15px",
          left: "15px",
          zIndex: 1000,
          padding: "8px 16px",
          borderRadius: "20px",
          border: "1px solid #e8cbd3",
          background: "white",
          color: "#b95f79",
          cursor: "pointer"
        }}
      >
        ← Back to Homepage
      </button>

      <Pregnancy />
    </>
  );
}

if (showWomensHealth) {
  return (
    <>
      <button
        onClick={() => setShowWomensHealth(false)}
        style={{
          position: "fixed",
          top: "15px",
          left: "15px",
          zIndex: 1000,
          padding: "8px 16px",
          borderRadius: "20px",
          border: "1px solid #e8cbd3",
          background: "white",
          color: "#b95f79",
          cursor: "pointer"
        }}
      >
        ← Back to Homepage
      </button>

      <WomensHealth />
    </>
  );
}

if (showBabyCare) {
  return (
    <>
      <button
        onClick={() => setShowBabyCare(false)}
        style={{
          position: "fixed",
          top: "15px",
          left: "15px",
          zIndex: 1000,
          padding: "8px 16px",
          borderRadius: "20px",
          border: "1px solid #e8cbd3",
          background: "white",
          color: "#b95f79",
          cursor: "pointer"
        }}
      >
        ← Back to Homepage
      </button>

      <BabyCare />
    </>
  );
}
if (showParentingResources) {
  return (
    <>
      <button
        onClick={() => setShowParentingResources(false)}
        style={{
          position: "fixed",
          top: "15px",
          left: "15px",
          zIndex: 1000,
          padding: "8px 16px",
          borderRadius: "20px",
          border: "1px solid #e8cbd3",
          background: "white",
          color: "#b95f79",
          cursor: "pointer"
        }}
      >
        ← Back to Homepage
      </button>

      <ParentingResources />
    </>
  );
}

if (showIntimateWellness) {
  return (
    <>
      <button
        onClick={() => setShowIntimateWellness(false)}
        style={{
          position: "fixed",
          top: "15px",
          left: "15px",
          zIndex: 1000,
          padding: "8px 16px",
          borderRadius: "20px",
          border: "1px solid #e8cbd3",
          background: "white",
          color: "#b95f79",
          cursor: "pointer"
        }}
      >
        ← Back to Homepage
      </button>

      <IntimateWellness />
    </>
  );
}

if (showConsultDoctor) {
  return (
    <>
      <button
        onClick={() => setShowConsultDoctor(false)}
        style={{
          position: "fixed",
          top: "15px",
          left: "15px",
          zIndex: 1000,
          padding: "8px 16px",
          borderRadius: "20px",
          border: "1px solid #e8cbd3",
          background: "white",
          color: "#b95f79",
          cursor: "pointer"
        }}
      >
        ← Back to Homepage
      </button>

      <ConsultDoctor />
    </>
  );
}

if (authPage === "login") {
  return (
    <Login
      onNavigate={setAuthPage}
      onSuccess={handleAuthSuccess}
    />
  );
}

if (authPage === "register") {
  return (
    <Register
      onNavigate={setAuthPage}
      onSuccess={handleAuthSuccess}
    />
  );
}

if (authPage === "dashboard") {
  const journeyMessages = {
    period: "Your Period Tracking journey starts here.",
    conceive: "Your fertility and conception journey starts here.",
    pregnant: "Your Pregnancy journey starts here.",
    baby: "Your Baby Growth journey starts here.",
    wellness: "Explore your Women's Health and Wellness journey."
  };

  return (
    <div className="container py-5">
      <h1>Welcome to BloomCare, {currentUser?.fullName}!</h1>

      <h3>{currentUser?.journeyTitle}</h3>

      <p>
        {journeyMessages[currentUser?.journey] ||
          "Welcome to your personalized BloomCare dashboard."}
      </p>

      <button
        className="btn btn-primary"
        onClick={() => setAuthPage("home")}
      >
        Explore BloomCare
      </button>
    </div>
  );
}

  return (

    <div className="bloomcare">
      <header className="bloom-header fixed-top">
        <div className="brand-row">
          <div className="container d-flex align-items-center justify-content-between">
            <a className="navbar-brand brand brand-text-only" href="#home" onClick={closeMenu}>BloomCare</a>
            <div className="nav-actions">
  <a
    href="#login"
    className="btn btn-login"
    onClick={(e) => {
      e.preventDefault();
      setAuthPage("login");
    }}
  >
    Login
  </a>

  <a
    href="#register"
    className="btn btn-register"
    onClick={(e) => {
      e.preventDefault();
      setAuthPage("register");
    }}
  >
    Register
  </a>
</div>
          </div>
        </div>
        <nav className="main-nav">
          <div className="container">
            <button
              className="navbar-toggler mobile-nav-toggle"
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="navbar-toggler-icon"></span>
              <span className="mobile-nav-label">Menu</span>
            </button>
            <div className={`main-nav-links ${menuOpen ? "show" : ""}`}>
              
{[
  ["Home", "#home"],
  ["About", "#about"],
  ["Women's Health", "#women-health"],
  ["Pregnancy", "#pregnancy"],
  ["Baby Care", "#baby-care"],
  ["Intimate Products", "#intimate-products"],
  ["Consult a Doctor", "#consult-doctor"]
].map(([label, href]) => (
  <a
    className="main-nav-link"
    href={href}
    key={label}
    onClick={(e) => {
      closeMenu();

      if (label === "Women's Health") {
        e.preventDefault();
        setShowWomensHealth(true);
      } else if (label === "Pregnancy") {
        e.preventDefault();
        setShowPregnancy(true);
      } else if (label === "Baby Care") {
        e.preventDefault();
        setShowBabyCare(true);
      } else if (label === "Intimate Products") {
        e.preventDefault();
        setShowIntimateWellness(true);
      } else if (label === "Consult a Doctor") {
        e.preventDefault();
        setShowConsultDoctor(true);
      }
    }}
  >
    {label}
  </a>
))}

            </div>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-petal petal-one"></div>
          <div className="hero-petal petal-two"></div>
          <div className="container position-relative">
            <div className="row align-items-center g-5">
              <div className="col-lg-6 hero-copy">
                <span className="eyebrow">YOUR WELLNESS COMPANION</span>
                <h1>Every Stage of Her Journey,<br />Every Step of Their Growth.</h1>
                <p>Your trusted companion for women's health, menstrual wellness, fertility, pregnancy, motherhood and your little one's development.</p>
                <div className="d-flex flex-wrap gap-3">
                  <a href="#journey" className="btn btn-primary-soft">Explore BloomCare <i className="bi bi-arrow-right"></i></a>
                  <a href="#subscription" className="btn btn-outline-soft">Get Started</a>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="hero-image-wrap">
                  <img src="/images/home image.webp"alt="Mother and child"/>
                  <div className="hero-heart"><i className="bi bi-heart-fill"></i></div>
                  <div className="hero-sparkle">✦</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-5">
                <div className="rounded-photo">
                  <img src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1000&q=85" alt="Expecting mother" />
                </div>
              </div>
              <div className="col-lg-7">
                <div className="about-panel">
                  <span className="eyebrow">ABOUT BLOOMCARE</span>
                  <h2>Your Journey. Your Health. Your Little One.</h2>
                  <p>BloomCare brings women's wellness, pregnancy guidance and baby development resources together in one place. Whether you're understanding your menstrual cycle, planning a pregnancy, expecting a baby or raising a little one, we're here to support your journey.</p>
                  <div className="mini-highlights">
                    <div><span><i className="bi bi-flower1"></i></span><strong>Women's<br/>Wellness</strong></div>
                    <div><span><i className="bi bi-heart-pulse"></i></span><strong>Pregnancy<br/>Support</strong></div>
                    <div><span><i className="bi bi-emoji-smile"></i></span><strong>Baby<br/>Development</strong></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        
<section id="journey" className="section journey-section">
  <div className="container">

    <div className="section-heading text-center">
      <span className="eyebrow">FIND YOUR STAGE</span>
      <h2>Where Are You in Your Journey?</h2>
      <p>
        Choose the stage that describes you, and discover the
        support and tools available for you.
      </p>
    </div>

    <div className="row g-3 journey-grid">
      {journeyCards.map((card) => (
        <div
          className="col-xl col-lg-4 col-md-6"
          key={card.title}
        >
          <div className="journey-card h-100">

            <div className="journey-icon">
              <i className={`bi ${card.icon}`}></i>
            </div>

            <h3>{card.title}</h3>

            <ul>
              {card.text.map((item) => (
                <li key={item}>
                  <i className="bi bi-check2"></i>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="small-pill"
              onClick={(e) => {
                e.preventDefault();

                if (card.title === "Track My Periods") {
                  setShowWomensHealth(true);
                } else if (card.title === "Trying to Conceive") {
                  setShowWomensHealth(true);
                } else if (card.title === "I'm Pregnant") {
                  setShowPregnancy(true);
                } else if (card.title === "My Baby's Growth") {
                  setShowBabyCare(true);
                } else if (card.title === "Consult a Gynaecologist") {
                  setShowConsultDoctor(true);
                }
              }}
            >
              {card.button}
              <i className="bi bi-arrow-right"></i>
            </a>

          </div>
        </div>
      ))}
    </div>

  </div>
</section>


        <section id="women-health" className="section health-section">
          <div className="container">
            <div className="health-panel">
              <div className="row align-items-center g-4">
                <div className="col-lg-6">
                  <span className="eyebrow">WOMEN'S HEALTH</span>
                  <h2>Understand Your Body.<br />Take Charge of Your Health.</h2>
                  <p>Explore tools that help you understand your menstrual cycle, recognize patterns and learn more about your reproductive health.</p>
                  <div className="health-features">
                    {["Period Tracker", "Ovulation Tracker", "Fertility Window", "Trying to Conceive", "Symptoms & Mood Journal", "Menstrual Health Education"].map(x =>
                      <span key={x}><i className="bi bi-check-circle-fill"></i>{x}</span>
                    )}
                  </div>
                  <button type="button" className="btn btn-primary-soft mt-3" onClick={() => setShowWomensHealth(true)} >Explore Women's Health <i className="bi bi-arrow-right"></i> </button>
                </div>
                <div className="col-lg-6">
                  <div className="tracker-preview">
                    <div className="tracker-top">
                      <span>Your Period</span><strong>10 Days</strong>
                    </div>
                    <div className="calendar">
                      <div className="cal-head"><b>May 2026</b><span>♡</span></div>
                      <div className="week">{["S","M","T","W","T","F","S"].map((x,i)=><span key={i}>{x}</span>)}</div>
                      <div className="days">
                        {Array.from({length: 35}, (_,i) => <span key={i} className={i === 12 || i === 13 || i === 14 ? "period-day" : i === 19 ? "today" : ""}>{i < 3 ? "" : ((i - 2) % 31) + 1}</span>)}
                      </div>
                    </div>
                    <div className="tracker-bottom"><span><i className="bi bi-droplet-fill"></i> Period</span><span><i className="bi bi-heart-fill"></i> Fertile window</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pregnancy" className="section pregnancy-section">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-5 order-lg-2">
                <div className="pregnancy-photo">
                  <img src="/images/pregnancy image.avif" alt="Pregnancy wellness" />
                </div>
              </div>
              <div className="col-lg-7 order-lg-1">
                <span className="eyebrow">PREGNANCY JOURNEY</span>
                <h2>Every Week, A New Little Milestone.</h2>
                <p>Follow your pregnancy journey and discover how your baby grows and develops week by week.</p>
                <div className="milestone-row">
                  {["Week Tracker", "Due Date", "Baby Size", "Nutrition", "Wellness"].map((x, i) =>
                    <div key={x}><span>{["12","♥","8","♡","✦"][i]}</span><small>{x}</small></div>
                  )}
                </div>
                <button className="btn btn-primary-soft"
                onClick={() => setShowPregnancy(true)}
                >
                  Explore Pregnancy <i className="bi bi-arrow-right"></i>
              </button>
              </div>
            </div>
          </div>
        </section>

        <section id="baby-care" className="section baby-section">
  <div className="container">
    <div className="section-heading text-center">
      <span className="eyebrow">BABY DEVELOPMENT</span>
      <h2>Little Steps. Big Milestones.</h2>
      <p>Follow your baby's growth from newborn days to the exciting second birthday.</p>
    </div>

    <div className="age-track">
      {["Newborn", "1–3 months", "4–6 months", "7–12 months", "13–18 months", "19–24 months"].map((age, i) => (
        <div className={`age-item ${i === 0 ? "active" : ""}`} key={age}>
          <div className="age-circle">
            <i className={["bi bi-stars", "bi bi-balloon-heart", "bi bi-emoji-smile", "bi bi-person-walking", "bi bi-rocket-takeoff", "bi bi-trophy"][i]}></i>
          </div>
          <strong>{age}</strong>
          <small>{["Getting started", "Growing", "Exploring", "Learning", "Discovering", "Growing strong"][i]}</small>
        </div>
      ))}
    </div>

    <div className="baby-info">
      {["Physical development", "Brain development", "Motor skills", "Communication", "Feeding & nutrition", "Sleep & childcare", "Learning activities"].map(x => (
        <span key={x}>
          <i className="bi bi-heart-fill"></i>{x}
        </span>
      ))}
    </div>

    <div className="text-center mt-4">
      <button
        className="btn btn-primary-soft"
        onClick={() => setShowBabyCare(true)}
      >
        Explore Baby Development <i className="bi bi-arrow-right"></i>
      </button>
    </div>

  </div>
</section>

        <section className="section safety-section">
          <div className="container">
            <div className="safety-card">
              <div className="row align-items-center g-4">
                <div className="col-lg-7">
                  <span className="eyebrow">PARENTING & CHILD SAFETY</span>
                  <h2>Growing Up With Knowledge and Confidence.</h2>
                  <p>Friendly, age-appropriate educational resources for parents and children.</p>
                  <div className="safety-list">
                    {["Good touch & bad touch awareness", "Personal boundaries", "Body safety education", "Puberty & first-period awareness", "Menstrual hygiene", "Safe and unsafe situations"].map(x => <span key={x}><i className="bi bi-shield-check"></i>{x}</span>)}
                  </div>
                  <button className="btn btn-outline-soft mt-3" onClick={() => setShowParentingResources(true)} >
                        Explore Parenting Resources
                  </button>
                </div>
                <div className="col-lg-5">
                  <div className="safety-illustration"><i className="bi bi-shield-heart-fill"></i><span>Learn • Talk • Stay Safe</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="intimate-products" className="section intimate-section">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-7">
                <span className="eyebrow">INTIMATE WELLNESS</span>
                <h2>Thoughtful Care for Your Intimate Wellness.</h2>
                <p>Explore thoughtfully selected intimate-care essentials and educational resources designed to support everyday comfort, hygiene and confidence.</p>
                <div className="intimate-points">
                  <span><i className="bi bi-check-circle-fill"></i> Everyday intimate hygiene</span>
                  <span><i className="bi bi-check-circle-fill"></i> Period care essentials</span>
                  <span><i className="bi bi-check-circle-fill"></i> Gentle personal-care guidance</span>
                  <span><i className="bi bi-check-circle-fill"></i> Educational wellness resources</span>
                </div>
                <button className="btn btn-primary-soft mt-3" onClick={() => setShowIntimateWellness(true)} >
                  Explore Intimate Wellness
                  <i className="bi bi-arrow-right"></i>
                  </button>
              </div>
              <div className="col-lg-5">
                <div className="intimate-art">
                  <i className="bi bi-flower2"></i>
                  <span>Care • Comfort • Confidence</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="doctor" className="section doctor-section">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-5">
                <div className="doctor-photo">
                  <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=85" alt="Healthcare professional" />
                </div>
              </div>
              <div className="col-lg-7">
                <span className="eyebrow">EXPERT CARE</span>
                <h2>Expert Care, Just a Step Away.</h2>
                <p>Get access to women's healthcare information and explore consultation options with qualified gynaecologists.</p>
                <div className="consult-options">
                  {[
                    ["bi-chat-heart", "Chat Consultation"],
                    ["bi-mic", "Audio Consultation"],
                    ["bi-camera-video", "Video Consultation"]
                  ].map(([icon,title]) => <div key={title}><i className={`bi ${icon}`}></i><span>{title}</span></div>)}
                </div>
                <div className="doctor-meta"><span> Doctor profiles</span><span> Qualifications & experience</span><span> Find nearby doctors</span><span>✓ Book appointments</span></div>
                <button
  type="button"
  className="btn btn-primary-soft"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowConsultDoctor(true);
  }}
>
  Consult a Doctor <i className="bi bi-arrow-right"></i>
</button>
              </div>
            </div>
          </div>
        </section>

        <section id="articles" className="section articles-section">
          <div className="container">
            <div className="d-flex flex-wrap justify-content-between align-items-end mb-4">
              <div><span className="eyebrow">DAILY INSIGHTS</span><h2>A Little Knowledge Every Day.</h2><p>Helpful tips, easy guides and practical education.</p></div>
              <a href="#contact" className="view-all">View All Articles <i className="bi bi-arrow-right"></i></a>
            </div>
            <div className="article-scroller">
              {articles.map(([img,title,desc]) => <article className="article-card" key={title}>
                <img src={img} alt="" />
                <div><span className="article-tag">BloomCare Guide</span><h3>{title}</h3><p>{desc}</p><a href="#contact">Read More <i className="bi bi-arrow-right"></i></a></div>
              </article>)}
            </div>
          </div>
        </section>

        <section className="section assistant-section">
          <div className="container">
            <div className="assistant-card">
              <div className="row align-items-center g-4">
                <div className="col-lg-8">
                  <span className="eyebrow">BLOOMCARE AI ASSISTANT</span>
                  <h2>Questions About Your Journey?<br />We're Here to Help.</h2>
                  <p>Explore answers to general questions about menstrual health, fertility, pregnancy and baby development.</p>
                  <div className="sample-questions"><span>“How can I track my cycle?”</span><span>“What happens in week 20?”</span><span>“What are baby milestones?”</span></div>
                  <a href="#contact" className="btn btn-primary-soft">Start Chatting <i className="bi bi-arrow-right"></i></a>
                  <small className="disclaimer-note">Educational assistance only — not a replacement for professional medical advice.</small>
                </div>
                <div className="col-lg-4">
                  <div className="bot"><div className="bot-face"><i className="bi bi-robot"></i></div><div className="bot-bubble">How can I help you? ♡</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="subscription" className="section subscription-section">
          <div className="container">
            <div className="section-heading text-center"><span className="eyebrow">MEMBERSHIP</span><h2>Choose the Support That Suits You.</h2><p>Start with the essentials or unlock more personalized educational support.</p></div>
            <div className="row justify-content-center g-4">
              <div className="col-lg-5"><div className="plan-card"><span className="plan-label">FREE</span><h3>BloomCare Free</h3><div className="price">₹0 <small>/ forever</small></div><ul>{["Basic period tracking","Cycle predictions","Pregnancy education","Baby development articles","Basic health resources"].map(x => <li key={x}><i className="bi bi-check-circle-fill"></i>{x}</li>)}</ul><a href="#contact" className="btn btn-outline-soft w-100">Get Started</a></div></div>
              <div className="col-lg-5"><div className="plan-card premium"><span className="plan-label">PREMIUM</span><h3>BloomCare Plus</h3><div className="price">₹— <small>/ month</small></div><ul>{["Extended cycle history","Additional tracking insights","Personalized educational content","Premium articles","Additional pregnancy & baby resources"].map(x => <li key={x}><i className="bi bi-check-circle-fill"></i>{x}</li>)}</ul><a href="#contact" className="btn btn-primary-soft w-100">Subscribe</a></div></div>
            </div>
          </div>
        </section>

        <section className="section testimonials-section">
          <div className="container">
            <div className="section-heading text-center"><span className="eyebrow">OUR COMMUNITY</span><h2>A Platform for Every Stage of Motherhood.</h2><p>Sample testimonials shown for design purposes until genuine testimonials are available.</p></div>
            <div className="row g-4">
              {[
                ["Priya S.", "“BloomCare feels so simple and comforting. I can find the information I need without feeling overwhelmed.”"],
                ["Anonymous", "“The pregnancy and baby development sections make it easier to understand each new milestone.”"],
                ["Meera K.", "“I love that women's wellness, parenting and baby resources are brought together in one place.”"]
              ].map(([name,text]) => <div className="col-md-4" key={name}><div className="testimonial"><div className="stars">★★★★★</div><p>{text}</p><strong>— {name}</strong><small>Sample testimonial</small></div></div>)}
            </div>
          </div>
        </section>

        <section className="section faq-section">
          <div className="container">
            <div className="section-heading text-center"><span className="eyebrow">NEED TO KNOW</span><h2>Frequently Asked Questions</h2><p>Find answers to common questions about BloomCare.</p></div>
            <div className="accordion faq" id="faq">
              {[
                ["q1","What is BloomCare?","BloomCare is a women's wellness, pregnancy and baby development platform designed to bring educational resources and helpful tools together."],
                ["q2","How does period tracking work?","The homepage preview introduces cycle tracking. Full personal calculations can be implemented in a later development phase."],
                ["q3","Can I track my ovulation?","Yes, ovulation tracking is planned as part of the women's health experience."],
                ["q4","How does pregnancy tracking work?","The planned experience includes pregnancy week tracking, due-date information and baby development updates."],
                ["q5","Can I track my baby's development?","Yes. BloomCare includes age-based development and milestone resources from newborn through 24 months."],
                ["q6","Can I consult a gynaecologist?","The homepage provides a visual consultation interface. Real booking and consultation functionality can be added later."],
                ["q7","Is BloomCare free to use?","A free plan is included, with additional premium educational resources planned."]
              ].map(([id,q,a],i) => <div className="accordion-item" key={id}><h2 className="accordion-header"><button className={`accordion-button ${i ? "collapsed" : ""}`} type="button" data-bs-toggle="collapse" data-bs-target={`#${id}`}>{q}</button></h2><div id={id} className={`accordion-collapse collapse ${i === 0 ? "show" : ""}`} data-bs-parent="#faq"><div className="accordion-body">{a}</div></div></div>)}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-5">
                <span className="eyebrow">CONTACT US</span>
                <h2>We'd Love to Hear From You.</h2>
                <p>We're here to support you on your journey. Send us a message and our team can get back to you.</p>
                <div className="contact-details">
                  <div><i className="bi bi-envelope"></i><span><strong>Email</strong>trishalar2204@gmail.com</span></div>
                  <div><i className="bi bi-headset"></i><span><strong>Support</strong>Mon–Sat, 9 AM–6 PM</span></div>
                  <div><i className="bi bi-geo-alt"></i><span><strong>Location</strong>India</span></div>
                </div>
              </div>
              <div className="col-lg-7">
                <form className="contact-form needs-validation" noValidate onSubmit={submitContact}>
                  <div className="row g-3">
                    <div className="col-md-6"><label>Full Name</label><input className="form-control" required placeholder="Your name" /><div className="invalid-feedback">Please enter your name.</div></div>
                    <div className="col-md-6"><label>Email Address</label><input type="email" className="form-control" required placeholder="you@example.com" /><div className="invalid-feedback">Please enter a valid email.</div></div>
                    <div className="col-12"><label>Subject</label><input className="form-control" required placeholder="How can we help?" /><div className="invalid-feedback">Please add a subject.</div></div>
                    <div className="col-12"><label>Message</label><textarea className="form-control" rows="5" required placeholder="Write your message..."></textarea><div className="invalid-feedback">Please enter your message.</div></div>
                    <div className="col-12 d-flex justify-content-between align-items-center flex-wrap gap-3"><button className="btn btn-primary-soft" type="submit">Send Message <i className="bi bi-arrow-right"></i></button>{submitted && <span className="success-message"><i className="bi bi-check-circle-fill"></i> Message ready to send.</span>}</div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4"><div className="brand footer-brand"><span className="brand-flower"><i className="bi bi-flower1"></i></span>BloomCare</div><p>Healthy Women. Happy Families.</p><small>Educational resources for women's health, pregnancy, parenting and baby development.</small></div>
            <div className="col-6 col-lg-2"><h4>Quick Links</h4><a href="#home">Home</a><a href="#about">About Us</a><a href="#women-health">Women's Health</a><a href="#pregnancy">Pregnancy</a><a href="#baby-care">Baby Care</a><a href="#intimate-products">Intimate Products</a><a href="#doctor">Consult a Doctor</a><a href="#subscription">Subscription Plans</a><a href="#contact">Contact Us</a></div>
            <div className="col-6 col-lg-2"><h4>Resources</h4><a href="#women-health">Period Tracking</a><a href="#women-health">Ovulation Tracking</a><a href="#baby-care">Baby Development</a><a href="#articles">Parenting</a><a href="#articles">Child Safety</a></div>
            <div className="col-6 col-lg-2"><h4>Support</h4><a href="#contact">Contact Us</a><a href="#faq">FAQs</a><a href="#doctor">Consultation & Booking</a><a href="#subscription">Membership Plans</a><a href="#contact">Privacy Policy</a><a href="#contact">Terms & Conditions</a></div>
            <div className="col-6 col-lg-2"><h4>Follow</h4><div className="socials"><a href="#contact"><i className="bi bi-instagram"></i></a><a href="#contact"><i className="bi bi-facebook"></i></a><a href="#contact"><i className="bi bi-youtube"></i></a><a href="#contact"><i className="bi bi-linkedin"></i></a></div></div>
          </div>
          <div className="footer-bottom"><span>&copy; 2026 BloomCare. All rights reserved.</span><span>Medical disclaimer: Educational information and cycle predictions do not replace professional medical advice.</span></div>
        </div>
      </footer>
    </div>
  );
}

export default App;
