import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/lib/constants";

/** Frequently asked questions accordion. */
export function FaqSection() {
  return (
    <section id="faq" className="px-6 py-24">
      <div className="container max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-muted-foreground">
            Can&apos;t find what you&apos;re looking for? Reach out to our
            support team anytime.
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-12">
          {FAQS.map((faq, i) => (
            <AccordionItem key={faq.question} value={`item-${i}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
