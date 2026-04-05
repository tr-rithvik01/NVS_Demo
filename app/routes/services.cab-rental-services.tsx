import type { MetaFunction } from "@remix-run/cloudflare";
import { motion } from "motion/react";
import { Link } from "@remix-run/react";
import {
  ArrowRight,
  Camera,
  CarFront,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  HeartPulse,
  Leaf,
  MapPinned,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Video,
  Wallet,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { cn } from "~/lib/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "Cab Rental Services | NVS Travel Solutions" },
    {
      name: "description",
      content:
        "Explore NVS cab rental services through an interactive fleet, safety, and operations framework covering chauffeur screening, trip monitoring, passenger security, premium service, and digital booking convenience.",
    },
  ];
};

const fleetHighlights = [
  {
    name: "Executive Sedans",
    count: "40+",
    image: "https://res.cloudinary.com/dzclm0iez/image/upload/v1773128279/Gemini_Generated_Image_3c0ovl3c0ovl3c0o_og06wp.png",
    description: "City movement, executive meetings, airport transfers, and premium day-use travel.",
  },
  {
    name: "SUV Fleet",
    count: "25+",
    image: "https://res.cloudinary.com/dzclm0iez/image/upload/v1773128562/Gemini_Generated_Image_mos6djmos6djmos6_mwii7z.png",
    description: "Senior leadership travel, family movement, outstation use, and high-comfort transfers.",
  },
  {
    name: "Premium MPVs",
    count: "18+",
    image: "https://res.cloudinary.com/dzclm0iez/image/upload/v1773128657/Gemini_Generated_Image_mdb86tmdb86tmdb8_nau6ir.png",
    description: "Airport groups, event teams, business delegations, and flexible people movement.",
  },
  {
    name: "Tempo Travellers",
    count: "12+",
    image: "https://res.cloudinary.com/dzclm0iez/image/upload/v1773130709/Gemini_Generated_Image_uuz7u2uuz7u2uuz7_bxvdsj.png",
    description: "Team outings, corporate movement, project groups, and long-route shared travel.",
  },
  {
    name: "Luxury Cars",
    count: "10+",
    image: "https://res.cloudinary.com/dzclm0iez/image/upload/v1773128988/Gemini_Generated_Image_rawqzlrawqzlrawq_apnyjg.png",
    description: "VIP hosting, chauffeur-led airport service, and high-touch client transport.",
  },
  {
    name: "EV & Hybrid Fleet",
    count: "15+",
    image: "https://res.cloudinary.com/dzclm0iez/image/upload/v1773130804/Gemini_Generated_Image_astewiastewiaste_nt6rh0.png",
    description: "Modern green mobility options for companies and customers prioritizing lower-emission travel.",
  },
];

const featureGroups = [
  {
    id: "driver-screening",
    title: "Driver Screening & Professional Standards",
    subtitle: "Ensuring safe, verified, trained, and professionally monitored chauffeurs across the fleet.",
    icon: ShieldCheck,
    color: "bg-amber-600",
    note: "This layer establishes trust before the trip starts by combining background checks, driving standards, conduct rules, and ongoing retraining.",
    items: [
      "Driver police verification and background check",
      "Valid commercial driving licence",
      "Minimum 3 to 5 years professional driving experience",
      "Driver identity verification",
      "Driver uniform and ID badge",
      "Professional chauffeur training",
      "Defensive driving training",
      "Customer service training",
      "Driver behaviour monitoring",
      "Driver performance rating system",
      "Driver fatigue monitoring",
      "Daily alcohol breathalyzer tests",
      "Random alcohol testing",
      "Driver medical fitness tests",
      "Zero phone usage while driving",
      "Route knowledge testing",
      "Periodic re-training programs",
    ],
  },
  {
    id: "passenger-safety",
    title: "Passenger Safety & Security",
    subtitle: "Protecting riders through verification, emergency pathways, and monitored trip controls.",
    icon: Users,
    color: "bg-slate-900",
    note: "This layer focuses on what the passenger feels and what the operator can verify during the ride, especially for late-night movement.",
    items: [
      "SOS panic button inside vehicle",
      "Emergency helpline",
      "24/7 control room monitoring",
      "Trip sharing with family or company",
      "Driver identity verification before trip",
      "Female passenger safety protocols",
      "Late night safety procedures",
      "Trip start OTP verification",
      "Trip end confirmation",
      "Emergency response protocol",
      "Incident reporting system",
    ],
  },
  {
    id: "gps-monitoring",
    title: "GPS Tracking & Trip Monitoring",
    subtitle: "Using real-time trip visibility to manage routes, ETAs, allocation, and exception handling.",
    icon: MapPinned,
    color: "bg-cyan-700",
    note: "This layer is what makes a large fleet manageable at scale by keeping vehicles, routes, and arrival expectations visible.",
    items: [
      "Live GPS vehicle tracking",
      "Real-time route monitoring",
      "Trip playback and trip history",
      "Geo-fencing alerts",
      "Route deviation alerts",
      "Estimated arrival time updates",
      "Traffic-aware navigation",
      "Automatic dispatch system",
      "Smart ride allocation",
      "Fleet tracking dashboard",
    ],
  },
  {
    id: "surveillance-cameras",
    title: "Surveillance & Camera Systems",
    subtitle: "Adding visual evidence and accountability through in-vehicle and road-facing camera systems.",
    icon: Camera,
    color: "bg-blue-700",
    note: "This layer supports security, incident review, and dispute handling through recorded visual context.",
    items: [
      "Dash cameras",
      "Driver-facing cameras",
      "Interior passenger cameras",
      "Exterior road cameras",
      "Cloud video storage",
      "Incident recording",
      "Video evidence for accident investigation",
    ],
  },
  {
    id: "vehicle-safety",
    title: "Vehicle Safety Features",
    subtitle: "Keeping the car itself ready for safer movement through physical safety systems and driver-assist features.",
    icon: CarFront,
    color: "bg-emerald-700",
    note: "This layer covers the in-vehicle systems that reduce injury exposure and improve control in daily road conditions.",
    items: [
      "Airbags",
      "ABS braking system",
      "Seat belts for all passengers",
      "Rear parking sensors",
      "Reverse camera",
      "Electronic stability control",
      "Traction control",
      "Child lock systems",
      "Child seat availability",
      "Central locking system",
      "Speed governors",
      "Blind spot mirrors",
      "Fog lamps",
    ],
  },
  {
    id: "emergency-medical",
    title: "Emergency & Medical Preparedness",
    subtitle: "Preparing drivers and vehicles for accidents, breakdowns, and first-response situations.",
    icon: HeartPulse,
    color: "bg-rose-700",
    note: "This layer turns emergencies into managed response scenarios through training, equipment, and escalation protocols.",
    items: [
      "First aid box",
      "First aid trained drivers",
      "CPR trained staff",
      "Emergency contact list",
      "Fire extinguisher",
      "Emergency response training",
      "Accident reporting protocol",
      "Breakdown assistance",
    ],
  },
  {
    id: "fleet-maintenance",
    title: "Fleet Maintenance & Compliance",
    subtitle: "Maintaining road-worthy, legal, and backup-ready vehicles through inspection and upkeep discipline.",
    icon: ClipboardCheck,
    color: "bg-indigo-700",
    note: "A multi-fleet operation only stays reliable when maintenance, certificates, inspections, and replacements are tightly managed.",
    items: [
      "Regular vehicle inspection",
      "Preventive maintenance schedules",
      "Vehicle fitness certificate",
      "Insurance coverage",
      "Pollution control certificate",
      "Permit compliance",
      "Tyre condition monitoring",
      "Brake inspections",
      "Spare vehicle availability",
      "Breakdown support",
    ],
  },
  {
    id: "hygiene-cleanliness",
    title: "Hygiene & Cleanliness",
    subtitle: "Maintaining clean, fresh, and customer-ready vehicles across high-frequency daily operations.",
    icon: Sparkles,
    color: "bg-violet-700",
    note: "Cleanliness directly shapes trust in a cab brand, especially in a large urban fleet used repeatedly by business and family travelers.",
    items: [
      "Daily vehicle cleaning",
      "Interior sanitization",
      "Odour-free vehicles",
      "Seat cover cleaning",
      "Regular interior detailing",
      "Hand sanitizer in vehicle",
      "Clean floor mats",
      "Dust-free dashboards",
    ],
  },
  {
    id: "comfort-experience",
    title: "Comfort & Customer Experience",
    subtitle: "Improving ride quality through cabin comfort, storage, and small conveniences that matter on live trips.",
    icon: Star,
    color: "bg-teal-700",
    note: "This layer affects how premium, practical, and repeat-worthy the ride feels for customers and business travelers.",
    items: [
      "Air-conditioned vehicles",
      "Comfortable seating",
      "Large luggage space",
      "Phone charging ports",
      "Wi-Fi in premium fleets",
      "Music control options",
      "Bottle holders",
      "Premium interiors",
      "Quiet ride experience",
    ],
  },
  {
    id: "booking-convenience",
    title: "Booking & Digital Convenience",
    subtitle: "Reducing friction with faster confirmations, better payment flows, and easier ride management.",
    icon: Wallet,
    color: "bg-slate-700",
    note: "This layer matters because customers judge service quality not only by the ride, but by how easy it is to book, pay, review, and repeat.",
    items: [
      "Mobile booking app",
      "Website booking system",
      "Instant ride confirmation",
      "Scheduled ride booking",
      "Multi-payment options",
      "Digital invoices",
      "Ride history",
      "Driver ratings",
      "Customer reviews",
      "Corporate booking dashboards",
    ],
  },
  {
    id: "corporate-business",
    title: "Corporate & Business Features",
    subtitle: "Supporting business accounts with reporting, approvals, billing, and workforce travel controls.",
    icon: Users,
    color: "bg-cyan-800",
    note: "This layer is what turns a large cab fleet into a dependable business travel partner instead of just a consumer transport option.",
    items: [
      "Dedicated corporate accounts",
      "Monthly billing",
      "Transport reports",
      "Cost tracking dashboards",
      "Employee ride management",
      "Corporate ride policies",
      "Travel approvals",
      "Shift-based transport",
      "Bulk booking capability",
      "Airport transfer services",
    ],
  },
  {
    id: "operational-excellence",
    title: "Operational Excellence",
    subtitle: "Running fleet movement through dispatch, support, monitoring, and service-level control.",
    icon: Zap,
    color: "bg-orange-700",
    note: "This layer supports the claim of being one of the larger fleets in Bengaluru by showing how the operation is coordinated in real time.",
    items: [
      "24/7 dispatch centre",
      "Real-time driver support",
      "Trip monitoring team",
      "Service level agreements (SLA)",
      "Incident management system",
      "Customer support helpline",
      "Fleet utilization tracking",
      "Fuel monitoring systems",
      "Route optimization",
      "Backup vehicle support",
    ],
  },
  {
    id: "premium-luxury",
    title: "Premium & Luxury Service Features",
    subtitle: "Delivering a more refined chauffeur-led experience for executive, airport, and VIP movement.",
    icon: Star,
    color: "bg-stone-800",
    note: "This layer supports high-touch travel expectations where professionalism, presentation, and vehicle quality shape the brand impression.",
    items: [
      "Luxury vehicles",
      "Executive chauffeur training",
      "Meet-and-greet airport service",
      "Professional dress code",
      "Door-opening service",
      "Premium vehicle interiors",
      "Business class ride experience",
    ],
  },
  {
    id: "sustainability-modern-fleet",
    title: "Sustainability & Modern Fleet Features",
    subtitle: "Expanding the fleet toward greener and more efficient mobility options.",
    icon: Leaf,
    color: "bg-green-700",
    note: "This layer reflects how modern cab fleets are increasingly judged on fuel efficiency, EV readiness, and transport sustainability.",
    items: [
      "Electric vehicle fleets",
      "Hybrid vehicles",
      "Carbon emission tracking",
      "Fuel efficiency monitoring",
      "Green mobility programs",
    ],
  },
];

const frameworkStats = [
  { value: "14", label: "Service Layers" },
  { value: "120+", label: "Fleet Controls" },
  { value: "One of Bengaluru's", label: "Largest Multi-Fleets" },
];

export default function CabRentalServicesPage() {
  const [activeFeatureId, setActiveFeatureId] = useState(featureGroups[0].id);
  const activeFeature =
    featureGroups.find((group) => group.id === activeFeatureId) ?? featureGroups[0];

  return (
    <article className="bg-slate-50 pb-24 pt-28">
      <section className="container-wide">
        <div className="overflow-hidden rounded-[3rem] bg-[linear-gradient(135deg,#271300_0%,#8a3b12_55%,#111827_100%)] px-8 py-10 text-white shadow-2xl lg:px-12 lg:py-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white/85 ring-1 ring-white/15">
                <CarFront size={14} />
                Cab Rental Services
              </div>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight lg:text-6xl">
                Multi-fleet cab rentals for city, airport, and executive travel.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
                NVS operates one of the larger multi-fleet cab inventories in Bengaluru, covering sedans, SUVs, premium MPVs, tempo travellers, luxury vehicles, and greener fleet options under one managed operating model.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="rounded-full bg-white px-7 py-4 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
                >
                  Request Cab Rental Support
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
                  Fleet Overview
                </div>
                <div className="aspect-[16/10]">
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
                    <p className="text-lg font-bold leading-tight">{stat.value}</p>
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

      <section className="py-14">
        <div className="container-wide">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Fleet Inventory</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
              A visible multi-fleet inventory designed for different trip sizes, budgets, and service expectations.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Instead of a single vehicle category, NVS cab rentals are organized as a broader inventory. That allows the service to support city rides, airport transfers, executive travel, group movement, and premium hospitality through one operating network.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-[2.75rem] border border-slate-200 bg-white shadow-lg">
            <div className="aspect-[18/7] overflow-hidden border-b border-slate-200 bg-slate-100">
              <img
                src="https://res.cloudinary.com/dzclm0iez/image/upload/v1773127722/Gemini_Generated_Image_68sry268sry268sr_dhkr34.png"
                alt="Full NVS vehicle lineup"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-3">
              {fleetHighlights.map((vehicle) => (
                <div key={vehicle.name} className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-xl font-bold text-slate-900">{vehicle.name}</h3>
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-amber-800">
                        {vehicle.count}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{vehicle.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-wide">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Interactive Service Framework</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
              Explore the fourteen layers that shape the NVS cab rental model.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Cab rentals look simple from the outside, but reliability at multi-fleet scale depends on screening, vehicle readiness, trip monitoring, digital convenience, premium service controls, and modern fleet planning. Select a layer to inspect what it covers.
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
              <div className="bg-[linear-gradient(135deg,#271300_0%,#8a3b12_55%,#111827_100%)] p-8 text-white lg:p-10">
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
                      If your team is evaluating cab rentals by fleet size, premium options, or operational controls, we can map the right mix to your exact travel model.
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
            If cab rentals are part of a larger mobility promise, the fleet, controls, and service layers should be visible up front.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75">
            Use this page as the detailed cab-rental destination, while the broader services page continues to frame all three NVS business lines together.
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
