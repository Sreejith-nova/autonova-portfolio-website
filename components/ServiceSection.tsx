"use client";

import { Container, Heading, Section, Text } from "./ui-primitives";
import { motion } from "framer-motion";

const services = [
    {
        title: "AI Automation",
        description: "End-to-end workflow automation reducing manual intervention in critical business processes.",
    },
    {
        title: "Workflow Systems",
        description: "Architecting resilient data pipelines that connect siloed tools into a unified ecosystem.",
    },
    {
        title: "Voice & Chat Agents",
        description: "Context-aware agents that handle customer support, internal queries, and lead qualification.",
    },
    {
        title: "Lead & CRM Automation",
        description: "Systems that capture, qualify, and route leads instantly, ensuring zero drop-off.",
    },
    {
        title: "Custom AI Integrations",
        description: "Bespoke LLM implementations securely trained on your proprietary data.",
    },
];

export function ServiceSection() {
    return (
        <Section className="bg-background relative z-10 border-t border-border/10">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                    <div className="sticky top-32 h-fit">
                        <Heading as="h2" className="mb-6">
                            What we actually do.
                        </Heading>
                        <Text className="max-w-sm">
                            We build systems that work. No experiments, no demos. Just production-grade infrastructure for scale.
                        </Text>
                    </div>

                    <div className="space-y-16">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <h3 className="text-xl md:text-2xl font-medium text-foreground mb-3 group-hover:text-white transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-subtle text-base md:text-lg leading-relaxed border-l border-border pl-6">
                                    {service.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    );
}
