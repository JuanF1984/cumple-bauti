export interface EventDetails {
    name: string;
    age?: number;  // opcional para otros tipos de eventos
    date: string;  // fecha de inicio
    end_date?: string;  // fecha de finalización (opcional)
    location: string;
    heroImage: string;
    carouselImages: string[];
    eventType: 'birthday';
    // | 'wedding' | 'corporate' | 'other';
    coordinates: {
        lat: number;
        lng: number;
    }
    contact: string;
}
