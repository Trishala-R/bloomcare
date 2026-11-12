import React, { useMemo, useState } from "react";

const slots = ["09:30 AM", "10:30 AM", "11:30 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

export default function AppointmentBooking({ doctor, onBack, onBooked }) {
  const today = new Date().toISOString().split("T")[0];
  const [method, setMethod] = useState("Video");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [patient, setPatient] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const availableMethods = doctor.mode;
  const fee = useMemo(() => doctor.fee + (method === "In-Person" ? 100 : 0), [doctor, method]);

  const submit = e => {
    e.preventDefault();
    if (!patient.trim() || !age || !email.trim() || !phone.trim() || !date || !time) {
      setError("Please complete all required fields.");
      return;
    }
    if (date < today) {
      setError("Please choose today or a future date.");
      return;
    }
    const appointment = {
      id: `BC-DEMO-${Date.now().toString(36).toUpperCase()}`,
      doctorId: doctor.id, doctorName: doctor.name, doctorImage: doctor.image,
      clinic: doctor.clinic, address: doctor.address, method, date, time,
      patient, age, email, phone, reason, fee, status: "Demo booking saved",
      createdAt: new Date().toISOString()
    };
    onBooked(appointment);
  };

  return (
    <section className="bc-section">
      <button className="bc-back-link" onClick={onBack}><i className="bi bi-arrow-left"></i> Back</button>
      <div className="bc-form-shell">
        <div className="bc-section-heading"><span className="bc-eyebrow">FRONTEND BOOKING DEMO</span><h2>Book an Appointment</h2><p>Selected doctor: <strong>{doctor.name}</strong> · Fictional sample profile</p></div>
        <form onSubmit={submit} className="bc-booking-form">
          <label>Consultation method</label>
          <div className="bc-method-options">
            {availableMethods.map(m=><button type="button" key={m} className={`bc-method ${method===m?"active":""}`} onClick={()=>{setMethod(m);setTime("");}}>
              <i className={`bi ${m==="Audio"?"bi-mic":m==="Video"?"bi-camera-video":"bi-hospital"}`}></i>{m}
            </button>)}
          </div>
          <div className="bc-demo-note">{method==="Audio" ? "Audio consultation preview only. No voice call will be started." : method==="Video" ? "Video consultation preview only. No video call or meeting link is provided." : `Sample clinic: ${doctor.address}. This demo does not reserve a real clinic visit.`}</div>
          <div className="bc-form-grid">
            <div><label htmlFor="bc-patient">Patient's name *</label><input id="bc-patient" value={patient} onChange={e=>setPatient(e.target.value)} required /></div>
            <div><label htmlFor="bc-age">Age *</label><input id="bc-age" type="number" min="1" max="120" value={age} onChange={e=>setAge(e.target.value)} required /></div>
            <div><label htmlFor="bc-email">Email address *</label><input id="bc-email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></div>
            <div><label htmlFor="bc-phone">Phone number *</label><input id="bc-phone" type="tel" value={phone} onChange={e=>setPhone(e.target.value)} required /></div>
            <div><label htmlFor="bc-date">Preferred date *</label><input id="bc-date" type="date" min={today} value={date} onChange={e=>{setDate(e.target.value);setTime("");}} required /></div>
            <div><label htmlFor="bc-time">Available time (sample) *</label><select id="bc-time" value={time} onChange={e=>setTime(e.target.value)} required><option value="">Select a time</option>{slots.map(s=><option key={s}>{s}</option>)}</select></div>
            <div className="bc-wide"><label htmlFor="bc-reason">Reason for consultation (optional)</label><textarea id="bc-reason" rows="3" value={reason} onChange={e=>setReason(e.target.value)} placeholder="Share a brief note (optional)"></textarea></div>
          </div>
          <div className="bc-fee-row"><span>Duration: {method==="In-Person"?"Sample 20–30 min":"Sample 15 min"}</span><strong>₹{fee} demo fee</strong></div>
          {error && <p className="bc-error" role="alert">{error}</p>}
          <button className="bc-btn bc-btn-primary bc-full" type="submit">Save Demo Appointment</button>
          <p className="bc-smallprint">Demo only: no payment is collected, no doctor is notified and no real appointment is confirmed. Avoid entering sensitive medical details.</p>
        </form>
      </div>
    </section>
  );
}
