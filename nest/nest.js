module.exports = function(RED) {
    var HTML = String.raw`
<div id="thermostat-WZ">Lala</div>
`;

    RED.log.info("Nest dashboard element " + require("../package.json").version)
    RED.nodes.registerType("nest", nest);

    function nest(config) {
        var node = this;
        RED.nodes.createNode(node, config);

        try {
            var ui = RED.require("node-red-dashboard")(RED);
            var done = ui.addWidget({
                node: node,
                format: HTML,
                templateScope: "local",
                group: config.group,
                forwardInputMessages: false
            });
            // node status: https://nodered.org/docs/creating-nodes/status
        } catch (e) {
            console.log(e);
            this.error("Kaputt");
            node.error("Hit an error", e);
        }

        node.on('input', function(msg) {
            node.log("Received: " + msg.payload);
            node.status({fill: "green", shape: "ring", text: msg.payload});
        });

        node.on("close", done);
    }
}
