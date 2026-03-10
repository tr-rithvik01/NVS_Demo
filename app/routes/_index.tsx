import type { MetaFunction } from "@remix-run/node";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "@remix-run/react";
import { HomeChatPrototype } from "~/components/HomeChatPrototype";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Bus,
  CarFront,
  Clock3,
  MapPinned,
  Phone,
  Play,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { cn } from "~/lib/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "NVS Travel Solutions | School Bus, Corporate Transport, and Cab Rentals" },
    {
      name: "description",
      content:
        "NVS Travel Solutions delivers school bus services, corporate transport services, and cab rental services with safety-first operations and live visibility.",
    },
  ];
};

const pillarCards = [
  {
    id: "school",
    title: "School Bus Services",
    description:
      "Structured school mobility with route planning, child safety systems, live monitoring, trained attendants, and parent visibility.",
    icon: Bus,
    href: "/services/school-bus-services",
    color: "bg-primary",
    cta: "Explore School Services",
  },
  {
    id: "corporate",
    title: "Corporate Transport Services",
    description:
      "Reliable employee commute programs with roster-based route design, punctual pickups, supervisor dashboards, and operational reporting.",
    icon: BriefcaseBusiness,
    href: "/services/corporate-transport",
    color: "bg-slate-900",
    cta: "See Corporate Transport",
  },
  {
    id: "cab",
    title: "Cab Rental Services",
    description:
      "Flexible city and outstation cab rentals for executives, teams, airport transfers, events, and on-demand business travel requirements.",
    icon: CarFront,
    href: "/services/cab-rental-services",
    color: "bg-amber-600",
    cta: "View Cab Rentals",
  },
];

const heroForms = {
  school: {
    eyebrow: "School Bus Services",
    title: "Request a school transport quote",
    description: "Share the institution and student count. We will scope routes, safety requirements, and operating coverage.",
    fields: [
      { label: "Name", placeholder: "Your name", type: "text" },
      { label: "Phone Number", placeholder: "+91 98765 43210", type: "tel" },
      { label: "Email", placeholder: "name@school.edu", type: "email" },
      { label: "City", placeholder: "Bengaluru", type: "text" },
      { label: "Area in the City", placeholder: "Indiranagar", type: "text" },
      { label: "School Name", placeholder: "School name", type: "text" },
      { label: "Number of Students", placeholder: "850", type: "number" },
    ],
  },
  corporate: {
    eyebrow: "Corporate Transport Services",
    title: "Request a corporate commute quote",
    description: "Tell us where your teams travel from, what shift coverage you need, and how many employees require movement.",
    fields: [
      { label: "Name", placeholder: "Your name", type: "text" },
      { label: "Phone Number", placeholder: "+91 98765 43210", type: "tel" },
      { label: "Email", placeholder: "name@company.com", type: "email" },
      { label: "City", placeholder: "Bengaluru", type: "text" },
      { label: "Area in the City", placeholder: "Indiranagar", type: "text" },
      { label: "Company Name", placeholder: "Company name", type: "text" },
      { label: "Number of Employees", placeholder: "420", type: "number" },
    ],
  },
  cab: {
    eyebrow: "Rent-a-Cab Services",
    title: "Request a cab service quote",
    description: "Share the trip details and passenger count. We will revert with availability and pricing.",
    fields: [
      { label: "Name", placeholder: "Your name", type: "text" },
      { label: "Phone Number", placeholder: "+91 98765 43210", type: "tel" },
      { label: "Email", placeholder: "name@example.com", type: "email" },
      { label: "From Location", placeholder: "Indiranagar", type: "text" },
      { label: "To Location", placeholder: "Kempegowda Airport", type: "text" },
      { label: "Travel Date", placeholder: "", type: "date" },
      { label: "Pick Up Time", placeholder: "", type: "time" },
      { label: "Number of Passengers", placeholder: "4", type: "number" },
    ],
    checkbox: "Round Trip",
  },
} as const;

const proofPoints = [
  { label: "Managed Fleet", value: "250+", icon: Bus },
  { label: "Daily Riders", value: "10,000+", icon: Users },
  { label: "Control Visibility", value: "24/7", icon: MapPinned },
  { label: "Service Discipline", value: "SOP-led", icon: ShieldCheck },
];

const partnerBrands = [
  { name: "National Public School", mark: "NPS", tone: "bg-emerald-100 text-emerald-700" },
  { name: "Delhi Public School", mark: "DPS", tone: "bg-sky-100 text-sky-700" },
  { name: "Vibgyor High", mark: "VH", tone: "bg-amber-100 text-amber-700" },
  { name: "Presidency School", mark: "PS", tone: "bg-rose-100 text-rose-700" },
  { name: "Ryan International", mark: "RI", tone: "bg-violet-100 text-violet-700" },
  { name: "Greenwood High", mark: "GH", tone: "bg-lime-100 text-lime-700" },
  { name: "Inventure Academy", mark: "IA", tone: "bg-cyan-100 text-cyan-700" },
  { name: "The Brigade School", mark: "BS", tone: "bg-orange-100 text-orange-700" },
  { name: "Bethany High", mark: "BH", tone: "bg-fuchsia-100 text-fuchsia-700" },
  { name: "Infosys", mark: "INF", tone: "bg-blue-100 text-blue-700" },
  { name: "Wipro", mark: "WIP", tone: "bg-purple-100 text-purple-700" },
  { name: "Accenture", mark: "ACC", tone: "bg-indigo-100 text-indigo-700" },
  { name: "Tech Mahindra", mark: "TM", tone: "bg-red-100 text-red-700" },
  { name: "TCS", mark: "TCS", tone: "bg-teal-100 text-teal-700" },
];

const operatingHighlights = [
  "Central command visibility across school, corporate, and rental operations",
  "Driver verification, training, and monitored trip discipline",
  "GPS-led route operations with escalation and parent/client reporting",
  "Flexible fleet planning for fixed routes, shifts, and on-demand bookings",
];

const eventCountdown = [
  { value: "24", label: "Days" },
  { value: "08", label: "Hours" },
  { value: "42", label: "Mins" },
];

const serviceFeatureFolds = [
  {
    title: "School Bus Services built around child safety and route discipline",
    description:
      "From route planning and driver verification to live surveillance and parent visibility, the school mobility layer is designed to reduce uncertainty and increase trust every day.",
    points: [
      "GPS tracking, CCTV, and control-room visibility",
      "Attendants, student check systems, and safety-led boarding routines",
      "Daily bus readiness checks and operating SOPs",
    ],
    primaryCta: "Explore school mobility",
    secondaryCta: "Watch school operations",
    visualTitle: "School Safety Stack",
    visualAccent: "bg-cyan-100 text-cyan-900",
    visualPanels: ["Route control", "Student visibility", "On-board safety"],
  },
  {
    title: "Corporate transport designed for reliable employee movement",
    description:
      "Shift coverage, punctual arrival performance, route logic, and escalation support are built into a corporate commute program that needs to work at scale without creating daily friction.",
    points: [
      "Roster-aligned route design and shift timing support",
      "Supervisor visibility with incident escalation workflows",
      "Structured fleet allocation for recurring employee demand",
    ],
    primaryCta: "See corporate transport",
    secondaryCta: "View employee commute model",
    visualTitle: "Corporate Commute Control",
    visualAccent: "bg-emerald-100 text-emerald-900",
    visualPanels: ["Shift coverage", "Fleet allocation", "Live reporting"],
  },
  {
    title: "Cab rental services that stay flexible without losing control",
    description:
      "Airport runs, executive movement, city transfers, event travel, and outstation bookings all require fast dispatch support with clear trip ownership and dependable driver coordination.",
    points: [
      "On-demand booking for local, airport, and outstation use",
      "Passenger count, trip timing, and round-trip flexibility",
      "Reliable dispatch communication from request to drop-off",
    ],
    primaryCta: "View cab rentals",
    secondaryCta: "See trip planning",
    visualTitle: "Rental Trip Desk",
    visualAccent: "bg-sky-100 text-sky-900",
    visualPanels: ["Pickup timing", "Trip flexibility", "Dispatch support"],
  },
];

const homepageBlogCards = [
  {
    title: "Safety Measures for Student Transportation",
    slug: "safety-measures-student-transportation",
    category: "School Safety",
  },
  {
    title: "Technology vs Student Safety",
    slug: "technology-vs-student-safety",
    category: "Technology",
  },
  {
    title: "Benefits of Outsourced School Bus Service",
    slug: "benefits-outsourced-school-bus-service",
    category: "Operations",
  },
];

const testimonials = [
  {
    quote:
      "NVS helped us bring much more discipline to student transport. Parent visibility improved, route coordination got tighter, and the operating team became easier to work with at scale.",
    name: "Transport Administrator",
    organization: "Leading Bengaluru School",
    category: "School Bus Services",
  },
  {
    quote:
      "Our employee commute program needed punctuality, reporting, and escalation support. NVS gave us a more reliable structure instead of daily follow-up across shifts.",
    name: "Facilities Lead",
    organization: "Global Technology Company",
    category: "Corporate Transport",
  },
  {
    quote:
      "For airport transfers, city movement, and executive travel, the fleet flexibility made a real difference. The response time and vehicle availability have been consistently strong.",
    name: "Admin & Travel Team",
    organization: "Enterprise Client",
    category: "Cab Rental Services",
  },
];


export default function Index() {
  const [activeService, setActiveService] = useState<keyof typeof heroForms>("school");
  const [isBlogCarouselHovered, setIsBlogCarouselHovered] = useState(false);
  const [isBlogDragging, setIsBlogDragging] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const activeForm = heroForms[activeService];
  const blogCarouselRef = useRef<HTMLDivElement | null>(null);
  const blogDragStateRef = useRef({
    isPointerDown: false,
    startX: 0,
    startScrollLeft: 0,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const container = blogCarouselRef.current;
    if (!container) return;

    const thirdWidth = container.scrollWidth / 3;
    container.scrollLeft = thirdWidth;

    let frameId = 0;

    const tick = () => {
      if (!isBlogCarouselHovered) {
        container.scrollLeft += 0.6;

        if (container.scrollLeft >= thirdWidth * 2) {
          container.scrollLeft = thirdWidth;
        } else if (container.scrollLeft <= 0) {
          container.scrollLeft = thirdWidth;
        }
      }

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [isBlogCarouselHovered]);

  const moveBlogCarousel = (direction: "left" | "right") => {
    const container = blogCarouselRef.current;
    if (!container) return;

    const thirdWidth = container.scrollWidth / 3;
    const offset = direction === "left" ? -340 : 340;
    container.scrollBy({ left: offset, behavior: "smooth" });

    window.setTimeout(() => {
      if (container.scrollLeft >= thirdWidth * 2) {
        container.scrollLeft = thirdWidth;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft = thirdWidth;
      }
    }, 350);
  };

  const handleBlogPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const container = blogCarouselRef.current;
    if (!container) return;

    blogDragStateRef.current = {
      isPointerDown: true,
      startX: event.clientX,
      startScrollLeft: container.scrollLeft,
    };

    setIsBlogDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleBlogPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const container = blogCarouselRef.current;
    const dragState = blogDragStateRef.current;
    if (!container || !dragState.isPointerDown) return;

    const deltaX = event.clientX - dragState.startX;
    container.scrollLeft = dragState.startScrollLeft - deltaX;
  };

  const handleBlogPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    blogDragStateRef.current.isPointerDown = false;
    setIsBlogDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <article className="relative overflow-hidden bg-[linear-gradient(135deg,#f7faf9_0%,#eef7f5_50%,#fffaf0_100%)] pt-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,102,102,0.15),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(217,119,6,0.12),transparent_32%)]" />
      <header className="relative pb-10 pt-10 lg:pt-18">
        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[0.98fr_1.02fr] lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-primary shadow-sm ring-1 ring-primary/10">
                <BadgeCheck size={14} />
                Three Mobility Verticals. One Operating Standard.
              </div>
              <h1 className="max-w-3xl text-3xl font-bold leading-[1.02] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Transport for <span className="text-primary">schools</span>, <span className="text-slate-700">companies</span>, and <span className="text-amber-600">cab rentals</span>.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                NVS Travel Solutions operates three core service domains: school bus services, corporate transport services, and cab rental services. Each runs on the same discipline of verified drivers, live trip visibility, and operational control.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/services/school-bus-services"
                  className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-xl transition hover:bg-primary-dark"
                >
                  Explore School Bus Services
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-50"
                >
                  View All Services <ArrowRight size={18} />
                </Link>
              </div>
              <div className="mt-5 max-w-md overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/75 shadow-lg backdrop-blur">
                <div className="flex items-center justify-between border-b border-slate-200/80 px-4 py-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">Quick Look</p>
                    <p className="mt-1 text-xs font-medium text-slate-500">A short overview of NVS operations</p>
                  </div>
                </div>
                <button type="button" className="group relative block aspect-video w-full overflow-hidden">
                  <img
                    src="https://picsum.photos/seed/nvs-home-video/960/640"
                    alt="NVS operations video thumbnail"
                    className="h-full w-full scale-105 object-cover blur-[2px] transition duration-300 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-900/30 transition group-hover:bg-slate-900/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-primary shadow-xl transition group-hover:scale-105">
                      <Play size={20} className="ml-0.5" />
                    </span>
                  </div>
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75 }}
              className="rounded-[1.75rem] border border-white/70 bg-white/85 p-3 shadow-xl backdrop-blur sm:p-4"
            >
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {pillarCards.map((pillar) => (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => setActiveService(pillar.id as keyof typeof heroForms)}
                    className={cn(
                      "rounded-[1.25rem] border p-3 text-left transition",
                      activeService === pillar.id
                        ? "border-primary bg-primary/8 shadow-sm"
                        : "border-slate-200 bg-white hover:border-primary/40 hover:bg-slate-50"
                    )}
                  >
                    <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-md", pillar.color)}>
                      <pillar.icon size={18} />
                    </div>
                    <h2 className="mt-3 text-xs font-bold text-slate-900 sm:text-sm">{pillar.title}</h2>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-500">{pillar.cta}</p>
                  </button>
                ))}
              </div>

              <div className="mt-3 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-4 sm:p-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.24 }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">{activeForm.eyebrow}</p>
                    <h3 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">{activeForm.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">{activeForm.description}</p>

                    <form className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {activeForm.fields.map((field) => (
                        <label key={field.label} className="block">
                          <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                            {field.label}
                          </span>
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-primary focus:bg-white"
                          />
                        </label>
                      ))}
                      {"checkbox" in activeForm && activeForm.checkbox ? (
                        <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 sm:col-span-2">
                          <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
                          {activeForm.checkbox}
                        </label>
                      ) : null}
                      <div className="flex flex-wrap gap-3 pt-1 sm:col-span-2">
                        <button
                          type="submit"
                          className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary-dark"
                        >
                          Get A Quote
                        </button>
                        <a
                          href="tel:+918042287279"
                          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-900 transition hover:border-primary hover:text-primary"
                        >
                          <Phone size={16} />
                          Call now
                        </a>
                      </div>
                    </form>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          <div className="mt-8">
            <div className="flex flex-col gap-2 px-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Trusted By</p>
              <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                Brands and institutions we have worked with
              </h2>
            </div>
            <div className="relative left-1/2 mt-4 w-screen -translate-x-1/2 overflow-hidden border-y border-white/50 bg-white/35 py-4 shadow-sm backdrop-blur-sm">
              <div className="marquee-track">
                {[...partnerBrands, ...partnerBrands].map((brand, index) => (
                  <div
                    key={`${brand.name}-${index}`}
                    className="mx-3 inline-flex min-w-[15rem] items-center gap-3 rounded-2xl border border-white/80 bg-white/80 px-4 py-3 text-slate-700 shadow-sm"
                  >
                    <span
                      className={cn(
                        "inline-flex h-11 min-w-11 items-center justify-center rounded-xl px-2 text-[11px] font-black uppercase tracking-[0.18em]",
                        brand.tone
                      )}
                    >
                      {brand.mark}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-700">
                      {brand.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>
      {isMounted ? (
        <HomeChatPrototype />
      ) : (
        <section className="relative pb-12">
          <div className="container-wide">
            <div className="overflow-hidden rounded-[3rem] border border-white/70 bg-white/80 shadow-2xl backdrop-blur">
              <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
                <div className="border-b border-slate-200/80 p-8 lg:border-b-0 lg:border-r lg:p-10">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
                    AI Support Prototype
                  </div>
                  <h2 className="mt-5 max-w-xl text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                    NVS assistant is loading.
                  </h2>
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                    The chat experience will appear once the page finishes loading in your browser.
                  </p>
                </div>
                <div className="bg-[linear-gradient(180deg,#f8fbfb_0%,#f3f8f7_100%)] p-6 sm:p-8 lg:p-10">
                  <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-lg">
                    Loading chatbot...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <section className="relative py-24">
        <div className="container-wide">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {proofPoints.map((point, index) => (
              <motion.div
                key={point.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <point.icon size={22} />
                </div>
                <p className="text-3xl font-bold text-slate-900">{point.value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">{point.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative pb-8">
        <div className="container-wide">
          <div className="overflow-hidden rounded-[2.5rem] bg-[linear-gradient(135deg,#143b28_0%,#234a34_48%,#0b120d_100%)] text-white shadow-2xl">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <div className="flex flex-col justify-between p-8 sm:p-10 lg:p-12">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-lime-300">Upcoming Event</p>
                  <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                    NVS Mobility Forum 2026
                  </h2>
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                    A focused gathering for school leaders, transport managers, and corporate mobility teams to discuss safer fleet operations, visibility systems, and service design for growing commuter networks.
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-6 lg:mt-10">
                  <div className="flex flex-wrap items-center gap-5">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-lime-300">Join Us In Person</p>
                      <p className="mt-2 text-xl font-bold">May 18-20, 2026</p>
                      <p className="text-sm font-medium text-white/75">Bengaluru, India</p>
                    </div>
                    <a
                      href="/contact"
                      className="inline-flex rounded-full bg-lime-300 px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-lime-200"
                    >
                      Register now
                    </a>
                  </div>

                  <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-2xl font-bold tracking-tight sm:text-3xl">Save your seat</p>
                    <div className="flex flex-wrap gap-3">
                      {eventCountdown.map((item) => (
                        <div
                          key={item.label}
                          className="min-w-[5.5rem] rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-center backdrop-blur-sm"
                        >
                          <p className="text-2xl font-bold">{item.value}</p>
                          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">
                            {item.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative min-h-[24rem] overflow-hidden border-t border-white/10 lg:border-l lg:border-t-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(163,230,53,0.35),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(0,0,0,0.55))]" />
                <img
                  src="https://picsum.photos/seed/nvs-event-speaker/900/1100"
                  alt="Event speaker placeholder"
                  className="absolute inset-0 h-full w-full object-cover mix-blend-luminosity opacity-85"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
                  <p className="text-4xl font-bold tracking-tight">Keynote Guest</p>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80 sm:text-base">
                    Space reserved for speaker photography, event branding, or a highlight visual tied to the forum announcement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="mx-auto max-w-[92rem] px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-primary">Feature Overview</p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-5xl">
              Three business lines, each with a distinct service design.
            </h2>
          </div>

          <div className="space-y-10">
            {serviceFeatureFolds.map((fold, index) => (
              <section
                key={fold.title}
                className="overflow-hidden rounded-[2.5rem] bg-[linear-gradient(135deg,#0d4f56_0%,#0a3e46_55%,#072d33_100%)] text-white shadow-2xl"
              >
                <div
                  className={cn(
                    "grid items-center gap-12 p-8 sm:p-10 lg:gap-20 lg:p-14 xl:gap-24 xl:p-16",
                    index % 2 === 0 ? "lg:grid-cols-[0.95fr_1.05fr]" : "lg:grid-cols-[1.05fr_0.95fr]"
                  )}
                >
                  <div className={cn(index % 2 === 1 ? "lg:order-2" : "")}>
                    <div className="relative min-h-[28rem] overflow-hidden rounded-[2.25rem] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.22)] backdrop-blur-sm">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.18),transparent_30%)]" />
                      <div className="relative h-full">
                        <div className="absolute left-0 top-0 h-24 w-24 rounded-full bg-cyan-300/20 blur-2xl" />
                        <div className="absolute bottom-10 right-8 h-28 w-28 rounded-full bg-white/10 blur-3xl" />

                        <div className="relative mx-auto aspect-[5/4] max-w-[31rem] overflow-hidden rounded-[2rem] border border-white/15 bg-slate-950/35 shadow-2xl">
                          <img
                            src={`https://picsum.photos/seed/service-fold-${index + 1}/960/720`}
                            alt={fold.visualTitle}
                            className="h-full w-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,45,51,0.02),rgba(7,45,51,0.55))]" />
                        </div>

                        <div className={cn("absolute left-6 top-6 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] shadow-xl", fold.visualAccent)}>
                          {fold.visualTitle}
                        </div>

                        <div className="absolute -left-1 bottom-16 max-w-[14rem] rounded-[1.5rem] border border-white/15 bg-white/90 p-4 text-slate-900 shadow-2xl">
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-700">Live Layer</p>
                          <p className="mt-2 text-sm font-semibold leading-relaxed">
                            {fold.visualPanels[0]} remains visible to operators throughout the trip lifecycle.
                          </p>
                        </div>

                        <div className="absolute -right-1 top-20 w-[15rem] rounded-[1.5rem] border border-white/15 bg-slate-950/75 p-4 text-white shadow-2xl backdrop-blur">
                          <div className="flex items-center justify-between">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200">Service Signals</p>
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                          </div>
                          <div className="mt-4 space-y-3">
                            {fold.visualPanels.slice(0, 2).map((panel) => (
                              <div key={panel} className="rounded-xl bg-white/8 px-3 py-3 text-sm font-medium">
                                {panel}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="absolute bottom-0 left-10 right-10 grid gap-3 sm:grid-cols-3">
                          {fold.visualPanels.map((panel, panelIndex) => (
                            <div
                              key={panel}
                              className={cn(
                                "rounded-2xl border px-4 py-4 text-sm font-medium shadow-xl backdrop-blur",
                                panelIndex === 1
                                  ? "border-cyan-200/35 bg-cyan-200/10 text-white"
                                  : "border-white/15 bg-slate-950/70 text-white"
                              )}
                            >
                              {panel}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={cn(index % 2 === 1 ? "lg:order-1" : "")}>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-200">
                      {index === 0 ? "School Bus Services" : index === 1 ? "Corporate Transport" : "Cab Rental Services"}
                    </p>
                    <h3 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                      {fold.title}
                    </h3>
                    <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                      {fold.description}
                    </p>

                    <div className="mt-6 space-y-3">
                      {fold.points.map((point) => (
                        <div key={point} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                          <span className="mt-2 h-2.5 w-2.5 rounded-full bg-cyan-200" />
                          <p className="text-sm leading-relaxed text-white/85">{point}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4">
                      <a
                        href="/services"
                        className="rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
                      >
                        {fold.primaryCta}
                      </a>
                      <a
                        href="/contact"
                        className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                      >
                        {fold.secondaryCta}
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16">
        <div className="container-wide">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-primary">Insights</p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                Explore the latest blog stories from NVS
              </h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:gap-3"
            >
              View all blogs <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div
          className="group relative left-1/2 w-screen -translate-x-1/2 py-4"
          onMouseEnter={() => setIsBlogCarouselHovered(true)}
          onMouseLeave={() => setIsBlogCarouselHovered(false)}
        >
          <div
            ref={blogCarouselRef}
            className={cn(
              "overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-6 lg:px-8",
              isBlogDragging ? "cursor-grabbing select-none" : "cursor-grab"
            )}
            style={{ touchAction: "pan-y" }}
            onPointerDown={handleBlogPointerDown}
            onPointerMove={handleBlogPointerMove}
            onPointerUp={handleBlogPointerUp}
            onPointerCancel={handleBlogPointerUp}
            onPointerLeave={(event) => {
              if (blogDragStateRef.current.isPointerDown) {
                handleBlogPointerUp(event);
              }
            }}
          >
            <div className="flex w-max py-2">
              {[...homepageBlogCards, ...homepageBlogCards, ...homepageBlogCards].map((post, index) => (
              <Link
                key={`${post.slug}-${index}`}
                to={`/blog/${post.slug}`}
                className="mx-4 block w-[20rem] flex-shrink-0 overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={`https://picsum.photos/seed/${post.slug}-home-card/800/520`}
                    alt={post.title}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                    {post.category}
                  </p>
                  <h3 className="mt-3 text-lg font-bold leading-tight text-slate-900">
                    {post.title}
                  </h3>
                  <p className="mt-4 text-sm font-bold text-primary">Read article</p>
                </div>
              </Link>
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#f7faf9] via-[#f7faf9]/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#fffaf0] via-[#fffaf0]/80 to-transparent" />
          <div
            className={cn(
              "absolute inset-y-0 left-0 right-0 flex items-center justify-between px-6 opacity-0 transition duration-200",
              isBlogCarouselHovered ? "opacity-100" : "opacity-0"
            )}
          >
            <button
              type="button"
              onClick={() => moveBlogCarousel("left")}
              className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/90 text-slate-900 shadow-lg backdrop-blur transition hover:border-primary hover:text-primary"
              aria-label="Scroll blogs left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => moveBlogCarousel("right")}
              className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/90 text-slate-900 shadow-lg backdrop-blur transition hover:border-primary hover:text-primary"
              aria-label="Scroll blogs right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="container-wide">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-primary">Testimonials</p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                What clients say after the service starts operating.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-600">
              The real test is not the proposal. It is how the service performs once routes, riders, and daily coordination begin.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[2.25rem] border border-white/70 bg-white/80 p-7 shadow-lg backdrop-blur"
              >
                <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                  {item.category}
                </div>
                <p className="mt-6 text-base leading-relaxed text-slate-700">
                  "{item.quote}"
                </p>
                <div className="mt-8 border-t border-slate-200 pt-5">
                  <p className="text-sm font-bold text-slate-900">{item.name}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                    {item.organization}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="container-wide grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-primary">Operating Discipline</p>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">One control philosophy across every service line.</h2>
          </div>
          <div className="grid gap-4">
            {operatingHighlights.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                <Clock3 size={18} className="mt-1 text-primary" />
                <p className="text-sm font-medium leading-relaxed text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-24 text-white">
        <div className="container-wide rounded-[3rem] border border-white/10 bg-[linear-gradient(135deg,rgba(0,102,102,0.28),rgba(15,23,42,0.95),rgba(217,119,6,0.25))] p-12 lg:p-16">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-white/70">Next Step</p>
          <h2 className="max-w-3xl text-4xl font-bold tracking-tight lg:text-5xl">
            Start with the domain that matters most today, then scale the rest with the same partner.
          </h2>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/services/school-bus-services"
              className="rounded-full bg-white px-8 py-4 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
            >
              School Bus Services
            </Link>
            <Link
              to="/services"
              className="rounded-full border border-white/15 px-8 py-4 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Corporate and Cab Services
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
