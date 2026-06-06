import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://pbpxqseavqpprfkgklrt.supabase.co";
const SUPABASE_KEY = "sb_publishable_bsSM8HWqDA4INXfDZXIADA_Z4Tjzh5D";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const NAVY = "#1A3A5C";
const GOLD = "#C8960C";
const BG = "#F9F7F4";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "🏠" },
  { id: "documents", label: "Documents", icon: "📁" },
  { id: "calendar", label: "Due Dates", icon: "📅" },
  { id: "messages", label: "Messages", icon: "💬" },
];

// ── STYLES ──────────────────────────────────────────────
const S = {
  btn: (bg, color) => ({
    background: bg, color, border: "none", padding: "10px 20px",
    fontFamily: "'Outfit',sans-serif", fontWeight: 500, fontSize: 13,
    letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer",
    transition: "opacity 0.2s",
  }),
  card: {
    background: "#fff", border: "1px solid #E8E2D9",
    padding: "24px", marginBottom: 16,
  },
  input: {
    width: "100%", padding: "10px 14px", border: "1px solid #D8D2C9",
    fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none",
    background: "#fff", color: "#1A1A1A",
  },
  label: {
    fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 600,
    letterSpacing: "0.1em", textTransform: "uppercase", color: "#888",
    display: "block", marginBottom: 5,
  },
  sectionTitle: {
    fontFamily: "'Cormorant Garamond',serif", fontSize: 26,
    fontWeight: 600, color: NAVY, marginBottom: 20,
  },
  tag: (color) => ({
    display: "inline-block", padding: "3px 10px", borderRadius: 20,
    fontSize: 11, fontWeight: 600, fontFamily: "'Outfit',sans-serif",
    background: color + "22", color: color, letterSpacing: "0.05em",
  }),
};

// ── LOGIN ────────────────────────────────────────────────
function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAB4CAYAAADol0FpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU5rgUpxRelXem/RkrDTDdmqci/tmcR+LTW8Ran1tXbuiZcf72MLKpv6Sd7MORbBsAXlPCVFT+16B8K/HEcDC2oPf3f8M0YeFRSg1Tl/syXTf+7Vxq4TiZL1iBB4TrQjHxWAFNFWBLXUFSEFN2VoFJqWUqI7IFLF2V2FLRUiqVJiU9qm1C5VYLnqkWFk7gF3gg3ELqEMFMEAKB4VB7dCK6IUGbNFxBQxD9lhEXHRJN5kMN2mRJHRmEkobJh7qSH7KhCc1klqNbUcVFjR1E/JWFEBMRFJisiBFz/BGHfXlG/WjvEaDQYG30hBBjNhzpJKRY/Fl2pIm6CK5jRqBjKLAWEgaHKK20lA5R1LXjHllxRQqY7RSAbpJmOOFJYtMMVoiS5lQkidvTfnZAEQIPRoABkwEeEBcgChYgAQAA";

  const handleLogin = async () => {
    if (!email || !password) return;
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError("Invalid email or password. Please contact CA Arun Sachdev."); setLoading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1A3A5C 0%, #0F2440 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "'Outfit',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Outfit:wght@300;400;500;600&display=swap');`}</style>
      <div style={{ background: "#fff", width: "100%", maxWidth: 400, padding: "40px 36px" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <img src={LOGO} alt="CA India" style={{ height: 52, marginBottom: 12 }} />
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, fontWeight: 600, color: NAVY }}>Client Portal</div>
          <div style={{ fontSize: 12, color: "#999", marginTop: 4 }}>M/s Arun Kumar Sachdev & Associates</div>
          <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, margin: "16px 0 0" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={S.label}>Email Address</label>
            <input style={S.input} type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} />
          </div>
          <div>
            <label style={S.label}>Password</label>
            <input style={S.input} type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} />
          </div>
          {error && <div style={{ background: "#FFF3F3", border: "1px solid #FFCDD2", padding: "10px 14px", fontSize: 13, color: "#C62828" }}>{error}</div>}
          <button style={{ ...S.btn(NAVY, "#fff"), marginTop: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }} onClick={handleLogin} disabled={loading}>
            {loading ? <><span style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} /> Signing in…</> : "Sign In"}
          </button>
          <div style={{ fontSize: 12, color: "#bbb", textAlign: "center" }}>
            Issues? Call <a href="tel:+917678585812" style={{ color: GOLD, textDecoration: "none" }}>+91 76785 85812</a>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── SIDEBAR ──────────────────────────────────────────────
function Sidebar({ active, setActive, client, onLogout }) {
  return (
    <div style={{ width: 220, background: NAVY, minHeight: "100vh", display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(200,150,12,0.3)" }}>
        <div style={{ fontSize: 11, color: GOLD, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>Client Portal</div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, color: "#F9F7F4", fontWeight: 600, lineHeight: 1.3 }}>{client?.name || "Loading…"}</div>
        {client?.company && <div style={{ fontSize: 11, color: "rgba(249,247,244,0.5)", marginTop: 2 }}>{client.company}</div>}
      </div>
      <nav style={{ flex: 1, padding: "16px 0" }}>
        {NAV_ITEMS.map(item => (
          <div key={item.id} onClick={() => setActive(item.id)} style={{ padding: "12px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, background: active === item.id ? "rgba(200,150,12,0.15)" : "transparent", borderLeft: active === item.id ? `3px solid ${GOLD}` : "3px solid transparent", transition: "all 0.2s" }}>
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: active === item.id ? 600 : 400, color: active === item.id ? GOLD : "rgba(249,247,244,0.7)" }}>{item.label}</span>
          </div>
        ))}
      </nav>
      <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(200,150,12,0.2)" }}>
        <div style={{ fontSize: 11, color: "rgba(249,247,244,0.4)", marginBottom: 8 }}>CA Arun Sachdev · FCA · FCS</div>
        <button onClick={onLogout} style={{ ...S.btn("rgba(255,255,255,0.08)", "rgba(249,247,244,0.6)"), padding: "8px 16px", fontSize: 11, width: "100%" }}>Sign Out</button>
      </div>
    </div>
  );
}

// ── DASHBOARD ────────────────────────────────────────────
function Dashboard({ client, clientId }) {
  const [docs, setDocs] = useState([]);
  const [dates, setDates] = useState([]);
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    if (!clientId) return;
    supabase.from("aks_documents").select("*").eq("client_id", clientId).order("created_at", { ascending: false }).limit(3).then(({ data }) => setDocs(data || []));
    supabase.from("aks_due_dates").select("*").eq("client_id", clientId).eq("status", "pending").order("due_date").limit(5).then(({ data }) => setDates(data || []));
    supabase.from("aks_messages").select("*").eq("client_id", clientId).eq("read", false).then(({ data }) => setMsgs(data || []));
  }, [clientId]);

  const daysLeft = (date) => {
    const diff = Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const urgencyColor = (days) => days < 0 ? "#C62828" : days <= 7 ? "#E65100" : days <= 15 ? "#F57F17" : "#2E7D32";

  return (
    <div>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 30, fontWeight: 400, color: NAVY, marginBottom: 6 }}>
        Welcome, <em style={{ color: GOLD }}>{client?.name?.split(" ")[0]}</em>
      </div>
      <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, color: "#888", marginBottom: 28 }}>
        Here's your compliance overview
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Pending Due Dates", value: dates.length, color: NAVY, icon: "📅" },
          { label: "Unread Messages", value: msgs.length, color: GOLD, icon: "💬" },
          { label: "Recent Documents", value: docs.length, color: "#2E7D32", icon: "📁" },
        ].map(s => (
          <div key={s.label} style={{ background: "#fff", border: "1px solid #E8E2D9", padding: "20px 18px", display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 28 }}>{s.icon}</span>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 600, color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: "#999", marginTop: 3 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming due dates */}
      <div style={S.card}>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: GOLD, marginBottom: 14 }}>Upcoming Due Dates</div>
        {dates.length === 0 ? (
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, color: "#bbb", textAlign: "center", padding: "20px 0" }}>No pending due dates 🎉</div>
        ) : dates.map(d => {
          const days = daysLeft(d.due_date);
          return (
            <div key={d.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #F0ECE6" }}>
              <div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, fontWeight: 500, color: "#1A1A1A" }}>{d.title}</div>
                <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{d.category} · Due: {new Date(d.due_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div>
              </div>
              <div style={S.tag(urgencyColor(days))}>
                {days < 0 ? "Overdue" : days === 0 ? "Today!" : `${days}d left`}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent docs */}
      <div style={S.card}>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: GOLD, marginBottom: 14 }}>Recent Documents</div>
        {docs.length === 0 ? (
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, color: "#bbb", textAlign: "center", padding: "20px 0" }}>No documents yet</div>
        ) : docs.map(d => (
          <div key={d.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #F0ECE6" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 20 }}>📄</span>
              <div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: 500, color: "#1A1A1A" }}>{d.name}</div>
                <div style={{ fontSize: 11, color: "#aaa" }}>{d.category} · {d.financial_year} · {d.uploaded_by === "ca" ? "From CA" : "Uploaded by you"}</div>
              </div>
            </div>
            <span style={S.tag(d.uploaded_by === "ca" ? GOLD : NAVY)}>{d.uploaded_by === "ca" ? "From CA" : "Yours"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── DOCUMENTS ────────────────────────────────────────────
function Documents({ clientId }) {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState("Other");
  const [fy, setFy] = useState("2025-26");
  const [notes, setNotes] = useState("");
  const [tab, setTab] = useState("all");

  const fetchDocs = async () => {
    const { data } = await supabase.from("aks_documents").select("*").eq("client_id", clientId).order("created_at", { ascending: false });
    setDocs(data || []);
    setLoading(false);
  };

  useEffect(() => { if (clientId) fetchDocs(); }, [clientId]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const path = `${clientId}/${Date.now()}_${file.name}`;
    const { error: upErr } = await supabase.storage.from("aks-documents").upload(path, file);
    if (!upErr) {
      await supabase.from("aks_documents").insert({
        client_id: clientId, name: file.name, file_path: path,
        file_size: file.size, category, uploaded_by: "client", financial_year: fy, notes
      });
      fetchDocs();
      setNotes("");
    }
    setUploading(false);
    e.target.value = "";
  };

  const handleDownload = async (doc) => {
    const { data } = await supabase.storage.from("aks-documents").createSignedUrl(doc.file_path, 60);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
  };

  const filtered = tab === "all" ? docs : docs.filter(d => d.uploaded_by === tab);

  const CATS = ["GST Return", "ITR", "Bank Statement", "Audit Report", "Certificate", "Invoice", "Balance Sheet", "Other"];

  return (
    <div>
      <div style={S.sectionTitle}>📁 Documents</div>

      {/* Upload box */}
      <div style={{ ...S.card, border: `1px dashed ${GOLD}`, background: "#FFFDF5" }}>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: GOLD, marginBottom: 14 }}>Upload Document</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div>
            <label style={S.label}>Category</label>
            <select style={{ ...S.input, appearance: "none" }} value={category} onChange={e => setCategory(e.target.value)}>
              {CATS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={S.label}>Financial Year</label>
            <select style={{ ...S.input, appearance: "none" }} value={fy} onChange={e => setFy(e.target.value)}>
              {["2025-26", "2024-25", "2023-24", "2022-23"].map(y => <option key={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label style={S.label}>Notes (optional)</label>
            <input style={S.input} placeholder="e.g. Q1 return" value={notes} onChange={e => setNotes(e.target.value)} />
          </div>
        </div>
        <label style={{ display: "inline-block", cursor: "pointer" }}>
          <input type="file" style={{ display: "none" }} onChange={handleUpload} disabled={uploading} />
          <div style={{ ...S.btn(NAVY, "#fff"), display: "inline-flex", alignItems: "center", gap: 8 }}>
            {uploading ? "Uploading…" : "📤 Choose File & Upload"}
          </div>
        </label>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, marginBottom: 16, borderBottom: "2px solid #E8E2D9" }}>
        {[["all", "All"], ["client", "Uploaded by Me"], ["ca", "From CA"]].map(([val, label]) => (
          <button key={val} onClick={() => setTab(val)} style={{ ...S.btn("transparent", tab === val ? NAVY : "#aaa"), borderBottom: tab === val ? `2px solid ${GOLD}` : "2px solid transparent", marginBottom: -2, padding: "10px 20px" }}>
            {label}
          </button>
        ))}
      </div>

      {/* Doc list */}
      {loading ? <div style={{ textAlign: "center", color: "#aaa", padding: 40 }}>Loading…</div> :
        filtered.length === 0 ? <div style={{ textAlign: "center", color: "#bbb", padding: 40 }}>No documents found</div> :
          filtered.map(doc => (
            <div key={doc.id} style={{ ...S.card, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 24 }}>📄</span>
                <div>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, fontWeight: 500, color: "#1A1A1A" }}>{doc.name}</div>
                  <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>
                    {doc.category} · FY {doc.financial_year} · {new Date(doc.created_at).toLocaleDateString("en-IN")}
                    {doc.notes && ` · ${doc.notes}`}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={S.tag(doc.uploaded_by === "ca" ? GOLD : NAVY)}>{doc.uploaded_by === "ca" ? "From CA" : "Yours"}</span>
                <button onClick={() => handleDownload(doc)} style={{ ...S.btn(NAVY, "#fff"), padding: "7px 14px", fontSize: 11 }}>Download</button>
              </div>
            </div>
          ))
      }
    </div>
  );
}

// ── CALENDAR ─────────────────────────────────────────────
function Calendar({ clientId }) {
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!clientId) return;
    supabase.from("aks_due_dates").select("*").eq("client_id", clientId).order("due_date").then(({ data }) => {
      setDates(data || []);
      setLoading(false);
    });
  }, [clientId]);

  const daysLeft = (date) => Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24));
  const urgencyColor = (days) => days < 0 ? "#C62828" : days <= 7 ? "#E65100" : days <= 15 ? "#F57F17" : "#2E7D32";

  const statusColor = { pending: NAVY, filed: "#2E7D32", na: "#888" };
  const filtered = filter === "all" ? dates : dates.filter(d => d.status === filter);

  return (
    <div>
      <div style={S.sectionTitle}>📅 Compliance Calendar</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[["all", "All"], ["pending", "Pending"], ["filed", "Filed"], ["na", "N/A"]].map(([val, label]) => (
          <button key={val} onClick={() => setFilter(val)} style={{ ...S.btn(filter === val ? NAVY : "#fff", filter === val ? "#fff" : "#888"), border: "1px solid #E8E2D9", padding: "7px 16px", fontSize: 12 }}>{label}</button>
        ))}
      </div>
      {loading ? <div style={{ textAlign: "center", color: "#aaa", padding: 40 }}>Loading…</div> :
        filtered.length === 0 ? <div style={{ textAlign: "center", color: "#bbb", padding: 40 }}>No due dates found</div> :
          filtered.map(d => {
            const days = daysLeft(d.due_date);
            return (
              <div key={d.id} style={{ ...S.card, display: "flex", justifyContent: "space-between", alignItems: "center", borderLeft: `4px solid ${urgencyColor(days)}` }}>
                <div>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 15, fontWeight: 600, color: "#1A1A1A" }}>{d.title}</div>
                  <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
                    {d.category} · Due: {new Date(d.due_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                    {d.notes && ` · ${d.notes}`}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                  <span style={S.tag(statusColor[d.status] || NAVY)}>{d.status.toUpperCase()}</span>
                  {d.status === "pending" && <span style={S.tag(urgencyColor(days))}>{days < 0 ? "Overdue" : days === 0 ? "Today!" : `${days} days left`}</span>}
                </div>
              </div>
            );
          })
      }
    </div>
  );
}

// ── MESSAGES ─────────────────────────────────────────────
function Messages({ clientId }) {
  const [msgs, setMsgs] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [sending, setSending] = useState(false);

  const fetchMsgs = async () => {
    const { data } = await supabase.from("aks_messages").select("*").eq("client_id", clientId).order("created_at");
    setMsgs(data || []);
    await supabase.from("aks_messages").update({ read: true }).eq("client_id", clientId).eq("sender", "ca");
  };

  useEffect(() => { if (clientId) fetchMsgs(); }, [clientId]);

  const sendMsg = async () => {
    if (!newMsg.trim()) return;
    setSending(true);
    await supabase.from("aks_messages").insert({ client_id: clientId, sender: "client", message: newMsg.trim() });
    setNewMsg("");
    fetchMsgs();
    setSending(false);
  };

  return (
    <div>
      <div style={S.sectionTitle}>💬 Messages</div>
      <div style={{ ...S.card, minHeight: 400, display: "flex", flexDirection: "column", padding: 0, overflow: "hidden" }}>
        <div style={{ background: NAVY, padding: "14px 20px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: 14 }}>AS</div>
          <div>
            <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, fontWeight: 600, color: "#F9F7F4" }}>CA Arun Sachdev</div>
            <div style={{ fontSize: 11, color: "rgba(249,247,244,0.5)" }}>FCA · FCS · Managing Partner</div>
          </div>
        </div>
        <div style={{ flex: 1, padding: 20, overflowY: "auto", minHeight: 300, background: "#FAFAFA" }}>
          {msgs.length === 0 ? (
            <div style={{ textAlign: "center", color: "#bbb", padding: "40px 0", fontFamily: "'Outfit',sans-serif", fontSize: 13 }}>No messages yet. Say hello! 👋</div>
          ) : msgs.map(m => (
            <div key={m.id} style={{ display: "flex", justifyContent: m.sender === "client" ? "flex-end" : "flex-start", marginBottom: 12 }}>
              <div style={{ maxWidth: "70%", padding: "10px 14px", background: m.sender === "client" ? NAVY : "#fff", color: m.sender === "client" ? "#F9F7F4" : "#1A1A1A", border: m.sender === "ca" ? "1px solid #E8E2D9" : "none", borderRadius: 2 }}>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, lineHeight: 1.6 }}>{m.message}</div>
                <div style={{ fontSize: 10, marginTop: 4, opacity: 0.5, textAlign: "right" }}>{new Date(m.created_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: "14px 16px", borderTop: "1px solid #E8E2D9", display: "flex", gap: 10 }}>
          <input style={{ ...S.input, flex: 1 }} placeholder="Type a message…" value={newMsg} onChange={e => setNewMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMsg()} />
          <button style={{ ...S.btn(GOLD, "#fff"), padding: "10px 20px", flexShrink: 0 }} onClick={sendMsg} disabled={sending || !newMsg.trim()}>
            {sending ? "…" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ─────────────────────────────────────────────
export default function Portal() {
  const [session, setSession] = useState(null);
  const [client, setClient] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [active, setActive] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setSession(session);
      if (!session) { setClient(null); setClientId(null); }
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    supabase.from("aks_clients").select("*").eq("user_id", session.user.id).single().then(({ data }) => {
      if (data) { setClient(data); setClientId(data.id); }
      else {
        // Auto-create client record if not exists
        supabase.from("aks_clients").insert({ user_id: session.user.id, name: session.user.email.split("@")[0], email: session.user.email }).select().single().then(({ data: newClient }) => {
          if (newClient) { setClient(newClient); setClientId(newClient.id); }
        });
      }
    });
  }, [session]);

  const handleLogout = () => supabase.auth.signOut();

  if (loading) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Outfit',sans-serif", color: NAVY }}>Loading…</div>;
  if (!session) return <Login onLogin={setSession} />;

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Outfit',sans-serif", background: BG }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Outfit:wght@300;400;500;600&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; }`}</style>
      <Sidebar active={active} setActive={setActive} client={client} onLogout={handleLogout} />
      <main style={{ flex: 1, padding: "36px 40px", overflowY: "auto", maxWidth: 900 }}>
        {active === "dashboard" && <Dashboard client={client} clientId={clientId} />}
        {active === "documents" && <Documents clientId={clientId} />}
        {active === "calendar" && <Calendar clientId={clientId} />}
        {active === "messages" && <Messages clientId={clientId} />}
      </main>
    </div>
  );
}
