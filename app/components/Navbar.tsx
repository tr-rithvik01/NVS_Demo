import { useState, useEffect } from "react";
import { Link, useLocation } from "@remix-run/react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "~/lib/utils";
import { motion, AnimatePresence } from "motion/react";

const navItems = [
  { name: "Home", path: "/" },
  {
    name: "About",
    path: "/about",
    children: [
      { name: "Vision & Values", path: "/about/vision-values" },
      { name: "Our Team", path: "/about/our-team" },
      { name: "Community", path: "/about/community" },
      { name: "Careers", path: "/about/careers" },
    ],
  },
  {
    name: "Services",
    path: "/services",
    children: [
      { name: "School Bus Services", path: "/services/school-bus-services" },
      { name: "Corporate Transport", path: "/services/corporate-transport" },
      { name: "Cab Rental Services", path: "/services/cab-rental-services" },
      { name: "Comparison", path: "/services/comparison" },
    ],
  },
  { name: "Tools", path: "/tools" },
  { name: "Technology", path: "/technology" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-white/80 backdrop-blur-md border-black/5 py-3"
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <img 
              src="/nvs-logo.svg" 
              alt="NVS Travel Solutions" 
              className="h-12 w-auto group-hover:scale-105 transition-transform"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
                    location.pathname === item.path ? "text-primary" : "text-slate-600"
                  )}
                >
                  {item.name}
                  {item.children && <ChevronDown size={14} className="opacity-50" />}
                </Link>
                {item.children && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-black/5 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 p-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.path}
                        className="block px-4 py-2 text-sm text-slate-600 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/login"
              className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 transition-all hover:border-primary hover:text-primary"
            >
              Login
            </Link>
            <Link
              to="/contact"
              className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-emerald-600 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-black/5 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.path}
                    className="block px-3 py-3 text-base font-medium text-slate-900 hover:bg-primary/5 hover:text-primary rounded-lg"
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="pl-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.path}
                          className="block px-3 py-2 text-sm text-slate-600 hover:text-primary"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3">
                <Link
                  to="/login"
                  className="block rounded-lg border border-slate-200 px-3 py-3 text-base font-medium text-slate-900 hover:border-primary hover:text-primary"
                >
                  Login
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
