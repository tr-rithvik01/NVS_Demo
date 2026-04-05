import type { MetaFunction } from "@remix-run/cloudflare";
import { motion } from "motion/react";
import { Link } from "@remix-run/react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Bus,
  CarFront,
  CheckCircle2,
  Map,
  Shield,
  Users,
} from "lucide-react";
import { cn } from "~/lib/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "Services | School Bus, Corporate Transport, and Cab Rental Services" },
    {
      name: "description",
      content:
        "Explore NVS Travel Solutions across school bus services, corporate transport services, and cab rental services.",
    },
  ];
};

const services = [
  {
    id: "school-bus-services",
    title: "School Bus Services",
    description:
      "A dedicated student mobility offering with route planning, trained attendants, control-room monitoring, child safety checks, and parent-facing visibility.",
    icon: Bus,
    color: "bg-primary",
    href: "/services/school-bus-services",
    cta: "Open School Bus Page",
    features: ["Driver safety protocols", "Student tracking systems", "CCTV and GPS visibility", "Daily bus safety checklists"],
  },
  {
    id: "corporate-transport",
    title: "Corporate Transport Services",
    description:
      "Fixed-route and shift-based employee transport designed around punctual arrivals, roster management, live monitoring, and incident escalation.",
    icon: BriefcaseBusiness,
    color: "bg-slate-900",
    href: "/services/corporate-transport",
    cta: "Open Corporate Transport Page",
    features: ["Shift and roster transport", "Supervisor dashboards", "Trip punctuality monitoring", "Backup fleet and escalation support"],
  },
  {
    id: "cab-rental-services",
    title: "Cab Rental Services",
    description:
      "Flexible cab access for airport transfers, executive movement, client travel, event support, local usage, and outstation requirements.",
    icon: CarFront,
    color: "bg-amber-600",
    href: "/services/cab-rental-services",
    cta: "Open Cab Rental Page",
    features: ["Airport and local transfers", "Executive cab support", "On-demand dispatch", "Hourly and trip-based rental options"],
  },
];

const deliveryModel = [
  {
    title: "Visibility",
    description: "Trips are monitored through structured controls instead of informal follow-up.",
    icon: Map,
  },
  {
    title: "Safety",
    description: "Every domain inherits the same discipline around verification, behaviour standards, and escalation paths.",
    icon: Shield,
  },
  {
    title: "User Experience",
    description: "Parents, employees, admins, and booking teams get clearer communication and fewer surprises.",
    icon: Users,
  },
];

export default function ServicesIndex() {
  return (
    <article className="bg-slate-50 pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-4xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-primary">Services</p>
          <h1 className="text-5xl font-bold tracking-tight text-slate-900">Three service domains. One operating standard.</h1>
          <p className="mt-8 text-xl leading-relaxed text-slate-600">
            NVS Travel Solutions is organized around school bus services, corporate transport services, and cab rental services. Each domain is distinct, but all three depend on the same safety, control, and reporting discipline.
          </p>
        </header>

        <section className="mt-12 space-y-10">
          {services.map((service, index) => (
            <motion.section
              id={service.id}
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-[2.75rem] border border-slate-200 bg-white p-10 shadow-sm"
            >
              <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <div className={cn("flex h-16 w-16 items-center justify-center rounded-3xl text-white shadow-lg", service.color)}>
                    <service.icon size={30} />
                  </div>
                  <h2 className="mt-8 text-3xl font-bold text-slate-900">{service.title}</h2>
                  <p className="mt-5 text-base leading-relaxed text-slate-600">{service.description}</p>
                  <Link to={service.href} className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:gap-3">
                    {service.cta} <ArrowRight size={16} />
                  </Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                      <CheckCircle2 size={18} className="mt-0.5 text-primary" />
                      <span className="text-sm font-medium leading-relaxed text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          ))}
        </section>

        <section className="mt-20 rounded-[3rem] border border-slate-200 bg-white p-10 shadow-sm lg:p-14">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-primary">Why This Structure Works</p>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">Different use cases, shared operational backbone.</h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {deliveryModel.map((item) => (
              <div key={item.title} className="rounded-[2rem] bg-slate-50 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <item.icon size={22} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
