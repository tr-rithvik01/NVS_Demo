import type { MetaFunction } from "@remix-run/cloudflare";
import { motion } from "motion/react";
import {
  Award,
  Flame,
  HeartPulse,
  Linkedin,
  Mail,
  ShieldCheck,
  Users,
} from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Our Team | Leadership at NVS Travel Solutions" },
    {
      name: "description",
      content:
        "Meet the NVS leadership team, explore company culture, view team moments, and learn about regular safety and emergency trainings.",
    },
  ];
};

const leadershipTeam = [
  {
    name: "N.V. Sridhar",
    role: "Founder & Managing Director",
    bio: "With over 20 years of experience in logistics and transportation, Sridhar founded NVS with a vision to make school commutes safer for every child.",
    image: "https://picsum.photos/seed/sridhar/500/500",
  },
  {
    name: "P. Venkatesh",
    role: "Director of Operations",
    bio: "Venkatesh oversees our fleet and operating teams, ensuring that routes, vehicles, and service quality remain dependable.",
    image: "https://picsum.photos/seed/venkatesh/500/500",
  },
  {
    name: "R. Lakshmi",
    role: "Head of Safety & Training",
    bio: "Lakshmi leads staff readiness, emergency response preparation, and safety training programs across the organization.",
    image: "https://picsum.photos/seed/lakshmi/500/500",
  },
];

const galleryImages = [
  "https://picsum.photos/seed/team-gallery-1/700/700",
  "https://picsum.photos/seed/team-gallery-2/700/500",
  "https://picsum.photos/seed/team-gallery-3/700/500",
  "https://picsum.photos/seed/team-gallery-4/700/700",
  "https://picsum.photos/seed/team-gallery-5/700/500",
  "https://picsum.photos/seed/team-gallery-6/700/700",
];

const culturePoints = [
  {
    title: "Safety Is Shared",
    description: "Teams are encouraged to escalate issues early and treat safe operations as a collective responsibility.",
    icon: ShieldCheck,
  },
  {
    title: "Respect for the Field",
    description: "We value the people handling routes, vehicles, dispatch, and on-ground coordination every day.",
    icon: Users,
  },
  {
    title: "Continuous Improvement",
    description: "Processes, training, and service systems are reviewed regularly instead of being left static.",
    icon: Award,
  },
];

const trainings = [
  {
    title: "Fire Safety Drills",
    description: "Hands-on fire response practice covering extinguisher use, evacuation, and reporting protocols.",
    icon: Flame,
  },
  {
    title: "First Aid Readiness",
    description: "Basic medical response sessions so staff can stabilize minor incidents and react correctly in emergencies.",
    icon: HeartPulse,
  },
  {
    title: "Safety Refreshers",
    description: "Regular sessions on child handling, route conduct, vehicle readiness, and operating discipline.",
    icon: ShieldCheck,
  },
];

export default function OurTeam() {
  return (
    <article className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-primary">
              <Users size={14} />
              The People Behind NVS
            </div>
            <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-slate-900 lg:text-6xl">
              Meet the team shaping NVS every day.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-600">
              From leadership and operations to safety, training, and field coordination, the NVS team is built around disciplined execution and dependable service delivery.
            </p>
          </div>

          <div className="overflow-hidden rounded-[2.75rem] border border-slate-200 bg-white shadow-xl">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://picsum.photos/seed/nvs-team-hero/1200/900"
                alt="NVS team"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </header>

        <section className="mt-20">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-primary">Leadership Team</p>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">
              Leadership that connects operations, safety, and service.
            </h2>
          </div>

          <div className="grid gap-12 lg:grid-cols-3">
            {leadershipTeam.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group"
              >
                <div className="relative mb-8 aspect-square overflow-hidden rounded-[3rem] shadow-xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-slate-900/80 via-transparent to-transparent p-6 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex gap-4">
                      <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-primary">
                        <Linkedin size={20} />
                      </a>
                      <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-primary">
                        <Mail size={20} />
                      </a>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-primary">{member.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-slate-500">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-primary">Team Gallery</p>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">
              Moments from the people and work behind the service.
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {galleryImages.map((image, index) => (
              <div
                key={image}
                className={index % 3 === 0 ? "col-span-2 md:col-span-1" : ""}
              >
                <div className="overflow-hidden rounded-[2rem] shadow-lg">
                  <img
                    src={image}
                    alt={`NVS team gallery ${index + 1}`}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-[3rem] bg-slate-900 p-10 text-white shadow-2xl lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-primary-light">Company Culture</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight">
                We build culture around accountability, readiness, and care.
              </h2>
            </div>
            <div className="grid gap-4">
              {culturePoints.map((point) => (
                <div key={point.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-primary-light">
                      <point.icon size={22} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{point.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">{point.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-primary">Regular Trainings</p>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">
              Fire, first aid, and operational readiness are practiced regularly.
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {trainings.map((training) => (
              <div key={training.title} className="rounded-[2.25rem] border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <training.icon size={24} />
                </div>
                <h3 className="mt-8 text-2xl font-bold text-slate-900">{training.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{training.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-[3rem] border border-primary/10 bg-primary/5 p-12 lg:p-16">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-primary">Join Our Team</p>
              <h2 className="text-4xl font-bold tracking-tight text-slate-900">
                Join a team focused on safer and more dependable transport.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate-600">
                We are always looking for people who care about service quality, discipline, and operational excellence across transport systems.
              </p>
              <a
                href="/about/careers"
                className="mt-8 inline-block rounded-full bg-slate-900 px-8 py-3 text-sm font-bold text-white transition hover:bg-primary"
              >
                View Openings
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-2xl shadow-sm">
                  <img
                    src={`https://picsum.photos/seed/team-join-${i}/240/240`}
                    alt="NVS team member"
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
