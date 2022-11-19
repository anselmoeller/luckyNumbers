//getting the paths...
let numMinInput = document.querySelector('#minNumber');
let numMaxInput = document.querySelector('#maxNumber');
let howManyNumbers = document.querySelector('#howManyNumbers');

let repeatYesChoice = document.querySelector('#repeatModeYes');
let repeatNoChoice = document.querySelector('#repeatModeNo');

let btnRandomIt = document.querySelector('.btnRandomNumbers');
let btnClearAll = document.querySelector('.btnClearNumbers');
let btnCopyNumbers = document.querySelector('.btnCopyNumbers');
let messageCopy = document.querySelector('.messageCopy');
let goToTop = document.querySelector('.goToTop');

let showNumbersRandomizedArea = document.querySelector('.showNumbersRandomizedArea');
let randomizedNumbersText = document.querySelector('.randomizedNumbers');

let randomizedNumbers = [];

btnRandomIt.addEventListener('click', excRandomIt);
btnClearAll.addEventListener('click', clearAllFields);
btnCopyNumbers.addEventListener('click', copyNumbers);
randomizedNumbersText.addEventListener('click', copyNumbers);

document.addEventListener('scroll', ()=>{
    let positionScroll = window.scrollY;

    if(positionScroll > 25){
        goToTop.hidden = false;
    } else {
        goToTop.hidden = true;
    }
})

// /* getting localization of mouse*/
// window.addEventListener('mousemove', (e)=>{
//     let positionX = e.clientX;
//     let positionY = e.clientY;

//     numMinInput.value = positionY;
//     numMaxInput.value = positionX;
// })

/* -------------------------   ----------------------*/
let canExc = true;
let puttingComma = "";

function excRandomIt(){ 
    verifications();

    if(canExc){
        randomizedNumbers = [];
        puttingComma = '';

        btnClearAll.hidden = false;
        btnCopyNumbers.hidden = false;
        showNumbersRandomizedArea.hidden = false;

    
        for(let i = 0; i < parseInt(howManyNumbers.value);){
            let resultNumberRandom = 
            Math.floor(Math.random() * (parseInt(numMaxInput.value) - parseInt(numMinInput.value) +1)) + parseInt(numMinInput.value);
    
            if(repeatNoChoice.checked === true){
                if(randomizedNumbers.indexOf(resultNumberRandom) === -1){
                    randomizedNumbers.push(resultNumberRandom);
                    i++;
                }
            } else {
                randomizedNumbers.push(resultNumberRandom);
                    i++;
            }
        };
    
        for(let i = 0; i < randomizedNumbers.length; i++){
    
            if(i < randomizedNumbers.length -1){
                puttingComma += `${randomizedNumbers[i]}, `;
            }else {
                puttingComma += `${randomizedNumbers[i]}`;
            }
        };
    
        randomizedNumbersText.innerText = puttingComma;
    }
};  


function verifications(){
    if(numMaxInput.value === "" || numMinInput.value === "" || howManyNumbers.value === ""){
        canExc = false;
        alert('Please, fill all fields to proceed.');

    } else if(parseInt(numMinInput.value) >= parseInt(numMaxInput.value)){
        canExc = false;
        alert("The min number can't be equal or greater than max number.");

    } else if(isNaN(parseInt(numMaxInput.value)) || isNaN(parseInt(numMinInput.value)) || isNaN(parseInt(howManyNumbers.value))){
        canExc = false;
        alert("It is only permitted numbers. Please, fix it.");

    } else if(parseInt(howManyNumbers.value) > 1000){
        canExc = false;
        alert("I is not possible to generate more than 1000 numbers");

    } else if(parseInt(numMinInput.value) < - 1000000000 || (parseInt(numMaxInput.value) > 1000000000)){
        canExc = false;
        alert("Values greater than 1 billion or lesser than -1 billion are not allowed.");
    } else if((parseInt(numMaxInput.value) - parseInt(numMinInput.value) +1) < parseInt(howManyNumbers.value) && repeatNoChoice.checked){
        canExc = false;
        alert("The amount of values to draw exceeds the min and max informed.");     
    } else {
        canExc = true;
    }
}

function clearAllFields(){
    randomizedNumbers = [];
    canExc = true;
    puttingComma = "";

    numMaxInput.value = '';
    numMinInput.value = '';
    howManyNumbers.value = '';
    randomizedNumbersText.innerText = '';

    btnClearAll.hidden = true;
    btnCopyNumbers.hidden = true;
    showNumbersRandomizedArea.hidden = true;
}

function copyNumbers(e){
    navigator.clipboard.writeText(randomizedNumbersText.innerText);
    timertoshowMessage();

    let positionX = e.clientX;
    let positionY = e.clientY;
    
    messageCopy.style.top = positionY + 'px';
    messageCopy.style.left = positionX + 'px';

}

function timertoshowMessage(){
    messageCopy.hidden = false;
    setTimeout(()=>{
        messageCopy.hidden = true;
    }, 777)
}
