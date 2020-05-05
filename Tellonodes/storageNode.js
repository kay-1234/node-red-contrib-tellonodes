var fs = require("fs");
var filePath = __dirname+"/../VirtualNodePrograms/";
var logPath =__dirname+"/../logs/";
var programNum = 0;
var actionTime = 0;
var action;
var actNum;
var nodeName;
var num =0;

module.exports = function(RED) {
    function StorageNode(config) {
        RED.nodes.createNode(this,config);
	this.name = config.name;
        var node = this;
	var counter = 0;
        node.on('input', function(msg) {
		num=0;
		var date = new Date();
		nodeName=node.name;
		var fileName = filePath+nodeName+".txt";
		var logName=logPath+date+".txt"

		console.log(nodeName);
		console.log(msg);
		//console.log(fileName);
		programNum = msg.payload.programnumber;
		appendFile(logName,"Make Virtual Node(Time,Act,ActNum)\nName:"+nodeName+"\n"+date+"\n")
		writeFile(fileName,"");
		for(var item in msg){
			if(num >2){
			 	actNum=msg[item].actNum;
				action = msg[item].act;
				actionTime = msg[item].time;
				var sent = actionTime+' '+action+' '+actNum;
				if(num==programNum+2){sent+=" fin"};
				appendFile(fileName,sent);
				//console.log("num"+actNum);

				appendFile(logName,action+":"+actionTime+"s");

			}
		num++;		
		}	

        });
    }
    RED.nodes.registerType("StorageNode",StorageNode);
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
