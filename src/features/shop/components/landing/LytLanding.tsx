import AboutUs from "./AboutUs";
import Beneficios from "./Beneficios";
import Distribudores from "./Distribudores";
import Hero from "./Hero";
import Historia from "./Historia";
import Valores from "./Valores";
import NuestrosProductos from "./NuestrosProductos";


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
