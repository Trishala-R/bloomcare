import React, { useMemo, useState } from "react";
import "./Auth.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const JOURNEYS = [
  { value: "period", title: "Period Tracking", description: "Understand and track your menstrual cycle.", icon: "◒" },
  { value: "conceive", title: "Trying to Conceive", description: "Guidance while planning a pregnancy.", icon: "♡" },
  { value: "pregnant", title: "I'm Pregnant", description: "Support through your pregnancy journey.", icon: "✿" },
  { value: "baby", title: "Baby Growth & Development", description: "Follow your little one's milestones.", icon: "☼" },
  { value: "wellness", title: "Women's Health & Wellness", description: "Explore everyday health and wellbeing.", icon: "❀" },
];

async function hashPassword(password, salt) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: encoder.encode(salt), iterations: 120000, hash: "SHA-256" },
    key,
    256
  );
  return Array.from(new Uint8Array(bits)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function makeSalt() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export default function Register({ onNavigate, onSuccess }) {
  const [form, setForm] = useState({
    fullName: "", dob: "", email: "", mobile: "", password: "", confirmPassword: "",
    journey: "", consent: false, newsletters: false, promotions: false,
    lastPeriod: "", cycleLength: "28", periodDuration: "5", dueDate: "", pregnancyWeek: "",
    babyName: "", babyDob: "", babyGender: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));

  const passwordStrength = useMemo(() => {
    const p = form.password;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[a-z]/.test(p)) score++;
    if (/\d/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  }, [form.password]);

  const validate = () => {
    if (!form.fullName.trim() || !form.dob || !form.email.trim() || !form.mobile.trim() || !form.password || !form.confirmPassword) {
      return "Please complete all required personal information fields.";
    }
    if (!EMAIL_RE.test(form.email.trim())) return "Please enter a valid email address.";
    if (!/^\+?[0-9\s-]{7,15}$/.test(form.mobile.trim())) return "Please enter a valid mobile number (7–15 digits).";
    if (form.password.length < 8) return "Your password must contain at least 8 characters.";
    if (!/[A-Za-z]/.test(form.password) || !/\d/.test(form.password)) return "Use at least one letter and one number in your password.";
    if (form.password !== form.confirmPassword) return "Your passwords do not match.";
    if (!form.journey) return "Please choose the journey that best describes you.";
    if (!form.consent) return "Please agree to the Terms & Conditions and Privacy Policy to continue.";

    if (form.journey === "period" && !form.lastPeriod) return "Please enter the first day of your last period.";
    if (form.journey === "pregnant" && !form.lastPeriod && !form.dueDate) return "For your pregnancy profile, enter your last period date or estimated due date.";
    if (form.journey === "baby" && !form.babyDob) return "Please enter your baby's date of birth.";
    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    const validationMessage = validate();
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    const existingUser = JSON.parse(localStorage.getItem("bloomcareUser") || "null");
    if (existingUser?.email?.toLowerCase() === form.email.trim().toLowerCase()) {
      setError("An account with this email already exists. Please log in instead.");
      return;
    }

    setLoading(true);
    try {
      const salt = makeSalt();
      const passwordHash = await hashPassword(form.password, salt);
      const profile = {
        fullName: form.fullName.trim(),
        dob: form.dob,
        email: form.email.trim().toLowerCase(),
        mobile: form.mobile.trim(),
        journey: form.journey,
        journeyTitle: JOURNEYS.find((item) => item.value === form.journey)?.title || "",
        healthDetails: {
          lastPeriod: form.lastPeriod || "",
          cycleLength: form.journey === "period" || form.journey === "conceive" ? form.cycleLength : "",
          periodDuration: form.journey === "period" ? form.periodDuration : "",
          dueDate: form.dueDate || "",
          pregnancyWeek: form.pregnancyWeek || "",
          babyName: form.babyName.trim(),
          babyDob: form.babyDob || "",
          babyGender: form.babyGender || "",
        },
        preferences: { newsletters: form.newsletters, promotions: form.promotions },
        consentAcceptedAt: new Date().toISOString(),
        passwordSalt: salt,
        passwordHash,
      };

      localStorage.setItem("bloomcareUser", JSON.stringify(profile));
      const publicProfile = { ...profile };
      delete publicProfile.passwordHash;
      delete publicProfile.passwordSalt;
      sessionStorage.setItem("bloomcareSession", JSON.stringify(publicProfile));

      setMessage("Your BloomCare demo account has been created!");
      onSuccess?.(publicProfile);
    } catch {
      setError("We couldn't create your demo account in this browser. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const selectedJourney = form.journey;

  return (
    <main className="bc-auth-page bc-register-page">
      <section className="bc-auth-art">
        <div className="bc-auth-brand">BloomCare</div>
        <div className="bc-auth-art-content">
          <div className="bc-auth-illustration" aria-hidden="true">
            <span className="bc-illustration-sun" />
            <span className="bc-illustration-flower">✿</span>
            <span className="bc-illustration-leaf leaf-one" />
            <span className="bc-illustration-leaf leaf-two" />
            <div className="bc-illustration-person">
              <span className="person-hair" />
              <span className="person-face" />
              <span className="person-body" />
              <span className="person-arm" />
            </div>
            <span className="bc-illustration-heart">♡</span>
          </div>
          <p className="bc-auth-eyebrow">YOUR JOURNEY, YOUR WAY</p>
          <h1>Begin Your Wellness Journey</h1>
          <p>Create your BloomCare account and get personalised guidance for every stage of your journey.</p>
        </div>
        <div className="bc-auth-art-footer">A supportive space for every chapter.</div>
      </section>

      <section className="bc-auth-form-side bc-register-form-side">
        <div className="bc-auth-form-wrap bc-register-form-wrap">
          <p className="bc-auth-eyebrow">LET'S GET TO KNOW YOU</p>
          <h2>Create your account</h2>
          <p className="bc-auth-subtitle">A few details will help us shape your BloomCare experience.</p>

          <form onSubmit={handleSubmit} noValidate>
            <h3 className="bc-form-section-title">Personal information</h3>
            <div className="bc-form-grid">
              <label className="bc-field">
                <span>Full name *</span>
                <input value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Your full name" autoComplete="name" />
              </label>
              <label className="bc-field">
                <span>Date of birth *</span>
                <input type="date" value={form.dob} max={new Date().toISOString().slice(0, 10)} onChange={(e) => update("dob", e.target.value)} />
              </label>
              <label className="bc-field">
                <span>Email address *</span>
                <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" autoComplete="email" />
              </label>
              <label className="bc-field">
                <span>Mobile number *</span>
                <input type="tel" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} placeholder="Mobile number" autoComplete="tel" />
              </label>
              <label className="bc-field">
                <span>Password *</span>
                <div className="bc-password-wrap">
                  <input type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="At least 8 characters" autoComplete="new-password" />
                  <button type="button" className="bc-show-password" onClick={() => setShowPassword((v) => !v)}>{showPassword ? "Hide" : "Show"}</button>
                </div>
                <span className="bc-password-help">Use 8+ characters with at least one letter and one number.</span>
                <span className="bc-strength-track"><span style={{ width: `${(passwordStrength / 5) * 100}%` }} /></span>
                <span className="bc-password-help">Password strength: {passwordStrength <= 2 ? "Needs improvement" : passwordStrength <= 4 ? "Good" : "Strong"}</span>
              </label>
              <label className="bc-field">
                <span>Confirm password *</span>
                <div className="bc-password-wrap">
                  <input type={showConfirm ? "text" : "password"} value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} placeholder="Re-enter your password" autoComplete="new-password" />
                  <button type="button" className="bc-show-password" onClick={() => setShowConfirm((v) => !v)}>{showConfirm ? "Hide" : "Show"}</button>
                </div>
              </label>
            </div>

            <div className="bc-section-divider" />
            <h3 className="bc-form-section-title">What brings you to BloomCare?</h3>
            <p className="bc-auth-subtitle">Choose one primary journey. You can explore every other section whenever you like.</p>
            <div className="bc-journey-grid">
              {JOURNEYS.map((journey) => (
                <label key={journey.value} className={`bc-journey-card ${selectedJourney === journey.value ? "selected" : ""}`}>
                  <input type="radio" name="journey" value={journey.value} checked={selectedJourney === journey.value} onChange={() => update("journey", journey.value)} />
                  <span className="bc-journey-icon">{journey.icon}</span>
                  <span className="bc-journey-copy"><strong>{journey.title}</strong><small>{journey.description}</small></span>
                </label>
              ))}
            </div>

            {selectedJourney && selectedJourney !== "wellness" && (
              <div className="bc-conditional-panel">
                <h3 className="bc-form-section-title">A little more about your journey</h3>
                <p className="bc-optional-note">These details help personalise your demo experience. Health information is optional unless marked otherwise.</p>

                {(selectedJourney === "period" || selectedJourney === "conceive") && (
                  <>
                    <label className="bc-field">
                      <span>Last menstrual period start date {selectedJourney === "period" ? "*" : "(optional)"}</span>
                      <input type="date" value={form.lastPeriod} onChange={(e) => update("lastPeriod", e.target.value)} />
                    </label>
                    <label className="bc-field">
                      <span>Average cycle length (days) {selectedJourney === "conceive" ? "(optional)" : "*"}</span>
                      <input type="number" min="15" max="60" value={form.cycleLength} onChange={(e) => update("cycleLength", e.target.value)} />
                    </label>
                    {selectedJourney === "period" && (
                      <label className="bc-field">
                        <span>Average period duration (days)</span>
                        <input type="number" min="1" max="10" value={form.periodDuration} onChange={(e) => update("periodDuration", e.target.value)} />
                      </label>
                    )}
                  </>
                )}

                {selectedJourney === "pregnant" && (
                  <>
                    <label className="bc-field"><span>Last menstrual period date (optional)</span><input type="date" value={form.lastPeriod} onChange={(e) => update("lastPeriod", e.target.value)} /></label>
                    <label className="bc-field"><span>Estimated due date (optional)</span><input type="date" value={form.dueDate} onChange={(e) => update("dueDate", e.target.value)} /></label>
                    <label className="bc-field"><span>Current pregnancy week (optional)</span><input type="number" min="1" max="42" placeholder="e.g. 12" value={form.pregnancyWeek} onChange={(e) => update("pregnancyWeek", e.target.value)} /></label>
                  </>
                )}

                {selectedJourney === "baby" && (
                  <>
                    <label className="bc-field"><span>Baby's name (optional)</span><input value={form.babyName} onChange={(e) => update("babyName", e.target.value)} placeholder="Baby's name" /></label>
                    <label className="bc-field"><span>Baby's date of birth *</span><input type="date" max={new Date().toISOString().slice(0, 10)} value={form.babyDob} onChange={(e) => update("babyDob", e.target.value)} /></label>
                    <label className="bc-field"><span>Gender (optional)</span><select value={form.babyGender} onChange={(e) => update("babyGender", e.target.value)}><option value="">Prefer not to say</option><option value="girl">Girl</option><option value="boy">Boy</option><option value="other">Other</option></select></label>
                  </>
                )}
              </div>
            )}

            <div className="bc-section-divider" />
            <h3 className="bc-form-section-title">Your preferences</h3>
            <div className="bc-consent-list">
              <label className="bc-consent-item required"><input type="checkbox" checked={form.consent} onChange={(e) => update("consent", e.target.checked)} /><span>I agree to BloomCare's <a href="/terms" target="_blank" rel="noreferrer">Terms &amp; Conditions</a> and <a href="/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>. <b>Required</b></span></label>
              <label className="bc-consent-item"><input type="checkbox" checked={form.newsletters} onChange={(e) => update("newsletters", e.target.checked)} /><span>I would like to receive women's health tips, pregnancy updates and educational newsletters from BloomCare.</span></label>
              <label className="bc-consent-item"><input type="checkbox" checked={form.promotions} onChange={(e) => update("promotions", e.target.checked)} /><span>I agree to receive promotional offers, product recommendations and special updates from BloomCare.</span></label>
            </div>

            {error && <p className="bc-form-message error" role="alert">{error}</p>}
            {message && <p className="bc-form-message success" role="status">{message}</p>}
            <button className="bc-primary-button" type="submit" disabled={loading}>{loading ? "Creating account..." : "Create Account"}</button>
          </form>

          <p className="bc-auth-switch">Already have an account? <button type="button" onClick={() => onNavigate?.("login")}>Login</button></p>
          <button type="button" className="bc-back-home" onClick={() => onNavigate?.("home")}>← Back to BloomCare</button>
          <p className="bc-demo-disclaimer">Demo only: profile data is stored in this browser. Do not use real passwords or sensitive medical details. This is not a secure production authentication system.</p>
        </div>
      </section>
    </main>
  );
}
