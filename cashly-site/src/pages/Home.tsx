import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, CheckCircle2, TrendingUp, Shield, Smartphone, Zap, Download, Star, Target, Wallet, LayoutGrid, Quote } from "lucide-react";
import { Link } from "wouter";
import { DeviceMockup } from "@/components/DeviceMockup";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { InstallGuide } from "@/components/InstallGuide";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";

function useTypewriter(text: string, speed = 60, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);
  return { displayed, done };
}

const APP_URL = "https://sidhhrana.github.io/Cashly/";

const Logo = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">
    <rect width="32" height="32" rx="8" fill="#22c55e" fillOpacity="0.1" />
    <path d="M16 6V26" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
    <path d="M21 11.5C21 9.567 18.7614 8 16 8C13.2386 8 11 9.567 11 11.5C11 13.433 13.2386 15 16 15C18.7614 15 21 16.567 21 18.5C21 20.433 18.7614 22 16 22C13.2386 22 11 20.433 11 18.5" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 11.5L16 15" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function HeroHeading() {
  const line1 = "Your wealth,";
  const line2 = "simplified.";
  const { displayed: d1, done: done1 } = useTypewriter(line1, 55, 400);
  const { displayed: d2 } = useTypewriter(line2, 65, 400 + line1.length * 55 + 200);

  return (
    <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold font-display leading-[1.05] mb-5 sm:mb-8 min-h-[2.1em]">
      <span>
        {d1}
        {!done1 && (
          <span className="inline-block w-[3px] h-[0.85em] bg-white ml-1 align-middle animate-[blink_0.7s_step-end_infinite]" />
        )}
      </span>
      <br />
      <span className="text-gradient-green relative inline-block">
        {d2}
        {done1 && d2.length < line2.length && (
          <span className="inline-block w-[3px] h-[0.85em] bg-primary ml-1 align-middle animate-[blink_0.7s_step-end_infinite]" />
        )}
        {d2 === line2 && (
          <motion.span
            className="absolute -bottom-2 left-0 w-full h-1 bg-primary/50 blur-sm rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </span>
    </h1>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneSectionRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, 120]);
  const y2 = useTransform(scrollY, [0, 800], [0, -60]);

  const { scrollYProgress: phoneProgress } = useScroll({
    target: phoneSectionRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(phoneProgress, { stiffness: 60, damping: 20 });
  const pLeftX   = useTransform(smoothProgress, [0, 0.6], [-280, 0]);
  const pRightX  = useTransform(smoothProgress, [0, 0.6], [280, 0]);
  const pCenterY = useTransform(smoothProgress, [0, 0.6], [100, 0]);
  const pLeftRot  = useTransform(smoothProgress, [0, 0.6], [-18, -6]);
  const pRightRot = useTransform(smoothProgress, [0, 0.6], [18, 6]);
  const pOpacity  = useTransform(smoothProgress, [0, 0.2], [0, 1]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 overflow-x-hidden" ref={containerRef}>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="container mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Logo />
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight">Cashly</span>
          </div>
          <a href="#install" data-testid="nav-get-app">
            <Button className="bg-primary text-black hover:bg-primary/90 font-semibold px-4 sm:px-6 text-sm sm:text-base h-9 sm:h-10 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all">
              Get the App
            </Button>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 flex flex-col justify-center overflow-hidden min-h-[100dvh]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <HeroHeading />

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-7 sm:mb-10 max-w-lg leading-relaxed">
                The free alternative to every paid money tracker. Clean, personal finance — zero cost, zero BS.
              </p>

              <div className="flex flex-col xs:flex-row sm:flex-row gap-3">
                <a href="#install" data-testid="hero-download">
                  <Button size="lg" className="bg-primary text-black hover:bg-primary/90 h-12 sm:h-13 px-6 sm:px-8 text-sm sm:text-base font-semibold shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:shadow-[0_0_50px_rgba(34,197,94,0.5)] transition-all w-full sm:w-auto">
                    Download Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a href="#install" data-testid="hero-how">
                  <Button size="lg" variant="outline" className="h-12 sm:h-13 px-6 sm:px-8 text-sm sm:text-base font-medium border-white/10 hover:bg-white/5 w-full sm:w-auto">
                    How it works
                  </Button>
                </a>
              </div>

              <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-3 sm:gap-6 border-t border-white/10 pt-6 sm:pt-10">
                <div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white mb-1">
                    $<AnimatedNumber value={0} duration={1500} />
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">Monthly fee</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white mb-1">
                    <AnimatedNumber value={100} duration={1500} />%
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">Ad-free</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white mb-1">
                    <AnimatedNumber value={0} duration={1500} />
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">Hidden limits</div>
                </div>
              </div>
            </motion.div>

            {/* Phone mockup — smaller on mobile */}
            <div className="relative h-[280px] sm:h-[480px] lg:h-[700px] flex justify-center items-center">
              <div className="absolute inset-0 bg-primary/20 blur-[80px] sm:blur-[120px] rounded-full animate-pulse-glow" />

              <motion.div style={{ y: y1 }} className="z-20 absolute">
                <motion.div
                  animate={{ y: [-10, 10, -10], rotateZ: [-4, -6, -4] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="relative rounded-[32px] sm:rounded-[40px] border-[6px] sm:border-[8px] border-zinc-900 bg-zinc-950 shadow-2xl overflow-hidden ring-1 ring-white/10 aspect-[9/19] w-[160px] sm:w-[240px] lg:w-[280px]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-zinc-900 rounded-b-2xl z-20" />
                    <img src="/app-home.png" alt="Cashly Home" className="w-full h-full object-cover" />
                  </div>
                </motion.div>
              </motion.div>

              <motion.div style={{ y: y2 }} className="z-10 absolute right-4 sm:right-10 top-10 sm:top-20 opacity-60 hidden sm:block">
                <motion.div
                  animate={{ y: [10, -10, 10], rotateZ: [4, 6, 4] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="relative rounded-[32px] sm:rounded-[40px] border-[6px] sm:border-[8px] border-zinc-900 bg-zinc-950 shadow-2xl overflow-hidden ring-1 ring-white/10 aspect-[9/19] w-[150px] sm:w-[230px] lg:w-[260px]">
                    <img src="/app-transaction.png" alt="Cashly Transaction" className="w-full h-full object-cover" />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Interface Showcase — horizontal scroll */}
      <section className="py-12 sm:py-20 bg-zinc-950 border-y border-white/5 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-center">Every screen, crafted.</h2>
        </div>
        <div className="flex gap-4 sm:gap-8 px-4 sm:px-6 pb-6 sm:pb-10 w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar">
          {[
            { src: "/app-splash.png", alt: "Splash" },
            { src: "/app-home.png", alt: "Home" },
            { src: "/app-transaction.png", alt: "Add Transaction" },
            { src: "/app-analytics.png", alt: "Analytics" },
            { src: "/app-planning.png", alt: "Planning" },
            { src: "/app-settings.png", alt: "Settings" }
          ].map((screen, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.08 }}
              className="shrink-0 snap-center"
            >
              <div className="w-[180px] sm:w-[240px] rounded-[24px] sm:rounded-[32px] overflow-hidden border border-white/10 shadow-2xl bg-black">
                <img src={screen.src} alt={screen.alt} className="w-full h-auto object-cover" />
              </div>
              <p className="text-center text-xs text-muted-foreground mt-2">{screen.alt}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Phone Parade — scroll-driven (hidden on mobile, too heavy) */}
      <section
        ref={phoneSectionRef}
        className="py-20 sm:py-32 lg:py-40 relative overflow-hidden bg-background"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12 sm:mb-20"
          >
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-display mb-3 sm:mb-5">Everything in one app.</h2>
            <p className="text-base sm:text-xl text-muted-foreground">Built for real people — not a subscription fee.</p>
          </motion.div>

          <motion.div style={{ opacity: pOpacity }} className="flex justify-center items-end gap-4 sm:gap-10 h-[320px] sm:h-[420px] lg:h-[520px]">
            <motion.div style={{ x: pLeftX, rotate: pLeftRot }} className="hidden sm:block shrink-0">
              <div className="relative rounded-[32px] border-[8px] border-zinc-900 bg-zinc-950 shadow-2xl overflow-hidden ring-1 ring-white/10 aspect-[9/19] w-[160px] lg:w-[210px]"
                   style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.8), 0 0 40px rgba(34,197,94,0.1)" }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-zinc-900 rounded-b-xl z-10" />
                <img src="/app-analytics.png" alt="Analytics" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            <motion.div style={{ y: pCenterY }} className="shrink-0 z-10">
              <div className="relative rounded-[36px] sm:rounded-[40px] border-[8px] sm:border-[10px] border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden ring-1 ring-primary/20 aspect-[9/19] w-[180px] sm:w-[240px] lg:w-[280px]"
                   style={{ boxShadow: "0 0 60px rgba(34,197,94,0.25), 0 60px 120px rgba(0,0,0,0.9)" }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-zinc-800 rounded-b-2xl z-10" />
                <img src="/app-home.png" alt="Home" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            <motion.div style={{ x: pRightX, rotate: pRightRot }} className="hidden sm:block shrink-0">
              <div className="relative rounded-[32px] border-[8px] border-zinc-900 bg-zinc-950 shadow-2xl overflow-hidden ring-1 ring-white/10 aspect-[9/19] w-[160px] lg:w-[210px]"
                   style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.8), 0 0 40px rgba(34,197,94,0.1)" }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-zinc-900 rounded-b-xl z-10" />
                <img src="/app-planning.png" alt="Planning" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-14 sm:py-24 lg:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-display mb-3 sm:mb-5">Powerful, but effortless.</h2>
            <p className="text-muted-foreground text-base sm:text-xl">Everything you need — in an interface that gets out of your way.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {[
              { title: "Smart Analytics", desc: "Beautiful charts that show exactly where your money goes.", icon: TrendingUp },
              { title: "Savings Jars", desc: "Create goals and watch your money grow towards them.", icon: Target },
              { title: "Multiple Wallets", desc: "Track cash, bank accounts, and cards in one place.", icon: Wallet },
              { title: "Category Breakdown", desc: "Auto-sorted categories so nothing slips through.", icon: LayoutGrid },
              { title: "PWA — No App Store", desc: "Install in seconds on iOS or Android.", icon: Smartphone },
              { title: "Export Your Data", desc: "Download your full history as CSV anytime.", icon: Download },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glow-card group p-4 sm:p-6"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-5 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="text-base sm:text-xl font-bold font-display mb-1 sm:mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Dive: Analytics */}
      <section className="py-14 sm:py-24 lg:py-32 relative overflow-hidden bg-zinc-950 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 flex justify-center relative">
              <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full" />
              <DeviceMockup src="/app-analytics.png" alt="Analytics Screen" floatOffset={10} />
            </div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary mb-4 sm:mb-6">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold font-display mb-3 sm:mb-5">
                Understand your spending habits.
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Stop wondering where your paycheck went. Cashly breaks down spending into beautiful, easy-to-read categories.
              </p>
              <ul className="space-y-4 sm:space-y-5">
                {[
                  { title: "Visual breakdowns", desc: "Donut charts that make sense instantly." },
                  { title: "Monthly comparisons", desc: "See if you're spending more or less than last month." },
                  { title: "Spike detection", desc: "Identify problem areas before they drain your wallet." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-base font-bold text-white mb-0.5">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Deep Dive: Planning */}
      <section className="py-14 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary mb-4 sm:mb-6">
                <Target className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold font-display mb-3 sm:mb-5">
                Plan for the future, without the stress.
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Set budgets that stick. Create savings jars for your next trip, a gadget, or a rainy day fund.
              </p>
              <ul className="space-y-4 sm:space-y-5">
                {[
                  { title: "Flexible Budgets", desc: "Set limits per category and get notified when you're close." },
                  { title: "Savings Jars", desc: "Visual progress bars keep you motivated to save more." },
                  { title: "Guilt-free spending", desc: "Know exactly how much is safe to spend today." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-base font-bold text-white mb-0.5">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
            <div className="flex justify-center relative">
              <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full" />
              <DeviceMockup src="/app-planning.png" alt="Planning Screen" floatOffset={10} delay={0.5} />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 sm:py-24 bg-zinc-950 border-y border-white/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-display mb-2 sm:mb-4">People love free.</h2>
            <p className="text-muted-foreground text-base sm:text-lg">Join thousands who finally understand their money.</p>
          </div>

          {/* On mobile: horizontal scroll. On md+: grid */}
          <div className="flex md:grid md:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 snap-x snap-mandatory sm:snap-none hide-scrollbar">
            {[
              { text: "Finally a finance app that isn't trying to upsell me every 5 seconds. It does exactly what I need.", author: "Alex K.", role: "Student" },
              { text: "I cancelled my $10/mo subscription the day I found Cashly. The analytics are actually better.", author: "Sarah M.", role: "Freelancer" },
              { text: "No app store, just works. The dark mode is the best I've seen in any fintech app.", author: "David T.", role: "Developer" },
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-black border border-white/10 p-5 sm:p-7 rounded-2xl sm:rounded-3xl relative shrink-0 snap-center w-[80vw] sm:w-auto"
              >
                <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-primary text-primary" />)}
                </div>
                <p className="text-sm sm:text-base text-white mb-5 leading-relaxed">"{review.text}"</p>
                <div>
                  <div className="font-bold text-white text-sm">{review.author}</div>
                  <div className="text-xs text-muted-foreground">{review.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-14 sm:py-24 lg:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 text-sm">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="font-medium">The obvious choice</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-display mb-3">Why pay for your own data?</h2>
            <p className="text-muted-foreground text-sm sm:text-lg">Stop paying to track where your money goes.</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto rounded-2xl sm:rounded-[2rem] border border-white/10 overflow-hidden bg-black shadow-2xl relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

            <div className="grid grid-cols-3 border-b border-white/10 bg-white/5 relative z-10">
              <div className="p-3 sm:p-5 text-xs sm:text-sm font-semibold text-muted-foreground flex items-center">Features</div>
              <div className="p-3 sm:p-5 text-center font-bold text-white border-l border-white/10 bg-primary/10 flex items-center justify-center">
                <span className="text-base sm:text-xl font-display text-primary">Cashly</span>
              </div>
              <div className="p-3 sm:p-5 text-center font-semibold text-muted-foreground border-l border-white/10 flex items-center justify-center">
                <span className="text-sm sm:text-xl font-display">Others</span>
              </div>
            </div>

            <div className="relative z-10">
              {[
                { name: "Monthly Cost", cashly: "$0 forever", other: "~$8-12/mo" },
                { name: "Ad-Free", cashly: true, other: "Paid only" },
                { name: "Unlimited Transactions", cashly: true, other: "Limited" },
                { name: "CSV Export", cashly: true, other: "Paid only" }
              ].map((feature, i) => (
                <div key={i} className="grid grid-cols-3 border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors">
                  <div className="p-3 sm:p-5 text-xs sm:text-sm font-medium">{feature.name}</div>
                  <div className="p-3 sm:p-5 text-center border-l border-white/10 flex items-center justify-center bg-primary/5">
                    {typeof feature.cashly === "boolean"
                      ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary drop-shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
                      : <span className="font-bold text-primary text-xs sm:text-sm">{feature.cashly}</span>}
                  </div>
                  <div className="p-3 sm:p-5 text-center border-l border-white/10 flex items-center justify-center opacity-50 text-xs sm:text-sm">
                    {typeof feature.other === "boolean"
                      ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      : <span>{feature.other}</span>}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <InstallGuide />

      {/* CTA Section */}
      <section className="py-14 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl aspect-square bg-primary/20 blur-[100px] rounded-full pointer-events-none"
        />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ scale: 0.97, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center bg-black/60 backdrop-blur-2xl border border-white/10 p-8 sm:p-14 rounded-3xl sm:rounded-[3rem] shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

            <h2 className="text-3xl sm:text-5xl font-bold font-display mb-4 sm:mb-6 leading-tight">
              Take control of your money <span className="text-gradient-green block mt-1">today.</span>
            </h2>
            <p className="text-sm sm:text-lg text-muted-foreground mb-7 sm:mb-10 leading-relaxed">
              No credit card. No hidden fees. Just a beautiful, powerful app.
            </p>
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" data-testid="cta-get-cashly">
              <Button size="lg" className="bg-primary text-black hover:bg-primary/90 h-13 sm:h-16 px-8 sm:px-12 text-base sm:text-xl font-bold shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_50px_rgba(34,197,94,0.6)] hover:-translate-y-1 transition-all rounded-full group">
                Get Cashly Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <div className="mt-5 flex items-center justify-center gap-4 text-xs sm:text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5" /> iOS</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5" /> Android</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> 100% Free</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 bg-black relative z-10">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="font-display font-bold text-lg tracking-tight">Cashly</span>
          </div>

          <div className="flex gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/privacy"><span data-testid="footer-privacy" className="hover:text-primary transition-colors cursor-pointer">Privacy</span></Link>
            <Link href="/terms"><span data-testid="footer-terms" className="hover:text-primary transition-colors cursor-pointer">Terms</span></Link>
            <a href="mailto:iamsidhh@gmail.com" data-testid="footer-contact" className="hover:text-primary transition-colors">Contact</a>
          </div>

          <div className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Cashly. Built for your wealth.
          </div>
        </div>
      </footer>
    </div>
  );
}
