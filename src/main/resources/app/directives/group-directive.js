ngSQLManager.directive('groupDirective', function() {
        return {
                link: function (scope, element) {
                    element.on("click", function(event) {
                        scope.$apply(function() {
                            scope.group = event.target.innerText;
                         });
                    });
                }
            }
        }
);