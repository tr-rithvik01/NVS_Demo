import type { MetaFunction } from "@remix-run/node";
import { motion } from "motion/react";
import { Link } from "@remix-run/react";
import {
  ArrowRight,
  Bus,
  Camera,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Flame,
  HeartPulse,
  ShieldCheck,
  Users,
  Video,
} from "lucide-react";
import { useState } from "react";
import { cn } from "~/lib/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "School Bus Services | NVS Travel Solutions" },
    {
      name: "description",
      content:
        "Explore NVS school bus services through an interactive safety and operations framework covering drivers, children, vehicles, surveillance, emergency response, and compliance.",
    },
  ];
};

const partnerSchools = [
  "National Public School",
  "Delhi Public School",
  "Presidency School",
  "Ryan International School",
  "Bethany High",
  "The Brigade School",
  "Vibgyor High",
  "Bishop Cotton",
  "New Horizon Gurukul",
  "Harvest International",
  "Greenwood High",
  "Inventure Academy",
];

const featureGroups = [
  {
    id: "driver-safety",
    title: "Driver Safety & Monitoring",
    subtitle: "Ensuring the driver is fit, verified, alert, and accountable before and during every route.",
    icon: ShieldCheck,
    color: "bg-primary",
    note: "This layer reduces risk before the trip even begins by focusing on driver readiness, behaviour, and oversight.",
    items: [
      "Daily alcohol breathalyzer tests before starting duty",
      "Random drug and alcohol checks",
      "Driver background verification and police verification",
      "Minimum 5 years heavy vehicle driving experience",
      "Periodic medical fitness tests",
      "Driver fatigue monitoring systems",
      "Driver behaviour monitoring using AI or telematics",
      "Speed governors to limit bus speed",
      "Seat belt for driver",
      "Driver training on defensive driving",
      "Zero mobile phone policy while driving",
    ],
  },
  {
    id: "staff-training",
    title: "Staff Training & Child Handling",
    subtitle: "Preparing staff to supervise children, respond calmly, and maintain safe behaviour on board.",
    icon: Users,
    color: "bg-slate-900",
    note: "This layer matters because school transport is not just driving. It is child supervision, behaviour management, and emergency readiness.",
    items: [
      "Monthly traffic safety training by traffic police inspector",
      "Child psychology training for drivers and attendants",
      "Anti-bullying awareness training",
      "Child protection policy training",
      "Emergency evacuation drills",
      "First aid certification training",
      "Fire safety training by fire department",
      "Training on handling special needs children",
      "Training on gender sensitivity",
      "Training on student discipline management",
      "CPR training",
      "Trained attendants inside buses to supervise children",
    ],
  },
  {
    id: "security-surveillance",
    title: "Security & Surveillance",
    subtitle: "Using modern visibility systems so routes, vehicles, and incidents can be monitored with confidence.",
    icon: Camera,
    color: "bg-blue-600",
    note: "This layer gives schools, operators, and parents clearer visibility into where the bus is and what is happening on board.",
    items: [
      "CCTV cameras inside the bus",
      "Driver-facing camera",
      "Exterior cameras",
      "Live monitoring from control room",
      "Cloud video storage",
      "Audio recording in bus",
      "Panic button and emergency alert button",
      "GPS tracking for real-time location",
      "Geo-fencing alerts if bus leaves route",
      "Parent mobile tracking app",
      "RFID student attendance system",
      "Facial recognition student boarding system",
    ],
  },
  {
    id: "child-safety",
    title: "Child Safety Systems",
    subtitle: "Ensuring students are accounted for, supervised properly, and never left behind after trips.",
    icon: Bus,
    color: "bg-emerald-600",
    note: "This layer is focused specifically on the child experience, from boarding control to post-trip checks.",
    items: [
      "Student check system and child reminder system",
      "Seat occupancy sensors",
      "Child sleeping detection system",
      "Anti-bullying monitoring protocols",
      "Female attendant on board",
      "Safe boarding and drop protocols",
      "Student attendance log",
    ],
  },
  {
    id: "fire-emergency",
    title: "Fire & Emergency Safety",
    subtitle: "Providing immediate response tools and exit systems when critical situations happen.",
    icon: Flame,
    color: "bg-red-600",
    note: "This layer covers the equipment and planning needed when incidents escalate beyond routine control.",
    items: [
      "Multiple fire extinguishers in bus",
      "Fire alarm system",
      "Automatic fire suppression system",
      "Emergency exits clearly marked",
      "Emergency glass break hammers",
      "Emergency roof hatch",
      "Emergency evacuation plan",
      "Smoke detectors",
      "Emergency alarm system",
    ],
  },
  {
    id: "medical-safety",
    title: "Medical Safety",
    subtitle: "Equipping staff and vehicles for minor injuries, illness, and first-response medical situations.",
    icon: HeartPulse,
    color: "bg-rose-600",
    note: "This layer supports quick action on common health and injury incidents before larger medical support arrives.",
    items: [
      "First aid box with medical supplies",
      "First aid trained staff",
      "CPR trained staff",
      "Emergency medical contact list",
      "Basic medicines for minor issues",
      "Student medical information record",
    ],
  },
  {
    id: "vehicle-design",
    title: "Vehicle Safety Design",
    subtitle: "Using bus design features that physically reduce risk during daily boarding and travel.",
    icon: ClipboardCheck,
    color: "bg-violet-600",
    note: "This layer is about the bus itself: how seating, flooring, doors, and interior design reduce injury exposure.",
    items: [
      "High-back padded seats",
      "Anchored seats for crash protection",
      "Anti-skid flooring",
      "Handrails for boarding",
      "Wide bus doors",
      "Low step height for easy boarding",
      "Bag storage under seats",
      "Window safety grills",
      "Child-safe door locks",
    ],
  },
  {
    id: "road-driving",
    title: "Road & Driving Safety",
    subtitle: "Giving drivers better visibility and control to avoid collisions and reduce blind-spot risk.",
    icon: ArrowRight,
    color: "bg-amber-600",
    note: "This layer supports safer driving conditions on the road through visibility, alerts, and control systems.",
    items: [
      "Blind-spot mirrors",
      "Rear view monitoring mirrors",
      "Cross-view mirrors",
      "Stop signal arms when students board",
      "Reverse buzzer alarms",
      "Parking sensors and reverse cameras",
      "Automatic door closing systems",
      "Lane departure warnings in advanced buses",
    ],
  },
  {
    id: "compliance",
    title: "Compliance & Identification",
    subtitle: "Maintaining the visible and legal requirements that keep school transport properly regulated.",
    icon: ShieldCheck,
    color: "bg-cyan-600",
    note: "This layer covers legal compliance, visible identifiers, permits, and inspection-linked discipline.",
    items: [
      "Bus painted yellow with SCHOOL BUS signage",
      "School name and contact number on bus",
      "Vehicle fitness certificate",
      "Insurance and permits",
      "Pollution certificate",
      "Regular RTO inspections",
      "No overloading policy",
    ],
  },
  {
    id: "operational-protocols",
    title: "Operational Safety Protocols",
    subtitle: "Embedding daily, weekly, and monthly routines that keep the service professionally controlled.",
    icon: ClipboardCheck,
    color: "bg-indigo-700",
    note: "This layer ties everything together by making safety and quality part of ongoing operating routines, not just isolated tools.",
    items: [
      "Daily bus safety checklist before departure",
      "Weekly vehicle inspection",
      "Monthly safety audit",
      "Route risk assessment",
      "Parent feedback system",
      "Incident reporting system",
      "Emergency contact hotline",
      "Weather risk protocols",
    ],
  },
];

const frameworkStats = [
  { value: "10", label: "Safety Layers" },
  { value: "80+", label: "Control Points" },
  { value: "24/7", label: "Visibility Model" },
];

export default function SchoolBusServicesPage() {
  const schoolsLoop = [...partnerSchools, ...partnerSchools];
  const [activeFeatureId, setActiveFeatureId] = useState(featureGroups[0].id);
  const activeFeature =
    featureGroups.find((group) => group.id === activeFeatureId) ?? featureGroups[0];

  return (
    <article className="bg-slate-50 pb-24 pt-28">
      <section className="container-wide">
        <div className="overflow-hidden rounded-[3rem] bg-[linear-gradient(135deg,#0f172a_0%,#0a5c5c_55%,#1f2937_100%)] px-8 py-10 text-white shadow-2xl lg:px-12 lg:py-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white/85 ring-1 ring-white/15">
                <Bus size={14} />
                School Bus Services
              </div>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight lg:text-6xl">
                School transport built around safety, visibility, and discipline.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
                NVS school bus services combine driver monitoring, trained on-board staff, surveillance systems, emergency readiness, and daily operational protocols to create dependable school mobility.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="rounded-full bg-white px-7 py-4 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
                >
                  Request a School Transport Proposal
                </Link>
                <Link
                  to="/services"
                  className="rounded-full border border-white/15 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Back to Services
                </Link>
              </div>
            </div>

            <div className="grid gap-5">
              <div className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-slate-900/30 shadow-xl">
                <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4 text-sm font-bold uppercase tracking-[0.24em] text-white/70">
                  <Video size={16} />
                  Operations Overview
                </div>
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/7Ir1qlDy0c8?autoplay=1&mute=1&loop=1&playlist=7Ir1qlDy0c8&playsinline=1"
                    title="NVS operations video"
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {frameworkStats.map((stat) => (
                  <div key={stat.label} className="rounded-[1.5rem] border border-white/10 bg-white/8 px-4 py-4 text-center">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/60">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container-wide">
          <div className="mb-6 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Schools We Serve</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                Service relationships that demand consistency, not one-off trips.
              </h2>
            </div>
          </div>
        </div>
        <div className="overflow-hidden border-y border-slate-200 bg-white py-5">
          <div className="marquee-track">
            {schoolsLoop.map((school, index) => (
              <div
                key={`${school}-${index}`}
                className="mx-3 inline-flex min-w-[18rem] items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-slate-700 shadow-sm"
              >
                {school}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-wide">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Interactive Safety Framework</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
              Explore the ten layers that shape the NVS school bus service model.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Instead of treating safety as a single checklist, we organize the school transport system into interactive layers. Select any layer below to inspect what it covers and how it contributes to a safer daily operation.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-3">
              {featureGroups.map((group, index) => (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setActiveFeatureId(group.id)}
                  className={cn(
                    "w-full rounded-[1.75rem] border p-5 text-left transition-all",
                    activeFeatureId === group.id
                      ? "border-primary bg-primary/5 shadow-lg"
                      : "border-slate-200 bg-white hover:border-primary/30 hover:bg-white"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-md", group.color)}>
                      <group.icon size={22} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <ChevronRight
                          size={18}
                          className={cn(
                            "shrink-0 transition-transform",
                            activeFeatureId === group.id ? "translate-x-1 text-primary" : "text-slate-300"
                          )}
                        />
                      </div>
                      <h3 className="mt-2 text-xl font-bold text-slate-900">{group.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{group.subtitle}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <motion.div
              key={activeFeature.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24 }}
              className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-lg"
            >
              <div className="bg-[linear-gradient(135deg,#0f172a_0%,#0a5c5c_55%,#1f2937_100%)] p-8 text-white lg:p-10">
                <div className="flex items-start gap-5">
                  <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg", activeFeature.color)}>
                    <activeFeature.icon size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/60">
                      Active Layer
                    </p>
                    <h3 className="mt-2 text-3xl font-bold tracking-tight">{activeFeature.title}</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75">
                      {activeFeature.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-8 p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-10">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Included Controls</p>
                  <div className="mt-5 grid gap-3">
                    {activeFeature.items.map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-4">
                        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" />
                        <p className="text-sm font-medium leading-relaxed text-slate-700">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Why This Layer Matters</p>
                    <p className="mt-4 text-sm leading-relaxed text-slate-700">{activeFeature.note}</p>
                  </div>

                  <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Coverage Snapshot</p>
                    <p className="mt-3 text-3xl font-bold text-slate-900">{activeFeature.items.length}</p>
                    <p className="mt-1 text-sm font-medium text-slate-500">specific controls in this layer</p>
                  </div>

                  <div className="rounded-[2rem] border border-primary/10 bg-primary/5 p-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Next Step</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-700">
                      If this is the layer your school cares about most, we can walk you through how it is implemented in live operations.
                    </p>
                    <Link
                      to="/contact"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:gap-3"
                    >
                      Talk to NVS <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="container-wide py-10">
        <div className="rounded-[3rem] bg-slate-900 px-8 py-10 text-white shadow-2xl lg:px-12 lg:py-14">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-white/70">Decision Point</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight lg:text-5xl">
            If school transport is a trust-sensitive service, it should be explained with the same level of detail it is operated with.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75">
            Use this page as the detailed school mobility destination, and keep the broader services page focused on how NVS also supports corporate transport and cab rental programs.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="rounded-full bg-white px-8 py-4 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
            >
              Talk to NVS
            </Link>
            <Link
              to="/services"
              className="rounded-full border border-white/15 px-8 py-4 text-sm font-bold text-white transition hover:bg-white/10"
            >
              View All Domains
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
