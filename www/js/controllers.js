angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  var db = window.sqlitePlugin.openDatabase({name: "my.db"});
  db.transaction(function(tx) {
    tx.executeSql("select * from test_table;",[],querySuccess,errorCB);
  });
  $scope.data = [];
  function querySuccess(tx, results) {
    for (var i=0; i<results.rows.length; i++){
      $scope.data.push(results.rows.item(i).data);
    }
  }
  function errorCB(er){
    alert('err : ' + JSON.stringify(er));
  }
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

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
