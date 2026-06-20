import { useQuery } from "@tanstack/react-query";
import { getFooterPublic } from "../services/FooterService";

const FALLBACK_NUMBER = "51999888777";

export const useWhatsappNumber = () => {
    const { data } = useQuery({
        queryKey: ["footer-public"],
        queryFn: getFooterPublic,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60, // 1 min
    });

    if (!data) return FALLBACK_NUMBER;

    const footerData = Array.isArray(data) ? data[0] : data;
    const number = footerData?.whatsapp?.replace(/[^0-9]/g, "");

    return number || FALLBACK_NUMBER;
};
