export async function sendRequest({ api, method, data, token }) {
    const url = "";

    const config = {
        method,
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
