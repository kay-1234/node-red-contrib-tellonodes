
module.exports = function(RED) {
    function LowerCaseNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
	    const exec = require('child_process').exec;
	    exec('ls', (err, stdout, stderr) => {
  		if (err) {
   			 console.error(`exec error: ${err}`);
    			 return;
  		}

  		console.log(`stdout: ${stdout}`);
  		console.log(`stderr: ${stderr}`);
		console.log("unchiXD");
		});
            msg.payload = msg.payload.toLowerCase();
	    var tm = {time:"10"};
	    msg.payload = tm;
            node.send(msg);
        });
    }
    RED.nodes.registerType("lower-case",LowerCaseNode);
}
