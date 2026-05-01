// @ts-nocheck
import React, { useState, useRef } from "react";
import {
  Check,
  UtensilsCrossed,
  User,
  X,
  Bell,
  Camera,
  Upload,
  Link,
} from "lucide-react";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ★ EDIT YOUR DETAILS HERE ★
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const CONFIG = {
  ntfyTopic: "barbara-levi-rsvp-2026",
  adminPin: "2605",
  brideName: "Barbara",
  groomName: "Levi",
  date: "Saturday 23rd May 2026",
  venue: "Ware Priory, Hertfordshire",
  rsvpDeadline: "30th April 2026",
  couplePhotoUrl: "https://i.ibb.co/NgG0Fr9J/IMG-8241.jpg",
};
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const MENU = {
  starter: {
    label: "Starter",
    emoji: "🥗",
    options: [
      {
        id: "1",
        name: "Onion Soup",
        emoji: "🍲",
        desc: "Classic French onion soup with a golden cheesy crouton",
      },
      {
        id: "2",
        name: "Chicken Salad & Parma Ham",
        emoji: "🥗",
        desc: "Tender chicken on fresh garden salad with Parma ham",
      },
    ],
  },
  main: {
    label: "Main Course",
    emoji: "🍽️",
    options: [
      {
        id: "1",
        name: "Chicken",
        emoji: "🍗",
        desc: "Herb-roasted chicken breast with seasonal vegetables & rich jus",
      },
      {
        id: "2",
        name: "Beef Fillet",
        emoji: "🥩",
        desc: "Premium beef fillet with dauphinoise potatoes",
      },
    ],
  },
  dessert: {
    label: "Dessert",
    emoji: "🍰",
    options: [
      {
        id: "1",
        name: "Tropical Fruit Pavlova",
        emoji: "🫧",
        desc: "Light meringue crowned with tropical fruits & cream",
      },
      {
        id: "2",
        name: "Raspberry Cream Tart",
        emoji: "🫐",
        desc: "Buttery pastry filled with silky cream & raspberries",
      },
    ],
  },
  drinks: {
    label: "Drinks",
    emoji: "🥂",
    options: [
      { id: "1", name: "Beer", emoji: "🍺", desc: "Chilled draught beer" },
      { id: "2", name: "Wine", emoji: "🍷", desc: "Red or white wine" },
      {
        id: "3",
        name: "Non-Alcoholic",
        emoji: "🥤",
        desc: "Sparkling water, soft drinks and juices",
      },
    ],
  },
};

const COURSES = ["starter", "main", "dessert", "drinks"];
const emptyMeal = () => ({ starter: "", main: "", dessert: "", drinks: "" });
const getOptName = (course, id) =>
  MENU[course]?.options.find((o) => o.id === id)?.name || "-";

function CoursePicker({ courseKey, selection, onSelect }) {
  const course = MENU[courseKey];
  const selected = selection[courseKey];
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{course.emoji}</span>
        <span
          className="font-bold text-sm"
          style={{ color: "#5a4015", fontFamily: "Georgia,serif" }}
        >
          {course.label}
        </span>
        {selected && (
          <span
            className="ml-auto flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: "rgba(74,130,60,0.12)", color: "#4a7a3c" }}
          >
            <Check size={10} strokeWidth={3} /> Selected
          </span>
        )}
      </div>
      <div className="space-y-2">
        {course.options.map((opt, idx) => {
          const isChosen = selected === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelect(courseKey, opt.id)}
              className="w-full text-left rounded-2xl transition-all"
              style={{
                padding: "11px 13px",
                background: isChosen ? "rgba(139,101,38,0.12)" : "#fff",
                border: isChosen
                  ? "2.5px solid #8B6526"
                  : "2px solid rgba(139,101,38,0.18)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0"
                  style={
                    isChosen
                      ? { background: "#8B6526", color: "#fff" }
                      : { background: "rgba(139,101,38,0.1)", color: "#8B6526" }
                  }
                >
                  {idx + 1}
                </div>
                <span className="text-xl flex-shrink-0">{opt.emoji}</span>
                <div className="flex-1">
                  <p className="font-bold text-sm" style={{ color: "#3a2a08" }}>
                    {opt.name}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#9a7840" }}>
                    {opt.desc}
                  </p>
                </div>
                {isChosen && (
                  <Check
                    size={15}
                    style={{ color: "#8B6526", flexShrink: 0 }}
                    strokeWidth={3}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function GuestMealCard({ guestIndex, totalGuests, meal, onSelect, showError }) {
  const completed = COURSES.filter((c) => meal[c]).length;
  const allDone = completed === COURSES.length;
  const label =
    totalGuests === 1
      ? "Your Selection"
      : guestIndex === 0
      ? "Your Choices"
      : `Guest ${guestIndex + 1}'s Choices`;
  return (
    <div
      className="rounded-2xl overflow-hidden border"
      style={{ borderColor: "rgba(139,101,38,0.28)" }}
    >
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{
          background:
            "linear-gradient(135deg,rgba(139,101,38,0.13),rgba(196,146,42,0.10))",
          borderBottom: "1px solid rgba(139,101,38,0.18)",
        }}
      >
        <div className="flex items-center gap-2">
          <User size={13} style={{ color: "#8B6526" }} />
          <span className="font-bold text-sm" style={{ color: "#5a4015" }}>
            {label}
          </span>
        </div>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={
            allDone
              ? { background: "rgba(74,130,60,0.14)", color: "#4a7a3c" }
              : { background: "rgba(139,101,38,0.09)", color: "#8B6526" }
          }
        >
          {completed}/{COURSES.length} {allDone ? "✓ Done" : "chosen"}
        </span>
      </div>
      <div className="p-4" style={{ background: "#fdf9f2" }}>
        {COURSES.map((courseKey, ci) => (
          <div key={courseKey}>
            <CoursePicker
              courseKey={courseKey}
              selection={meal}
              onSelect={onSelect}
            />
            {ci < COURSES.length - 1 && (
              <div
                className="mb-4 border-t"
                style={{ borderColor: "rgba(139,101,38,0.10)" }}
              />
            )}
          </div>
        ))}
        {showError && !allDone && (
          <div
            className="rounded-xl px-4 py-3 text-sm font-semibold text-center mt-1"
            style={{
              background: "rgba(220,60,60,0.07)",
              border: "1px solid rgba(220,60,60,0.2)",
              color: "#c43030",
            }}
          >
            ⚠️ Please select from each section above
          </div>
        )}
      </div>
    </div>
  );
}

function PhotoUploader({ currentPhoto, onSave, onClose }) {
  const fileRef = useRef();
  const [preview, setPreview] = useState(currentPhoto || "");
  const [urlInput, setUrlInput] = useState("");
  const [tab, setTab] = useState("url");

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleUrlLoad = () => {
    if (urlInput.trim()) setPreview(urlInput.trim());
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end"
      style={{ background: "rgba(0,0,0,0.6)" }}
    >
      <div
        className="w-full rounded-t-3xl overflow-hidden"
        style={{
          background: "#faf7f0",
          borderTop: "3px solid #8B6526",
          maxHeight: "92vh",
          overflowY: "auto",
        }}
      >
        <div
          className="flex items-center justify-between px-5 py-4 border-b sticky top-0 z-10"
          style={{ background: "#faf7f0", borderColor: "rgba(139,101,38,0.2)" }}
        >
          <h2
            className="font-bold text-lg"
            style={{ color: "#5a4015", fontFamily: "Georgia,serif" }}
          >
            📷 Couple Photo
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(139,101,38,0.1)" }}
          >
            <X size={17} style={{ color: "#8B6526" }} />
          </button>
        </div>
        <div className="p-5">
          <div
            className="flex rounded-2xl overflow-hidden mb-5 border"
            style={{ borderColor: "rgba(139,101,38,0.25)" }}
          >
            {[
              { id: "url", label: "🔗 Use URL" },
              { id: "upload", label: "📁 Upload Preview" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="flex-1 py-3 font-bold text-xs transition-all"
                style={{
                  background: tab === t.id ? "#8B6526" : "#f5efe0",
                  color: tab === t.id ? "#fff" : "#8B6526",
                  border: "none",
                  fontFamily: "Georgia,serif",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
          {tab === "url" ? (
            <>
              <div className="flex gap-2 mb-4">
                <input
                  type="url"
                  placeholder="Paste image URL here…"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="flex-1 rounded-2xl px-4 py-3 text-sm border focus:outline-none"
                  style={{
                    background: "#f5efe0",
                    borderColor: "rgba(139,101,38,0.3)",
                    color: "#3a2a08",
                    fontFamily: "inherit",
                  }}
                />
                <button
                  onClick={handleUrlLoad}
                  className="px-4 py-3 rounded-2xl font-bold text-sm"
                  style={{
                    background: "#8B6526",
                    color: "#fff",
                    border: "none",
                    whiteSpace: "nowrap",
                    fontFamily: "Georgia,serif",
                  }}
                >
                  Preview
                </button>
              </div>
              {preview && (
                <div className="mb-4">
                  <img
                    src={preview}
                    alt="Preview"
                    onError={() => setPreview("")}
                    className="w-full rounded-2xl object-cover"
                    style={{
                      height: 220,
                      objectPosition: "top",
                      filter: "grayscale(100%)",
                    }}
                  />
                  <p
                    className="text-xs text-center mt-2 font-bold"
                    style={{ color: "#4a7a3c" }}
                  >
                    ✅ Looking great!
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              {preview ? (
                <div className="mb-4">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full rounded-2xl object-cover"
                    style={{
                      height: 220,
                      objectPosition: "top",
                      filter: "grayscale(100%)",
                    }}
                  />
                </div>
              ) : (
                <div
                  className="rounded-2xl flex flex-col items-center justify-center mb-4 border-2 border-dashed"
                  style={{
                    height: 180,
                    borderColor: "rgba(139,101,38,0.35)",
                    background: "#f5efe0",
                  }}
                >
                  <Camera
                    size={36}
                    style={{ color: "#8B6526", opacity: 0.45 }}
                  />
                  <p
                    className="mt-3 text-sm font-bold"
                    style={{ color: "#8B6526" }}
                  >
                    Tap to choose your photo
                  </p>
                </div>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
                style={{ display: "none" }}
              />
              <button
                onClick={() => fileRef.current.click()}
                className="w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 mb-3"
                style={{
                  background: "linear-gradient(135deg,#8B6526,#c4922a)",
                  color: "#fff",
                  border: "none",
                  fontFamily: "Georgia,serif",
                }}
              >
                <Upload size={18} />{" "}
                {preview ? "Choose Different Photo" : "Choose from Camera Roll"}
              </button>
            </>
          )}
          <div className="space-y-3">
            {preview && (
              <button
                onClick={() => onSave(preview)}
                className="w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
                style={{
                  background: "rgba(74,130,60,0.12)",
                  color: "#3a7a30",
                  border: "2px solid rgba(74,130,60,0.3)",
                  fontFamily: "Georgia,serif",
                }}
              >
                <Check size={18} /> Save Photo
              </button>
            )}
            {currentPhoto && (
              <button
                onClick={() => onSave(null)}
                className="w-full py-3 rounded-2xl text-sm font-bold"
                style={{
                  background: "rgba(220,60,60,0.07)",
                  color: "#c43030",
                  border: "1px solid rgba(220,60,60,0.2)",
                  fontFamily: "Georgia,serif",
                }}
              >
                Remove Photo
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminPanel({ responses, onClose, onOpenPhotoUploader, onClear }) {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);

  const tryUnlock = () => {
    if (pin === CONFIG.adminPin) {
      setUnlocked(true);
    } else {
      setPinError(true);
      setTimeout(() => setPinError(false), 1500);
    }
  };

  const attending = responses.filter((r) => r.attending === "yes");
  const totalGuests = attending.reduce((a, r) => a + (r.guestCount || 1), 0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end"
      style={{ background: "rgba(0,0,0,0.55)" }}
    >
      <div
        className="w-full max-h-screen overflow-y-auto rounded-t-3xl"
        style={{ background: "#faf7f0", borderTop: "3px solid #8B6526" }}
      >
        <div
          className="flex items-center justify-between px-5 py-4 sticky top-0 z-10 border-b"
          style={{ background: "#faf7f0", borderColor: "rgba(139,101,38,0.2)" }}
        >
          <h2
            className="font-bold text-lg"
            style={{ color: "#5a4015", fontFamily: "Georgia,serif" }}
          >
            📊 Admin Panel
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(139,101,38,0.1)" }}
          >
            <X size={17} style={{ color: "#8B6526" }} />
          </button>
        </div>
        <div className="p-5">
          {!unlocked ? (
            <div className="text-center py-6">
              <p className="text-sm mb-4" style={{ color: "#7a6030" }}>
                Enter your admin PIN
              </p>
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && tryUnlock()}
                className="text-center text-2xl w-36 rounded-2xl py-3 border focus:outline-none tracking-widest mx-auto block"
                style={{
                  background: "#f5efe0",
                  borderColor: pinError ? "#c43030" : "rgba(139,101,38,0.3)",
                  color: "#3a2a08",
                }}
                placeholder="••••"
              />
              {pinError && (
                <p style={{ color: "#c43030", fontSize: 12, marginTop: 6 }}>
                  Incorrect PIN
                </p>
              )}
              <button
                onClick={tryUnlock}
                className="mt-4 px-8 py-3 rounded-2xl font-bold text-white"
                style={{ background: "#8B6526" }}
              >
                Unlock
              </button>
              <p className="text-xs mt-2" style={{ color: "#9a7840" }}>
                PIN: 2605
              </p>
            </div>
          ) : (
            <>
              <button
                onClick={() => {
                  onClose();
                  onOpenPhotoUploader();
                }}
                className="w-full py-3 rounded-2xl font-bold flex items-center justify-center gap-2 mb-4"
                style={{
                  background: "linear-gradient(135deg,#8B6526,#c4922a)",
                  color: "#fff",
                  border: "none",
                  fontFamily: "Georgia,serif",
                }}
              >
                <Camera size={18} /> Manage Couple Photo
              </button>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: "RSVPs", value: responses.length, emoji: "💌" },
                  { label: "Attending", value: attending.length, emoji: "✅" },
                  { label: "Guests", value: totalGuests, emoji: "👥" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl p-3 text-center border"
                    style={{
                      background: "#fff",
                      borderColor: "rgba(139,101,38,0.18)",
                    }}
                  >
                    <div className="text-2xl">{s.emoji}</div>
                    <div
                      className="text-2xl font-bold"
                      style={{ color: "#5a4015" }}
                    >
                      {s.value}
                    </div>
                    <div className="text-xs" style={{ color: "#9a7840" }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
              {responses.length === 0 ? (
                <div className="text-center py-8" style={{ color: "#9a7840" }}>
                  <p className="text-4xl mb-2">📭</p>
                  <p className="text-sm">No responses yet</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 pb-4">
                    {[...responses].reverse().map((r) => (
                      <div
                        key={r.id}
                        className="rounded-2xl overflow-hidden border"
                        style={{
                          borderColor: "rgba(139,101,38,0.2)",
                          background: "#fff",
                        }}
                      >
                        <div
                          className="flex items-center justify-between px-4 py-3"
                          style={{
                            background:
                              r.attending === "yes"
                                ? "rgba(74,130,60,0.07)"
                                : "rgba(220,60,60,0.05)",
                            borderBottom: "1px solid rgba(139,101,38,0.1)",
                          }}
                        >
                          <div>
                            <p
                              className="font-bold text-sm"
                              style={{ color: "#3a2a08" }}
                            >
                              {r.name}
                            </p>
                            <p className="text-xs" style={{ color: "#9a7840" }}>
                              {new Date(r.timestamp).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "numeric",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </div>
                          <span
                            className="text-xs font-bold px-2.5 py-1 rounded-full"
                            style={
                              r.attending === "yes"
                                ? {
                                    background: "rgba(74,130,60,0.13)",
                                    color: "#3a7a30",
                                  }
                                : {
                                    background: "rgba(220,60,60,0.1)",
                                    color: "#c43030",
                                  }
                            }
                          >
                            {r.attending === "yes"
                              ? `✅ ${r.guestCount} guest${
                                  r.guestCount > 1 ? "s" : ""
                                }`
                              : "❌ Declined"}
                          </span>
                        </div>
                        {r.attending === "yes" && r.meals && (
                          <div className="px-4 py-3">
                            {r.meals.map((m, mi) => (
                              <p
                                key={mi}
                                className="text-xs leading-relaxed"
                                style={{ color: "#7a6030" }}
                              >
                                {r.meals.length > 1 && (
                                  <strong>Guest {mi + 1}: </strong>
                                )}
                                {getOptName("starter", m.starter)} ·{" "}
                                {getOptName("main", m.main)} ·{" "}
                                {getOptName("dessert", m.dessert)} ·{" "}
                                {getOptName("drinks", m.drinks)}
                              </p>
                            ))}
                            {r.dietary && (
                              <p
                                className="text-xs mt-1.5 italic"
                                style={{ color: "#9a7840" }}
                              >
                                🌱 {r.dietary}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={onClear}
                    className="w-full py-3 rounded-2xl text-sm font-bold mb-6"
                    style={{
                      background: "rgba(220,60,60,0.06)",
                      color: "#c43030",
                      border: "1px solid rgba(220,60,60,0.18)",
                      fontFamily: "Georgia,serif",
                    }}
                  >
                    🗑️ Clear All Responses
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WeddingApp() {
  const [view, setView] = useState("invite");
  const [showAdmin, setShowAdmin] = useState(false);
  const [showPhotoUploader, setShowPhotoUploader] = useState(false);
  const [titleTaps, setTitleTaps] = useState(0);
  const [sending, setSending] = useState(false);
  const [weddingPhoto, setWeddingPhoto] = useState(
    CONFIG.couplePhotoUrl || null
  );
  const [responses, setResponses] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [meals, setMeals] = useState([emptyMeal()]);
  const [dietary, setDietary] = useState("");
  const [showError, setShowError] = useState(false);
  const [formError, setFormError] = useState("");
  const [imgError, setImgError] = useState(false);

  const handleTitleTap = () => {
    const n = titleTaps + 1;
    setTitleTaps(n);
    if (n >= 5) {
      setShowAdmin(true);
      setTitleTaps(0);
    } else setTimeout(() => setTitleTaps(0), 3000);
  };

  const handleGuestCount = (n) => {
    setGuestCount(n);
    setMeals(Array.from({ length: n }, (_, i) => meals[i] || emptyMeal()));
  };

  const handleMealSelect = (gi, course, optId) => {
    setMeals((prev) =>
      prev.map((m, i) => (i === gi ? { ...m, [course]: optId } : m))
    );
    setShowError(false);
  };

  const sendNotification = async (data) => {
    const mealLines =
      data.attending === "yes"
        ? data.meals
            .map((m, i) => {
              const prefix = data.meals.length > 1 ? `Guest ${i + 1}: ` : "";
              return `${prefix}${getOptName(
                "starter",
                m.starter
              )} | ${getOptName("main", m.main)} | ${getOptName(
                "dessert",
                m.dessert
              )} | ${getOptName("drinks", m.drinks)}`;
            })
            .join("\n")
        : "Cannot attend";
    const body = [
      data.attending === "yes" ? "✅ ATTENDING" : "❌ DECLINED",
      `👤 ${data.name}`,
      data.email ? `📧 ${data.email}` : "",
      data.attending === "yes" ? `👥 Party of ${data.guestCount}` : "",
      data.attending === "yes" ? `🍽️ ${mealLines}` : "",
      data.dietary ? `🌱 ${data.dietary}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    try {
      await fetch(`https://ntfy.sh/${CONFIG.ntfyTopic}`, {
        method: "POST",
        body,
        headers: {
          Title: `💌 RSVP: ${data.name}`,
          Priority: "high",
          Tags: data.attending === "yes" ? "white_check_mark,tada" : "x",
          "Content-Type": "text/plain",
        },
      });
    } catch (e) {
      console.warn("ntfy:", e);
    }
  };

  const handleSubmit = async () => {
    setFormError("");
    if (!name.trim() || !attending) {
      setFormError("Please enter your name and let us know if you'll attend.");
      return;
    }
    if (attending === "yes" && meals.some((m) => COURSES.some((c) => !m[c]))) {
      setShowError(true);
      return;
    }
    setSending(true);
    const data = {
      name,
      email,
      attending,
      guestCount,
      meals,
      dietary,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    };
    setResponses((prev) => [...prev, data]);
    await sendNotification(data);
    setSending(false);
    setView("done");
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setAttending("");
    setGuestCount(1);
    setMeals([emptyMeal()]);
    setDietary("");
    setShowError(false);
    setFormError("");
  };

  // ── INVITATION ────────────────────────────────────────────
  if (view === "invite")
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f0ebe0",
          fontFamily: "Georgia,serif",
        }}
      >
        <div style={{ position: "relative" }}>
          {weddingPhoto && !imgError ? (
            <img
              src={weddingPhoto}
              alt={`${CONFIG.brideName} & ${CONFIG.groomName}`}
              onError={() => setImgError(true)}
              style={{
                width: "100%",
                height: 300,
                objectFit: "contain", // ← change from "cover" to "contain"
                objectPosition: "center top",
                filter: "grayscale(100%)",
                display: "block",
                background: "#f0ebe0", // ← add this to match page background
              }}
            />
          ) : (
            <div
              style={{
                height: 440,
                background:
                  "linear-gradient(180deg,#c8bfaf 0%,#ddd6c8 60%,#f0ebe0 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 14,
              }}
            >
              <div style={{ fontSize: 80, opacity: 0.22 }}>💑</div>
              <p
                style={{
                  color: "#8B6526",
                  fontSize: 13,
                  fontWeight: "bold",
                  opacity: 0.6,
                }}
              >
                No photo set yet
              </p>
              <button
                onClick={() => setShowPhotoUploader(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 24px",
                  borderRadius: 50,
                  background: "rgba(139,101,38,0.15)",
                  border: "2px dashed rgba(139,101,38,0.5)",
                  color: "#8B6526",
                  fontWeight: "bold",
                  fontSize: 14,
                  fontFamily: "Georgia,serif",
                }}
              >
                <Camera size={18} /> Add Your Photo
              </button>
            </div>
          )}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 160,
              background: "linear-gradient(to bottom,transparent,#f0ebe0)",
            }}
          />
          {weddingPhoto && !imgError && (
            <button
              onClick={() => setShowPhotoUploader(true)}
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                padding: "6px 14px",
                borderRadius: 20,
                background: "rgba(0,0,0,0.45)",
                color: "#fff",
                fontSize: 12,
                fontWeight: "bold",
                border: "none",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Camera size={12} /> Change
            </button>
          )}
        </div>

        <div
          style={{
            textAlign: "center",
            padding: "16px 24px 60px", // ← add top padding instead
            marginTop: 0, // ← remove negative margin
            background: "#f0ebe0",
          }}
        >
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.22em",
              color: "#8B6526",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            You are invited to celebrate the wedding of
          </p>
          <button
            onClick={handleTitleTap}
            style={{
              background: "none",
              border: "none",
              display: "block",
              width: "100%",
              cursor: "default",
            }}
          >
            <h1
              style={{
                fontFamily: "Georgia,serif",
                fontStyle: "italic",
                fontSize: 48,
                color: "#5a4015",
                margin: "4px 0",
                lineHeight: 1.1,
              }}
            >
              {CONFIG.brideName} & {CONFIG.groomName}
            </h1>
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              margin: "10px 0",
            }}
          >
            <div
              style={{
                height: 1,
                width: 60,
                background: "rgba(139,101,38,0.4)",
              }}
            />
            <span style={{ color: "#8B6526", fontSize: 20 }}>❧</span>
            <div
              style={{
                height: 1,
                width: 60,
                background: "rgba(139,101,38,0.4)",
              }}
            />
          </div>
          <p
            style={{
              fontStyle: "italic",
              fontWeight: "bold",
              fontSize: 18,
              color: "#5a4015",
              marginBottom: 4,
            }}
          >
            {CONFIG.date}
          </p>
          <p
            style={{
              fontStyle: "italic",
              fontSize: 16,
              color: "#5a4015",
              marginBottom: 24,
            }}
          >
            {CONFIG.venue}
          </p>
          <div
            style={{
              maxWidth: 300,
              margin: "0 auto 28px",
              padding: "18px 24px",
              border: "1px solid rgba(139,101,38,0.35)",
              borderRadius: 16,
              background: "rgba(255,255,255,0.55)",
            }}
          >
            <p style={{ fontSize: 13, color: "#7a6030" }}>
              Kindly reply by{" "}
              <strong style={{ color: "#8B6526" }}>
                {CONFIG.rsvpDeadline}
              </strong>
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setView("rsvp");
            }}
            style={{
              display: "block",
              width: "100%",
              maxWidth: 280,
              margin: "0 auto",
              padding: "16px 0",
              borderRadius: 50,
              background: "linear-gradient(135deg,#8B6526,#c4922a)",
              color: "#fff",
              fontWeight: "bold",
              fontSize: 17,
              border: "none",
              boxShadow: "0 6px 20px rgba(139,101,38,0.35)",
              fontFamily: "Georgia,serif",
            }}
          >
            💌 RSVP Now
          </button>
          <p style={{ marginTop: 14, fontSize: 11, color: "#9a7840" }}>
            Tap names 5× for admin
          </p>
        </div>

        {showAdmin && (
          <AdminPanel
            responses={responses}
            onClose={() => setShowAdmin(false)}
            onOpenPhotoUploader={() => setShowPhotoUploader(true)}
            onClear={() => setResponses([])}
          />
        )}
        {showPhotoUploader && (
          <PhotoUploader
            currentPhoto={weddingPhoto}
            onSave={(photo) => {
              setWeddingPhoto(photo);
              setImgError(false);
              setShowPhotoUploader(false);
            }}
            onClose={() => setShowPhotoUploader(false)}
          />
        )}
      </div>
    );

  // ── RSVP FORM ─────────────────────────────────────────────
  if (view === "rsvp")
    return (
      <div
        style={{
          minHeight: "100vh",
          padding: "32px 16px",
          background: "linear-gradient(160deg,#f5efe0,#ede5d0)",
          fontFamily: "Georgia,serif",
        }}
      >
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <button
              onClick={() => setView("invite")}
              style={{
                background: "none",
                border: "none",
                fontSize: 13,
                color: "#8B6526",
                marginBottom: 12,
                fontFamily: "inherit",
              }}
            >
              ← Back
            </button>
            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.2em",
                color: "#8B6526",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              {CONFIG.brideName} & {CONFIG.groomName} · {CONFIG.date}
            </p>
            <h1
              style={{
                fontSize: 42,
                fontStyle: "italic",
                color: "#5a4015",
                margin: "0 0 4px",
              }}
            >
              RSVP
            </h1>
            <p style={{ fontSize: 13, color: "#7a6030" }}>
              Please reply by{" "}
              <strong style={{ color: "#8B6526" }}>
                {CONFIG.rsvpDeadline}
              </strong>
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                borderRadius: 24,
                padding: 20,
                border: "1px solid rgba(139,101,38,0.2)",
                background: "#faf7f0",
              }}
            >
              <h3
                style={{
                  fontWeight: "bold",
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#5a4015",
                  fontSize: 15,
                }}
              >
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "#8B6526",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: "bold",
                    flexShrink: 0,
                  }}
                >
                  1
                </span>
                Your Details
              </h3>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <input
                  type="text"
                  placeholder="Your Full Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: "100%",
                    borderRadius: 16,
                    padding: "12px 16px",
                    fontSize: 14,
                    border: "1px solid rgba(139,101,38,0.25)",
                    background: "#f5efe0",
                    color: "#3a2a08",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                  }}
                />
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    borderRadius: 16,
                    padding: "12px 16px",
                    fontSize: 14,
                    border: "1px solid rgba(139,101,38,0.25)",
                    background: "#f5efe0",
                    color: "#3a2a08",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                borderRadius: 24,
                padding: 20,
                border: "1px solid rgba(139,101,38,0.2)",
                background: "#faf7f0",
              }}
            >
              <h3
                style={{
                  fontWeight: "bold",
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#5a4015",
                  fontSize: 15,
                }}
              >
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "#8B6526",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: "bold",
                    flexShrink: 0,
                  }}
                >
                  2
                </span>
                Will you be attending?
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                {[
                  { val: "yes", emoji: "💕", label: "Joyfully Accepts!" },
                  { val: "no", emoji: "😢", label: "Regretfully Declines" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => setAttending(opt.val)}
                    style={{
                      borderRadius: 16,
                      padding: "16px 12px",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: 13,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      background:
                        attending === opt.val
                          ? "rgba(139,101,38,0.12)"
                          : "#f5efe0",
                      border:
                        attending === opt.val
                          ? "2.5px solid #8B6526"
                          : "2px solid rgba(139,101,38,0.2)",
                      color: attending === opt.val ? "#5a4015" : "#7a6030",
                    }}
                  >
                    <div style={{ fontSize: 28, marginBottom: 4 }}>
                      {opt.emoji}
                    </div>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {attending === "yes" && (
              <>
                <div
                  style={{
                    borderRadius: 24,
                    padding: 20,
                    border: "1px solid rgba(139,101,38,0.2)",
                    background: "#faf7f0",
                  }}
                >
                  <h3
                    style={{
                      fontWeight: "bold",
                      marginBottom: 16,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      color: "#5a4015",
                      fontSize: 15,
                    }}
                  >
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "#8B6526",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13,
                        fontWeight: "bold",
                        flexShrink: 0,
                      }}
                    >
                      3
                    </span>
                    How many in your party?
                  </h3>
                  <div style={{ display: "flex", gap: 12 }}>
                    {[1, 2, 3, 4].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => handleGuestCount(n)}
                        style={{
                          flex: 1,
                          padding: "12px 0",
                          borderRadius: 16,
                          fontWeight: "bold",
                          fontSize: 14,
                          cursor: "pointer",
                          fontFamily: "inherit",
                          border: "2px solid",
                          background: guestCount === n ? "#8B6526" : "#f5efe0",
                          color: guestCount === n ? "#fff" : "#8B6526",
                          borderColor:
                            guestCount === n
                              ? "#8B6526"
                              : "rgba(139,101,38,0.22)",
                        }}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    borderRadius: 24,
                    overflow: "hidden",
                    border: "1px solid rgba(139,101,38,0.22)",
                  }}
                >
                  <div
                    style={{
                      padding: "16px 20px",
                      background: "linear-gradient(135deg,#8B6526,#c4922a)",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <UtensilsCrossed size={20} color="white" />
                    <div>
                      <p
                        style={{
                          color: "#fff",
                          fontWeight: "bold",
                          fontSize: 15,
                          margin: 0,
                        }}
                      >
                        Meal & Drinks Selection
                      </p>
                      <p
                        style={{
                          color: "rgba(255,255,255,0.75)",
                          fontSize: 12,
                          margin: 0,
                        }}
                      >
                        One choice per section per guest
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: 16,
                      background: "#fdf9f2",
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                    }}
                  >
                    {meals.map((meal, i) => (
                      <GuestMealCard
                        key={i}
                        guestIndex={i}
                        totalGuests={guestCount}
                        meal={meal}
                        onSelect={(course, optId) =>
                          handleMealSelect(i, course, optId)
                        }
                        showError={showError}
                      />
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    borderRadius: 24,
                    padding: 20,
                    border: "1px solid rgba(139,101,38,0.2)",
                    background: "#faf7f0",
                  }}
                >
                  <h3
                    style={{
                      fontWeight: "bold",
                      marginBottom: 12,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      color: "#5a4015",
                      fontSize: 15,
                    }}
                  >
                    <span style={{ fontSize: 20 }}>🌱</span> Dietary
                    Requirements
                  </h3>
                  <textarea
                    rows={3}
                    placeholder="Any allergies or dietary requirements? (optional)"
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value)}
                    style={{
                      width: "100%",
                      borderRadius: 16,
                      padding: "12px 16px",
                      fontSize: 14,
                      border: "1px solid rgba(139,101,38,0.25)",
                      background: "#f5efe0",
                      color: "#3a2a08",
                      fontFamily: "inherit",
                      resize: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </>
            )}

            {formError && (
              <div
                style={{
                  borderRadius: 16,
                  padding: "12px 16px",
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: 14,
                  background: "rgba(220,60,60,0.07)",
                  border: "1px solid rgba(220,60,60,0.2)",
                  color: "#c43030",
                }}
              >
                ⚠️ {formError}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={sending}
              style={{
                width: "100%",
                padding: "16px 0",
                borderRadius: 50,
                fontWeight: "bold",
                fontSize: 16,
                background: "linear-gradient(135deg,#8B6526,#c4922a)",
                color: "#fff",
                border: "none",
                opacity: sending ? 0.7 : 1,
                boxShadow: "0 5px 18px rgba(139,101,38,0.3)",
                fontFamily: "inherit",
                cursor: "pointer",
              }}
            >
              {sending ? "⏳ Sending…" : "Send My RSVP 💌"}
            </button>
          </div>
        </div>
      </div>
    );

  // ── CONFIRMATION ──────────────────────────────────────────
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        background: "linear-gradient(160deg,#f5efe0,#ede5d0)",
        fontFamily: "Georgia,serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
          border: "1px solid rgba(139,101,38,0.22)",
          background: "#faf7f0",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "40px 24px",
            background: "linear-gradient(135deg,#8B6526,#c4922a)",
          }}
        >
          <div style={{ fontSize: 60, marginBottom: 10 }}>
            {attending === "yes" ? "🎉" : "💌"}
          </div>
          <h2
            style={{
              fontSize: 30,
              fontStyle: "italic",
              color: "#fff",
              margin: 0,
            }}
          >
            Thank You, {name}!
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.82)",
              fontSize: 14,
              marginTop: 6,
            }}
          >
            {attending === "yes"
              ? "We're absolutely thrilled you'll join us! 💕"
              : "We're so sorry you can't make it — you'll be missed! 💕"}
          </p>
        </div>
        <div style={{ padding: 24 }}>
          {attending === "yes" && (
            <div
              style={{
                marginBottom: 20,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {meals.map((m, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    border: "1px solid rgba(139,101,38,0.18)",
                  }}
                >
                  {meals.length > 1 && (
                    <div
                      style={{
                        padding: "8px 16px",
                        fontSize: 11,
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        background: "rgba(139,101,38,0.09)",
                        color: "#5a4015",
                        borderBottom: "1px solid rgba(139,101,38,0.1)",
                      }}
                    >
                      <User size={11} /> {i === 0 ? "You" : `Guest ${i + 1}`}
                    </div>
                  )}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4,1fr)",
                      background: "#fff",
                    }}
                  >
                    {COURSES.map((c, ci) => {
                      const opt = MENU[c].options.find((o) => o.id === m[c]);
                      return (
                        <div
                          key={c}
                          style={{
                            padding: 8,
                            textAlign: "center",
                            borderRight:
                              ci < COURSES.length - 1
                                ? "1px solid rgba(139,101,38,0.08)"
                                : "none",
                          }}
                        >
                          <p style={{ fontSize: 13, marginBottom: 2 }}>
                            {MENU[c].emoji}
                          </p>
                          <p
                            style={{
                              fontSize: 9,
                              fontWeight: "bold",
                              color: "#8B6526",
                            }}
                          >
                            {MENU[c].label}
                          </p>
                          <p
                            style={{
                              fontSize: 10,
                              fontWeight: "bold",
                              color: "#5a4015",
                              lineHeight: 1.3,
                            }}
                          >
                            {opt?.name || "—"}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              {dietary && (
                <p
                  style={{
                    fontSize: 12,
                    fontStyle: "italic",
                    color: "#9a7840",
                  }}
                >
                  🌱 {dietary}
                </p>
              )}
            </div>
          )}
          <div
            style={{
              borderRadius: 16,
              padding: "12px 16px",
              textAlign: "center",
              fontWeight: "600",
              fontSize: 14,
              marginBottom: 16,
              background: "rgba(74,130,60,0.09)",
              color: "#4a7a3c",
              border: "1px solid rgba(74,130,60,0.2)",
            }}
          >
            ✅ RSVP received!
          </div>
          <button
            onClick={() => setView("invite")}
            style={{
              width: "100%",
              padding: "12px 0",
              borderRadius: 20,
              fontSize: 13,
              fontWeight: "bold",
              background: "transparent",
              border: "1.5px solid rgba(139,101,38,0.3)",
              color: "#8B6526",
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            ← Back to Invitation
          </button>
        </div>
      </div>
    </div>
  );
}

