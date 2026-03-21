

import Cookies from "js-cookie";
import type { LoginFormValuesPanel } from "../hooks/validation/loginschema";
import { apiInstancesPanel } from "../../../core/services/ApiInstancePanel";


export const loginPanel = async (data: LoginFormValuesPanel) => {
    const response = await apiInstancesPanel.post(`/panel/login`, data);
    if (response.status === 201) {
        Cookies.set("tokenp", response.data.accessToken);
        Cookies.set("refreshTokenp", response.data.refreshToken);
        return response;
    };

    return response;
};