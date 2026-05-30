import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function Terms() {
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
            <h1 className="text-5xl font-bold font-display mb-4">Terms of Service</h1>
            <p className="text-xl text-muted-foreground mb-16 leading-relaxed">
              By using Cashly, you agree to these terms. We've kept them short and fair.
            </p>

            <div className="space-y-12 text-base leading-relaxed">
              {[
                {
                  title: "1. Acceptance of Terms",
                  body: "By accessing or using Cashly, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use Cashly."
                },
                {
                  title: "2. Description of Service",
                  body: "Cashly is a free Progressive Web App (PWA) designed to help individuals track their personal finances. The app operates entirely on your device — we provide the software, you provide the data. Cashly is offered at no cost and we reserve the right to modify, suspend, or discontinue it at any time."
                },
                {
                  title: "3. User Responsibilities",
                  body: "You are solely responsible for the accuracy of the financial data you enter into Cashly. Cashly is a personal finance tracker — it is not a financial advisor, bank, or regulated financial service. Do not rely on Cashly as your sole method of financial record-keeping. Always maintain your own backups."
                },
                {
                  title: "4. No Financial Advice",
                  body: "The information and features provided by Cashly are for general informational and organizational purposes only. Nothing in Cashly constitutes financial, legal, investment, or tax advice. Please consult a qualified financial professional for advice specific to your situation."
                },
                {
                  title: "5. Intellectual Property",
                  body: "Cashly and all its original content, features, and functionality are owned by the Cashly team and are protected by applicable copyright and intellectual property laws. You may not copy, modify, distribute, or create derivative works based on Cashly without explicit written permission."
                },
                {
                  title: "6. Disclaimer of Warranties",
                  body: "Cashly is provided on an \"as is\" and \"as available\" basis without warranties of any kind, either express or implied. We do not warrant that the app will be error-free, uninterrupted, or meet your specific requirements."
                },
                {
                  title: "7. Limitation of Liability",
                  body: "To the fullest extent permitted by law, Cashly and its creators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the app, including any loss of financial data."
                },
                {
                  title: "8. Changes to Terms",
                  body: "We reserve the right to update these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of Cashly after changes are posted constitutes your acceptance of the revised terms."
                },
                {
                  title: "9. Governing Law",
                  body: "These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflicts of law principles."
                },
                {
                  title: "10. Contact",
                  body: "If you have any questions about these Terms of Service, please get in touch through our Contact page."
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
            <Link href="/privacy"><span className="hover:text-primary transition-colors cursor-pointer">Privacy</span></Link>
            <Link href="/contact"><span className="hover:text-primary transition-colors cursor-pointer">Contact</span></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
