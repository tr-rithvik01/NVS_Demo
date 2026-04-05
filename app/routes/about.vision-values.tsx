import type { MetaFunction } from "@remix-run/cloudflare";
import { motion } from "motion/react";
import { Link } from "@remix-run/react";
import { Target, Heart, Shield, Zap, Users, Award, ArrowRight, Bus } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Vision & Values | NVS Travel Solutions" },
    { name: "description", content: "Learn about our mission to provide safe school transportation and the core values that drive NVS Travel Solutions." },
  ];
};

const principles = [
  "Safety is not treated as a marketing claim. It is the first filter for operational decisions.",
  "Reliability means routes, people, and vehicles should behave predictably under real daily conditions.",
  "Technology matters when it improves control, transparency, and response time for actual users.",
];

const values = [
  {
    title: "Safety First",
    description: "Every decision we make starts with the question: 'Is this the safest way?'",
    icon: Shield,
    color: "text-primary",
    bg: "bg-primary/5"
  },
  {
    title: "Reliability",
    description: "Punctuality is not just a goal; it's a commitment to the schools and parents we serve.",
    icon: Zap,
    color: "text-amber-600",
    bg: "bg-amber-50"
  },
  {
    title: "Innovation",
    description: "We constantly push the boundaries of technology to make transportation smarter and safer.",
    icon: Target,
    color: "text-primary",
    bg: "bg-primary/5"
  },
  {
    title: "Community",
    description: "We believe in building strong relationships with the schools and families in our network.",
    icon: Heart,
    color: "text-rose-600",
    bg: "bg-rose-50"
  },
  {
    title: "Integrity",
    description: "We operate with complete transparency and honesty in all our business dealings.",
    icon: Award,
    color: "text-indigo-600",
    bg: "bg-indigo-50"
  },
  {
    title: "Collaboration",
    description: "Working together with schools to provide the best possible experience for students.",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-50"
  }
];

export default function VisionValues() {
  return (
    <article className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-primary">
              <Bus size={14} />
              Vision & Values
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 lg:text-6xl">
              The principles that shape how NVS operates.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-600">
              Our foundation is built on a simple promise: treat every trip as a trust-sensitive responsibility. The values below are not abstract statements. They describe how we make transport decisions in practice.
            </p>
          </div>

          <div className="overflow-hidden rounded-[2.75rem] border border-slate-200 bg-white shadow-xl">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://picsum.photos/seed/vision-values/1200/900"
                alt="Vision and values at NVS"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </header>

        <section className="mt-20 rounded-[3rem] bg-slate-900 p-10 text-white shadow-2xl lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-primary-light">Operating Belief</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight">
                Values only matter if they are visible in the daily service.
              </h2>
            </div>
            <div className="space-y-4">
              {principles.map((principle) => (
                <div key={principle} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm leading-relaxed text-slate-300">
                  {principle}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-[2.5rem] border border-slate-100 bg-white p-10 transition-all duration-300 hover:border-primary/20 hover:shadow-2xl"
            >
              <div className={`w-14 h-14 rounded-2xl ${value.bg} ${value.color} flex items-center justify-center mb-8`}>
                <value.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{value.title}</h3>
              <p className="text-slate-500 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </section>

        <section className="relative mt-24 overflow-hidden rounded-[3rem] bg-primary/5 p-12 lg:p-20">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-primary">Mission</p>
              <h2 className="mb-6 text-4xl font-bold text-slate-900">Build transport systems people can trust.</h2>
              <p className="mb-8 text-lg leading-relaxed text-slate-600">
                To provide safe, reliable, and efficient transportation solutions that empower schools to focus on their core mission of education, while giving parents peace of mind through transparency and technology.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-bold text-xl text-white">10</div>
                <p className="text-sm font-medium uppercase tracking-widest text-slate-600">Years of Excellence</p>
              </div>
              <div className="mt-8">
                <Link
                  to="/about/our-team"
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:gap-3"
                >
                  Meet our team <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://picsum.photos/seed/mission/800/600"
                  alt="NVS Team at work"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
