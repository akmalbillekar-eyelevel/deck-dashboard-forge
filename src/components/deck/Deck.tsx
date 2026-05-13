import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScaledSlide } from "./ScaledSlide";
import { slides } from "./slides";
import { slideMeta } from "@/lib/deck-data";

export function Deck() {
  const [i, setI] = useState(0);
  const [grid, setGrid] = useState(false);
  const [showStrip, setShowStrip] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);

  const total = slides.length;
  const next = useCallback(() => setI((v) => Math.min(total - 1, v + 1)), [total]);
  const prev = useCallback(() => setI((v) => Math.max(0, v - 1)), []);

  const enterFullscreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
      else if (e.key === "ArrowLeft") prev();
      else if (e.key.toLowerCase() === "g") setGrid((g) => !g);
      else if (e.key.toLowerCase() === "f") enterFullscreen();
      else if (e.key.toLowerCase() === "n") setNotesOpen((v) => !v);
      else if (e.key === "Escape") { setGrid(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, enterFullscreen]);

  // Edge hover for thumbnail strip
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (e.clientX < 24) setShowStrip(true);
      else if (e.clientX > 220) setShowStrip(false);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const Current = slides[i];
  const meta = slideMeta[i];

  return (
    <div className="fixed inset-0 bg-paper text-ink overflow-hidden">
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-foreground/5 z-30">
        <motion.div
          className="h-full bg-foreground"
          animate={{ width: `${((i + 1) / total) * 100}%` }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        />
      </div>

      {/* Slide stage */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0"
          >
            <ScaledSlide><Current /></ScaledSlide>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide counter — top-right (small) */}
      <div className="fixed top-3 right-5 z-30 text-[10px] tabular tracking-[0.18em] uppercase text-muted-foreground select-none pointer-events-none">
        <span className="text-ink">{String(i + 1).padStart(2, "0")}</span>
        <span className="mx-1.5 opacity-40">/</span>
        <span>{String(total).padStart(2, "0")}</span>
      </div>

      {/* Slide counter bottom-right */}
      <div className="fixed bottom-5 right-6 z-30 text-[12px] tabular tracking-[0.16em] uppercase text-muted-foreground select-none">
        <span className="text-ink">{String(i + 1).padStart(2, "0")}</span>
        <span className="mx-2 opacity-40">/</span>
        <span>{String(total).padStart(2, "0")}</span>
      </div>

      {/* Floating Present button */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        <button
          onClick={enterFullscreen}
          className="magnetic rounded-full border thin-rule bg-paper/80 backdrop-blur px-5 py-2 text-[13px] tracking-wide hover:bg-foreground hover:text-paper"
        >
          Present · F
        </button>
        <button
          onClick={() => setGrid(true)}
          className="magnetic rounded-full border thin-rule bg-paper/80 backdrop-blur px-4 py-2 text-[12px] tracking-wide text-muted-foreground hover:text-ink"
        >
          Grid · G
        </button>
        <button
          onClick={() => setNotesOpen((v) => !v)}
          className="magnetic rounded-full border thin-rule bg-paper/80 backdrop-blur px-4 py-2 text-[12px] tracking-wide text-muted-foreground hover:text-ink"
        >
          Notes · N
        </button>
      </div>

      {/* Edge nav arrows (subtle) */}
      <button onClick={prev} aria-label="Previous"
        className="fixed left-2 top-1/2 -translate-y-1/2 z-20 h-24 w-10 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-muted-foreground">
        ←
      </button>
      <button onClick={next} aria-label="Next"
        className="fixed right-2 top-1/2 -translate-y-1/2 z-20 h-24 w-10 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-muted-foreground">
        →
      </button>

      {/* Thumbnail strip — appears at left edge */}
      <AnimatePresence>
        {showStrip && !grid && (
          <motion.aside
            initial={{ x: -220, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -220, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="fixed left-0 top-0 bottom-0 w-[200px] bg-paper/95 backdrop-blur border-r thin-rule z-40 overflow-y-auto py-6"
            onMouseLeave={() => setShowStrip(false)}
          >
            <div className="px-5 mb-4 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Slides</div>
            {slideMeta.map((m, idx) => (
              <button
                key={m.number}
                onClick={() => setI(idx)}
                className={`block w-full text-left px-5 py-2 text-[13px] magnetic ${idx === i ? "text-ink" : "text-muted-foreground hover:text-ink"}`}
              >
                <span className="tabular mr-3 opacity-70">{m.number}</span>
                {m.title}
              </button>
            ))}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Grid overview */}
      <AnimatePresence>
        {grid && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-paper overflow-y-auto p-12"
          >
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Overview</div>
                <h2 className="text-[36px] font-medium tracking-tight mt-2">All slides · {total}</h2>
              </div>
              <button onClick={() => setGrid(false)} className="text-[13px] text-muted-foreground hover:text-ink magnetic">Close · ESC</button>
            </div>
            <div className="grid grid-cols-4 gap-6">
              {slides.map((S, idx) => (
                <button key={idx} onClick={() => { setI(idx); setGrid(false); }}
                  className="text-left magnetic group">
                  <div className="aspect-[16/9] relative overflow-hidden border thin-rule rounded-md bg-paper">
                    <div className="absolute inset-0" style={{ transform: "scale(0.21)", transformOrigin: "top left", width: 1920, height: 1080 }}>
                      <div className="slide-content" style={{ pointerEvents: "none" }}><S/></div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-[12px] tabular text-muted-foreground">
                    <span>{slideMeta[idx].number}</span>
                    <span className="group-hover:text-ink">{slideMeta[idx].title}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Presenter notes */}
      <AnimatePresence>
        {notesOpen && (
          <motion.div
            initial={{ y: 200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 200, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-0 left-0 right-0 z-40 border-t thin-rule bg-paper/95 backdrop-blur px-12 py-6"
          >
            <div className="flex items-start justify-between gap-12">
              <div className="flex-1">
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Presenter notes · {meta.number} {meta.title}</div>
                <p className="mt-2 text-[16px] leading-relaxed max-w-[1100px]">{meta.notes}</p>
              </div>
              <button onClick={() => setNotesOpen(false)} className="text-[12px] text-muted-foreground hover:text-ink magnetic mt-1">Close · N</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
