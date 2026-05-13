import slideTnppl from "@/assets/slide-tnppl.jpg";
import slideCpl from "@/assets/slide-cpl.jpg";
import slideCppl from "@/assets/slide-cppl.jpg";
import slideSchool from "@/assets/slide-school.jpg";
import slidePaddle from "@/assets/slide-paddle.jpg";
import slideArena from "@/assets/slide-arena.jpg";
import tnpplLogo from "@/assets/tnppl-logo.svg";

export const images = {
  tnppl: slideTnppl,
  cpl: slideCpl,
  cppl: slideCppl,
  school: slideSchool,
  paddle: slidePaddle,
  arena: slideArena,
};

export const logos: Record<string, string | undefined> = {
  tnppl: tnpplLogo,
  cpl: undefined,
  cppl: undefined,
  school: undefined,
  paddle: undefined,
  arena: undefined,
};

export type SlideMeta = {
  number: string;
  title: string;
  notes: string;
};

export const slideMeta: SlideMeta[] = [
  { number: "01", title: "Cover", notes: "Open with the framing: this is not one investment — it's six plays designed to compound. Director Atlee is uniquely positioned. Spend 60 seconds here." },
  { number: "02", title: "The Big Picture", notes: "Anchor on the Bengaluru Jawans win as proof. Three reasons why now: 1990-cricket moment, 65× MLP precedent, Atlee's irreplaceable network." },
  { number: "03", title: "Portfolio Overview", notes: "Frame opportunities 01–05 as immediate plays. 06 (A for Arena) is the long-term anchor that amplifies the rest. Let the numbers breathe." },
  { number: "04", title: "TNPPL — Opportunity", notes: "Lead with governance — IPA, SDAT, Ministry. The S2 upgrade is 4× prize pool, JN Indoor Stadium, 9-channel campaign. 50L+ projected reach." },
  { number: "05", title: "TNPPL — Investment & ROI", notes: "₹31L total, 3-year tenure, 20% preferential renewal. Heat-strip shows season-by-season recovery. Pin Year 3 to show compounding." },
  { number: "06", title: "CPL — Opportunity", notes: "Founding owner positioning. 6 slots nationwide, ATP credibility, your Rolodex is the multiplier. Once gone, founding price is gone." },
  { number: "07", title: "CPL — Investment & ROI", notes: "₹30L. Benchmarks: CCL ₹50 Cr/season, MLP 65× in 4 years. Pull the ticket-size stepper to show MOIC scaling." },
  { number: "08", title: "CPPL — Opportunity", notes: "Recurring annual sports IP. 4 cities. Asset-light. Sponsorship-driven. Demonstrate the city allocation donut interactively." },
  { number: "09", title: "CPPL — Investment & ROI", notes: "Per-city economics: ₹70–80L revenue, ₹38.5L cost. Net ₹1.26–1.66 Cr at 4 cities. 80–108% ROI." },
  { number: "10", title: "Intercollege Pickleball Tournament — Opportunity", notes: "Chennai + Bangalore · 2-day event · 4 courts · in association with TNPA. Free for colleges, fully funded by sponsorship + CSR." },
  { number: "11", title: "Intercollege Pickleball Tournament — Investment & ROI", notes: "₹11L per city outlay vs ₹20L sponsorship revenue · ₹9L net per city · ~82% ROI. Medals & trophies — no cash prize." },
  { number: "12", title: "Paddle City Open — Opportunity", notes: "8 events / year, 4 cities, no owned courts. Entry fees nearly cover ops — sponsorship is upside." },
  { number: "13", title: "Paddle City Open — Investment & ROI", notes: "₹72L cost, ₹1.12 Cr revenue, ~55% ROI Year 1. Year 2 jumps to ₹70–80L net as title sponsorship matures." },
  { number: "14", title: "A for Arena — Opportunity", notes: "The home of S For Sport. 53,000 sq ft, ECR Chennai. 13 revenue streams. S For Sport owns venue + revenue, Da One owns coaching." },
  { number: "15", title: "A for Arena — Investment & ROI", notes: "₹14–16 Cr capex, S For Sport actual equity ₹3.5–4.5 Cr. ₹10.58 Cr EBITDA by Y3. Asset value ₹40–55 Cr at 4–5× multiple." },
  { number: "16", title: "Next Steps", notes: "Three concrete asks this week: TNPPL slot, CPL founding position, ECR site shortlisting." },
];
