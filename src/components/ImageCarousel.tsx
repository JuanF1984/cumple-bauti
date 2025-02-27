import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css';
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";

interface ImageCarouselProps {
    images: string[];

}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
    const slidesPerView = window.innerWidth < 640 ? 1.5 : 3
    return (
        <div className={`flex justify-center items-center ${window.innerWidth < 640 ? 'h-80' : 'min-h-screen'} w-full bg-transparent`}>
            <Swiper
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={slidesPerView} // Ajusta para más o menos profundidad

                coverflowEffect={{
                    rotate: 30,
                    stretch: 0,
                    depth: 120,
                    modifier: 1,
                    slideShadows: false,
                }}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="bg-transparent"
            >
                {images.map((src, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
                            <img
                                src={src}
                                alt={`Slide ${index}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

