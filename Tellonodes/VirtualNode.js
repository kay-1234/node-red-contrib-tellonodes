var fs = require("fs");
var readline = require("readline");
var filePath = __dirname+"/../VirtualNodePrograms/";
var logPath =__dirname+"/../logs/";
var programNum = 0;
var actionTime = 0;
var action;
var actNum;
var nodeName;
var num =0;
var temp;

module.exports = function(RED) {
    function VirtualNode(config) {
        RED.nodes.createNode(this,config);
	this.name = config.name;
        var node = this;
	var counter = 0;
        node.on('input', function(msg) {
		//console.log(msg);
		num=0;
		var date = new Date();
		nodeName=node.name;
		var fileName = filePath+nodeName+".txt";
		var logName=logPath+date+".txt";
		programNum = msg.payload.programnumber;
		
		appendFile(logName,"Get Virtual Node(Time,Act,ActNum)\nName:"+nodeName+"\n"+date+"\n"+nodeName+".text");

		var stream = fs.createReadStream(fileName, "utf8");
		var reader = readline.createInterface({ input: stream });
		reader.on("line", (data) => {
			var type =data.split(" ");
			var tt = "command"+programNum;
	    		temp ={"time":type[0],"act":type[1],"actNum":type[2]};
			msg[tt]=temp;
			programNum++;
			//console.log(programNum);
			msg.payload.programnumber = programNum;
			
			if(type[3]=='fin'){
				node.send(msg);
				}
			
		});

		/*for(var item in msg){
			if(num >2){
			 	actNum=msg[item].actNum;
				action = msg[item].act;
				actionTime = msg[item].time;
				//appendFile(fileName,actionTime+' '+action+' '+actNum);
				//console.log("num"+actNum);

				appendFile(logName,action+":"+actionTime+"s");
				
			}
		num++;		
		}*/	

        });
    }
    RED.nodes.registerType("VirtualNode",VirtualNode);
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
	data +="\n";
	fs.writeFile(path,data,function(err){
	if(err){
	throw err;	
		}	
	});
}
