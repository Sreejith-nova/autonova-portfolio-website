import { Metadata } from "next";
import { Container, Heading, Text } from "@/components/ui-primitives";
import { AudioDemoSection } from "@/components/work/AudioDemoSection";
import { CreativesGallery } from "@/components/work/CreativesGallery";
import { WorkflowShowcase } from "@/components/work/WorkflowShowcase";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
    title: "Work | AUTONOVA",
    description: "Selected systems and implementations. Real demos, real execution quality.",
};

export default function WorkPage() {
    return (
        <>
            <Navbar />
            <main className="pt-32 pb-24 bg-background min-h-screen">
                {/* Page Header */}
                <section className="mb-24">
                    <Container>
                        <div className="max-w-3xl">
                            <Heading as="h1" className="mb-6">
                                Work
                            </Heading>
                            <Text className="text-xl md:text-2xl text-subtle leading-relaxed">
                                Selected systems and implementations.
                            </Text>
                        </div>
                    </Container>
                </section>

                {/* AI Voice Callers */}
                <AudioDemoSection />

                {/* AI Creatives Gallery */}
                <CreativesGallery />

                {/* Automation Workflows */}
                <WorkflowShowcase />
            </main>
            <Footer />
        </>
    );
}
