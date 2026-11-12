import React, { useState } from "react";
import IntimateHygiene from "./IntimateHygiene";
import PeriodCare from "./PeriodCare";
import PersonalCare from "./PersonalCare";
import WellnessResources from "./WellnessResources";
import "./IntimateWellness.css";

const featureCards = [
  {
    id: "hygiene",
    icon: "bi-droplet-heart",
    image:
      "/images/everyday inti.jpg",
    title: "Everyday Intimate Hygiene",
    description:
      "Simple, gentle habits for everyday intimate hygiene, including helpful guidance during pregnancy."
  },
  {
    id: "period",
    icon: "bi-heart-pulse",
    image:
      "/images/period essential.jpg",
    title: "Period Care Essentials",
    description:
      "Understand different menstrual products and choose the option that fits your comfort and routine."
  },
  {
    id: "personal",
    icon: "bi-stars",
    image:
      "/images/gentle guid.jpg",
    title: "Gentle Personal-Care Guidance",
    description:
      "Practical guidance for comfort, sensitive skin, hygiene habits and knowing when to seek medical advice."
  },
  {
    id: "resources",
    icon: "bi-book-heart",
    image:
      "/images/educational wellness.jpg",
    title: "Educational Wellness Resources",
    description:
      "Beginner-friendly articles covering vaginal health, period care, hygiene and common questions."
  }
];

function IntimateWellness() {
  const [activeSection, setActiveSection] = useState(null);

  const openSection = (section) => {
    setActiveSection(section);

    setTimeout(() => {
      document
        .getElementById(`intimate-${section}`)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
    }, 100);
  };

  const closeSection = () => {
    setActiveSection(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <section className="intimate-wellness-section">

      {/* Main Feature Cards */}
      {!activeSection && (
        <>
          <div className="container">
            <div className="iw-heading text-center">
              <span className="iw-eyebrow">INTIMATE WELLNESS GUIDE</span>

              <h2>
                Care, Comfort & Confidence
              </h2>

              <p>
                Simple and trustworthy resources to help you understand
                intimate hygiene, period care and everyday wellness.
              </p>
            </div>

            <div className="row g-4">
              {featureCards.map((card) => (
                <div
                  className="col-lg-6"
                  key={card.id}
                >
                  <div className="iw-feature-card">

                    <div className="iw-feature-image">
                      <img
                        src={card.image}
                        alt={card.title}
                      />

                      <div className="iw-icon">
                        <i className={`bi ${card.icon}`}></i>
                      </div>
                    </div>

                    <div className="iw-feature-content">
                      <h3>{card.title}</h3>

                      <p>{card.description}</p>

                      <button
                        className="iw-explore-btn"
                        onClick={() => openSection(card.id)}
                      >
                        Explore More
                        <i className="bi bi-arrow-right"></i>
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Detailed Sections */}
      {activeSection && (
        <div className="container">

          <button
            className="iw-back-btn"
            onClick={closeSection}
          >
            <i className="bi bi-arrow-left"></i>
            Back to Intimate Wellness
          </button>

          {activeSection === "hygiene" && (
            <div id="intimate-hygiene">
              <IntimateHygiene />
            </div>
          )}

          {activeSection === "period" && (
            <div id="intimate-period">
              <PeriodCare />
            </div>
          )}

          {activeSection === "personal" && (
            <div id="intimate-personal">
              <PersonalCare />
            </div>
          )}

          {activeSection === "resources" && (
            <div id="intimate-resources">
              <WellnessResources />
            </div>
          )}

        </div>
      )}

    </section>
  );
}

export default IntimateWellness;