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
      var formData = {name:$scope.Name,avatarUrl:$scope.Url};
	var formData = {
      console.log(formData);
      pokemonFetcher.post(formData); // Send the data to the back end
      $scope.pokemon.push(formData); // Update the model
    }

  pokemonFetcher.get()
    .then(function (data) {
      $scope.pokemon = data
    })

}
