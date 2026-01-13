"use client";

import { Container, Heading, Section, Text } from "./ui-primitives";
import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
    {
        client: "Tasa Global",
        industry: "Study Abroad Consultancy",
        problem: "Counselors manually searched eligibility criteria across 2,800+ universities for each student—a tedious, error-prone process taking hours per consultation.",
        build: "Complete university scraper that extracts eligibility criteria from partner universities, plus a counselor dashboard that instantly matches student marks against all programs.",
        outcome: "Reduced eligibility research from hours to seconds. Counselors now serve 5x more students with zero lookup errors.",
        image: "/portfolio/tasa_logo.png"
    },
    {
        client: "Artheart",
        industry: "Art & E-commerce",
        problem: "Artists struggled to sell high-quality art online without a professional, payment-integrated platform. Gallery payments were manual and fragmented.",
        build: "Full-stack website with seamless payment integration, social media automation, and Jahangir Art Gallery payment workflow automation.",
        outcome: "Artists now sell directly to collectors nationwide. Payment processing time reduced by 80%.",
        image: "/portfolio/artheart_logo.png"
    },
    {
        client: "Plantae World",
        industry: "Plants & Landscaping",
        problem: "Manual customer acquisition and order management couldn't scale. Inbound inquiries went unanswered, and outreach was inconsistent.",
        build: "E-commerce website for plant sales, AI voice caller for inbound/outbound calls, and automated email outreach with lead generation pipeline.",
        outcome: "Fully automated sales funnel. AI handles 100% of inbound calls. Lead generation runs continuously without manual effort.",
        image: "/portfolio/plantae_logo.png"
    }
];

export function PortfolioSection() {
    return (
        <Section id="work" className="bg-background relative z-10">
            <Container>
                <Heading as="h2" className="mb-20">Selected Work</Heading>

                <div className="space-y-32">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-8 gap-y-12 border-t border-border pt-12"
                        >
                            <div className="lg:col-span-4 space-y-8">
                                <div>
                                    <div className="text-xs uppercase tracking-widest text-subtle mb-2">Client</div>
                                    <div className="text-xl font-medium">{project.client}</div>
                                </div>
                                <div>
                                    <div className="text-xs uppercase tracking-widest text-subtle mb-2">Industry</div>
                                    <div className="text-lg text-subtle">{project.industry}</div>
                                </div>
                            </div>

                            <div className="lg:col-span-8 space-y-12">
                                <div className="relative aspect-video w-full bg-white rounded-sm overflow-hidden border border-border/10 group">
                                    <Image
                                        src={project.image}
                                        alt={`${project.client} case study`}
                                        fill
                                        className="object-contain p-6 opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <div className="text-xs uppercase tracking-widest text-subtle mb-3">The Problem</div>
                                        <p className="text-lg leading-relaxed text-foreground/90">{project.problem}</p>
                                    </div>
                                    <div>
                                        <div className="text-xs uppercase tracking-widest text-subtle mb-3">The Outcome</div>
                                        <p className="text-lg leading-relaxed text-foreground/90">{project.outcome}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
