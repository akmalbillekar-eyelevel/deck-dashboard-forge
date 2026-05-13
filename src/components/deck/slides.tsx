import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart, Line, ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell,
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
        <SectorTag>S4 Sports — Investor Memorandum</SectorTag>
        <span className="text-[13px] tracking-[0.18em] uppercase text-muted-foreground tabular">2026</span>
      </div>
      <div>
        <div className="text-[18px] tracking-[0.2em] uppercase text-muted-foreground mb-8">The Playbook</div>
        <h1 className="text-[160px] leading-[0.95] font-medium tracking-[-0.035em] text-ink max-w-[1600px]">
          The S4 Sports<br/>Playbook.
        </h1>
        <p className="mt-10 text-[32px] text-muted-foreground font-light max-w-[1100px]">
          Every League. Every Arena. Every City.
        </p>
      </div>
      <div className="flex items-end justify-between text-[14px] tabular">
        <div className="grid grid-cols-3 gap-12">
          <div><div className="text-muted-foreground uppercase tracking-[0.16em] text-[11px]">Investments</div><div className="mt-1 text-[28px] font-medium">06</div></div>
          <div><div className="text-muted-foreground uppercase tracking-[0.16em] text-[11px]">Capital range</div><div className="mt-1 text-[28px] font-medium">₹16L – ₹16Cr</div></div>
          <div><div className="text-muted-foreground uppercase tracking-[0.16em] text-[11px]">Horizon</div><div className="mt-1 text-[28px] font-medium">3–5 years</div></div>
        </div>
        <div className="text-muted-foreground">Confidential — do not distribute</div>
      </div>
    </div>
  );
}

/* ---------- 02 Big Picture ---------- */

const growthData = [
  { year: 2020, mlp: 0.2, ccl: 12 },
  { year: 2021, mlp: 1.1, ccl: 18 },
  { year: 2022, mlp: 4.5, ccl: 28 },
  { year: 2023, mlp: 9, ccl: 38 },
  { year: 2024, mlp: 13, ccl: 50 },
];

export function S02() {
  return (
    <>
      <SlideHeader
        tag="The Thesis"
        title="The opportunity isn't one league. It's the entire ecosystem."
        sub="Leagues. Venues. Grassroots. Events. Each one compounds the other."
      />
      <Grid12>
        <div className="col-span-7 flex flex-col gap-5">
          <p className="text-[17px] leading-[1.55] text-muted-foreground max-w-[760px] border-t thin-rule pt-5">
            Bengaluru Jawans winning <span className="text-ink">World Pickleball League Season 1</span> was proof of concept. This portfolio is the expansion — not deeper into one sport, but wider across the sports and entertainment landscape being built in India right now.
          </p>
          <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mt-1">Why the moment is now</div>
          {[
            ["India's sports economy is at an inflection point.", "Every sport that built franchise value here — cricket, kabaddi, football — was dismissed early. The investors who moved first are now holding assets worth 10–50×. That window is open again."],
            ["Entertainment and sport are converging.", "Shah Rukh Khan didn't just own KKR — he built a brand that amplified everything else. The same model applies here, and no one is better positioned to run it."],
            ["The network is the real asset.", "Infrastructure can be built. Capital can be raised. The ability to bring Shah Rukh Khan, Allu Arjun, Vijay, and Deepika to the table cannot be bought."],
          ].map(([h, b], i) => (
            <div key={h as string} className="flex gap-5 border-t thin-rule pt-4">
              <div className="text-[12px] tabular text-muted-foreground w-8 mt-[2px]">0{i + 1}</div>
              <div>
                <div className="text-[18px] font-medium tracking-tight leading-tight">{h}</div>
                <div className="text-[14px] text-muted-foreground mt-1.5 max-w-[640px] leading-relaxed">{b}</div>
              </div>
            </div>
          ))}
          <div className="border-t thin-rule pt-4 mt-1">
            <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-2">The Logic</div>
            <p className="text-[15px] text-muted-foreground leading-relaxed max-w-[720px]">
              Each opportunity in this deck works independently. Together they connect — grassroots feeds corporate feeds professional feeds a venue that hosts all of them. One ecosystem. One owner at the centre. <span className="text-ink">That is S4 Sports.</span>
            </p>
          </div>
        </div>
        <div className="col-span-5 border thin-rule rounded-md p-7 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="text-[12px] tracking-[0.16em] uppercase text-muted-foreground">Benchmarks — Why this trajectory is real</div>
          </div>
          <div className="mt-5 border-t thin-rule">
            {[
              { code: "MLP", name: "Major League Pickleball", what: "Premier professional pickleball league in the USA", value: "65×", detail: "Franchise value $200K → $13M in 4 years" },
              { code: "CCL", name: "Celebrity Cricket League", what: "India — Bollywood, Tamil & Telugu film stars", value: "₹50 Cr", detail: "Annual ad revenue after 14 seasons" },
              { code: "ISL", name: "Indian Super League", what: "India's pro football league · launched 2014, 8 teams", value: "3×", detail: "Title sponsorship ₹51 Cr → ₹160 Cr in 6 years; revenue 2× in 5" },
              { code: "UTT", name: "Ultimate Table Tennis", what: "India's pro table tennis league · launched 2017", value: "1.3×", detail: "JioStar 3-yr broadcast (2025); WTT investing $3–5M anchored on UTT" },
            ].map((r) => (
              <div key={r.code} className="grid grid-cols-12 items-baseline py-3.5 border-b thin-rule gap-3">
                <div className="col-span-8">
                  <div className="flex items-baseline gap-2">
                    <div className="text-[11px] tabular tracking-[0.16em] uppercase text-muted-foreground">{r.code}</div>
                    <div className="text-[14px] font-medium tracking-tight text-ink">{r.name}</div>
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1 leading-snug">{r.what}</div>
                  <div className="text-[11px] text-ink/80 mt-1 leading-snug">{r.detail}</div>
                </div>
                <div className="col-span-4 text-right text-[26px] font-medium tabular tracking-tight leading-none">{r.value}</div>
              </div>
            ))}
          </div>
          <div className="flex-1 min-h-0 mt-4">
            <ResponsiveContainer>
              <AreaChart data={growthData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--slate-tone)" stopOpacity={0.35}/>
                    <stop offset="100%" stopColor="var(--slate-tone)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: "currentColor", opacity: 0.5 }} axisLine={false} tickLine={false}/>
                <YAxis hide />
                <Area type="monotone" dataKey="mlp" stroke="var(--slate-tone)" strokeWidth={1.5} fill="url(#g1)" />
                <Line type="monotone" dataKey="ccl" stroke="var(--ink)" strokeWidth={1.25} dot={false}/>
              </AreaChart>
            </ResponsiveContainer>
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

const connections = [
  ["Grassroots", "Inter-School League builds the player base and the next generation."],
  ["Events", "Paddle City Open brings the community together across cities."],
  ["Leagues", "TNPPL, CPL, CPPL monetise the audience at every level."],
  ["Infrastructure", "A for Arena anchors and hosts everything under one roof."],
];

export function S03() {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <>
      <SlideHeader
        tag="Portfolio Overview"
        title="One ecosystem. Every angle covered."
        sub="Each opportunity stands alone. Together, they build something no single investor has built in Indian sports."
      />
      <div className="border-t thin-rule">
        <div className="grid grid-cols-12 text-[11px] uppercase tracking-[0.16em] text-muted-foreground py-3 border-b thin-rule">
          <div className="col-span-1">#</div>
          <div className="col-span-4">Opportunity</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2">Investment</div>
          <div className="col-span-2">Net return</div>
          <div className="col-span-1 text-right">ROI</div>
        </div>
        {portfolio.map((p) => (
          <div
            key={p.n}
            onMouseEnter={() => setHover(p.n)}
            onMouseLeave={() => setHover(null)}
            className={`grid grid-cols-12 py-4 border-b thin-rule items-center magnetic ${hover === p.n ? "bg-muted/60" : ""}`}
          >
            <div className="col-span-1 tabular text-[15px] text-muted-foreground">{p.n}</div>
            <div className="col-span-4 text-[20px] font-medium tracking-tight leading-tight">
              {p.name}
              {p.kind === "anchor" && <span className="ml-3 text-[10px] uppercase tracking-[0.16em] text-[color:var(--sage-tone)]">Anchor</span>}
            </div>
            <div className="col-span-2 text-[13px] text-muted-foreground">{p.cat}</div>
            <div className="col-span-2 text-[16px] tabular">{p.inv}</div>
            <div className="col-span-2 text-[14px] text-muted-foreground tabular">{p.ret}</div>
            <div className="col-span-1 text-right text-[14px] tabular">{p.roi}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-8 mt-6">
        <div className="col-span-7">
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-3">How they connect</div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            {connections.map(([k, v]) => (
              <div key={k} className="flex gap-3 border-t thin-rule pt-3">
                <div className="text-[12px] uppercase tracking-[0.14em] text-ink w-[110px] shrink-0 mt-[2px]">{k}</div>
                <div className="text-[13px] text-muted-foreground leading-snug">{v}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-[11px] text-muted-foreground italic">
            CPPL: per city, scalable across 4 cities; team franchise fees collected upfront cover operating costs. A for Arena: infrastructure asset — measured by EBITDA and exit value, not percentage ROI.
          </div>
        </div>
        <div className="col-span-5 border thin-rule rounded-md p-5">
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">The Range</div>
          <div className="grid grid-cols-2 gap-6 mt-3">
            <div>
              <div className="text-[28px] font-medium tabular tracking-tight">₹16L</div>
              <div className="text-[12px] text-muted-foreground mt-1">Entry play</div>
            </div>
            <div>
              <div className="text-[28px] font-medium tabular tracking-tight">₹14–16 Cr</div>
              <div className="text-[12px] text-muted-foreground mt-1">Anchor asset</div>
            </div>
          </div>
          <div className="text-[13px] text-muted-foreground mt-3 leading-relaxed">
            Quick launches. 18-month builds. Something for every timeline.
          </div>
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
    <div className="grid gap-3 mb-4" style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}>
      {items.map((it) => (
        <div key={it.label} className={`border thin-rule rounded-md p-4 ${it.strong ? "bg-foreground text-paper" : ""}`}>
          <div className={`text-[10px] uppercase tracking-[0.16em] ${it.strong ? "opacity-70" : "text-muted-foreground"}`}>{it.label}</div>
          <div className="text-[30px] font-medium tabular tracking-tight mt-1 leading-none">{it.value}</div>
          {it.sub && <div className={`text-[11px] mt-1.5 ${it.strong ? "opacity-70" : "text-muted-foreground"}`}>{it.sub}</div>}
        </div>
      ))}
    </div>
  );
}

function InvestTable({ title, rows }: { title: string; rows: { k: string; v: string; strong?: boolean; muted?: boolean }[] }) {
  return (
    <div className="border thin-rule rounded-md p-4">
      <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-2">{title}</div>
      {rows.map((r) => (
        <div key={r.k} className={`flex justify-between gap-4 border-t thin-rule py-2 text-[13px] ${r.strong ? "text-ink font-medium" : ""}`}>
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
      <div className="px-4 py-2.5 border-b thin-rule text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{title}</div>
      <div className="grid grid-cols-12 px-4 py-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground border-b thin-rule">
        <div className="col-span-6">{cols[0]}</div>
        <div className="col-span-3 text-right">{cols[1]}</div>
        <div className="col-span-3 text-right">{cols[2]}</div>
      </div>
      {rows.map((r) => (
        <div key={r.k} className={`grid grid-cols-12 px-4 py-2 text-[13px] border-t thin-rule ${r.total ? "bg-muted/25" : ""}`}>
          <div className={`col-span-6 ${r.total ? "text-ink font-medium" : "text-muted-foreground"}`}>{r.k}</div>
          {r.note ? (
            <div className="col-span-6 text-[12px] text-muted-foreground italic text-right">{r.a}</div>
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
    <div className="border thin-rule rounded-md p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
        <div className="text-[10px] text-muted-foreground tabular">Hover or tap</div>
      </div>
      <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{points[i].label}</div>
      <Tween
        value={points[i].value}
        format={(v) => format(v)}
        className="block mt-1 text-[56px] font-medium tabular tracking-tight leading-none"
      />
      {points[i].sub && <div className="text-[12px] text-muted-foreground mt-2">{points[i].sub}</div>}
      <div className="mt-5 grid gap-2" style={{ gridTemplateColumns: `repeat(${points.length}, 1fr)` }}>
        {points.map((p, idx) => {
          const active = idx === i;
          const w = Math.max(0.05, Math.abs(p.value) / max);
          return (
            <button
              key={p.label}
              onMouseEnter={() => setI(idx)}
              onClick={() => setI(idx)}
              className={`magnetic border thin-rule rounded p-2 text-left transition-colors ${active ? "bg-foreground text-paper" : "hover:bg-muted/40"}`}
            >
              <div className={`text-[10px] uppercase tracking-[0.14em] ${active ? "opacity-70" : "text-muted-foreground"}`}>{p.label}</div>
              <div className="text-[14px] tabular mt-0.5">{format(p.value)}</div>
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
    <div className="border thin-rule rounded-md p-4">
      <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-2.5">{title}</div>
      <ul className="space-y-2">
        {items.map(({ Icon, t, s }) => (
          <li key={t} className="flex gap-2.5 border-t thin-rule pt-2">
            <Icon className="h-3.5 w-3.5 mt-1 text-[color:var(--slate-tone)] shrink-0" strokeWidth={1.5} />
            <div className="min-w-0">
              <span className="text-[13px] font-medium text-ink">{t}</span>{" "}
              <span className="text-[12px] text-muted-foreground">{s}</span>
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
                ["Venue", "—", "JN Indoor Stadium, Chennai"],
                ["Daily footfall", "~1,000 / day", "50 Lakh+ projected campaign reach"],
                ["Sponsors", "MGM Healthcare, BoomCars, Indian Bank, TexValley", "Open for Season 2"],
                ["VIP presence", "Sharath Kamal · IAS CEO of SDAT", "—"],
                ["Marketing", "—", "9-channel campaign · 90 days"],
                ["Channels", "—", "Outdoor · Print · Radio · Digital · YouTube Live · PR · Influencers"],
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
            <img src={images.tnppl} alt="TNPPL arena" className="w-full h-full object-cover grayscale-[0.2] saturate-50" loading="lazy"/>
            <div className="absolute inset-0 bg-gradient-to-t from-paper/40 to-transparent" />
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
        sub="₹31L total entry · 3-year tenure across Seasons 2, 3 & 4."
      />
      <KpiStrip items={[
        { label: "Total entry", value: "₹31L", sub: "₹28L fee + ₹3L auction", strong: true },
        { label: "Per-season recovery", value: "₹7.5–23L", sub: "cash from 4 sources" },
        { label: "Tenure", value: "3 yrs", sub: "S2 · S3 · S4" },
        { label: "Renewal", value: "+20%", sub: "preferential rate" },
      ]}/>
      <Grid12>
        <div className="col-span-7 flex flex-col gap-4 min-h-0">
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
        <div className="col-span-5 flex flex-col gap-4 min-h-0">
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
        sub="Celebrity Pickleball League (CPL) — Season 1 · October 2026."
        logoKey="cpl" logoLabel="CPL"
      />
      <AboutGrid
        label="Who is behind CPL"
        items={[
          { Icon: Star, t: "Organised by ATP", s: "All Things Pickleball — India's most comprehensive pickleball ecosystem." },
          { Icon: Trophy, t: "Format creators", s: "Queen of the Court · Masters · Aspiring Aces — proprietary play formats." },
          { Icon: Sparkles, t: "WPPL organisers", s: "Built India's first Women's Premier Pickleball League." },
          { Icon: Layers, t: "Unified platform", s: "Coaching · events · retail · infrastructure · content — all under one roof." },
          { Icon: ShieldCheck, t: "Quality benchmark", s: "Sets the professionalism standard across Indian pickleball." },
          { Icon: BadgeCheck, t: "End-to-end run by ATP", s: "Production, broadcast, operations and content — ATP handles all of it." },
        ]}
      />

      <Grid12>
        <div className="col-span-5 flex flex-col gap-5">
          <div className="border thin-rule rounded-md overflow-hidden flex-1 min-h-[260px]">
            <img src={images.cpl} alt="CPL stage" className="w-full h-full object-cover grayscale-[0.4] saturate-50" loading="lazy"/>
          </div>
          <div className="border thin-rule rounded-md p-5">
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">What is CPL</div>
            <p className="mt-2 text-[15px] leading-relaxed text-ink/90">
              India's first <span className="font-medium">IPL-style celebrity pickleball league</span> — built for entertainment, content and national media coverage. Bollywood stars, cricketers and sports personalities compete across <span className="font-medium tabular">6 franchise teams</span>.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-4 border-t thin-rule pt-4">
              <Stat label="Founding slots" value="6" sub="nationwide" />
              <Stat label="Teams" value="6" sub="franchise" />
              <Stat label="Window" value="10–11d" sub="per season" />
            </div>
          </div>
        </div>

        <div className="col-span-7 flex flex-col gap-5">
          <div className="border thin-rule rounded-md">
            <div className="px-5 py-3 border-b thin-rule text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
              Your team — how it works
            </div>
            <div className="grid grid-cols-12 px-5 py-2.5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground border-b thin-rule">
              <div className="col-span-4">Element</div>
              <div className="col-span-8">Detail</div>
            </div>
            {[
              ["Your role", "Captain — the face, the owner, the story."],
              ["Your team", "You + 2–3 celebrities you invite + 1 professional player."],
              ["Pro player", "Provided by ATP."],
              ["Time commitment", "10–11 days per season."],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-12 px-5 py-3 text-[15px] border-t thin-rule">
                <div className="col-span-4 text-muted-foreground">{k}</div>
                <div className="col-span-8 text-ink">{v}</div>
              </div>
            ))}
          </div>

          <div className="border thin-rule rounded-md p-5">
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground mb-3">The commercial opportunity</div>
            <ul className="space-y-3">
              {[
                ["Sponsors follow celebrity reach.", "The bigger your team, the higher your sponsorship value."],
                ["10–11 days of content.", "Year-round monetisation — clips, reels, behind-the-scenes, brand integrations."],
                ["Founding price ends with Season 1.", "Subsequent seasons are priced against established franchise value."],
                ["Only 6 slots.", "Scarcity drives franchise appreciation from Season 2 onwards."],
              ].map(([t, s]) => (
                <li key={t} className="flex gap-3 border-t thin-rule pt-3 first:border-t-0 first:pt-0">
                  <Sparkles className="h-4 w-4 mt-1 text-[color:var(--slate-tone)] shrink-0" strokeWidth={1.5} />
                  <div className="text-[14px] leading-snug">
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
    { name: "Chennai", v: 80, tone: "var(--slate-tone)" },
    { name: "Hyderabad", v: 75, tone: "var(--sand-tone)" },
    { name: "Bangalore", v: 78, tone: "var(--sage-tone)" },
    { name: "Mumbai", v: 82, tone: "var(--ink)" },
  ];
  const [active, setActive] = useState<number | null>(null);
  const total = cities.reduce((a, c) => a + c.v, 0);
  return (
    <>
      <SlideHeader tag="08 · CPPL · Opportunity"
        title="Own India's first Corporate Pickleball League IP."
        sub="Corporate Premier Pickleball League (CPPL) — 4 cities · annual · recurring."
        logoKey="cppl" logoLabel="CPPL"
      />

      <div className="mb-5 border thin-rule rounded-md p-5">
        <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-2">What is CPPL</div>
        <p className="text-[15px] leading-relaxed text-ink/90 max-w-[1200px]">
          India's first <span className="font-medium">structured inter-corporate pickleball league</span>. Companies buy franchise teams and compete across a seasonal league format — every year, across four cities.
          <span className="ml-2 text-muted-foreground">Chennai · Hyderabad · Bangalore · Mumbai.</span>
        </p>
      </div>

      <Grid12>
        <div className="col-span-6 border thin-rule rounded-md p-5 flex">
          <div className="flex-1 relative min-h-[340px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={cities} dataKey="v" innerRadius={90} outerRadius={150} paddingAngle={2} stroke="var(--paper)" strokeWidth={3}
                  onMouseEnter={(_, i) => setActive(i)} onMouseLeave={() => setActive(null)}>
                  {cities.map((c, i) => (
                    <Cell key={c.name} fill={c.tone} opacity={active === null || active === i ? 1 : 0.35}/>
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{active === null ? "Combined / yr" : cities[active].name}</div>
                <div className="text-[36px] font-medium tabular mt-1">
                  {active === null ? `₹${(total/100).toFixed(2)} Cr` : `₹${cities[active].v}L`}
                </div>
              </div>
            </div>
          </div>
          <div className="w-[220px] flex flex-col justify-center gap-3 pl-3">
            <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-1">Per-city revenue</div>
            {cities.map((c, i) => (
              <button key={c.name} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
                className={`flex items-center gap-3 text-left magnetic border-t thin-rule pt-2 ${active === i ? "" : "opacity-70"}`}>
                <span className="h-3 w-3 rounded-sm" style={{ background: c.tone }}/>
                <span className="text-[15px] flex-1">{c.name}</span>
                <span className="text-[14px] tabular text-muted-foreground">₹{c.v}L</span>
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-6 flex flex-col gap-5">
          <div className="border thin-rule rounded-md p-5">
            <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-3">What each city includes</div>
            <ul className="space-y-2.5">
              {[
                { Icon: Users, t: "8–10 corporate franchise teams", s: "Companies buy in; players are their employees." },
                { Icon: Briefcase, t: "Full sponsorship stack", s: "Title · Associates · F&B · Activations · Venue branding." },
                { Icon: ShieldCheck, t: "Professionally managed ops", s: "Production, refereeing, scheduling, broadcast — all run for you." },
                { Icon: Handshake, t: "Premium corporate networking", s: "League weekends double as relationship infrastructure." },
              ].map(({ Icon, t, s }) => (
                <li key={t} className="flex gap-3 border-t thin-rule pt-2.5">
                  <Icon className="h-4 w-4 mt-1 text-[color:var(--slate-tone)] shrink-0" strokeWidth={1.5} />
                  <div className="min-w-0">
                    <div className="text-[14px] font-medium text-ink leading-tight">{t}</div>
                    <div className="text-[12px] text-muted-foreground leading-snug mt-0.5">{s}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="border thin-rule rounded-md p-5">
            <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-3">Why it works</div>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-2.5">
              {[
                { Icon: Repeat, t: "Annual recurring revenue", s: "Not a one-time event — a yearly IP." },
                { Icon: Briefcase, t: "Premium corporate audience", s: "Sponsor-friendly demographic." },
                { Icon: Sparkles, t: "Asset-light", s: "No owned infrastructure required." },
                { Icon: Flag, t: "No competition today", s: "First-mover in the corporate league space." },
                { Icon: TrendingUp, t: "Add cities yearly", s: "Same model — scales without re-architecture." },
              ].map(({ Icon, t, s }) => (
                <li key={t} className="flex gap-3 border-t thin-rule pt-2.5">
                  <Icon className="h-4 w-4 mt-1 text-[color:var(--slate-tone)] shrink-0" strokeWidth={1.5} />
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium text-ink leading-tight">{t}</div>
                    <div className="text-[11px] text-muted-foreground leading-snug mt-0.5">{s}</div>
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

/* ---------- 09 CPPL ROI ---------- */

export function S09() {
  return (
    <>
      <SlideHeader tag="09 · CPPL · Investment & Returns"
        title="What You Put In. What You Get Back."
        sub="Opportunity 03 · Investment Detail — per city economics, scaled across 4 cities."
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

/* ---------- 10 Inter-School Opportunity ---------- */

export function S10() {
  const cities = [
    { k: "Chennai", v: "20+ schools & colleges" },
    { k: "Bangalore", v: "20+ schools & colleges" },
    { k: "Hyderabad", v: "20+ schools & colleges" },
    { k: "Mumbai", v: "20+ schools & colleges" },
  ];
  const [hover, setHover] = useState<number | null>(null);
  return (
    <>
      <SlideHeader tag="10 · Inter-School & College League · Opportunity"
        title="Build the Grassroots. Own the Next Generation."
        sub="India's first structured school & college pickleball league — 4 cities · annual · championship finals Sept–Oct 2026."
        logoKey="school" logoLabel="Inter-School League"
      />
      <Grid12>
        <div className="col-span-7 flex flex-col gap-4 min-h-0">
          <div className="border thin-rule rounded-md p-5">
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground mb-2">What it is</div>
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              A structured annual pickleball league for schools and colleges across four major cities. Teams represent their institutions, compete through a seasonal league format, and culminate in a national championship.
            </p>
            <div className="text-[13px] text-ink mt-2 tabular">Chennai · Bangalore · Hyderabad · Mumbai</div>
          </div>
          <div className="border thin-rule rounded-md p-5">
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground mb-3">City targets — Year 1</div>
            <div className="grid grid-cols-2 gap-2">
              {cities.map((c, i) => (
                <button key={c.k} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
                  className="text-left p-3 border thin-rule rounded-md transition-colors"
                  style={{ backgroundColor: hover === i ? "color-mix(in oklch, var(--sage-tone) 25%, var(--paper))" : undefined }}>
                  <div className="text-[15px] font-medium tracking-tight">{c.k}</div>
                  <div className="text-[12px] text-muted-foreground tabular mt-0.5">{c.v}</div>
                </button>
              ))}
            </div>
            <div className="text-[12px] text-muted-foreground mt-3">Championship finals — September / October 2026.</div>
          </div>
        </div>
        <div className="col-span-5 flex flex-col gap-4 min-h-0">
          <TakeawayList
            title="Why it matters beyond the numbers"
            items={[
              { Icon: GraduationCap, t: "Player pipeline.", s: "Today's students = tomorrow's CPPL players & S4 brand advocates." },
              { Icon: Sparkles, t: "Feeds the ecosystem.", s: "Talent funnel for every other league in S4 Sports." },
            ]}
          />
          <TakeawayList
            title="Why it's commercially attractive"
            items={[
              { Icon: Heart, t: "New sponsor vertical.", s: "Education · FMCG · CSR · youth wellness." },
              { Icon: Building2, t: "Brand-safe.", s: "Community-driven — ideal for institutional sponsors." },
              { Icon: Trophy, t: "First-mover.", s: "First structured student pickleball league in India." },
              { Icon: TrendingUp, t: "Scalable.", s: "100+ institutions by Year 2." },
            ]}
          />
        </div>
      </Grid12>
    </>
  );
}

/* ---------- 11 Inter-School ROI ---------- */

export function S11() {
  return (
    <>
      <SlideHeader tag="11 · Inter-School League · Investment & Returns"
        title="What You Put In. What You Get Back."
        sub="Opportunity 04 · Investment Detail — ₹4L per city · 4 cities · 150–275% Year 1 ROI."
      />
      <KpiStrip items={[
        { label: "Investment / city", value: "₹4L", sub: "lowest entry in deck" },
        { label: "Revenue / city", value: "₹10–15L", sub: "fees + sponsors" },
        { label: "Net / city", value: "₹6–11L", sub: "Year 1" },
        { label: "ROI", value: "150–275%", sub: "Year 1 alone", strong: true },
      ]}/>
      <Grid12>
        <div className="col-span-7 flex flex-col gap-4 min-h-0">
          <ReturnsTable
            title="Per city — investment vs return"
            cols={["Line", "Min", "Max"]}
            rows={[
              { k: "Investment", a: "₹4L", b: "₹4L" },
              { k: "School / college entry fees", a: "₹8L", b: "₹10L" },
              { k: "Title sponsor", a: "₹5L", b: "₹8L" },
              { k: "Co-sponsors", a: "₹2L", b: "₹3L" },
              { k: "Year 1 revenue", a: "₹10L", b: "₹15L", total: true },
              { k: "Net profit", a: "₹6L", b: "₹11L", total: true },
              { k: "ROI", a: "150%", b: "275%", total: true },
            ]}
          />
          <ReturnsTable
            title="Scale it up"
            cols={["Line", "1 city", "4 cities"]}
            rows={[
              { k: "Investment", a: "₹4L", b: "₹16L" },
              { k: "Revenue", a: "₹10–15L", b: "₹40–60L" },
              { k: "Net profit", a: "₹6–11L", b: "₹24–44L", total: true },
              { k: "ROI", a: "150–275%", b: "150–275%", total: true },
            ]}
          />
        </div>
        <div className="col-span-5 flex flex-col gap-4 min-h-0">
          <HorizonPicker
            label="Net profit — pick scale"
            points={[
              { label: "1 city", value: 9, sub: "₹6–11L net · ₹4L entry." },
              { label: "4 cities", value: 34, sub: "₹24–44L net · ₹16L total entry." },
              { label: "100+ inst. Y2", value: 70, sub: "Scale-out across institutions." },
            ]}
          />
          <TakeawayList
            title="The strategic return"
            items={[
              { Icon: GraduationCap, t: "Pipeline ownership.", s: "Every student athlete = future CPPL player & S4 advocate for life." },
              { Icon: Heart, t: "CSR-friendly.", s: "Unlocks sponsors who won't touch pro sports." },
              { Icon: TrendingUp, t: "Decade-long upside.", s: "Real return is bigger than the financials suggest." },
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
      <SlideHeader tag="12 · Paddle City Open · Opportunity"
        title="Take Pickleball to the People."
        sub="A weekend recreational tournament circuit — 4 cities · 8 events per year · doubles · all skill levels."
        logoKey="paddle" logoLabel="Paddle City Open"
      />
      <Grid12>
        <div className="col-span-7 flex flex-col gap-4 min-h-0">
          <div className="border thin-rule rounded-md p-5">
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground mb-2">What it is</div>
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              A weekend recreational pickleball tournament open to all skill levels — beginner, intermediate, and pro-am. Doubles format. Anyone can register and play. Think amateur open golf day — but for pickleball. Social, competitive, accessible.
            </p>
          </div>
          <div className="border thin-rule rounded-md p-5 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">The 4-city circuit</div>
              <div className="text-[12px] text-muted-foreground tabular">{active !== null ? cityNodes[active].name : "8 events · 4 cities · Sat–Sun"}</div>
            </div>
            <div className="relative h-[260px] bg-[color:var(--paper)] border thin-rule rounded">
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <path
                  d="M 35 18 L 50 12 L 62 18 L 70 30 L 78 42 L 82 55 L 80 70 L 70 82 L 58 88 L 48 82 L 38 78 L 30 65 L 24 50 L 22 35 Z"
                  fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="0.4" strokeDasharray="0.8 0.8"/>
              </svg>
              <svg className="absolute inset-0 w-full h-full">
                {cityNodes.map((c, i) => {
                  const next = cityNodes[(i + 1) % cityNodes.length];
                  return (
                    <line key={i}
                      x1={`${c.x * 100}%`} y1={`${c.y * 100}%`}
                      x2={`${next.x * 100}%`} y2={`${next.y * 100}%`}
                      stroke="currentColor" strokeOpacity={active === i || active === (i+1)%cityNodes.length ? 0.6 : 0.18}
                      strokeWidth={1} strokeDasharray="4 4"/>
                  );
                })}
              </svg>
              {cityNodes.map((c, i) => (
                <button key={c.name}
                  onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${c.x * 100}%`, top: `${c.y * 100}%` }}>
                  <motion.div
                    className="rounded-full bg-foreground"
                    animate={{ scale: active === i ? 1.5 : 1 }}
                    transition={{ duration: 0.15 }}
                    style={{ width: 10, height: 10 }}
                  />
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[12px] tabular ${active === i ? "text-ink" : "text-muted-foreground"}`}>
                    {c.name} · {c.events} events
                  </div>
                </button>
              ))}
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
      <SlideHeader tag="13 · Paddle City Open · Investment & Returns"
        title="Low risk. Real returns."
        sub="₹9L per event · 8 events Year 1 = ₹72L. Net ~₹40L Year 1. Break-even after event 5–6."
      />
      <KpiStrip items={[
        { label: "Total Year-1 in", value: "₹72L", sub: "₹9L × 8 events", strong: true },
        { label: "Per-event revenue", value: "₹14L", sub: "fees + sponsorship + F&B" },
        { label: "Year-1 net", value: "~₹40L", sub: "after all costs" },
        { label: "Break-even", value: "Event 5–6", sub: "cumulative" },
      ]}/>
      <Grid12>
        <div className="col-span-7 flex flex-col gap-4 min-h-0">
          <InvestTable
            title="Per-event expenses (₹9L)"
            rows={[
              { k: "Venue", v: "₹2.25L" },
              { k: "Prize pool", v: "₹3L" },
              { k: "Branding", v: "₹1.5L" },
              { k: "Staff", v: "₹1.5L" },
              { k: "Digital", v: "₹0.5L" },
              { k: "Total per event × 8", v: "₹72L", strong: true },
            ]}
          />
          <ReturnsTable
            title="Per-event economics"
            cols={["Line item", "Min", "Max"]}
            rows={[
              { k: "Entry fees (150–250 pairs)", a: "₹4L", b: "₹5L" },
              { k: "Sponsorship", a: "₹3L", b: "₹5L" },
              { k: "F&B + merch", a: "₹1L", b: "₹2L" },
              { k: "Revenue per event", a: "₹8L", b: "₹14L", total: true },
              { k: "Net (vs ₹9L cost)", a: "(₹1L)", b: "₹5L", total: true },
            ]}
          />
        </div>
        <div className="col-span-5 flex flex-col gap-4 min-h-0">
          <HorizonPicker
            label="Cumulative net — pick an event"
            points={[
              { label: "Event 1", value: -2, sub: "Launch — first event runs at a small loss." },
              { label: "Event 4", value: 18, sub: "Sponsorship momentum kicks in." },
              { label: "Event 8", value: 40, sub: "Year closes profitable." },
            ]}
          />
          <TakeawayList
            title="Year 2 upside"
            items={[
              { Icon: TrendingUp, t: "Title sponsorship.", s: "Hits ₹8–10L/event → annual net jumps to ₹70–80L." },
              { Icon: Sparkles, t: "Sponsorship is upside.", s: "Entry fees alone cover operating costs." },
              { Icon: MapPin, t: "City scale.", s: "Bangalore & Mumbai can hit 200–250+ pairs." },
            ]}
          />
        </div>
      </Grid12>
    </>
  );
}

/* ---------- 14 Arena Opportunity (waterfall) ---------- */

const capitalDeploy = [
  { k: "Lease deposit", v: 200 },
  { k: "Fit-out", v: 380 },
  { k: "Pool", v: 220 },
  { k: "Surfaces", v: 150 },
  { k: "HVAC", v: 120 },
  { k: "Events hall", v: 130 },
  { k: "Solar + tech", v: 110 },
  { k: "Marketing", v: 90 },
  { k: "Working capital", v: 100 },
];

export function S14() {
  const [active, setActive] = useState<number | null>(null);
  const total = capitalDeploy.reduce((a, c) => a + c.v, 0);
  return (
    <>
      <SlideHeader tag="14 · A for Arena · Opportunity"
        title="Build the home of S4 Sports."
        sub="S4 Sports × Da One Sports · ~53,000 sq ft · Chennai ECR. S4 owns venue, infrastructure, memberships, F&B, events, sponsorship. Da One owns coaching."
        logoKey="arena" logoLabel="A for Arena"
      />
      <AboutGrid
        label="About the venue"
        items={[
          { Icon: MapPin, t: "Chennai ECR", s: "~53,000 sq ft on East Coast Road — premium catchment." },
          { Icon: Handshake, t: "S4 × Da One Sports", s: "JV — S4 owns venue, memberships, F&B, events; Da One owns coaching." },
          { Icon: Layers, t: "13 revenue streams", s: "Memberships · F&B · events · sponsorship · pro shop · academy · more." },
          { Icon: Dumbbell, t: "Multi-sport", s: "Pool · football · basketball · pickleball · cricket · frisbee." },
          { Icon: Award, t: "Premium gap", s: "Only multi-sport venue between Thiruvanmiyur & Mahabalipuram." },
          { Icon: TrendingUp, t: "EBITDA Month 6–8", s: "Cash payback 30–36 months · asset value ₹40–55 Cr by Year 3." },
        ]}
      />

      <Grid12>
        <div className="col-span-6 border thin-rule rounded-md overflow-hidden flex flex-col">
          <div className="aspect-[16/10] overflow-hidden bg-muted">
            <img src={images.arena} alt="A for Arena" className="w-full h-full object-cover grayscale-[0.15] saturate-50" loading="lazy"/>
          </div>
          <div className="p-6">
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">Inside</div>
            <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-[15px] text-muted-foreground">
              {[
                "25m semi-Olympic pool", "Football 5-a-side",
                "Basketball full court", "3–4 pickleball courts",
                "Box cricket cage", "Frisbee / skating zone",
                "Café + restaurant", "Corporate hall (80–120)",
                "300–500 seat gallery", "Pro shop · S4 HQ",
              ].map((s) => <div key={s} className="border-t thin-rule pt-2">{s}</div>)}
            </div>
          </div>
        </div>
        <div className="col-span-6 border thin-rule rounded-md p-6 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">Capital deployment — waterfall</div>
            <div className="text-[12px] tabular text-muted-foreground">{active !== null ? `${capitalDeploy[active].k} · ₹${capitalDeploy[active].v}L` : `Total ₹${(total/100).toFixed(2)} Cr`}</div>
          </div>
          <div className="flex-1 mt-4 min-h-0">
            <ResponsiveContainer>
              <BarChart data={capitalDeploy} margin={{ top: 10, right: 10, left: 0, bottom: 30 }}
                onMouseMove={(s: { activeTooltipIndex?: number }) => setActive(s?.activeTooltipIndex ?? null)}
                onMouseLeave={() => setActive(null)}>
                <XAxis dataKey="k" tick={{ fontSize: 10, fill: "currentColor", opacity: 0.5 }} interval={0} angle={-25} textAnchor="end" axisLine={false} tickLine={false}/>
                <YAxis hide />
                <Tooltip cursor={{ fill: "transparent" }} content={() => null}/>
                <Bar dataKey="v" radius={[2,2,0,0]}>
                  {capitalDeploy.map((_, i) => (
                    <Cell key={i} fill={active === null || active === i ? "var(--ink)" : "color-mix(in oklch, var(--ink) 30%, var(--paper))"}/>
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 text-[14px] text-muted-foreground">
            13 revenue streams · ECR is the only premium multi-sport gap between Thiruvanmiyur and Mahabalipuram.
          </div>
        </div>
      </Grid12>
    </>
  );
}

/* ---------- 15 Arena ROI ---------- */

export function S15() {
  return (
    <>
      <SlideHeader tag="15 · A for Arena · Investment & Returns"
        title="₹15 Cr in. ₹22 Cr revenue by Year 3."
        sub="EBITDA positive Month 6–8 · Cash payback 30–36 months · Asset value ₹40–55 Cr by Year 3."
      />
      <KpiStrip items={[
        { label: "Capital in", value: "₹15 Cr", sub: "fully built", strong: true },
        { label: "S4 equity out", value: "₹3.5–4.5 Cr", sub: "after stack" },
        { label: "Yr 3 EBITDA", value: "₹10.58 Cr", sub: "47.9% margin" },
        { label: "Yr 3 asset value", value: "₹40–55 Cr", sub: "4–5× EBITDA" },
      ]}/>
      <Grid12>
        <div className="col-span-7 flex flex-col gap-4 min-h-0">
          <ReturnsTable
            title="3-year P&L (₹ Cr)"
            cols={["Line", "Year 1", "Year 3"]}
            rows={[
              { k: "Revenue", a: "₹9.3", b: "₹22.1" },
              { k: "Opex", a: "(₹7.49)", b: "(₹11.52)" },
              { k: "EBITDA", a: "₹1.81", b: "₹10.58", total: true },
              { k: "Margin", a: "19.5%", b: "47.9%" },
              { k: "Year 2 EBITDA: ₹7.01 Cr · Margin 42.0%", a: "", b: "", note: true },
            ]}
          />
          <InvestTable
            title="Funding stack (₹15 Cr)"
            rows={[
              { k: "S4 equity", v: "₹3.5–4.5 Cr" },
              { k: "Da One sweat", v: "₹0.5–1 Cr" },
              { k: "Founding memberships", v: "₹2.5–3.5 Cr" },
              { k: "Title sponsor", v: "₹1.2–1.8 Cr" },
              { k: "Term loan", v: "₹5–7 Cr" },
            ]}
          />
        </div>
        <div className="col-span-5 flex flex-col gap-4 min-h-0">
          <HorizonPicker
            label="EBITDA — pick a year"
            points={[
              { label: "Year 1", value: 181, sub: "EBITDA+ Month 6–8 · ramp." },
              { label: "Year 2", value: 701, sub: "Memberships mature · F&B scales." },
              { label: "Year 3", value: 1058, sub: "47.9% margin · steady-state." },
            ]}
            format={(v) => `₹${(v/100).toFixed(2)} Cr`}
          />
          <TakeawayList
            title="Why this is the anchor asset"
            items={[
              { Icon: Layers, t: "13 revenue streams.", s: "Memberships · F&B · events · sponsorship · pro shop · academy · more." },
              { Icon: TrendingUp, t: "30–36 month payback.", s: "Cash recycles into the next venue." },
              { Icon: Award, t: "Real asset on the books.", s: "Not an event budget — a sellable, financeable property." },
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
      <SlideHeader tag="16 · Next Steps" title="Let's talk about what you want to build." />
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
