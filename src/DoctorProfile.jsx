import React from "react";

export default function DoctorProfile({ doctor, onBack, onBook }) {
  if (!doctor) return null;
  return (
    <section className="bc-section">
      <button className="bc-back-link" onClick={onBack}><i className="bi bi-arrow-left"></i> Back to doctor directory</button>
      <div className="bc-profile-layout">
        <div className="bc-profile-main">
          <div className="bc-profile-top">
            <img src={doctor.image} alt={`Illustrative portrait for ${doctor.name}`} />
            <div><span className="bc-demo-tag">Fictional demo profile</span><h2>{doctor.name}</h2><p className="bc-specialty">{doctor.specialty}</p><p>{doctor.qualifications}</p><strong>{doctor.experience} years' sample experience</strong></div>
          </div>
          <h3>About the profile</h3><p>{doctor.intro}</p>
          <h3>Areas of expertise</h3><div className="bc-chip-list">{doctor.expertise.map(x=><span key={x}>{x}</span>)}</div>
          <h3>Languages spoken</h3><p>{doctor.languages.join(", ")}</p>
          <h3>Patient feedback</h3>
          <div className="bc-review"><strong>Sample review — not a genuine patient review</strong><div className="bc-stars">★★★★★</div>{doctor.reviews[0].text}</div>
          <div className="bc-demo-note">All qualifications, experience, clinic details, availability and reviews on this page are fictional placeholders. They do not describe a verified healthcare professional.</div>
        </div>
        <aside className="bc-profile-aside">
          <h3>Consultation details</h3>
          <p><i className="bi bi-hospital"></i> {doctor.clinic}</p>
          <p><i className="bi bi-geo-alt"></i> {doctor.address}</p>
          <p><i className="bi bi-clock"></i> {doctor.timings} (sample hours)</p>
          <p><i className="bi bi-currency-rupee"></i> ₹{doctor.fee} demo fee</p>
          <p><i className="bi bi-camera-video"></i> {doctor.mode.join(", ")}</p>
          <button className="bc-btn bc-btn-primary bc-full" onClick={()=>onBook(doctor)}>Book Demo Appointment</button>
        </aside>
      </div>
    </section>
  );
}
