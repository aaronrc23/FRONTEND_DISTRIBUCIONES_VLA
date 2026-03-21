import { Outlet } from "react-router-dom";
import HeaderStore from "../components/header/HeaderStore";
import NavbarBottom from "../components/header/NavbarBotom";

export default function StoreLayout() {
    return (
        <section className="w-full min-h-screen dark:bg-zinc-900/80">

            {/* 🔝 Siempre visible */}
            <HeaderStore />
            <NavbarBottom />

            {/* 🔄 Aquí cambia el contenido */}
            <main className="pt-2">
                <Outlet />
            </main>

        </section>
    );
}