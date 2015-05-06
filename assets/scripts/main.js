requirejs.config({
    baseUrl: '/assets/lib',
    paths: {
    	app: '../scripts',
        jquery: 'jquery/dist/jquery.min',
        bootstrap: 'bootstrap-material-design/dist/js/material.min',
        ripples: 'bootstrap-material-design/dist/js/ripples.min'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery','ripples']
        },
        'ripples': {
        	deps: ['jquery']
        }
    }
});