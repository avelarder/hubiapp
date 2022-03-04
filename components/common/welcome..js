import React from 'react'
import { useRive } from "rive-react";

function Welcome() {

    const { rive, RiveComponent } = useRive({
        src: "/hubi-welcome.riv",
        animations: "Animation 1",
        autoplay: true,
    });

    return (
        <div className="relative w-screen h-screen  overflow-hidden">
            <RiveComponent className="object-cover w-30 h-30 mt-40 justify-center flex" />

            <div className="absolute w-full py-2.5 top-96 inset-x-0 text-center leading-4  text-white text-xl ">
                <span className="flex flex-1 w-full justify-center">
                    Bienvenido!
                </span>
            </div>
        </div>
    );
}

export default Welcome