// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var db = null;
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
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

        db.transaction(function (tx) {
          tx.executeSql('CREATE TABLE IF NOT EXISTS person (id TEXT primary key, data LONGTEXT)');
        });
      }
    });
  })
  .controller('mainCtr', function ($scope, sqlLiteServices) {
    $scope.dataLoaded = [];
    $scope.loadData = function () {
      var tableName = "person";
      sqlLiteServices.getAllData(tableName).then(function (data) {
        $scope.dataLoaded = data;
      }, function (error) {
        alert('error : ' + JSON.stringify(error));
      });
    };
    $scope.data = {};

    $scope.addData = function () {
      var tableName = 'person';
      if ($scope.data.person) {
        var id = $scope.dataLoaded.length + 1;
        var data = {id: id, name: $scope.data.person};
        sqlLiteServices.insertData(tableName,id,data).then(function (data) {
          alert("insertId: " + JSON.stringify(data) );
          $scope.data = {};
        }, function (error) {
          alert('error : ' + JSON.stringify(error));

        });
      }
      $scope.loadData();
    };

    $scope.delete = function (person) {
      var tableName = "person";
      sqlLiteServices.deleteData(tableName, person.id).then(function () {
        $scope.loadData();
      }, function (error) {
        alert('error : ' + JSON.stringify(error));
      });
    };
    $scope.update = function (person) {
      var tableName = "person";
      var UpdatedData = person;
      UpdatedData.name = person.name + person.id;
      sqlLiteServices.getDataByAttribute(tableName,'id',person.id).then(function (data) {
        alert('attribute values : ' + JSON.stringify(data));
        sqlLiteServices.updateData(tableName, person.id, UpdatedData).then(function (data) {
          $scope.loadData();
        }, function (err) {
          alert('error : ' + JSON.stringify(err));
        });
      }, function (error) {
        alert('error : ' + JSON.stringify(error));
      });
    };


  })
  .config(function ($stateProvider, $urlRouterProvider) {

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
