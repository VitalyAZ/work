ngSQLManager.controller(
                'formCtrl',
                function ($scope, $http) {
                    $scope.processForm = function(sqlName, sqlScript) {
                        var postData = {
                            sqlName : sqlName,
                            sqlScript : sqlScript
                        };
                        console.log("POST params: " + postData.sqlName);
                        $http.post(
                            'http://localhost:8080/AngularJS/rest/sql',
                            JSON.stringify(postData)
                        )
                        .then(
                            function mySuccess(response) {
                                console.log("Posted successfully");
                                console.log("Data: " + response.data.heads);
                                $scope.heads = response.data.heads;
                                console.log("$scope.heads.length: " + $scope.heads.length);
                                $scope.addNewVisibility = false;

                                $scope.$apply(function() {
                                    $scope.tableResultsVisibility = true;
                                });
                            },
                            function myFail(response) {
                                console.log("Posted with errors");
                           }
                        );
                    }
});