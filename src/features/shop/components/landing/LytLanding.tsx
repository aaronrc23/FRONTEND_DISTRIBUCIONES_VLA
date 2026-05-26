


import AboutUs from "./AboutUs";
import Beneficios from "./Beneficios";
import Distribudores from "./Distribudores";
import Hero from "./Hero";
import NuestrosProductos from "./NuestrosProductos";


export default function LytLanding() {

    return (
        <div className="w-full h-full ">

            <Hero />

            <Beneficios />
            <AboutUs />

            <NuestrosProductos />
            <Distribudores />
            {/*
            <About /> */}


        </div>
    )
}
