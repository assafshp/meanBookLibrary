/*'use strict';

// The Package is past automatically as first parameter
module.exports = function(Books, app, auth, database) {

    app.get('/books/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/books/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/books/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/books/example/render', function(req, res, next) {
        Books.render('index', {
            package: 'books'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};*/

'use strict';

var books = require('../controllers/books');

// Book authorization helpers
var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin && req.book.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(Books, app, auth) {

    app.route('/books')
        .get(books.all)
        .post(auth.requiresLogin, books.create);
    app.route('/books/:bookId')
        .get(books.show)
        .put(auth.requiresLogin, hasAuthorization, books.update)
        .delete(auth.requiresLogin, hasAuthorization, books.destroy);

    // Finish with setting up the bookId param
    app.param('bookId', books.book);
};
