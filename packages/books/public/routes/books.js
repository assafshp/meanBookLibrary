/*'use strict';

angular.module('mean.books').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('books example page', {
            url: '/books/example',
            templateUrl: 'books/views/index.html'
        });
    }
]);
*/
'use strict';

//Setting up route
angular.module('mean.books').config(['$stateProvider',
    function($stateProvider) {
        // Check if the user is connected
        var checkLoggedin = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0') $timeout(deferred.resolve);

                // Not Authenticated
                else {
                    $timeout(deferred.reject);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };

        // states for my app
        $stateProvider
            .state('all books', {
                url: '/books',
                templateUrl: 'books/views/list.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('create book', {
                url: '/books/create',
                templateUrl: 'books/views/create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('edit book', {
                url: '/books/:bookId/edit',
                templateUrl: 'books/views/edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('book by id', {
                url: '/books/:bookId',
                templateUrl: 'books/views/view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]);
