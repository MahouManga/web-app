'use client';
import Image from "next/image";
import { useState } from "react";

export default function Background({ serie }: any) {
    const [imgSrc, setImgSrc] = useState(`/images/series/${serie.id}/posterImage`);

    const handleError = () => {
        setImgSrc('/noImage.jpg');
    };

    return (
        <div className="w-full h-full absolute overflow-hidden z-10">
            <div style={{ willChange: 'transform', transform: 'translateY(-27.3309%) scale(1)' }}>
                <Image alt="Serie Title" width={1000} height={600} onError={handleError}
                loading="lazy" src={imgSrc} className="w-full h-auto blur" />
            </div>
        </div>
    )
}