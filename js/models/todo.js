(function( ) {
    'use strict';

    app.models.todo = Mortar.koModel.extend({
        data: {
            items: [{
                "completed": false,
                "title": "Item1",
                "editing": false
            },{
                "completed": true,
                "title": "Item2",
                "editing": false
            }]
        }
    });

})( );
