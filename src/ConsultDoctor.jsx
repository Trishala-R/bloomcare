import React, { useEffect, useState } from "react";
import doctors from "./doctors";
import DoctorList from "./DoctorList";
import DoctorProfile from "./DoctorProfile";
import AppointmentBooking from "./AppointmentBooking";
import NearbyDoctors from "./NearbyDoctors";
import MyAppointments from "./MyAppointments";
import "./ConsultDoctor.css";

const STORAGE_KEY = "bloomcare_demo_appointments";

export default function ConsultDoctor() {
  const [page, setPage] = useState("directory");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) setAppointments(saved);
    } catch { setAppointments([]); }
  }, []);

  const saveAppointments = next => {
    setAppointments(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };
  const openProfile = doctor => { setSelectedDoctor(doctor); setPage("profile"); window.scrollTo({top:0,behavior:"smooth"}); };
  const startBooking = doctor => { setSelectedDoctor(doctor); setPage("booking"); window.scrollTo({top:0,behavior:"smooth"}); };
  const saveBooking = appointment => {
    saveAppointments([appointment, ...appointments]);
    setPage("confirmation");
    setSelectedDoctor(appointment.doctorId ? doctors.find(d=>d.id===appointment.doctorId) : selectedDoctor);
    window.scrollTo({top:0,behavior:"smooth"});
  };
  const cancelAppointment = id => {
    const next = appointments.map(a=>a.id===id?{...a,status:"Demo appointment cancelled"}:a);
    saveAppointments(next);
  };

  return <div className="bc-consult-page">
    <header className="bc-consult-hero">
      <div className="bc-hero-orb"></div>
      <div className="bc-hero-content">
        <span className="bc-eyebrow">BLOOMCARE · WOMEN'S HEALTH</span>
        <h1>Care That Listens.<br/>Guidance That Empowers.</h1>
        <p>Explore women's healthcare specialties and preview a simple appointment-booking experience.</p>
        <div className="bc-hero-actions">
          <button className="bc-btn bc-btn-primary" onClick={()=>{setPage("directory");document.getElementById("doctor-directory")?.scrollIntoView({behavior:"smooth"});}}>Find a Doctor</button>
          <button className="bc-btn bc-btn-light" onClick={()=>{setPage("appointments");document.getElementById("my-appointments")?.scrollIntoView({behavior:"smooth"});}}>My Appointments ({appointments.length})</button>
        </div>
        <div className="bc-hero-disclaimer">Frontend demonstration · Sample doctors and clinic information only</div>
      </div>
    </header>

    <nav className="bc-subnav" aria-label="Consultation sections">
      <button className={page==="directory"?"active":""} onClick={()=>setPage("directory")}>Doctor Directory</button>
      <button onClick={()=>setPage("nearby")}>Doctors Near You</button>
      <button onClick={()=>setPage("appointments")}>My Appointments</button>
    </nav>

    {page==="directory" && <>
      <DoctorList doctors={doctors} onView={openProfile} onBook={startBooking}/>
      <NearbyDoctors doctors={doctors}/>
      <MyAppointments appointments={appointments} onCancel={cancelAppointment}/>
    </>}
    {page==="profile" && <DoctorProfile doctor={selectedDoctor} onBack={()=>setPage("directory")} onBook={startBooking}/>}
    {page==="booking" && selectedDoctor && <AppointmentBooking doctor={selectedDoctor} onBack={()=>setPage("profile")} onBooked={saveBooking}/>}
    {page==="confirmation" && <section className="bc-section"><div className="bc-confirmation"><div className="bc-confirm-icon"><i className="bi bi-check2"></i></div><span className="bc-eyebrow">DEMO BOOKING SAVED</span><h2>Your demo appointment is saved.</h2><p>This is not a confirmed real-world medical appointment. No clinic or doctor has been contacted.</p>{appointments[0] && <div className="bc-confirm-details"><strong>{appointments[0].doctorName}</strong><span>{appointments[0].method} · {appointments[0].date} · {appointments[0].time}</span><span>Demo reference: {appointments[0].id}</span></div>}<div className="bc-hero-actions"><button className="bc-btn bc-btn-primary" onClick={()=>setPage("appointments")}>View My Appointments</button><button className="bc-btn bc-btn-light" onClick={()=>setPage("directory")}>Back to Doctors</button></div></div></section>}
    {page==="nearby" && <><NearbyDoctors doctors={doctors}/><MyAppointments appointments={appointments} onCancel={cancelAppointment}/></>}
    {page==="appointments" && <MyAppointments appointments={appointments} onCancel={cancelAppointment}/>}

    <footer className="bc-consult-footer"><p>BloomCare provides educational information and a frontend booking demo only. It is not an emergency service or substitute for professional medical care.</p></footer>
  </div>;
}
