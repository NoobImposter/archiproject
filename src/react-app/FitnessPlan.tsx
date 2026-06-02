import { useState } from "react";
import { useAppContext } from "./AppContext";
import { workoutRoutine, dietPlans } from "./data";

// ─── Goal label mapping ───────────────────────────────────────────────────────
const GOAL_CATEGORY_MAP: Record<string, string> = {
  build: "Build Muscle",
  lose: "Lose Weight",
  maintain: "Maintain Fitness",
};

const GOAL_LABEL_MAP: Record<string, string> = {
  build: "Build Muscle",
  lose: "Lose Weight",
  maintain: "Maintain Fitness",
};

const GOAL_BADGE_MAP: Record<string, string> = {
  build: "Strength Focus",
  lose: "High Intensity",
  maintain: "Balanced Routine",
};

const DIET_BADGE_MAP: Record<string, string> = {
  build: "~2,800 kcal",
  lose: "~1,600 kcal",
  maintain: "~2,200 kcal",
};

// ─── Component ────────────────────────────────────────────────────────────────
export const FitnessPlan = () => {
  const { goal } = useAppContext();

  const category = goal ? GOAL_CATEGORY_MAP[goal] : null;

  // Get data filtered by goal category
  const workoutData = workoutRoutine.find((w) => w.category === category);
  const dietData = dietPlans.find((d) => d.category === category);

  // Track completed exercises by name
  const [completedNames, setCompletedNames] = useState<string[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggleComplete = (name: string) => {
    setCompletedNames((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const totalExercises = workoutData?.exercises.length ?? 0;
  const completedCount = completedNames.length;
  const percentage =
    totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0;

  // ─── No goal selected ──────────────────────────────────────────────────────
  if (!goal || !workoutData || !dietData) {
    return (
      <div style={styles.emptyState}>
        <div style={styles.emptyInner}>
          <span style={styles.emptyIcon}>🎯</span>
          <h2 style={styles.emptyTitle}>No Goal Selected</h2>
          <p style={styles.emptyText}>
            Go back and pick a fitness goal to see your personalised plan.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* ── Header ── */}
     

      {/* ── Main ── */}
      <main style={styles.main}>
        {/* Hero */}
        <section style={{ marginBottom: "40px" }}>
          <div style={styles.goalPill}>{GOAL_LABEL_MAP[goal]}</div>
          <h1 style={styles.heroTitle}>Your Daily Plan</h1>
          <p style={styles.heroSubtitle}>
            Personalised workout and nutrition guide tailored to your{" "}
            <strong>{GOAL_LABEL_MAP[goal].toLowerCase()}</strong> goal.
          </p>
        </section>

        <div style={styles.gridSplit}>
          {/* ── Workout Column ── */}
          <section style={styles.workoutColumn}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>
                <span style={styles.titleIcon}>🏋️</span>
                Workout Routine
              </h2>
              <span style={styles.badgePrimary}>{GOAL_BADGE_MAP[goal]}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {workoutData.exercises.map((exercise, idx) => {
                const isCompleted = completedNames.includes(exercise.name);
                const isHovered = hoveredId === `ex-${exercise.name}`;
                const isTimeBased =
                  exercise.name === "Running" ||
                  exercise.name === "Jogging" ||
                  exercise.name === "Yoga" ||
                  exercise.name === "Plank";

                return (
                  <div
                    key={exercise.name}
                    onClick={() => toggleComplete(exercise.name)}
                    onMouseEnter={() => setHoveredId(`ex-${exercise.name}`)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      ...styles.exerciseCard,
                      ...(isCompleted ? styles.cardCompleted : {}),
                      ...(isHovered ? styles.exerciseCardHover : {}),
                      cursor: "pointer",
                    }}
                  >
                    {/* Number / check badge */}
                    <div
                      style={{
                        ...styles.exerciseNumber,
                        ...(isCompleted ? styles.exerciseNumberDone : {}),
                      }}
                    >
                      {isCompleted ? "✓" : idx + 1}
                    </div>

                    <div style={{ flexGrow: 1 }}>
                      <h3
                        style={{
                          ...styles.cardHeader,
                          ...(isCompleted ? styles.cardHeaderDone : {}),
                        }}
                      >
                        {exercise.name}
                      </h3>
                      <div style={styles.cardSpecs}>
                        <span style={styles.specTag}>{exercise.sets} Sets</span>
                        <span style={styles.specTag}>
                          {exercise.reps} {isTimeBased ? "min" : "Reps"}
                        </span>
                      </div>
                    </div>

                    {/* Status pill — right side */}
                    <div
                      style={{
                        ...styles.statusPill,
                        ...(isCompleted ? styles.statusPillDone : styles.statusPillDefault),
                      }}
                    >
                      {isCompleted ? "Done ✓" : "Tap to Complete"}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress */}
            <div style={styles.progressWidget}>
              <div style={styles.progressTextRow}>
                <span style={styles.progressLabel}>Session Progress</span>
                <span style={styles.progressPercent}>
                  {percentage === 100 ? "🎉 Workout Complete!" : `${percentage}%`}
                </span>
              </div>
              <div style={styles.progressBarBg}>
                <div
                  style={{ ...styles.progressBarFill, width: `${percentage}%` }}
                />
              </div>
              <p style={styles.progressSub}>
                {completedCount} of {totalExercises} exercises completed
              </p>
            </div>
          </section>

          {/* ── Diet Column ── */}
          <section style={styles.dietColumn}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>
                <span style={styles.titleIcon}>🥗</span>
                Meal Plan
              </h2>
              <span style={styles.badgeSecondary}>{DIET_BADGE_MAP[goal]}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {dietData.meals.map((meal) => {
                const isHovered = hoveredId === `meal-${meal.id}`;

                return (
                  <div
                    key={meal.id}
                    onMouseEnter={() => setHoveredId(`meal-${meal.id}`)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      ...styles.mealCard,
                      ...(isHovered ? styles.mealCardHover : {}),
                    }}
                  >
                    {/* Meal type strip */}
                    <div style={styles.mealTypeStrip}>{meal.type}</div>

                    <div style={styles.mealBody}>
                      <h3 style={styles.mealName}>{meal.name}</h3>
                      <p style={styles.mealDescription}>{meal.description}</p>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        {meal.keywords.map((kw, i) => (
                          <span key={i} style={styles.tagLabel}>
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      {/* ── Footer ── */}
  
    </div>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: "#f7f9fb",
    color: "#191c1e",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Inter', sans-serif",
    WebkitFontSmoothing: "antialiased",
  },

  // Empty state
  emptyState: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f7f9fb",
    fontFamily: "'Inter', sans-serif",
  },
  emptyInner: {
    textAlign: "center",
    padding: "48px",
    backgroundColor: "#ffffff",
    borderRadius: "1rem",
    border: "1px solid #bccbb9",
    maxWidth: "400px",
  },
  emptyIcon: { fontSize: "48px" },
  emptyTitle: { fontSize: "24px", fontWeight: 700, margin: "16px 0 8px" },
  emptyText: { fontSize: "15px", color: "#505f76", margin: 0 },

  // Header
  header: {
    position: "fixed",
    top: 0,
    width: "100%",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #bccbb9",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    zIndex: 50,
  },
  headerContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "64px",
    paddingLeft: "64px",
    paddingRight: "64px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  logo: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#006e2f",
    letterSpacing: "-0.02em",
  },
  desktopNav: { display: "flex", gap: "24px", alignItems: "center" },
  navLink: { fontSize: "14px", color: "#3d4a3d", textDecoration: "none" },
  navLinkActive: {
    color: "#006e2f",
    borderBottom: "2px solid #006e2f",
    paddingBottom: "4px",
  },
  getStartedBtn: {
    backgroundColor: "#565e74",
    color: "#ffffff",
    padding: "8px 24px",
    borderRadius: "9999px",
    fontSize: "12px",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
  },

  // Main
  main: {
    flexGrow: 1,
    paddingTop: "96px",
    paddingBottom: "80px",
    paddingLeft: "64px",
    paddingRight: "64px",
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
    boxSizing: "border-box",
  },

  // Hero
  goalPill: {
    display: "inline-block",
    backgroundColor: "rgba(0,110,47,0.1)",
    color: "#006e2f",
    padding: "4px 14px",
    borderRadius: "9999px",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: "12px",
  },
  heroTitle: {
    fontSize: "48px",
    fontWeight: 700,
    letterSpacing: "-0.04em",
    margin: "0 0 8px 0",
  },
  heroSubtitle: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#505f76",
    margin: 0,
  },

  // Grid
  gridSplit: {
    display: "grid",
    gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
    gap: "24px",
  },
  workoutColumn: { gridColumn: "span 7" },
  dietColumn: { gridColumn: "span 5" },

  // Section header
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    margin: 0,
  },
  titleIcon: { fontSize: "20px" },
  badgePrimary: {
    backgroundColor: "rgba(34,197,94,0.1)",
    color: "#006e2f",
    padding: "4px 10px",
    borderRadius: "9999px",
    fontSize: "12px",
    fontWeight: 600,
  },
  badgeSecondary: {
    backgroundColor: "rgba(80,95,118,0.1)",
    color: "#505f76",
    padding: "4px 10px",
    borderRadius: "9999px",
    fontSize: "12px",
    fontWeight: 600,
  },

  // Exercise card
  exerciseCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #bccbb9",
    padding: "16px 20px",
    borderRadius: "0.75rem",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    transition: "all 0.2s ease",
  },
  exerciseCardHover: {
    borderColor: "#006e2f",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(0,110,47,0.1)",
  },
  cardCompleted: { opacity: 0.5 },
  exerciseNumber: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "rgba(0,110,47,0.08)",
    color: "#006e2f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "14px",
    flexShrink: 0,
  },
  cardHeader: {
    fontSize: "17px",
    fontWeight: 600,
    margin: "0 0 6px 0",
  },
  cardSpecs: { display: "flex", gap: "8px" },
  specTag: {
    backgroundColor: "#eceef0",
    padding: "3px 10px",
    borderRadius: "9999px",
    fontSize: "12px",
    fontWeight: 600,
    color: "#3d4a3d",
  },
  cardHeaderDone: {
    textDecoration: "line-through",
    color: "#888",
  },
  exerciseNumberDone: {
    backgroundColor: "#006e2f",
    color: "#ffffff",
  },
  statusPill: {
    padding: "6px 14px",
    borderRadius: "9999px",
    fontSize: "11px",
    fontWeight: 700,
    whiteSpace: "nowrap" as const,
    transition: "all 0.25s ease",
    letterSpacing: "0.03em",
    userSelect: "none" as const,
  },
  statusPillDefault: {
    backgroundColor: "#eceef0",
    color: "#505f76",
    border: "1px dashed #bccbb9",
  },
  statusPillDone: {
    backgroundColor: "#006e2f",
    color: "#ffffff",
    border: "1px solid #006e2f",
  },

  // Progress widget
  progressWidget: {
    marginTop: "32px",
    padding: "24px",
    backgroundColor: "#eceef0",
    borderRadius: "0.75rem",
    border: "1px solid #bccbb9",
  },
  progressTextRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  progressLabel: { fontSize: "18px", fontWeight: 600 },
  progressPercent: { fontSize: "13px", fontWeight: 700, color: "#006e2f" },
  progressBarBg: {
    width: "100%",
    height: "10px",
    backgroundColor: "rgba(0,110,47,0.1)",
    borderRadius: "9999px",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#006e2f",
    transition: "width 0.5s ease-out",
  },
  progressSub: {
    fontSize: "12px",
    color: "#505f76",
    margin: "10px 0 0 0",
  },

  // Meal card
  mealCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #bccbb9",
    borderRadius: "0.75rem",
    overflow: "hidden",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  mealCardHover: {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  },
  mealTypeStrip: {
    backgroundColor: "#006e2f",
    color: "#ffffff",
    padding: "6px 16px",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  mealBody: { padding: "16px" },
  mealName: { fontSize: "17px", fontWeight: 600, margin: "0 0 6px 0" },
  mealDescription: {
    fontSize: "13px",
    lineHeight: "1.5",
    color: "#505f76",
    margin: "0 0 12px 0",
  },
  tagLabel: {
    backgroundColor: "#eceef0",
    padding: "3px 10px",
    borderRadius: "9999px",
    fontSize: "11px",
    fontWeight: 600,
    color: "#3d4a3d",
  },

  // Footer
  footer: {
    backgroundColor: "#eceef0",
    borderTop: "1px solid #bccbb9",
    marginTop: "40px",
  },
  footerContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "24px 64px",
  },
  footerLogo: { fontSize: "18px", fontWeight: 700, color: "#006e2f" },
  footerLinks: { display: "flex", gap: "24px" },
  footerLink: { fontSize: "14px", color: "#3d4a3d", textDecoration: "none" },
  footerCopyright: { fontSize: "13px", color: "#3d4a3d", margin: 0 },
};