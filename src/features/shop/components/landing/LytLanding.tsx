import AboutUs from "./AboutUs";
import Beneficios from "./Beneficios";
import Hero from "./Hero";
import Historia from "./Historia";
import Valores from "./Valores";
import WhyUsSection from "../shared/WhyUsSection";


export default function LytLanding() {

    return (
        <div className="w-full h-full ">

            <Hero />

            <Beneficios />

            {/* Misión y Visión con gradiente */}
            <AboutUs />

            <Historia />

            <WhyUsSection />

            <Valores />

            {/* <NuestrosProductos /> */}
            {/* <Distribudores /> */}

        </div>
    )
}
