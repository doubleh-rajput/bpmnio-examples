import { isAny } from "bpmn-js/lib/features/modeling/util/ModelingUtil.js";

var ShapeRenderer = {
	init(name, properties = {}) {
		var id = name.replace(/[^a-zA-Z0-9]/g, "") + "-" + Date.now().toString();
		properties.name = name;

		var shape;
		switch (name) {
			case "Start Event":
				shape = this.startEvent(id, properties);
				break;

			case "Start Timer Event":
				shape = this.startTimerEvent(id, properties);
				break;

			case "Mail Task":
				shape = this.mailTask(id, properties);
				break;

			case "End Event":
				shape = this.endTask(id, properties);
				break;

			default:
				shape = this.serviceTask(id, properties);
		}

		if (
			isAny(shape, [
				"bpmn:ServiceTask",
				"bpmn:SendTask",
			])
		) {
			bpmnModeler.get('modeling').updateProperties(shape, properties);
		}


		return shape;
	},

	startEvent(id, properties) {
		return bpmnModeler.get("elementFactory")
			.createShape({
				type: "bpmn:StartEvent",
				width: 30,
				height: 30,
				id,
				resourceId: id,
				properties,
				order: { level: 99999 }
			});
	},

	serviceTask(id, properties) {
		return bpmnModeler
			.get("elementFactory")
			.createShape({
				type: "bpmn:ServiceTask",
				width: 100,
				height: 80,
				id,
				resourceId: id,
				properties,
				order: { level: 99999 }
			});
	},

	startTimerEvent(id, properties) {
		return bpmnModeler
			.get("elementFactory")
			.createShape({
				eventDefinitionType: "bpmn:TimerEventDefinition",
				type: "bpmn:StartEvent",
				width: 30,
				height: 30,
				id,
				resourceId: id,
				properties,
				order: { level: 99999 }
			});
	},

	mailTask(id, properties) {
		return bpmnModeler
			.get("elementFactory")
			.createShape({
				order: { level: 99999 },
				type: "bpmn:SendTask",
				width: 100,
				height: 80,
				id,
				resourceId: id,
			});
	},

	endTask(id, properties) {
		return bpmnModeler
			.get("elementFactory")
			.createShape({
				order: { level: 99999 },
				type: "bpmn:EndEvent",
				width: 30,
				height: 30,
				id,
				resourceId: id,
			});
	},


};

export default ShapeRenderer;
