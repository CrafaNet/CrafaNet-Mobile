export function getBasePhoneNumber(fullPhoneNumber) {
    return fullPhoneNumber.slice(-10);
}

export function getDialCodeFromPhone(fullPhoneNumber) {
    return fullPhoneNumber.substring(0, fullPhoneNumber.length - 10);
}
