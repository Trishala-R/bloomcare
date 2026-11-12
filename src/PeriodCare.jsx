import React from "react";

const products = [
  {
    name: "Sanitary Pads",
    icon: "bi-droplet",
    image:
      "/images/sanitary pads.jpg",
    description:
      "External menstrual protection available in different sizes and absorbency levels.",
    usage:
      "Place the pad securely inside underwear and change it regularly according to your flow.",
    benefits:
      "Easy to use, widely available and suitable for many first-time users.",
    hygiene:
      "Change regularly, wrap used pads before disposal and wash your hands after changing.",
    brand: "Nua",
    brandUrl: "https://nuawoman.com/"
  },
  {
    name: "Organic Cotton Pads",
    icon: "bi-flower1",
    image:
      "/images/organic cotton pads.jpg",
    description:
      "Pads made with cotton-based materials. Check each product's material and certification details before buying.",
    usage:
      "Use like a regular sanitary pad and change according to your flow.",
    benefits:
      "Can be a comfortable option for people who prefer cotton-based materials.",
    hygiene:
      "Follow the manufacturer's instructions and change regularly.",
    brand: "Sirona",
    brandUrl: "https://thesirona.com/"
  },
  {
    name: "Tampons",
    icon: "bi-circle",
    image:
      "/images/tampons.jpg",
    description:
      "Internal menstrual products designed to absorb menstrual flow.",
    usage:
      "Insert according to the product instructions and use the lowest absorbency that manages your flow.",
    benefits:
      "Convenient for swimming, exercise and situations where external protection may feel less practical.",
    hygiene:
      "Change tampons regularly and never use one longer than the manufacturer's recommended time.",
    brand: "Nua",
    brandUrl: "https://nuawoman.com/"
  },
  {
    name: "Menstrual Cups",
    icon: "bi-circle-half",
    image:
      "/images/menstrual cup.avif",
    description:
      "Reusable cups collect menstrual flow and come in different sizes and shapes.",
    usage:
      "Fold, insert and remove according to the manufacturer's instructions. Clean between uses.",
    benefits:
      "Reusable and can be economical over time when used and cared for correctly.",
    hygiene:
      "Wash your hands before handling and clean or sterilize the cup according to its instructions.",
    brand: "Pee Safe",
    brandUrl: "https://www.peesafe.com/"
  },
  {
    name: "Period Underwear",
    icon: "bi-person",
    image:
      "/images/period underwear.webp",
    description:
      "Underwear designed with absorbent layers for menstrual protection.",
    usage:
      "Wear like regular underwear and change according to your flow and the product's capacity.",
    benefits:
      "Comfortable and reusable options are available.",
    hygiene:
      "Follow washing instructions carefully and allow reusable products to dry completely.",
    brand: "Carmesi",
    brandUrl: "https://mycarmesi.com/"
  },
  {
    name: "Pantyliners",
    icon: "bi-heart",
    image:
      "/images/panty liners.jpg",
    description:
      "Thin absorbent liners commonly used for light discharge, spotting or very light flow.",
    usage:
      "Place inside underwear and replace regularly.",
    benefits:
      "Lightweight and convenient for everyday situations.",
    hygiene:
      "Avoid wearing a liner for too long and choose breathable underwear.",
    brand: "Nua",
    brandUrl: "https://nuawoman.com/"
  },
  {
    name: "Reusable Cloth Pads",
    icon: "bi-recycle",
    image:
      "/images/reusable cloth pads.jpg",
    description:
      "Washable menstrual pads that can be reused when cleaned and maintained correctly.",
    usage:
      "Secure the pad in underwear and wash it thoroughly after use.",
    benefits:
      "Reusable and can reduce disposable product waste.",
    hygiene:
      "Wash thoroughly, dry completely and store clean and dry between periods.",
    brand: "Pee Safe",
    brandUrl: "https://www.peesafe.com/"
  }
];

const comparison = [
  {
    product: "Pads",
    bestFor: "Simple external protection",
    reusable: "Usually no",
    learning: "Easy"
  },
  {
    product: "Tampons",
    bestFor: "Internal protection and active days",
    reusable: "No",
    learning: "Moderate"
  },
  {
    product: "Menstrual Cups",
    bestFor: "Reusable internal protection",
    reusable: "Yes",
    learning: "Takes practice"
  },
  {
    product: "Period Underwear",
    bestFor: "Reusable external protection",
    reusable: "Yes",
    learning: "Easy"
  }
];

function PeriodCare() {
  return (
    <div className="iw-detail-page">

      <div className="iw-detail-heading">
        <span className="iw-eyebrow">PERIOD CARE</span>

        <h2>Period Care Essentials</h2>

        <p>
          Explore common menstrual products and understand how they work,
          how they are used and what hygiene practices to follow.
        </p>
      </div>

      <div className="iw-brand-note">
        <i className="bi bi-shield-check"></i>

        <p>
          Brand buttons below open the brand's official website. BloomCare
          does not process payments, orders or checkout.
        </p>
      </div>

      <div className="row g-4">

        {products.map((product) => (
          <div className="col-xl-4 col-md-6" key={product.name}>

            <div className="iw-product-card">

              <div className="iw-product-image">
                <img
                  src={product.image}
                  alt={product.name}
                />
              </div>

              <div className="iw-product-content">

                <div className="iw-product-icon">
                  <i className={`bi ${product.icon}`}></i>
                </div>

                <h3>{product.name}</h3>

                <p>{product.description}</p>

                <div className="iw-product-info">
                  <strong>How to use</strong>
                  <span>{product.usage}</span>
                </div>

                <div className="iw-product-info">
                  <strong>Main benefits</strong>
                  <span>{product.benefits}</span>
                </div>

                <div className="iw-product-info">
                  <strong>Hygiene</strong>
                  <span>{product.hygiene}</span>
                </div>

                <a
                  href={product.brandUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="iw-shop-btn"
                >
                  Shop from {product.brand}
                  <i className="bi bi-box-arrow-up-right"></i>
                </a>

              </div>

            </div>

          </div>
        ))}

      </div>

      <div className="iw-comparison">

        <div className="iw-comparison-heading">
          <span className="iw-eyebrow">QUICK COMPARISON</span>

          <h3>Which Period Product Is Right for You?</h3>

          <p>
            There is no single product that is best for everyone. Comfort,
            flow, lifestyle and personal preference all matter.
          </p>
        </div>

        <div className="table-responsive">
          <table className="table iw-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Useful For</th>
                <th>Reusable?</th>
                <th>Learning Curve</th>
              </tr>
            </thead>

            <tbody>
              {comparison.map((item) => (
                <tr key={item.product}>
                  <td>{item.product}</td>
                  <td>{item.bestFor}</td>
                  <td>{item.reusable}</td>
                  <td>{item.learning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}

export default PeriodCare;