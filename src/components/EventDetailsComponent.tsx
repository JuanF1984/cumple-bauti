import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog";

import { MapPin, Clock, CalendarRange, Gift } from "lucide-react"
import { EventDetails } from "@/types/event"

interface EventDetailsComponentProps {
    event: EventDetails
}

export const EventDetailsComponent: React.FC<EventDetailsComponentProps> = ({ event }) => {
    const [isMapOpen, setIsMapOpen] = useState(false);

    const handleLocationClick = () => {
        setIsMapOpen(true);
    };

    const getDirectionsUrl = () => {
        const { lat, lng } = event.coordinates;
        return `https://www.openstreetmap.org/directions?from=&to=${lat}%2C${lng}`;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };

        // Formatear la fecha en español
        const formattedDate = date.toLocaleDateString('es-ES', options);

        // Capitalizar la primera letra y formatear la hora
        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    };

    // Función para mostrar el rango de fechas (si hay fecha de finalización)
    const getDateDisplay = () => {
        // Si no hay fecha de finalización, mostrar solo la fecha de inicio
        if (!event.end_date) {
            return (
                <div className="flex items-center">
                    <Clock className="mr-4 text-blue-500" />
                    <span className="text-lg font-semibold">{formatDate(event.date)}</span>
                </div>
            );
        }

        // Si la fecha de inicio y fin son el mismo día
        const startDate = new Date(event.date);
        const endDate = new Date(event.end_date);

        if (startDate.toDateString() === endDate.toDateString()) {
            // Mismo día, mostrar rango de horas
            const startOptions: Intl.DateTimeFormatOptions = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            };

            const timeOptions: Intl.DateTimeFormatOptions = {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            };

            const dateFormatted = startDate.toLocaleDateString('es-ES', startOptions);
            const startTimeFormatted = startDate.toLocaleTimeString('es-ES', timeOptions);
            const endTimeFormatted = endDate.toLocaleTimeString('es-ES', timeOptions);

            return (
                <>
                    <div className="flex items-center">
                        <CalendarRange className="mr-4 text-blue-500" />
                        <span className="text-lg font-semibold">
                            {dateFormatted.charAt(0).toUpperCase() + dateFormatted.slice(1)}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="mr-4 text-blue-500" />
                        <span className="text-lg font-semibold">
                            De {startTimeFormatted} a {endTimeFormatted}
                        </span>
                    </div>
                </>
            );
        } else {
            // Días diferentes, mostrar rango completo
            return (
                <>
                    <div className="flex items-center">
                        <Clock className="mr-4 text-blue-500" />
                        <div className="flex flex-col">
                            <span className="text-lg font-semibold">Inicio: {formatDate(event.date)}</span>
                            <span className="text-lg font-semibold">Fin: {formatDate(event.end_date)}</span>
                        </div>
                    </div>
                </>
            );
        }
    };

    return (
        <>
            <Card className="w-full max-w-md mx-auto my-8 bg-white border-4 border-blue-500 rounded-lg shadow-lg">
                <CardHeader className="bg-blue-500 rounded-t-lg p-4">
                    <CardTitle className="text-center text-white text-xl font-bold">Detalles del Evento</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 p-4">
                        <div
                            className="flex items-center cursor-pointer hover:text-blue-600 transition-colors"
                            onClick={handleLocationClick}
                        >
                            <MapPin className="mr-4 text-blue-500" />
                            <span className="text-lg font-semibold">{event.location}</span>
                        </div>

                        {/* Nuevo componente de fecha que maneja tanto fecha de inicio como de fin */}
                        {getDateDisplay()}

                        <div className="flex items-center">
                            <Gift className="mr-4 text-blue-500" />
                            <span className="text-lg font-semibold">¡Acompáñanos a celebrar!</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle className="flex justify-between items-center">
                            <span className="text-lg font-bold">Cómo llegar a {event.location}</span>
                        </DialogTitle>
                    </DialogHeader>
                    <div className="aspect-video w-full relative">
                        <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight={0}
                            marginWidth={0}
                            src={`https://www.openstreetmap.org/export/embed.html?bbox=${event.coordinates.lng - 0.01}%2C${event.coordinates.lat - 0.01}%2C${event.coordinates.lng + 0.01}%2C${event.coordinates.lat + 0.01}&layer=mapnik&marker=${event.coordinates.lat}%2C${event.coordinates.lng}`}
                        />
                    </div>
                    <div className="flex justify-center mt-4">
                        <a
                            href={getDirectionsUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Obtener Direcciones
                        </a>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};