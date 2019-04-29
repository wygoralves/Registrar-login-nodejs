// Variáveis do código
var colors = generateRandomColors(6);
var newcolors = document.querySelector("#newcolors");
var gameheader = document.querySelector("#gameheader");
var pickedcolorh1 = document.querySelector(".pickedcolorh1");
var squares = document.querySelectorAll(".square");
var tryagain = document.querySelector("#tryagain");
var pickedColor = pickColor();
var randomheadercolor = pickColor();
var tryagaintrue = true;
var easybtn = document.querySelector("#easy");
var hardbtn = document.querySelector("#hard");
var numsquares = 6;
var buttons = document.querySelectorAll(".btn");

pickedcolorh1.textContent = pickedColor;
newcolors.addEventListener("click", newcolorsbtn);

easybtn.addEventListener("click",function(){
    easybtn.classList.add("buttonactive");
    hardbtn.classList.remove("buttonactive");
    numsquares=3;
    colors=generateRandomColors(numsquares);
    pickedColor=pickColor();
    pickedcolorh1.textContent=pickedColor;
    for (let i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.backgroundColor=colors[i];
        } else{
            squares[i].style.display="none";
        }   
    }
});

hardbtn.addEventListener("click",function(){
    hardbtn.classList.add("buttonactive");
    numsquares=6;
    easybtn.classList.remove("buttonactive");
    colors = generateRandomColors(numsquares);
    pickedColor = pickColor();
    pickedcolorh1.textContent = pickedColor;
    for (let i = 0; i < squares.length; i++) {
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = "block";
        }
});


for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
    squares[i].addEventListener("click",function(){
        var clickedcolor = squares[i].style.backgroundColor;
        if (clickedcolor===pickedColor) {
            changecolors(clickedcolor);
            tryagain.textContent="Correto!";
            gameheader.style.backgroundColor=pickedColor;
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].style.backgroundColor = pickedColor;
            }
            tryagain.style.color = pickedColor;            
            newcolors.textContent="Jogar novamente?"
        }else{
            this.style.backgroundColor = "#303841";
            tryagain.textContent="Jogar novamente?";
        }
    });
    
}

function changecolors(color){
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickColor(){
    var random=Math.floor(Math.random()*colors.length);
    return colors[random];
}

function updatepickedcolor() {
    pickedcolorh1.textContent = pickedColor;
}

function generateRandomColors(num){
    var arr=[]
    for (let i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    return arr;
}

function randomColor(){
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    return "rgb(" + r +", "+g+", "+b+")";
}

function newcolorsbtn(){
    newcolors.textContent="NOVAS CORES";
    gameheader.style.backgroundColor = "#00adb5";
    tryagain.style.color = "#00adb5";
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = "#00adb5"
    }
    tryagain.textContent=" ";
    colors=generateRandomColors(numsquares);
    pickedColor=pickColor();
    pickedcolorh1.textContent=pickedColor;
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
    }
}

function navbarcolors() {
    easybtn.style.color = pickedColor;
    hardbtn.style.color = pickedColor;
    tryagain.style.color = pickedColor;
    newcolors.style.color = pickedColor;
}