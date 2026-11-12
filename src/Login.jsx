import React, { useState } from "react";
import "./Auth.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function hashPassword(password, salt) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: encoder.encode(salt),
      iterations: 120000,
      hash: "SHA-256",
    },
    key,
    256
  );

  return Array.from(new Uint8Array(bits))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export default function Login({ onNavigate, onSuccess }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const goTo = (page) => {
    setError("");
    setMessage("");
    onNavigate?.(page);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim() || !password) {
      setError("Please enter your email address and password.");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("bloomcareUser") || "null");
    if (!savedUser || savedUser.email.toLowerCase() !== email.trim().toLowerCase()) {
      setError("No BloomCare demo account was found with this email. Please register first.");
      return;
    }

    setLoading(true);
    try {
      const enteredHash = await hashPassword(password, savedUser.passwordSalt);
      if (enteredHash !== savedUser.passwordHash) {
        setError("Incorrect password. Please try again.");
        return;
      }

      const profile = { ...savedUser };
      delete profile.passwordHash;
      delete profile.passwordSalt;

      const sessionValue = JSON.stringify(profile);
      if (rememberMe) {
        localStorage.setItem("bloomcareSession", sessionValue);
        sessionStorage.removeItem("bloomcareSession");
      } else {
        sessionStorage.setItem("bloomcareSession", sessionValue);
        localStorage.removeItem("bloomcareSession");
      }

      setMessage("Login successful. Welcome back!");
      onSuccess?.(profile);
    } catch {
      setError("Unable to complete demo login in this browser. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRecovery = (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!recoveryEmail.trim() || !EMAIL_RE.test(recoveryEmail.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("bloomcareUser") || "null");
    if (!savedUser || savedUser.email.toLowerCase() !== recoveryEmail.trim().toLowerCase()) {
      setError("We couldn't find a demo account with that email address.");
      return;
    }

    setMessage("Your email matches a BloomCare demo account. Password recovery is only a demo here; no email has been sent.");
  };

  return (
    <main className="bc-auth-page">
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
          <p className="bc-auth-eyebrow">A little care, every day</p>
          <h1>Welcome Back to BloomCare</h1>
          <p>Your wellness journey matters. Continue taking care of yourself with BloomCare.</p>
        </div>
        <div className="bc-auth-art-footer">Care for every chapter of you.</div>
      </section>

      <section className="bc-auth-form-side">
        <div className="bc-auth-form-wrap">
          {mode === "login" ? (
            <>
              <p className="bc-auth-eyebrow">YOUR SPACE TO FEEL GOOD</p>
              <h2>Welcome back</h2>
              <p className="bc-auth-subtitle">Sign in to continue your BloomCare journey.</p>

              <form onSubmit={handleLogin} noValidate>
                <label className="bc-field">
                  <span>Email address</span>
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>

                <label className="bc-field">
                  <span>Password</span>
                  <div className="bc-password-wrap">
                    <input
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="button" className="bc-show-password" onClick={() => setShowPassword((v) => !v)}>
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </label>

                <div className="bc-auth-options">
                  <label className="bc-check-line">
                    <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                    <span>Remember me</span>
                  </label>
                  <button type="button" className="bc-text-link" onClick={() => { setMode("forgot"); setError(""); setMessage(""); }}>
                    Forgot password?
                  </button>
                </div>

                {error && <p className="bc-form-message error" role="alert">{error}</p>}
                {message && <p className="bc-form-message success" role="status">{message}</p>}

                <button className="bc-primary-button" type="submit" disabled={loading}>
                  {loading ? "Signing in..." : "Login"}
                </button>
              </form>

              <p className="bc-auth-switch">Don't have an account? <button type="button" onClick={() => goTo("register")}>Create account</button></p>
              <button type="button" className="bc-back-home" onClick={() => goTo("home")}>← Back to BloomCare</button>
            </>
          ) : (
            <>
              <p className="bc-auth-eyebrow">ACCOUNT SUPPORT</p>
              <h2>Reset your password</h2>
              <p className="bc-auth-subtitle">Enter the email address linked to your demo account.</p>
              <form onSubmit={handleRecovery} noValidate>
                <label className="bc-field">
                  <span>Email address</span>
                  <input type="email" autoComplete="email" placeholder="you@example.com" value={recoveryEmail} onChange={(e) => setRecoveryEmail(e.target.value)} />
                </label>
                {error && <p className="bc-form-message error" role="alert">{error}</p>}
                {message && <p className="bc-form-message success" role="status">{message}</p>}
                <button className="bc-primary-button" type="submit">Continue</button>
              </form>
              <button type="button" className="bc-back-home" onClick={() => { setMode("login"); setError(""); setMessage(""); }}>← Back to Login</button>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
