ngSQLManager.factory('SQLResultsFactory', function($resource) {
    return $resource('http://localhost:8080/AngularJS/rest/sql?:group', {group: '@group'});
});
