"use client";

import { Container, Heading, Section, Text } from "./ui-primitives";
import { motion } from "framer-motion";

export function CTASection() {
    return (
        <Section className="bg-[#0f0f0f] relative z-10 py-32 md:py-48 text-center">
            <Container className="flex flex-col items-center justify-center space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="space-y-6 max-w-3xl"
                >
                    <Heading as="h2" className="text-4xl md:text-5xl lg:text-6xl text-white">
                        Let’s talk about real systems, not demos.
                    </Heading>
                    <Text className="text-lg md:text-xl text-white/60 mx-auto max-w-2xl">
                        If you’re exploring automation, AI systems, or operational scale, we’re happy to have a thoughtful conversation. No pitches. No templates. Just clarity on whether we’re a good fit.
                    </Text>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <a
                        href="https://cal.com/autonova-mfsbch/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-4 text-base md:text-lg font-medium bg-white text-black rounded-sm hover:translate-y-[-2px] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 transform"
                    >
                        Book a conversation
                    </a>
                    <div className="mt-4 text-sm text-subtle/50 font-light">
                        30-minute intro call. No obligation.
                    </div>
                </motion.div>
            </Container>
        </Section>
    );
}
