const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]")
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#number");
const symbolCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateBtn");
const allcheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = "~!#@$%^&*()<>:;?/_=-+"

let password = "";
let passlength = 10;
let checkCount = 0;
handleSlider();
setIndicator("#ccc");

function handleSlider() {
    inputSlider.value = passlength;
    lengthDisplay.innerText = passlength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize =((passlength - min )*100 /(max-min)) +"% 100%"
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow =`0px 0px 12px 1px ${color}`;
}

function getRndInteger(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}

function generateRandomNumber() {
    return getRndInteger(0, 9);
}

function generateLowercase() {
    return String.fromCharCode(getRndInteger(97, 123));
}

function generateUppercase() {
    return String.fromCharCode(getRndInteger(65, 91));
}

function generateSymbol() {
    const rndNum = getRndInteger(0, symbols.length);
    return symbols.charAt(rndNum);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasSym = false;
    let hasNum = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolCheck.checked) hasSym = true;


    if (hasUpper && hasLower && (hasNum || hasSym) && passlength >= 8) {
        setIndicator("#0f0");

    } else if ((hasLower || hasUpper) && (hasNum || hasSym) && passlength >= 6) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay. value);
        copyMsg.innerText = "Copied";
    } catch (e) {
        copyMsg.innerText = "failed";
    }
    //to make copy span visible
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

function handleCheckboxChange() {
    checkCount = 0;
    allcheckBox.forEach((checkbox) => {
        if (checkbox.checked) checkCount++;

    });
    if (passlength < checkCount) {
        passlength = checkCount;
        handleSlider();
    }
}

allcheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckboxChange);
})

inputSlider.addEventListener('input', (e) => {
    passlength = e.target.value;
    handleSlider();
})


//copy btn
copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value) {
        copyContent();
    }
});
function shufflePassword(array){
    for(let i=array.length-1; i>0; i--){
     const j = Math.floor(Math.random()* (i+1));
     const temp = array[i];
     array[i] = array[j];
     array[j] = temp;
    }
    let str="";
    array.forEach((el)=>(str+=el));
    return str;
 }

generateBtn.addEventListener('click', () => {
    if (checkCount == 0) {
        return;
    }
    if (passlength < checkCount) {
        passlength = checkCount;
        handleSlider();
    }
    //remove old pass
    password = "";

    let funArr = [];
    if (uppercaseCheck.checked)
        funArr.push(generateUppercase);

    if (lowercaseCheck.checked)
        funArr.push(generateLowercase);

    if (numbersCheck.checked)
        funArr.push(generateRandomNumber);

    if (symbolCheck.checked)
        funArr.push(generateSymbol);

    for (let i = 0; i < funArr.length; i++) {
        password += u = funArr[i]();
    }
    console.log("compulsory addition done");
    for(let i=0;i<passlength-funArr.length;i++){
        let randIdx = getRndInteger(0, funArr.length);
        console.log("rand inedex"+ randIdx);
        password+=funArr[randIdx]();
    }

    console.log("remaining addition done");
    //shuffle password

    password =shufflePassword(Array.from(password));
    console.log("Shffling done");
    //show in ui
    passwordDisplay.value=password;
    console.log("ui add done");

    //calculate strength
    calcStrength();
})

