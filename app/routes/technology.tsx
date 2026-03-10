import type { MetaFunction } from "@remix-run/node";
import { motion } from "motion/react";
import {
  BellRing,
  Camera,
  CheckCircle2,
  Cpu,
  Gauge,
  GitBranch,
  LayoutDashboard,
  MapPinned,
  Monitor,
  Route,
  ShieldAlert,
  Signal,
  Smartphone,
  Users,
  Video,
  Wrench,
  Zap,
} from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Technology | NVS Smart Transport Technology Platform" },
    {
      name: "description",
      content:
        "Explore the NVS Smart Transport Technology Platform across fleet monitoring, control room operations, mobile apps, driver technology, video telematics, route optimization, analytics, and integration-ready enterprise transport systems.",
    },
  ];
};

const platformPillars = [
  {
    title: "Smart Fleet Monitoring",
    description: "Real-time GPS tracking, live fleet maps, utilization views, and predictive maintenance signals.",
    icon: Monitor,
    color: "bg-cyan-100 text-cyan-800",
  },
  {
    title: "Passenger Safety Technology",
    description: "Panic alerts, route deviation warnings, passenger verification, and monitored incident workflows.",
    icon: ShieldAlert,
    color: "bg-rose-100 text-rose-700",
  },
  {
    title: "Driver Technology",
    description: "Trip apps, speed alerts, behavior monitoring, digital trip sheets, and fatigue-linked oversight.",
    icon: Smartphone,
    color: "bg-amber-100 text-amber-700",
  },
  {
    title: "Control Room Operations",
    description: "24/7 monitoring center with live alerts, escalation support, and fleet-wide visibility.",
    icon: LayoutDashboard,
    color: "bg-slate-200 text-slate-800",
  },
  {
    title: "Mobile Apps & Notifications",
    description: "Live tracking, ETA updates, trip alerts, boarding visibility, and rider communication tools.",
    icon: BellRing,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Data & Analytics",
    description: "Trip analytics, route efficiency, fuel use, safety reports, and operational dashboards.",
    icon: Signal,
    color: "bg-violet-100 text-violet-700",
  },
];

const technologyStacks = [
  {
    title: "Vehicle Technology",
    icon: Camera,
    items: ["GPS tracking", "Dash cameras", "Panic button", "Speed sensors", "Driver behavior monitoring"],
  },
  {
    title: "Operations Technology",
    icon: LayoutDashboard,
    items: [
      "Fleet management software",
      "Route optimization engine",
      "Driver mobile app",
      "Transport admin dashboard",
      "Incident workflows",
    ],
  },
  {
    title: "Passenger Technology",
    icon: Smartphone,
    items: ["Mobile tracking app", "SMS alerts", "ETA notifications", "Trip verification", "Boarding visibility"],
  },
];

const monitoringFeatures = [
  "24/7 transport monitoring center",
  "Live fleet map",
  "Incident response team",
  "Safety alerts",
  "Route deviation alerts",
  "Real-time vehicle supervision",
];

const mobileAppFeatures = [
  "Live vehicle tracking",
  "Estimated arrival time",
  "Driver details",
  "Trip notifications",
  "SOS button",
  "Boarding alerts",
];

const driverTechnology = [
  "Driver mobile app for trip details",
  "Digital trip sheets",
  "Driver behavior monitoring",
  "Speed violation alerts",
  "Fatigue detection systems",
  "Trip workflow prompts",
];

const telematicsFeatures = [
  "AI dash cameras",
  "Driver distraction alerts",
  "Collision alerts",
  "Incident recording",
  "Video playback for investigations",
  "Real-time video context for control teams",
];

const safetyTechnology = [
  "SOS panic button",
  "Emergency alerts to control room",
  "Route deviation alerts",
  "Speed violation alerts",
  "Live incident reporting",
  "Passenger verification system",
];

const analyticsFeatures = [
  "Trip analytics",
  "Route efficiency",
  "Fuel monitoring",
  "Vehicle utilization",
  "Safety reports",
  "Service performance dashboards",
];

const optimizationFeatures = [
  "Shortest routes",
  "Traffic-aware navigation",
  "Optimized pickup sequences",
  "Cost reduction",
  "Improved punctuality",
  "Automated routing and scheduling",
];

const actionFlow = [
  "Employee books ride",
  "System assigns optimal vehicle",
  "Driver receives trip on mobile app",
  "Vehicle tracked live",
  "Passenger receives ETA",
  "Control room monitors journey",
  "Trip completed and logged",
];

const integrations = [
  "HR system integration",
  "Corporate transport portals",
  "API integration",
  "Reporting dashboards",
  "Automated billing",
];

const futureTech = [
  "Electric vehicle fleet",
  "AI safety monitoring",
  "Predictive maintenance",
  "Smart fleet analytics",
  "Green mobility initiatives",
];

function FeatureList({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-4">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" />
          <p className="text-sm font-medium leading-relaxed text-slate-700">{item}</p>
        </div>
      ))}
    </div>
  );
}

export default function Technology() {
  return (
    <article className="bg-[linear-gradient(180deg,#f4fbfa_0%,#eef7f5_38%,#f7fafc_100%)] pb-24 pt-28">
      <div className="container-wide">
        <header className="overflow-hidden rounded-[3rem] bg-[linear-gradient(135deg,#062c30_0%,#0f766e_52%,#0f172a_100%)] px-8 py-10 text-white shadow-2xl lg:px-12 lg:py-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white/85 ring-1 ring-white/15">
                <Cpu size={14} />
                NVS Smart Transport Technology Platform
              </div>
              <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight lg:text-6xl">
                A complete transport technology ecosystem for fleet visibility, safety, monitoring, and enterprise control.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/80">
                NVS technology is not just GPS tracking. It is a connected platform spanning vehicles, control-room operations, passenger communication, driver tools, smart routing, analytics, and integration-ready transport workflows.
              </p>
            </div>

            <div className="grid gap-4 rounded-[2.25rem] border border-white/10 bg-slate-950/25 p-5 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/60">Live Monitoring</p>
                  <p className="mt-2 text-2xl font-bold">24/7</p>
                  <p className="mt-1 text-sm text-white/75">Control-room coverage</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/60">Core Stack</p>
                  <p className="mt-2 text-2xl font-bold">6</p>
                  <p className="mt-1 text-sm text-white/75">Technology pillars</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900">
                <img
                  src="https://picsum.photos/seed/nvs-tech-dashboard-hero/1200/720"
                  alt="NVS transport monitoring dashboard"
                  className="aspect-[16/10] w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </header>

        <section className="py-16">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Platform Overview</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
              Six platform pillars that make the transport system feel modern, visible, and enterprise-ready.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {platformPillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${pillar.color}`}>
                  <pillar.icon size={22} />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-slate-900">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-10">
          <div className="rounded-[3rem] border border-slate-200 bg-white p-8 shadow-lg lg:p-12">
            <div className="max-w-4xl">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Technology Stack</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
                A visible stack across the vehicle, operations layer, and passenger experience.
              </h2>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {technologyStacks.map((stack) => (
                <div key={stack.title} className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                    <stack.icon size={22} />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-slate-900">{stack.title}</h3>
                  <div className="mt-5 space-y-3">
                    {stack.items.map((item) => (
                      <div key={item} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="rounded-[3rem] bg-slate-950 p-8 text-white shadow-2xl lg:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">Control Room & Monitoring Center</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight lg:text-5xl">
                A live monitoring center built to see, respond, and escalate in real time.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/75">
                Real-time monitoring systems allow transport teams to track vehicles and respond quickly to incidents. This is where fleet data becomes operational action.
              </p>
              <div className="mt-8">
                <FeatureList items={monitoringFeatures} />
              </div>
            </div>

            <div className="grid gap-4">
              <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lg">
                <img
                  src="https://picsum.photos/seed/nvs-control-room/1200/760"
                  alt="NVS control room"
                  className="aspect-[16/10] w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lg">
                  <img
                    src="https://picsum.photos/seed/nvs-tracking-screen/900/700"
                    alt="Tracking dashboard"
                    className="aspect-[4/3] w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lg">
                  <img
                    src="https://picsum.photos/seed/nvs-monitoring-screen/900/700"
                    alt="Monitoring screens"
                    className="aspect-[4/3] w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2.75rem] border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Mobile App Experience</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                Passenger and parent-facing visibility through mobile tracking and alerts.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Modern transport systems often allow passengers to track vehicles and receive alerts via mobile apps or SMS. That layer improves trust before the vehicle even arrives.
              </p>
              <div className="mt-8">
                <FeatureList items={mobileAppFeatures} />
              </div>
            </div>

            <div className="rounded-[2.75rem] border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Driver Technology</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                Trip tools that guide drivers and surface risk signals early.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Fleet systems can analyze driver behavior and vehicle data to improve safety and efficiency. That makes the driver app and telemetry layer part of the safety model, not just operations.
              </p>
              <div className="mt-8">
                <FeatureList items={driverTechnology} />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-[2.75rem] border border-slate-200 bg-white p-8 shadow-lg lg:p-10">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <Video size={22} />
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Video Telematics</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                Camera systems plus telematics data for real-time driving context.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Video telematics combines cameras and telematics data to provide real-time context about vehicle operations and safety.
              </p>
              <div className="mt-8">
                <FeatureList items={telematicsFeatures} />
              </div>
            </div>

            <div className="rounded-[2.75rem] border border-slate-200 bg-white p-8 shadow-lg lg:p-10">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-700">
                <ShieldAlert size={22} />
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Safety Technology</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                Active alerts and verification systems that keep every trip under safety watch.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                These systems help companies maintain continuous safety monitoring during transport operations.
              </p>
              <div className="mt-8">
                <FeatureList items={safetyTechnology} />
              </div>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2.75rem] bg-[linear-gradient(135deg,#062c30_0%,#0f766e_55%,#0f172a_100%)] p-8 text-white shadow-2xl lg:p-10">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                <Signal size={22} />
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-200">Smart Fleet Analytics</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight lg:text-4xl">
                Reporting that turns fleet activity into operational decisions.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/75">
                Fleet analytics systems collect vehicle and driver data for operational optimization and reporting.
              </p>
              <div className="mt-8">
                <FeatureList items={analyticsFeatures} />
              </div>
            </div>

            <div className="rounded-[2.75rem] border border-slate-200 bg-white p-8 shadow-lg lg:p-10">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <Route size={22} />
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">AI Route Optimization</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                Better routing, tighter ETAs, and lower wasted movement.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Advanced transport systems use automated routing and scheduling to optimize routes and reduce travel time.
              </p>
              <div className="mt-8">
                <FeatureList items={optimizationFeatures} />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="rounded-[3rem] border border-slate-200 bg-white p-8 shadow-lg lg:p-12">
            <div className="max-w-4xl">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Technology In Action</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
                A simple operational story that shows how the technology works end to end.
              </h2>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-7">
              {actionFlow.map((step, index) => (
                <div key={step} className="relative rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
                    Step {index + 1}
                  </p>
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-800">{step}</p>
                  {index < actionFlow.length - 1 ? (
                    <div className="mt-4 flex justify-center text-primary lg:absolute lg:-right-3 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2">
                      <GitBranch size={18} />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2.75rem] border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Integration Capabilities</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                Enterprise-friendly connections for transport teams and corporate systems.
              </h2>
              <div className="mt-8">
                <FeatureList items={integrations} />
              </div>
            </div>

            <div className="rounded-[2.75rem] border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Future Mobility At NVS</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                Forward-looking systems that position the platform beyond basic fleet tracking.
              </h2>
              <div className="mt-8">
                <FeatureList items={futureTech} />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="rounded-[3rem] bg-slate-900 px-8 py-10 text-white shadow-2xl lg:px-12 lg:py-14">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-white/70">Platform Positioning</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight lg:text-5xl">
              The page should not say “we use GPS tracking.” It should say “NVS runs a smart transport technology platform.”
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/75">
              That framing better reflects the actual scope: connected vehicles, live monitoring, mobile visibility, driver systems, analytics, integrations, and future-ready fleet intelligence.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
              {platformPillars.map((pillar) => (
                <div key={pillar.title} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold text-white/85">
                  {pillar.title}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
