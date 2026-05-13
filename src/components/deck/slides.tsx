import { Fragment, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart, Line, ResponsiveContainer,
} from "recharts";
import { Tween } from "./Tween";
import { Landmark, ShieldCheck, Globe2, Trophy, Building2, BadgeCheck, Star, Users, Sparkles, CalendarDays, MapPin, Repeat, Briefcase, Flag, GraduationCap, Award, Heart, Handshake, Layers, TrendingUp, Dumbbell } from "lucide-react";
import { images, logos } from "@/lib/deck-data";

/* ---------- Shared atoms ---------- */

function SectorTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[13px] tracking-[0.18em] uppercase text-muted-foreground">
      <span className="h-px w-6 bg-foreground/40" />
      {children}
    </span>
  );
}

function SlideHeader({ tag, title, sub, logoKey, logoLabel }: { tag: string; title: string; sub?: string; logoKey?: string; logoLabel?: string }) {
  return (
    <header className="mb-8 flex items-start justify-between gap-8">
      <div className="flex-1 min-w-0">
        <SectorTag>{tag}</SectorTag>
        <h1 className="mt-5 text-[64px] leading-[1.05] font-medium tracking-[-0.02em] text-ink">
          {title}
        </h1>
        {sub && (
          <p className="mt-4 max-w-[1100px] text-[22px] leading-[1.45] text-muted-foreground font-light">
            {sub}
          </p>
        )}
      </div>
      {logoKey && <LogoSlot logoKey={logoKey} label={logoLabel ?? logoKey} />}
    </header>
  );
}

function Grid12({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-12 gap-8 flex-1 min-h-0">{children}</div>;
}

type AboutItem = { Icon: typeof Landmark; t: string; s: string };
function AboutGrid({ label, items, footer, cols = 3 }: { label: string; items: AboutItem[]; footer?: string; cols?: 2 | 3 }) {
  return (
    <div className="mb-5">
      <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-3">{label}</div>
      <div className={`grid ${cols === 3 ? "grid-cols-3" : "grid-cols-2"} gap-x-6 gap-y-3`}>
        {items.map(({ Icon, t, s }) => (
          <div key={t} className="flex gap-3 border-t thin-rule pt-2.5">
            <Icon className="h-4 w-4 mt-1 text-[color:var(--slate-tone)] shrink-0" strokeWidth={1.5} />
            <div className="min-w-0">
              <div className="text-[14px] font-medium text-ink leading-tight">{t}</div>
              <div className="text-[12px] text-muted-foreground leading-snug mt-0.5">{s}</div>
            </div>
          </div>
        ))}
      </div>
      {footer && <div className="text-[12px] text-muted-foreground italic mt-3">{footer}</div>}
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <div className="text-[12px] tracking-[0.16em] uppercase text-muted-foreground">{label}</div>
      <div className="mt-2 text-[44px] font-medium tabular tracking-tight text-ink leading-none">{value}</div>
      {sub && <div className="mt-2 text-[14px] text-muted-foreground tabular">{sub}</div>}
    </div>
  );
}

function LogoSlot({ logoKey, label }: { logoKey: string; label: string }) {
  const src = logos[logoKey];
  return (
    <div className="shrink-0 bg-paper rounded-md border thin-rule p-4 flex items-center justify-center" style={{ minWidth: 280, minHeight: 192 }}>
      {src ? (
        <img src={src} alt={`${label} logo`} className="h-40 w-auto block" />
      ) : (
        <div className="h-40 w-64 flex flex-col items-center justify-center gap-1 text-[12px] tracking-[0.18em] uppercase text-muted-foreground border border-dashed border-foreground/20 rounded-sm">
          <span>Logo</span>
          <span className="text-[10px] tracking-[0.14em] opacity-70">{label}</span>
        </div>
      )}
    </div>
  );
}

export function S01() {
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex items-center justify-between">
        <SectorTag>S For Sport — Diversification Memorandum</SectorTag>
        <span className="text-[13px] tracking-[0.18em] uppercase text-muted-foreground tabular">2026</span>
      </div>
      <div>
        <h1 className="text-[160px] leading-[0.95] font-medium tracking-[-0.035em] text-ink max-w-[1600px]">
          Diversifying<br/>S For Sport.
        </h1>
        <p className="mt-10 text-[32px] text-muted-foreground font-light max-w-[1100px]">
          Six plays. One brand. Spread the bet across leagues, venues, grassroots & events.
        </p>
      </div>
      <div className="flex items-end justify-between text-[14px] tabular">
        <div className="grid grid-cols-3 gap-12">
          <div><div className="text-muted-foreground uppercase tracking-[0.16em] text-[11px]">Diversified plays</div><div className="mt-1 text-[28px] font-medium">06</div></div>
          <div><div className="text-muted-foreground uppercase tracking-[0.16em] text-[11px]">Capital range</div><div className="mt-1 text-[28px] font-medium">₹16L – ₹16Cr</div></div>
          <div><div className="text-muted-foreground uppercase tracking-[0.16em] text-[11px]">Horizon</div><div className="mt-1 text-[28px] font-medium">3–5 years</div></div>
        </div>
        <div className="text-muted-foreground">Confidential — do not distribute</div>
      </div>
    </div>
  );
}

/* ---------- 02 Big Picture ---------- */


function AnimatedHeadline({ text }: { text: string }) {
  return (
    <h1 className="mt-5 text-[64px] leading-[1.05] font-medium tracking-[-0.02em] text-ink">
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.012, ease: "easeOut" }}
          style={{ display: "inline-block", whiteSpace: ch === " " ? "pre" : "normal" }}
        >
          {ch}
        </motion.span>
      ))}
    </h1>
  );
}

export function S02() {
  const pillars = [
    { Icon: Trophy, t: "Leagues", s: "TNPPL · CPL · CPPL" },
    { Icon: Building2, t: "Venues", s: "A for Arena anchor" },
    { Icon: GraduationCap, t: "Grassroots", s: "Schools & colleges" },
    { Icon: CalendarDays, t: "Events", s: "Paddle City Open" },
  ];
  const why = [
    { Icon: TrendingUp, n: "4", t: "Asset classes", s: "Leagues, venues, grassroots, events — never one bet." },
    { Icon: Sparkles, n: "6", t: "Independent plays", s: "Each stands alone. Together they de-risk the brand." },
    { Icon: Handshake, n: "1", t: "Brand compounding", s: "Every play feeds S For Sport's flywheel." },
  ];
  return (
    <>
      <header className="mb-8">
        <SectorTag>The Thesis</SectorTag>
        <AnimatedHeadline text="Don't bet S For Sport on one league. Diversify it." />
        <p className="mt-4 text-[22px] leading-[1.45] text-muted-foreground font-light max-w-[1200px]">
          Spread the brand across leagues, venues, grassroots and events. Each play compounds the others.
        </p>
      </header>

      <div className="grid grid-cols-4 gap-5 mb-7">
        {pillars.map(({ Icon, t, s }, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.08 }}
            className="border thin-rule rounded-md p-5 flex flex-col gap-2"
          >
            <Icon className="h-8 w-8 text-[color:var(--slate-tone)]" strokeWidth={1.5} />
            <div className="text-[22px] font-medium tracking-tight text-ink mt-1">{t}</div>
            <div className="text-[13px] text-muted-foreground">{s}</div>
          </motion.div>
        ))}
      </div>

      <Grid12>
        <div className="col-span-7 flex flex-col gap-4">
          <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">Why now</div>
          {why.map(({ Icon, n, t, s }, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="flex items-center gap-5 border-t thin-rule pt-4"
            >
              <Icon className="h-7 w-7 text-[color:var(--slate-tone)] shrink-0" strokeWidth={1.5} />
              <div className="text-[34px] tabular font-medium tracking-tight text-ink w-[140px]">{n}</div>
              <div className="flex-1">
                <div className="text-[18px] font-medium text-ink leading-tight">{t}</div>
                <div className="text-[14px] text-muted-foreground mt-1">{s}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="col-span-5 border thin-rule rounded-md p-6 flex flex-col">
          <div className="text-[12px] tracking-[0.16em] uppercase text-muted-foreground">Benchmarks · what's possible</div>
          <div className="mt-4 border-t thin-rule">
            {[
              { Icon: Trophy, code: "MLP", value: "65×", detail: "$200K → $13M (USA, 4 yrs)" },
              { Icon: Star, code: "CCL", value: "₹50 Cr", detail: "Annual ad revenue · 14 seasons" },
              { Icon: Flag, code: "ISL", value: "3×", detail: "Title sponsorship in 6 yrs" },
              { Icon: Award, code: "UTT", value: "1.3×", detail: "JioStar 3-yr broadcast (2025)" },
            ].map(({ Icon, code, value, detail }) => (
              <div key={code} className="grid grid-cols-12 items-center py-3.5 border-b thin-rule gap-3">
                <Icon className="h-5 w-5 text-[color:var(--slate-tone)] col-span-1" strokeWidth={1.5} />
                <div className="col-span-7">
                  <div className="text-[13px] tracking-[0.16em] uppercase text-muted-foreground">{code}</div>
                  <div className="text-[12px] text-ink/80 mt-0.5">{detail}</div>
                </div>
                <div className="col-span-4 text-right text-[28px] font-medium tabular tracking-tight">{value}</div>
              </div>
            ))}
          </div>
          <div className="mt-auto border-t thin-rule pt-4 text-[14px] text-ink leading-relaxed">
            Diversification is the moat. <span className="font-medium">That is how S For Sport wins.</span>
          </div>
        </div>
      </Grid12>
    </>
  );
}

/* ---------- 03 Portfolio Overview ---------- */

const portfolio = [
  { n: "01", name: "TNPPL Franchise", cat: "League Franchise", inv: "₹31L", ret: "₹7.5L – ₹23L per season", roi: "Variable", kind: "play" },
  { n: "02", name: "CPL — Celebrity Pickleball League", cat: "Celebrity Franchise", inv: "₹30L", ret: "₹15L – ₹30L Year 1", roi: "50% – 100%+", kind: "play" },
  { n: "03", name: "CPPL — Corporate Pickleball League", cat: "League IP", inv: "₹8–12L per city", ret: "₹31.5L – ₹41.5L per city", roi: "80% – 108%", kind: "play" },
  { n: "04", name: "Inter-School & College League", cat: "Grassroots IP", inv: "₹16L", ret: "₹24L – ₹44L Year 1", roi: "150% – 275%", kind: "play" },
  { n: "05", name: "Paddle City Open", cat: "Event Circuit", inv: "₹72L", ret: "~₹40L Year 1", roi: "~55%", kind: "play" },
  { n: "06", name: "A for Arena — Multi-Sport Club", cat: "Infrastructure", inv: "₹14–16 Cr", ret: "₹10.58 Cr EBITDA Year 3", roi: "Asset value ₹40–55 Cr", kind: "anchor" },
];

const connections: { Icon: typeof Sparkles; k: string; v: string }[] = [
  { Icon: GraduationCap, k: "Grassroots", v: "Schools & colleges feed the pipeline." },
  { Icon: CalendarDays, k: "Events", v: "Paddle City Open builds reach." },
  { Icon: Trophy, k: "Leagues", v: "TNPPL · CPL · CPPL monetise the audience." },
  { Icon: Building2, k: "Venues", v: "A for Arena anchors it all." },
];

export function S03() {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <>
      <SlideHeader
        tag="Portfolio Overview"
        title="Six ways to diversify S For Sport."
        sub="Four asset classes. Six independent plays. One brand getting bigger from every direction."
      />
      <div className="border-t thin-rule">
        <div className="grid grid-cols-12 text-[11px] uppercase tracking-[0.16em] text-muted-foreground py-3 border-b thin-rule">
          <div className="col-span-1">#</div>
          <div className="col-span-7">Opportunity</div>
          <div className="col-span-4">Category</div>
        </div>
        {portfolio.map((p) => (
          <div
            key={p.n}
            onMouseEnter={() => setHover(p.n)}
            onMouseLeave={() => setHover(null)}
            className={`grid grid-cols-12 py-4 border-b thin-rule items-center magnetic ${hover === p.n ? "bg-muted/60" : ""}`}
          >
            <div className="col-span-1 tabular text-[15px] text-muted-foreground">{p.n}</div>
            <div className="col-span-7 text-[20px] font-medium tracking-tight leading-tight">
              {p.name}
              {p.kind === "anchor" && <span className="ml-3 text-[10px] uppercase tracking-[0.16em] text-[color:var(--sage-tone)]">Anchor</span>}
            </div>
            <div className="col-span-4 text-[14px] text-muted-foreground">{p.cat}</div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-4">How they diversify the brand</div>
        <div className="grid grid-cols-4 gap-5">
          {connections.map(({ Icon, k, v }) => (
            <div key={k} className="border thin-rule rounded-md p-5 flex flex-col gap-2">
              <Icon className="h-7 w-7 text-[color:var(--slate-tone)]" strokeWidth={1.5} />
              <div className="text-[18px] font-medium tracking-tight text-ink mt-1">{k}</div>
              <div className="text-[13px] text-muted-foreground leading-snug">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ---------- Investment Slide template (interactive ticket size + heat strip ROI) ---------- */

function HeatStrip({
  years, values, pinned, onPin,
}: { years: string[]; values: number[]; pinned: number | null; onPin: (i: number | null) => void }) {
  const max = Math.max(...values);
  return (
    <div className="grid" style={{ gridTemplateColumns: `repeat(${years.length}, 1fr)` }}>
      {years.map((y, i) => {
        const t = values[i] / max;
        const bg = `color-mix(in oklch, var(--slate-tone) ${Math.round(t * 55)}%, var(--paper))`;
        const isPinned = pinned === i;
        return (
          <button
            key={y}
            onMouseEnter={() => onPin(i)}
            onMouseLeave={() => onPin(null)}
            onClick={() => onPin(isPinned ? null : i)}
            className={`heat-cell text-left px-5 py-6 border-r last:border-r-0 thin-rule ${isPinned ? "ring-1 ring-foreground/60" : ""}`}
            style={{ backgroundColor: bg }}
          >
            <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{y}</div>
            <div className="mt-2 text-[26px] font-medium tabular">₹{values[i].toFixed(1)}L</div>
          </button>
        );
      })}
    </div>
  );
}

function Sparkline({ values, focus }: { values: number[]; focus: number | null }) {
  const data = values.map((v, i) => ({ i, v }));
  return (
    <div className="h-[110px] -mb-2">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
          <Line type="monotone" dataKey="v" stroke="var(--ink)" strokeWidth={1.5} dot={(props) => {
            const { cx, cy, index } = props as { cx: number; cy: number; index: number };
            const active = focus === index;
            return <circle key={index} cx={cx} cy={cy} r={active ? 5 : 2.5} fill={active ? "var(--ink)" : "var(--ink)"} opacity={active ? 1 : 0.5} />;
          }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function TicketStepper({
  value, min, max, step, onChange, format,
}: { value: number; min: number; max: number; step: number; onChange: (v: number) => void; format: (v: number) => string }) {
  return (
    <div className="border thin-rule rounded-md p-5">
      <div className="flex items-center justify-between text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
        <span>Ticket size</span>
        <span className="tabular">{format(min)} – {format(max)}</span>
      </div>
      <div className="mt-3 flex items-center justify-between gap-4">
        <button onClick={() => onChange(Math.max(min, value - step))} className="h-10 w-10 border thin-rule rounded magnetic hover:bg-muted text-[20px]">−</button>
        <div className="text-[42px] font-medium tabular tracking-tight">{format(value)}</div>
        <button onClick={() => onChange(Math.min(max, value + step))} className="h-10 w-10 border thin-rule rounded magnetic hover:bg-muted text-[20px]">+</button>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full mt-4 accent-foreground"
      />
    </div>
  );
}

/* ---------- Compact investment-slide helpers ---------- */

function KpiStrip({ items }: { items: { label: string; value: string; sub?: string; strong?: boolean }[] }) {
  return (
    <div className="grid gap-3 mb-5" style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}>
      {items.map((it) => (
        <div key={it.label} className={`border thin-rule rounded-md p-5 ${it.strong ? "bg-foreground text-paper" : ""}`}>
          <div className={`text-[12px] uppercase tracking-[0.16em] ${it.strong ? "opacity-70" : "text-muted-foreground"}`}>{it.label}</div>
          <div className="text-[38px] font-medium tabular tracking-tight mt-1.5 leading-none">{it.value}</div>
          {it.sub && <div className={`text-[13px] mt-2 ${it.strong ? "opacity-70" : "text-muted-foreground"}`}>{it.sub}</div>}
        </div>
      ))}
    </div>
  );
}

function InvestTable({ title, rows }: { title: string; rows: { k: string; v: string; strong?: boolean; muted?: boolean }[] }) {
  return (
    <div className="border thin-rule rounded-md p-5">
      <div className="text-[13px] uppercase tracking-[0.16em] text-muted-foreground mb-2">{title}</div>
      {rows.map((r) => (
        <div key={r.k} className={`flex justify-between gap-4 border-t thin-rule py-2.5 text-[16px] ${r.strong ? "text-ink font-medium" : ""}`}>
          <span className={r.strong ? "" : "text-muted-foreground"}>{r.k}</span>
          <span className={`tabular text-right ${r.muted ? "text-muted-foreground" : ""}`}>{r.v}</span>
        </div>
      ))}
    </div>
  );
}

function ReturnsTable({
  title, cols, rows,
}: {
  title: string;
  cols: [string, string, string];
  rows: { k: string; a: string; b: string; total?: boolean; note?: boolean }[];
}) {
  return (
    <div className="border thin-rule rounded-md flex flex-col min-h-0">
      <div className="px-5 py-3 border-b thin-rule text-[13px] uppercase tracking-[0.16em] text-muted-foreground">{title}</div>
      <div className="grid grid-cols-12 px-5 py-2.5 text-[12px] uppercase tracking-[0.14em] text-muted-foreground border-b thin-rule">
        <div className="col-span-6">{cols[0]}</div>
        <div className="col-span-3 text-right">{cols[1]}</div>
        <div className="col-span-3 text-right">{cols[2]}</div>
      </div>
      {rows.map((r) => (
        <div key={r.k} className={`grid grid-cols-12 px-5 py-2.5 text-[16px] border-t thin-rule ${r.total ? "bg-muted/25" : ""}`}>
          <div className={`col-span-6 ${r.total ? "text-ink font-medium" : "text-muted-foreground"}`}>{r.k}</div>
          {r.note ? (
            <div className="col-span-6 text-[14px] text-muted-foreground italic text-right">{r.a}</div>
          ) : (
            <>
              <div className={`col-span-3 text-right tabular ${r.total ? "text-ink font-medium" : ""}`}>{r.a}</div>
              <div className={`col-span-3 text-right tabular ${r.total ? "text-ink font-medium" : ""}`}>{r.b}</div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

function HorizonPicker({
  label, points, format = (v: number) => `₹${v}L`,
}: {
  label: string;
  points: { label: string; value: number; sub?: string }[];
  format?: (v: number) => string;
}) {
  const [i, setI] = useState(points.length - 1);
  const max = Math.max(...points.map((p) => Math.abs(p.value)));
  return (
    <div className="border thin-rule rounded-md p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[13px] uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
        <div className="text-[12px] text-muted-foreground tabular">Hover or tap</div>
      </div>
      <div className="text-[13px] uppercase tracking-[0.16em] text-muted-foreground">{points[i].label}</div>
      <Tween
        value={points[i].value}
        format={(v) => format(v)}
        className="block mt-1.5 text-[64px] font-medium tabular tracking-tight leading-none"
      />
      {points[i].sub && <div className="text-[14px] text-muted-foreground mt-2.5">{points[i].sub}</div>}
      <div className="mt-5 grid gap-2" style={{ gridTemplateColumns: `repeat(${points.length}, 1fr)` }}>
        {points.map((p, idx) => {
          const active = idx === i;
          const w = Math.max(0.05, Math.abs(p.value) / max);
          return (
            <button
              key={p.label}
              onMouseEnter={() => setI(idx)}
              onClick={() => setI(idx)}
              className={`magnetic border thin-rule rounded p-2.5 text-left transition-colors ${active ? "bg-foreground text-paper" : "hover:bg-muted/40"}`}
            >
              <div className={`text-[11px] uppercase tracking-[0.14em] ${active ? "opacity-70" : "text-muted-foreground"}`}>{p.label}</div>
              <div className="text-[16px] tabular mt-1">{format(p.value)}</div>
              <div className={`mt-1.5 h-[3px] rounded-full ${active ? "bg-paper/70" : "bg-foreground/15"}`} style={{ transform: `scaleX(${w})`, transformOrigin: "left" }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TakeawayList({ title, items }: { title: string; items: { Icon: typeof Sparkles; t: string; s: string }[] }) {
  return (
    <div className="border thin-rule rounded-md p-5">
      <div className="text-[13px] uppercase tracking-[0.16em] text-muted-foreground mb-3">{title}</div>
      <ul className="space-y-2.5">
        {items.map(({ Icon, t, s }) => (
          <li key={t} className="flex gap-3 border-t thin-rule pt-2.5">
            <Icon className="h-4 w-4 mt-1 text-[color:var(--slate-tone)] shrink-0" strokeWidth={1.5} />
            <div className="min-w-0">
              <span className="text-[15px] font-medium text-ink">{t}</span>{" "}
              <span className="text-[14px] text-muted-foreground">{s}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}



export function S04() {
  return (
    <>
      <SlideHeader tag="04 · TNPPL · Opportunity"
        title="Own a Tamil Nadu Pickleball franchise."
        sub="Tamil Nadu Pickleball Premier League (TNPPL) — Season 2 · Jawaharlal Nehru Indoor Stadium, Chennai (Venue Confirmed)."
        logoKey="tnppl" logoLabel="TNPPL"
      />
      <Grid12>
        <div className="col-span-7 flex flex-col gap-5">
          <div>
            <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-3">About the league</div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {[
                { Icon: Landmark, t: "Organised by TNPA", s: "Tamil Nadu Pickleball Association — official state governing body." },
                { Icon: ShieldCheck, t: "IPA affiliated", s: "Indian Pickleball Association — national federation." },
                { Icon: Globe2, t: "Global Pickleball Federation", s: "International federation affiliation." },
                { Icon: Trophy, t: "SDAT & SAI backed", s: "Sports Development Authority of Tamil Nadu · Sports Authority of India." },
                { Icon: BadgeCheck, t: "Government recognised", s: "Ministry of Youth Affairs & Sports, Government of India." },
                { Icon: Building2, t: "Confirmed venue", s: "Jawaharlal Nehru Indoor Stadium, Chennai." },
              ].map(({ Icon, t, s }) => (
                <div key={t} className="flex gap-3 border-t thin-rule pt-2.5">
                  <Icon className="h-4 w-4 mt-1 text-[color:var(--slate-tone)] shrink-0" strokeWidth={1.5} />
                  <div>
                    <div className="text-[14px] font-medium text-ink leading-tight">{t}</div>
                    <div className="text-[12px] text-muted-foreground leading-snug mt-0.5">{s}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-[12px] text-muted-foreground italic mt-3">
              Not a startup event. A fully governed, nationally credible league with institutional backing at every level.
            </div>
          </div>

          <div className="border-t thin-rule pt-4">
            <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-3">Season 1 vs Season 2</div>
            <div className="border thin-rule rounded-md overflow-hidden">
              <div className="grid grid-cols-12 text-[10px] uppercase tracking-[0.16em] text-muted-foreground py-2 px-4 border-b thin-rule bg-muted/40">
                <div className="col-span-4">Metric</div>
                <div className="col-span-4">Season 1</div>
                <div className="col-span-4">Season 2</div>
              </div>
              {[
                ["Teams", "16 teams", "12 franchise teams"],
                ["Players", "160 players", "168 players across the state"],
                ["Prize pool", "₹7 Lakhs", "₹30 Lakhs (4× growth)"],
                ["Sponsors", "MGM Healthcare, BoomCars, Indian Bank, TexValley", "Open for Season 2"],
                ["VIP presence", "Sharath Kamal · IAS CEO of SDAT", "—"],
              ].map((row, i) => (
                <div key={row[0]} className={`grid grid-cols-12 py-2 px-4 text-[12px] tabular ${i % 2 ? "bg-muted/20" : ""} border-b thin-rule last:border-b-0`}>
                  <div className="col-span-4 text-muted-foreground uppercase tracking-[0.12em] text-[10px] mt-0.5">{row[0]}</div>
                  <div className="col-span-4 text-ink/80">{row[1]}</div>
                  <div className="col-span-4 text-ink font-medium">{row[2]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-5 border thin-rule rounded-md overflow-hidden flex flex-col">
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            <iframe
              src="https://www.youtube.com/embed/5bgFuGL3zE0?si=W_0TviCiuOJsoyqc"
              title="TNPPL"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="p-6 flex flex-col gap-4 flex-1">
            <div>
              <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">Venue · Confirmed</div>
              <div className="text-[26px] font-medium tracking-tight mt-1 leading-tight">Jawaharlal Nehru<br/>Indoor Stadium, Chennai</div>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t thin-rule pt-4">
              <Stat label="Prize pool" value="₹30L" sub="4× S1" />
              <Stat label="Reach" value="50L+" sub="9-ch · 90 days" />
            </div>
            <div className="border-t thin-rule pt-4 text-[14px] text-ink leading-relaxed">
              Your franchise brand rides every channel of this campaign from <span className="font-medium">Day 1</span>.
            </div>
          </div>
        </div>
      </Grid12>
    </>
  );
}

/* ---------- 05 TNPPL Investment ---------- */

export function S05() {
  return (
    <>
      <SlideHeader tag="05 · TNPPL · Investment & Returns"
        title="What you put in. What you get back."
      />
      <KpiStrip items={[
        { label: "Total entry", value: "₹31L", sub: "₹28L fee + ₹3L auction", strong: true },
        { label: "Per-season recovery", value: "₹7.5–23L", sub: "cash from 4 sources" },
        { label: "Tenure", value: "3 yrs", sub: "S2 · S3 · S4" },
        { label: "Renewal", value: "+20%", sub: "preferential rate" },
      ]}/>
      <Grid12>
        <div className="col-span-7 flex flex-col gap-5 min-h-0">
          <InvestTable
            title="Your investment"
            rows={[
              { k: "Franchise fee", v: "₹28L + GST" },
              { k: "Player auction budget", v: "₹3L (S2 only)" },
              { k: "Tenure", v: "3 years (S2 · S3 · S4)" },
              { k: "Total entry", v: "₹31L", strong: true },
            ]}
          />
          <ReturnsTable
            title="Your returns — per season"
            cols={["Revenue source", "Min", "Max"]}
            rows={[
              { k: "Team sponsorship", a: "₹5L", b: "₹10L" },
              { k: "Central guarantee", a: "₹2L", b: "₹2L" },
              { k: "Prize money", a: "₹50K", b: "₹9L" },
              { k: "Brand & media equivalence", a: "₹15L", b: "₹20L" },
              { k: "Total cash recovery", a: "₹7.5L", b: "₹23L", total: true },
            ]}
          />
        </div>
        <div className="col-span-5 flex flex-col gap-5 min-h-0">
          <HorizonPicker
            label="Cash recovery — pick a season"
            points={[
              { label: "Season 2", value: 9, sub: "Median recovery — first season ramp." },
              { label: "Season 3", value: 14, sub: "Brand compounds; sponsorship deepens." },
              { label: "Season 4", value: 21, sub: "Mature franchise · renewal window opens." },
            ]}
          />
          <TakeawayList
            title="The long-term play"
            items={[
              { Icon: Repeat, t: "3-year tenure.", s: "Your brand compounds across every season." },
              { Icon: TrendingUp, t: "+20% renewal.", s: "First right at a preferential rate." },
              { Icon: Sparkles, t: "Transferable.", s: "A sports asset — not just an event fee." },
            ]}
          />
        </div>
      </Grid12>
    </>
  );
}

/* ---------- 06 CPL Opportunity ---------- */

export function S06() {
  return (
    <>
      <SlideHeader tag="06 · CPL · Opportunity"
        title="Be a founding owner of India's first Celebrity Pickleball League."
        sub="CPL — Season 1 · October 2026."
        logoKey="cpl" logoLabel="CPL"
      />
      <Grid12>
        <div className="col-span-5 flex flex-col gap-4">
          <div className="border thin-rule rounded-md overflow-hidden flex-1 min-h-[280px]">
            <img src={images.cpl} alt="CPL stage" className="w-full h-full object-cover grayscale-[0.4] saturate-50" loading="lazy"/>
          </div>
          <div className="border thin-rule rounded-md p-5 grid grid-cols-3 gap-4">
            <Stat label="Founding slots" value="6" sub="nationwide" />
            <Stat label="Teams" value="6" sub="franchise" />
            <Stat label="Window" value="10–11d" sub="per season" />
          </div>
        </div>

        <div className="col-span-7 flex flex-col gap-4 min-h-0">
          <div className="border thin-rule rounded-md p-5">
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground mb-3">Who's behind CPL</div>
            <div className="grid grid-cols-3 gap-x-5 gap-y-3">
              {[
                { Icon: Star, t: "ATP", s: "All Things Pickleball — India's ecosystem builder." },
                { Icon: Trophy, t: "Format creators", s: "Queen of the Court · Masters · Aces." },
                { Icon: Sparkles, t: "WPPL organisers", s: "India's first Women's Premier Pickleball League." },
                { Icon: Layers, t: "Unified platform", s: "Coaching · events · retail · content." },
                { Icon: ShieldCheck, t: "Quality benchmark", s: "Sets pro standards across India." },
                { Icon: BadgeCheck, t: "End-to-end run", s: "Production · broadcast · ops · content." },
              ].map(({ Icon, t, s }) => (
                <div key={t} className="flex gap-3 border-t thin-rule pt-2.5">
                  <Icon className="h-4 w-4 mt-1 text-[color:var(--slate-tone)] shrink-0" strokeWidth={1.5} />
                  <div>
                    <div className="text-[13px] font-medium text-ink leading-tight">{t}</div>
                    <div className="text-[12px] text-muted-foreground leading-snug mt-0.5">{s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border thin-rule rounded-md p-5">
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground mb-3">Your team</div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-2.5 text-[14px]">
              {[
                ["Your role", "Captain — face, owner, story."],
                ["Your team", "You + 2–3 celebs + 1 pro."],
                ["Pro player", "Provided by ATP."],
                ["Time", "10–11 days / season."],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-3 border-t thin-rule pt-2">
                  <span className="text-muted-foreground w-[90px] shrink-0 text-[12px] uppercase tracking-[0.12em] mt-0.5">{k}</span>
                  <span className="text-ink">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border thin-rule rounded-md p-5">
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground mb-3">Why founding matters</div>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-2.5">
              {[
                { Icon: Users, t: "Sponsors follow stars.", s: "Bigger team = bigger ticket." },
                { Icon: Repeat, t: "10–11 days of content.", s: "Year-round monetisation." },
                { Icon: Star, t: "Founding price ends S1.", s: "S2+ tracks franchise value." },
                { Icon: Sparkles, t: "Only 6 slots.", s: "Scarcity drives appreciation." },
              ].map(({ Icon, t, s }) => (
                <li key={t} className="flex gap-3 border-t thin-rule pt-2.5">
                  <Icon className="h-4 w-4 mt-1 text-[color:var(--slate-tone)] shrink-0" strokeWidth={1.5} />
                  <div className="text-[13px] leading-snug">
                    <span className="text-ink font-medium">{t}</span>{" "}
                    <span className="text-muted-foreground">{s}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Grid12>
    </>
  );
}

/* ---------- 07 CPL Investment ---------- */

export function S07() {
  return (
    <>
      <SlideHeader tag="07 · CPL · Investment & Returns"
        title="₹30L. One payment. This founding price never exists again."
        sub="Founding franchise fee — Season 1 only. Six slots nationwide."
      />
      <KpiStrip items={[
        { label: "Founding fee", value: "₹30L", sub: "one-time · S1 only", strong: true },
        { label: "Year-1 cash recovery", value: "₹15–30L", sub: "across 4 sources" },
        { label: "Slots", value: "6", sub: "nationwide" },
        { label: "Appreciation", value: "2–3×", sub: "by Season 3" },
      ]}/>
      <Grid12>
        <div className="col-span-7 flex flex-col gap-4 min-h-0">
          <InvestTable
            title="Your investment"
            rows={[
              { k: "Founding franchise fee", v: "₹30 Lakhs", strong: true },
              { k: "What it covers", v: "Branding · identity · ops · broadcast", muted: true },
              { k: "Price lock", v: "Never available after Season 1", muted: true },
            ]}
          />
          <ReturnsTable
            title="Your returns"
            cols={["Revenue source", "Min", "Max"]}
            rows={[
              { k: "General team sponsorship", a: "₹15L", b: "₹30L" },
              { k: "Personal brand & media value", a: "₹10L", b: "₹25L" },
              { k: "Franchise appreciation", a: "2× by S3", b: "3× by S3" },
              { k: "Content monetisation", a: "Reels · YouTube · brand collabs — ongoing", b: "", note: true },
              { k: "Total cash recovery — Year 1", a: "₹15L", b: "₹30L", total: true },
            ]}
          />
        </div>
        <div className="col-span-5 flex flex-col gap-4 min-h-0">
          <HorizonPicker
            label="Cumulative cash trajectory"
            points={[
              { label: "Year 1", value: 22, sub: "Sponsorship + brand pickup." },
              { label: "Year 2", value: 38, sub: "Compounding — content engine matures." },
              { label: "Year 3", value: 65, sub: "Franchise appreciation realised." },
            ]}
          />
          <TakeawayList
            title="Why the founding round matters"
            items={[
              { Icon: Sparkles, t: "Six slots.", s: "Once gone, the founding price is gone." },
              { Icon: TrendingUp, t: "Benchmarks.", s: "MLP $200K → $13M in 4 yrs (65×). CCL ₹50 Cr/season after 14." },
              { Icon: Star, t: "Ground floor.", s: "S2+ pricing tracks franchise value, not founding." },
            ]}
          />
        </div>
      </Grid12>
    </>
  );
}

/* ---------- 08 CPPL Opportunity (Donut allocation) ---------- */

export function S08() {
  const cities = [
    { name: "Chennai", v: 80 },
    { name: "Hyderabad", v: 75 },
    { name: "Bangalore", v: 78 },
    { name: "Mumbai", v: 82 },
  ];
  const includes = [
    { Icon: Users, t: "8–10 corporate franchise teams", s: "Companies buy in; players are their employees. Each team commits a multi-year captaincy and brand presence." },
    { Icon: Briefcase, t: "Full sponsorship stack", s: "Title · Associates · F&B · Activations · Venue branding — every inventory slot monetised across the season." },
    { Icon: ShieldCheck, t: "Professionally managed ops", s: "Production, refereeing, scheduling, broadcast — handled end-to-end by the central league office." },
    { Icon: Handshake, t: "Premium corporate networking", s: "League weekends double as relationship infrastructure — CXOs, founders and HR heads in one room." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <SlideHeader tag="08 · CPPL · Opportunity"
        title="Own India's first Corporate Pickleball League IP."
        sub="Corporate Premier Pickleball League (CPPL) — 4 cities · annual · recurring."
        logoKey="cppl" logoLabel="CPPL"
      />

      <Grid12>
        <div className="col-span-6 flex flex-col gap-4 min-h-0">
          <div className="border thin-rule rounded-md overflow-hidden flex-1 min-h-[300px]">
            <img src={images.cppl} alt="CPPL corporate league" className="w-full h-full object-cover grayscale-[0.3] saturate-50" loading="lazy"/>
          </div>
          <div className="border thin-rule rounded-md p-5">
            <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-3">Per-city revenue · Year 1</div>
            <div className="grid grid-cols-4 gap-3">
              {cities.map((c) => (
                <div key={c.name} className="border thin-rule rounded p-3">
                  <div className="text-[12px] text-muted-foreground">{c.name}</div>
                  <div className="text-[24px] tabular font-medium tracking-tight mt-0.5">₹{c.v}L</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-6 flex flex-col gap-3 min-h-0">
          <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">What each city includes</div>
          {includes.map(({ Icon, t, s }, i) => {
            const isOpen = open === i;
            return (
              <button
                key={t}
                onClick={() => setOpen(isOpen ? null : i)}
                className={`text-left border thin-rule rounded-md p-4 transition-colors ${isOpen ? "bg-muted/40" : "hover:bg-muted/20"}`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-[color:var(--slate-tone)] shrink-0" strokeWidth={1.5} />
                  <div className="flex-1 text-[17px] font-medium text-ink leading-tight">{t}</div>
                  <span className={`text-[18px] text-muted-foreground transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
                </div>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 mt-3 border-t thin-rule text-[14px] text-muted-foreground leading-relaxed">{s}</div>
                </motion.div>
              </button>
            );
          })}
        </div>
      </Grid12>
    </>
  );
}

/* ---------- 09 CPPL ROI ---------- */

export function S09() {
  return (
    <>
      <SlideHeader tag="09 · CPPL · Investment & Returns"
        title="₹38.5L in. ₹70–80L out. Per city. Every year."
      />
      <KpiStrip items={[
        { label: "Investment / city", value: "₹8–12L", sub: "founder contribution" },
        { label: "Revenue / city", value: "₹70–80L", sub: "teams + sponsorship" },
        { label: "Net / city", value: "₹31.5–41.5L", sub: "after ₹38.5L opex" },
        { label: "ROI", value: "80–108%", sub: "annual · per city", strong: true },
      ]}/>
      <Grid12>
        <div className="col-span-7 flex flex-col gap-4 min-h-0">
          <ReturnsTable
            title="Per city — investment vs return"
            cols={["Line", "Min", "Max"]}
            rows={[
              { k: "Investment", a: "₹8L", b: "₹12L" },
              { k: "Revenue", a: "₹70L", b: "₹80L" },
              { k: "Expenses", a: "(₹38.5L)", b: "(₹38.5L)" },
              { k: "Net profit", a: "₹31.5L", b: "₹41.5L", total: true },
              { k: "ROI", a: "80%", b: "108%", total: true },
            ]}
          />
          <ReturnsTable
            title="Scale it up"
            cols={["Line", "1 city", "4 cities"]}
            rows={[
              { k: "Revenue", a: "₹70–80L", b: "₹2.8–3.2 Cr" },
              { k: "Expenses", a: "(₹38.5L)", b: "(₹1.54 Cr)" },
              { k: "Net profit", a: "₹31.5–41.5L", b: "₹1.26–1.66 Cr", total: true },
              { k: "ROI", a: "80–108%", b: "80–108%", total: true },
            ]}
          />
        </div>
        <div className="col-span-5 flex flex-col gap-4 min-h-0">
          <HorizonPicker
            label="Net profit — pick scale"
            points={[
              { label: "1 city", value: 36, sub: "₹31.5–41.5L net · upfront team fees cover opex." },
              { label: "4 cities (Y1)", value: 146, sub: "Chennai · Hyderabad · Bangalore · Mumbai." },
              { label: "6 cities (Y2)", value: 220, sub: "Add 2 cities — same playbook, bigger numbers." },
            ]}
            format={(v) => `₹${(v/100).toFixed(2)} Cr`}
          />
          <TakeawayList
            title="The model scales simply"
            items={[
              { Icon: Repeat, t: "Upfront fees cover opex.", s: "Team franchise fees collected before season starts." },
              { Icon: Briefcase, t: "Year 1 — 4 cities.", s: "Same structure · same sponsorship playbook." },
              { Icon: TrendingUp, t: "Year 2 — add 2 more.", s: "No re-architecture. Just bigger numbers." },
            ]}
          />
        </div>
      </Grid12>
    </>
  );
}

/* ---------- 10 Intercollege Pickleball Tournament — Opportunity ---------- */

function ExpandList({ items }: { items: { Icon: typeof Sparkles; t: string; s: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="flex flex-col gap-3">
      {items.map(({ Icon, t, s }, i) => {
        const isOpen = open === i;
        return (
          <button
            key={t}
            onClick={() => setOpen(isOpen ? null : i)}
            className={`text-left border thin-rule rounded-md p-4 transition-colors ${isOpen ? "bg-muted/40" : "hover:bg-muted/20"}`}
          >
            <div className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-[color:var(--slate-tone)] shrink-0" strokeWidth={1.5} />
              <div className="flex-1 text-[16px] font-medium text-ink leading-tight">{t}</div>
              <span className={`text-[18px] text-muted-foreground transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
            </div>
            <motion.div
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-3 mt-3 border-t thin-rule text-[14px] text-muted-foreground leading-relaxed">{s}</div>
            </motion.div>
          </button>
        );
      })}
    </div>
  );
}

export function S10() {
  return (
    <>
      <SlideHeader tag="10 · Opportunity 04 · Intercollege Pickleball Tournament"
        title="Build the Grassroots. Own the Next Generation."
        sub="Intercollege Pickleball Tournament — Chennai & Bangalore · in partnership with TNPA."
        logoKey="school" logoLabel="Intercollege Tournament"
      />
      <Grid12>
        <div className="col-span-5 flex flex-col gap-4 min-h-0">
          <div className="border thin-rule rounded-md overflow-hidden flex-1 min-h-[260px] bg-muted flex items-center justify-center">
            <img src={images.school} alt="Intercollege pickleball tournament" className="w-full h-full object-cover grayscale-[0.3] saturate-50" loading="lazy"/>
          </div>
          <div className="border thin-rule rounded-md p-5 grid grid-cols-3 gap-4">
            <Stat label="Cities" value="2" sub="Chennai · BLR" />
            <Stat label="Courts" value="4" sub="per venue" />
            <Stat label="Days" value="2" sub="weekend event" />
          </div>
          <TakeawayList
            title="Why colleges say yes"
            items={[
              { Icon: Heart, t: "Zero cost to participate.", s: "No entry fee. No financial burden on the institution." },
              { Icon: Landmark, t: "Goes on the sports record.", s: "Official tournament under TNPA — counts on college sports résumés." },
              { Icon: Trophy, t: "Medals & trophies.", s: "Recognition for winners, exposure to a fast-growing pro sport." },
            ]}
          />
        </div>

        <div className="col-span-7 flex flex-col gap-4 min-h-0">
          <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">What it is</div>
          <div className="border thin-rule rounded-md p-5 text-[15px] text-ink leading-relaxed">
            A 2-day structured pickleball tournament for colleges across Chennai and Bangalore. Each college sends a team of 4 players. No entry fee. All revenue comes from sponsorship and CSR funds.
          </div>
          <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">How it works · click to expand</div>
          <ExpandList items={[
            { Icon: GraduationCap, t: "College tie-ups", s: "Partner with top colleges across Chennai and Bangalore. Invite each to send a 4-player team. Zero financial burden on institutions — participation is fully sponsored." },
            { Icon: Trophy, t: "Tournament format", s: "4 courts · 2-day event · structured league format with finals on Day 2. Run with TNPA-certified officials and a clean broadcast-ready production." },
            { Icon: Award, t: "Prizes — no cash", s: "Medals, trophies and recognition only. Keeps the event brand-safe, institution-friendly, and clean for CSR & education sponsors." },
            { Icon: Handshake, t: "Official partnership — TNPA", s: "Tamil Nadu Pickleball Association co-hosts the tournament — lending institutional credibility, officials and an established college network from day one." },
          ]}/>
        </div>
      </Grid12>
    </>
  );
}

/* ---------- 11 Intercollege Pickleball Tournament — Investment & Returns ---------- */

export function S11() {
  return (
    <>
      <SlideHeader tag="11 · Opportunity 04 · Investment Detail"
        title="Minimum Investment. Maximum Reach."
        sub="₹11L in. ₹20L sponsorship out. Per city · 2-day event."
      />
      <KpiStrip items={[
        { label: "Total investment", value: "₹11L", sub: "all-in event cost" },
        { label: "Sponsorship revenue", value: "₹20L", sub: "title + category + CSR" },
        { label: "Net profit / city", value: "₹9L", sub: "per 2-day event" },
        { label: "ROI", value: "~82%", sub: "single edition", strong: true },
      ]}/>
      <Grid12>
        <div className="col-span-7 grid grid-cols-2 gap-4 min-h-0">
          <ReturnsTable
            title="Investment breakdown · per city"
            cols={["Expense", "Amount", ""]}
            rows={[
              { k: "Venue & court setup", a: "₹1.5L", b: "" },
              { k: "Marketing", a: "₹2.5L", b: "" },
              { k: "Setup & production", a: "₹2L", b: "" },
              { k: "Trophies & medals", a: "₹1L", b: "" },
              { k: "Staff & volunteers", a: "₹1L", b: "" },
              { k: "Equipment & balls", a: "₹1L", b: "" },
              { k: "Photography & content", a: "₹1L", b: "" },
              { k: "Contingency", a: "₹1L", b: "" },
              { k: "Total investment", a: "₹11L", b: "", total: true },
            ]}
          />
          <ReturnsTable
            title="Revenue & returns"
            cols={["Line", "Amount", ""]}
            rows={[
              { k: "Sponsorship revenue", a: "₹20L", b: "" },
              { k: "CSR funds", a: "Supplementary", b: "" },
              { k: "Total revenue", a: "₹20L", b: "", total: true },
              { k: "Total expenses", a: "₹11L", b: "" },
              { k: "Net profit", a: "₹9L", b: "", total: true },
              { k: "ROI", a: "~82%", b: "", total: true },
            ]}
          />
        </div>
        <div className="col-span-5 flex flex-col gap-4 min-h-0">
          <HorizonPicker
            label="Net profit — pick scale"
            points={[
              { label: "Chennai only", value: 9, sub: "Single 2-day event · ₹11L outlay." },
              { label: "Chennai + BLR", value: 18, sub: "Both cities · same playbook." },
              { label: "Y2 · 4 cities", value: 36, sub: "Add Hyderabad + Mumbai once template is proven." },
            ]}
          />
          <TakeawayList
            title="The strategic return"
            items={[
              { Icon: GraduationCap, t: "Pipeline ownership.", s: "Every student athlete = future CPPL player & S For Sport advocate." },
              { Icon: Heart, t: "CSR-friendly.", s: "Unlocks sponsors who won't touch pro sports." },
              { Icon: Handshake, t: "TNPA-backed.", s: "Credibility, officials & college network from day one." },
            ]}
          />
        </div>
      </Grid12>
    </>
  );
}

/* ---------- 12 Paddle City Open Opportunity (city map) ---------- */

const cityNodes = [
  { name: "Chennai", x: 0.78, y: 0.72, events: 2 },
  { name: "Bangalore", x: 0.62, y: 0.78, events: 2 },
  { name: "Hyderabad", x: 0.58, y: 0.55, events: 2 },
  { name: "Mumbai", x: 0.32, y: 0.5, events: 2 },
];

export function S12() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <>
      <SlideHeader tag="12 · Opportunity 05 · Paddle City Open"
        title="Take Paddle to the People."
        sub="A weekend recreational paddle tournament circuit — 4 cities · 8 events per year."
        logoKey="paddle" logoLabel="Paddle City Open"
      />
      <Grid12>
        <div className="col-span-7 flex flex-col gap-4 min-h-0">
          <div className="border thin-rule rounded-md p-5">
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground mb-2">What it is</div>
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              A weekend recreational pickleball tournament open to all skill levels — beginner, intermediate, and pro-am. Doubles format. Played with a paddle. Anyone can register and play. Think amateur open golf day — but for pickleball. Social, competitive, and accessible.
            </p>
          </div>
          <div className="border thin-rule rounded-md p-5 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">The 4-city circuit</div>
              <div className="text-[12px] text-muted-foreground tabular">{active !== null ? cityNodes[active].name : "8 events · 4 cities · Sat–Sun"}</div>
            </div>
            <div className="relative h-[230px] bg-[color:var(--paper)] border thin-rule rounded overflow-hidden">
              <img src={images.paddle} alt="Paddle City Open weekend tournament" className="w-full h-full object-cover grayscale-[0.3] saturate-50" loading="lazy"/>
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div className="absolute inset-0 p-3 flex flex-wrap content-end gap-2">
                {cityNodes.map((c, i) => (
                  <button key={c.name}
                    onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
                    className={`text-[12px] tabular px-2 py-1 rounded border thin-rule bg-background/80 backdrop-blur ${active === i ? "text-ink border-foreground/40" : "text-muted-foreground"}`}>
                    {c.name} · {c.events} events
                  </button>
                ))}
              </div>
            </div>
            <div className="text-[12px] text-muted-foreground mt-3">
              2 events per city · 8 events annually · Sat–Sun · existing courts — no infrastructure ownership.
            </div>
          </div>
        </div>
        <div className="col-span-5 flex flex-col gap-4 min-h-0">
          <TakeawayList
            title="What participants get"
            items={[
              { Icon: Trophy, t: "Competitive play.", s: "All skill categories — beginner to pro-am." },
              { Icon: Sparkles, t: "Prize money.", s: "Worth competing for." },
              { Icon: CalendarDays, t: "Annual calendar.", s: "Recurring circuit to plan around." },
            ]}
          />
          <TakeawayList
            title="What sponsors get"
            items={[
              { Icon: Users, t: "Premium audience.", s: "Active · urban · health-conscious adults." },
              { Icon: Repeat, t: "8 touchpoints / yr.", s: "Across 4 cities — full national footprint." },
              { Icon: Briefcase, t: "Affordable inventory.", s: "High visibility · low CPM." },
            ]}
          />
          <TakeawayList
            title="Why the model is clean"
            items={[
              { Icon: Building2, t: "No owned courts.", s: "Venue is a rental line item." },
              { Icon: TrendingUp, t: "Fees ≈ opex.", s: "Sponsorship is pure upside. 150 pairs is the floor — BLR & MUM hit 200–250+." },
            ]}
          />
        </div>
      </Grid12>
    </>
  );
}

/* ---------- 13 Paddle City Open ROI ---------- */

export function S13() {
  return (
    <>
      <SlideHeader tag="13 · Opportunity 05 · Investment Detail"
        title="Low Risk. Real Returns."
        sub="Per event · ₹9L in · ₹14L out · 8 events a year."
      />
      <KpiStrip items={[
        { label: "Investment / event", value: "₹9L", sub: "all-in cost" },
        { label: "Revenue / event", value: "₹14L", sub: "fees + sponsors" },
        { label: "Year 1 net", value: "~₹40L", sub: "after 8 events" },
        { label: "ROI", value: "~55%", sub: "break-even Event 5–6", strong: true },
      ]}/>
      <Grid12>
        <div className="col-span-7 grid grid-cols-2 gap-4 min-h-0 content-start">
          <InvestTable
            title="Per event — costs"
            rows={[
              { k: "Venue / court hire", v: "₹2–2.5L" },
              { k: "Branding & production", v: "₹1.5L" },
              { k: "Staff & logistics", v: "₹1.5L" },
              { k: "Prize money", v: "₹3L" },
              { k: "Digital & social", v: "₹0.5L" },
              { k: "Total cost", v: "₹9L", strong: true },
            ]}
          />
          <InvestTable
            title="Per event — revenue"
            rows={[
              { k: "Entry fees (150 × ₹3,000)", v: "₹4.5L" },
              { k: "Title sponsor", v: "₹5L" },
              { k: "Category sponsors (×3)", v: "₹3L" },
              { k: "Paddle brand stall", v: "₹1.5L" },
              { k: "Total revenue", v: "₹14L", strong: true },
            ]}
          />
          <div className="col-span-2">
            <ReturnsTable
              title="Scale it up"
              cols={["Line", "Per event", "8 events (Y1)"]}
              rows={[
                { k: "Investment", a: "₹9L", b: "₹72L" },
                { k: "Revenue", a: "₹14L", b: "₹1.12 Cr" },
                { k: "Net profit", a: "₹5L", b: "~₹40L", total: true },
                { k: "ROI", a: "~55%", b: "~55%", total: true },
              ]}
            />
          </div>
        </div>
        <div className="col-span-5 flex flex-col gap-4 min-h-0">
          <HorizonPicker
            label="Cumulative net — pick an event"
            points={[
              { label: "Event 1", value: 5, sub: "₹5L per event from event one." },
              { label: "Event 5–6", value: 27, sub: "Break-even on full ₹72L outlay." },
              { label: "Event 8 (Y1)", value: 40, sub: "Year closes at ~₹40L net · ~55% ROI." },
            ]}
          />
          <TakeawayList
            title="Year 2 upside"
            items={[
              { Icon: TrendingUp, t: "Title sponsorship grows.", s: "₹8–10L per event once brand recognition builds." },
              { Icon: Sparkles, t: "Annual net jumps.", s: "Year 2 net climbs to ₹70–80L on the same 8-event base." },
              { Icon: MapPin, t: "Pair-count upside.", s: "Bangalore & Mumbai can hit 200–250+ pairs per event." },
            ]}
          />
        </div>
      </Grid12>
    </>
  );
}

/* ---------- 14 Arena Opportunity (waterfall) ---------- */


export function S14() {
  const inside = [
    { i: "🏓", k: "3 Pickleball Courts" },
    { i: "🎾", k: "1 Paddle Court" },
    { i: "🏸", k: "3 Badminton Courts" },
    { i: "☕", k: "Traditional Café" },
    { i: "🎓", k: "Pro Coaching — all 3 sports" },
    { i: "📅", k: "Memberships + Hourly" },
  ];
  const courts = [
    { sport: "🏓 Pickleball", n: "3 Courts", rate: "₹1,200 – ₹1,500 / hr" },
    { sport: "🎾 Paddle", n: "1 Court", rate: "₹2,500 – ₹3,000 / hr" },
    { sport: "🏸 Badminton", n: "3 Courts", rate: "₹800 – ₹1,000 / hr" },
  ];
  return (
    <>
      <SlideHeader tag="14 · A for Arena · Opportunity"
        title="Build the Home of S For Sport."
        sub="A For Arena · Pickleball | Paddle | Badminton | Café · Chennai City Centre · Open 6AM–12AM, 365 days."
        logoKey="arena" logoLabel="A for Arena"
      />
      <Grid12>
        <div className="col-span-7 flex flex-col gap-4 min-h-0">
          <div className="border thin-rule rounded-md p-5">
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground mb-2">What it is</div>
            <p className="text-[14px] text-muted-foreground leading-relaxed">
              A premium multi-sport court facility in the heart of Chennai. Three sports under one roof — pickleball, paddle, and badminton — with a café and professional coaching. Open 6AM to 12AM, 365 days a year.
            </p>
          </div>
          <div className="border thin-rule rounded-md p-5">
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground mb-3">The courts</div>
            <div className="grid grid-cols-[1.2fr_0.8fr_1.2fr] gap-x-4 gap-y-2 text-[13px]">
              <div className="text-muted-foreground text-[11px] uppercase tracking-wider">Sport</div>
              <div className="text-muted-foreground text-[11px] uppercase tracking-wider">Courts</div>
              <div className="text-muted-foreground text-[11px] uppercase tracking-wider">Rental</div>
              {courts.map((c) => (
                <Fragment key={c.sport}>
                  <div className="text-ink font-medium border-t thin-rule pt-2">{c.sport}</div>
                  <div className="text-muted-foreground border-t thin-rule pt-2 tabular">{c.n}</div>
                  <div className="text-muted-foreground border-t thin-rule pt-2 tabular">{c.rate}</div>
                </Fragment>
              ))}
            </div>
          </div>
          <TakeawayList
            title="Why Chennai City Centre"
            items={[
              { Icon: MapPin, t: "High footfall.", s: "Office-goers, residents, students all within reach." },
              { Icon: TrendingUp, t: "18 operating hours.", s: "Morning + evening peak demand maximises yield." },
              { Icon: Award, t: "No direct competition.", s: "All three paddle sports under one roof — flagship S For Sport venue." },
            ]}
          />
        </div>
        <div className="col-span-5 flex flex-col gap-4 min-h-0">
          <div className="border thin-rule rounded-md p-5">
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground mb-3">What's inside</div>
            <div className="grid grid-cols-1 gap-y-2 text-[13px]">
              {inside.map((it) => (
                <div key={it.k} className="flex items-center gap-2">
                  <span className="text-[16px]">{it.i}</span>
                  <span className="text-muted-foreground">{it.k}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border thin-rule rounded-md p-5 flex-1">
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground mb-2">Flagship venue</div>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              S For Sport's home base — a premium multi-sport club at the centre of Chennai. The anchor that turns the brand from a portfolio of plays into a permanent destination.
            </p>
          </div>
        </div>
      </Grid12>
    </>
  );
}


export function S15() {
  return (
    <>
      <SlideHeader tag="15 · A for Arena · Investment & Returns"
        title="What You Build. What You Earn."
        sub="₹2.5 Cr all-in · 10-year lease, zero monthly rent · ₹2.40 Cr EBITDA by Year 3."
      />
      <KpiStrip items={[
        { label: "Total investment", value: "₹2.50 Cr", sub: "lease + setup", strong: true },
        { label: "Yr 1 revenue", value: "₹2.92 Cr", sub: "59% margin" },
        { label: "Yr 3 EBITDA", value: "₹2.40 Cr", sub: "62% margin" },
        { label: "Lease term", value: "10 years", sub: "no monthly rent" },
      ]}/>
      <Grid12>
        <div className="col-span-7 grid grid-cols-2 gap-4 min-h-0">
          <InvestTable
            title="Investment"
            rows={[
              { k: "10-Year Lease", v: "₹1.50 Cr" },
              { k: "Setup Cost", v: "₹1.00 Cr" },
              { k: "Total Investment", v: "₹2.50 Cr" },
            ]}
          />
          <InvestTable
            title="Setup cost breakdown"
            rows={[
              { k: "Courts — PB(3), Paddle(1), Bad(3)", v: "₹60L" },
              { k: "Civil, HVAC & Electrical", v: "₹26L" },
              { k: "Café, Branding & Tech", v: "₹10L" },
              { k: "Licences & Working Capital", v: "₹4L" },
              { k: "Total", v: "₹1.00 Cr" },
            ]}
          />
          <div className="col-span-2">
            <ReturnsTable
              title="Revenue & profit (₹ Cr)"
              cols={["Line", "Year 1", "Year 3"]}
              rows={[
                { k: "Total Revenue", a: "₹2.92", b: "₹3.85" },
                { k: "Operating Expenses", a: "(₹1.20)", b: "(₹1.45)" },
                { k: "EBITDA", a: "₹1.72", b: "₹2.40", total: true },
                { k: "Margin", a: "59%", b: "62%" },
              ]}
            />
          </div>
        </div>
        <div className="col-span-5 flex flex-col gap-4 min-h-0">
          <HorizonPicker
            label="EBITDA — pick a year"
            points={[
              { label: "Year 1", value: 172, sub: "59% margin · ramp." },
              { label: "Year 3", value: 240, sub: "62% margin · steady-state." },
            ]}
            format={(v) => `₹${(v/100).toFixed(2)} Cr`}
          />
          <TakeawayList
            title="Why this is the anchor asset"
            items={[
              { Icon: Layers, t: "10-year lease.", s: "Zero monthly rent — lease prepaid up front." },
              { Icon: TrendingUp, t: "Revenue compounds.", s: "Margin expands from 59% to 62% as memberships mature." },
              { Icon: Award, t: "Flagship venue.", s: "S For Sport's permanent home — brand + cash flow asset." },
            ]}
          />
        </div>
      </Grid12>
    </>
  );
}

/* ---------- 16 Next Steps ---------- */

const next = [
  ["TNPPL Franchise", "Now", "₹31L", "Franchise slot confirmation"],
  ["CPL Founding Slot", "Now — 6 slots only", "₹30L", "Reserve before it closes"],
  ["Paddle City Open", "Q3 2026", "₹72L", "City calendar + court partner"],
  ["Inter-School League", "Q3 2026", "₹16L", "Institution outreach begins"],
  ["CPPL", "Q4 2026", "₹1.54 Cr", "City rollout plan"],
  ["A for Arena", "12–18 months", "₹14–16 Cr (₹3.5–4.5 Cr equity)", "Site selection + Da One sign-off"],
];

export function S16() {
  return useMemo(() => (
    <>
      <SlideHeader tag="16 · Next Steps" title="Pick the plays that diversify S For Sport first." />
      <div className="border-t thin-rule">
        <div className="grid grid-cols-12 text-[12px] uppercase tracking-[0.16em] text-muted-foreground py-4 border-b thin-rule">
          <div className="col-span-4">Opportunity</div>
          <div className="col-span-2">Ready</div>
          <div className="col-span-3">Investment</div>
          <div className="col-span-3">First move</div>
        </div>
        {next.map((row) => (
          <div key={row[0]} className="grid grid-cols-12 py-5 border-b thin-rule items-baseline">
            <div className="col-span-4 text-[22px] font-medium tracking-tight">{row[0]}</div>
            <div className="col-span-2 text-[16px] tabular text-muted-foreground">{row[1]}</div>
            <div className="col-span-3 text-[18px] tabular">{row[2]}</div>
            <div className="col-span-3 text-[16px] text-muted-foreground">{row[3]}</div>
          </div>
        ))}
      </div>
      <div className="mt-10 grid grid-cols-3 gap-6">
        {[
          ["01", "Reserve the TNPPL franchise slot", "Season 2 is open now."],
          ["02", "Lock the CPL founding owner position", "Before all six are taken."],
          ["03", "Begin ECR site shortlisting for A for Arena", "Site, lease, Da One sign-off."],
        ].map(([n, t, s]) => (
          <div key={n} className="border thin-rule rounded-md p-6">
            <div className="text-[12px] tabular text-muted-foreground">This week · {n}</div>
            <div className="text-[24px] font-medium tracking-tight mt-2">{t}</div>
            <div className="text-[14px] text-muted-foreground mt-2">{s}</div>
          </div>
        ))}
      </div>
    </>
  ), []);
}

export const slides = [S01, S02, S03, S04, S05, S06, S07, S08, S09, S10, S11, S12, S13, S14, S15, S16];
