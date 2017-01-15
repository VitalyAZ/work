ngSQLManager.controller('defaultCtrl', function($scope, $http) {
        $scope.group = "Common";
        $scope.groups = ["Common", "Developer", "QA Engineer", "Analyst"];

        $scope.$watch('group', function (newValue, oldValue, scope) {
            console.log("'group' was changed to " + $scope.group);
            $scope.tableResultsVisibility = false;
            $scope.getSgls($scope.group);
        });

        $scope.getSgls = function(group) {
            $http
            .get('http://localhost:8080/AngularJS/rest/sql/', {params:{"group": group}})
            .then(function(response) {
                $scope.sqlNamesVisibility = false;
                console.log("getSgls response sqlNames: " + response.data.sqlNames);
                console.log("getSgls response sqlScripts: " + response.data.sqlScripts);
                if (response.data.sqlNames) {
                    $scope.sqlNames = response.data.sqlNames;
                    $scope.sqlScripts = response.data.sqlScripts;
                    $scope.sqlNamesVisibility = true;
                }
            });
        };

        $scope.execute = function(group, sqlScript, sqlName) {
            $scope.failSql = false;

            console.log("execute clicked!");
            console.log("group: " + group);
            console.log("sqlScript: " + sqlScript);
            console.log("sqlName: " + sqlName);

            var postData = {group: group, sqlName : sqlName, sqlScript : sqlScript};
            $http.post(
                'http://localhost:8080/AngularJS/rest/sql',
                JSON.stringify(postData)
            )
            .then(
                function mySuccess(response) {
                    console.log("POST executed successfully");
                    console.log("Response status: " + response.data.status);
                    if (response.data.status == "ERROR") {
                        $scope.failSql = true;
                        $scope.failSqlReason = response.data.error;
                    } else {
                        $scope.heads = response.data.heads;
                        $scope.records = response.data.records;
                        console.log("$scope.heads.length: " + $scope.heads.length);
                        console.log("$scope.records.length: " + $scope.records.length);
                        $scope.tableResultsVisibility = true;
                        if (response.data.status == "NEW") {
                            $scope.getSgls($scope.group);
                        }
                    }
                },
                function myFail(response) {
                    console.log("POST executed with errors: " + response.data);
               }
            );
        }

        $scope.executeByIdx = function(group, sqlScriptIdx) {
            console.log("Executing... " + $scope.sqlScripts[sqlScriptIdx]);
            $scope.execute(group, $scope.sqlScripts[sqlScriptIdx]);
        };
    }
);
