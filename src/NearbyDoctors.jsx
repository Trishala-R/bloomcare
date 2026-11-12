import React, { useState } from "react";

export default function NearbyDoctors({ doctors }) {
  const [query, setQuery] = useState("");
  const results = doctors.filter(d => `${d.city} ${d.location} ${d.address} ${d.specialty}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <section className="bc-section bc-nearby" id="nearby-doctors">
      <div className="bc-section-heading"><span className="bc-eyebrow">LOCATION EXPLORER</span><h2>Doctors Near You</h2><p>Search sample city and area labels. These are not verified nearby clinics or live availability.</p></div>
      <div className="bc-nearby-search"><i className="bi bi-geo-alt"></i><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Enter city, area or PIN code (e.g. Madurai)" /><button className="bc-btn bc-btn-primary" onClick={()=>setQuery(query.trim())}>Search</button></div>
      <div className="bc-nearby-grid">
        {results.map(d=><div className="bc-nearby-card" key={d.id}><span className="bc-demo-tag">Sample location</span><h3>{d.clinic}</h3><p>{d.address}</p><small>{d.specialty} · Sample hours: {d.timings}</small><a className="bc-map-link" target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.address)}`}>Open Google Maps search <i className="bi bi-arrow-up-right"></i></a></div>)}
      </div>
      {!results.length && <div className="bc-empty">No sample locations match. Try Chennai, Coimbatore or Madurai.</div>}
      <p className="bc-smallprint">Distance and live clinic availability are not shown because no verified doctor-location or availability service is connected.</p>
    </section>
  );
}
