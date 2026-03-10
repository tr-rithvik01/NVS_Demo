import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import {
  ArrowRight,
  Bus,
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  Network,
  Users,
} from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Community | NVS Travel Solutions" },
    {
      name: "description",
      content:
        "Explore the NVS community across social channels, WhatsApp groups, and Discord spaces built around school transport, corporate mobility, and cab rental networks.",
    },
  ];
};

const socialLinks = [
  {
    title: "Facebook Page",
    description: "Parent-facing updates, event posts, service announcements, and community stories.",
    href: "https://facebook.com/your-page",
    label: "Open Facebook",
    icon: Facebook,
    accent: "bg-[#1877F2]",
  },
  {
    title: "LinkedIn Page",
    description: "Leadership insights, transport operations updates, and B2B mobility conversations.",
    href: "https://linkedin.com/company/your-company",
    label: "Open LinkedIn",
    icon: Linkedin,
    accent: "bg-[#0A66C2]",
  },
  {
    title: "Instagram Page",
    description: "Visual stories from fleets, events, route operations, and team moments.",
    href: "https://instagram.com/your-handle",
    label: "Open Instagram",
    icon: Instagram,
    accent: "bg-[linear-gradient(135deg,#F58529,#DD2A7B,#8134AF,#515BD4)]",
  },
];

const whatsappGroups = [
  {
    title: "Bus Driver Association",
    angle: "Connect drivers around discipline, safety routines, route issues, and best practices.",
    href: "https://wa.me/919999999999?text=I%20want%20to%20join%20the%20NVS%20Bus%20Driver%20Association%20group",
  },
  {
    title: "Rent-a-Cab Network",
    angle: "Bring together operators, drivers, and partners involved in rental trip execution and service coordination.",
    href: "https://wa.me/919999999999?text=I%20want%20to%20join%20the%20NVS%20Rent-a-Cab%20group",
  },
  {
    title: "School Transport Circle",
    angle: "Discuss school commute challenges, child safety systems, and operational coordination with peers.",
    href: "https://wa.me/919999999999?text=I%20want%20to%20join%20the%20NVS%20School%20Transport%20group",
  },
];

const discordCommunities = [
  {
    title: "School Principals Forum",
    description: "A strategic space to discuss school transport expectations, parent trust, and vendor accountability.",
    href: "https://discord.gg/your-school-principals",
  },
  {
    title: "School Admin Network",
    description: "A working forum for admins coordinating routes, communications, attendance visibility, and escalation processes.",
    href: "https://discord.gg/your-school-admins",
  },
  {
    title: "MNC Transport Managers",
    description: "A peer community for leaders managing employee commute design, shift movement, and transport vendors at scale.",
    href: "https://discord.gg/your-transport-managers",
  },
];

export default function CommunityPage() {
  return (
    <article className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="grid gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-primary">
              <Users size={14} />
              Community
            </div>
            <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-slate-900 lg:text-6xl">
              We are committed to connecting people with transport solutions.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-600">
              Community matters because mobility is never just about vehicles. It is about people who operate transport, people who manage it, and people who depend on it every day. NVS uses public channels and focused communities to create better conversations around school transport, corporate mobility, and cab rental operations.
            </p>
          </div>

          <div className="overflow-hidden rounded-[2.75rem] border border-slate-200 bg-white shadow-xl">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://picsum.photos/seed/nvs-community/1200/900"
                alt="NVS community and transport network"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </header>

        <section className="mt-20">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-primary">Social Pages</p>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">
              Follow the public channels where we share updates.
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {socialLinks.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-[2.25rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg ${item.accent}`}>
                  <item.icon size={24} />
                </div>
                <h3 className="mt-8 text-2xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.description}</p>
                <div className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary transition group-hover:gap-3">
                  {item.label} <ArrowRight size={16} />
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-[3rem] bg-slate-900 p-10 text-white shadow-2xl lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-primary-light">WhatsApp Communities</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight">
                Tactical groups for operators and transport-side coordination.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate-300">
                These groups are designed around practical operating angles where fast communication matters and peer learning is valuable.
              </p>
            </div>

            <div className="grid gap-4">
              {whatsappGroups.map((group) => (
                <a
                  key={group.title}
                  href={group.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white">
                      <MessageCircle size={22} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{group.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">{group.angle}</p>
                      <p className="mt-4 text-sm font-bold text-primary-light">Join WhatsApp Group</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-primary">Discord Communities</p>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">
              Strategic discussion spaces for education and enterprise stakeholders.
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {discordCommunities.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-[2.25rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Network size={24} />
                </div>
                <h3 className="mt-8 text-2xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.description}</p>
                <div className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary transition group-hover:gap-3">
                  Join Discord <ArrowRight size={16} />
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-[3rem] border border-primary/10 bg-primary/5 p-10 lg:p-14">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
            The goal is simple: make it easier for the right people to find the right transport solutions.
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-600">
            Whether the conversation is happening between bus drivers, school administrators, transport managers in MNCs, or rental partners, we want each channel to support better decision-making and more reliable mobility outcomes.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-primary"
            >
              Talk to NVS <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
