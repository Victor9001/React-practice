
import React, { useState, useEffect, useMemo } from "react";
import {
  Clock,
  MapPin,
  MessageCircle,
  Plus,
  X,
  Search,
  Utensils,
  Scissors,
  PartyPopper,
  Building2,
  Home,
  Store,
  Compass,
} from "lucide-react";
 
// ---------- Mock data ----------
 
const now = () => Date.now();
const hrs = (n) => n * 60 * 60 * 1000;
 
const seedAds = [
  {
    id: "a1",
    seller: "Ada",
    initials: "AD",
    title: "Braids & twists — this weekend only",
    price: "₦4,500",
    caption: "Box braids, knotless, or twists. Slots open Sat & Sun, hostel room B12.",
    whatsapp: "2348012345678",
    createdAt: now() - hrs(3),
    expiresAt: now() + hrs(21),
  },
  {
    id: "a2",
    seller: "Femi",
    initials: "FM",
    title: "1GB data plans, same-day activation",
    price: "₦500",
    caption: "MTN & Airtel. DM before 9pm for same-day activation.",
    whatsapp: "2348023456789",
    createdAt: now() - hrs(1),
    expiresAt: now() + hrs(23),
  },
  {
    id: "a3",
    seller: "Chiamaka",
    initials: "CH",
    title: "Custom Ankara tote bags",
    price: "₦3,000",
    caption: "Made to order, pick your fabric. 2-day turnaround.",
    whatsapp: "2348034567890",
    createdAt: now() - hrs(10),
    expiresAt: now() + hrs(14),
  },
  {
    id: "a4",
    seller: "Tunde",
    initials: "TN",
    title: "Phone screen repair, on-site",
    price: "from ₦8,000",
    caption: "Cracked screen? I come to your hostel. Most phones in stock.",
    whatsapp: "2348045678901",
    createdAt: now() - hrs(20),
    expiresAt: now() + hrs(4),
  },
];
 
const places = [
  {
    id: "p1",
    category: "offices",
    name: "Student Affairs Office",
    note: "Registration, ID cards, complaints",
    walk: "3 min from Main Gate",
  },
  {
    id: "p2",
    category: "offices",
    name: "Faculty of Sciences",
    note: "Block C, first floor",
    walk: "8 min from hostels",
  },
  {
    id: "p3",
    category: "eateries",
    name: "Mama Ngozi's Kitchen",
    note: "Best jollof on campus, cash only",
    walk: "Behind Hostel B",
  },
  {
    id: "p4",
    category: "eateries",
    name: "Suya Corner",
    note: "Opens 6pm, goes fast on weekends",
    walk: "Opposite Main Gate",
  },
  {
    id: "p5",
    category: "salons",
    name: "Glow Up Salon",
    note: "Braids, wigs, manicure",
    walk: "5 min off campus",
  },
  {
    id: "p6",
    category: "salons",
    name: "Fresh Fade Barbers",
    note: "Walk-ins welcome, no booking needed",
    walk: "Next to Suya Corner",
  },
  {
    id: "p7",
    category: "parties",
    name: "Freshers' Mixer — Fri 8pm",
    note: "Student Union field, free entry",
    walk: "On campus",
  },
  {
    id: "p8",
    category: "parties",
    name: "Vibes Lounge",
    note: "Popular Saturday spot, cover charge ₦1,000",
    walk: "10 min drive",
  },
];
 
const categories = [
  { id: "all", label: "All", icon: Compass },
  { id: "offices", label: "Offices", icon: Building2 },
  { id: "eateries", label: "Eateries", icon: Utensils },
  { id: "salons", label: "Salons", icon: Scissors },
  { id: "parties", label: "Parties", icon: PartyPopper },
];
 
// ---------- Helpers ----------
 
function timeLeftLabel(expiresAt) {
  const diff = expiresAt - now();
  if (diff <= 0) return "Expired";
  const h = Math.floor(diff / hrs(1));
  const m = Math.floor((diff % hrs(1)) / 60000);
  if (h > 0) return `${h}h ${m}m left`;
  return `${m}m left`;
}
 
function progressFraction(createdAt, expiresAt) {
  const total = expiresAt - createdAt;
  const remaining = expiresAt - now();
  return Math.max(0, Math.min(1, remaining / total));
}
 
// ---------- App ----------
 
export default function CampusApp() {
  const [tab, setTab] = useState("market");
  const [ads, setAds] = useState(seedAds);
  const [tick, setTick] = useState(0);
  const [showPost, setShowPost] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [openAd, setOpenAd] = useState(null);
 
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(id);
  }, []);
 
  const liveAds = useMemo(
    () => ads.filter((ad) => ad.expiresAt > now()).sort((a, b) => b.createdAt - a.createdAt),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ads, tick]
  );
 
  const filteredPlaces = useMemo(
    () => (activeCategory === "all" ? places : places.filter((p) => p.category === activeCategory)),
    [activeCategory]
  );
 
  function handlePost(newAd) {
    setAds((prev) => [
      {
        id: `a${Date.now()}`,
        seller: newAd.seller || "You",
        initials: (newAd.seller || "You").slice(0, 2).toUpperCase(),
        title: newAd.title,
        price: newAd.price,
        caption: newAd.caption,
        whatsapp: newAd.whatsapp,
        createdAt: now(),
        expiresAt: now() + hrs(24),
      },
      ...prev,
    ]);
    setShowPost(false);
  }
 
  return (
    <div style={{ background: "#0B0D11", minHeight: "100vh", padding: "24px 12px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <div
        style={{
          maxWidth: 380,
          margin: "0 auto",
          background: "#101319",
          borderRadius: 36,
          border: "1px solid #262C38",
          overflow: "hidden",
          minHeight: 720,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Status bar */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 22px 0", fontSize: 12, color: "#8B93A3", fontWeight: 500 }}>
          <span>9:41</span>
          <span>Campus</span>
        </div>
 
        {/* Header */}
        <div style={{ padding: "16px 20px 12px" }}>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, letterSpacing: -0.5, color: "#F5F6F2" }}>
            {tab === "market" ? "Marketplace" : "Navigator"}
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "#8B93A3" }}>
            {tab === "market" ? "Student ads, gone in 24 hours" : "Find your way around campus and town"}
          </p>
        </div>
 
        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 100px" }}>
          {tab === "market" ? (
            <MarketView ads={liveAds} onOpen={setOpenAd} />
          ) : (
            <NavigatorView
              categories={categories}
              active={activeCategory}
              onSelect={setActiveCategory}
              places={filteredPlaces}
            />
          )}
        </div>
 
        {/* Post button (marketplace only) */}
        {tab === "market" && (
          <button
            onClick={() => setShowPost(true)}
            style={{
              position: "absolute",
              right: 28,
              bottom: 92,
              width: 52,
              height: 52,
              borderRadius: 26,
              background: "#C6FF3D",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 16px rgba(198,255,61,0.35)",
              cursor: "pointer",
            }}
            aria-label="Post an ad"
          >
            <Plus size={24} color="#101319" strokeWidth={2.5} />
          </button>
        )}
 
        {/* Bottom nav */}
        <div
          style={{
            display: "flex",
            borderTop: "1px solid #262C38",
            background: "#0D0F14",
            padding: "10px 8px 16px",
          }}
        >
          <NavButton icon={Store} label="Marketplace" active={tab === "market"} onClick={() => setTab("market")} />
          <NavButton icon={MapPin} label="Navigator" active={tab === "nav"} onClick={() => setTab("nav")} />
        </div>
      </div>
 
      {showPost && <PostModal onClose={() => setShowPost(false)} onSubmit={handlePost} />}
      {openAd && <AdModal ad={openAd} onClose={() => setOpenAd(null)} />}
    </div>
  );
}
 
function NavButton({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        background: "none",
        border: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        padding: "6px 0",
        cursor: "pointer",
      }}
    >
      <Icon size={20} color={active ? "#C6FF3D" : "#8B93A3"} strokeWidth={active ? 2.4 : 2} />
      <span style={{ fontSize: 11, color: active ? "#F5F6F2" : "#8B93A3", fontWeight: active ? 600 : 400 }}>
        {label}
      </span>
    </button>
  );
}
 
// ---------- Marketplace ----------
 
function MarketView({ ads, onOpen }) {
  if (ads.length === 0) {
    return (
      <div style={{ padding: "60px 0", textAlign: "center", color: "#8B93A3" }}>
        <Store size={28} color="#4B5261" style={{ marginBottom: 10 }} />
        <p style={{ margin: 0, fontSize: 14 }}>No ads right now.</p>
        <p style={{ margin: "4px 0 0", fontSize: 13 }}>Tap + to post the first one.</p>
      </div>
    );
  }
 
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 8 }}>
      {ads.map((ad) => {
        const frac = progressFraction(ad.createdAt, ad.expiresAt);
        const urgent = frac < 0.25;
        return (
          <button
            key={ad.id}
            onClick={() => onOpen(ad)}
            style={{
              textAlign: "left",
              background: "#1B2029",
              border: "1px solid #262C38",
              borderRadius: 16,
              padding: 14,
              cursor: "pointer",
              color: "inherit",
            }}
          >
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  background: "#262C38",
                  color: "#C6FF3D",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {ad.initials}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                  <p style={{ margin: 0, fontSize: 14.5, fontWeight: 600, color: "#F5F6F2" }}>{ad.title}</p>
                </div>
                <p style={{ margin: "2px 0 0", fontSize: 13, color: "#8B93A3" }}>{ad.seller} · {ad.price}</p>
                <p style={{ margin: "6px 0 0", fontSize: 13, color: "#C3C8D1", lineHeight: 1.4 }}>{ad.caption}</p>
 
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
                  <Clock size={13} color={urgent ? "#FF6B4A" : "#8B93A3"} />
                  <span style={{ fontSize: 12, color: urgent ? "#FF6B4A" : "#8B93A3", fontWeight: urgent ? 600 : 400 }}>
                    {timeLeftLabel(ad.expiresAt)}
                  </span>
                  <div style={{ flex: 1, height: 3, background: "#262C38", borderRadius: 2, marginLeft: 6 }}>
                    <div
                      style={{
                        width: `${frac * 100}%`,
                        height: "100%",
                        borderRadius: 2,
                        background: urgent ? "#FF6B4A" : "#C6FF3D",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
 
function AdModal({ ad, onClose }) {
  const link = `https://wa.me/${ad.whatsapp}?text=${encodeURIComponent(`Hi ${ad.seller}, I saw your ad for "${ad.title}" on Campus`)}`;
  return (
    <Overlay onClose={onClose}>
      <p style={{ margin: 0, fontSize: 12, color: "#8B93A3" }}>{ad.seller}</p>
      <h2 style={{ margin: "4px 0 0", fontSize: 19, fontWeight: 700, color: "#F5F6F2" }}>{ad.title}</h2>
      <p style={{ margin: "6px 0 0", fontSize: 16, fontWeight: 600, color: "#C6FF3D" }}>{ad.price}</p>
      <p style={{ margin: "12px 0 0", fontSize: 14, color: "#C3C8D1", lineHeight: 1.5 }}>{ad.caption}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 14 }}>
        <Clock size={14} color="#8B93A3" />
        <span style={{ fontSize: 13, color: "#8B93A3" }}>{timeLeftLabel(ad.expiresAt)}</span>
      </div>
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        style={{
          marginTop: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          background: "#C6FF3D",
          color: "#101319",
          fontWeight: 700,
          fontSize: 14,
          padding: "13px 0",
          borderRadius: 12,
          textDecoration: "none",
        }}
      >
        <MessageCircle size={17} />
        Chat to buy
      </a>
    </Overlay>
  );
}
 
function PostModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({ seller: "", title: "", price: "", caption: "", whatsapp: "" });
  const [error, setError] = useState("");
 
  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }
 
  function submit() {
    if (!form.title.trim() || !form.whatsapp.trim()) {
      setError("Add at least a title and a WhatsApp number.");
      return;
    }
    onSubmit(form);
  }
 
  return (
    <Overlay onClose={onClose}>
      <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#F5F6F2" }}>Post an ad</h2>
      <p style={{ margin: "4px 0 16px", fontSize: 13, color: "#8B93A3" }}>Visible for 24 hours, then it disappears.</p>
 
      <Field label="Your name" value={form.seller} onChange={(v) => update("seller", v)} placeholder="Ada" />
      <Field label="What are you selling" value={form.title} onChange={(v) => update("title", v)} placeholder="Braids & twists" />
      <Field label="Price" value={form.price} onChange={(v) => update("price", v)} placeholder="₦4,500" />
      <Field
        label="Details"
        value={form.caption}
        onChange={(v) => update("caption", v)}
        placeholder="Slots, pickup location, anything buyers should know"
        multiline
      />
      <Field
        label="WhatsApp number"
        value={form.whatsapp}
        onChange={(v) => update("whatsapp", v.replace(/[^0-9]/g, ""))}
        placeholder="2348012345678"
      />
 
      {error && <p style={{ margin: "4px 0 0", fontSize: 12.5, color: "#FF6B4A" }}>{error}</p>}
 
      <button
        onClick={submit}
        style={{
          marginTop: 18,
          width: "100%",
          background: "#C6FF3D",
          color: "#101319",
          fontWeight: 700,
          fontSize: 14,
          padding: "13px 0",
          borderRadius: 12,
          border: "none",
          cursor: "pointer",
        }}
      >
        Post ad
      </button>
    </Overlay>
  );
}
 
function Field({ label, value, onChange, placeholder, multiline }) {
  const shared = {
    width: "100%",
    background: "#1B2029",
    border: "1px solid #262C38",
    borderRadius: 10,
    padding: "10px 12px",
    color: "#F5F6F2",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: "block", fontSize: 12, color: "#8B93A3", marginBottom: 6 }}>{label}</label>
      {multiline ? (
        <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={{ ...shared, resize: "none" }} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={shared} />
      )}
    </div>
  );
}
 
function Overlay({ children, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#14171E",
          borderRadius: "20px 20px 0 0",
          border: "1px solid #262C38",
          borderBottom: "none",
          padding: "20px 20px 28px",
          width: "100%",
          maxWidth: 380,
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 4 }}>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }} aria-label="Close">
            <X size={18} color="#8B93A3" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
 
// ---------- Navigator ----------
 
function NavigatorView({ categories, active, onSelect, places }) {
  return (
    <div style={{ paddingTop: 8 }}>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginBottom: 14 }}>
        {categories.map((c) => {
          const Icon = c.icon;
          const isActive = active === c.id;
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 14px",
                borderRadius: 20,
                border: isActive ? "1px solid #C6FF3D" : "1px solid #262C38",
                background: isActive ? "rgba(198,255,61,0.12)" : "#1B2029",
                color: isActive ? "#C6FF3D" : "#C3C8D1",
                fontSize: 13,
                fontWeight: 600,
                whiteSpace: "nowrap",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <Icon size={14} />
              {c.label}
            </button>
          );
        })}
      </div>
 
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {places.map((p) => (
          <div key={p.id} style={{ background: "#1B2029", border: "1px solid #262C38", borderRadius: 14, padding: 14 }}>
            <p style={{ margin: 0, fontSize: 14.5, fontWeight: 600, color: "#F5F6F2" }}>{p.name}</p>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#C3C8D1" }}>{p.note}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 8 }}>
              <MapPin size={12} color="#8B93A3" />
              <span style={{ fontSize: 12, color: "#8B93A3" }}>{p.walk}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
 
