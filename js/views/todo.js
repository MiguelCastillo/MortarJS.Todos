(function( ) {
    'use strict';

    function getViewModel() {
        return new app.models.todo();
    }


    function extendViewModel(model) {
        var toggleState = false;

        function itemsChecked(status) {
            var items = model.items(),
                completed = [];
            var i, length;

            for ( i = 0, length = items.length; i < length; i++ ) {
                if ( items[i].completed() === status ) {
                    completed.push(items[i]);
                }
            }

            return completed;
        }

        model.itemsActive = ko.computed(function () {
            return itemsChecked( false );
        });

        model.itemsCompleted = ko.computed(function() {
            return itemsChecked( true );
        });

        model.toggleItems = function() {
            var items = itemsChecked( toggleState );
            var i, length;

            // Swap states
            toggleState = !toggleState;
            if ( items.length ) {
                for ( i = 0, length = items.length; i < length; i++ ) {
                    items[i].completed( toggleState );
                }
            }
        };

        model.enableEdit = function() {
            this.editing( true )
        };

        model.remove = function() {
            model.items.remove(this);
        };
    }


    function init() {
        extendViewModel(this.model.data);
    }


    app.views.todo = Mortar.view.extend({
        fqn: 'js/views/todo',
        model: getViewModel,
        _init: init
    });

})( );
