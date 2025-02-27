import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface CountdownTimerProps {
    eventDate: string;           // Fecha de inicio
    endDate?: string;            // Fecha de finalización (opcional)
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ eventDate, endDate }) => {
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const [eventStarted, setEventStarted] = useState<boolean>(false);
    const [eventEnded, setEventEnded] = useState<boolean>(false);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = +new Date();
            const startTime = +new Date(eventDate);
            const endTime = endDate ? +new Date(endDate) : null;

            // Verificar si el evento ya comenzó
            if (now >= startTime) {
                setEventStarted(true);

                // Si hay fecha de finalización y no ha terminado, calcular tiempo restante hasta el final
                if (endTime && now < endTime) {
                    const difference = endTime - now;
                    return {
                        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                        minutes: Math.floor((difference / 1000 / 60) % 60),
                        seconds: Math.floor((difference / 1000) % 60)
                    };
                }
                // Si no hay fecha de finalización o ya terminó
                else if (!endTime || now >= endTime) {
                    setEventEnded(true);
                    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
                }
            }

            // Si el evento no ha comenzado, calcular tiempo hasta el inicio
            const difference = startTime - now;
            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                };
            }

            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [eventDate, endDate]);

    // Determinar el título según el estado del evento
    const getCardTitle = () => {
        if (eventEnded) {
            return "🎊 ¡El evento ha finalizado! 🎊";
        } else if (eventStarted) {
            return "⏱️ ¡Tiempo restante del evento! ⏱️";
        } else {
            return "🎉 ¡Faltan para el evento! 🎈";
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto my-12 bg-white border-4 border-pink-500 rounded-lg shadow-lg">
            <CardHeader className="bg-pink-500 rounded-t-lg p-4">
                <CardTitle className="text-center text-white text-2xl font-bold">{getCardTitle()}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-around p-6">
                {eventEnded ? (
                    <div className="text-center w-full">
                        <div className="text-2xl font-bold text-gray-700">¡Gracias por participar!</div>
                    </div>
                ) : (
                    <>
                        <div className="text-center">
                            <div className="text-5xl font-extrabold text-blue-600">{timeLeft.days}</div>
                            <div className="text-lg font-semibold text-gray-700">Días</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-extrabold text-blue-600">{timeLeft.hours}</div>
                            <div className="text-lg font-semibold text-gray-700">Horas</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-extrabold text-blue-600">{timeLeft.minutes}</div>
                            <div className="text-lg font-semibold text-gray-700">Minutos</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-extrabold text-blue-600">{timeLeft.seconds}</div>
                            <div className="text-lg font-semibold text-gray-700">Segundos</div>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}