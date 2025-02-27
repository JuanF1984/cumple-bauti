import { EventDetails } from "@/types/event";

interface HeroProps {
    event: EventDetails;
    overlay?: boolean;
    className?: string;
}

export const Hero: React.FC<HeroProps> = ({event, overlay = true, className=''}) => {
  return (
    <div className={`relative h-[90dvh] w-full overflow-hidden bg-white ${className}`}>
      <img 
        src={event.heroImage} 
        alt={`Evento de ${event.name}`} 
        className="absolute inset-0 h-full mx-auto left-0 right-0"
      />
      {overlay && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center p-4">
          <h1 className="text-5xl font-bold mb-4">
            {event.eventType === 'birthday' ? `¡Cumpleaños de ${event.name}!` : event.name}
          </h1>
          {event.age && <h2 className="text-3xl">Cumple {event.age} años</h2>}
        </div>
      )}
    </div>
  )
}
