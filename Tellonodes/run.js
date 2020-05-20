module.exports = function(RED) {
    var node;
    function Run(config) {
        RED.nodes.createNode(this,config);
        node = this;

    }
    RED.nodes.registerType("run",Run);

    RED.httpAdmin.post("/run/:id", RED.auth.needsPermission("run"), function(req,res) {
        var addminNode = RED.nodes.getNode(req.params.id);
        if (addminNode != null) {
            try {
                addminNode.receive();
		var msg={"_msgid":"","type":"input","payload":{"programnumber":0}};
                node.send(msg);
                res.sendStatus(200);
            } catch(err) {
                res.sendStatus(500);
                addminNode.error(RED._("run",{error:err.toString()}));
            }
        } else {
            res.sendStatus(404);
        }
    });
}
