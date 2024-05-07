const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validatePassword = (password) => {
    return password.length >= 6;
};

const validateFullName = (fullName) => {
    const re = /^[a-zA-Z\s]+$/;
    return re.test(fullName);
};

module.exports = {validateEmail,validatePassword,validateFullName};