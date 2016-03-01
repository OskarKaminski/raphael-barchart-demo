System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var defaults, simpleLineAttrs;
    return {
        setters:[],
        execute: function() {
            exports_1("defaults", defaults = {
                paperWidth: 960,
                color: '#c22',
                fillOpacity: 1.0,
                strokeWidth: 0,
                barHeight: 20,
                barPadding: 5,
                labelsWidth: 100,
                axisPadding: 10,
            });
            exports_1("simpleLineAttrs", simpleLineAttrs = {
                'fill': '#000',
                'stroke-width': 0
            });
        }
    }
});
