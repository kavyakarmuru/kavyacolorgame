var player1=prompt("enter name of the first player");
var player1color= 'rgb(255, 165, 0)';
var player2=prompt("enter the name of second player");
var player2color='rgb(255, 222, 33)';

var game_on=true;
var table=$('table tr');

function changeColor(rowindex,colindex,color){
    return table.eq(rowindex).find('td').eq(colindex).find('button').css('background-color',color);
}

function returnColor(rowindex,colindex){
    return table.eq(rowindex).find('td').eq(colindex).find('button').css('background-color');
}

function checkbottom(colindex){
    var colorreport=returnColor(5,colindex);
    for(var row=5;row>0;row--){
        colorreport=returnColor(row,colindex);
        if(colorreport==='rgb(128, 128, 128)'){
            return row;
        }
    }
}

function colormatchcheck(one,two,three,four){
    return (one===two && one===three && one===four && one!='rgb(128, 128, 128)' && one!=undefined);
}

function horizontalwincheck(){
    for(var row=1;row<6;row++){
        for(var col=1;col<5;col++){
            if(colormatchcheck(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3))){
                console.log('horizontal');
                return true;
            }else{
                continue;
            }
        }
    }
}

function verticalwincheck(){
    for(var col=1;col<6;col++){
        for(var row=1;row<5;row++){
            if(colormatchcheck(returnColor(row,col),returnColor(row+1,col),returnColor(row+2,col),returnColor(row+3,col))){
                console.log('vertical');
                return true;
            }else{
                continue;
            }
        }
    }
}

function diagonalwincheck(){
    for(var col=1;col<5;col++){
        for(var row=1;row<6;row++){
            if(colormatchcheck(returnColor(row,col),returnColor(row+1,col+1),returnColor(row+2,col+2),returnColor(row+3,col+3))){
                console.log('diagonal');
                return true;
            }else if(colormatchcheck(returnColor(row,col),returnColor(row-1,col+1),returnColor(row-2,col+2),returnColor(row-3,col+3))){
                console.log('diagonal');
                return true;  
            }else{
                continue;
            }
        }
    }
}

var currentplayer=1;
var currentname=player1;
var currentcolor=player1color;
$('h3').text(player1+" it is your turn, pick a column to drop in!")
$('#check button').on('click',function(){
    var col=$(this).closest('td').index();
    var bottomaval=checkbottom(col);
    changeColor(bottomaval,col,currentcolor);
    if(horizontalwincheck() || verticalwincheck() || diagonalwincheck()){
        $('h1').text(currentname+" You have won!")
        //$('h3').fadeout('fast');
        //$('h2').fadeout('fast');
    }
    currentplayer=currentplayer*-1;
    if(currentplayer===1){
        currentname=player1;
        $('h3').text(currentname+" it is your turn.")
        currentcolor=player1color;
    }else{
        currentname=player2;
        $('h3').text(currentname+" it is your turn")
        currentcolor=player2color;
    }
})