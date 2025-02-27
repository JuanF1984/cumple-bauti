// Componentes
import { Hero } from "@/components/Hero"
import { ImageCarousel } from "@/components/ImageCarousel"
import { CountdownTimer } from "@/components/CountdownTimer"
import { EventDetailsComponent } from "@/components/EventDetailsComponent"
import { ConfirmationForm } from "@/components/ConfirmationForm"
// Fondo animado
import { AnimatedBirthdayBackground } from "@/components/animations/AnimatedBirthdayBackground"
// Transiciones entre componente
import { FadeIn } from "@/components/animations/FadeIn"
// Interface TS para evento
import { EventDetails } from "@/types/event"

export const BirthdayTemplate: React.FC<{ eventDetails: EventDetails }> = ({ eventDetails }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <AnimatedBirthdayBackground />
            <Hero event={eventDetails} />
            <FadeIn delay={400}>
                <CountdownTimer 
                    eventDate={eventDetails.date}
                    endDate = {eventDetails.end_date}
                    />
            </FadeIn>
            <FadeIn delay={400}>
                <ImageCarousel images={eventDetails.carouselImages} />
            </FadeIn>
            <FadeIn delay={600}>
                <EventDetailsComponent event={eventDetails} />
            </FadeIn>
            <FadeIn delay={600}>
                <ConfirmationForm contact={eventDetails.contact}/>
            </FadeIn>
        </div>
    )
}
