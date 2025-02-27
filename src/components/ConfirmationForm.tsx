import { useState } from "react";
import { db } from "@/utils/firebaseConfig";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

import emailjs from "@emailjs/browser";

interface FormData {
    name: string;
    celular: string;
    guests: number;
}

interface ConfirmationFormProp {
    contact: string;
}

export const ConfirmationForm: React.FC<ConfirmationFormProp> = ({ contact }) => {
    // Estado del formulario
    const [formData, setFormData] = useState<FormData>({
        name: '',
        celular: '',
        guests: 0,
    });

    // Estado de los errores y éxito
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Manejar cambios en los inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Para el campo celular, solo permitir números
        if (name === 'celular') {
            // Eliminar cualquier carácter que no sea número
            const numericValue = value.replace(/\D/g, '');
            setFormData({
                ...formData,
                [name]: numericValue,
            });
        } else {
            setFormData({
                ...formData,
                [name]: name === 'guests' ? Number(value) : value,
            });
        }
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Evitar múltiples envíos
        if (isSubmitting) {
            return;
        }

        // Validación simple
        if (!formData.name || !formData.celular || formData.guests <= 0) {
            setError('Por favor, complete todos los campos correctamente.');
            setSuccess(null);
            return;
        }

        // Activar estado de carga
        setIsSubmitting(true);

        try {
            // Verificar si el celular ya existe
            const confirmacionesRef = collection(db, 'confirmaciones');
            const celularExists = await checkIfCelularExists(formData.celular);

            if (celularExists) {
                setError('Este número de celular ya ha sido registrado para la confirmación.');
                setSuccess(null);
                return;
            }

            // Guardar los datos en Firestore
            await addDoc(confirmacionesRef, {
                ...formData,
                timestamp: new Date(),
            });

            // Enviar correo al organizador
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    to_email: contact,
                    from_name: formData.name,
                    from_celular: formData.celular,
                    guests: formData.guests,

                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            ).then(response => {
                console.log("Correo enviado con éxito:", response);
            }).catch(error => {
                console.error("Error al enviar el correo:", error);
            });

            setSuccess('¡Confirmación enviada con éxito!');
            setError(null);
            setFormData({ name: '', celular: '', guests: 0 }); // Limpiar el formulario
        } catch (err) {
            setError('Hubo un error al enviar la confirmación. Intente nuevamente.');
            console.error(err)
            setSuccess(null);
        } finally {
            // Desactivar estado de carga independientemente del resultado
            setIsSubmitting(false);
        }
    };

    // Función para verificar si el celular ya existe en la colección
    const checkIfCelularExists = async (celular: string): Promise<boolean> => {
        const confirmacionesRef = collection(db, 'confirmaciones');
        const q = query(confirmacionesRef, where('celular', '==', celular)); // Se usa `query` y `where`

        const querySnapshot = await getDocs(q); // Se usa `getDocs` para obtener los resultados
        return !querySnapshot.empty; // Retorna `true` si el celular ya existe
    };

    return (
        <div className="w-full max-w-lg mx-auto p-6 bg-white border-2 border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Confirma tu Asistencia</h2>

            {/* Mensajes de error o éxito */}
            {error && <div className="text-red-600 mb-4">{error}</div>}
            {success && <div className="text-green-600 mb-4">{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-lg font-semibold">Nombre</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="w-full p-2 mt-2 border border-gray-300 rounded"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="celular" className="block text-lg font-semibold">
                        Número de Celular <span className="text-sm font-normal text-gray-600">(solo números, sin 0 ni 15)</span>
                    </label>
                    <input
                        id="celular"
                        name="celular"
                        type="tel"
                        inputMode="numeric"
                        className="w-full p-2 mt-2 border border-gray-300 rounded"
                        value={formData.celular}
                        onChange={handleChange}
                        pattern="[0-9]*"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="guests" className="block text-lg font-semibold">Número de Invitados</label>
                    <input
                        id="guests"
                        name="guests"
                        type="number"
                        className="w-full p-2 mt-2 border border-gray-300 rounded"
                        value={formData.guests}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className={`w-full py-2 text-white rounded transition ${isSubmitting
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Enviando..." : "Confirmar Asistencia"}
                </button>
            </form>
        </div>
    );
};