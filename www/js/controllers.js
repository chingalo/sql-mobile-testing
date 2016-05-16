angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope,$localStorage) {
  $scope.settings = {
    enableFriends: true,
    databaseName: ''
  };
  if(angular.isDefined($localStorage.databaseName)){
    $scope.settings.databaseName = $localStorage.databaseName;
  }

  $scope.updateDatabaseName = function(){
    if($scope.settings.databaseName != $localStorage.databaseName){
      var dataBase = getDataBaseName();
      $localStorage.databaseName = dataBase;
      initDatabase(dataBase);
    }
  };

  function initDatabase(dataBase){
    console.log('new database name : ' + dataBase);
    db = window.sqlitePlugin.openDatabase({name: dataBase});
    db.transaction(function (tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS person (id TEXT primary key, data LONGTEXT)');
    });
  }
  function getDataBaseName(){
    var databaseName = $scope.settings.databaseName;
    var dataBaseArray = databaseName.split('.');
    if(dataBaseArray[dataBaseArray.length -1] != "db"){
      databaseName = $scope.settings.databaseName + '.db';
    }
    return databaseName;
  }




});
