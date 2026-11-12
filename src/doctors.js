// Fictional frontend demonstration profiles. These are NOT real or verified doctors.
const doctors = [
  {
    id: 1, name: "Dr. Ananya Raman", specialty: "Gynaecologist",
    qualifications: "MBBS, MS (Obstetrics & Gynaecology) — demo credentials",
    experience: 12, clinic: "Bloom Women's Care Centre (sample clinic)",
    fee: 600, location: "Anna Nagar, Chennai (sample location)",
    city: "Chennai", mode: ["Audio", "Video", "In-Person"],
    image: "/images/doctor1.avif",
    intro: "A fictional profile created to demonstrate how patients can explore women's healthcare services.",
    expertise: ["General gynaecology", "Menstrual health education", "Preventive care"],
    languages: ["English", "Tamil"], address: "Sample address, Anna Nagar, Chennai",
    timings: "Mon–Fri, 10:00 AM–4:00 PM",
    reviews: [{name:"Demo patient", text:"Sample review shown for layout demonstration.", rating:5}]
  },
  {
    id: 2, name: "Dr. Meera Krishnan", specialty: "Obstetrician",
    qualifications: "MBBS, DGO — demo credentials",
    experience: 9, clinic: "Little Steps Maternity Clinic (sample clinic)",
    fee: 700, location: "Adyar, Chennai (sample location)",
    city: "Chennai", mode: ["Audio", "Video", "In-Person"],
    image: "/images/doctor2.avif",
    intro: "A fictional obstetrics profile for demonstrating pregnancy-care discovery.",
    expertise: ["Pregnancy education", "Antenatal guidance", "Postpartum education"],
    languages: ["English", "Tamil"], address: "Sample address, Adyar, Chennai",
    timings: "Tue–Sat, 9:30 AM–2:00 PM",
    reviews: [{name:"Demo patient", text:"Example review only; not a genuine patient testimonial.", rating:5}]
  },
  {
    id: 3, name: "Dr. Kavya Nair", specialty: "Fertility Specialist",
    qualifications: "MBBS, MD (Reproductive Medicine) — demo credentials",
    experience: 15, clinic: "New Beginnings Fertility Hub (sample clinic)",
    fee: 900, location: "T. Nagar, Chennai (sample location)",
    city: "Chennai", mode: ["Audio", "Video", "In-Person"],
    image: "/images/doctor3.jpg",
    intro: "A fictional specialist profile for a sample fertility-care directory.",
    expertise: ["Fertility education", "Preconception counselling", "Reproductive health"],
    languages: ["English", "Malayalam", "Tamil"], address: "Sample address, T. Nagar, Chennai",
    timings: "Mon, Wed, Fri, 11:00 AM–5:00 PM",
    reviews: [{name:"Demo patient", text:"Sample review for demonstration purposes.", rating:4}]
  },
  {
    id: 4, name: "Dr. Nisha Varghese", specialty: "Reproductive Health Specialist",
    qualifications: "MBBS, MS — demo credentials",
    experience: 7, clinic: "WellSpring Women's Clinic (sample clinic)",
    fee: 500, location: "Velachery, Chennai (sample location)",
    city: "Chennai", mode: ["Audio", "Video"],
    image: "/images/doctor4.avif",
    intro: "A fictional reproductive-health profile. No real-world service is offered.",
    expertise: ["Reproductive health education", "Cycle concerns", "Wellness guidance"],
    languages: ["English", "Tamil"], address: "Sample address, Velachery, Chennai",
    timings: "Mon–Fri, 12:00 PM–6:00 PM",
    reviews: [{name:"Demo patient", text:"Not a verified review.", rating:5}]
  },
  {
    id: 5, name: "Dr. Divya Subramanian", specialty: "Pregnancy Care Specialist",
    qualifications: "MBBS, DGO, DNB — demo credentials",
    experience: 11, clinic: "Mother & Bloom Centre (sample clinic)",
    fee: 750, location: "Coimbatore (sample location)",
    city: "Coimbatore", mode: ["Audio", "Video", "In-Person"],
    image: "/images/doctor5.avif",
    intro: "A fictional profile to demonstrate pregnancy-care specialist listings.",
    expertise: ["Pregnancy wellness education", "Antenatal information", "Postpartum care"],
    languages: ["English", "Tamil"], address: "Sample address, Coimbatore",
    timings: "Mon–Sat, 9:00 AM–1:00 PM",
    reviews: [{name:"Demo patient", text:"Demo review; no patient relationship exists.", rating:5}]
  },
  {
    id: 6, name: "Dr. Riya Menon", specialty: "Menstrual Health Specialist",
    qualifications: "MBBS, MD — demo credentials",
    experience: 6, clinic: "The Women's Wellness Studio (sample clinic)",
    fee: 450, location: "Madurai (sample location)",
    city: "Madurai", mode: ["Audio", "Video", "In-Person"],
    image: "/images/doctor6.webp",
    intro: "A fictional profile for demonstrating menstrual-health information and appointment flows.",
    expertise: ["Menstrual health education", "Cycle-related concerns", "Preventive wellness"],
    languages: ["English", "Tamil"], address: "Sample address, Madurai",
    timings: "Tue–Sun, 10:00 AM–3:00 PM",
    reviews: [{name:"Demo patient", text:"Example content only.", rating:4}]
  }
];
export default doctors;
