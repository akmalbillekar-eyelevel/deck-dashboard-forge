import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart, Line, ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell,
} from "recharts";
import { Tween } from "./Tween";
import { Landmark, ShieldCheck, Globe2, Trophy, Building2, BadgeCheck } from "lucide-react";
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
    <header className="mb-12 flex items-start justify-between gap-8">
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

/* ---------- 04 TNPPL Opportunity ---------- */

export function S04() {
  return (
    <>
      <SlideHeader tag="04 · TNPPL · Opportunity"
        title="Own a Tamil Nadu Pickleball franchise."
        sub="TNPPL Season 2 · Jawaharlal Nehru Indoor Stadium, Chennai. Organised by TNPA — affiliated with IPA, GPF, SDAT, SAI, Ministry of Youth Affairs & Sports."
        logoKey="tnppl" logoLabel="TNPPL"
      />
      <Grid12>
        <div className="col-span-7 flex flex-col gap-6">
          <div>
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground mb-3">Season 1 — proof</div>
            <div className="grid grid-cols-4 gap-6">
              <Stat label="Teams" value="16" />
              <Stat label="Players" value="160" />
              <Stat label="Daily footfall" value="~1,000" />
              <Stat label="Prize pool" value="₹7L" />
            </div>
          </div>
          <div className="border-t thin-rule pt-6">
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground mb-3">Season 2 — upgrade</div>
            <div className="grid grid-cols-4 gap-6">
              <Stat label="Franchise teams" value="12" />
              <Stat label="Players" value="168" />
              <Stat label="Prize pool" value="₹30L" sub="4× S1" />
              <Stat label="Projected reach" value="50L+" sub="9-channel campaign" />
            </div>
          </div>
          <div className="border-t thin-rule pt-6 text-[15px] text-muted-foreground max-w-[760px]">
            Sponsors include MGM Healthcare, Indian Bank, BoomCars and TexValley. Sharath Kamal and the IAS SDAT CEO attended Season 1. Your brand rides every channel of the Season 2 campaign.
          </div>
        </div>
        <div className="col-span-5 border thin-rule rounded-md overflow-hidden flex flex-col">
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            <img src={images.tnppl} alt="TNPPL arena" className="w-full h-full object-cover grayscale-[0.2] saturate-50" loading="lazy"/>
            <div className="absolute inset-0 bg-gradient-to-t from-paper/40 to-transparent" />
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">Venue</div>
            <div className="text-[26px] font-medium tracking-tight mt-1">JN Indoor Stadium, Chennai</div>
            <div className="text-[14px] text-muted-foreground mt-2">Fully governed. Affiliated with IPA, GPF, SDAT, SAI, Ministry of Youth Affairs & Sports.</div>
          </div>
        </div>
      </Grid12>
    </>
  );
}

/* ---------- 05 TNPPL Investment ---------- */

export function S05() {
  const years = ["Season 2", "Season 3", "Season 4"];
  const baseRecovery = [9, 14, 21]; // ₹L median
  const [pinned, setPinned] = useState<number | null>(null);
  const ticket = 31;
  const moic = 1.0 + (ticket / 31) * 1.6;
  const irr = 22 + (ticket - 31) * 0.4;
  const coc = 0.55 + (ticket - 31) * 0.012;
  const recovery = baseRecovery.map((v) => v * (ticket / 31));
  return (
    <>
      <SlideHeader tag="05 · TNPPL · Investment & ROI"
        title="What you put in. What you get back."
        sub="₹28L franchise fee + ₹3L auction = ₹31L total. Three-year tenure. 20% preferential renewal. Franchise is transferable."
      />
      <Grid12>
        <div className="col-span-8 flex flex-col gap-6">
          <div className="border thin-rule rounded-md">
            <div className="px-5 py-4 flex items-center justify-between border-b thin-rule">
              <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">Cash recovery — heat strip</div>
              <div className="text-[12px] text-muted-foreground tabular">Hover or click a season to pin</div>
            </div>
            <div className="px-5 pt-4">
              <Sparkline values={recovery} focus={pinned} />
            </div>
            <HeatStrip years={years} values={recovery} pinned={pinned} onPin={setPinned} />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="border thin-rule rounded-md p-5">
              <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground mb-4">Per season — components</div>
              {[
                ["Team sponsorship", "₹5L – ₹10L"],
                ["Central guarantee", "₹2L (minimum)"],
                ["Central revenue share", "up to ₹4.16L+"],
                ["Prize money", "₹50K – ₹9L"],
                ["Media equivalence", "₹15 – 20L"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-t thin-rule py-3 text-[16px]">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="tabular">{v}</span>
                </div>
              ))}
            </div>
            <div className="border thin-rule rounded-md p-5">
              <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground mb-4">Central pool mechanics</div>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                League earns above ₹1 Cr → franchises receive 50% of the surplus pool → your share works out to ₹4.16L+ per season at conservative growth.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-4">
                <Stat label="Tenure" value="3 yrs" />
                <Stat label="Renewal" value="+20%" sub="preferential" />
                <Stat label="Status" value="Transferable" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4 flex flex-col gap-5">
          <div className="border thin-rule rounded-md p-6">
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">Projected — 3-year horizon</div>
            <div className="mt-5 space-y-5">
              <div className="flex items-end justify-between">
                <span className="text-[14px] text-muted-foreground">MOIC</span>
                <Tween value={moic} format={(v) => `${v.toFixed(2)}×`} className="text-[44px] font-medium tabular" />
              </div>
              <div className="flex items-end justify-between border-t thin-rule pt-5">
                <span className="text-[14px] text-muted-foreground">IRR</span>
                <Tween value={irr} format={(v) => `${v.toFixed(1)}%`} className="text-[44px] font-medium tabular" />
              </div>
              <div className="flex items-end justify-between border-t thin-rule pt-5">
                <span className="text-[14px] text-muted-foreground">Cash-on-cash</span>
                <Tween value={coc} format={(v) => `${v.toFixed(2)}×`} className="text-[44px] font-medium tabular" />
              </div>
            </div>
          </div>
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
        sub="CPL Season 1 · October 2026. Organised by All Things Pickleball — creators of WPPL, Queen of the Court, and the Masters format."
        logoKey="cpl" logoLabel="CPL"
      />
      <Grid12>
        <div className="col-span-6 border thin-rule rounded-md overflow-hidden">
          <img src={images.cpl} alt="CPL stage" className="w-full h-full object-cover grayscale-[0.4] saturate-50" loading="lazy"/>
        </div>
        <div className="col-span-6 flex flex-col gap-6">
          <div className="grid grid-cols-3 gap-6">
            <Stat label="Format" value="IPL-style" sub="6 franchise teams"/>
            <Stat label="Founding slots" value="6" sub="nationwide" />
            <Stat label="Time / season" value="10–11 days" />
          </div>
          <div className="border-t thin-rule pt-6">
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground mb-3">Your team</div>
            <div className="text-[22px] tracking-tight max-w-[700px]">
              You as Captain · 2–3 celebrities you invite · 1 ATP-provided pro. ATP runs the league end-to-end — you bring the brand and the network.
            </div>
          </div>
          <div className="border-t thin-rule pt-6">
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground mb-3">Why Atlee specifically</div>
            <p className="text-[18px] text-muted-foreground max-w-[680px] leading-relaxed">
              SRK · Allu Arjun · Deepika · Vijay. No other founding owner walks in with this Rolodex. Every celebrity you bring multiplies franchise media value.
            </p>
          </div>
        </div>
      </Grid12>
    </>
  );
}

/* ---------- 07 CPL Investment ---------- */

export function S07() {
  const years = ["Year 1", "Year 2", "Year 3"];
  const base = [22, 38, 65];
  const [pinned, setPinned] = useState<number | null>(null);
  const ticket = 30;
  const recovery = base.map((v) => v * (ticket / 30));
  const moic = 1.0 + (ticket / 30) * 2.2;
  const irr = 38 + (ticket - 30) * 0.5;
  const coc = 0.85 + (ticket - 30) * 0.018;
  return (
    <>
      <SlideHeader tag="07 · CPL · Investment & ROI"
        title="₹30L. One payment. This founding price never exists again."
        sub="Benchmarks: CCL → ₹50 Cr/season after 14 seasons. MLP → $200K to $13M in four years (65×). CPL Season 1 is the ground floor of that trajectory."
      />
      <Grid12>
        <div className="col-span-8 flex flex-col gap-6">
          <div className="border thin-rule rounded-md">
            <div className="px-5 py-4 flex items-center justify-between border-b thin-rule">
              <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">Cash recovery trajectory</div>
              <div className="text-[12px] text-muted-foreground tabular">Pin a horizon</div>
            </div>
            <div className="px-5 pt-4"><Sparkline values={recovery} focus={pinned} /></div>
            <HeatStrip years={years} values={recovery} pinned={pinned} onPin={setPinned} />
          </div>
          <div className="grid grid-cols-3 gap-6">
            <Stat label="Team sponsorship" value="₹15–30L" sub="per season" />
            <Stat label="Content monetisation" value="Ongoing" sub="ATP-managed" />
            <Stat label="Franchise appreciation" value="2–3×" sub="by Season 3" />
          </div>
          <div className="border thin-rule rounded-md p-5 text-[15px] text-muted-foreground">
            <span className="text-foreground">Six slots. Once gone, the founding price is gone.</span> Subsequent seasons will be priced against established franchise value, not the founding round.
          </div>
        </div>
        <div className="col-span-4 flex flex-col gap-5">
          <div className="border thin-rule rounded-md p-6">
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">Projected — 3-year horizon</div>
            <div className="mt-5 space-y-5">
              <div className="flex items-end justify-between"><span className="text-[14px] text-muted-foreground">MOIC</span><Tween value={moic} format={(v) => `${v.toFixed(2)}×`} className="text-[44px] font-medium tabular" /></div>
              <div className="flex items-end justify-between border-t thin-rule pt-5"><span className="text-[14px] text-muted-foreground">IRR</span><Tween value={irr} format={(v) => `${v.toFixed(1)}%`} className="text-[44px] font-medium tabular" /></div>
              <div className="flex items-end justify-between border-t thin-rule pt-5"><span className="text-[14px] text-muted-foreground">Cash-on-cash</span><Tween value={coc} format={(v) => `${v.toFixed(2)}×`} className="text-[44px] font-medium tabular" /></div>
            </div>
          </div>
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
        sub="Four cities. Recurring annual. Sponsorship-driven. Each city is an independent sports property — premium corporate demographic, asset-light, first-mover."
        logoKey="cppl" logoLabel="CPPL"
        />
        <Grid12>
          <div className="col-span-5 flex flex-col gap-5">
            <div className="border thin-rule rounded-md overflow-hidden h-[340px]">
              <img src={images.cppl} alt="Corporate league" className="w-full h-full object-cover grayscale-[0.3] saturate-50" loading="lazy"/>
            </div>
            <div className="border thin-rule rounded-md p-5">
              <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">Per city revenue</div>
              <div className="mt-2 text-[40px] font-medium tabular">₹70 – 80L</div>
              <div className="text-[14px] text-muted-foreground mt-1">Team sales ₹40–50L · Sponsorship ₹30L</div>
            </div>
          </div>
          <div className="col-span-7 border thin-rule rounded-md p-6 flex">
            <div className="flex-1 relative">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={cities} dataKey="v" innerRadius={110} outerRadius={170} paddingAngle={2} stroke="var(--paper)" strokeWidth={3}
                    onMouseEnter={(_, i) => setActive(i)} onMouseLeave={() => setActive(null)}>
                    {cities.map((c, i) => (
                      <Cell key={c.name} fill={c.tone} opacity={active === null || active === i ? 1 : 0.35}/>
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{active === null ? "Combined" : cities[active].name}</div>
                  <div className="text-[44px] font-medium tabular mt-1">
                    {active === null ? `₹${(total/100).toFixed(2)} Cr` : `₹${cities[active].v}L`}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[280px] flex flex-col justify-center gap-4">
              {cities.map((c, i) => (
                <button key={c.name} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
                  className={`flex items-center gap-3 text-left magnetic ${active === i ? "" : "opacity-70"}`}>
                  <span className="h-3 w-3 rounded-sm" style={{ background: c.tone }}/>
                  <span className="text-[18px] flex-1">{c.name}</span>
                  <span className="text-[16px] tabular text-muted-foreground">₹{c.v}L</span>
                </button>
              ))}
              <div className="border-t thin-rule pt-4 mt-2 text-[12px] uppercase tracking-[0.16em] text-muted-foreground">Hover to isolate</div>
            </div>
          </div>
        </Grid12>
    </>
  );
}

/* ---------- 09 CPPL ROI ---------- */

export function S09() {
  const years = ["Yr 1", "Yr 2", "Yr 3"];
  const base = [126, 165, 210];
  const [pinned, setPinned] = useState<number | null>(null);
  const ticket = 154;
  const recovery = base.map((v) => v * (ticket / 154));
  const moic = 1 + (ticket / 154) * 1.4;
  const irr = 65 + (ticket - 154) * 0.05;
  const coc = 0.82 + (ticket - 154) * 0.002;
  return (
    <>
      <SlideHeader tag="09 · CPPL · Investment & ROI"
        title="A high-margin sports IP built for recurring revenue."
        sub="Per city: ₹70–80L revenue · ₹38.5L expenses. Four cities combined: ₹2.8–3.2 Cr revenue, ₹1.54 Cr expenses, ₹1.26–1.66 Cr net. ROI 80–108%+."
      />
      <Grid12>
        <div className="col-span-8 flex flex-col gap-6">
          <div className="border thin-rule rounded-md">
            <div className="px-5 py-4 flex items-center justify-between border-b thin-rule">
              <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">Net profit — 3-year heat strip</div>
              <div className="text-[12px] text-muted-foreground tabular">₹L · pin to inspect</div>
            </div>
            <div className="px-5 pt-4"><Sparkline values={recovery} focus={pinned} /></div>
            <HeatStrip years={years} values={recovery} pinned={pinned} onPin={setPinned} />
          </div>
          <div className="grid grid-cols-5 gap-4">
            {[
              ["Production", "₹15L"],
              ["Prize pool", "₹15L"],
              ["Branding", "₹5L"],
              ["Management", "₹2L"],
              ["Venue", "₹1.5L"],
            ].map(([k, v]) => (
              <div key={k} className="border thin-rule rounded-md p-4">
                <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{k}</div>
                <div className="text-[24px] font-medium tabular mt-1">{v}</div>
              </div>
            ))}
          </div>
          <div className="text-[15px] text-muted-foreground">This is not an event. It's a sports IP business with recurring annual revenue across four cities.</div>
        </div>
        <div className="col-span-4 flex flex-col gap-5">
          <div className="border thin-rule rounded-md p-6">
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">Projected — annualised</div>
            <div className="mt-5 space-y-5">
              <div className="flex items-end justify-between"><span className="text-[14px] text-muted-foreground">MOIC</span><Tween value={moic} format={(v) => `${v.toFixed(2)}×`} className="text-[44px] font-medium tabular" /></div>
              <div className="flex items-end justify-between border-t thin-rule pt-5"><span className="text-[14px] text-muted-foreground">IRR</span><Tween value={irr} format={(v) => `${v.toFixed(1)}%`} className="text-[44px] font-medium tabular" /></div>
              <div className="flex items-end justify-between border-t thin-rule pt-5"><span className="text-[14px] text-muted-foreground">Cash-on-cash</span><Tween value={coc} format={(v) => `${v.toFixed(2)}×`} className="text-[44px] font-medium tabular" /></div>
            </div>
          </div>
        </div>
      </Grid12>
    </>
  );
}

/* ---------- 10 Inter-School Opportunity ---------- */

export function S10() {
  const stages = [
    { k: "City leagues", v: 4 },
    { k: "Regional finals", v: 4 },
    { k: "National championship", v: 1 },
  ];
  const [hover, setHover] = useState<number | null>(null);
  return (
    <>
      <SlideHeader tag="10 · Inter-School League · Opportunity"
        title="Build the grassroots. Own the next generation."
        sub="Structured annual league for schools and colleges. City leagues feed regional finals feed a national championship. The player pipeline for the entire S4 ecosystem."
        logoKey="school" logoLabel="Inter-School League"
      />
      <Grid12>
        <div className="col-span-7 flex flex-col gap-6">
          <div className="border thin-rule rounded-md p-6">
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground mb-5">Pipeline architecture</div>
            <div className="grid grid-cols-3 gap-3">
              {stages.map((s, i) => (
                <button key={s.k} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
                  className={`heat-cell text-left p-5 border thin-rule rounded-md ${hover === i ? "bg-muted" : ""}`}
                  style={{ backgroundColor: hover === i ? "color-mix(in oklch, var(--sage-tone) 25%, var(--paper))" : undefined }}>
                  <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Stage 0{i+1}</div>
                  <div className="text-[22px] font-medium tracking-tight mt-2">{s.k}</div>
                  <div className="text-[14px] text-muted-foreground mt-1 tabular">{s.v} {s.v === 1 ? "event" : "events"}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="border thin-rule rounded-md p-6">
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground mb-3">Strategic spillover</div>
            <p className="text-[18px] text-muted-foreground leading-relaxed max-w-[640px]">
              Students who play today become CPPL corporate players, Paddle City Open participants, and S4 brand advocates. Unlocks education brands, FMCG, CSR and youth-wellness sponsors that won't touch pro sports.
            </p>
          </div>
        </div>
        <div className="col-span-5 border thin-rule rounded-md overflow-hidden">
          <img src={images.school} alt="School league" className="w-full h-full object-cover grayscale-[0.3] saturate-50" loading="lazy"/>
        </div>
      </Grid12>
    </>
  );
}

/* ---------- 11 Inter-School ROI ---------- */

export function S11() {
  const years = ["City Yr1", "Regional", "National"];
  const base = [12, 22, 40];
  const [pinned, setPinned] = useState<number | null>(null);
  const ticket = 16;
  const recovery = base.map((v) => v * (ticket / 16));
  const moic = 1 + (ticket / 16) * 2.4;
  const irr = 175 + (ticket - 16) * 1.2;
  const coc = 1.5 + (ticket - 16) * 0.04;
  return (
    <>
      <SlideHeader tag="11 · Inter-School · Investment & ROI"
        title="Lowest entry. Highest strategic return."
        sub="₹4L per city × 4 cities = ₹16L. Year-1 revenue ₹40–60L, net ₹24–44L, ROI 150–275%. The real return is the pipeline you own for the next decade."
      />
      <Grid12>
        <div className="col-span-8 flex flex-col gap-6">
          <div className="border thin-rule rounded-md">
            <div className="px-5 py-4 flex items-center justify-between border-b thin-rule">
              <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">Net by stage — heat strip</div>
              <div className="text-[12px] text-muted-foreground tabular">₹L</div>
            </div>
            <div className="px-5 pt-4"><Sparkline values={recovery} focus={pinned} /></div>
            <HeatStrip years={years} values={recovery} pinned={pinned} onPin={setPinned} />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[["Outreach","₹1L"],["Equipment","₹1L"],["Finals day","₹1.5L"],["Marketing","₹0.5L"]].map(([k,v])=>(
              <div key={k} className="border thin-rule rounded-md p-4">
                <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{k}</div>
                <div className="text-[24px] font-medium tabular mt-1">{v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-4 flex flex-col gap-5">
          <div className="border thin-rule rounded-md p-6">
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">Projected — Year 1</div>
            <div className="mt-5 space-y-5">
              <div className="flex items-end justify-between"><span className="text-[14px] text-muted-foreground">MOIC</span><Tween value={moic} format={(v) => `${v.toFixed(2)}×`} className="text-[44px] font-medium tabular" /></div>
              <div className="flex items-end justify-between border-t thin-rule pt-5"><span className="text-[14px] text-muted-foreground">IRR</span><Tween value={irr} format={(v) => `${v.toFixed(0)}%`} className="text-[44px] font-medium tabular" /></div>
              <div className="flex items-end justify-between border-t thin-rule pt-5"><span className="text-[14px] text-muted-foreground">Cash-on-cash</span><Tween value={coc} format={(v) => `${v.toFixed(2)}×`} className="text-[44px] font-medium tabular" /></div>
            </div>
          </div>
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
        title="Take pickleball to the people."
        sub="A weekend recreational tournament — doubles, all skill levels. Four cities, two events each, eight events annually. Existing courts; no infrastructure required."
        logoKey="paddle" logoLabel="Paddle City Open"
      />
      <Grid12>
        <div className="col-span-7 border thin-rule rounded-md p-6 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">Circuit — 2026</div>
            <div className="text-[12px] text-muted-foreground tabular">{active !== null ? cityNodes[active].name : "8 events · 4 cities"}</div>
          </div>
          <div className="relative flex-1 bg-[color:var(--paper)] border thin-rule rounded">
            {/* abstract India outline using svg */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <path
                d="M 35 18 L 50 12 L 62 18 L 70 30 L 78 42 L 82 55 L 80 70 L 70 82 L 58 88 L 48 82 L 38 78 L 30 65 L 24 50 L 22 35 Z"
                fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="0.4" strokeDasharray="0.8 0.8"/>
            </svg>
            {/* connecting lines */}
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
                  style={{ width: 12, height: 12 }}
                />
                <div className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-[14px] tabular ${active === i ? "text-ink" : "text-muted-foreground"}`}>
                  {c.name} · {c.events} events
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="col-span-5 flex flex-col gap-5">
          <div className="border thin-rule rounded-md overflow-hidden h-[280px]">
            <img src={images.paddle} alt="Paddle City Open" className="w-full h-full object-cover grayscale-[0.2] saturate-50" loading="lazy"/>
          </div>
          <div className="border thin-rule rounded-md p-5 grid grid-cols-2 gap-5">
            <Stat label="Format" value="Doubles" />
            <Stat label="Skill levels" value="All" />
            <Stat label="Days / event" value="Sat–Sun" />
            <Stat label="Pairs floor" value="150" sub="conservative" />
          </div>
          <div className="text-[14px] text-muted-foreground">
            Entry fees nearly cover operating costs. Sponsorship is pure upside. Bangalore and Mumbai can hit 200–250+ pairs.
          </div>
        </div>
      </Grid12>
    </>
  );
}

/* ---------- 13 Paddle City Open ROI ---------- */

export function S13() {
  const events = ["Event 1", "Event 4", "Event 8"];
  const base = [-2, 18, 40];
  const [pinned, setPinned] = useState<number | null>(null);
  const ticket = 72;
  const recovery = base.map((v) => v * (ticket / 72));
  const moic = 1 + (ticket / 72) * 0.55;
  const irr = 55 + (ticket - 72) * 0.25;
  const coc = 0.55 + (ticket - 72) * 0.005;
  return (
    <>
      <SlideHeader tag="13 · Paddle City Open · Investment & ROI"
        title="Low risk. Real returns."
        sub="₹9L per event · 8 events Year 1 = ₹72L. Per-event revenue ₹14L → ₹1.12 Cr annually. Net ~₹40L Year 1. Break-even after event 5–6."
      />
      <Grid12>
        <div className="col-span-8 flex flex-col gap-6">
          <div className="border thin-rule rounded-md">
            <div className="px-5 py-4 flex items-center justify-between border-b thin-rule">
              <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">Cumulative net by event — heat strip</div>
              <div className="text-[12px] text-muted-foreground tabular">₹L</div>
            </div>
            <div className="px-5 pt-4"><Sparkline values={recovery.map((v) => Math.max(0.1, v))} focus={pinned} /></div>
            <HeatStrip years={events} values={recovery.map((v) => Math.max(0.1, Math.abs(v)))} pinned={pinned} onPin={setPinned} />
          </div>
          <div className="grid grid-cols-5 gap-4">
            {[["Venue","₹2.25L"],["Branding","₹1.5L"],["Staff","₹1.5L"],["Prize","₹3L"],["Digital","₹0.5L"]].map(([k,v])=>(
              <div key={k} className="border thin-rule rounded-md p-4">
                <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{k}</div>
                <div className="text-[24px] font-medium tabular mt-1">{v}</div>
              </div>
            ))}
          </div>
          <div className="text-[15px] text-muted-foreground">Year 2: title sponsorship alone hits ₹8–10L/event → annual net jumps to ₹70–80L.</div>
        </div>
        <div className="col-span-4 flex flex-col gap-5">
          <div className="border thin-rule rounded-md p-6">
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">Projected — Year 1</div>
            <div className="mt-5 space-y-5">
              <div className="flex items-end justify-between"><span className="text-[14px] text-muted-foreground">MOIC</span><Tween value={moic} format={(v) => `${v.toFixed(2)}×`} className="text-[44px] font-medium tabular" /></div>
              <div className="flex items-end justify-between border-t thin-rule pt-5"><span className="text-[14px] text-muted-foreground">IRR</span><Tween value={irr} format={(v) => `${v.toFixed(1)}%`} className="text-[44px] font-medium tabular" /></div>
              <div className="flex items-end justify-between border-t thin-rule pt-5"><span className="text-[14px] text-muted-foreground">Cash-on-cash</span><Tween value={coc} format={(v) => `${v.toFixed(2)}×`} className="text-[44px] font-medium tabular" /></div>
            </div>
          </div>
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
  const years = ["Year 1", "Year 2", "Year 3"];
  const ebitda = [181, 701, 1058];
  const [pinned, setPinned] = useState<number | null>(null);
  const ticket = 15;
  const ebitdaScaled = ebitda.map((v) => v * (ticket / 15));
  const moic = 1 + (ticket / 15) * 2.7;
  const irr = 32 + (ticket - 15) * 0.4;
  const coc = 0.7 + (ticket - 15) * 0.02;
  return (
    <>
      <SlideHeader tag="15 · A for Arena · Investment & ROI"
        title="₹15 Cr in. ₹22 Cr revenue by Year 3."
        sub="EBITDA positive Month 6–8. Cash payback 30–36 months. Asset value Year 3: ₹40–55 Cr at 4–5× EBITDA. S4 actual equity out-of-pocket: ₹3.5–4.5 Cr."
      />
      <Grid12>
        <div className="col-span-8 flex flex-col gap-6">
          <div className="border thin-rule rounded-md">
            <div className="px-5 py-4 flex items-center justify-between border-b thin-rule">
              <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">EBITDA — heat strip</div>
              <div className="text-[12px] text-muted-foreground tabular">₹L</div>
            </div>
            <div className="px-5 pt-4"><Sparkline values={ebitdaScaled} focus={pinned} /></div>
            <HeatStrip years={years} values={ebitdaScaled} pinned={pinned} onPin={setPinned} />
          </div>
          <div className="border thin-rule rounded-md">
            <div className="grid grid-cols-4 text-[12px] uppercase tracking-[0.16em] text-muted-foreground py-3 border-b thin-rule px-5">
              <span></span><span className="text-right">Year 1</span><span className="text-right">Year 2</span><span className="text-right">Year 3</span>
            </div>
            {[
              ["Revenue", ["₹9.3 Cr","₹16.7 Cr","₹22.1 Cr"]],
              ["Opex", ["₹7.49 Cr","₹9.69 Cr","₹11.52 Cr"]],
              ["EBITDA", ["₹1.81 Cr","₹7.01 Cr","₹10.58 Cr"]],
              ["Margin", ["19.5%","42.0%","47.9%"]],
            ].map(([k, vs]) => (
              <div key={k as string} className="grid grid-cols-4 px-5 py-3 border-b thin-rule last:border-b-0 text-[18px]">
                <span className="text-muted-foreground">{k as string}</span>
                {(vs as string[]).map((v, i) => <span key={i} className="text-right tabular">{v}</span>)}
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-4 flex flex-col gap-5">
          <div className="border thin-rule rounded-md p-6">
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">Projected — 3-year</div>
            <div className="mt-5 space-y-5">
              <div className="flex items-end justify-between"><span className="text-[14px] text-muted-foreground">MOIC</span><Tween value={moic} format={(v) => `${v.toFixed(2)}×`} className="text-[44px] font-medium tabular" /></div>
              <div className="flex items-end justify-between border-t thin-rule pt-5"><span className="text-[14px] text-muted-foreground">IRR</span><Tween value={irr} format={(v) => `${v.toFixed(1)}%`} className="text-[44px] font-medium tabular" /></div>
              <div className="flex items-end justify-between border-t thin-rule pt-5"><span className="text-[14px] text-muted-foreground">Cash-on-cash</span><Tween value={coc} format={(v) => `${v.toFixed(2)}×`} className="text-[44px] font-medium tabular" /></div>
            </div>
            <div className="mt-5 text-[12px] text-muted-foreground border-t thin-rule pt-4">
              Funding stack: S4 equity ₹3.5–4.5 Cr · Da One sweat ₹0.5–1 Cr · Founding memberships ₹2.5–3.5 Cr · Title sponsor ₹1.2–1.8 Cr · Term loan ₹5–7 Cr.
            </div>
          </div>
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
