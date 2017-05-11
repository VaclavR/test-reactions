var span = document.querySelector("span");
var div = document.querySelector("#div");
var table;
var playground = document.getElementById("playground");
var numberOfLines = Math.floor(window.innerHeight / 21) - 3;

function randomizeNumber(min, max){
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

function generateTable(rows){
  var tbody = document.querySelector("tbody");
  for(var i = 0; i < rows; i++){
    var tr = document.createElement("tr");
    tbody.appendChild(tr);
    for(var x = 0; x < 2; x++){
      var td = document.createElement("td");
      document.querySelector("tbody tr:last-child").appendChild(td);
    }
  }
  table = document.querySelectorAll("tbody tr");
}

generateTable(numberOfLines);

function testYourReactions(){
  var sideLength;
  var startTime;
  var totalTime;
  var results = [];

  function colorGenerator(){
    var color ="rgb(";
    for (var i = 0; i < 3; i++){
      if (i < 2){
      color += randomizeNumber(0, 255) + ", ";
      } else {
        color += randomizeNumber(0,255) + ")";
      }
    }
    div.style.backgroundColor = color;
  }
  
  function positionGenerator(){
    var w = playground.offsetWidth;
    var h = playground.offsetHeight;
    var xPos = randomizeNumber(0, w - sideLength) + "px";
    var yPos = randomizeNumber(0, h - sideLength) + "px";
    div.style.opacity = "1";
    div.style.top = yPos;
    div.style.left = xPos;
    startTime = new Date();
  }
  
  function shapeGenerator(){
    var choice = randomizeNumber(0,1);
    if(choice === 0) {
      div.classList.add("circle");
    } else{
      div.classList.remove("circle");
    } 
  }

  function sizeGenerator(){
    sideLength = randomizeNumber(100, 400);
    div.style.width = sideLength + "px";
    div.style.height = sideLength + "px";
  }
  
  function topTimes(){
    if(results.length < table.length){
      results.push(totalTime);
    }
    if(results.length === table.length){
      if(totalTime < results[table.length-1]){
        results[table.length-1] = totalTime;
      }
    }
    if(results.length > 1){
      results.sort();
    }
    if(results.length > 0){
      for(var i = 0; i < results.length; i++){
        table[i].innerHTML = "<td>" + (i + 1) + ".</td><td>" + results[i] + "s</td>";
      }
    }
  }
 
  function divGenerator(time){
    colorGenerator();
    sizeGenerator();
    shapeGenerator();
    if(time){
      setTimeout(positionGenerator, time);
    } else {
      positionGenerator();
    }
  }
  
  div.onclick = function(){
    var endTime = new Date();
    totalTime = (endTime - startTime)/1000;
    div.style.opacity = "0";
    divGenerator(randomizeNumber(0, 2500));
    span.textContent = totalTime + "s";
    topTimes();
  };
  
  divGenerator();
}

testYourReactions();