import { Texto } from "../../../../shared/ui";
import FrmaddProductos from "../components/forms/FrmaddProductos";

export default function LytAddProductos() {
    return (
        <div className=" w-full min-h-screen flex items-start justify-center p-2 md:p-6">
            <div className="w-full  flex flex-col items-start">
                
                <Texto variant={"subtitle"} weight="bold" className="mb-2">
                    Agregar Producto
                </Texto>
                <Texto variant={"small"} className="text-muted-foreground mb-6" >Completa la información para registrar un nuevo producto en el catálogo</Texto>

                <FrmaddProductos />
            </div>
        </div>
    );
}