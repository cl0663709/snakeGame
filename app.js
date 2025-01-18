let arr=[]
let row =[]
let score=0,highscore=0;
let arrcells=[[0,0],[0,1],[0,2]];



let currow=0,curcol=0,prevdirection='ArrowRight',direction='ArrowRight';
if (localStorage.getItem("highScore") === null) {
    localStorage.setItem("highScore", "0");
}
highscore=parseInt(localStorage.getItem("highScore"),10);
document.getElementById("displayHighScore").innerHTML=highscore;


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

while(true){
    let startFoodRow = Math.floor(Math.random()*19);
    let startFoodCol = Math.floor(Math.random()*19);
    if(startFoodRow >0)break;
}


arr[startFoodRow][startFoodCol].style.backgroundColor="cyan";
arr[startFoodRow][startFoodCol].style.borderRadius="70px";
console.log(arr.length);
console.log(arr);


let i=0;

document.addEventListener('keyup' , 
function(e){
    prevdirection=direction;
    direction = e.key;
}
)


function startgame(){
currow=0,curcol=0,prevdirection='ArrowRight',direction='ArrowRight';
for(let i=0;i<arrcells.length;i++){
            arr[arrcells[i][0]][arrcells[i][1]].style.backgroundColor="black";
        }
arrcells=[[0,0],[0,1],[0,2]];
console.log(score ," ",highscore);

if (score > highscore) {
        highscore = score;
        localStorage.setItem("highScore", highscore.toString());
    }
    score=0;
    document.getElementById("displayHighScore").innerHTML = highscore;
    document.querySelector("span").innerHTML=score;
    document.getElementById("dialogbox").style.display="none";
    movesnake = setInterval(moveAhead,300);
}




function moveAhead(){

    let tailrow = arrcells[arrcells.length-1][0];
    let tailcol = arrcells[arrcells.length-1][1];
    if( prevdirection=="ArrowRight" && direction =="ArrowLeft")direction=prevdirection;
    else if( prevdirection=="ArrowLeft" && direction =="ArrowRight")direction=prevdirection;
    else if( prevdirection=="ArrowUp" && direction =="ArrowDown")direction=prevdirection;
    else if( prevdirection=="ArrowDown" && direction =="ArrowUp"  )direction=prevdirection;
                      
    
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
 let movesnake = setInterval(moveAhead,300);
