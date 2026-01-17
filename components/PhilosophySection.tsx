"use client";

import { Container, Heading, Section, Text } from "./ui-primitives";
import { memo } from "react";

export const PhilosophySection = memo(function PhilosophySection() {
    return (
        <Section id="thinking" className="bg-background relative z-10 border-t border-border/10">
            <Container className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-4">
                    <Heading as="h2">How we think.</Heading>
                </div>
                <div className="md:col-span-8 space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-foreground">Infrastructure, not hacks.</h3>
                            <Text>
                                Automation isn't about stringing together webhooks. It's about building resilient, error-handled systems that can survive API outages and scale with your data.
                            </Text>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-foreground">Scope defines success.</h3>
                            <Text>
                                We don't start building until the outcome is mathematically defined. Our scoping process is rigorous because your operations depend on it.
                            </Text>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
});
