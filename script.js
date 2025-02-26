const InputEl = document.querySelector("#password");
const upperCaseCheckEl = document.querySelector("#uppercase-check");
const numberCheckEl = document.querySelector("#numbers-check");
const symbolCheckEl = document.querySelector("#symbol-check");
const securityIndicatorBarEl = document.querySelector("#security-indicator-bar");

let passwordLength = 16;

function generatePassword() {
    let chars = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "123456789";
    const symbolChars = "?!@&*()[]";

    if (upperCaseCheckEl.checked) chars += upperCaseChars;
    if (numberCheckEl.checked) chars += numberChars;
    if (symbolCheckEl.checked) chars += symbolChars;

    let password = "";
    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }

    InputEl.value = password;
    calculateQuality();
}

function calculateQuality() {
    const percent = Math.round(
        (passwordLength / 64) * 25 +
        (upperCaseCheckEl.checked ? 15 : 0) +
        (numberCheckEl.checked ? 25 : 0) +
        (symbolCheckEl.checked ? 35 : 0)
    );

    securityIndicatorBarEl.style.width = `${percent}%`;

    if (percent > 69) {
        securityIndicatorBarEl.classList.remove('critical');
        securityIndicatorBarEl.classList.remove('warning');
        securityIndicatorBarEl.classList.add('safe');
    } else if (percent > 50) {
        securityIndicatorBarEl.classList.remove('critical');
        securityIndicatorBarEl.classList.add('warning');
        securityIndicatorBarEl.classList.remove('safe');
    } else {
        securityIndicatorBarEl.classList.add('critical');
        securityIndicatorBarEl.classList.remove('warning');
        securityIndicatorBarEl.classList.remove('safe');
    }
}

function copyPassword() {
    navigator.clipboard.writeText(InputEl.value);
}

const passwordLengthEl = document.querySelector("#password-length");
passwordLengthEl.addEventListener("input", () => {
    passwordLength = Number.parseInt(passwordLengthEl.value);
    document.querySelector("#password-length-text").innerText = passwordLength;
    generatePassword();
});

upperCaseCheckEl.addEventListener('click', generatePassword);
numberCheckEl.addEventListener('click', generatePassword);
symbolCheckEl.addEventListener('click', generatePassword);

document.querySelector('#copy-one').addEventListener('click', copyPassword);
document.querySelector('#copy-two').addEventListener('click', copyPassword);

generatePassword();