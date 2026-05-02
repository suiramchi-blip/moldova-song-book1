import React, { useEffect, useMemo, useRef, useState } from "react";

type Song = {
  id: number;
  title: string;
  key: string;     // e.g. "E", "D", "Bm"
  capo?: number;   // optional
  lyrics: string;
  chords: string;  // your “camp chart” (can contain lyrics lines too)
  youtube?: string;
};

const songsData: Song[] = [
  {
    id: 1,
    title: "Binecuvintează Doamne Tu Moldova",
    key: "E",
    capo: 0,
    youtube: "https://youtu.be/Vy74JQwt8is?si=F1yqCk_X6yxD_Yh7",
    lyrics: `R:
Binecuvintează Doamne, Tu Moldova!
Binecuvintează țara mea;
Vino cu putere, vino cu trezire,
Te rugăm, Isus, ai milă de ea.

1:
Noi Te chemăm, arată-Ți puterea,
Dă-ne credință din nou, Te rugăm;
Ajută-ne să Te cunoaștem,
Să Te-ascultăm, Doamne, să Te iubim.

2:
Suntem flămânzi, Doamne, de Tine,
Pâinea vieții doar Tu ne-o poți da;
Suntem setoși de neprihănire
Cu apa vieții inundă țara mea.`,
chords: `
R: 
E        A    B        E
/: 
Binecuvintează Doamne, Tu Moldova!
E        A        E B
Binecuvintează țara mea;
E        A    B     E
Vino cu putere, vino cu trezire,
E        A        B     E
Te rugăm, Isus, ai milă de ea. :/
E     B        E
1. Noi Te chemăm, arată-Ți puterea,
A        E     B     E
Dă-ne credință din nou, Te rugăm;
E B        E
Ajută-ne să Te cunoaștem,
A        E           B   E
Să Te-ascultăm, Doamne, să Te iubim.

2. Suntem flămânzi, Doamne, de Tine,
Pâinea vieții doar Tu ne-o poți da.
Suntem setoși de neprihănire
Cu apa vieții inundă țara mea.
`,
  },
  {
    id: 2,
    title: "Iată-mă Tu trimite-mă",
    key: "E",
    capo: 0,
    lyrics: `Iată-mă, Tu trimite-mă
Oriunde vrei, folosește-mă
Pe strada mea sau în depărtări
Iată-mă, Tu trimite-mă.`,
    chords: `E       A
Iată-mă, Tu trimite-mă
B       E
Oriunde vrei, folosește-mă
E       A
Pe strada mea sau în depărtări
E     B   E
Iată-mă, Tu trimite-mă.`,
  },
];

type ViewMode = "lyrics" | "both";
type SectionType = "chorus" | "verse" | "bridge" | "other";

const MOLDOVA_FLAG_URL =
  "https://upload.wikimedia.org/wikipedia/commons/2/27/Flag_of_Moldova.svg";

// ---------- Section detection + chorus bold ----------
function detectSectionLabel(line: string): { isLabel: boolean; type: SectionType; labelText: string } {
  const s = line.trim();
  if (!s) return { isLabel: false, type: "other", labelText: "" };

  if (/^(R|R:|Ref|Ref\.|Refren|Chorus)\b/i.test(s)) {
    return { isLabel: true, type: "chorus", labelText: s.replace(/^R\b/i, "R") };
  }
  if (/^\d+\s*[:.]/.test(s) || /^\d+\s*$/.test(s)) {
    return { isLabel: true, type: "verse", labelText: s.replace(/\s+/g, " ") };
  }
  if (/^bridge\b/i.test(s)) {
    return { isLabel: true, type: "bridge", labelText: "Bridge" };
  }
  return { isLabel: false, type: "other", labelText: "" };
}

function renderWithSectionStyling(
  text: string,
  opts: { stageMode: boolean; dark: boolean; autoBoldChorus: boolean; mono?: boolean }
) {
  const lines = text.split("\n");
  let currentSection: SectionType = "other";

  const containerStyle: React.CSSProperties = {
    whiteSpace: "pre-wrap",
    fontFamily: opts.mono
      ? "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
      : "Arial, sans-serif",
    fontSize: opts.stageMode ? 28 : 15,
    lineHeight: opts.stageMode ? 1.7 : 1.55,
    color: opts.dark ? "#fff" : "#000",
    marginTop: 14,
  };

  const labelStyle = (type: SectionType): React.CSSProperties => ({
    display: "inline-block",
    padding: opts.stageMode ? "6px 12px" : "4px 10px",
    borderRadius: 999,
    fontWeight: 900,
    margin: "10px 0 6px",
    letterSpacing: 0.5,
    background:
      opts.dark
        ? "rgba(255,255,255,0.12)"
        : type === "chorus"
        ? "rgba(11,95,255,0.12)"
        : "rgba(0,0,0,0.06)",
    color: opts.dark ? "#fff" : type === "chorus" ? "#0B5FFF" : "#111",
  });

  return (
    <div style={containerStyle}>
      {lines.map((line, idx) => {
        const { isLabel, type, labelText } = detectSectionLabel(line);
        if (isLabel) {
          currentSection = type;
          return (
            <div key={idx}>
              <span style={labelStyle(type)}>{labelText}</span>
            </div>
          );
        }

        const shouldBold =
          opts.autoBoldChorus && currentSection === "chorus" && line.trim().length > 0;

        return (
          <div key={idx} style={{ fontWeight: shouldBold ? 900 : 500 }}>
            {line}
          </div>
        );
      })}
    </div>
  );
}

// ---------- Transpose helpers (semitones) ----------
const NOTES_SHARP = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
const NOTES_FLAT  = ["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"];

const ENHARMONIC_TO_SHARP: Record<string, string> = {
  "Db": "C#",
  "Eb": "D#",
  "Gb": "F#",
  "Ab": "G#",
  "Bb": "A#",
  "Cb": "B",
  "Fb": "E",
  "E#": "F",
  "B#": "C",
}

function normNoteToSharp(n: string) {
  return ENHARMONIC_TO_SHARP[n] ?? n;
}

function transposeNote(note: string, semis: number, preferFlats: boolean) {
  const base = normNoteToSharp(note);
  const idx = NOTES_SHARP.indexOf(base);
  if (idx < 0) return note;
  const next = (idx + semis + 1200) % 12;
  return preferFlats ? NOTES_FLAT[next] : NOTES_SHARP[next];
}

function transposeChordToken(token: string, semis: number, preferFlats: boolean) {
  // Root is first letter A-G + optional accidental
  const m = token.match(/^([A-G])([#b]?)(.*)$/);
  if (!m) return token;

  const root = m[1] + (m[2] || "");
  let rest = m[3] || "";

  // Slash chord: transpose bass too (e.g., C/E)
  if (rest.includes("/")) {
    const [beforeSlash, afterSlash] = rest.split("/", 2);
    const bassMatch = afterSlash.match(/^([A-G])([#b]?)(.*)$/);
    if (bassMatch) {
      const bassRoot = bassMatch[1] + (bassMatch[2] || "");
      const bassRest = bassMatch[3] || "";
      const newBass = transposeNote(bassRoot, semis, preferFlats);
      rest = `${beforeSlash}/${newBass}${bassRest}`;
    }
  }

  const newRoot = transposeNote(root, semis, preferFlats);
  return `${newRoot}${rest}`;
}

// This regex matches chord tokens without touching Romanian words.
// It requires A-G then optional #/b and then only “chord-ish” chars (m,a,j,i,n,u,d,s,g, digits, /, #, b, +, -, (, ))


// Matches chord tokens like:
// E, F#, Bb, C#m7, Asus4, G/B, D/F#
const CHORD_TOKEN_RX =
  /\b([A-G])(#|b)?([a-zA-Z0-9()+/-]*)\b/g;


  function transposeText(text: string, semis: number, preferFlats: boolean) {
    if (semis === 0) return text;
  
    return text.replace(CHORD_TOKEN_RX, (full) => {
      return transposeChordToken(full, semis, preferFlats);
    });
  }
  ``

function transposeKeyLabel(key: string, semis: number, preferFlats: boolean) {
  // key like "E" or "Bm" — transpose root only
  const m = key.match(/^([A-G])([#b]?)(m)?$/i);
  if (!m) return key;
  const root = m[1].toUpperCase() + (m[2] || "");
  const minor = m[3] ? "m" : "";
  const newRoot = transposeNote(root, semis, preferFlats);
  return `${newRoot}${minor}`;
}

// ---------- Wake lock + Fullscreen ----------
function btnStyle(dark: boolean): React.CSSProperties {
  return {
    padding: "6px 10px",
    cursor: "pointer",
    borderRadius: 8,
    border: dark ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(0,0,0,0.15)",
    background: dark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.95)",
    color: dark ? "#fff" : "#111",
    fontSize: 13,
  };
}

function pillStyle(active: boolean, dark: boolean): React.CSSProperties {
  return {
    padding: "8px 12px",
    margin: "0 6px 10px",
    cursor: "pointer",
    borderRadius: 999,
    border: active
      ? dark
        ? "1px solid #9BE7FF"
        : "1px solid #0B5FFF"
      : dark
      ? "1px solid rgba(255,255,255,0.25)"
      : "1px solid rgba(0,0,0,0.15)",
    background: active
      ? dark
        ? "rgba(155,231,255,0.15)"
        : "rgba(11,95,255,0.10)"
      : dark
      ? "rgba(255,255,255,0.06)"
      : "rgba(255,255,255,0.95)",
    color: dark ? "#fff" : "#111",
    fontSize: 14,
    fontWeight: active ? 800 : 500,
  };
}

// ---------- APP ----------
export default function App() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("lyrics");

  const [stageMode, setStageMode] = useState(false);
  const [showFlag, setShowFlag] = useState(false);
  const [keepAwake, setKeepAwake] = useState(false);
  const [autoBoldChorus, setAutoBoldChorus] = useState(true);

  // Transpose controls (Lyrics + Chords mode)
  const [transposeSemis, setTransposeSemis] = useState(0);
  const [preferFlats, setPreferFlats] = useState(false);

  const wakeLockRef = useRef<any>(null);

  const dark = stageMode;

  const containerStyle: React.CSSProperties = useMemo(() => {
    const base: React.CSSProperties = {
      minHeight: "100vh",
      padding: stageMode ? 28 : 20,
      fontFamily: "Arial, sans-serif",
      background: stageMode ? "#000" : "#fff",
      color: stageMode ? "#fff" : "#000",
    };

    if (showFlag && !stageMode) {
      base.backgroundImage = `linear-gradient(rgba(255,255,255,0.78), rgba(255,255,255,0.78)), url('${MOLDOVA_FLAG_URL}')`;
      base.backgroundSize = "cover";
      base.backgroundPosition = "center";
      base.backgroundRepeat = "no-repeat";
    }

    return base;
  }, [stageMode, showFlag]);

  // Wake lock (Keep Screen On) [2](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/wakeLock)
  useEffect(() => {
    let cancelled = false;

    async function enableWakeLock() {
      try {
        if (!("wakeLock" in navigator)) return;
        // @ts-ignore
        const sentinel = await navigator.wakeLock.request("screen");
        if (cancelled) {
          await sentinel.release();
          return;
        }
        wakeLockRef.current = sentinel;

        const onVis = async () => {
          if (document.visibilityState === "visible" && keepAwake) {
            try {
              // @ts-ignore
              wakeLockRef.current = await navigator.wakeLock.request("screen");
            } catch {}
          }
        };
        document.addEventListener("visibilitychange", onVis);

        return () => document.removeEventListener("visibilitychange", onVis);
      } catch {}
    }

    async function disableWakeLock() {
      try {
        if (wakeLockRef.current) {
          await wakeLockRef.current.release();
          wakeLockRef.current = null;
        }
      } catch {}
    }

    if (keepAwake) enableWakeLock();
    else disableWakeLock();

    return () => {
      cancelled = true;
      disableWakeLock();
    };
  }, [keepAwake]);

  const metaStyle: React.CSSProperties = {
    textAlign: "center",
    fontSize: stageMode ? 18 : 14,
    opacity: dark ? 0.9 : 0.8,
    marginTop: 6,
  };

  // Build display text for Lyrics+Chords, then transpose it
  const bothText = useMemo(() => {
    if (!selectedSong) return "";
    // If your chords already include lyrics lines, show that chart only; otherwise append lyrics
    const raw =
      selectedSong.chords.split("\n").some((l) => /[a-zA-ZăâîșțĂÂÎȘȚ]/.test(l))
        ? selectedSong.chords
        : `${selectedSong.chords}\n\n${selectedSong.lyrics}`;

    return transposeText(raw, transposeSemis, preferFlats);
  }, [selectedSong, transposeSemis, preferFlats]);

  const displayKey = useMemo(() => {
    if (!selectedSong) return "";
    return transposeKeyLabel(selectedSong.key, transposeSemis, preferFlats);
  }, [selectedSong, transposeSemis, preferFlats]);

  return (
    <div style={containerStyle}>
      {!selectedSong ? (
        // ===== SONG LIST =====
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h1 style={{ textAlign: "center", fontWeight: 900, marginBottom: 16 }}>
            Song List
          </h1>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "center" }}>
            {songsData.map((song) => (
              <div
                key={song.id}
                onClick={() => {
                  setSelectedSong(song);
                  setViewMode("lyrics");
                  setStageMode(false);
                  setTransposeSemis(0);
                  setPreferFlats(false);
                }}
                style={{
                  cursor: "pointer",
                  padding: "10px 8px",
                  borderRadius: 10,
                  border: "1px solid rgba(0,0,0,0.10)",
                  background: "rgba(255,255,255,0.98)",
                }}
              >
                <div style={{ fontWeight: 800, fontSize: 18 }}>{song.title}</div>
                <div style={{ fontSize: 14, opacity: 0.85 }}>
                  Key: {song.key} {song.capo && song.capo > 0 ? `• Capo: ${song.capo}` : ""}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // ===== SONG VIEW =====
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          {/* Top bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => setSelectedSong(null)}
              style={{
                background: "none",
                border: "none",
                color: dark ? "#9BE7FF" : "#0066cc",
                cursor: "pointer",
                fontSize: 16,
                padding: 0,
              }}
            >
              ← Back
            </button>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
              <button onClick={() => setStageMode((v) => !v)} style={btnStyle(dark)}>
                {stageMode ? "Exit Stage" : "Stage Mode"}
              </button>

              <button onClick={() => setShowFlag((v) => !v)} style={btnStyle(dark)} disabled={stageMode}>
                {showFlag ? "Hide Flag" : "Show Flag"}
              </button>

              <button onClick={() => setKeepAwake((v) => !v)} style={btnStyle(dark)}>
                {keepAwake ? "Screen Awake ✓" : "Keep Screen On"}
              </button>

              <button onClick={() => setAutoBoldChorus((v) => !v)} style={btnStyle(dark)}>
                {autoBoldChorus ? "Chorus Bold ✓" : "Chorus Bold"}
              </button>
            </div>
          </div>

          <h2 style={{ textAlign: "center", fontWeight: 900, fontSize: stageMode ? 38 : 22, marginTop: 14 }}>
            {selectedSong.title}
          </h2>
              
          {selectedSong.youtube && !stageMode && (
  <div style={{ textAlign: "center", marginTop: 6 }}>
    <a
      href={selectedSong.youtube}
      target="_blank"
      rel="noopener noreferrer"
    >
      ▶ Watch on YouTube
    </a>
  </div>
)}
          {/* Key + Capo + Transposed Key */}
          <div style={metaStyle}>
            Key: <b>{displayKey}</b> • Capo:{" "}
            <b>{selectedSong.capo && selectedSong.capo > 0 ? selectedSong.capo : "—"}</b>
            {transposeSemis !== 0 ? (
              <span style={{ marginLeft: 10 }}>
                (Transpose: <b>{transposeSemis > 0 ? `+${transposeSemis}` : transposeSemis}</b>)
              </span>
            ) : null}
          </div>

          {!stageMode && (
            <>
              {/* Modes */}
              <div style={{ textAlign: "center", marginTop: 12, marginBottom: 6 }}>
                <button onClick={() => setViewMode("lyrics")} style={pillStyle(viewMode === "lyrics", dark)}>
                  Lyrics Only
                </button>
                <button onClick={() => setViewMode("both")} style={pillStyle(viewMode === "both", dark)}>
                  Lyrics + Chords
                </button>
              </div>

              {/* Transpose controls only in Lyrics+Chords */}
              {viewMode === "both" && (
                <div style={{ textAlign: "center", marginBottom: 8 }}>
                  <button onClick={() => setTransposeSemis((v) => v - 1)} style={btnStyle(dark)}>
                    −1
                  </button>
                  <button onClick={() => setTransposeSemis(0)} style={{ ...btnStyle(dark), margin: "0 8px" }}>
                    Reset
                  </button>
                  <button onClick={() => setTransposeSemis((v) => v + 1)} style={btnStyle(dark)}>
                    +1
                  </button>

                  <button
                    onClick={() => setPreferFlats((v) => !v)}
                    style={{ ...btnStyle(dark), marginLeft: 10 }}
                    title="Switch between sharps (#) and flats (b) in transposed chords"
                  >
                    {preferFlats ? "Use Sharps (#)" : "Use Flats (b)"}
                  </button>
                </div>
              )}
            </>
          )}

          {/* Content */}
          {viewMode === "lyrics"
            ? renderWithSectionStyling(selectedSong.lyrics, {
                stageMode,
                dark,
                autoBoldChorus,
                mono: false,
              })
            : renderWithSectionStyling(bothText, {
                stageMode,
                dark,
                autoBoldChorus,
                mono: true,
              })}
        </div>
      )}
    </div>
  );
}
