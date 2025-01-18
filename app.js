const rows = 20; 
const cols = 20;
const table = document.querySelector("table");

for (let i = 0; i < rows; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < cols; j++) {
        const cell = document.createElement("td");
        cell.id = `cell_${i * cols + j + 1}`; 
        row.appendChild(cell);
    }
    table.appendChild(row);
}



let arr=[]
let row =[]
let score=0,highScore=0;
let arrcells=[[0,0],[0,1],[0,2]];
let currow=0,curcol=0,prevDirection='ArrowRight',direction='ArrowRight';

if (localStorage.getItem("highScore") === null) {
    localStorage.setItem("highScore", "0");
}
highScore=parseInt(localStorage.getItem("highScore"),10);
document.getElementById("displayHighScore").innerHTML=highScore;


for(let i=1;i<=400;i++){
    if(i % 20 == 0){
    let cell=document.getElementById(`cell_${i}`);
    row.push(cell);
    arr.push(row);
    row=[];
    }
    else{
        let cell=document.getElementById(`cell_${i}`);
        row.push(cell);
    }
}

let initialFoodRow,initialFoodCol;

let i=0;

while(true){
    initialFoodRow = Math.floor(Math.random()*20),initialFoodCol=Math.floor(Math.random()*20);
    if(initialFoodRow>0) break;
}

arr[initialFoodRow][initialFoodCol].style.backgroundColor="cyan";
arr[initialFoodRow][initialFoodCol].style.borderRadius="70px";



document.addEventListener('keyup' , 
function(e){
    prevDirection=direction;
    if(e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "ArrowLeft")direction = e.key;
}
)


function startGameAgain(){
currow=0,curcol=0,prevDirection='ArrowRight',direction='ArrowRight';
for(let i=0;i<arrcells.length;i++){
            arr[arrcells[i][0]][arrcells[i][1]].style.backgroundColor="black";
        }
arrcells=[[0,0],[0,1],[0,2]];

if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore.toString());
    }
    score=0;
    document.getElementById("displayHighScore").innerHTML = highScore;
    document.querySelector("span").innerHTML=score;
    document.getElementById("dialogbox").style.display="none";
    movesnake = setInterval(moveAhead,300);
}




function moveAhead(){
    let tailrow = arrcells[arrcells.length-1][0];
    let tailcol = arrcells[arrcells.length-1][1];
    if( prevDirection=="ArrowRight" && direction =="ArrowLeft")direction=prevDirection;
    else if( prevDirection=="ArrowLeft" && direction =="ArrowRight")direction=prevDirection;
    else if( prevDirection=="ArrowUp" && direction =="ArrowDown")direction=prevDirection;
    else if( prevDirection=="ArrowDown" && direction =="ArrowUp"  )direction=prevDirection;
                      
    
    if(direction !== ''){
            if(direction==="ArrowUp"){
                currow--;
            }
            else if(direction==="ArrowDown"){
                currow++;
            }
            else if(direction==="ArrowRight"){
                curcol++;
            }
            else if(direction==="ArrowLeft"){
                curcol--;
            }

    }

    let newrow=currow,newcol=curcol,temprow,tempcol;
    

    if((currow >19 || curcol>19)||(currow <0 || curcol<0)){
        clearInterval(movesnake);
        document.getElementById("dialogbox").style.display="block";
        return;
    }
    

    if((arr[currow][curcol].style.backgroundColor==="white")){
        clearInterval(movesnake);
        document.getElementById("dialogbox").style.display="block";
        return;
    }            

    if(arr[currow][curcol].style.backgroundColor==="cyan"){
        arr[currow][curcol].style.borderRadius="5px";
        arr[currow][curcol].style.backgroundColor="white"; 
        for(let i=0;i<arrcells.length;i++){
            temprow = arrcells[i][0];
            tempcol = arrcells[i][1];
            arrcells[i][0]=newrow;
            arrcells[i][1]=newcol;
            newrow=temprow;
            newcol=tempcol;
        }
        let row_col =[newrow,newcol]; 
        arrcells.push(row_col);
        score++;
        document.querySelector("span").innerHTML=score;

        while(true){
            let row = Math.floor(Math.random()*20),col=Math.floor(Math.random()*20);
            if(arr[row][col].style.backgroundColor != "white"){
                arr[row][col].style.backgroundColor ="cyan";
                arr[row][col].style.borderRadius="70px";
                break;
            }

        }
   }

    else {
        arr[tailrow][tailcol].style.backgroundColor="black";
        for(let i=0;i<arrcells.length;i++){
            temprow = arrcells[i][0];
            tempcol = arrcells[i][1];
            arrcells[i][0]=newrow;
            arrcells[i][1]=newcol;
            newrow=temprow;
            newcol=tempcol;
        }
        
        for(let i=0;i<arrcells.length;i++){
                arr[arrcells[i][0]][arrcells[i][1]].style.backgroundColor="white";
                arr[arrcells[i][0]][arrcells[i][1]].style.borderRadius="5px";
                
        }
    }

}
//  let movesnake = setInterval(moveAhead,300);
