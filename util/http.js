import { QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient();

export async function sendRequest({ api, data, token, method = "POST", url = "https://crafanet.exnoremo.com" }) {
    /*
        api paths are not appended to the url but are appended to body due to security reasons
        and token is appended to data object due to same reasons
    */

    // method default is POST since our api's include only post requests
    const config = { method, headers: { "Content-Type": "application/json" } };
    if (method === "POST") config.body = JSON.stringify({ api, data: { token, ...data } });

    const response = await fetch(url, config);

    if (!response.ok) {
        const error = new Error("An error occurred while sending request!");
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const result = await response.json();

    return result;
}
