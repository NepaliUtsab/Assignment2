//login page module
var app = angular.module('loginPage', []);
app.controller('loginFormCtrl', function ($scope, $http) {
  $scope.loginUserA = function () {
    if(loginUser()){
    $http.post('/login_user', $scope.user)
      .then(function (response) {
        console.log(response);
        if(response.data.status == 200){
          sessionStorage.setItem("current-user", JSON.stringify(response.data.data));
          console.log(JSON.stringify(response.data.data));
          window.open("profile.html", "_self");
        }else{
          window.alert(response.data.message);
        }
        
      });
    }
  };
});


//register page module
var app = angular.module('registerPage', []);
app.controller('registerFormCtrl', ($scope, $http) => {
  $scope.registerUserA = function (){
    if(registerUser()){
      $http.post('/register_user', $scope.user)
      .then((response) => {
        console.log("From register" + response);
        if (response.data.status == 200) {
          sessionStorage.setItem("current-user", JSON.stringify(response.data.data))
          window.open("profile.html", "_self");
        } else {
          window.alert(response.data.message);
        }
      })
    }
  }
})