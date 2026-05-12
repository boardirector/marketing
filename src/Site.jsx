import { useEffect, useRef, useState } from "react";
import { B } from "./theme.js";
import { BDLogo } from "./BDLogo.jsx";
import { FlatIcon } from "./FlatIcon.jsx";

const A = (p) => `${import.meta.env.BASE_URL}${p.replace(/^\//, "")}`;

const HEADER_H = 64;

const NAV = [
  { id: "product", label: "המערכת" },
  { id: "features", label: "יכולות" },
  { id: "ai", label: "AI" },
  { id: "results", label: "תוצאות" },
  { id: "contact", label: "צרו קשר" },
];

/* ────────────────────────────────────────────
   Reusable building blocks
──────────────────────────────────────────── */

function Reveal({ children, delay = 0, as: Tag = "div", style = {} }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setSeen(true);
        }),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

function SectionEyebrow({ children, color = B.orange }) {
  return (
    <div
      style={{
        fontFamily: `'${B.fontEn}', sans-serif`,
        fontSize: 12,
        letterSpacing: 4,
        textTransform: "uppercase",
        fontWeight: 600,
        color,
        marginBottom: 14,
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children, style = {} }) {
  return (
    <h2
      style={{
        fontSize: "clamp(28px, 4vw, 44px)",
        fontWeight: 700,
        lineHeight: 1.2,
        color: B.bigStone,
        margin: 0,
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

function SectionLead({ children, style = {} }) {
  return (
    <p
      style={{
        fontSize: "clamp(15px, 1.4vw, 18px)",
        lineHeight: 1.6,
        color: B.gullGray,
        margin: "16px 0 0 0",
        maxWidth: 640,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

function PrimaryButton({ children, onClick, href }) {
  const style = {
    background: `linear-gradient(135deg, ${B.orange}, ${B.royalBlue})`,
    color: B.white,
    border: "none",
    padding: "14px 28px",
    borderRadius: 999,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: `inherit`,
    letterSpacing: 0.5,
    boxShadow: "0 8px 24px rgba(254,117,1,0.28)",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  };
  if (href) return <a href={href} style={style}>{children}</a>;
  return <button onClick={onClick} style={style}>{children}</button>;
}

function GhostButton({ children, onClick, href }) {
  const style = {
    background: "transparent",
    color: B.bigStone,
    border: `1px solid ${B.athensGray}`,
    padding: "13px 26px",
    borderRadius: 999,
    fontSize: 15,
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: `inherit`,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    transition: "all 0.25s ease",
  };
  if (href) return <a href={href} style={style}>{children}</a>;
  return <button onClick={onClick} style={style}>{children}</button>;
}

function DecoBlob({ color, size = 480, top, left, right, bottom, opacity = 0.07 }) {
  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        filter: "blur(60px)",
        opacity,
        top, left, right, bottom,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

/* ────────────────────────────────────────────
   Header
──────────────────────────────────────────── */

function Header({ activeId }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, height: HEADER_H,
        zIndex: 200,
        background: scrolled ? "rgba(255,255,255,0.86)" : "rgba(255,255,255,0.6)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled ? `1px solid ${B.athensGray}` : "1px solid transparent",
        display: "flex",
        alignItems: "center",
        padding: "0 32px",
        transition: "all 0.25s ease",
      }}
    >
      <a
        href="#top"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: 12,
          textDecoration: "none",
          color: B.bigStone,
        }}
      >
        <BDLogo size={26} color={B.orange} />
        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: B.bigStone,
            fontFamily: `'${B.fontEn}', sans-serif`,
            letterSpacing: 0.5,
          }}
        >
          Boardirector
        </span>
      </a>

      <nav style={{ display: "flex", alignItems: "center", gap: 28 }}>
        {NAV.map((n) => {
          const isActive = activeId === n.id;
          return (
            <a
              key={n.id}
              href={`#${n.id}`}
              style={{
                fontSize: 14,
                color: B.bigStone,
                opacity: isActive ? 1 : 0.65,
                textDecoration: "none",
                fontWeight: isActive ? 600 : 500,
                paddingBottom: 4,
                borderBottom: isActive ? `2px solid ${B.orange}` : "2px solid transparent",
                transition: "all 0.2s ease",
              }}
            >
              {n.label}
            </a>
          );
        })}
        <PrimaryButton href="#contact">תאמו דמו</PrimaryButton>
      </nav>
    </header>
  );
}

/* ────────────────────────────────────────────
   Sections
──────────────────────────────────────────── */

function Hero() {
  return (
    <section
      id="top"
      style={{
        position: "relative",
        minHeight: "100vh",
        paddingTop: HEADER_H + 60,
        paddingBottom: 80,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <DecoBlob color={B.orange} size={620} top="-180px" right="-120px" opacity={0.16} />
      <DecoBlob color={B.royalBlue} size={520} bottom="-180px" left="-160px" opacity={0.14} />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 32px",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: 60,
          alignItems: "center",
        }}
      >
        {/* Copy */}
        <div>
          <Reveal>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: B.whisper,
                color: B.royalBlue,
                padding: "7px 14px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 600,
                fontFamily: `'${B.fontEn}', sans-serif`,
                letterSpacing: 1,
                marginBottom: 24,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: B.royalBlue }} />
              BOARDIRECTOR 2.0 · עכשיו עם AI
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1
              style={{
                fontSize: "clamp(36px, 5vw, 60px)",
                fontWeight: 800,
                lineHeight: 1.1,
                color: B.bigStone,
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              ניהול חכם של ועדות{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${B.orange}, ${B.royalBlue})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                וישיבות
              </span>
              {" "}בעולם החדש
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p
              style={{
                fontSize: "clamp(16px, 1.6vw, 20px)",
                lineHeight: 1.55,
                color: B.gullGray,
                margin: "24px 0 0 0",
                maxWidth: 560,
              }}
            >
              מערכת אחת לכל מחזור החיים — מהגדרת הוועדה, דרך סדרי יום ופרוטוקולים, ועד מעקב כל החלטה ומשימה. הכל במקום אחד, עם AI שעובד לצידכם.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap" }}>
              <PrimaryButton href="#contact">תאמו דמו אישי ←</PrimaryButton>
              <GhostButton href="#features">גלו את היכולות</GhostButton>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div style={{ display: "flex", gap: 28, marginTop: 44, flexWrap: "wrap" }}>
              {[
                { num: "100%", label: "מוכנות לביקורת" },
                { num: "דקות", label: "להכנת ישיבה" },
                { num: "שניות", label: "לאיתור החלטה" },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: B.bigStone,
                      fontFamily: `'${B.fontEn}', sans-serif`,
                    }}
                  >
                    {s.num}
                  </div>
                  <div style={{ fontSize: 13, color: B.gullGray, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Visual — dashboard mockup */}
        <Reveal delay={120}>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                inset: -20,
                background: `linear-gradient(135deg, ${B.orange}30, ${B.royalBlue}30)`,
                filter: "blur(50px)",
                borderRadius: 32,
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                borderRadius: 18,
                overflow: "hidden",
                border: `1px solid ${B.athensGray}`,
                boxShadow: "0 30px 60px -20px rgba(23,33,52,0.25)",
                background: B.white,
              }}
            >
              <img
                src={A("/screenshots/dashboard.png")}
                alt="Boardirector dashboard"
                style={{ display: "block", width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TrustStrip() {
  const stats = [
    { num: "10–30", label: "ועדות פעילות בארגון" },
    { num: "מאות", label: "ישיבות בשנה" },
    { num: "אלפי", label: "החלטות ומשימות" },
    { num: "1", label: "מערכת אחת" },
  ];
  return (
    <section
      style={{
        background: B.bigStone,
        padding: "44px 32px",
        color: B.white,
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 24,
        }}
      >
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${B.orangeLight}, ${B.royalBlue})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.num}
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Problem() {
  const items = [
    { icon: "document", label: "פרוטוקולים בוורד" },
    { icon: "envelope", label: "סדרי יום במייל" },
    { icon: "chart", label: "משימות באקסל" },
    { icon: "folder", label: "מסמכים בתיקייה שאף אחד לא מוצא" },
  ];
  return (
    <section
      style={{
        padding: "120px 32px",
        background: B.white,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <DecoBlob color={B.red} size={420} top="-120px" left="-120px" opacity={0.06} />
      <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal>
          <SectionEyebrow color={B.red}>הבעיה</SectionEyebrow>
          <SectionTitle>המציאות שכולנו מכירים</SectionTitle>
          <SectionLead>
            כל גוף ציבורי מנהל עשרות ועדות, מאות ישיבות, אלפי החלטות. ובלי מערכת ייעודית — האחריות מתפזרת ביחד עם המידע.
          </SectionLead>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
            marginTop: 56,
          }}
        >
          {items.map((it, i) => (
            <Reveal key={it.label} delay={i * 90}>
              <div
                style={{
                  background: B.white,
                  border: `1px solid ${B.athensGray}`,
                  borderRadius: 16,
                  padding: 28,
                  textAlign: "right",
                  height: "100%",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: `${B.red}12`,
                    color: B.red,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 18,
                  }}
                >
                  <FlatIcon name={it.icon} size={22} color={B.red} />
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: B.bigStone, lineHeight: 1.4 }}>
                  {it.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400}>
          <div
            style={{
              marginTop: 40,
              padding: "18px 24px",
              background: B.whisper,
              borderRadius: 12,
              color: B.royalBlue,
              fontWeight: 500,
              fontSize: 15,
              textAlign: "center",
            }}
          >
            זה עובד. איכשהו. עד שמישהו שואל שאלות.
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProductOverview() {
  const pills = [
    "ועדות", "ישיבות", "סדרי יום", "פרוטוקולים",
    "החלטות", "משימות", "מסמכים", "דוחות", "AI",
  ];
  return (
    <section
      id="product"
      style={{
        padding: "120px 32px",
        background: `linear-gradient(180deg, ${B.white} 0%, ${B.whisper}66 100%)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <DecoBlob color={B.royalBlue} size={520} top="40px" right="-180px" opacity={0.1} />
      <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
        <Reveal>
          <SectionEyebrow color={B.royalBlue}>הפתרון</SectionEyebrow>
          <SectionTitle style={{ maxWidth: 720, margin: "0 auto" }}>
            מקום אחד שמחזיק את הכל
          </SectionTitle>
          <SectionLead style={{ margin: "16px auto 0", textAlign: "center" }}>
            מערכת אחת לכל מחזור החיים — מהגדרת הוועדה ועד מעקב כל החלטה ומשימה.
          </SectionLead>
        </Reveal>

        <Reveal delay={120}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              justifyContent: "center",
              marginTop: 44,
              maxWidth: 720,
              marginInline: "auto",
            }}
          >
            {pills.map((p, i) => (
              <span
                key={p}
                style={{
                  padding: "9px 18px",
                  borderRadius: 999,
                  background: i === pills.length - 1 ? `linear-gradient(135deg, ${B.orange}, ${B.royalBlue})` : B.white,
                  color: i === pills.length - 1 ? B.white : B.bigStone,
                  border: i === pills.length - 1 ? "none" : `1px solid ${B.athensGray}`,
                  fontSize: 14,
                  fontWeight: 600,
                  boxShadow: i === pills.length - 1 ? `0 6px 18px ${B.orange}40` : "none",
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={220}>
          <div
            style={{
              marginTop: 64,
              borderRadius: 18,
              overflow: "hidden",
              border: `1px solid ${B.athensGray}`,
              boxShadow: "0 30px 60px -20px rgba(23,33,52,0.18)",
              background: B.white,
              maxWidth: 980,
              marginInline: "auto",
            }}
          >
            <img
              src={A("/screenshots/meetings.png")}
              alt="Boardirector meetings"
              style={{ display: "block", width: "100%", height: "auto" }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   AI Chat overlay (mirrors the deck's MeetingBookChat)
──────────────────────────────────────────── */

function useChatCycle(active) {
  // Same cadence as the deck:
  // 0–1800ms user types question
  // 1800–3000ms typing dots
  // 3000–7800ms AI types answer
  // 7800–9800ms pause, then loop
  const [tick, setTick] = useState(0);
  const cycle = 9800;
  useEffect(() => {
    if (!active) {
      setTick(0);
      return;
    }
    const start = Date.now();
    const id = setInterval(() => setTick((Date.now() - start) % cycle), 80);
    return () => clearInterval(id);
  }, [active]);
  return tick;
}

function AIChatOverlay({ active, label, question, answer }) {
  const tick = useChatCycle(active);
  const userProgress = Math.min(tick / 1800, 1);
  const showTyping = tick >= 1800 && tick < 3000;
  const aiStart = 3000;
  const aiProgress = tick >= aiStart ? Math.min((tick - aiStart) / 4500, 1) : 0;
  const userShown = question.slice(0, Math.floor(question.length * userProgress));
  const aiShown = answer.slice(0, Math.floor(answer.length * aiProgress));

  return (
    <div
      dir="rtl"
      style={{
        position: "absolute",
        top: "5%",
        bottom: "5%",
        right: "3%",
        width: "min(340px, 42%)",
        borderRadius: 16,
        background: B.white,
        boxShadow: "0 18px 60px rgba(23,33,52,0.32)",
        border: `1px solid ${B.athensGray}`,
        opacity: active ? 1 : 0,
        transform: active ? "translateX(0)" : "translateX(40px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 350ms",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        lineHeight: 1.5,
        zIndex: 3,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 14px",
          background: `linear-gradient(135deg, ${B.orange}10, ${B.royalBlue}10)`,
          borderBottom: `1px solid ${B.athensGray}`,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            background: `linear-gradient(135deg, ${B.orange}, ${B.royalBlue})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: B.white,
            fontWeight: 800,
            fontSize: 11,
            fontFamily: `'${B.fontEn}', sans-serif`,
            letterSpacing: 1,
          }}
        >
          AI
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: B.bigStone }}>{label}</div>
          <div style={{ fontSize: 10, color: B.green, display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: B.green }} />
            פעיל
          </div>
        </div>
        <div style={{ fontSize: 16, color: B.cadetBlue }}>×</div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          padding: "14px 14px 8px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {/* User question */}
        <div style={{ alignSelf: "flex-start", maxWidth: "92%" }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: B.gullGray, marginBottom: 4 }}>
            אתה
          </div>
          <div
            style={{
              padding: "10px 12px",
              borderRadius: "12px 12px 12px 4px",
              background: B.bigStone,
              color: B.white,
              fontSize: 12,
              fontWeight: 400,
              lineHeight: 1.5,
            }}
          >
            {userShown}
            {tick < 1800 && active && (
              <span
                style={{
                  display: "inline-block",
                  width: 1,
                  height: 11,
                  background: B.white,
                  marginInlineStart: 2,
                  animation: "blinkCaret 0.9s steps(2) infinite",
                  verticalAlign: "middle",
                }}
              />
            )}
          </div>
        </div>

        {/* Typing dots */}
        {showTyping && (
          <div style={{ alignSelf: "flex-end", maxWidth: "60%" }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: B.orange,
                marginBottom: 4,
                textAlign: "left",
              }}
            >
              AI Assistant
            </div>
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "12px 12px 4px 12px",
                background: `${B.orange}12`,
                border: `1px solid ${B.orange}25`,
                display: "flex",
                gap: 4,
              }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: B.orange,
                    animation: `typingDot 1.2s ease-in-out ${i * 0.18}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* AI answer */}
        {tick >= aiStart && (
          <div style={{ alignSelf: "flex-end", maxWidth: "92%" }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: B.orange,
                marginBottom: 4,
                textAlign: "left",
              }}
            >
              AI Assistant
            </div>
            <div
              style={{
                padding: "10px 12px",
                borderRadius: "12px 12px 4px 12px",
                background: `linear-gradient(135deg, ${B.orange}10, ${B.royalBlue}10)`,
                border: `1px solid ${B.orange}25`,
                fontSize: 12,
                fontWeight: 400,
                color: B.bigStone,
                lineHeight: 1.55,
              }}
            >
              {aiShown}
              {aiProgress < 1 && active && (
                <span
                  style={{
                    display: "inline-block",
                    width: 1,
                    height: 11,
                    background: B.orange,
                    marginInlineStart: 2,
                    animation: "blinkCaret 0.9s steps(2) infinite",
                    verticalAlign: "middle",
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div
        style={{
          padding: "10px 12px",
          borderTop: `1px solid ${B.athensGray}`,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: 10,
            background: "#F4F5F8",
            border: `1px solid ${B.athensGray}`,
            fontSize: 11,
            color: B.cadetBlue,
          }}
        >
          שאל שאלה על המסמכים...
        </div>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 10,
            background: `linear-gradient(135deg, ${B.orange}, ${B.royalBlue})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: B.white,
            fontSize: 14,
          }}
        >
          ↑
        </div>
      </div>
    </div>
  );
}

function MeetingBookFeature() {
  const wrapRef = useRef(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => setActive(e.isIntersecting)),
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const eyebrowColor = B.royalBlue;
  const bullets = [
    { icon: "document", text: "סדר יום אינטראקטיבי, מסמכים מקושרים" },
    { icon: "search", text: "שאלו את ה-AI על כל מסמך, פרוטוקול או החלטה" },
    { icon: "check", text: "אישור פרוטוקולים וחתימה דיגיטלית" },
    { icon: "folder", text: "ארכיון מסודר לפי ועדה ושנה" },
  ];

  return (
    <div
      ref={wrapRef}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 60,
        alignItems: "center",
        marginBottom: 120,
      }}
    >
      <Reveal>
        <SectionEyebrow color={eyebrowColor}>MEETING BOOK · AI ASSISTANT</SectionEyebrow>
        <SectionTitle>שאלו את המסמכים</SectionTitle>
        <SectionLead>
          ספר ישיבה דיגיטלי עם AI Assistant מובנה — תשובות מיידיות על כל מסמך, פרוטוקול, או החלטה. גם בנייד, גם בטאבלט.
        </SectionLead>
        <ul style={{ listStyle: "none", padding: 0, margin: "28px 0 0 0" }}>
          {bullets.map((b) => (
            <li
              key={b.text}
              style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 14 }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: `${eyebrowColor}15`,
                  color: eyebrowColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                <FlatIcon name={b.icon} size={15} color={eyebrowColor} />
              </div>
              <div style={{ fontSize: 15, color: B.bigStone, lineHeight: 1.55 }}>{b.text}</div>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={120}>
        <div style={{ position: "relative" }}>
          {/* Glow halo */}
          <div
            style={{
              position: "absolute",
              inset: -16,
              background: `linear-gradient(135deg, ${B.orange}30, ${B.royalBlue}30)`,
              filter: "blur(40px)",
              borderRadius: 28,
              zIndex: 0,
            }}
          />
          {/* Screenshot frame with chat overlay */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              borderRadius: 16,
              overflow: "hidden",
              border: `1px solid ${B.athensGray}`,
              boxShadow: "0 24px 48px -16px rgba(23,33,52,0.22)",
              background: "#FAFBFC",
              lineHeight: 0,
            }}
          >
            <img
              src={A("/screenshots/meeting-book.png")}
              alt="Meeting book"
              style={{ display: "block", width: "100%", height: "auto" }}
            />
            {/* Subtle dim so chat pops */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(23,33,52,0.18)",
                opacity: active ? 1 : 0,
                transition: "opacity 0.7s ease 250ms",
                pointerEvents: "none",
                zIndex: 2,
              }}
            />
            <AIChatOverlay
              active={active}
              label="AI Document Assistant"
              question="מה הוחלט בנושא תקציב 2026 בישיבה האחרונה?"
              answer="בישיבת הדירקטוריון מ-12.4.2026 אושר תקציב של 47.3M ש״ח לשנת 2026. ההחלטה התקבלה ברוב של 7 מתוך 8 חברים."
            />
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function FeatureRow({ eyebrow, eyebrowColor, title, description, bullets, screenshot, reverse }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 60,
        alignItems: "center",
        marginBottom: 120,
      }}
    >
      <Reveal style={{ order: reverse ? 2 : 1 }}>
        <SectionEyebrow color={eyebrowColor}>{eyebrow}</SectionEyebrow>
        <SectionTitle>{title}</SectionTitle>
        <SectionLead>{description}</SectionLead>
        <ul style={{ listStyle: "none", padding: 0, margin: "28px 0 0 0" }}>
          {bullets.map((b) => (
            <li
              key={b.text}
              style={{
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  width: 28, height: 28,
                  borderRadius: 8,
                  background: `${eyebrowColor}15`,
                  color: eyebrowColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                <FlatIcon name={b.icon} size={15} color={eyebrowColor} />
              </div>
              <div style={{ fontSize: 15, color: B.bigStone, lineHeight: 1.55 }}>{b.text}</div>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={120} style={{ order: reverse ? 1 : 2 }}>
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: -16,
              background: `linear-gradient(135deg, ${eyebrowColor}25, ${B.royalBlue}20)`,
              filter: "blur(40px)",
              borderRadius: 28,
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              borderRadius: 16,
              overflow: "hidden",
              border: `1px solid ${B.athensGray}`,
              boxShadow: "0 24px 48px -16px rgba(23,33,52,0.22)",
              background: B.white,
            }}
          >
            <img src={screenshot} alt={title} style={{ display: "block", width: "100%", height: "auto" }} />
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function Features() {
  return (
    <section
      id="features"
      style={{ padding: "120px 32px 0", background: B.white, position: "relative" }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <FeatureRow
          eyebrow="DECISION TRACKER"
          eyebrowColor={B.teal}
          title="כל ההחלטות במקום אחד"
          description="מעקב מלא אחרי כל החלטה — מהדיון, דרך המשימות, ועד הביצוע. ביקורת ורגולציה? הכל מתועד, חתום, וזמין בלחיצת כפתור."
          bullets={[
            { icon: "target", text: "כל החלטה מקושרת לוועדה, לנושא ולישיבה" },
            { icon: "user", text: "אחראי, סטטוס, ותאריך יעד לכל פריט" },
            { icon: "check", text: "מעקב משימות שנגזרו מההחלטה" },
            { icon: "search", text: "סינון לפי ועדה, תאריך, ומצב ביצוע" },
          ]}
          screenshot={A("/screenshots/decision-tracker.png")}
        />

        <FeatureRow
          eyebrow="DASHBOARD"
          eyebrowColor={B.orange}
          title="הכל בתצוגה אחת"
          description="הדשבורד האישי שלכם — כל מה שדורש את תשומת הלב, במקום אחד. ישיבות, משימות, החלטות, התראות."
          bullets={[
            { icon: "calendar", text: "ישיבות קרובות עם גישה מהירה לחומרים" },
            { icon: "check", text: "המשימות שלי — לפי דחיפות וסטטוס" },
            { icon: "target", text: "החלטות שדורשות מעקב או אישור" },
            { icon: "chart", text: "מבט מלא על הפעילות בכל הוועדות" },
          ]}
          screenshot={A("/screenshots/dashboard.png")}
          reverse
        />

        <MeetingBookFeature />
      </div>
    </section>
  );
}

function AISection() {
  const capabilities = [
    {
      icon: "document",
      title: "סיכום פרוטוקול אוטומטי",
      desc: "מנתח את הדיון, מזהה החלטות מפתח, ומפיק סיכום מובנה — בלחיצה אחת.",
    },
    {
      icon: "target",
      title: "הפקת החלטות מהדיון",
      desc: "מזהה החלטות שנאמרו במהלך הישיבה ויוצר רשומות מובנות — נושא, ניסוח, תומכים ומתנגדים.",
    },
    {
      icon: "check",
      title: "משימות מהחלטות — אוטומטית",
      desc: "מכל החלטה המערכת מציעה משימה, אחראי, ותאריך יעד. אתם רק מאשרים.",
    },
    {
      icon: "search",
      title: "שאלו את המסמכים",
      desc: "AI Assistant בתוך תיק הישיבה — תשובות מיידיות על כל מסמך, פרוטוקול, או החלטה.",
    },
    {
      icon: "calendar",
      title: "סדר יום אוטומטי",
      desc: "בונה סדר יום על בסיס תוכנית עבודה ודרישות רגולציה.",
    },
    {
      icon: "user",
      title: "הצעות חכמות לאחראים",
      desc: "המערכת מציעה את האחראי המתאים על בסיס הרכב הוועדה והיסטוריית פעולות.",
    },
  ];

  return (
    <section
      id="ai"
      style={{
        padding: "120px 32px",
        background: B.bigStone,
        color: B.white,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <DecoBlob color={B.orange} size={520} top="-120px" right="-120px" opacity={0.18} />
      <DecoBlob color={B.royalBlue} size={460} bottom="-140px" left="-140px" opacity={0.18} />

      <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <Reveal>
            <SectionEyebrow color={B.orangeLight}>AI שעובד לצידכם</SectionEyebrow>
            <SectionTitle style={{ color: B.white }}>
              לא במקום הצוות — לידו
            </SectionTitle>
            <SectionLead style={{ color: "rgba(255,255,255,0.7)", margin: "16px auto 0", maxWidth: 680 }}>
              במקום לחפש ולכתוב — אתם מאשרים. AI מובנה בכל פעולה, שמייעל את הזמן ואת איכות הניהול.
            </SectionLead>
          </Reveal>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 18,
          }}
        >
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={i * 70}>
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16,
                  padding: 26,
                  height: "100%",
                }}
              >
                <div
                  style={{
                    width: 44, height: 44,
                    borderRadius: 12,
                    background: `linear-gradient(135deg, ${B.orange}, ${B.royalBlue})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: B.white,
                    marginBottom: 18,
                  }}
                >
                  <FlatIcon name={c.icon} size={20} color={B.white} />
                </div>
                <div style={{ fontSize: 17, fontWeight: 700, color: B.white, marginBottom: 8 }}>
                  {c.title}
                </div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.55 }}>
                  {c.desc}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Results() {
  const items = [
    { before: "שעות הכנה לישיבה", after: "דקות", color: B.royalBlue },
    { before: "ימים לאיתור החלטה ישנה", after: "שניות", color: B.orange },
    { before: "רדיפה אחרי חתימות", after: "אישור דיגיטלי חכם", color: B.teal },
  ];
  return (
    <section
      id="results"
      style={{ padding: "120px 32px", background: B.white, position: "relative" }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <Reveal>
            <SectionEyebrow color={B.teal}>תוצאות בשטח</SectionEyebrow>
            <SectionTitle>מה משתנה כשעוברים ל-Boardirector</SectionTitle>
            <SectionLead style={{ margin: "16px auto 0" }}>
              ארגונים שעבדו איתנו, עם עשרות ועדות פעילות.
            </SectionLead>
          </Reveal>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {items.map((r, i) => (
            <Reveal key={r.before} delay={i * 100}>
              <div
                style={{
                  borderRadius: 16,
                  padding: 32,
                  background: `linear-gradient(160deg, ${r.color}08, transparent)`,
                  border: `1px solid ${B.athensGray}`,
                  height: "100%",
                }}
              >
                <div style={{ fontSize: 13, color: B.gullGray, marginBottom: 6 }}>לפני</div>
                <div
                  style={{
                    fontSize: 17,
                    color: B.bigStone,
                    textDecoration: "line-through",
                    textDecorationColor: `${r.color}80`,
                    opacity: 0.8,
                    marginBottom: 16,
                  }}
                >
                  {r.before}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: r.color,
                    marginBottom: 6,
                    fontWeight: 600,
                  }}
                >
                  אחרי
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, color: B.bigStone, lineHeight: 1.3 }}>
                  {r.after}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section
      id="contact"
      style={{
        padding: "120px 32px",
        background: `linear-gradient(180deg, ${B.whisper}66 0%, ${B.white} 100%)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <DecoBlob color={B.orange} size={520} top="-100px" left="-160px" opacity={0.14} />
      <DecoBlob color={B.royalBlue} size={460} bottom="-160px" right="-160px" opacity={0.14} />

      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Reveal>
          <BDLogo size={48} color={B.orange} />
        </Reveal>
        <Reveal delay={80}>
          <h2
            style={{
              fontSize: "clamp(32px, 4.5vw, 50px)",
              fontWeight: 800,
              lineHeight: 1.15,
              color: B.bigStone,
              margin: "24px 0 0",
              letterSpacing: "-0.02em",
            }}
          >
            מוכנים לראות את{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${B.orange}, ${B.royalBlue})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Boardirector
            </span>
            {" "}בפעולה?
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p style={{ fontSize: 18, color: B.gullGray, lineHeight: 1.55, margin: "20px 0 0" }}>
            תאמו דמו אישי מותאם לארגון שלכם — נראה לכם בדיוק איך זה עובד עבור הוועדות, התהליכים, והרגולציה שלכם.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div
            style={{
              display: "flex",
              gap: 14,
              marginTop: 36,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <PrimaryButton href="mailto:neild@sqlink.com?subject=Boardirector%20Demo">
              תאמו דמו ←
            </PrimaryButton>
            <GhostButton href="https://boardirector.com">בקרו באתר →</GhostButton>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div
            style={{
              marginTop: 44,
              display: "flex",
              gap: 32,
              justifyContent: "center",
              flexWrap: "wrap",
              fontSize: 14,
              color: B.gullGray,
            }}
          >
            <a href="mailto:neild@sqlink.com" style={{ color: B.bigStone, textDecoration: "none" }}>
              neild@sqlink.com
            </a>
            <span style={{ opacity: 0.5 }}>·</span>
            <a href="https://boardirector.com" style={{ color: B.bigStone, textDecoration: "none" }}>
              boardirector.com
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        background: B.bigStone,
        color: B.white,
        padding: "44px 32px 32px",
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
          <BDLogo size={22} color={B.orange} />
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              fontFamily: `'${B.fontEn}', sans-serif`,
              letterSpacing: 0.5,
            }}
          >
            Boardirector
          </span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginRight: 8 }}>
            ניהול חכם של ועדות וישיבות
          </span>
        </div>
        <div dir="ltr" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.45)",
              fontFamily: `'${B.fontEn}', sans-serif`,
              letterSpacing: 2,
            }}
          >
            A PRODUCT OF
          </span>
          <img src={A("/sqlink-white.png")} alt="SQLink" style={{ height: 18, opacity: 0.9 }} />
        </div>
      </div>
      <div
        style={{
          maxWidth: 1180,
          margin: "28px auto 0",
          paddingTop: 20,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          fontSize: 12,
          color: "rgba(255,255,255,0.45)",
          fontFamily: `'${B.fontEn}', sans-serif`,
          letterSpacing: 0.5,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span>© 2026 SQLink Group · All rights reserved</span>
        <span>Boardirector 2.0</span>
      </div>
    </footer>
  );
}

/* ────────────────────────────────────────────
   Page
──────────────────────────────────────────── */

export default function Site() {
  const [activeId, setActiveId] = useState("top");

  useEffect(() => {
    const ids = ["product", "features", "ai", "results", "contact"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: `-${HEADER_H}px 0px -40% 0px` }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div
      dir="rtl"
      style={{
        background: B.white,
        fontFamily: `'${B.font}', 'SF Pro Display', -apple-system, sans-serif`,
        color: B.bigStone,
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        html { scroll-behavior: smooth; scroll-padding-top: ${HEADER_H}px; }
        ::selection { background: rgba(254,117,1,0.2); }
        @keyframes typingDot {
          0%, 80%, 100% { transform: translateY(0) scale(0.85); opacity: 0.4; }
          40% { transform: translateY(-3px) scale(1.1); opacity: 1; }
        }
        @keyframes blinkCaret {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        a { color: inherit; }
        button { font-family: inherit; }
        @media (max-width: 880px) {
          section [style*="grid-template-columns: 1.1fr 1fr"],
          section [style*="grid-template-columns: 1fr 1fr"],
          section [style*="grid-template-columns: repeat(3, 1fr)"],
          section [style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
          nav a { display: none; }
        }
      `}</style>

      <Header activeId={activeId} />
      <Hero />
      <TrustStrip />
      <Problem />
      <ProductOverview />
      <Features />
      <AISection />
      <Results />
      <CTA />
      <Footer />
    </div>
  );
}
