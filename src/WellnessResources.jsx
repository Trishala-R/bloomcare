import React, { useState } from "react";

const articles = [
  {
    title: "Understanding Vaginal Health",
    category: "Vaginal Health",
    image:
      "/images/vaginal health.jpg",
    intro:
      "Learn the basics of vaginal health and why gentle hygiene matters.",
    content:
      "The vagina has a natural environment that helps maintain itself. Everyday care should focus on gentle external cleaning rather than internal washing. Avoid unnecessary douching and strongly scented products if they cause irritation. Changes such as persistent itching, burning, pain, unusual discharge or an unpleasant smell are reasons to seek medical advice."
  },
  {
    title: "Difference Between the Vagina and Vulva",
    category: "Body Basics",
    image:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=800&q=80",
    intro:
      "Understand the difference between two commonly confused anatomical terms.",
    content:
      "The vulva refers to the external genital structures, while the vagina is the internal muscular canal. Understanding the difference makes it easier to describe symptoms accurately when speaking with a healthcare professional. Everyday external hygiene should focus on the vulva. The vagina itself is naturally self-cleaning."
  },
  {
    title: "Common Intimate Hygiene Mistakes",
    category: "Hygiene",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    intro:
      "Some common habits can cause unnecessary irritation or discomfort.",
    content:
      "Common mistakes include excessive washing, using heavily scented products, douching, staying in wet clothing for long periods and ignoring persistent symptoms. Gentle external cleaning, breathable clothing and regular changing of menstrual products are usually simpler and more practical habits."
  },
  {
    title: "How to Choose the Right Period Product",
    category: "Period Care",
    image:
      "/images/right period product.webp",
    intro:
      "Pads, tampons, cups and period underwear all have different features.",
    content:
      "Choosing a period product depends on your flow, comfort, lifestyle and personal preference. Pads are external and simple to use. Tampons provide internal protection. Menstrual cups are reusable and require learning and cleaning. Period underwear can provide reusable external protection. There is no universal best option."
  },
  {
    title: "Organic vs Regular Sanitary Pads",
    category: "Period Products",
    image:
      "/images/org vs reg.webp",
    intro:
      "Learn what to check before choosing between different pad materials.",
    content:
      "Terms such as organic, cotton, natural or plant-based can mean different things depending on the product. Read the manufacturer's material information and look for relevant certifications when a product makes a specific claim. Comfort, absorbency, skin sensitivity and fit are also important factors."
  },
  {
    title: "Menstrual Hygiene During Pregnancy",
    category: "Pregnancy",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80",
    intro:
      "Pregnancy changes the body, so intimate hygiene should remain gentle and simple.",
    content:
      "During pregnancy, maintain gentle external hygiene and choose comfortable breathable underwear. Avoid harsh or strongly scented products. If you notice unusual discharge, unpleasant smell, itching, burning, pain or other concerning symptoms, contact your healthcare professional instead of self-treating."
  },
  {
    title: "Understanding Vaginal Discharge",
    category: "Vaginal Health",
    image:
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80",
    intro:
      "Discharge can vary naturally, but some changes deserve medical attention.",
    content:
      "Vaginal discharge can change throughout the menstrual cycle. Colour, amount and consistency can vary. However, a new or persistent change accompanied by unpleasant smell, itching, burning, pain or irritation should be discussed with a healthcare professional."
  },
  {
    title: "Myths and Facts About Intimate Hygiene",
    category: "Myths & Facts",
    image:
      "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=800&q=80",
    intro:
      "Separate common intimate-health myths from simple, evidence-based habits.",
    content:
      "More washing does not necessarily mean better hygiene. The vagina is naturally self-cleaning, and internal douching is unnecessary for routine hygiene. Strong fragrances are not required for cleanliness. A simple routine of gentle external care and appropriate menstrual hygiene is usually enough."
  },
  {
    title: "Everyday Habits for Better Intimate Health",
    category: "Wellness",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
    intro:
      "Small everyday habits can make personal care easier and more comfortable.",
    content:
      "Choose comfortable breathable clothing, change out of wet or sweaty clothes, maintain regular hygiene and change menstrual products regularly. Pay attention to your own body and seek professional advice when something feels persistently unusual."
  },
  {
    title: "When Should You Visit a Gynaecologist?",
    category: "Medical Guidance",
    image:
      "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=800&q=80",
    intro:
      "Knowing when to ask for professional help is an important part of health awareness.",
    content:
      "Consider seeking medical advice for persistent itching, burning, pain, unusual discharge, unpleasant smell, unexplained bleeding or symptoms that do not improve. A gynaecologist can assess the symptoms and recommend appropriate care."
  }
];

function WellnessResources() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="iw-detail-page">

      <div className="iw-detail-heading">
        <span className="iw-eyebrow">LEARN & UNDERSTAND</span>

        <h2>Educational Wellness Resources</h2>

        <p>
          Beginner-friendly guides covering intimate health, period care,
          hygiene and everyday wellness.
        </p>
      </div>

      {!selectedArticle ? (
        <div className="row g-4">

          {articles.map((article) => (
            <div className="col-xl-4 col-md-6" key={article.title}>

              <article className="iw-article-card">

                <div className="iw-article-image">
                  <img
                    src={article.image}
                    alt={article.title}
                  />

                  <span>{article.category}</span>
                </div>

                <div className="iw-article-content">

                  <h3>{article.title}</h3>

                  <p>{article.intro}</p>

                  <button
                    className="iw-read-btn"
                    onClick={() => setSelectedArticle(article)}
                  >
                    Read More
                    <i className="bi bi-arrow-right"></i>
                  </button>

                </div>

              </article>

            </div>
          ))}

        </div>
      ) : (
        <article className="iw-full-article">

          <button
            className="iw-article-back"
            onClick={() => setSelectedArticle(null)}
          >
            <i className="bi bi-arrow-left"></i>
            Back to Articles
          </button>

          <img
            src={selectedArticle.image}
            alt={selectedArticle.title}
          />

          <span className="iw-article-category">
            {selectedArticle.category}
          </span>

          <h2>{selectedArticle.title}</h2>

          <p className="iw-article-intro">
            {selectedArticle.intro}
          </p>

          <div className="iw-article-body">
            <p>{selectedArticle.content}</p>
          </div>

          <div className="iw-article-disclaimer">
            <i className="bi bi-info-circle"></i>

            <span>
              This article is for general educational purposes and does not
              replace personalised medical advice.
            </span>
          </div>

        </article>
      )}

    </div>
  );
}

export default WellnessResources;