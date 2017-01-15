var ngSQLManager = angular
        .module(
            'ngSQLManager',
            ['ngResource', 'ngRoute', 'ngMaterial']
        )
        .config(['$routeProvider', '$locationProvider',
            function ($routeProvider, $locationProvider) {
                $locationProvider
                .html5Mode(true)
                .hashPrefix('!');

                $routeProvider
                .when("/uptodate", {
                    templateUrl : "/views/uptodate.html"
                })
                .when("/history", {
                    templateUrl : "views/history.html"
                })
            }
        ]);