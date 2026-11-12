import React from "react";

const topics = [
  {
    icon: "bi-heart",
    title: "Daily Comfort",
    points: [
      "Choose comfortable clothing that allows your skin to breathe.",
      "Prefer breathable underwear for everyday use.",
      "Maintain gentle everyday cleanliness without excessive washing."
    ]
  },
  {
    icon: "bi-droplet",
    title: "Skin Sensitivity",
    points: [
      "Avoid heavily scented products if they cause irritation.",
      "Pay attention to products or materials that repeatedly trigger discomfort.",
      "Choose gentle products that are suitable for your own skin."
    ]
  },
  {
    icon: "bi-stars",
    title: "Personal Hygiene Habits",
    points: [
      "Maintain regular personal hygiene.",
      "Change menstrual products regularly.",
      "Wash your hands before and after handling menstrual products."
    ]
  },
  {
    icon: "bi-person-heart",
    title: "When to Consult a Doctor",
    points: [
      "Persistent itching.",
      "Burning sensation.",
      "Unusual discharge.",
      "Unpleasant smell.",
      "Pain or irritation."
    ]
  }
];

function PersonalCare() {
  return (
    <div className="iw-detail-page">

      <div className="iw-detail-heading">
        <span className="iw-eyebrow">GENTLE SELF-CARE</span>

        <h2>Gentle Personal-Care Guidance</h2>

        <p>
          Keep intimate care simple. Good hygiene does not require complicated
          routines or unnecessary products.
        </p>
      </div>

      <div className="row g-4">

        {topics.map((topic) => (
          <div className="col-lg-6" key={topic.title}>

            <div className="iw-care-card">

              <div className="iw-care-icon">
                <i className={`bi ${topic.icon}`}></i>
              </div>

              <div>
                <h3>{topic.title}</h3>

                <ul>
                  {topic.points.map((point, index) => (
                    <li key={index}>
                      <i className="bi bi-check2-circle"></i>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        ))}

      </div>

      <div className="iw-warning-card">

        <div className="iw-warning-icon">
          <i className="bi bi-exclamation-circle"></i>
        </div>

        <div>
          <h3>Don't ignore persistent symptoms</h3>

          <p>
            Persistent itching, burning, unusual discharge, unpleasant smell,
            pain or irritation should not simply be covered up with random
            products. Seek medical advice to understand the cause.
          </p>
        </div>

      </div>

    </div>
  );
}

export default PersonalCare;