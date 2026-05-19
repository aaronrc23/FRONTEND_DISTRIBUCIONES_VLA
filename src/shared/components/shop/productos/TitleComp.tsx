
import { Texto } from "../../../ui";

export default function TitleComp() {


    return (
        <div className="flex items-center gap-3 py-5">
            {/* 🔵 círculo */}
            <span
                className={`w-4 h-4 rounded-full bg-shoprimary`}
            ></span>

            {/* 📝 título */}
            <Texto variant={"subtitle"}  className="font-bold" >Catalogo</Texto>
        </div>
    );
}