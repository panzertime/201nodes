var app = window.angular.module('app', [])

app.factory('diveFetcher', diveFetcher)
app.controller('mainCtrl', mainCtrl)

function diveFetcher ($http) {

  var API_ROOT = 'dive'
  return {
    get: function () {
      return $http
        .get(API_ROOT)
        .then(function (resp) {
          return resp.data
        })
    },
    post: function (formData) {
      return $http
         .post(API_ROOT,formData)
         .then(function (resp) {
           console.log("Post worked");
         })
    } 
  }
}

function mainCtrl ($scope, diveFetcher) {

  $scope.dives = []

    $scope.addDive = function(event) {
	event.preventDefault();
	var formData = {name:$scope.Name,ipg:$scope.ipg,depth:$scope.depth,abt:$scope.abt,fpg:$scope.fpg,si:$scope.si};
      console.log(formData);
      diveFetcher.post(formData); // Send the data to the back end
      $scope.dives.push(formData); // Update the model
      diveFetcher.get()
    .then(function (data) {
      $scope.dives = data
    })}

    

   $scope.pickName = function(event) {
   	event.preventDefault();
	var name = {name:$scope.Name};
	console.log(name);
   

  diveFetcher.get()
    .then(function (data) {
      $scope.dives = data
    })
   }

  }


