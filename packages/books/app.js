'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Books = new Module('books');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Books.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Books.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Books.menus.add({
        'roles': ['authenticated'],
        'title': 'Books',
        'link': 'all books'
    });
    Books.menus.add({
        'roles': ['authenticated'],
        'title': 'Create New Book',
        'link': 'create book'
    });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Books.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Books.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Books.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Books;
});
