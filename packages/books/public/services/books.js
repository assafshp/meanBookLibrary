/*'use strict';

angular.module('mean.books').factory('Books', [
    function() {
        return {
            name: 'books'
        };
    }
]);
*/

'use strict';

//Books service used for Books REST endpoint
angular.module('mean.books').factory('Books', ['$resource',
	function($resource) {
		return $resource('books/:bookId', {
			bookId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);