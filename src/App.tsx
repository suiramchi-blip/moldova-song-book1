import React, { useEffect, useMemo, useRef, useState } from "react";

type Song = {
  id: number;
  title: string;
  key: string;
  capo?: number;
  lyrics: string;
  chords: string;
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
  E         A     B            E
/:Binecuvintează Doamne, Tu Moldova!
E        A           E B
Binecuvintează țara mea;
E          A    B          E
Vino cu putere, vino cu trezire,
E           A       B      E
Te rugăm, Isus, ai milă de ea. :/
1. 
E   B                      E
Noi Te chemăm, arată-Ți puterea,
A         E         B         E
Dă-ne credință din nou, Te rugăm;
E B                E
Ajută-ne să Te cunoaștem,
A          E            B      E
Să Te-ascultăm, Doamne, să Te iubim.

2. 
Suntem flămânzi, Doamne, de Tine,
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
    youtube: "https://www.scoala-duminicala.ro/wp-content/uploads/2017/01/Iata-ma.mp3",
    lyrics: `Iată-mă, Tu trimite-mă
Oriunde vrei, folosește-mă
Pe strada mea sau în depărtări
Iată-mă, Tu trimite-mă.`,
    chords: `
 E             A
Iată-mă, Tu trimite-mă
B                 E
Oriunde vrei, folosește-mă
    E                A
Pe strada mea sau în depărtări
     E         B    E
Iată-mă, Tu trimite-mă.`,
  },
  {
    id: 3,
    title: "Când eram doar un plod fără chip",
    key: "C",
    capo: 0,
    youtube: "https://www.youtube.com/watch?v=C1fBEod-8jA",
    lyrics: `1.
/: Când eram doar un plod fără chip 
Ochii Tăi mă vedeau 
În Cartea Ta de mult erau scrise 
Zilele ce m-așteptau. : / 
 
R: 
Tu-mi știi viitorul și ești lângă mine 
De ce să mă îngrijorez? 
Mi-ai promis că vei sta lângă mine 
Nicicând n-ai să mă părăsești. 
 
2. 
/: De voi încerca să m-ascund de Tine 
Nu voi reuși 
Oriunde m-aș duce, chiar la marginea mării 
Mâna Ta mă va călăuzi. :/ 
 
3. 
/: Tu mă cunoști întru totul Doamne 
Când stau jos sau mă ridic 
Îmi cunoști toate căile mele 
Nu pot ascunde nimic. : /`,
    chords: `
1.  
    C                F 
/: Când eram doar un plod fără chip 
G              C 
Ochii Tăi mă vedeau 
    C           F 
În Cartea Ta de mult erau scrise 
    G           C  
Zilele ce m-așteptau. : / 
 
R:
       C               F
Tu-mi știi viitorul și ești lângă mine 
    G              C
De ce să mă îngrijorez? 
C                     F    
Mi-ai promis că vei sta lângă mine 
    G                   C 
Nicicând n-ai să mă părăsești. 

2. 
/: De voi încerca să m-ascund de Tine
Nu voi reuși
Oriunde m-aș duce, chiar la marginea mării
Mâna Ta mă va călăuzi. : /

3. 
/: Tu mă cunoști întru totul Doamne
Când stau jos sau mă ridic
Îmi cunoști toate căile mele
Nu pot ascunde nimic. : /
`,
  },
  {
    id: 4,
    title: "Când sunt slab, Tu mă faci Tare",
    key: "C",
    capo: 0,
    youtube: "https://www.youtube.com/watch?v=39qmNUJzFns",
    lyrics: `1.
În fiecare dimineață Tu îmi spui 
Ridică-te, fă-ți patul și umblă 
Voi merge nencetat pe urma ta 
Chiar zi si noapte voi cinta așa 
Da, eu voi cânta așa... 

R.
/: Când sunt slab, Tu mă faci Tare 
Când sunt mic, Tu mă faci Mare 
Cu toată puterea Ta,  
Tu lucrezi în viața mea :// 
    
2.    
Când văd muntele din fața mea
Tu îmi dai curaj să-l pot urca.
Uriașii nu mă pot împiedica
Cu Tine biruința este-a mea
Da, biruința este-a mea!

R.
/: Când sunt slab, Tu mă faci Tare
Când sunt mic, Tu mă faci Mare
Cu toată puterea Ta, 
Tu lucrezi în viața mea :/

R Final.
/Zi de zi aleg să merg la pas cu tine
În Tine este toată încrederea mea
Anii trec dar eu aleg să stau lângă Tine
Tu Dumnezeu ești victoria mea./2x`,
    chords: `
1.    
    Am                        F
În fiecare dimineață Tu îmi spui
  C                        G
Ridică-te, fă-ți patul și umblă
    Am                     F
Voi merge nencetat pe urma ta
      C                       G
Chiar zi si noapte voi cinta așa
C                 G
Da, eu voi cânta așa...

R.
    F                  C
/: Când sunt slab, Tu mă faci Tare
G                 Am
Când sunt mic, Tu mă faci Mare
F           C
Cu toată puterea Ta, 
       G            Am
Tu lucrezi în viața mea ://

2.    
Când văd muntele din fața mea
Tu îmi dai curaj să-l pot urca.
Uriașii nu mă pot împiedica
Cu Tine biruința este-a mea
Da, biruința este-a mea!

R.
/: Când sunt slab, Tu mă faci Tare
Când sunt mic, Tu mă faci Mare
Cu toată puterea Ta, 
Tu lucrezi în viața mea :/

R Final.
/Zi de zi aleg să merg la pas cu tine
În Tine este toată încrederea mea
Anii trec dar eu aleg să stau lângă Tine
Tu Dumnezeu ești victoria mea./2x
`,
  },
  {
    id: 5,
    title: "Tu ești credincios",
    key: "D",
    capo: 0,
    youtube: "https://www.youtube.com/watch?v=NlPpPw_o1KA",
    lyrics: `1.    
Tu ești credincios, tot ce faci e desăvârșit
Ce începi duci la bun sfârșit, o, Tată, Tu ești credincios!
Tu ești credincios, m-ai convins cu iubirea Ta
Tu ești Doamne minunea mea, o, Tată, Tu ești credincios!

R.
Îmi ridic mâinile spre Tine, în Tine-i nădejdea mea
Tu lucrezi Tată pentru mine, Tu nu mă vei abandona
Îmi ridic ochii către Tine, recunosc bunătatea Ta
Eu sunt lucraarea Ta!

2. 
Tu ești credincios, m-ai ales după planul Tău
Îmi vorbești azi prin Duhul Tău, o, Tată, Tu ești credincios!
Tu ești credincios, Tu ești Tatăl luminilor
Vreau s-arăt asta tuturor, o, Tată, Tu ești credincios!

B.
Eu sunt lucraarea Lui, lucraarea Tatălui!

R Final. 
/: Tot ce ai început în mine, Tu vei duce la bun sfârșit
Tot ce ai început în mine, Tu vei duce la bun sfârșit!
Frică eu nu mai am în mine, dragostea Ta m-a izbăvit
Eu sunt lucraarea ta, Tu bucuria mea! : /`,
    chords: `
 1.     
               D            G             D
Tu ești credincios, tot ce faci e desăvârșit
    G                   A          G                  D G
Ce începi duci la bun sfârșit, o, Tată, Tu ești credincios!
               D             G              D
Tu ești credincios, m-ai convins cu iubirea Ta
        G               A       G                   D G
Tu ești Doamne minunea mea, o, Tată, Tu ești credincios!

R.
       G               A         D       A/C#      Bm
Îmi ridic mâinile spre Tine, în Tine-i nădejdea mea
       G                A          D         Em   D/F#
Tu lucrezi Tată pentru mine, Tu nu mă vei abandona
       G               A        D       A/C#  Bm  G
Îmi ridic ochii către Tine, recunosc bunătatea Ta
A                D
Eu sunt lucraarea Ta!

2. 
Tu ești credincios, m-ai ales după planul Tău
Îmi vorbești azi prin Duhul Tău, o, Tată, Tu ești credincios!
Tu ești credincios, Tu ești Tatăl luminilor
Vreau s-arăt asta tuturor, o, Tată, Tu ești credincios!

B.
D                 G                 D
Eu sunt lucraarea Lui, lucraarea Tatălui!

R Final.
    G             A                  D      A/C#     Bm
/: Tot ce ai început în mine, Tu vei duce la bun sfârșit
G              A                   D      A/C#    Bm
Tot ce ai început în mine, Tu vei duce la bun sfârșit!
G               A                 D         A/C#   Bm
Frică eu nu mai am în mine, dragostea Ta m-a izbăvit
                 G   A           A
Eu sunt lucraarea ta, Tu bucuria mea! : /
`,
  },
  {
    id: 6,
    title: "Leagă-ți inima de cer",
    key: "D",
    capo: 0,
    youtube: "https://www.youtube.com/watch?v=TuiogypPJPE",
    lyrics: `R.
/: Leagă-ți inima de Cer,
Leagă-ți viața ta de Dumnezeu,
Viitorul tău este în mâna Sa!
Prin credință-naintezi,
Deschide ochii inimii să-L vezi,
Este lângă tine, trebuie doar să crezi! :/

1. 
Predă-ți viața, în brațul Domnului,
Să conducă-al tău destin, spre Cer!
Oferă-I totul, chiar și când nu-nțelegi,
E suveran și-n viața ta!

C.
/: Inima, mintea mea,
Sunt legate de Cer!
Transformă-mi viața,
După-al Tău plan perfect! :/`,
    chords: `
R.
             D        A
/: Leagă-ți inima de Cer,
         Bm           G
Leagă-ți viața ta de Dumnezeu,
  D           A           G
Viitorul tău este în mâna Sa!
         D       A
Prin credință-naintezi,
          Bm      G
Deschide ochii inimii să-L vezi,
      D             A               G
Este lângă tine, trebuie doar să crezi:/

1.
D                   A          Bm
Predă-ți viața, în brațul Domnului,
       G             D         A
Să conducă-al tău destin, spre Cer!
Em       D           A             Bm
Oferă-I totul, chiar și când nu-nțelegi,
       C            G A
E suveran și-n viața ta!

C.
   D  A    Bm        G
/: Inima, mintea mea,
       D A      G
Sunt legate de Cer!
      D  A     Bm G
Transformă-mi viața,
         D   A       G
După-al Tău plan perfect! :/
`,
  },
];

// ---------- YouTube helpers ----------
function isYouTubeUrl(url?: string) {
  if (!url) return false;
  return /(^https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(url);
}

function toYouTubeEmbedUrl(url: string) {
  const trimmed = url.trim();

  const embedMatch = trimmed.match(/youtube\.com\/embed\/([^?&/]+)/i);
  if (embedMatch?.[1]) return `https://www.youtube.com/embed/${embedMatch[1]}`;

  const shortMatch = trimmed.match(/youtu\.be\/([^?&/]+)/i);
  if (shortMatch?.[1]) return `https://www.youtube.com/embed/${shortMatch[1]}`;

  const watchMatch = trimmed.match(/[?&]v=([^?&/]+)/i);
  if (watchMatch?.[1]) return `https://www.youtube.com/embed/${watchMatch[1]}`;

  return "";
}

// ---------- Section detection + chorus bold ----------
function detectSectionLabel(line: string): { isLabel: boolean; type: SectionType; labelText: string } {
  const s = line.trim();
  if (!s) return { isLabel: false, type: "other", labelText: "" };

  if (/^(R|R:|R\.|Ref|Ref\.|Refren|Chorus)\b/i.test(s)) {
    return { isLabel: true, type: "chorus", labelText: s };
  }
  if (/^\d+\s*[:.]/.test(s) || /^\d+\s*$/.test(s)) {
    return { isLabel: true, type: "verse", labelText: s.replace(/\s+/g, " ") };
  }
  if (/^bridge\b/i.test(s)) {
    return { isLabel: true, type: "bridge", labelText: "Bridge" };
  }
  return { isLabel: false, type: "other", labelText: "" };
}

/**
 * Existing fit-to-screen tuning:
 * - Responsive font size for phones
 * - Slightly tighter lineHeight for mono view
 * - Negative letterSpacing for mono view to reduce wrapping
 */
function renderWithSectionStyling(
  text: string,
  opts: { stageMode: boolean; dark: boolean; autoBoldChorus: boolean; mono?: boolean }
) {
  const lines = text.split("\n");
  let currentSection: SectionType = "other";

  const isPhone = typeof window !== "undefined" && window.innerWidth < 420;

  const containerStyle: React.CSSProperties = {
    whiteSpace: "pre-wrap",
    fontFamily: opts.mono
      ? "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
      : "Arial, sans-serif",

    fontSize: opts.stageMode ? 28 : isPhone ? 14 : 16,

    lineHeight: opts.stageMode ? 1.7 : opts.mono ? 1.45 : 1.6,

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
          opts.autoBoldChorus &&
          currentSection === "chorus" &&
          line.trim().length > 0;

        return (
          <div
            key={idx}
            style={{
              fontWeight: shouldBold ? 900 : 500,
              letterSpacing: opts.mono ? "-0.3px" : undefined,
            }}
          >
            {line}
          </div>
        );
      })}
    </div>
  );
}

// ---------- Transpose helpers ----------
const NOTES_SHARP = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
const NOTES_FLAT  = ["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"];

const ENHARMONIC_TO_SHARP: Record<string, string> = {
  Db: "C#",
  Eb: "D#",
  Gb: "F#",
  Ab: "G#",
  Bb: "A#",
  Cb: "B",
  Fb: "E",
  "E#": "F",
  "B#": "C",
};

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
  const m = token.match(/^([A-G])([#b]?)(.*)$/);
  if (!m) return token;

  const root = m[1] + (m[2] || "");
  let rest = m[3] || "";

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

const CHORD_TOKEN_RX = /\b([A-G])(#|b)?([a-zA-Z0-9()+/-]*)\b/g;

function transposeText(text: string, semis: number, preferFlats: boolean) {
  if (semis === 0) return text;
  return text.replace(CHORD_TOKEN_RX, (full) => transposeChordToken(full, semis, preferFlats));
}

function transposeKeyLabel(key: string, semis: number, preferFlats: boolean) {
  const m = key.match(/^([A-G])([#b]?)(m)?$/i);
  if (!m) return key;
  const root = m[1].toUpperCase() + (m[2] || "");
  const minor = m[3] ? "m" : "";
  const newRoot = transposeNote(root, semis, preferFlats);
  return `${newRoot}${minor}`;
}

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

export default function App() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("lyrics");

  const [stageMode, setStageMode] = useState(false);
  const [showFlag, setShowFlag] = useState(false);
  const [keepAwake, setKeepAwake] = useState(false);
  const [autoBoldChorus, setAutoBoldChorus] = useState(true);

  const [showVideo, setShowVideo] = useState(false);

  const [transposeSemis, setTransposeSemis] = useState(0);
  const [preferFlats, setPreferFlats] = useState(false);

  // Force a re-render on rotation so the hint can appear/disappear
  const [, setViewportTick] = useState(0);

  const wakeLockRef = useRef<any>(null);

  const dark = stageMode;

  useEffect(() => {
    const onResize = () => setViewportTick((v) => v + 1);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const containerStyle: React.CSSProperties = useMemo(() => {
    const base: React.CSSProperties = {
      minHeight: "100vh",
      padding: stageMode ? 28 : 20,
      paddingBottom: showVideo ? 260 : 20,
      fontFamily: "Arial, sans-serif",
      background: stageMode ? "#000" : "#eaf4ff",
      color: stageMode ? "#fff" : "#000",
    };

    if (showFlag && !stageMode) {
      base.backgroundImage = `linear-gradient(rgba(255,255,255,0.78), rgba(255,255,255,0.78)), url('${MOLDOVA_FLAG_URL}')`;
      base.backgroundSize = "cover";
      base.backgroundPosition = "center";
      base.backgroundRepeat = "no-repeat";
    }
    return base;
  }, [stageMode, showFlag, showVideo]);

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

  const bothText = useMemo(() => {
    if (!selectedSong) return "";
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

  useEffect(() => {
    setShowVideo(false);
  }, [selectedSong?.id]);

  const embedUrl = useMemo(() => {
    if (!selectedSong?.youtube) return "";
    if (!isYouTubeUrl(selectedSong.youtube)) return "";
    return toYouTubeEmbedUrl(selectedSong.youtube);
  }, [selectedSong?.youtube]);

  const metaStyle: React.CSSProperties = {
    textAlign: "center",
    fontSize: stageMode ? 18 : 14,
    opacity: dark ? 0.9 : 0.8,
    marginTop: 6,
  };

  return (
    <div style={containerStyle}>
      <style>{`
        .moldovaTitle {
          font-weight: 900;
          letter-spacing: 0.5px;
          text-align: center;
          margin-bottom: 16px;
          font-size: 38px;
          background: linear-gradient(
            90deg,
            #0033A0 0%,
            #0033A0 33%,
            #FFD100 33%,
            #FFD100 66%,
            #CE1126 66%,
            #CE1126 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 100%;
          animation: moldovaWave 3.5s ease-in-out infinite;
          text-shadow: 0 1px 10px rgba(0,0,0,0.12);
        }
        @keyframes moldovaWave {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @media (max-width: 480px) {
          .moldovaTitle { font-size: 30px; }
        }
      `}</style>

      {!selectedSong ? (
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h1 className="moldovaTitle">Moldova 2026</h1>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "center" }}>
            {songsData.map((song) => (
              <div
                key={`${song.id}-${song.title}`}
                onClick={() => {
                  setSelectedSong(song);
                  setViewMode("lyrics");
                  setStageMode(false);
                  setShowFlag(false);
                  setTransposeSemis(0);
                  setPreferFlats(false);
                  setShowVideo(false);
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
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => {
                setSelectedSong(null);
                setStageMode(false);
                setShowFlag(false);
                setTransposeSemis(0);
                setPreferFlats(false);
                setShowVideo(false);
              }}
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

          {embedUrl && !stageMode && (
            <div style={{ textAlign: "center", marginTop: 10, marginBottom: 6 }}>
              <button
                onClick={() => setShowVideo((v) => !v)}
                style={{
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: "1px solid #b00000",
                  background: "#ff4d4d",
                  color: "#000",
                  fontWeight: 800,
                  cursor: "pointer",
                  fontSize: 14,
                  transition: "transform 0.1s ease",
                }}
              >
                {showVideo ? "Hide Video" : "▶ Play Video"}
              </button>

              {showVideo && (
                <div style={{ marginTop: 6, fontSize: 12, opacity: 0.7 }}>
                  Video playing (floating window)
                </div>
              )}
            </div>
          )}

          {selectedSong.youtube && !embedUrl && !stageMode && (
            <div style={{ textAlign: "center", marginTop: 6 }}>
              <a href={selectedSong.youtube} target="_blank" rel="noopener noreferrer">
                ▶ Open Audio/Link
              </a>
            </div>
          )}

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
              <div style={{ textAlign: "center", marginTop: 12, marginBottom: 6 }}>
                <button onClick={() => setViewMode("lyrics")} style={pillStyle(viewMode === "lyrics", dark)}>
                  Lyrics Only
                </button>
                <button onClick={() => setViewMode("both")} style={pillStyle(viewMode === "both", dark)}>
                  Lyrics + Chords
                </button>
              </div>

              {viewMode === "both" && (
                <div style={{ textAlign: "center", marginBottom: 8 }}>
                  <button onClick={() => setTransposeSemis((v) => v - 1)} style={btnStyle(dark)}>
                    -1
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

          {/* ✅ Landscape hint: ONLY for Lyrics + Chords + phone portrait + not stage */}
          {viewMode === "both" && isPhonePortrait() && !stageMode && (
            <div
              style={{
                textAlign: "center",
                fontSize: 12,
                opacity: 0.65,
                marginBottom: 8,
              }}
            >
              Tip: rotate phone to landscape for better chord alignment
            </div>
          )}

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

      {/* Floating YouTube mini-player overlay */}
      {showVideo && embedUrl && (
        <div
          style={{
            position: "fixed",
            bottom: 16,
            right: 16,
            width: 340,
            maxWidth: "92vw",
            paddingTop: "56.25%",
            background: "#000",
            borderRadius: 10,
            boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
            zIndex: 9999,
            overflow: "hidden",
          }}
        >
          <iframe
            src={embedUrl}
            title="YouTube player"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
          <button
            onClick={() => setShowVideo(false)}
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              background: "rgba(0,0,0,0.65)",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              padding: "2px 8px",
              fontSize: 12,
            }}
            aria-label="Close video"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
