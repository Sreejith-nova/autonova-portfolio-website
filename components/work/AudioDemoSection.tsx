"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Container, Heading, Section, Text } from "../ui-primitives";

interface AudioDemo {
    id: string;
    label: string;
    description: string;
    src: string;
}

const audioDemos: AudioDemo[] = [
    {
        id: "inbound",
        label: "Inbound AI Call",
        description: "AI handling an incoming customer inquiry with natural conversation flow.",
        src: "/work/audio/inbound-demo.mp3"
    },
    {
        id: "outbound",
        label: "Outbound AI Call",
        description: "AI conducting proactive outreach with appointment scheduling capability.",
        src: "/work/audio/outbound-demo.mp3"
    }
];

export function AudioDemoSection() {
    const [activeAudio, setActiveAudio] = useState<string | null>(null);
    const [audioErrors, setAudioErrors] = useState<{ [key: string]: boolean }>({});
    const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});

    const handlePlay = (id: string) => {
        // Pause all other audio players
        Object.entries(audioRefs.current).forEach(([key, audio]) => {
            if (key !== id && audio) {
                audio.pause();
            }
        });
        setActiveAudio(id);
    };

    const handlePause = () => {
        setActiveAudio(null);
    };

    const handleError = (id: string) => {
        setAudioErrors(prev => ({ ...prev, [id]: true }));
    };

    return (
        <Section className="bg-background relative z-10 border-b border-border/10">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="mb-16">
                        <h3 className="text-sm font-medium uppercase tracking-widest text-subtle mb-4">
                            AI Voice Callers
                        </h3>
                        <Heading as="h2" className="text-3xl md:text-4xl">
                            Hear the difference
                        </Heading>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                        {audioDemos.map((demo) => (
                            <motion.div
                                key={demo.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: demo.id === "outbound" ? 0.1 : 0 }}
                                viewport={{ once: true }}
                                className="space-y-6"
                            >
                                <div>
                                    <div className="text-lg font-medium text-foreground mb-2">
                                        {demo.label}
                                    </div>
                                    <Text className="text-subtle text-sm">
                                        {demo.description}
                                    </Text>
                                </div>

                                <div className="relative">
                                    {audioErrors[demo.id] ? (
                                        <div className="w-full h-12 rounded-sm bg-border/20 flex items-center justify-center text-subtle text-sm">
                                            Audio demo coming soon
                                        </div>
                                    ) : (
                                        <audio
                                            ref={(el) => { audioRefs.current[demo.id] = el; }}
                                            src={demo.src}
                                            onPlay={() => handlePlay(demo.id)}
                                            onPause={handlePause}
                                            onError={() => handleError(demo.id)}
                                            controls
                                            className="w-full h-12 rounded-sm"
                                            style={{
                                                filter: "invert(1) hue-rotate(180deg)",
                                                opacity: 0.8
                                            }}
                                            aria-label={`${demo.label} audio demo`}
                                        />
                                    )}
                                    {activeAudio === demo.id && (
                                        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-6 bg-accent rounded-full" />
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </Container>
        </Section>
    );
}
