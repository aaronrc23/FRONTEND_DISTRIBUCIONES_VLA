import AboutUs from "./AboutUs";
import Beneficios from "./Beneficios";
import Hero from "./Hero";
import Historia from "./Historia";
import Valores from "./Valores";


export default function LytLanding() {

    return (
        <div className="w-full h-full ">

            <Hero />

            <Beneficios />
            <AboutUs />
            <Historia />
            <Valores />

            {/* <NuestrosProductos /> */}
            {/* <Distribudores /> */}

        </div>
    )
}
