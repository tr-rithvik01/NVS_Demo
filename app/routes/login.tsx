import type { MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";
import {
  Apple,
  CheckCircle2,
  LayoutGrid,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Login | NVS Travel Solutions" },
    {
      name: "description",
      content:
        "Sign in to the NVS portal using Google, Microsoft, phone number, or email. Dummy authentication page for portal access, trip visibility, and account management.",
    },
  ];
};

const signInMethods = [
  { label: "Continue with Google", icon: Mail, tone: "bg-white text-slate-900 border-slate-200" },
  { label: "Continue with Microsoft", icon: LayoutGrid, tone: "bg-[#eef6ff] text-[#0f4ea8] border-[#cfe0ff]" },
  { label: "Continue with Apple", icon: Apple, tone: "bg-slate-900 text-white border-slate-900" },
  { label: "Continue with Phone Number", icon: Phone, tone: "bg-emerald-50 text-emerald-700 border-emerald-200" },
];

const accountPerks = [
  "Track live trips and ETA updates",
  "Access transport requests and billing history",
  "Manage business, school, or rider profiles",
  "Receive alerts, confirmations, and support updates",
];

export default function LoginPage() {
  return (
    <article className="min-h-screen bg-[linear-gradient(135deg,#f5faf9_0%,#edf7f4_52%,#fff8ef_100%)] pb-24 pt-28">
      <div className="container-wide">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="overflow-hidden rounded-[3rem] bg-[linear-gradient(135deg,#062c30_0%,#0f766e_52%,#0f172a_100%)] px-8 py-10 text-white shadow-2xl lg:px-12 lg:py-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white/80 ring-1 ring-white/15">
              <ShieldCheck size={14} />
              NVS Account Access
            </div>
            <h1 className="mt-6 max-w-2xl text-4xl font-bold tracking-tight lg:text-5xl">
              Sign in to the NVS portal for trips, alerts, and transport account access.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75">
              This is a dummy sign-in page designed to look like a complete account-access experience for schools, companies, riders, and admins.
            </p>

            <div className="mt-10 grid gap-4">
              {accountPerks.map((perk) => (
                <div key={perk} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-cyan-200" />
                  <p className="text-sm font-medium text-white/85">{perk}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[3rem] border border-slate-200 bg-white p-8 shadow-2xl lg:p-12">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.26em] text-primary">Portal Login</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Welcome back</h2>
              </div>
              <Link
                to="/contact"
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-primary hover:text-primary"
              >
                Need help?
              </Link>
            </div>

            <div className="mt-8 grid gap-3">
              {signInMethods.map((method) => (
                <button
                  key={method.label}
                  type="button"
                  className={`flex items-center justify-center gap-3 rounded-2xl border px-5 py-4 text-sm font-bold transition hover:-translate-y-0.5 ${method.tone}`}
                >
                  <method.icon size={18} />
                  {method.label}
                </button>
              ))}
            </div>

            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">or sign in with email</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <form className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                  Email Address
                </span>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <Mail size={18} className="text-slate-400" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="w-full bg-transparent text-sm text-slate-900 outline-none"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                  Password
                </span>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <LockKeyhole size={18} className="text-slate-400" />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full bg-transparent text-sm text-slate-900 outline-none"
                  />
                </div>
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <label className="flex items-center gap-3 text-sm text-slate-600">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
                  Remember password
                </label>
                <a href="#" className="text-sm font-bold text-primary transition hover:text-primary-dark">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-slate-900 px-6 py-4 text-sm font-bold text-white transition hover:bg-primary"
              >
                Sign In
              </button>
            </form>

            <div className="mt-8 rounded-[2rem] border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <UserRound size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Don&apos;t have an account?</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    Create a dummy portal account for admins, parents, corporate teams, or riders.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary-dark"
                    >
                      Create Account
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-primary hover:text-primary"
                    >
                      Sign Up with Phone
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-xs font-medium text-slate-500">
              By continuing, you agree to the dummy portal terms, privacy policy, and account verification process.
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
