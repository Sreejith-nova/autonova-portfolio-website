"use client";

import { Container } from "./ui-primitives";

export function Footer() {
    return (
        <footer className="bg-background py-12 border-t border-border/10">
            <Container className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div>
                    <div className="text-2xl font-bold tracking-tight mb-4">AUTONOVA</div>
                    <div className="text-subtle text-sm">
                        System Intelligence.
                        <br />
                        © 2024 Autonova Systems.
                    </div>
                </div>

                <div className="flex gap-8 text-sm text-subtle">
                    <a href="https://www.linkedin.com/in/autonova-ai" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
                    <a href="mailto:sreejith@autonova.live" className="hover:text-foreground transition-colors">Email</a>
                </div>
            </Container>
        </footer>
    );
}
