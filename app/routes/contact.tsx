import type { MetaFunction } from "@remix-run/node";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { SEO } from "~/components/SEO";

export const meta: MetaFunction = () => {
  return [
    { title: "Contact Us | NVS Travel Solutions Bangalore" },
    { name: "description", content: "Get in touch with NVS Travel Solutions for school transportation inquiries, bus rentals, or career opportunities in Bangalore." },
  ];
};

const faqs = [
  { q: "How do I track my child's bus?", a: "You can use our mobile app to see real-time location and receive alerts." },
  { q: "Are your drivers background checked?", a: "Yes, all our drivers undergo rigorous background checks and training." },
  { q: "What areas do you cover?", a: "We cover most major residential and school zones across Bangalore." }
];

export default function Contact() {
  const officeMapQuery =
    "https://www.google.com/maps?q=No%203,%20Old%20No,%20120,%201st%20Cross%20Rd,%20S.G.%20Palya,%20Bengaluru,%20Karnataka%20560029&z=16&output=embed";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <article className="pt-32 pb-24">
      <SEO 
        title="Contact Us" 
        description="Get in touch with NVS Travel Solutions for school transportation inquiries, bus rentals, or career opportunities in Bangalore."
        schema={faqSchema}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24">
          <div>
            <h1 className="text-5xl font-bold text-slate-900 mb-8 tracking-tight">Let's Simplify Your <span className="text-primary">School Transport</span>.</h1>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed">
              Have questions about our services or need a custom quote? Our team is here to help you design the perfect transportation solution.
            </p>

            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-primary/5 text-primary rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <MapPin size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Our Offices</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    No 3, Old No, 120, 1st Cross Rd, S.G. Palya, Bengaluru, Karnataka 560029<br />
                    NO 57, 4th Floor, 13th Main, Jayanagar 4th Block (East), Bangalore – 560 011
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Mail size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Email Us</h3>
                  <div className="space-y-1 text-sm text-slate-500">
                    <p>General: <span className="font-bold text-slate-900">info@nvstravelsolutions.in</span></p>
                    <p>Business: <span className="font-bold text-slate-900">bd@nvstravelsolutions.in</span></p>
                  </div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Phone size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Call Us</h3>
                  <div className="space-y-1 text-sm text-slate-500">
                    <p>Office: <span className="font-bold text-slate-900">+91 80 4228 7279</span></p>
                    <p>Business: <span className="font-bold text-slate-900">+91 96060 66682</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-10 lg:p-16 rounded-[3rem] border border-slate-200 shadow-2xl relative"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subject</label>
                <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none">
                  <option>School Transportation Inquiry</option>
                  <option>Bus Rental Request</option>
                  <option>Career Opportunity</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Message</label>
                <textarea 
                  rows={5}
                  placeholder="How can we help you?"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-primary transition-all shadow-xl flex items-center justify-center gap-3 group"
              >
                Send Message <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </header>

        <section className="mb-24">
          <div className="overflow-hidden rounded-[3rem] border border-slate-200 bg-white shadow-2xl">
            <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="p-8 lg:p-12">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary">Office Location</p>
                <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
                  Visit the NVS office in Bengaluru
                </h2>
                <p className="mt-5 text-base leading-relaxed text-slate-600">
                  Use the live map to explore the area, zoom into the location, or open turn-by-turn directions in Google Maps.
                </p>

                <div className="mt-8 rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
                  <p className="text-sm font-bold text-slate-900">Primary Office</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    No 3, Old No, 120, 1st Cross Rd, S.G. Palya, Bengaluru, Karnataka 560029
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=No%203,%20Old%20No,%20120,%201st%20Cross%20Rd,%20S.G.%20Palya,%20Bengaluru,%20Karnataka%20560029"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:gap-3"
                  >
                    Open in Google Maps <MapPin size={16} />
                  </a>
                </div>
              </div>

              <div className="min-h-[24rem] border-t border-slate-200 lg:border-l lg:border-t-0">
                <iframe
                  title="NVS office location map"
                  src={officeMapQuery}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full min-h-[24rem] w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-32 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Common Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {faqs.map(faq => (
              <div key={faq.q} className="p-8 bg-white rounded-3xl border border-slate-100 text-left shadow-sm">
                <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-6">
                  <MessageSquare size={20} />
                </div>
                <h4 className="font-bold text-slate-900 mb-3">{faq.q}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
