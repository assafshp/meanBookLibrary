/*'use strict';

angular.module('mean.books').controller('BooksController', ['$scope', 'Global', 'Books',
    function($scope, Global, Books) {
        $scope.global = Global;
        $scope.package = {
            name: 'books'
        };
    }
]);
*/

'use strict';

angular.module('mean.books').controller('BooksController', ['$scope', '$stateParams', '$location', 'Global', 'Books',
    function($scope, $stateParams, $location, Global, Books) {
        $scope.global = Global;

        $scope.hasAuthorization = function(book) {
            if (!book || !book.user) return false;
            return $scope.global.isAdmin || book.user._id === $scope.global.user._id;
        };

        $scope.create = function(isValid) {
            if (isValid) {
                var book = new Books({
                    title: this.title,
                    content: this.content
                });
                book.$save(function(response) {
                    $location.path('books/' + response._id);
                });

                this.title = '';
                this.content = '';
            } else {
                $scope.submitted = true;
            }
        };

        $scope.remove = function(book) {
            if (book) {
                book.$remove();

                for (var i in $scope.books) {
                    if ($scope.books[i] === book) {
                        $scope.books.splice(i, 1);
                    }
                }
            } else {
                $scope.book.$remove(function(response) {
                    $location.path('books');
                });
            }
        };

        $scope.update = function(isValid) {
            if (isValid) {
                var book = $scope.book;
                if (!book.updated) {
                    book.updated = [];
                }
                book.updated.push(new Date().getTime());

                book.$update(function() {
                    $location.path('books/' + book._id);
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.find = function() {
            Books.query(function(books) {
                $scope.books = books;
            });
        };

        $scope.findOne = function() {
            Books.get({
                bookId: $stateParams.bookId
            }, function(book) {
                $scope.book = book;
            });
        };
    }
]);
