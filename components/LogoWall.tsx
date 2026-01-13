"use client";

import { Container, Section } from "./ui-primitives";

const clients = [
    "TASA GLOBAL", "ARTHEART", "PLANTAE WORLD", "SCENESOCIAL",
    "REACH ADVERTISING", "JAI MATA DI REAL ESTATE"
];

export function LogoWall() {
    return (
        <Section className="border-t border-border/10 py-12 md:py-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            <Container>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 place-items-center">
                    {clients.map((client, i) => (
                        <div key={i} className="text-sm md:text-base font-bold tracking-widest text-subtle/60 select-none">
                            {client}
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
