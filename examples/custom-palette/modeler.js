import BpmnModeler from 'bpmn-js/lib/Modeler';

import plugins from './modules';
import ShapeRenderer from './utils/ShapeRenderer';
import './css'

var diagramUrl = 'https://raw.githubusercontent.com/doubleh-rajput/bpmnio-examples/master/examples/custom-palette/diagram.bpmn';

// modeler instance
window.bpmnModeler = new BpmnModeler({
    container: '#canvas',
    additionalModules: [
        plugins,
    ],
});

/**
 * Open diagram in our modeler instance.
 *
 * @param {String} bpmnXML diagram to display
 */
async function openDiagram(bpmnXML) {
    // import diagram
    try {

        await bpmnModeler.importXML(bpmnXML);

        // access modeler components
        var canvas = bpmnModeler.get('canvas');

        // zoom to fit full viewport
        canvas.zoom('0.8');

    } catch (err) {

        alert('could not import BPMN 2.0 diagram');
    }
}


// load external diagram file via AJAX and open it
$.get(diagramUrl, openDiagram, 'text');

$(document).on("dragstart", ".palette-entry", (e) => {
    var textContent = e.currentTarget.title;

    var shape = ShapeRenderer.init(textContent);
    bpmnModeler.get("create").start(e, shape);
});