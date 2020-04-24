var fs = require("fs");
var filePath = "/home/kay/node-red-contrib-tellonodes/programs/";
var programNum = 0;
var actionTime = 0;
var vel = 30;
const command = ["{cmd: 'takeoff'}",
		"{cmd: 'land'}",
		"{cmd: 'rc 0 0 "+vel+" 0'}",
		"{cmd: 'rc 0 0 -"+vel+" 0'}",
		"{cmd: 'rc "+vel+" 0 0 0'}",
		"{cmd: 'rc -"+vel+" 0 0 0'}",
		"{cmd: 'rc 0 "+vel+" 0 0'}",
		"{cmd: 'rc 0 -"+vel+" 0 0'}",
		"{cmd: 'rc 0 0 0 100'}",
		"{cmd: 'rc 0 0 0 -100'}",
		"{cmd: 'rc 0 0 0 0'}"
		]
const rosCom ="ros2 service call /tello_action tello_msgs/TelloAction ";

module.exports = function(RED) {
    function OutPutNode(config) {
        RED.nodes.createNode(this,config);
	this.name = config.name;
        var node = this;
	var counter = 0;
        node.on('input', function(msg) {
		var date = new Date();
		var fileName = filePath+date+".sh";
		console.log(node.name);
		console.log(msg);
		programNum = msg.payload.programnumber;
		num =0;
		for(var item in msg){
			if(num >2){
			 	var actNum=msg[item].actNum;
				appendFile(/*fileName,rosCom+*/'"'+command[actNum]+'"');
				//console.log("num"+actNum);
				actionTime = msg[item].time;	
				appendFile(fileName,"sleep "+actionTime);
				
			}
		num++;		
		}	

        });
    }
    RED.nodes.registerType("output",OutPutNode);
}


function appendFile(path,data){
	data +="\n";
	fs.appendFile(path,data,function(err){
	if(err){
	throw err;	
		}	
	});
}
