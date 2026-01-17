"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container, Heading, Section, Text } from "../ui-primitives";
import { memo } from "react";

interface Workflow {
    id: string;
    title: string;
    description: string;
    impact: string;
    mediaType: "image" | "video";
    src: string;
}

// Actual workflow images
const workflows: Workflow[] = [
    {
        id: "1",
        title: "Lead Qualification Pipeline",
        description: "Automated lead scoring and routing system that processes inbound inquiries through multiple validation steps.",
        impact: "Reduced manual qualification time by 90%",
        mediaType: "image",
        src: "/work/workflows/Gemini_Generated_Image_dvszbodvszbodvsz.png"
    },
    {
        id: "2",
        title: "Multi-Channel Outreach Engine",
        description: "Orchestrated email and voice outreach with intelligent follow-up scheduling and response tracking.",
        impact: "3x increase in response rates",
        mediaType: "image",
        src: "/work/workflows/Gemini_Generated_Image_sue0fcsue0fcsue0 (1).png"
    },
];

export const WorkflowShowcase = memo(function WorkflowShowcase() {
    return (
        <Section className="bg-background relative z-10">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    style={{ willChange: 'opacity, transform' }}
                >
                    <div className="mb-16">
                        <h3 className="text-sm font-medium uppercase tracking-widest text-subtle mb-4">
                            Automation Systems
                        </h3>
                        <Heading as="h2" className="text-3xl md:text-4xl">
                            Engineering depth
                        </Heading>
                    </div>

                    <div className="space-y-24">
                        {workflows.map((workflow, index) => (
                            <motion.div
                                key={workflow.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                style={{ willChange: 'opacity, transform' }}
                                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
                            >
                                {/* Content */}
                                <div className={`lg:col-span-4 space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                                    <div>
                                        <div className="text-xs uppercase tracking-widest text-subtle mb-3">
                                            Workflow {index + 1}
                                        </div>
                                        <h4 className="text-2xl font-medium text-foreground mb-4">
                                            {workflow.title}
                                        </h4>
                                        <Text className="text-subtle leading-relaxed">
                                            {workflow.description}
                                        </Text>
                                    </div>
                                    <div className="pt-4 border-t border-border/20">
                                        <div className="text-xs uppercase tracking-widest text-subtle mb-2">
                                            Impact
                                        </div>
                                        <div className="text-lg font-medium text-accent">
                                            {workflow.impact}
                                        </div>
                                    </div>
                                </div>

                                {/* Media */}
                                <div className={`lg:col-span-8 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                                    <div className="relative aspect-video bg-border/10 rounded-sm overflow-hidden border border-border/20">
                                        {workflow.mediaType === "video" ? (
                                            <video
                                                src={workflow.src}
                                                controls
                                                className="w-full h-full object-cover"
                                                aria-label={`${workflow.title} demo video`}
                                            />
                                        ) : (
                                            <Image
                                                src={workflow.src}
                                                alt={`${workflow.title} workflow diagram`}
                                                fill
                                                className="object-contain p-4"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                                            />
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </Container>
        </Section>
    );
});
