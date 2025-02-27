import { BirthdayTemplate } from "@/templates/BirthdayTemplate";
import { EventDetails } from "@/types/event";

// Importación de la imagen para el hero
import heroBauti from '/src/assets/img/bauti5/heroBauti.webp';

// Importaciones de las imágenes del carrusel
import carouselImg1 from '/src/assets/img/bauti5/carousel/sur-digital-bauti0.webp';
import carouselImg2 from '/src/assets/img/bauti5/carousel/sur-digital-bauti00.webp';
import carouselImg3 from '/src/assets/img/bauti5/carousel/sur-digital-bauti01.webp';
import carouselImg4 from '/src/assets/img/bauti5/carousel/sur-digital-bauti02.webp';
import carouselImg5 from '/src/assets/img/bauti5/carousel/sur-digital-bauti1.webp';
import carouselImg6 from '/src/assets/img/bauti5/carousel/sur-digital-bauti2.webp';
import carouselImg7 from '/src/assets/img/bauti5/carousel/sur-digital-bauti2-1.webp';
import carouselImg8 from '/src/assets/img/bauti5/carousel/sur-digital-bauti32.webp';
import carouselImg9 from '/src/assets/img/bauti5/carousel/sur-digital-bauti3.webp';
import carouselImg10 from '/src/assets/img/bauti5/carousel/sur-digital-bauti4.webp';
import carouselImg11 from '/src/assets/img/bauti5/carousel/sur-digital-bauti31.webp';
import carouselImg12 from '/src/assets/img/bauti5/carousel/sur-digital-bauti40.webp';
import carouselImg13 from '/src/assets/img/bauti5/carousel/sur-digital-bauti41.webp';



export const CumpleBauti: React.FC = () => {
    const eventDetails: EventDetails = {
        name: 'Bauti',
        age: 5,
        date: '2025-03-16T18:00:00',
        end_date: '2025-03-16T20:00:00',
        location: 'El Patio Eventos',
        heroImage: heroBauti,
        carouselImages: [
            carouselImg1,
            carouselImg2,
            carouselImg3,
            carouselImg4,
            carouselImg5,
            carouselImg6,
            carouselImg7,
            carouselImg8,
            carouselImg9,
            carouselImg10,
            carouselImg11,
            carouselImg12,
            carouselImg13,
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
