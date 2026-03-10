import { Link } from "@remix-run/react";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const footerLinks = [
  {
    title: "About Us",
    links: [
      { name: "Vision & Values", path: "/about/vision-values" },
      { name: "Our Team", path: "/about/our-team" },
      { name: "Community", path: "/about/community" },
      { name: "Careers", path: "/about/careers" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "School Bus Services", path: "/services/school-bus-services" },
      { name: "Corporate Transport", path: "/services/corporate-transport" },
      { name: "Cab Rental Services", path: "/services/cab-rental-services" },
      { name: "Comparison", path: "/services/comparison" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { name: "Tools", path: "/tools" },
      { name: "Technology", path: "/technology" },
      { name: "Blog", path: "/blog" },
      { name: "Contact", path: "/contact" },
      { name: "Privacy Policy", path: "/privacy-policy" },
      { name: "Terms of Service", path: "/terms-of-service" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-slate-900 py-16 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="group mb-6 flex items-center space-x-2">
              <img
                src="/nvs-logo.svg"
                alt="NVS Travel Solutions"
                className="h-12 w-auto transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="mb-8 max-w-sm text-sm leading-relaxed">
              Delivering structured mobility across school bus services, corporate staff transport, and cab rental operations with safety-first processes and live visibility.
            </p>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-primary-light" />
                <span>No 3, Old No, 120, 1st Cross Rd, S.G. Palya, Bengaluru, Karnataka 560029</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-primary-light" />
                <span>+91 80 4228 7279</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-primary-light" />
                <span>info@nvstravelsolutions.in</span>
              </div>
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">
                {section.title}
              </h3>
              <ul className="space-y-4 text-sm">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="transition-colors hover:text-primary-light">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-xs">
            Copyright {new Date().getFullYear()} NVS Travel Solutions. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <a href="#" className="transition-colors hover:text-primary-light"><Facebook size={20} /></a>
            <a href="#" className="transition-colors hover:text-primary-light"><Twitter size={20} /></a>
            <a href="#" className="transition-colors hover:text-primary-light"><Linkedin size={20} /></a>
            <a href="#" className="transition-colors hover:text-primary-light"><Instagram size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
