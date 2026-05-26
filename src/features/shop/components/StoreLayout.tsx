import { Outlet } from "react-router-dom";
import HeaderStore from "../components/header/HeaderStore";
import Footer from "./landing/Footer";
import MdShop from "../common/modales/MdShop";




export default function StoreLayout() {
    return (
        <section className="w-full min-h-screen flex flex-col bg-bgshop">
            {/* <TopBanner /> */}
            <HeaderStore />
            <main className="flex-1 w-full min-h-screen bg-bgshop">
                <Outlet />
            </main>
            <Footer />
            <MdShop />
        </section>
    );
}