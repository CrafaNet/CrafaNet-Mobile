export function getBasePhoneNumber(fullPhoneNumber) {
    if (!fullPhoneNumber) return;
    return fullPhoneNumber.slice(-10);
}

export function getDialCodeFromPhone(fullPhoneNumber) {
    if (!fullPhoneNumber) return;
    return fullPhoneNumber.substring(0, fullPhoneNumber.length - 10);
}
