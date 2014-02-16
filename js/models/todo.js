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
        },
        _init: init
    });


    function init() {
        expandModel(this.data);
    }


    function expandModel(model) {
        var toggleState = false;

        function newItem(title, state) {
            return Mortar.koFactory({
                "completed": state === true,
                "title": title,
                "editing": false
            });
        }


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


        model.newItem = Mortar.koFactory("");


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
            this.editing( true );
        };


        model.disableEdit = function() {
            this.editing( false );
            return false; // Handle form submit
        };


        model.remove = function() {
            model.items.remove(this);
        };


        model.add = function() {
            // add item and clear input
            model.items.push( newItem( model.newItem(), false ) );
            model.newItem("");
            return false; // Handle form submit
        };


        model.clearCompleted = function() {
            var completedItems = itemsChecked(true);
            var i, length;

            for ( i = 0, length = completedItems.length; i < length; i++ ) {
                model.items.remove(completedItems[i]);
            }
        };

    }

})( );
