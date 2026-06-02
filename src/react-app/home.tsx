import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "./AppContext";

type GoalType = "lose" | "build" | "maintain";

interface FormDataState {
  fullName: string;
  age: string;
  weight: string;
  goal: GoalType;
}

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { setGoal } = useAppContext();

  const [formData, setFormData] = useState<FormDataState>({
    fullName: "",
    age: "",
    weight: "",
    goal: "build",
  });

  // Handle text inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id === "name" ? "fullName" : id]: value,
    }));
  };

  // Select goal chip
  const selectGoal = (goal: GoalType) => {
    setFormData((prev) => ({ ...prev, goal }));
  };

  // FINAL SUBMIT (FIXED)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Selected Goal:", formData.goal);

    setGoal(formData.goal); // ✅ global state
    navigate("/plan"); // ✅ next page
  };

  return (
    <section style={styles.section}>
      <div style={styles.headerTextContainer}>
        <h1 style={styles.title}>Complete Your Profile</h1>
        <p style={styles.subtitle}>
          We'll use these details to generate a personalized fitness path tailored to your body and goals.
        </p>
      </div>

      <div style={styles.card}>
        <form style={styles.form} onSubmit={handleSubmit}>
          {/* Inputs */}
          <div style={styles.formGrid}>
            <div style={styles.fullWidth}>
              <label style={styles.label}>FULL NAME</label>
              <input
              required
                style={styles.input}
                id="name"
                placeholder="Alex Johnson"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label style={styles.label}>AGE (YEARS)</label>
              <input
              required
                style={styles.input}
                id="age"
                type="number"
                placeholder="28"
                value={formData.age}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label style={styles.label}>WEIGHT (KG)</label>
              <input
              required
                style={styles.input}
                id="weight"
                type="number"
                placeholder="72"
                value={formData.weight}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Goal Chips */}
          <div style={{ paddingTop: "20px" }}>
            <label style={styles.label}>CHOOSE YOUR PRIMARY GOAL</label>

            <div style={styles.chipGrid}>
              {[
                { key: "lose", icon: "trending_down", label: "Lose Weight" },
                { key: "build", icon: "fitness_center", label: "Build Muscle" },
                { key: "maintain", icon: "auto_awesome", label: "Maintain" },
              ].map(({ key, icon, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => selectGoal(key as GoalType)}
                  style={{
                    ...styles.chip,
                    ...(formData.goal === key
                      ? styles.chipActive
                      : styles.chipInactive),
                  }}
                >
                  <span className="material-symbols-outlined" style={styles.chipIcon}>
                    {icon}
                  </span>
                  <span style={styles.chipText}>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div style={{ paddingTop: "32px" }}>
            <button type="submit" style={styles.submitBtn}>
              Generate Plan
              <span className="material-symbols-outlined">bolt</span>
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div style={styles.verificationBar}>
        <div style={styles.divider}></div>
        <div style={styles.verificationContent}>
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
            verified_user
          </span>
          <span style={styles.verificationText}>
            Privacy Focused AI Analysis
          </span>
        </div>
        <div style={styles.divider}></div>
      </div>
    </section>
  );
};



// All styles for the Home page
const styles: { [key: string]: React.CSSProperties } = {
  section: {
    width: '100%',
    maxWidth: '620px',
    margin: '0 auto',
    padding: '48px 16px',
  },
  headerTextContainer: {
    marginBottom: '36px',
    textAlign: 'center',
  },
  title: {
    fontSize: 'clamp(22px, 5vw, 32px)' as any,
    fontWeight: 700,
    letterSpacing: '-0.02em',
    color: '#191c1e',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#3d4a3d',
  },
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #bccbb9',
    borderRadius: '12px',
    padding: 'clamp(20px, 4vw, 32px)' as any,
    boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
    width: '100%',
    boxSizing: 'border-box',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '20px',
  },
  fullWidth: {
    gridColumn: '1 / -1',
  },
  label: {
    display: 'block',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.07em',
    color: '#3d4a3d',
    marginBottom: '6px',
    textTransform: 'uppercase',
  },
  input: {
    width: '100%',
    height: '44px',
    backgroundColor: '#ffffff',
    border: '1px solid #bccbb9',
    borderRadius: '8px',
    padding: '0 14px',
    fontSize: '14px',
    boxSizing: 'border-box',
    outline: 'none',
    color: '#191c1e',
  },
  chipGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '12px',
    marginTop: '10px',
  },
  chip: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 12px',
    borderWidth: '1.5px',
    borderStyle: 'solid',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    gap: '8px',
  },
  chipInactive: {
    borderColor: '#bccbb9',
    backgroundColor: '#f2f4f6',
  },
  chipActive: {
    borderColor: '#006e2f',
    backgroundColor: 'rgba(0, 110, 47, 0.05)',
    boxShadow: '0 0 0 3px rgba(0, 110, 47, 0.12)',
  },
  chipIcon: {
    color: '#006e2f',
    fontSize: '24px',
  },
  chipText: {
    fontSize: '13px',
    fontWeight: 700,
    color: '#191c1e',
  },
  submitBtn: {
    width: '100%',
    height: '50px',
    backgroundColor: '#22c55e',
    color: '#004b1e',
    fontSize: '17px',
    fontWeight: 700,
    borderRadius: '9999px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    transition: 'all 0.2s',
  },
  verificationBar: {
    marginTop: '28px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    opacity: 0.6,
  },
  divider: {
    height: '1px',
    flexGrow: 1,
    backgroundColor: '#bccbb9',
  },
  verificationContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    whiteSpace: 'nowrap',
  },
  verificationText: {
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
  },
};

export default Home;