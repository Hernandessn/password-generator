const InputEl = document.querySelector("#password");
const upperCaseCheckEl = document.querySelector("#uppercase-check");
const numberCheckEl = document.querySelector("#numbers-check");
const symbolCheckEl = document.querySelector("#symbol-check");
const securityIndicatorBarEl = document.querySelector("#security-indicator-bar");
const buttonCopy = document.querySelector("#copy-two");

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
    calculateFontSize();
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

        buttonCopy.classList.remove('critical');
        buttonCopy.classList.remove('warning');
        buttonCopy.classList.add('safe');
    } else if (percent > 50) {
        securityIndicatorBarEl.classList.remove('critical');
        securityIndicatorBarEl.classList.add('warning');
        securityIndicatorBarEl.classList.remove('safe');

        buttonCopy.classList.remove('critical');
        buttonCopy.classList.add('warning');
        buttonCopy.classList.remove('safe');
    } else {
        securityIndicatorBarEl.classList.add('critical');
        securityIndicatorBarEl.classList.remove('warning');
        securityIndicatorBarEl.classList.remove('safe');

        buttonCopy.classList.add('critical');
        buttonCopy.classList.remove('warning');
        buttonCopy.classList.remove('safe');
    }
}

function calculateFontSize(){
    if(passwordLength > 45){
        InputEl.classList.remove('font-sm');
        InputEl.classList.remove('font-xs');
        InputEl.classList.add('font-xxs');
    }else if(passwordLength > 32){
        InputEl.classList.remove('font-sm');
        InputEl.classList.add('font-xs');
        InputEl.classList.remove('font-xxs');
    }else if(passwordLength > 22){
        InputEl.classList.add('font-sm');
        InputEl.classList.remove('font-xs');
        InputEl.classList.remove('font-xxs');
    }else{
        InputEl.classList.remove('font-sm');
        InputEl.classList.remove('font-xs');
        InputEl.classList.remove('font-xxs');
    }
}

function copyPassword() {
    navigator.clipboard.writeText(InputEl.value);
}

function RenewPassword(){
    generatePassword()
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

document.querySelector("#renew").addEventListener('click', RenewPassword);


generatePassword();