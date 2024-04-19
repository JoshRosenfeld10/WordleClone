const checkAlphabetic = (input) => {
    if (input === 'DELETE' || input === 'META') return false
    for (const char of input) {
        if (!(char >= "a" && char <= "z") &&
            !(char >= "A" && char <= "Z")) {
            return false;
        }
    }
    return true;
}

export default checkAlphabetic;