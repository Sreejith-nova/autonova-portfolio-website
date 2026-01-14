"use client";

import { Container, Heading, Section } from "./ui-primitives";
import { motion } from "framer-motion";

const industries = [
    "Real Estate",
    "Healthcare",
    "Finance",
    "E-commerce",
    "Local Services",
    "Agencies",
    "Enterprises",
    "Logistics",
];

export function IndustriesSection() {
    return (
        <Section className="bg-background relative z-10 border-t border-border/10">
            <Container>
                <div className="flex flex-col md:flex-row items-baseline gap-12 md:gap-24">
                    <h3 className="text-sm font-medium uppercase tracking-widest text-subtle md:w-1/4">
                        Industries Deployed
                    </h3>
                    <div className="md:w-3/4">
                        <div className="flex flex-wrap gap-x-8 gap-y-4">
                            {industries.map((ind, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    viewport={{ once: true }}
                                    className="text-3xl md:text-5xl lg:text-6xl text-subtle hover:text-foreground transition-colors cursor-default"
                                >
                                    {ind}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
