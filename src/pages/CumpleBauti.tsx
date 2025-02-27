import { BirthdayTemplate } from "@/templates/BirthdayTemplate";
import { EventDetails } from "@/types/event";


export const CumpleBauti: React.FC = () => {
    const eventDetails: EventDetails = {
        name: 'Bauti',
        age: 5,
        date: '2025-03-16T18:00:00',
        end_date: '2025-03-16T20:00:00',
        location: 'El Patio Eventos',
        heroImage: "src/assets/img/bauti5/heroBauti.webp",
        carouselImages: [
            "src/assets/img/bauti5/carousel/sur-digital-bauti0.webp",
            "src/assets/img/bauti5/carousel/sur-digital-bauti00.webp",
            "src/assets/img/bauti5/carousel/sur-digital-bauti01.webp",
            "src/assets/img/bauti5/carousel/sur-digital-bauti02.webp",
            "src/assets/img/bauti5/carousel/sur-digital-bauti1.webp",
            "src/assets/img/bauti5/carousel/sur-digital-bauti2.webp",
            "src/assets/img/bauti5/carousel/sur-digital-bauti2-1.webp",
            "src/assets/img/bauti5/carousel/sur-digital-bauti32.webp",
            "src/assets/img/bauti5/carousel/sur-digital-bauti3.webp",
            "src/assets/img/bauti5/carousel/sur-digital-bauti4.webp",
            "src/assets/img/bauti5/carousel/sur-digital-bauti31.webp",
            "src/assets/img/bauti5/carousel/sur-digital-bauti40.webp",
            "src/assets/img/bauti5/carousel/sur-digital-bauti41.webp",
            
        ],
        eventType: 'birthday',
        coordinates: {
            lat: -34.45614,
            lng: -59.434722
        },
        contact: 'profemilagrosfunes@gmail.com'
    }

    const templates = {
        birthday: BirthdayTemplate,
        // ... otros templates
    };

    const Template = templates[eventDetails.eventType];


    return <Template eventDetails={eventDetails} />;

}
