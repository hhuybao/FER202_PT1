export const isInValidEmail = (str) => {
    if (!str.includes('@')) {
        return
    }
    const mailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !mailReg.test(str)
}