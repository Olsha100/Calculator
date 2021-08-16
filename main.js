let cth = document.querySelectorAll(".catch");
let para = document.querySelector(".score");


for (let i=0;i<cth.length;i++) {
    cth[i].addEventListener('click',addToEquation,false);
};

function addToEquation(e){
    if(!para.textContent && (e.target.textContent === '*' || 
                             e.target.textContent === '/' || 
                             e.target.textContent === '+' || 
                             e.target.textContent === "0" ||
                             e.target.textContent === "." ||
                             e.target.textContent === "00")){
        para.textContent = null;
    }
    else if(para.textContent.includes(".") && e.target.textContent === "."){}
    else{para.textContent += e.target.textContent;}
    
}

let cancel = document.querySelector("#C");
cancel.addEventListener("click",() => {
    para.textContent = null;
},false)


let equation = document.querySelector("#equation");
equation.addEventListener("click",()=>{
   
   para.textContent = eval(para.textContent);
    
})
