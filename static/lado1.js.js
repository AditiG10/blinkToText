//Global Variable Initialized
    var capf=false;
    var colsel=0;
    var specialKeys=["RESET","BACKSPACE","SPACE","TAB","CAPS"];
    var row_tim=null,myInt=null;
    var ans="";
    var attr="";
    var text="";
    var input =document.getElementById("input");

//function to change when blink is detected
function detection(){

        //for the first Interrupt
             if(colsel==0 && myInt!=null)
                 {
                   colsel++;
                   //calling row
                   clearInterval(myInt);
                    myInt=null;
                   selectRow(attr);
                }
             else if(colsel==1 && row_tim!=null)
                 {
                     clearInterval(myInt);
                     clearInterval(row_tim);
                     row_tim=null;

                     reset1();
                     colsel++;

                     processRequest(document.getElementById("input").textContent);
                 }
     else
       reset1();     
 }
//Requesting fifo file
function requestFIFO()
{


       $.ajax({
          data: {

              name : "ABHIYAN",
              email : "TIMILSINA"
          },
           type:'POST',
           url : '/process'
        })
       .done(function(data){
           if(data.error)
               {
                   alert("ERROR");
               }
           else
               {
                  if(data.name=="1")
              {

                  detection();

               }
        }

       });
}


//For functional keys

function deligate(key)
{
    if(key=="BACKSPACE")
       {
           text=text.substr(0,text.length-1);
            document.getElementById("final").textContent=text;
       }
    else if(key=="SPACE")
        {
            text+=" ";
             document.getElementById("final").textContent=text;
        }
    else if(key=="CAPS")
        {
            $("li.buttons").remove();
            init(true);
        }
    else if(key=="RESET")
        {
            reset1();
        }
}

//process the request
function processRequest(key)
{
    document.getElementById("input").textContent="";
    if(specialKeys.indexOf(key)==-1)
        {
            text+=key;
            document.getElementById("final").textContent=text;
            colsel=0;
        }
    else
        {
            deligate(key);
        }

}




//jquery ready function

$(document).ready(function(){


    setInterval(requestFIFO,1);

   init(false);


    });




//initializing key board
var keys=['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'];
function init(case1)
{

    if(case1==true)
        {
           $(".light1").css("background-color","green");
            $(".light1").textContent="";
        }
       var arr=[];




    for(var k=0;k<10;k++)
        arr.push(k);

    for(i=0;i<26;i++)
        if(case1==false)
       arr.push(keys[i]);
      else
        arr.push(keys[i].toUpperCase())


    var buttons=$(".keys");
    var str="";
    var col=2;

    var i=1;
    /*while(i<=specialKeys.length)
        {
            str+="<li style='color:blue' class='buttons' row_no='"+ i   +"'col_no='"+ 11 +"'>"+specialKeys[i-1]+"</li>"
            i++;
        }
    str+="<br/>";*/
    for(i=1;i<=arr.length;i++)
    {

        var j=i%10;
        
        if(j==0) j=10;
        str+="<li class='buttons' row_no='"+ col  +"'col_no='"+ j +"'>"+arr[i-1]+"</li>";

        if( i%10==0)
            {
            str+="<br/>";

            col++;
            }

            }
    buttons.html(str);
    nikhil();
}

//Selecting Row and Column

function nikhil()
{

    var col_sel=0;

    myInt=setInterval(function(){

         $(attr).css("background","black");

        col_sel=(col_sel)%10;
        attr="li[col_no="+"'"+(col_sel+1)+"']";

        col_sel++;

        $(attr).css("background","chocolate");

    },2000);
}

//select row

function selectRow(col_num)
{
   $(attr).css("background","black");

    var array1=$(col_num);
    var i=0;
    var mod=array1.length;
    var cnt=0;

    row_tim=setInterval(function(){
          
        j=i%mod;

        if(j!=0)
        array1[j-1].style.backgroundColor="black";
        else if(j==0)
        array1[j+mod-1].style.backgroundColor="black";

        array1[j++].style.backgroundColor="grey";

        i++;
        if(j!=0)
            {

                ans=array1[j-1].innerHTML;


                document.getElementById("input").textContent=ans;
                 ans="";
                rowflag=true;
            }
    },2000);


}

//reset function

function reset1()
{
count=0;
    clearInterval(myInt);
    clearInterval(row_tim);
    colsel=0;
    myInt=null;
    row_tim=null;
    ans="";
    $("li.buttons").remove();
    init(false);

}
