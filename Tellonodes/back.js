
module.exports = function(RED) {
    function BackNode(config) {
        RED.nodes.createNode(this,config);
	this.time = config.time;
        var node = this;
        node.on('input', function(msg) {
	    var sec = 0;
	    if(node.time==""){
		sec = 10;
		}else{
		sec = node.time;		
		}
	    var hoge = msg.payload.programnumber;
	    var tt ="command"+hoge;
	    var temp ={"time":sec,"act":"back"};
	    msg[tt] = temp;

	    msg.payload.programnumber += 1;
	    /*console.log("abc");
	    for(var i = 0; i < 10; i++){
		    var tt = "command" + i;
		    msg.program[tt] = i;
		}
            console.log(msg);*/
	    node.send(msg);
        });
    }
    RED.nodes.registerType("back",BackNode);
}
