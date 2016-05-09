
var events = new Array(1, 10, 20 , 30 ,200, 400, 600, 680, 860, 900, 910, 920, 925, 1000, 1100, 1200);
//var events = new Array(1, 20, 40, 60, 90, 120, 150, 190, 500);
//var events = new Array(5, 10, 15, 20, 25, 35, 45, 55, 65, 75, 85, 95);
//var events = new Array(2,4,6,8,10);
//var events = new Array(50, 100, 150, 200);
var probability = 90;


var offDelay = 5;

var eventCount = 0;
var localFrameCount = 1;
var offDelayCounter = 0;
var inlets = 2;

if (jsarguments.length>1) {
	probability = jsarguments[1];
}

 
// EVENTS
function msg_int(v) {
	post("in msg_int " + v + "\n");
	probability = v;
	work();
}

function bang() {
	//post("in bang \n");
	work();
}

// WORK
function work() {
    if (eventFired()) {              
		if (getChance() > (100 - probability)) {
	  		post("prob: "+probability+" --> "+eventCount+"/"+events.length+": "+events[eventCount]);
			post();
	  		outlet(0, randomBetween(1, 127));
		}

      	if (eventCount < events.length - 1) {
        	eventCount++;
      	} else {
        	localFrameCount = 0;
        	eventCount = 0;
      	}
	} else {		
		if (offDelayCounter >= offDelay) {
			offDelayCounter = 0;
			outlet(0, -1);
		} else {			
			offDelayCounter++
		}
	}

    localFrameCount++;	
}

// UTIL
function eventFired() {
  	return localFrameCount == events[eventCount];
}

function getChance() {
  	var chance = randomBetween(1, 100);
  	return chance;
}

function randomBetween(low, high) {
  	var r =  Math.floor((Math.random() * high) + low);
  	return r;
}