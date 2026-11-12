import React from "react";

export default function DoctorCard({ doctor, onView, onBook }) {
  return (
    <article className="bc-doctor-card">
      <div className="bc-doctor-photo-wrap">
        <img className="bc-doctor-photo" src={doctor.image} alt={`Illustrative portrait for ${doctor.name}`} />
        <span className="bc-demo-tag">Demo profile</span>
      </div>
      <div className="bc-doctor-card-body">
        <span className="bc-specialty">{doctor.specialty}</span>
        <h3>{doctor.name}</h3>
        <p className="bc-qualification">{doctor.qualifications}</p>
        <div className="bc-doctor-facts">
          <span><i className="bi bi-briefcase"></i>{doctor.experience} years' sample experience</span>
          <span><i className="bi bi-hospital"></i>{doctor.clinic}</span>
          <span><i className="bi bi-geo-alt"></i>{doctor.location}</span>
        </div>
        <p className="bc-doctor-intro">{doctor.intro}</p>
        <div className="bc-card-bottom">
          <strong>₹{doctor.fee} <small>/ demo fee</small></strong>
          <span className="bc-availability">Sample availability</span>
        </div>
        <div className="bc-card-actions">
          <button className="bc-btn bc-btn-light" onClick={() => onView(doctor)}>View Profile</button>
          <button className="bc-btn bc-btn-primary" onClick={() => onBook(doctor)}>Book Appointment</button>
        </div>
      </div>
    </article>
  );
}
