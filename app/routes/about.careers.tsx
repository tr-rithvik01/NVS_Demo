import type { MetaFunction } from "@remix-run/node";
import { motion } from "motion/react";
import { Link } from "@remix-run/react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Clock3,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Careers | NVS Travel Solutions" },
    {
      name: "description",
      content:
        "Explore careers at NVS Travel Solutions, view current openings, and learn what working at NVS looks like across operations, safety, and transport services.",
    },
  ];
};

const benefits = [
  "Work on real transport operations that impact schools, companies, and daily commuters.",
  "Learn through regular safety, process, and field coordination training.",
  "Join teams that value discipline, communication, and service quality.",
];

const jobOpenings = [
  {
    title: "Operations Coordinator",
    department: "Operations",
    location: "Bengaluru",
    type: "Full Time",
    mode: "On Site",
    summary: "Coordinate routes, daily vehicle deployment, and escalation handling across live transport operations.",
  },
  {
    title: "Safety & Training Executive",
    department: "Safety",
    location: "Bengaluru",
    type: "Full Time",
    mode: "Field + Office",
    summary: "Support fire drills, first aid readiness, driver coaching, and ongoing compliance training programs.",
  },
  {
    title: "Corporate Transport Manager",
    department: "Business Operations",
    location: "Bengaluru",
    type: "Full Time",
    mode: "Hybrid",
    summary: "Manage employee commute programs, shift movement design, client reporting, and service delivery oversight.",
  },
  {
    title: "Cab Services Dispatcher",
    department: "Rental Services",
    location: "Bengaluru",
    type: "Shift Based",
    mode: "On Site",
    summary: "Monitor trip assignments, coordinate pickup timing, and manage live communication with drivers and clients.",
  },
  {
    title: "Driver Relations Associate",
    department: "People Operations",
    location: "Bengaluru",
    type: "Full Time",
    mode: "On Site",
    summary: "Support driver onboarding, document checks, attendance follow-up, and field communication processes.",
  },
];

const lifeAtNvs = [
  "Route planning huddles and morning operations reviews",
  "Training days covering safety, first aid, and emergency response",
  "Cross-functional work between field, dispatch, and client-facing teams",
];

const gallery = [
  "https://picsum.photos/seed/careers-1/900/700",
  "https://picsum.photos/seed/careers-2/900/700",
  "https://picsum.photos/seed/careers-3/900/700",
  "https://picsum.photos/seed/careers-4/900/700",
];

export default function CareersPage() {
  return (
    <article className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-primary">
              <BriefcaseBusiness size={14} />
              Careers at NVS
            </div>
            <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-slate-900 lg:text-6xl">
              Build transport systems with people who care about doing the work well.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-600">
              Careers at NVS span operations, safety, training, dispatch, and service management. We look for people who are organized, dependable, and comfortable working in environments where reliability matters every day.
            </p>
          </div>

          <div className="overflow-hidden rounded-[2.75rem] border border-slate-200 bg-white shadow-xl">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://picsum.photos/seed/nvs-careers-hero/1200/900"
                alt="Working at NVS"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </header>

        <section className="mt-20 rounded-[3rem] bg-slate-900 p-10 text-white shadow-2xl lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-primary-light">Why Join</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight">
                Work that is operational, practical, and meaningful.
              </h2>
            </div>
            <div className="space-y-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm leading-relaxed text-slate-300">
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-primary">Life at NVS</p>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">
              Images from the teams, routines, and environments that shape the company.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {gallery.map((image, index) => (
              <div key={image} className={index === 0 ? "md:row-span-2" : ""}>
                <div className="overflow-hidden rounded-[2rem] shadow-lg">
                  <img
                    src={image}
                    alt={`Life at NVS ${index + 1}`}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {lifeAtNvs.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-700 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-primary">Open Roles</p>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">
              Current job openings
            </h2>
          </div>

          <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-sm">
            <div className="hidden grid-cols-[2fr_1.1fr_1fr_1fr_1.3fr] gap-4 border-b border-slate-200 bg-slate-50 px-8 py-5 text-xs font-bold uppercase tracking-[0.22em] text-slate-500 lg:grid">
              <div>Role</div>
              <div>Department</div>
              <div>Location</div>
              <div>Type</div>
              <div>Action</div>
            </div>

            <div>
              {jobOpenings.map((job, index) => (
                <motion.div
                  key={job.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-slate-200 last:border-b-0"
                >
                  <div className="hidden items-center gap-4 px-8 py-6 lg:grid lg:grid-cols-[2fr_1.1fr_1fr_1fr_1.3fr]">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-500">{job.summary}</p>
                    </div>
                    <div className="text-sm font-medium text-slate-700">{job.department}</div>
                    <div className="text-sm font-medium text-slate-700">{job.location}</div>
                    <div className="text-sm font-medium text-slate-700">{job.type}</div>
                    <div className="flex flex-col gap-3">
                      <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                        <MapPin size={14} />
                        {job.mode}
                      </div>
                      <a
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary"
                      >
                        Apply Now <ArrowRight size={16} />
                      </a>
                    </div>
                  </div>

                  <div className="space-y-4 px-6 py-6 lg:hidden">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{job.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-500">{job.summary}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm text-slate-700">
                      <div className="rounded-xl bg-slate-50 px-4 py-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Department</p>
                        <p className="mt-1 font-medium">{job.department}</p>
                      </div>
                      <div className="rounded-xl bg-slate-50 px-4 py-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Location</p>
                        <p className="mt-1 font-medium">{job.location}</p>
                      </div>
                      <div className="rounded-xl bg-slate-50 px-4 py-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Type</p>
                        <p className="mt-1 font-medium">{job.type}</p>
                      </div>
                      <div className="rounded-xl bg-slate-50 px-4 py-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Mode</p>
                        <p className="mt-1 font-medium">{job.mode}</p>
                      </div>
                    </div>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary"
                    >
                      Apply Now <ArrowRight size={16} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 rounded-[3rem] border border-primary/10 bg-primary/5 p-10 lg:p-14">
          <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-primary">How We Hire</p>
              <h2 className="text-4xl font-bold tracking-tight text-slate-900">
                We hire for reliability, coordination, and a serious approach to service.
              </h2>
            </div>
            <div className="grid gap-4">
              <div className="rounded-2xl border border-primary/10 bg-white px-5 py-4">
                <div className="flex items-start gap-3">
                  <Users size={18} className="mt-1 text-primary" />
                  <p className="text-sm leading-relaxed text-slate-700">
                    We look for candidates who communicate clearly and work well with teams on the ground.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-primary/10 bg-white px-5 py-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck size={18} className="mt-1 text-primary" />
                  <p className="text-sm leading-relaxed text-slate-700">
                    Safety awareness and discipline matter across every role, not only field-facing ones.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-primary/10 bg-white px-5 py-4">
                <div className="flex items-start gap-3">
                  <Clock3 size={18} className="mt-1 text-primary" />
                  <p className="text-sm leading-relaxed text-slate-700">
                    Strong execution comes from consistency, punctuality, and the ability to handle real operating pressure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
