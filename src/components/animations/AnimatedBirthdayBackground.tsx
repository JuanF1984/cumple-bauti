import { motion } from "framer-motion"

export const AnimatedBirthdayBackground: React.FC = () => {
    const balloons = Array.from({ length: 10 });

    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden bg-gradient-to-b from-blue-300 to-pink-300">
            {/* Globos animados */}
            {balloons.map((_, index) => {
                const delay = Math.random() * 5;
                const duration = 10 + Math.random() * 5;
                const startX = Math.random() * 100;
                const size = 40 + Math.random() * 60;

                return (
                    <motion.div
                        key={index}
                        initial={{ y: "100vh", x: `${startX}vw`, opacity: 0 }}
                        animate={{ y: "-10vh", opacity: 1 }}
                        transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-0"
                    >
                        <div
                            className="rounded-full bg-red-400 shadow-lg"
                            style={{ width: `${size}px`, height: `${size}px` }}
                        />
                    </motion.div>
                );
            })}
        </div>
    );
}
