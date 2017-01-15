var ngSQLManager = angular
        .module(
            'ngSQLManager',
            ['ngResource', 'ngRoute', 'ngMaterial']
        )
        .config(['$routeProvider', '$locationProvider',
            function ($routeProvider, $locationProvider) {
                //Activate HTML support
                //index.html should contain <base href="/"> line.
                $locationProvider
                .html5Mode(true)
                .hashPrefix('!');

                //Routing from the left side of main page
                $routeProvider
                .when("/", {
                    templateUrl : "/views/welcome.html"
                })
                .when("/uptodate", {
                    templateUrl : "/views/uptodate.html"
                })
                .when("/history", {
                    templateUrl : "views/history.html"
                })
            }
        ]);