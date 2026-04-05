import type { MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";
import { ArrowRight, Check, CircleDollarSign, Headset, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { cn } from "~/lib/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "Service Comparison | NVS Travel Solutions" },
    {
      name: "description",
      content:
        "Compare NVS Travel Solutions against generalized traditional operators and premium market leaders across school bus services, corporate transport, and cab rental capabilities.",
    },
  ];
};

type ComparisonSegment = {
  id: string;
  title: string;
  intro: string;
  nvsCoverage: string;
  traditionalCoverage: string;
  leaderCoverage: string;
  priceNote: string;
  supportNote: string;
  features: string[];
  traditionalYes: number[];
  leaderYes: number[];
};

const schoolFeatures = [
  "Verified drivers and police checks",
  "Breathalyzer-based driver readiness",
  "Child attendants on board",
  "Parent live tracking app",
  "RFID or student attendance logging",
  "Control-room monitoring",
  "Driver-facing and interior CCTV",
  "Geo-fencing and route deviation alerts",
  "Child check reminder system",
  "Female attendant coverage",
  "Emergency evacuation drills",
  "First-aid and CPR-trained staff",
  "Fire safety systems on board",
  "Special-needs handling readiness",
  "Defensive driving training",
  "Daily departure checklist",
  "Monthly safety audits",
  "Weather risk protocols",
  "Route risk assessment",
  "Parent feedback and incident logging",
];

const corporateFeatures = [
  "Driver police verification",
  "Professional chauffeur training",
  "Female employee night-safety protocols",
  "Trip OTP verification",
  "Panic button support",
  "24/7 control room",
  "Live GPS and ETA updates",
  "Route optimization engine",
  "Transport admin dashboard",
  "Shift-based route planning",
  "Trip recording and playback",
  "Dash cameras and driver cameras",
  "Emergency response protocol",
  "Fleet maintenance program",
  "Spare vehicle availability",
  "Digital trip logs",
  "Transport SLA monitoring",
  "Vendor performance monitoring",
  "Employee tracking app",
  "Trip feedback and rescheduling flows",
];

const cabFeatures = [
  "Driver background verification",
  "Commercial licence validation",
  "Daily alcohol checks",
  "Real-time GPS monitoring",
  "Trip history and playback",
  "SOS and emergency helpline",
  "Female passenger late-night protocol",
  "Dash cameras and incident recording",
  "Reverse camera and parking sensors",
  "Child lock and child seat options",
  "Breakdown support",
  "Preventive maintenance schedule",
  "Digital booking and confirmation",
  "Multi-payment support",
  "Digital invoices",
  "Corporate account billing",
  "Airport meet-and-greet option",
  "Luxury fleet availability",
  "EV or hybrid fleet options",
  "24/7 dispatch center",
];

const segments: ComparisonSegment[] = [
  {
    id: "school-bus",
    title: "School Bus Services",
    intro:
      "School transport buyers usually compare safety depth, visibility, child-handling readiness, and daily operating discipline. This table positions NVS against two generalized market profiles.",
    nvsCoverage: "20 / 20",
    traditionalCoverage: "6 / 20",
    leaderCoverage: "14 / 20",
    priceNote: "Premium leaders typically command a higher operating cost.",
    supportNote: "Traditional operators often remain reactive. Premium fleets can still feel ticket-driven and less hands-on.",
    features: schoolFeatures,
    traditionalYes: [0, 2, 6, 11, 14, 15],
    leaderYes: [0, 1, 2, 3, 5, 6, 7, 10, 11, 12, 14, 15, 16, 19],
  },
  {
    id: "corporate",
    title: "Corporate Transport",
    intro:
      "Corporate commute programs are usually evaluated on punctuality, monitoring, employee safety, route logic, and reporting depth. The comparison below uses generalized operator profiles rather than naming specific competitors.",
    nvsCoverage: "20 / 20",
    traditionalCoverage: "6 / 20",
    leaderCoverage: "14 / 20",
    priceNote: "Premium enterprise fleets are usually priced significantly above standard managed transport.",
    supportNote: "Traditional vendors often lack structured escalation. Enterprise leaders may offer stronger systems but slower support layers.",
    features: corporateFeatures,
    traditionalYes: [0, 5, 6, 13, 14, 19],
    leaderYes: [0, 1, 2, 4, 5, 6, 7, 8, 9, 11, 13, 15, 16, 18],
  },
  {
    id: "cab-rental",
    title: "Cab Rental Services",
    intro:
      "Cab rental comparisons usually break on fleet breadth, dispatch speed, digital convenience, safety controls, and business-account readiness. NVS is positioned here as a broader multi-fleet operator.",
    nvsCoverage: "20 / 20",
    traditionalCoverage: "6 / 20",
    leaderCoverage: "14 / 20",
    priceNote: "Premium branded operators are often materially more expensive, especially for executive and airport use cases.",
    supportNote: "Traditional providers may rely on phone-based coordination; premium leaders can still be rigid or impersonal in support.",
    features: cabFeatures,
    traditionalYes: [0, 3, 10, 11, 12, 19],
    leaderYes: [0, 1, 3, 4, 5, 7, 8, 10, 11, 12, 13, 15, 17, 19],
  },
];

function AvailabilityCell({
  available,
  highlight = false,
  label,
}: {
  available: boolean;
  highlight?: boolean;
  label?: string;
}) {
  return (
    <td className={cn("px-4 py-4 text-center", highlight ? "bg-primary/5" : "")}>
      <div
        className={cn(
          "mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full border",
          available
            ? highlight
              ? "border-primary bg-primary text-white"
              : "border-emerald-200 bg-emerald-50 text-emerald-700"
            : "border-rose-200 bg-rose-50 text-rose-600"
        )}
      >
        {available ? <Check size={18} /> : <X size={18} />}
      </div>
      {label ? <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">{label}</p> : null}
    </td>
  );
}

export default function ServicesComparisonPage() {
  const [activeSegmentId, setActiveSegmentId] = useState(segments[0].id);
  const activeSegment = segments.find((segment) => segment.id === activeSegmentId) ?? segments[0];

  return (
    <article className="bg-slate-50 pb-24 pt-28">
      <div className="container-wide">
        <header className="overflow-hidden rounded-[3rem] bg-[linear-gradient(135deg,#062c30_0%,#0f766e_55%,#0f172a_100%)] px-8 py-10 text-white shadow-2xl lg:px-12 lg:py-14">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white/80 ring-1 ring-white/15">
              <ShieldCheck size={14} />
              Comparison View
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight lg:text-6xl">
              Compare NVS against traditional operators and premium market leaders.
            </h1>
            <p className="mt-6 max-w-4xl text-lg leading-relaxed text-white/78">
              This page uses generalized market profiles, not named competitors. The intent is to show how NVS positions itself: broader than a typical traditional operator and more support-oriented than many premium, higher-cost alternatives.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-200">Traditional Operators</p>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Often adequate for basic transport needs, but usually thinner on monitoring, digital tools, and structured support.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-200">NVS</p>
              <p className="mt-2 text-sm leading-relaxed text-white/85">
                Positioned as the balanced middle: deeper controls, stronger support, and better value than high-cost premium providers.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-200">Premium Leaders</p>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Usually stronger on systems than traditional operators, but often more expensive and less relationship-led in support.
              </p>
            </div>
          </div>
        </header>

        <section className="mt-10 rounded-[2.5rem] border border-amber-200 bg-amber-50 p-6 text-sm leading-relaxed text-amber-900">
          <p className="font-bold uppercase tracking-[0.22em]">Note</p>
          <p className="mt-2">
            The competitor columns below are illustrative market profiles. They are not a verified claim about any single company, brand, or named operator.
          </p>
        </section>

        <section className="mt-12">
          <div className="mb-8 flex flex-wrap gap-3">
            {segments.map((segment) => (
              <button
                key={segment.id}
                type="button"
                onClick={() => setActiveSegmentId(segment.id)}
                className={cn(
                  "rounded-full border px-5 py-3 text-sm font-bold transition",
                  activeSegmentId === segment.id
                    ? "border-primary bg-primary text-white shadow-lg"
                    : "border-slate-200 bg-white text-slate-700 hover:border-primary hover:text-primary"
                )}
              >
                {segment.title}
              </button>
            ))}
          </div>

          <section id={activeSegment.id} className="rounded-[3rem] border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Segment Comparison</p>
                <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">{activeSegment.title}</h2>
                <p className="mt-5 text-base leading-relaxed text-slate-600">{activeSegment.intro}</p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.75rem] bg-primary/5 p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">NVS Coverage</p>
                    <p className="mt-2 text-3xl font-bold text-slate-900">{activeSegment.nvsCoverage}</p>
                  </div>
                  <div className="rounded-[1.75rem] bg-slate-50 p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">Leader Coverage</p>
                    <p className="mt-2 text-3xl font-bold text-slate-900">{activeSegment.leaderCoverage}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <CircleDollarSign size={18} className="mt-0.5 shrink-0 text-amber-600" />
                    <p className="text-sm leading-relaxed text-slate-700">{activeSegment.priceNote}</p>
                  </div>
                  <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <Headset size={18} className="mt-0.5 shrink-0 text-cyan-700" />
                    <p className="text-sm leading-relaxed text-slate-700">{activeSegment.supportNote}</p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-slate-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse text-sm">
                    <thead className="bg-slate-900 text-white">
                      <tr>
                        <th className="px-4 py-4 text-left font-bold uppercase tracking-[0.18em]">Feature</th>
                        <th className="bg-primary/30 px-4 py-4 text-center font-bold uppercase tracking-[0.18em]">NVS</th>
                        <th className="px-4 py-4 text-center font-bold uppercase tracking-[0.18em]">Traditional</th>
                        <th className="px-4 py-4 text-center font-bold uppercase tracking-[0.18em]">Leaders</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeSegment.features.map((feature, index) => (
                        <tr key={feature} className={cn(index % 2 === 0 ? "bg-white" : "bg-slate-50")}>
                          <td className="px-4 py-4 font-medium text-slate-800">{feature}</td>
                          <AvailabilityCell available highlight label="Included" />
                          <AvailabilityCell available={activeSegment.traditionalYes.includes(index)} />
                          <AvailabilityCell available={activeSegment.leaderYes.includes(index)} />
                        </tr>
                      ))}
                      <tr className="border-t border-slate-200 bg-slate-100">
                        <td className="px-4 py-4 font-bold uppercase tracking-[0.16em] text-slate-700">Coverage Level</td>
                        <td className="bg-primary/5 px-4 py-4 text-center font-bold text-slate-900">{activeSegment.nvsCoverage}</td>
                        <td className="px-4 py-4 text-center font-bold text-slate-700">{activeSegment.traditionalCoverage}</td>
                        <td className="px-4 py-4 text-center font-bold text-slate-700">{activeSegment.leaderCoverage}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </section>

        <section className="mt-14 rounded-[3rem] bg-slate-900 px-8 py-10 text-white shadow-2xl lg:px-12 lg:py-14">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-white/70">Why NVS</p>
          <h2 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight lg:text-5xl">
            The positioning is simple: more depth than a traditional operator, better value and support than a high-cost premium provider.
          </h2>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="rounded-full bg-white px-8 py-4 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
            >
              Request a Comparison Walkthrough
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-sm font-bold text-white transition hover:bg-white/10"
            >
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
