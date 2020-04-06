
module.exports = function(RED) {
    function RightNode(config) {
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
	    var temp ={"time":sec,"act":"right"};
	    msg[tt] = temp;

	    msg.payload.programnumber += 1;

	    node.send(msg);
        });
    }
    RED.nodes.registerType("right",RightNode);
}
