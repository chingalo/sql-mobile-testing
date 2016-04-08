// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var db = null;
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }


    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
     db = window.sqlitePlugin.openDatabase({name: "my.db"});

      db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS person (id integer primary key, data LONGTEXT)');
      });
    }
  });
})
  .controller('mainCtr',function($scope){
    $scope.dataLoaded= [];
    $scope.person = "";
    $scope.loadData = function(){
      getAllData("person");
    };

    $scope.addData = function(){
      var name = $scope.person;
      var data = {id:$scope.dataLoaded.length + 1,name: name};
      insertData('person',data);
      $scope.person = "";
    };

    function getAllData(tableName){
      alert(tableName);
      db = window.sqlitePlugin.openDatabase({name: "my.db"});
      db.transaction(function(tx) {
        var query = "select * from "+tableName+";";
        tx.executeSql(query,[],function(tx, results){
          var len = results.rows.length;
          var data = [];
          for (var i=0; i<len; i++){
            data.push(eval("(" + results.rows.item(i).data + ")"));
          }
          $scope.dataLoaded = data;
          $scope.$apply();
        },function(error){
          alert('err : ' + JSON.stringify(error));
        });
      });
    }
    function insertData(tableName, data){
      db.transaction(function(tx) {
        var query = "INSERT INTO "+tableName+" (data) VALUES (?)";
        tx.executeSql(query, [JSON.stringify(data)], function(tx, res) {
          alert("insertId: " + res.insertId + ' data : '+ data);

        }, function(e) {
          alert.log("ERROR: " + e);
        });
      });
    }

  })
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
