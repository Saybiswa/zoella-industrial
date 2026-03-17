import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronUp,
  Facebook,
  Factory,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Package,
  Phone,
  Search,
  Star,
  Sun,
  Twitter,
  Users,
  X,
  ZoomIn,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  badge?: string;
}

interface StatItem {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Mixed Flow Inline Fan CMF-500",
    category: "Electric Fans",
    description:
      "Caryaire CMF-500 mixed flow fan for efficient ventilation. Suitable for duct installations with high airflow and low noise.",
    image: "/assets/uploads/image-5-6.png",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Circular Inline Fan CIF-1000",
    category: "Electric Fans",
    description:
      "Caryaire CIF-1000 circular inline fan with insulated casing. Ideal for kitchen exhaust and commercial HVAC systems.",
    image: "/assets/uploads/image-5-6.png",
    badge: "",
  },
  {
    id: 3,
    name: "Kitchen Exhaust Cabinet Fan",
    category: "Electric Fans",
    description:
      "Caryaire CLF kitchen exhaust and cabinet fan. Effective & energy efficient for large commercial kitchens.",
    image: "/assets/uploads/image-5-6.png",
    badge: "New",
  },
  {
    id: 4,
    name: "Hi-Wall Hydronic Fan Coil Unit",
    category: "Fan Coil Unit",
    description:
      "Caryaire CLFW Hi-Wall Hydronic Fan Coil Unit. Available in 40 Hi-Wall and 60 Hi-Wall variants. Quiet and efficient.",
    image: "/assets/uploads/image-2-3.png",
    badge: "Popular",
  },
  {
    id: 5,
    name: "Cassette Air Conditioner MC504",
    category: "Air Conditioner",
    description:
      "Caryaire MC504 Cassette Air Conditioner for commercial spaces. 4-way airflow distribution and energy-efficient operation.",
    image: "/assets/uploads/image-4-5.png",
    badge: "",
  },
  {
    id: 6,
    name: "Cassette Air Conditioner MC508",
    category: "Air Conditioner",
    description:
      "Caryaire MC508 Cassette AC, higher capacity model for large commercial and industrial spaces.",
    image: "/assets/uploads/image-4-5.png",
    badge: "",
  },
  {
    id: 7,
    name: "Propeller Fan Industrial",
    category: "Propeller Fans",
    description:
      "Caryaire industrial propeller fan for wall and roof mounting. Aluminium alloy blades, robust motor, ideal for warehouses.",
    image: "/assets/uploads/image-4-5.png",
    badge: "",
  },
  {
    id: 8,
    name: "Wet Dry Vacuum Cleaner WD-80",
    category: "Vacuum Cleaner",
    description:
      "80L industrial wet-dry stainless steel vacuum cleaner. Kruger make. From 80 to 21 Wet Dry vacuum cleaner range.",
    image: "/assets/uploads/image-1.png",
    badge: "New",
  },
  {
    id: 9,
    name: "Ball Valve DN50 Stainless Steel",
    category: "Metal Valves",
    description:
      "N-Advance full-bore stainless steel ball valve. PN40 rated, suitable for water, oil, and gas applications.",
    image: "/assets/uploads/image-5-6.png",
    badge: "",
  },
  {
    id: 10,
    name: "Butterfly Valve Flanged",
    category: "Metal Valves",
    description:
      "N-Advance flanged butterfly valve. Double plate check valve and balancing valve also available.",
    image: "/assets/uploads/image-5-6.png",
    badge: "",
  },
  {
    id: 11,
    name: "Labman Ultrasonic Cleaner LMUC6D",
    category: "Ultrasonic Cleaner",
    description:
      "Labman LMUC6D digital ultrasonic cleaner / sonicator. BMAN Scientific Instruments precision cleaning solution.",
    image: "/assets/uploads/image-2-3.png",
    badge: "New",
  },
  {
    id: 12,
    name: "Weller WSD1000 Soldering Station",
    category: "Soldering Station",
    description:
      "Weller WSD1000 Digital Soldering Station. Professional-grade precision soldering for electronics manufacturing.",
    image: "/assets/uploads/image-1.png",
    badge: "",
  },
  {
    id: 13,
    name: "RFT-V3 Reverse Power Relay",
    category: "Electricals",
    description:
      "RFT-V3 Reverse Power Relay from Nodia. Advanced electrical protection relay for industrial power systems.",
    image: "/assets/uploads/image-3-4.png",
    badge: "",
  },
  {
    id: 14,
    name: "IFM Digital Pressure Sensor",
    category: "Electricals",
    description:
      "IFM PM2224 Digital Pressure Sensor. High accuracy industrial pressure measurement for automation systems.",
    image: "/assets/uploads/image-1-2.png",
    badge: "Certified",
  },
  {
    id: 15,
    name: "Cotton Hand Gloves",
    category: "Safety Items",
    description:
      "Industrial cotton hand gloves. Leading range of custom hand gloves from Nodia. Available in bulk quantities.",
    image: "/assets/uploads/image-1-2.png",
    badge: "",
  },
  {
    id: 16,
    name: "Fire Extinguisher 9L Water",
    category: "Safety Items",
    description:
      "Base Fire 9-litre water fire extinguisher. Suitable for use on free-burning fires. ISI certified.",
    image: "/assets/uploads/image-3-4.png",
    badge: "Certified",
  },
];

const CATEGORIES = [
  "All",
  "Electric Fans",
  "Fan Coil Unit",
  "Air Conditioner",
  "Propeller Fans",
  "Vacuum Cleaner",
  "Metal Valves",
  "Ultrasonic Cleaner",
  "Soldering Station",
  "Electricals",
  "Safety Items",
];

const FAQ_ITEMS = [
  {
    q: "What industries do you serve?",
    a: "We serve manufacturing, oil & gas, HVAC, pharmaceutical, food processing, marine, and construction industries across 50+ countries worldwide.",
  },
  {
    q: "Do you offer custom OEM solutions?",
    a: "Yes, we provide full OEM/ODM services. Our engineering team can design and manufacture products to your exact specifications with short lead times.",
  },
  {
    q: "What certifications do your products hold?",
    a: "Our products carry CE, UL, ISO 9001:2015, API 6D, ATEX, and RoHS certifications. Specific certificates are available on request per product.",
  },
  {
    q: "What is your minimum order quantity (MOQ)?",
    a: "MOQ varies by product category. Standard items typically start from 10 units, while custom orders may vary. Contact our sales team for exact MOQs.",
  },
  {
    q: "Do you provide after-sales support and spare parts?",
    a: "We offer 24/7 technical support, on-site commissioning, preventive maintenance contracts, and a full range of genuine spare parts with a 12-month warranty.",
  },
  {
    q: "What are your lead times for standard orders?",
    a: "Standard stock items ship within 3-5 business days. Custom or bulk orders typically require 4-8 weeks depending on complexity and volume.",
  },
];

// ─── Counter Hook ─────────────────────────────────────────────────────────────
function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  item,
  startCount,
}: { item: StatItem; startCount: boolean }) {
  const count = useCounter(item.value, 2000, startCount);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center p-8 rounded-2xl bg-card border border-border shadow-sm"
    >
      <div className="mb-4 p-3 rounded-xl bg-accent/10 text-accent">
        {item.icon}
      </div>
      <div className="text-4xl font-bold text-foreground font-display">
        {count}
        {item.suffix}
      </div>
      <div className="mt-2 text-sm text-muted-foreground text-center">
        {item.label}
      </div>
    </motion.div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({
  product,
  index,
  onZoom,
}: { product: Product; index: number; onZoom: (p: Product) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
      className="product-card bg-card border border-border rounded-2xl overflow-hidden"
      data-ocid={`product.item.${index + 1}`}
    >
      <div className="relative group overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs">
            {product.badge}
          </Badge>
        )}
        <button
          type="button"
          onClick={() => onZoom(product)}
          className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background"
          aria-label="Zoom image"
        >
          <ZoomIn className="w-4 h-4 text-foreground" />
        </button>
      </div>
      <div className="p-5">
        <div className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wide">
          {product.category}
        </div>
        <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>
        <Button
          size="sm"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          data-ocid="product.view_details.button"
          onClick={() => onZoom(product)}
        >
          View Details
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxProduct, setLightboxProduct] = useState<Product | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSuccess, setFormSuccess] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Preloader
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  // Dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Scroll events
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
      if (statsRef.current) {
        const rect = statsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) setStatsVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  }, []);

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const validateForm = () => {
    const errors = { name: "", email: "", message: "" };
    let valid = true;
    if (!formData.name.trim()) {
      errors.name = "Name is required";
      valid = false;
    }
    if (
      !formData.email.trim() ||
      !/^[\w.-]+@[\w.-]+\.\w+$/.test(formData.email)
    ) {
      errors.email = "Valid email is required";
      valid = false;
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errors.message = "Message must be at least 10 characters";
      valid = false;
    }
    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setFormSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFormSuccess(false), 5000);
    }
  };

  const STATS: StatItem[] = [
    {
      icon: <Package className="w-6 h-6" />,
      value: 200,
      suffix: "+",
      label: "Products Available",
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: 500,
      suffix: "+",
      label: "Satisfied Clients",
    },
    {
      icon: <Star className="w-6 h-6" />,
      value: 15,
      suffix: "+",
      label: "Years Experience",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      value: 10,
      suffix: "+",
      label: "Countries Served",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Preloader ────────────────────────────────────────── */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
          >
            <div className="relative w-16 h-16 mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-border" />
              <div className="absolute inset-0 rounded-full border-4 border-t-accent preloader-ring" />
            </div>
            <div className="text-xl font-bold text-foreground font-display tracking-wide">
              Zoella Industrial
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Loading premium solutions...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Header ───────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              type="button"
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => scrollToSection("home")}
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Factory className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground font-display tracking-tight">
                Zoella <span className="text-brand-orange">Industrial</span>
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {["home", "products", "about", "contact"].map((id) => (
                <button
                  type="button"
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="nav-link text-sm font-medium capitalize text-muted-foreground hover:text-foreground transition-colors pb-1"
                  data-ocid={`nav.${id}.link`}
                >
                  {id === "about"
                    ? "About Us"
                    : id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              ))}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="hidden md:flex bg-accent text-accent-foreground hover:bg-accent/90 text-xs"
                onClick={() => scrollToSection("contact")}
                data-ocid="nav.contact_supplier.button"
              >
                Contact Supplier
              </Button>
              <button
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Toggle dark mode"
                data-ocid="nav.dark_mode.toggle"
              >
                {darkMode ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
              <button
                type="button"
                className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-t border-border bg-background"
            >
              <div className="px-4 py-3 flex flex-col gap-2">
                {["home", "products", "about", "contact"].map((id) => (
                  <button
                    type="button"
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="text-left py-2 text-sm font-medium capitalize text-muted-foreground hover:text-foreground"
                    data-ocid={`nav.${id}.link`}
                  >
                    {id === "about"
                      ? "About Us"
                      : id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                ))}
                <Button
                  size="sm"
                  className="mt-2 bg-accent text-accent-foreground"
                  onClick={() => scrollToSection("contact")}
                  data-ocid="nav.contact_supplier.button"
                >
                  Contact Supplier
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section
          id="home"
          className="relative min-h-screen flex items-center hero-mesh industrial-pattern pt-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Badge className="mb-6 bg-accent/20 text-accent border-accent/30 text-xs font-semibold tracking-widest uppercase">
                  Trusted Industrial Partner Since 2004
                </Badge>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 font-display"
              >
                Premium
                <span className="block text-brand-orange">Industrial</span>
                Solutions
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-lg text-white/70 mb-10 leading-relaxed max-w-xl"
              >
                From precision valves to high-performance ventilation systems —
                Zoella Industrial delivers certified, reliable equipment for the
                world's most demanding environments.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8 font-semibold"
                  onClick={() => scrollToSection("products")}
                  data-ocid="hero.primary.button"
                >
                  Explore Products
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 text-base px-8"
                  onClick={() => scrollToSection("contact")}
                  data-ocid="hero.secondary.button"
                >
                  Get a Quote
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Decorative grid lines */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* ── Stats ────────────────────────────────────────────── */}
        <section ref={statsRef} className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {STATS.map((item) => (
                <StatCard
                  key={item.label}
                  item={item}
                  startCount={statsVisible}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Products ─────────────────────────────────────────── */}
        <section id="products" className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20 text-xs tracking-widest uppercase">
                Our Range
              </Badge>
              <h2 className="text-4xl font-bold text-foreground font-display mb-4">
                Product Catalogue
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                500+ industrial products engineered to international standards,
                ready for global deployment.
              </p>
            </motion.div>

            {/* Search */}
            <div className="max-w-md mx-auto mb-8 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-ocid="products.search.input"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                  data-ocid="products.category.tab"
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={i}
                    onZoom={setLightboxProduct}
                  />
                ))}
              </div>
            ) : (
              <div
                className="text-center py-20"
                data-ocid="products.empty_state"
              >
                <Package className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground text-lg">
                  No products found for your search.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className="mt-4 text-sm text-accent hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── About ────────────────────────────────────────────── */}
        <section id="about" className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="mb-4 bg-accent/10 text-accent border-accent/20 text-xs tracking-widest uppercase">
                  Our Story
                </Badge>
                <h2 className="text-4xl font-bold text-foreground font-display mb-6 leading-tight">
                  15 Years of Industrial
                  <span className="text-brand-orange"> Excellence</span>
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Founded in Noida, Uttar Pradesh, Zoella Marketing And Infra
                  Solution is a trusted supplier of industrial equipment —
                  specializing in HVAC systems, industrial fans, safety
                  equipment, and electrical components. We serve clients across
                  India and international markets with quality-assured products
                  from leading global brands.
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  From Caryaire fans and fan coil units to IFM sensors, Weller
                  soldering stations, and Labman ultrasonic cleaners — we
                  source, supply, and support a comprehensive range of
                  industrial solutions for businesses of all sizes.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      title: "HVAC Specialists",
                      desc: "Fans, fan coil units & air conditioners",
                    },
                    {
                      title: "Safety Equipment",
                      desc: "Gloves, fire extinguishers & more",
                    },
                    {
                      title: "Electrical Components",
                      desc: "Sensors, relays & soldering tools",
                    },
                    {
                      title: "Trusted Brands",
                      desc: "Caryaire, IFM, Weller, Labman & more",
                    },
                  ].map((val) => (
                    <div
                      key={val.title}
                      className="p-4 rounded-xl bg-card border border-border"
                    >
                      <div className="font-semibold text-foreground text-sm mb-1">
                        {val.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {val.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden bg-primary h-96">
                  <div className="absolute inset-0 hero-mesh opacity-80" />
                  <div className="absolute inset-0 industrial-pattern" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center">
                    <Factory className="w-20 h-20 mb-4 text-white/60" />
                    <div className="text-3xl font-bold font-display">
                      Zoella Industrial
                    </div>
                    <div className="text-white/70 mt-2">
                      Precision. Performance. Partnership.
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-4 w-full max-w-xs">
                      {["CE", "UL", "ISO", "API", "ATEX", "RoHS"].map(
                        (cert) => (
                          <div
                            key={cert}
                            className="rounded-lg bg-white/10 px-2 py-1 text-xs text-white/80 text-center font-semibold"
                          >
                            {cert}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <section className="py-24 bg-muted/30">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20 text-xs tracking-widest uppercase">
                FAQ
              </Badge>
              <h2 className="text-4xl font-bold text-foreground font-display">
                Common Questions
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Accordion type="single" collapsible className="space-y-3">
                {FAQ_ITEMS.map((item, i) => (
                  <AccordionItem
                    key={item.q}
                    value={`faq-${i}`}
                    className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-accent/40"
                  >
                    <AccordionTrigger className="text-left font-medium text-foreground hover:text-accent hover:no-underline py-5">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* ── Contact ──────────────────────────────────────────── */}
        <section id="contact" className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20 text-xs tracking-widest uppercase">
                Get In Touch
              </Badge>
              <h2 className="text-4xl font-bold text-foreground font-display mb-4">
                Contact Us
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Ready to discuss your requirements? Our team responds within 24
                hours.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                {[
                  {
                    icon: <Phone className="w-5 h-5" />,
                    label: "Phone",
                    value: "+86 755 8888 9999",
                    href: "tel:+867558888999",
                  },
                  {
                    icon: <Mail className="w-5 h-5" />,
                    label: "Email",
                    value: "sales@zoellaindustrial.com",
                    href: "mailto:sales@zoellaindustrial.com",
                  },
                  {
                    icon: <MapPin className="w-5 h-5" />,
                    label: "Address",
                    value:
                      "Building 7, Shenzhen Industrial Park, Guangdong, China 518000",
                    href: "#",
                  },
                ].map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-start gap-4 group"
                  >
                    <div className="mt-1 p-3 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">
                        {info.label}
                      </div>
                      <div className="text-foreground font-medium">
                        {info.value}
                      </div>
                    </div>
                  </a>
                ))}

                <a
                  href="https://wa.me/867558888999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <form onSubmit={handleSubmit} className="space-y-5">
                  <AnimatePresence>
                    {formSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 text-sm"
                        data-ocid="contact.success_state"
                      >
                        ✓ Message sent successfully! We'll respond within 24
                        hours.
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Full Name
                    </label>
                    <Input
                      id="name"
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={formErrors.name ? "border-destructive" : ""}
                      data-ocid="contact.name.input"
                    />
                    {formErrors.name && (
                      <p
                        className="mt-1 text-xs text-destructive"
                        data-ocid="contact.name.error_state"
                      >
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={formErrors.email ? "border-destructive" : ""}
                      data-ocid="contact.email.input"
                    />
                    {formErrors.email && (
                      <p
                        className="mt-1 text-xs text-destructive"
                        data-ocid="contact.email.error_state"
                      >
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Describe your requirements..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className={formErrors.message ? "border-destructive" : ""}
                      data-ocid="contact.message.textarea"
                    />
                    {formErrors.message && (
                      <p
                        className="mt-1 text-xs text-destructive"
                        data-ocid="contact.message.error_state"
                      >
                        {formErrors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
                    data-ocid="contact.submit.button"
                  >
                    Send Message
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <Factory className="w-5 h-5 text-accent-foreground" />
                </div>
                <span className="text-lg font-bold font-display">
                  Zoella Industrial
                </span>
              </div>
              <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-sm">
                Global leader in industrial equipment — fans, valves, HVAC
                systems, and precision cleaning solutions. Delivering
                performance you can count on.
              </p>
              <div className="flex gap-3 mt-6">
                {[
                  { icon: <Facebook className="w-4 h-4" />, href: "#" },
                  { icon: <Twitter className="w-4 h-4" />, href: "#" },
                  { icon: <Linkedin className="w-4 h-4" />, href: "#" },
                  { icon: <Instagram className="w-4 h-4" />, href: "#" },
                ].map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest text-primary-foreground/50">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {["Home", "Products", "About Us", "Contact"].map((link) => (
                  <li key={link}>
                    <button
                      type="button"
                      onClick={() =>
                        scrollToSection(link.toLowerCase().replace(" ", ""))
                      }
                      className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest text-primary-foreground/50">
                Products
              </h4>
              <ul className="space-y-2">
                {[
                  "Electric Fans",
                  "Fan Coil Units",
                  "Air Conditioners",
                  "Metal Valves",
                  "Ultrasonic Cleaners",
                ].map((p) => (
                  <li key={p}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCategory(p.replace("s", ""));
                        scrollToSection("products");
                      }}
                      className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors text-left"
                    >
                      {p}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/50 text-sm">
              © {new Date().getFullYear()} Zoella Industrial. All rights
              reserved.
            </p>
            <p className="text-primary-foreground/40 text-xs">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-foreground/70 underline transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* ── Lightbox ─────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setLightboxProduct(null)}
            data-ocid="products.modal"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl overflow-hidden max-w-lg w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={lightboxProduct.image}
                  alt={lightboxProduct.name}
                  className="w-full h-64 object-cover"
                />
                <button
                  type="button"
                  onClick={() => setLightboxProduct(null)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                  data-ocid="products.close_button"
                >
                  <X className="w-4 h-4" />
                </button>
                {lightboxProduct.badge && (
                  <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                    {lightboxProduct.badge}
                  </Badge>
                )}
              </div>
              <div className="p-6">
                <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-2">
                  {lightboxProduct.category}
                </div>
                <h3 className="text-xl font-bold text-foreground font-display mb-3">
                  {lightboxProduct.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {lightboxProduct.description}
                </p>
                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={() => {
                      setLightboxProduct(null);
                      scrollToSection("contact");
                    }}
                  >
                    Request Quote
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setLightboxProduct(null)}
                    data-ocid="products.cancel_button"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Back to Top ───────────────────────────────────────── */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-accent text-accent-foreground shadow-lg hover:bg-accent/90 transition-colors"
            aria-label="Back to top"
            data-ocid="nav.back_to_top.button"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
