var fs = require("fs");
var filePath = __dirname+"/../programs/";
var logPath =__dirname+"/../logs/";
var executeFile = filePath+"exe.sh";
var programNum = 0;
var actionTime = 0;
var action;
var actNum
var vel = 30;
var velRoll=100;
var outputP="";


var rosCom="";
const rosComR ="ros2 service call /tello_action tello_msgs/TelloAction ";
const rosComS ="ros2 service call drone1/tello_action tello_msgs/TelloAction ";
const tello="Tello";
const sim="Simulator";

const exec = require('child_process').exec;

module.exports = function(RED) {
    function OutPutNode(config) {
        RED.nodes.createNode(this,config);
	this.name = config.name;
        var node = this;
	var counter = 0;
        node.on('input', function(msg) {
		var date = new Date();
		var fileName = filePath+date+".sh";
		var logName=logPath+date+".txt"
		outputP=node.name;
		console.log(outputP);
		console.log(msg);

		if(outputP==tello){
			rosCom=rosComR;
			vel=30;
			velRoll=60;				
		}else if(outputP==sim){
			rosCom=rosComS;
			vel =0.02;
			velRoll=0.08;		
		}
		var command = ["{cmd: 'takeoff'}",
				"{cmd: 'land'}",
				"{cmd: 'rc 0 0 "+vel+" 0'}",
				"{cmd: 'rc 0 0 -"+vel+" 0'}",
				"{cmd: 'rc "+vel+" 0 0 0'}",
				"{cmd: 'rc -"+vel+" 0 0 0'}",
				"{cmd: 'rc 0 "+vel+" 0 0'}",
				"{cmd: 'rc 0 -"+vel+" 0 0'}",
				"{cmd: 'rc 0 0 0 "+velRoll+"'}",
				"{cmd: 'rc 0 0 0 -"+velRoll+"'}",
				"{cmd: 'rc 0 0 0 0'}"
				];
		//console.log(fileName);
		programNum = msg.payload.programnumber;
		num =0;
		appendFile(logName,"Output To "+outputP+"\n"+date+"\n");
		writeFile(executeFile,"#!/bin/bash\ns");
		for(var item in msg){
			if(num >2){
			 	actNum=msg[item].actNum;
				action = msg[item].act;
				actionTime = msg[item].time;
				appendFile(fileName,rosCom+'"'+command[actNum]+'"');
				appendFile(executeFile,rosCom+'"'+command[actNum]+'"');
				//console.log("num"+actNum);
				
	
				appendFile(fileName,"sleep "+actionTime);
				appendFile(executeFile,"sleep "+actionTime);
				appendFile(logName,action+":"+actionTime+"s");
				
			}
		num++;		
		}


	    	exec('sh '+executeFile, 				(err, stdout, stderr) => {
  			if (err) {
   				 console.error(`exec error: ${err}`);
    				 return;
  			}

  		console.log(`stdout: ${stdout}`);
  		console.log(`stderr: ${stderr}`);
		console.log("finish");
		});			

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

function writeFile(path,data){
	fs.writeFile(path,data,function(err){
	if(err){
	throw err;	
		}	
	});
}
