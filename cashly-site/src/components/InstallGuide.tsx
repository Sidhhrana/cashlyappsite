import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Share2, PlusSquare, Home, CheckCircle2, Globe, MoreVertical, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const APP_URL = "https://sidhhrana.github.io/Cashly/";

type Platform = "ios" | "android";

interface Step {
  title: string;
  description: string;
  illustration: React.FC<{ active: boolean }>;
}

const SafariBrowser: React.FC<{ highlight?: "share" | "address" | "none"; active: boolean }> = ({ highlight = "none", active }) => (
  <svg viewBox="0 0 280 560" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="280" height="560" rx="36" fill="#0a0a0a" />
    <rect x="8" y="8" width="264" height="544" rx="30" fill="#111" />
    {/* Status bar */}
    <rect x="20" y="16" width="240" height="20" fill="transparent" />
    <text x="24" y="29" fill="#888" fontSize="11" fontFamily="system-ui">9:41</text>
    <rect x="220" y="18" width="40" height="14" rx="4" fill="#333" />
    {/* Top bar */}
    <rect x="0" y="44" width="280" height="52" fill="#1a1a1a" />
    {/* Address bar */}
    <rect
      x="16" y="52" width="200" height="30" rx="10"
      fill={highlight === "address" ? "rgba(34,197,94,0.15)" : "#2a2a2a"}
      stroke={highlight === "address" ? "#22c55e" : "transparent"}
      strokeWidth="1.5"
    />
    <text x="32" y="72" fill={highlight === "address" ? "#22c55e" : "#666"} fontSize="11" fontFamily="system-ui">
      sidhhrana.github.io/Cashly
    </text>
    {/* Share button */}
    <rect
      x="225" y="52" width="42" height="30" rx="8"
      fill={highlight === "share" ? "rgba(34,197,94,0.2)" : "transparent"}
    />
    <g transform="translate(239, 60)">
      <rect x="4" y="4" width="8" height="10" rx="2" fill={highlight === "share" ? "#22c55e" : "#888"} />
      <path d="M8 4 L8 0 M6 2 L8 0 L10 2" stroke={highlight === "share" ? "#22c55e" : "#888"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    {/* Mock webpage content */}
    <rect x="20" y="112" width="240" height="80" rx="12" fill="#1a1a1a" />
    <circle cx="50" cy="145" r="14" fill="rgba(34,197,94,0.2)" />
    <text x="46" y="149" fill="#22c55e" fontSize="12" fontFamily="system-ui" fontWeight="bold">$</text>
    <text x="72" y="143" fill="white" fontSize="13" fontFamily="system-ui" fontWeight="bold">Cashly</text>
    <text x="72" y="158" fill="#666" fontSize="10" fontFamily="system-ui">Your wealth, simplified.</text>
    <rect x="20" y="205" width="240" height="8" rx="4" fill="#1a1a1a" />
    <rect x="20" y="220" width="180" height="8" rx="4" fill="#1a1a1a" />
    <rect x="20" y="235" width="210" height="8" rx="4" fill="#1a1a1a" />
    {/* Bottom bar */}
    <rect x="0" y="496" width="280" height="64" fill="#1a1a1a" />
    {/* Pulse on share if active */}
    {highlight === "share" && active && (
      <>
        <circle cx="246" cy="67" r="18" fill="rgba(34,197,94,0.15)">
          <animate attributeName="r" values="14;22;14" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0;0.6" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </>
    )}
  </svg>
);

const ShareSheet: React.FC<{ highlight?: "add" | "none"; active: boolean }> = ({ highlight = "none", active }) => (
  <svg viewBox="0 0 280 560" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="280" height="560" rx="36" fill="#0a0a0a" />
    <rect x="8" y="8" width="264" height="544" rx="30" fill="#111" />
    {/* Dimmed bg */}
    <rect x="8" y="8" width="264" height="380" rx="30" fill="rgba(0,0,0,0.6)" />
    {/* Sheet */}
    <rect x="8" y="280" width="264" height="280" rx="24" fill="#1c1c1e" />
    {/* Handle */}
    <rect x="120" y="290" width="40" height="4" rx="2" fill="#48484a" />
    {/* App icon row */}
    {[0,1,2,3].map(i => (
      <g key={i} transform={`translate(${24 + i * 60}, 308)`}>
        <rect width="44" height="44" rx="10" fill={i === 0 ? "rgba(34,197,94,0.2)" : "#2c2c2e"} />
        {i === 0 && <text x="14" y="27" fill="#22c55e" fontSize="14" fontFamily="system-ui">$</text>}
        <text x={i === 0 ? 6 : 8} y="62" fill="#8e8e93" fontSize="9" fontFamily="system-ui">
          {["Copy", "Message", "Mail", "More"][i]}
        </text>
      </g>
    ))}
    {/* Action rows */}
    <rect x="16" y="378" width="248" height="1" fill="#38383a" />
    <g transform="translate(16, 379)">
      {[
        { label: "Add to Home Screen", icon: "home", highlight: highlight === "add" },
        { label: "Add Bookmark", icon: "bookmark", highlight: false },
        { label: "Find on Page", icon: "find", highlight: false },
      ].map((item, i) => (
        <g key={i} transform={`translate(0, ${i * 50})`}>
          <rect
            width="248" height="50"
            fill={item.highlight ? "rgba(34,197,94,0.08)" : "transparent"}
          />
          <rect x="0" y="49" width="248" height="1" fill="#38383a" />
          <rect
            x="12" y="13" width="24" height="24" rx="6"
            fill={item.highlight ? "rgba(34,197,94,0.25)" : "#2c2c2e"}
          />
          {item.icon === "home" && (
            <path d="M24 17L20 21H28L24 17Z M21 21V29H27V21" stroke={item.highlight ? "#22c55e" : "#666"} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          )}
          <text x="44" y="30" fill={item.highlight ? "#22c55e" : "white"} fontSize="13" fontFamily="system-ui" fontWeight={item.highlight ? "600" : "400"}>
            {item.label}
          </text>
          {item.highlight && active && (
            <rect width="248" height="50" fill="rgba(34,197,94,0.05)">
              <animate attributeName="opacity" values="0;0.5;0" dur="1.5s" repeatCount="indefinite" />
            </rect>
          )}
        </g>
      ))}
    </g>
  </svg>
);

const AddToHomeDialog: React.FC<{ active: boolean }> = ({ active }) => (
  <svg viewBox="0 0 280 560" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="280" height="560" rx="36" fill="#0a0a0a" />
    <rect x="8" y="8" width="264" height="544" rx="30" fill="#111" />
    <rect x="8" y="8" width="264" height="544" rx="30" fill="rgba(0,0,0,0.5)" />
    {/* Dialog */}
    <rect x="28" y="180" width="224" height="200" rx="16" fill="#2c2c2e" />
    <text x="140" y="212" fill="white" fontSize="15" fontFamily="system-ui" fontWeight="bold" textAnchor="middle">Add to Home Screen</text>
    <rect x="40" y="224" width="200" height="1" fill="#3a3a3c" />
    {/* App preview */}
    <rect x="108" y="238" width="64" height="64" rx="14" fill="rgba(34,197,94,0.15)" stroke="#22c55e" strokeWidth="1" />
    <text x="140" y="278" fill="#22c55e" fontSize="22" fontFamily="system-ui" fontWeight="bold" textAnchor="middle">$</text>
    <text x="140" y="316" fill="white" fontSize="13" fontFamily="system-ui" textAnchor="middle">Cashly</text>
    <text x="140" y="332" fill="#8e8e93" fontSize="10" fontFamily="system-ui" textAnchor="middle">sidhhrana.github.io</text>
    <rect x="40" y="346" width="200" height="1" fill="#3a3a3c" />
    {/* Buttons */}
    <text x="80" y="368" fill="#3b82f6" fontSize="14" fontFamily="system-ui" textAnchor="middle">Cancel</text>
    <rect x="140" y="348" width="1" height="30" fill="#3a3a3c" />
    <rect x="141" y="350" width="100" height="28" rx="4" fill={active ? "rgba(34,197,94,0.15)" : "transparent"}>
      {active && <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />}
    </rect>
    <text x="192" y="368" fill="#22c55e" fontSize="14" fontFamily="system-ui" fontWeight="bold" textAnchor="middle">Add</text>
  </svg>
);

const HomeScreen: React.FC<{ active: boolean }> = ({ active }) => (
  <svg viewBox="0 0 280 560" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="280" height="560" rx="36" fill="#0a0a0a" />
    <rect x="8" y="8" width="264" height="544" rx="30" fill="#111" />
    {/* Wallpaper gradient */}
    <rect x="8" y="8" width="264" height="544" rx="30" fill="url(#homeGrad)" />
    <defs>
      <linearGradient id="homeGrad" x1="0" y1="0" x2="280" y2="560" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0a0a0a" />
        <stop offset="1" stopColor="#0f1f0f" />
      </linearGradient>
    </defs>
    {/* Status bar */}
    <text x="24" y="36" fill="white" fontSize="12" fontFamily="system-ui" fontWeight="600">9:41</text>
    {/* App grid */}
    {[0,1,2,3,4,5,6,7,8].map(i => {
      const col = i % 4;
      const row = Math.floor(i / 4);
      const isCashly = i === 4;
      return (
        <g key={i} transform={`translate(${24 + col * 60}, ${80 + row * 80})`}>
          <rect width="48" height="48" rx="12" fill={isCashly ? "rgba(34,197,94,0.2)" : "#1e1e1e"} stroke={isCashly ? "#22c55e" : "transparent"} strokeWidth={isCashly ? "1.5" : "0"} />
          {isCashly && <text x="15" y="31" fill="#22c55e" fontSize="16" fontFamily="system-ui" fontWeight="bold">$</text>}
          {isCashly && <text x="24" y="68" fill="white" fontSize="10" fontFamily="system-ui" textAnchor="middle">Cashly</text>}
          {isCashly && active && (
            <rect width="48" height="48" rx="12" fill="rgba(34,197,94,0.2)">
              <animate attributeName="opacity" values="0;0.8;0" dur="1.5s" repeatCount="indefinite" />
            </rect>
          )}
        </g>
      );
    })}
    {/* Label for Cashly icon explicitly */}
    <text x="268" y="218" fill="white" fontSize="10" fontFamily="system-ui" textAnchor="middle">Cashly</text>
    {/* Dock */}
    <rect x="20" y="484" width="240" height="56" rx="18" fill="rgba(255,255,255,0.08)" />
    {[0,1,2,3].map(i => (
      <rect key={i} x={36 + i * 56} y="496" width="40" height="40" rx="10" fill="#1e1e1e" />
    ))}
  </svg>
);

const ChromeBrowser: React.FC<{ highlight?: "menu" | "address" | "none"; active: boolean }> = ({ highlight = "none", active }) => (
  <svg viewBox="0 0 280 560" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="280" height="560" rx="36" fill="#0a0a0a" />
    <rect x="8" y="8" width="264" height="544" rx="30" fill="#111" />
    {/* Status bar */}
    <text x="24" y="30" fill="#888" fontSize="11" fontFamily="system-ui">9:41</text>
    {/* Top chrome bar */}
    <rect x="0" y="40" width="280" height="56" fill="#1a1a1a" />
    {/* Address bar */}
    <rect x="12" y="48" width="222" height="32" rx="8" fill={highlight === "address" ? "rgba(34,197,94,0.15)" : "#2a2a2a"} stroke={highlight === "address" ? "#22c55e" : "transparent"} strokeWidth="1.5" />
    <text x="28" y="68" fill={highlight === "address" ? "#22c55e" : "#666"} fontSize="11" fontFamily="system-ui">
      sidhhrana.github.io/Cashly
    </text>
    {/* More button */}
    <rect x="242" y="50" width="32" height="28" rx="6" fill={highlight === "menu" ? "rgba(34,197,94,0.2)" : "transparent"} />
    <circle cx="258" cy="60" r="1.5" fill={highlight === "menu" ? "#22c55e" : "#888"} />
    <circle cx="258" cy="64" r="1.5" fill={highlight === "menu" ? "#22c55e" : "#888"} />
    <circle cx="258" cy="68" r="1.5" fill={highlight === "menu" ? "#22c55e" : "#888"} />
    {highlight === "menu" && active && (
      <circle cx="258" cy="64" r="16" fill="rgba(34,197,94,0.15)">
        <animate attributeName="r" values="12;20;12" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="1.5s" repeatCount="indefinite" />
      </circle>
    )}
    {/* Web content */}
    <rect x="20" y="112" width="240" height="80" rx="12" fill="#1a1a1a" />
    <circle cx="50" cy="145" r="14" fill="rgba(34,197,94,0.2)" />
    <text x="46" y="149" fill="#22c55e" fontSize="12" fontFamily="system-ui" fontWeight="bold">$</text>
    <text x="72" y="143" fill="white" fontSize="13" fontFamily="system-ui" fontWeight="bold">Cashly</text>
    <text x="72" y="158" fill="#666" fontSize="10" fontFamily="system-ui">Your wealth, simplified.</text>
    <rect x="20" y="205" width="240" height="8" rx="4" fill="#1a1a1a" />
    <rect x="20" y="220" width="180" height="8" rx="4" fill="#1a1a1a" />
  </svg>
);

const ChromeMenu: React.FC<{ highlight?: "install" | "none"; active: boolean }> = ({ highlight = "none", active }) => (
  <svg viewBox="0 0 280 560" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="280" height="560" rx="36" fill="#0a0a0a" />
    <rect x="8" y="8" width="264" height="544" rx="30" fill="#111" />
    <rect x="8" y="40" width="264" height="504" rx="0" fill="rgba(0,0,0,0.5)" />
    {/* Top chrome bar */}
    <rect x="0" y="40" width="280" height="56" fill="#1a1a1a" />
    <rect x="12" y="48" width="222" height="32" rx="8" fill="#2a2a2a" />
    <text x="28" y="68" fill="#666" fontSize="11" fontFamily="system-ui">sidhhrana.github.io/Cashly</text>
    <circle cx="258" cy="60" r="1.5" fill="#888" />
    <circle cx="258" cy="64" r="1.5" fill="#888" />
    <circle cx="258" cy="68" r="1.5" fill="#888" />
    {/* Dropdown menu */}
    <rect x="100" y="96" width="172" height="280" rx="12" fill="#2c2c2e" />
    {/* Menu items */}
    {[
      { label: "New Tab", sub: "" },
      { label: "Add to Home Screen", sub: "Install app", isInstall: true },
      { label: "Bookmarks", sub: "" },
      { label: "Downloads", sub: "" },
      { label: "Settings", sub: "" },
    ].map((item, i) => (
      <g key={i} transform={`translate(100, ${96 + i * 52})`}>
        <rect
          width="172" height="52"
          fill={item.isInstall && highlight === "install" ? "rgba(34,197,94,0.1)" : "transparent"}
        />
        <rect x="0" y="51" width="172" height="1" fill="#38383a" />
        <text x="16" y="28" fill={item.isInstall && highlight === "install" ? "#22c55e" : "white"} fontSize="12" fontFamily="system-ui" fontWeight={item.isInstall ? "600" : "400"}>
          {item.label}
        </text>
        {item.sub && (
          <text x="16" y="42" fill="#8e8e93" fontSize="10" fontFamily="system-ui">{item.sub}</text>
        )}
        {item.isInstall && highlight === "install" && active && (
          <rect width="172" height="52" fill="rgba(34,197,94,0.05)">
            <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
          </rect>
        )}
      </g>
    ))}
  </svg>
);

const AndroidInstallDialog: React.FC<{ active: boolean }> = ({ active }) => (
  <svg viewBox="0 0 280 560" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="280" height="560" rx="36" fill="#0a0a0a" />
    <rect x="8" y="8" width="264" height="544" rx="30" fill="#111" />
    <rect x="8" y="8" width="264" height="544" rx="30" fill="rgba(0,0,0,0.6)" />
    {/* Dialog */}
    <rect x="20" y="200" width="240" height="200" rx="20" fill="#1e1e1e" />
    <text x="140" y="236" fill="white" fontSize="16" fontFamily="system-ui" fontWeight="bold" textAnchor="middle">Add to Home Screen?</text>
    <rect x="100" y="252" width="80" height="80" rx="18" fill="rgba(34,197,94,0.15)" stroke="#22c55e" strokeWidth="1.5" />
    <text x="140" y="302" fill="#22c55e" fontSize="28" fontFamily="system-ui" fontWeight="bold" textAnchor="middle">$</text>
    <text x="140" y="348" fill="white" fontSize="12" fontFamily="system-ui" textAnchor="middle">Cashly</text>
    {/* Buttons */}
    <rect x="28" y="364" width="100" height="36" rx="18" fill="transparent" stroke="#444" strokeWidth="1" />
    <text x="78" y="387" fill="#888" fontSize="13" fontFamily="system-ui" textAnchor="middle">Cancel</text>
    <rect x="152" y="364" width="100" height="36" rx="18" fill="#22c55e">
      {active && <animate attributeName="opacity" values="0.7;1;0.7" dur="1s" repeatCount="indefinite" />}
    </rect>
    <text x="202" y="387" fill="black" fontSize="13" fontFamily="system-ui" fontWeight="bold" textAnchor="middle">Add</text>
  </svg>
);

const AndroidHomeScreen: React.FC<{ active: boolean }> = ({ active }) => (
  <svg viewBox="0 0 280 560" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="280" height="560" rx="36" fill="#0a0a0a" />
    <rect x="8" y="8" width="264" height="544" rx="30" fill="#0f1a0f" />
    <text x="24" y="36" fill="white" fontSize="12" fontFamily="system-ui" fontWeight="600">9:41</text>
    {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => {
      const col = i % 4;
      const row = Math.floor(i / 4);
      const isCashly = i === 5;
      return (
        <g key={i} transform={`translate(${20 + col * 62}, ${70 + row * 80})`}>
          <rect width="48" height="48" rx="24" fill={isCashly ? "rgba(34,197,94,0.2)" : "#1e1e1e"} stroke={isCashly ? "#22c55e" : "transparent"} strokeWidth={isCashly ? "1.5" : "0"} />
          {isCashly && <text x="15" y="31" fill="#22c55e" fontSize="16" fontFamily="system-ui" fontWeight="bold">$</text>}
          {isCashly && active && (
            <rect width="48" height="48" rx="24" fill="rgba(34,197,94,0.3)">
              <animate attributeName="opacity" values="0;0.8;0" dur="1.5s" repeatCount="indefinite" />
            </rect>
          )}
          {isCashly && <text x="24" y="66" fill="white" fontSize="10" fontFamily="system-ui" textAnchor="middle">Cashly</text>}
        </g>
      );
    })}
    <rect x="20" y="494" width="240" height="48" rx="24" fill="rgba(255,255,255,0.06)" />
    {[0,1,2,3].map(i => (
      <rect key={i} x={36 + i * 56} y="505" width="36" height="36" rx="18" fill="#1e1e1e" />
    ))}
  </svg>
);

const iosSteps: Step[] = [
  {
    title: "Open in Safari",
    description: "Launch Safari and navigate to the Cashly app URL. Make sure you're using Safari — it's required for PWA installation on iOS.",
    illustration: ({ active }) => <SafariBrowser highlight="address" active={active} />,
  },
  {
    title: "Tap the Share button",
    description: "Tap the Share icon at the bottom of your screen — it looks like a box with an arrow pointing up.",
    illustration: ({ active }) => <SafariBrowser highlight="share" active={active} />,
  },
  {
    title: "Tap \"Add to Home Screen\"",
    description: "Scroll down in the share sheet and tap \"Add to Home Screen\". This tells Safari to install Cashly as an app.",
    illustration: ({ active }) => <ShareSheet highlight="add" active={active} />,
  },
  {
    title: "Confirm the install",
    description: "You'll see a preview of the Cashly icon. Tap \"Add\" in the top right to confirm.",
    illustration: ({ active }) => <AddToHomeDialog active={active} />,
  },
  {
    title: "You're in!",
    description: "Cashly is now installed on your home screen. Tap the icon to open your app — no App Store, no waiting, no cost.",
    illustration: ({ active }) => <HomeScreen active={active} />,
  },
];

const androidSteps: Step[] = [
  {
    title: "Open in Chrome",
    description: "Launch Chrome and navigate to the Cashly app URL. Chrome is the recommended browser for installing PWAs on Android.",
    illustration: ({ active }) => <ChromeBrowser highlight="address" active={active} />,
  },
  {
    title: "Tap the menu button",
    description: "Tap the three-dot menu (⋮) in the top right corner of Chrome to open the browser menu.",
    illustration: ({ active }) => <ChromeBrowser highlight="menu" active={active} />,
  },
  {
    title: "Tap \"Add to Home Screen\"",
    description: "Find and tap \"Add to Home Screen\" in the menu. Chrome may also show a banner at the bottom — either works.",
    illustration: ({ active }) => <ChromeMenu highlight="install" active={active} />,
  },
  {
    title: "Confirm the install",
    description: "A dialog will appear showing the Cashly icon. Tap \"Add\" to install it to your home screen.",
    illustration: ({ active }) => <AndroidInstallDialog active={active} />,
  },
  {
    title: "You're in!",
    description: "Cashly is now installed on your Android home screen. Tap the icon and start tracking your money — completely free.",
    illustration: ({ active }) => <AndroidHomeScreen active={active} />,
  },
];

export function InstallGuide() {
  const [platform, setPlatform] = useState<Platform>("ios");
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const steps = platform === "ios" ? iosSteps : androidSteps;

  const advance = useCallback(() => {
    setActiveStep(prev => (prev + 1) % steps.length);
  }, [steps.length]);

  useEffect(() => {
    setActiveStep(0);
    setIsPlaying(true);
  }, [platform]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setTimeout(advance, 2800);
    return () => clearTimeout(timer);
  }, [activeStep, isPlaying, advance]);

  const currentStep = steps[activeStep];

  return (
    <section className="py-32 relative bg-zinc-950 border-t border-white/5 overflow-hidden" id="install">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6 text-sm font-semibold">
            <Download className="w-4 h-4" />
            Free Install — No App Store Required
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold font-display mb-5">Get the app in seconds.</h2>
          <p className="text-xl text-muted-foreground">
            Install Cashly directly to your home screen — no App Store, no Google Play, no subscriptions.
          </p>
        </motion.div>

        {/* Platform Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex p-1 bg-black border border-white/10 rounded-2xl gap-1">
            {(["ios", "android"] as Platform[]).map(p => (
              <button
                key={p}
                data-testid={`tab-platform-${p}`}
                onClick={() => setPlatform(p)}
                className={`px-8 py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 ${
                  platform === p
                    ? "bg-primary text-black shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {p === "ios" ? "iOS (Safari)" : "Android (Chrome)"}
              </button>
            ))}
          </div>
        </div>

        {/* Main tutorial area */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-5xl mx-auto">
          {/* Phone illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="absolute inset-0 bg-primary/15 blur-[80px] rounded-full" />
            <div className="relative w-[220px] sm:w-[260px] drop-shadow-2xl">
              {/* Phone bezel */}
              <div className="absolute inset-0 rounded-[40px] ring-1 ring-white/10 bg-zinc-900 border-[8px] border-zinc-900 shadow-[0_0_40px_rgba(34,197,94,0.15),0_40px_80px_rgba(0,0,0,0.8)] z-10 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-zinc-900 rounded-b-2xl z-20" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${platform}-${activeStep}`}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.03 }}
                    transition={{ duration: 0.35 }}
                    className="w-full h-full"
                  >
                    <currentStep.illustration active={isPlaying} />
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* Ghost spacer */}
              <div className="invisible">
                <SafariBrowser highlight="none" active={false} />
              </div>
            </div>
          </motion.div>

          {/* Steps list */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            {steps.map((step, i) => (
              <button
                key={i}
                data-testid={`install-step-${i}`}
                onClick={() => { setActiveStep(i); setIsPlaying(false); }}
                className={`w-full text-left p-4 rounded-2xl transition-all duration-300 group border ${
                  i === activeStep
                    ? "bg-primary/10 border-primary/40 shadow-[0_0_20px_rgba(34,197,94,0.1)]"
                    : "border-transparent hover:bg-white/5"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    i < activeStep
                      ? "bg-primary text-black"
                      : i === activeStep
                      ? "bg-primary/20 text-primary ring-2 ring-primary/50"
                      : "bg-white/5 text-muted-foreground"
                  }`}>
                    {i < activeStep ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`font-bold text-sm mb-1 transition-colors ${i === activeStep ? "text-white" : "text-muted-foreground"}`}>
                      {step.title}
                    </div>
                    <AnimatePresence>
                      {i === activeStep && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-sm text-muted-foreground leading-relaxed overflow-hidden"
                        >
                          {step.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                {/* Progress bar for active step */}
                {i === activeStep && isPlaying && (
                  <div className="mt-3 ml-12 h-0.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2.8, ease: "linear" }}
                    />
                  </div>
                )}
              </button>
            ))}

            {/* Nav buttons */}
            <div className="flex items-center gap-3 pt-4 pl-0">
              <button
                data-testid="install-prev"
                onClick={() => { setActiveStep(p => Math.max(0, p - 1)); setIsPlaying(false); }}
                disabled={activeStep === 0}
                className="px-4 py-2 rounded-xl border border-white/10 text-sm font-medium text-muted-foreground hover:text-white hover:border-white/20 disabled:opacity-30 transition-all"
              >
                Back
              </button>
              <button
                data-testid="install-next"
                onClick={() => { setActiveStep(p => Math.min(steps.length - 1, p + 1)); setIsPlaying(false); }}
                disabled={activeStep === steps.length - 1}
                className="px-4 py-2 rounded-xl border border-white/10 text-sm font-medium text-muted-foreground hover:text-white hover:border-white/20 disabled:opacity-30 transition-all"
              >
                Next
              </button>
              <button
                data-testid="install-replay"
                onClick={() => { setActiveStep(0); setIsPlaying(true); }}
                className="px-4 py-2 rounded-xl text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Replay
              </button>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <a href={APP_URL} target="_blank" rel="noopener noreferrer" data-testid="link-open-app">
            <Button
              size="lg"
              className="bg-primary text-black hover:bg-primary/90 h-12 sm:h-14 px-8 sm:px-10 text-base sm:text-lg font-bold shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_50px_rgba(34,197,94,0.6)] hover:-translate-y-1 transition-all rounded-full group"
            >
              Open Cashly Now
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
          <p className="mt-4 text-sm text-muted-foreground">Free forever. No account required to get started.</p>
        </motion.div>
      </div>
    </section>
  );
}
