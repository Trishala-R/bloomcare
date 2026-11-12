import React, { useMemo, useState } from "react";
import DoctorCard from "./DoctorCard";

export default function DoctorList({ doctors, onView, onBook }) {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [mode, setMode] = useState("All");
  const [experience, setExperience] = useState("Any");
  const [fee, setFee] = useState("Any");
  const [sort, setSort] = useState("recommended");

  const specialties = ["All", ...new Set(doctors.map(d => d.specialty))];
  const filtered = useMemo(() => {
    let result = doctors.filter(d => {
      const q = search.toLowerCase();
      const matchesSearch = [d.name, d.specialty, d.location, d.clinic].some(v => v.toLowerCase().includes(q));
      return matchesSearch &&
        (specialty === "All" || d.specialty === specialty) &&
        (mode === "All" || d.mode.includes(mode)) &&
        (experience === "Any" || (experience === "5+" ? d.experience >= 5 : d.experience >= 10)) &&
        (fee === "Any" || (fee === "Under ₹600" ? d.fee < 600 : fee === "₹600–₹800" ? d.fee >= 600 && d.fee <= 800 : d.fee > 800));
    });
    if (sort === "experience") result.sort((a,b) => b.experience-a.experience);
    if (sort === "low") result.sort((a,b) => a.fee-b.fee);
    if (sort === "high") result.sort((a,b) => b.fee-a.fee);
    return result;
  }, [doctors, search, specialty, mode, experience, fee, sort]);

  return (
    <section className="bc-section" id="doctor-directory">
      <div className="bc-section-heading">
        <span className="bc-eyebrow">BLOOMCARE DOCTOR DIRECTORY</span>
        <h2>Find the Right Doctor for You</h2>
        <p>Explore fictional sample profiles to preview how a women's healthcare directory can work.</p>
      </div>
      <div className="bc-filter-panel">
        <input aria-label="Search doctors" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search doctors by name, speciality or location" />
        <select value={specialty} onChange={e=>setSpecialty(e.target.value)} aria-label="Filter by specialisation">
          {specialties.map(s=><option key={s}>{s}</option>)}
        </select>
        <select value={mode} onChange={e=>setMode(e.target.value)} aria-label="Filter by consultation type">
          <option>All</option><option>Audio</option><option>Video</option><option>In-Person</option>
        </select>
        <select value={experience} onChange={e=>setExperience(e.target.value)} aria-label="Filter by experience">
          <option value="Any">Any experience</option><option value="5+">5+ years</option><option value="10+">10+ years</option>
        </select>
        <select value={fee} onChange={e=>setFee(e.target.value)} aria-label="Filter by fee">
          <option>Any</option><option>Under ₹600</option><option>₹600–₹800</option><option>Above ₹800</option>
        </select>
        <select value={sort} onChange={e=>setSort(e.target.value)} aria-label="Sort doctors">
          <option value="recommended">Recommended order</option><option value="experience">Most experienced</option><option value="low">Fee: Low to High</option><option value="high">Fee: High to Low</option>
        </select>
      </div>
      <div className="bc-results-line">{filtered.length} sample profile{filtered.length===1?"":"s"} found</div>
      <div className="bc-doctor-grid">
        {filtered.map(d=><DoctorCard key={d.id} doctor={d} onView={onView} onBook={onBook}/>)}
      </div>
      {!filtered.length && <div className="bc-empty">No sample doctors match those filters. Try changing your search.</div>}
    </section>
  );
}
