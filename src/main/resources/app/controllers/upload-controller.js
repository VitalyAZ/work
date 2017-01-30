ngSQLManager.controller(
    'uploadCtrl',
    function($scope, $http, $timeout) {
$scope.showXsdEntities = false;

            this.xsdEntities = {
              numLoaded_: 0,
              toLoad_: 0,
              items: [],
              getItemAtIndex: function(index) {
                if (index > this.numLoaded_) {
                  this.fetchMoreItems_(index);
                  return null;
                }
                return this.items[index];
              },

              getLength: function() {
                return this.numLoaded_ + 20;
              },

            fetchMoreItems_: function (index) {
              if (this.toLoad_ < index) {
                   this.toLoad_ += 20;

                   $http({
                       method: 'GET',
                       url: '/upload_more',
                       params: {
                            size : this.toLoad_
                       }
                    }).then(angular.bind(this, function (obj) {
                        console.log(JSON.stringify(obj.data));
                        if (obj.data.length != 0) {
                            this.items = this.items.concat(obj.data);
                            this.numLoaded_ = this.toLoad_;
                       }
                    }));
               }
               }
            };

        $scope.upload = function(file, docType) {
            console.log (file);
            $scope.fileName = file.name
            var fd = new FormData();
            fd.append('file', file);
            if (file) {
                $http({
                    method: 'POST',
                    url: '/upload/' + docType,
                    data: fd,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                }).then(function(response) {
                    console.log ("Upload successful.");
                    console.log (JSON.stringify(response));

                    if ('xsd' == docType) {
                        $scope.showXsdEntities = true;
                    } else {
                        console.log ("Show xls true");
                    }


                }, function(err){
                    console.log (err);
                });
            }
        }

        $scope.showConstraints = function(xsdEntity) {
            console.log ("xsdEntity.length " + xsdEntity.length);
            console.log ("xsdEntity.enums " + xsdEntity.enums);
        }
    }
);

