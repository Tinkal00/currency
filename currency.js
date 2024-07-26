const baseURL="https://v6.exchangerate-api.com/v6/1b15a41c8a4858509b0534c2/latest/";

const ConvertBtn=document.querySelector("#Convert-btn");
const result=document.querySelector("#result");
const FromTo2=document.querySelectorAll(".from-to-2 select");
const fromCurrency=document.querySelector("#From select");
const toCurrency=document.querySelector("#To select");
const unitRate=document.querySelector("#unit-rate");
const finalResult=document.querySelector("#final-result")

for(let select of FromTo2){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
          } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
          }
        select.append(newOption);
    }
    select.addEventListener("change", (evt)=>{  //'evt' is a object
        updateFlag(evt.target)  //it is a reference to the object onto which the event was dispatched. Value of the new target object is stored at object 'evt'
    });
}

const updateFlag=(element)=>{
    // console.log(element);
    const currCode=element.value;
    let countryCode=countryList[currCode]
    // console.log(currCode, countryCode);
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}



ConvertBtn.addEventListener("click", async (evt)=>{
    evt.preventDefault();   //To stop any default events
    result.style.visibility="visible" ;
    let amount=document.querySelector(".icone-amount input");
    let amtVal=amount.value;
    console.log(amtVal);

    let fromVall=fromCurrency.value;
    URL=`${baseURL}${fromVall}`;
    let response=await fetch(URL);
    let Data=await response.json();
    let toVall=toCurrency.value;
    console.log("1",fromVall," = ",Data.conversion_rates[toVall],toVall);
    unitRate.innerText=`1 ${fromVall} = ${Data.conversion_rates[toVall]}${toVall}`
    let toVallAmt=Data.conversion_rates[toVall];
    let fromVallAmt=Data.conversion_rates[fromVall];
    total=amtVal*fromVallAmt*toVallAmt;
    console.log("Total : ",total);
    finalResult.innerText=`${amtVal} ${fromVall} = ${total} ${toVall}`
});