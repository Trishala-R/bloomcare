import React from "react";

const everydayHygiene = [
  "Wash the external intimate area gently with clean water.",
  "Avoid harsh soaps, perfumes and scented intimate products.",
  "Wear clean, breathable cotton underwear.",
  "Change underwear regularly.",
  "Keep the area dry and comfortable.",
  "Change out of sweaty or wet clothes.",
  "Maintain good menstrual hygiene during periods.",
  "Avoid vaginal douching and unnecessary internal cleansing."
];

const pregnancyHygiene = [
  "Maintain gentle external intimate hygiene.",
  "Wear comfortable cotton underwear.",
  "Avoid scented products and harsh intimate washes.",
  "Change underwear whenever necessary.",
  "Maintain cleanliness and dryness.",
  "Avoid self-medicating for itching, unusual discharge or irritation.",
  "Consult a gynaecologist if there is unusual discharge, unpleasant smell, itching, burning or discomfort."
];

function HygieneList({ items }) {
  return (
    <div className="iw-guide-list">
      {items.map((item, index) => (
        <div className="iw-guide-item" key={index}>
          <span>
            <i className="bi bi-check2"></i>
          </span>

          <p>{item}</p>
        </div>
      ))}
    </div>
  );
}

function IntimateHygiene() {
  return (
    <div className="iw-detail-page">

      <div className="iw-detail-heading">
        <span className="iw-eyebrow">EVERYDAY CARE</span>

        <h2>Everyday Intimate Hygiene</h2>

        <p>
          Gentle everyday habits can help you stay comfortable and maintain
          healthy intimate hygiene.
        </p>
      </div>

      <div className="iw-note">
        <i className="bi bi-info-circle-fill"></i>

        <p>
          The vagina is naturally self-cleaning. Internal washing or douching
          is generally unnecessary. Focus on gentle external hygiene instead.
        </p>
      </div>

      <div className="row g-4">

        <div className="col-lg-6">
          <div className="iw-guide-card">

            <div className="iw-guide-title">
              <div className="iw-round-icon">
                <i className="bi bi-sun"></i>
              </div>

              <div>
                <span>GUIDE 01</span>
                <h3>Everyday Hygiene</h3>
              </div>
            </div>

            <p className="iw-guide-intro">
              Simple habits for normal days.
            </p>

            <HygieneList items={everydayHygiene} />

          </div>
        </div>

        <div className="col-lg-6">
          <div className="iw-guide-card pregnancy-guide">

            <div className="iw-guide-title">
              <div className="iw-round-icon">
                <i className="bi bi-heart-pulse"></i>
              </div>

              <div>
                <span>GUIDE 02</span>
                <h3>During Pregnancy</h3>
              </div>
            </div>

            <p className="iw-guide-intro">
              Gentle hygiene practices while your body changes.
            </p>

            <HygieneList items={pregnancyHygiene} />

          </div>
        </div>

      </div>

      <div className="iw-doctor-note">
        <i className="bi bi-person-heart"></i>

        <div>
          <h4>When should you get medical advice?</h4>

          <p>
            Persistent itching, burning, unusual discharge, unpleasant smell
            or pain should not be ignored. A qualified healthcare professional
            can help identify the cause and suggest appropriate treatment.
          </p>
        </div>
      </div>

    </div>
  );
}

export default IntimateHygiene;