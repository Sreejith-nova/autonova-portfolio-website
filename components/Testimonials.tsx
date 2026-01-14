"use client";

import { Container, Heading, Section } from "./ui-primitives";

const testimonials = [
    {
        quote: "Their email outreach service transformed our lead generation. We saw a measurable increase in qualified responses within the first month. Professional, reliable, and results-driven.",
        author: "Swapnil Nate",
        role: "Founder, Reach Advertising"
    },
    {
        quote: "We used to spend hours manually checking eligibility across 2,800 universities for every student. Now our counselors get instant results. It's changed how we operate entirely.",
        author: "Vikas",
        role: "Director, Tasa Global"
    }
];

export function Testimonials() {
    return (
        <Section className="bg-background relative z-10">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                    {testimonials.map((t, i) => (
                        <div key={i} className="flex flex-col justify-between space-y-8">
                            <p className="text-xl md:text-2xl lg:text-3xl leading-snug font-light text-foreground/90">
                                "{t.quote}"
                            </p>
                            <div>
                                <div className="text-foreground font-medium">{t.author}</div>
                                <div className="text-subtle text-sm">{t.role}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
