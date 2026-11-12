import React, { useState } from "react";

export default function MyAppointments({ appointments, onCancel }) {
  const [expanded, setExpanded] = useState(null);
  return (
    <section className="bc-section" id="my-appointments">
      <div className="bc-section-heading"><span className="bc-eyebrow">YOUR SAVED DEMOS</span><h2>My Appointments</h2><p>Appointments saved in this browser for demonstration purposes.</p></div>
      {!appointments.length ? <div className="bc-empty">You haven't saved any demo appointments yet.</div> :
        <div className="bc-appointments-list">{appointments.map(a=><article className="bc-appointment-card" key={a.id}>
          <img src={a.doctorImage} alt="" />
          <div className="bc-appointment-info"><h3>{a.doctorName}</h3><p>{a.method} consultation · {a.date} · {a.time}</p><span className="bc-status">{a.status}</span><small>Reference: {a.id}</small>
            <button className="bc-text-button" onClick={()=>setExpanded(expanded===a.id?null:a.id)}>{expanded===a.id?"Hide details":"View details"}</button>
            {expanded===a.id && <div className="bc-appointment-details"><p>Patient: {a.patient} · Age: {a.age}</p><p>Clinic: {a.clinic}</p><p>Demo fee: ₹{a.fee}</p>{a.reason && <p>Reason: {a.reason}</p>}</div>}
          </div>
          {a.status!=="Demo appointment cancelled" && <button className="bc-btn bc-btn-light bc-cancel" onClick={()=>onCancel(a.id)}>Cancel demo</button>}
        </article>)}</div>}
      <p className="bc-smallprint">This list is stored only in your browser's localStorage. It is not sent to a clinic or healthcare professional.</p>
    </section>
  );
}
