(function( ) {
    'use strict';

    function getViewModel() {
        return new app.models.todo();
    }


    app.views.todo = Mortar.view.extend({
        fqn: 'js/views/todo',
        model: getViewModel
    });

})( );
