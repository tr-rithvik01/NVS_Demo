import type { MetaFunction } from "@remix-run/cloudflare";
import { motion } from "motion/react";
import { Link } from "@remix-run/react";
import {
  ArrowRight,
  Bus,
  ShieldCheck,
  Users,
  Waypoints,
} from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "About | NVS Travel Solutions" },
    {
      name: "description",
      content:
        "Learn about NVS Travel Solutions, our safety-first approach, and the team behind our school bus, corporate transport, and cab rental operations.",
    },
  ];
};

const pillars = [
  {
    title: "Safety-Led Operations",
    description:
      "Our operating model begins with route discipline, vehicle readiness, driver verification, and transparent trip visibility.",
    icon: ShieldCheck,
  },
  {
    title: "People and Process",
    description:
      "We combine trained staff, clear SOPs, and active coordination to keep day-to-day transport dependable.",
    icon: Users,
  },
  {
    title: "Multi-Domain Mobility",
    description:
      "NVS serves school bus services, corporate transport, and cab rental requirements under one coordinated framework.",
    icon: Waypoints,
  },
];

const quickLinks = [
  {
    title: "Vision & Values",
    description: "Understand the principles that drive our transport decisions.",
    href: "/about/vision-values",
  },
  {
    title: "Our Team",
    description: "Meet the people responsible for operations, safety, and growth.",
    href: "/about/our-team",
  },
  {
    title: "Contact NVS",
    description: "Start a conversation about your mobility requirements.",
    href: "/contact",
  },
];

export default function AboutPage() {
  return (
    <article className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-primary">
              <Bus size={14} />
              About NVS
            </div>
            <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-slate-900 lg:text-6xl">
              Built around safer mobility and clearer transport operations.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-600">
              NVS Travel Solutions operates with a simple objective: deliver structured mobility that schools, companies, and families can trust. Our work spans school bus services, corporate transport, and cab rental support, all anchored in safety, visibility, and daily execution.
            </p>
          </div>

          <div className="overflow-hidden rounded-[2.75rem] border border-slate-200 bg-white shadow-xl">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://picsum.photos/seed/nvs-about-overview/1200/900"
                alt="NVS transport operations overview"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </header>

        <section className="mt-20 rounded-[3rem] bg-slate-900 p-10 text-white shadow-2xl lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-primary-light">Our Perspective</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight">
                Transport is not just movement. It is a service system.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-slate-300">
              <p>
                We treat mobility as an operational responsibility, not a one-time trip assignment. That means the value of the service comes from route discipline, trained people, fleet readiness, and the ability to respond clearly when conditions change.
              </p>
              <p>
                This is especially important in trust-sensitive categories like school transport, but the same principle also shapes employee commute programs and cab rental support. Reliable service is built from repeatable systems.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-primary">How We Work</p>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">
              A transport partner should be understandable at both the strategy and daily operations level.
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[2.25rem] border border-slate-200 bg-white p-8 shadow-sm"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <pillar.icon size={26} />
                </div>
                <h3 className="mt-8 text-2xl font-bold text-slate-900">{pillar.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-primary">Next Pages</p>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">
              Go deeper into the people and principles behind NVS.
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {quickLinks.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className="group rounded-[2.25rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl"
              >
                <h3 className="text-2xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.description}</p>
                <div className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary transition group-hover:gap-3">
                  Open page <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
