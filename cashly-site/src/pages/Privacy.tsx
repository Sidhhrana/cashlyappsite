import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="container mx-auto px-6 h-20 flex items-center">
          <Link href="/">
            <button data-testid="back-home" className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Cashly
            </button>
          </Link>
        </div>
      </nav>

      <main className="pt-36 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-8">
              Last updated: May 2026
            </div>
            <h1 className="text-5xl font-bold font-display mb-4">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground mb-16 leading-relaxed">
              Your privacy matters to us. Here's a plain-English explanation of how Cashly handles your data.
            </p>

            <div className="space-y-12 text-base leading-relaxed">
              {[
                {
                  title: "1. Information We Collect",
                  body: "Cashly is a Progressive Web App that stores all your financial data locally on your device. We do not collect, transmit, or store your personal financial information on any external server. The only data we may collect is basic usage analytics to help improve the app experience."
                },
                {
                  title: "2. How We Use Your Data",
                  body: "All transaction records, budgets, savings goals, and wallet information you enter into Cashly are stored exclusively in your browser's local storage. This data never leaves your device. We use anonymous, aggregated analytics only to understand general usage patterns — never to identify individual users."
                },
                {
                  title: "3. Data Storage & Security",
                  body: "Your financial data is stored locally using your browser's built-in storage mechanisms. We recommend keeping your device secure with a passcode or biometric lock. If you clear your browser data, your Cashly data will also be cleared. Export your data regularly using the built-in CSV export feature."
                },
                {
                  title: "4. Third-Party Services",
                  body: "Cashly does not sell, rent, or share your personal information with any third parties. We do not use advertising networks, tracking pixels, or third-party analytics that could compromise your privacy."
                },
                {
                  title: "5. Cookies",
                  body: "We use only essential cookies required for the app to function properly. We do not use cookies for advertising or tracking purposes."
                },
                {
                  title: "6. Children's Privacy",
                  body: "Cashly is not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately."
                },
                {
                  title: "7. Changes to This Policy",
                  body: "We may update this Privacy Policy from time to time. We will notify you of any changes by updating the date at the top of this page. Continued use of Cashly after any changes constitutes your acceptance of the new policy."
                },
                {
                  title: "8. Contact Us",
                  body: "If you have any questions or concerns about this Privacy Policy, please reach out to us through our Contact page. We're committed to responding within 48 hours."
                }
              ].map((section, i) => (
                <motion.section
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.2 }}
                  className="border-t border-white/10 pt-10"
                >
                  <h2 className="text-2xl font-bold font-display text-white mb-4">{section.title}</h2>
                  <p className="text-muted-foreground">{section.body}</p>
                </motion.section>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="py-8 border-t border-white/10 bg-black">
        <div className="container mx-auto px-6 flex justify-between items-center text-sm text-muted-foreground">
          <span>Cashly &copy; {new Date().getFullYear()}</span>
          <div className="flex gap-6">
            <Link href="/terms"><span className="hover:text-primary transition-colors cursor-pointer">Terms</span></Link>
            <Link href="/contact"><span className="hover:text-primary transition-colors cursor-pointer">Contact</span></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
