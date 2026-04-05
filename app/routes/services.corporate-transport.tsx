import type { MetaFunction } from "@remix-run/cloudflare";
import { motion } from "motion/react";
import { Link } from "@remix-run/react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Camera,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  HeartPulse,
  MapPinned,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  Video,
} from "lucide-react";
import { useState } from "react";
import { cn } from "~/lib/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "Corporate Transport Services | NVS Travel Solutions" },
    {
      name: "description",
      content:
        "Explore NVS corporate transport services through an interactive service and safety framework covering driver screening, passenger security, surveillance, GPS visibility, fleet compliance, and employee experience.",
    },
  ];
};

const partnerOrganizations = [
  "Infosys",
  "TCS",
  "Wipro",
  "Accenture",
  "IBM",
  "Capgemini",
  "Cognizant",
  "Tech Mahindra",
  "Mindtree",
  "HCLTech",
  "Bosch",
  "Dell",
];

const featureGroups = [
  {
    id: "driver-safety-screening",
    title: "Driver Safety & Screening",
    subtitle: "Ensuring only verified, trained, fit, and professionally monitored drivers operate corporate vehicles.",
    icon: ShieldCheck,
    color: "bg-cyan-700",
    note: "Professional drivers and strict screening processes are key safety measures in corporate car transport services.",
    items: [
      "Driver background verification and police verification",
      "Professional chauffeur training",
      "Minimum experience requirements",
      "Defensive driving training",
      "Road safety training by traffic police",
      "Driver behaviour monitoring",
      "Driver fatigue monitoring",
      "Random alcohol tests",
      "Daily breathalyzer alcohol test",
      "Driver medical fitness checks",
      "Driver ID badge and uniform",
      "Zero mobile phone policy while driving",
      "Driver performance audits",
      "Driver scorecards and safety ratings",
    ],
  },
  {
    id: "passenger-safety-security",
    title: "Passenger Safety & Security",
    subtitle: "Protecting employees through monitored pickups, late-night protocols, and escalation-ready support systems.",
    icon: UserCheck,
    color: "bg-slate-900",
    note: "Government mandates increasingly require vehicle tracking devices and panic buttons in commercial vehicles for passenger safety.",
    items: [
      "Female employee safety protocols",
      "Escort guard for late-night female employees",
      "Panic button in vehicles",
      "Emergency helpline",
      "Real-time trip monitoring",
      "Employee ID verification before boarding",
      "Secure pick-up and drop verification",
      "Late night drop confirmation",
      "SOS alerts to control room",
      "Security escort vehicle for high-risk routes",
    ],
  },
  {
    id: "surveillance-monitoring",
    title: "Surveillance & Monitoring Systems",
    subtitle: "Using visual and audio systems to monitor trips, investigate incidents, and improve accountability.",
    icon: Camera,
    color: "bg-blue-700",
    note: "Some public and corporate fleets are expanding CCTV monitoring to improve accident investigation and accountability.",
    items: [
      "CCTV cameras inside vehicles",
      "Driver-facing camera",
      "Exterior road camera",
      "AI video analytics",
      "Audio recording inside vehicle",
      "Live control room monitoring",
      "Video storage in cloud",
      "Incident recording system",
      "Route deviation alerts",
      "Trip recording and playback",
    ],
  },
  {
    id: "gps-smart-transport",
    title: "GPS Tracking & Smart Transport Technology",
    subtitle: "Giving transport teams and employees live visibility into route progress, ETAs, and exceptions.",
    icon: MapPinned,
    color: "bg-emerald-700",
    note: "Real-time monitoring tools such as GPS tracking help companies monitor routes, arrival times, and emergencies.",
    items: [
      "GPS vehicle tracking",
      "Real-time vehicle location",
      "Geo-fencing alerts",
      "Route deviation alerts",
      "Live ETA updates",
      "Driver navigation assistance",
      "Automated route optimization",
      "Traffic-aware route planning",
      "Mobile tracking apps for employees",
      "Transport dashboard for companies",
      "Smart dispatch system",
      "RFID employee boarding system",
      "QR code boarding system",
    ],
  },
  {
    id: "vehicle-safety-features",
    title: "Vehicle Safety Features",
    subtitle: "Maintaining bus and car safety systems that reduce physical risk during boarding, movement, and emergency situations.",
    icon: BriefcaseBusiness,
    color: "bg-amber-600",
    note: "Speed governors and automated doors help prevent accidents and unsafe exits from buses.",
    items: [
      "Speed governors",
      "Anti-lock braking system (ABS)",
      "Automatic door closing system",
      "Anti-skid flooring",
      "High-back seats",
      "Handrails",
      "Seat belts where available",
      "Wide emergency exits",
      "Airbags",
      "ABS brakes",
      "Reverse parking sensors",
      "Dash cameras",
    ],
  },
  {
    id: "emergency-medical",
    title: "Emergency & Medical Safety",
    subtitle: "Keeping vehicles and teams ready to respond to incidents, injuries, and urgent medical needs.",
    icon: HeartPulse,
    color: "bg-rose-700",
    note: "This layer focuses on response readiness, from first aid capability to evacuation and ambulance coordination.",
    items: [
      "First aid box",
      "First aid trained staff",
      "CPR trained drivers",
      "Emergency contact list",
      "Fire extinguisher",
      "Emergency glass breaking hammer",
      "Emergency exit windows",
      "Emergency evacuation procedures",
      "Emergency response training",
      "Ambulance coordination protocol",
    ],
  },
  {
    id: "hygiene-comfort",
    title: "Hygiene & Comfort",
    subtitle: "Improving the daily employee commute through cleaner vehicles, better cabin conditions, and rider convenience.",
    icon: Sparkles,
    color: "bg-violet-700",
    note: "Vehicles are typically cleaned and sanitized regularly to maintain hygiene for employees.",
    items: [
      "Daily vehicle cleaning",
      "Sanitization after trips",
      "Air-conditioned vehicles",
      "Comfortable seating",
      "Water bottles",
      "Charging ports",
      "Wi-Fi in premium fleets",
      "Reading lights",
      "Temperature control",
    ],
  },
  {
    id: "fleet-maintenance-compliance",
    title: "Fleet Maintenance & Compliance",
    subtitle: "Keeping the fleet road-worthy, legal, and ready through preventive maintenance and inspection discipline.",
    icon: ClipboardCheck,
    color: "bg-indigo-700",
    note: "Regular inspections and maintenance significantly reduce operational risks in transport fleets.",
    items: [
      "Regular vehicle inspection",
      "Preventive maintenance schedules",
      "Vehicle fitness certification",
      "Pollution certificates",
      "Insurance coverage",
      "Permit verification",
      "Tyre inspection programs",
      "Brake testing",
      "Spare vehicle availability",
      "Breakdown assistance",
    ],
  },
  {
    id: "transport-operations",
    title: "Transport Operations Management",
    subtitle: "Running employee transport through a structured control-room and scheduling backbone instead of ad hoc coordination.",
    icon: Users,
    color: "bg-slate-700",
    note: "This layer is what keeps shift transport dependable at scale: planning, monitoring, helpdesk, and SLA control.",
    items: [
      "24/7 transport control room",
      "Transport helpdesk",
      "Trip scheduling system",
      "Route planning software",
      "Shift-based transport planning",
      "Incident reporting system",
      "Transport SLA monitoring",
      "Vendor performance monitoring",
      "Fuel monitoring systems",
      "Digital transport logs",
    ],
  },
  {
    id: "employee-experience",
    title: "Employee Experience Features",
    subtitle: "Designing the commute around reliability, convenience, and lower daily friction for employees.",
    icon: ArrowRight,
    color: "bg-teal-700",
    note: "Providing reliable employee transport can improve productivity and reduce commute stress for workers.",
    items: [
      "Door-to-door pickup",
      "Fixed pickup points",
      "Accurate ETA notifications",
      "Missed trip alerts",
      "Trip feedback system",
      "Transport booking app",
      "Trip rescheduling",
      "Wait time alerts",
      "Multi-route coverage",
      "Shared shuttle services",
    ],
  },
];

const frameworkStats = [
  { value: "10", label: "Service Layers" },
  { value: "100+", label: "Control Points" },
  { value: "24/7", label: "Command Visibility" },
];

export default function CorporateTransportPage() {
  const organizationsLoop = [...partnerOrganizations, ...partnerOrganizations];
  const [activeFeatureId, setActiveFeatureId] = useState(featureGroups[0].id);
  const activeFeature =
    featureGroups.find((group) => group.id === activeFeatureId) ?? featureGroups[0];

  return (
    <article className="bg-slate-50 pb-24 pt-28">
      <section className="container-wide">
        <div className="overflow-hidden rounded-[3rem] bg-[linear-gradient(135deg,#062c30_0%,#0f766e_55%,#0f172a_100%)] px-8 py-10 text-white shadow-2xl lg:px-12 lg:py-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white/85 ring-1 ring-white/15">
                <BriefcaseBusiness size={14} />
                Corporate Transport Services
              </div>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight lg:text-6xl">
                Employee transport built around screening, visibility, and reliability.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
                NVS corporate transport services combine staff buses and corporate cars into one operational model covering driver verification, passenger security, GPS tracking, fleet compliance, and employee experience.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="rounded-full bg-white px-7 py-4 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
                >
                  Request a Corporate Transport Proposal
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
                  Control Room View
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
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Organizations We Support</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                Commute programs built for recurring workforce movement, not occasional bookings.
              </h2>
            </div>
          </div>
        </div>
        <div className="overflow-hidden border-y border-slate-200 bg-white py-5">
          <div className="marquee-track">
            {organizationsLoop.map((organization, index) => (
              <div
                key={`${organization}-${index}`}
                className="mx-3 inline-flex min-w-[16rem] items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-slate-700 shadow-sm"
              >
                {organization}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-wide">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Interactive Service Framework</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
              Explore the ten layers that shape the NVS corporate transport model.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Corporate commute reliability depends on more than just vehicles on the road. Select a layer below to inspect how NVS structures screening, passenger safety, live visibility, compliance, and employee-facing experience across staff buses and corporate cars.
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
              <div className="bg-[linear-gradient(135deg,#062c30_0%,#0f766e_55%,#0f172a_100%)] p-8 text-white lg:p-10">
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
                      If this is the layer your transport team wants to evaluate first, we can map it to your shift structure, pickup model, and reporting needs.
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
            If employee transport is business-critical, it should be explained with the same discipline it is operated with.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75">
            Use this page as the detailed destination for corporate transport, while the broader services page stays focused on how NVS also supports school bus and cab rental programs.
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
