import { QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient();

export async function sendRequest({ api, data, token }) {
    const url = "http://31.223.111.227:3000";

    const config = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api, data: { token, ...data } }),
    };

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
