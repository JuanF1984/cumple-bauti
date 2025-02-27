import { BirthdayTemplate } from "@/templates/BirthdayTemplate";
import { EventDetails } from "@/types/event";


export const CumpleJuanito: React.FC = () => {
    const eventDetails: EventDetails = {
        name: 'Juanito',
        age: 5,
        date: '2025-03-15T16:00:00',
        location: 'Salón de Fiestas',
        heroImage: 'https://picsum.photos/1200/600?random=1',
        carouselImages: [
            'https://picsum.photos/800/500?random=2',
            'https://picsum.photos/800/500?random=3',
            'https://picsum.photos/800/500?random=4',
            'https://picsum.photos/800/500?random=5',
            'https://picsum.photos/800/500?random=6'
        ],
        eventType: 'birthday',
        coordinates: {
            lat: -34.45614,
            lng: -59.434722
        }
    }

    const templates = {
        birthday: BirthdayTemplate,
        // ... otros templates
    };

    const Template = templates[eventDetails.eventType];


    return <Template eventDetails={eventDetails} />;

}
