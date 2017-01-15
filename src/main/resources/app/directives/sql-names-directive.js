ngSQLManager.directive('sqlsPostRepeatDirective', function() {
  return function(scope) {
    //Activate popover when all DOM elements are ready
    //Popover shows cue - content of SQL query associated with the given sql name
    if (scope.$last){
      $('[data-toggle="popover"]').popover();
    }
  };
});