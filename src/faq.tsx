import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <div className="max-w-xl mx-auto p-6 md:max-w-2xl overflow-hidden">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
      <Accordion className="w-full" type="single" collapsible>
        <AccordionItem value="free">
          <AccordionTrigger className="text-base md:text-xl">Is it free or not?</AccordionTrigger>
          <AccordionContent>
            <div className="w-full text-base md:text-xl leading-relaxed">
              It is absolutely free! You can even get the source code if you want. Just use it, but don’t abuse it.
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tech-stack">
          <AccordionTrigger className="text-base md:text-xl">What technologies does it use?</AccordionTrigger>
          <AccordionContent>
            <div className="w-full text-base md:text-xl leading-relaxed">
              Everything used here is <strong>free and open-source</strong> except <strong>Resend</strong>, which requires you to open an account and link it to the Express server.
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="auth-email">
          <AccordionTrigger className="text-base md:text-xl">Can it actually authenticate and send emails?</AccordionTrigger>
          <AccordionContent>
            <div className="w-full text-base md:text-xl leading-relaxed">
              Yes, of course, bro! I made sure it works; otherwise, I wouldn't deploy it. Keep in mind that if you use my web platform, emails will come from the <strong>amir.glasscube.io</strong> domain, which is verified and authenticated.
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="mobile-support">
          <AccordionTrigger className="text-base md:text-xl">Does it work for Android & iOS?</AccordionTrigger>
          <AccordionContent>
            <div className="w-full text-base md:text-xl leading-relaxed">
              I honestly don’t know. Maybe it works if you find a way to add the script to your mobile app, but right now, it’s mainly optimized for <strong>websites and web-based applications</strong>.
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="data-privacy">
          <AccordionTrigger className="text-base md:text-xl">What about data privacy?</AccordionTrigger>
          <AccordionContent>
            <div className="w-full text-base md:text-xl leading-relaxed">
              We take privacy seriously. No personal user data is collected—only <strong>anonymous analytics</strong> like page visits, referrers, and device types. You control the data, and nothing is shared with third parties.
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
