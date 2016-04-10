angular.module('starter.services', [])


  .factory('sqlLiteServices', function ($q) {
    var db = null;
    var sqlLiteServices = {
      getAllData: function (tableName) {
        var defer = $q.defer();
        db = window.sqlitePlugin.openDatabase({name: "my.db"});
        db.transaction(function (tx) {
          var query = "SELECT * FROM " + tableName + ";";
          tx.executeSql(query, [], function (tx, results) {
            var len = results.rows.length;
            var data = [];
            for (var i = 0; i < len; i++) {
              data.push(eval("(" + results.rows.item(i).data + ")"));
            }
            defer.resolve(data);
          }, function (error) {
            defer.reject(error);
          });
        });
        return defer.promise;
      },
      insertData: function (tableName, data,id) {
        var defer = $q.defer();
        db = window.sqlitePlugin.openDatabase({name: "my.db"});
        db.transaction(function (tx) {
          var query = "INSERT INTO " + tableName + " (id,data) VALUES (?,?)";
          tx.executeSql(query, [id,JSON.stringify(data)], function (tx, res) {
            //success adding data
            defer.resolve(res);
          }, function (e) {
            defer.reject(e);
          });
        });
        return defer.promise;
      },
      getData : function(tableName,id){
        var defer = $q.defer();
        db = window.sqlitePlugin.openDatabase({name: "my.db"});
        db.transaction(function (tx) {
          var query = "SELECT * FROM " + tableName + " WHERE id = '"+id+" ';";
          tx.executeSql(query, [], function (tx, results) {
            defer.resolve(eval("(" + results.rows.item(0).data + ")"));
          }, function (error) {
            defer.reject(error);
          });
        });
        return defer.promise;
      },
      deleteData : function(tableName,id){
        var defer = $q.defer();
        db = window.sqlitePlugin.openDatabase({name: "my.db"});
        db.transaction(function (tx) {
          var query = "DELETE FROM " + tableName + " WHERE id = '"+id+" ';";
          tx.executeSql(query, [], function (tx) {
            defer.resolve();
          }, function (error) {
            defer.reject(error);
          });
        });
        return defer.promise;
      },
      updateData : function(tableName,id,data){
        var defer = $q.defer();
        db = window.sqlitePlugin.openDatabase({name: "my.db"});
        db.transaction(function (tx) {
          var query = "UPDATE " + tableName + " SET data = ? WHERE id = '"+id+" ';";
          tx.executeSql(query, [JSON.stringify(data)], function (tx,ru) {
            defer.resolve(ru);
          }, function (error) {
            defer.reject(error);
          });
        });
        return defer.promise;
      },
      getDataByAttribute : function(tableName,attribute,value){
        var defer = $q.defer();
        db = window.sqlitePlugin.openDatabase({name: "my.db"});
        db.transaction(function (tx) {
          var query = "SELECT * FROM " + tableName + " WHERE "+attribute+" = ?";
          tx.executeSql(query, [value], function (tx, results) {
            var len = results.rows.length;
            var data = [];
            for (var i = 0; i < len; i++) {
              data.push(eval("(" + results.rows.item(i).data + ")"));
            }
            defer.resolve(data);
          }, function (error) {
            defer.reject(error);
          });
        });
        return defer.promise;
      },
      dropTable : function(tableName){
        var defer = $q.defer();
        db = window.sqlitePlugin.openDatabase({name: "my.db"});
        db.transaction(function (tx) {
          var query = "DROP TABLE " + tableName + ";";
          tx.executeSql(query, [], function (tx) {
            defer.resolve();
          }, function (error) {
            defer.reject(error);
          });
        });
        return defer.promise;
      },
      dropDatabase : function(databaseName){
        var defer = $q.defer();
        db = window.sqlitePlugin.openDatabase({name: "my.db"});
        db.transaction(function (tx) {
          var query = "DROP DATABASE " + databaseName + ";";
          tx.executeSql(query, [], function (tx) {
            defer.resolve();
          }, function (error) {
            defer.reject(error);
          });
        });
        return defer.promise;
      }
    };
    return sqlLiteServices;
  })

  .factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
      id: 0,
      name: 'Ben Sparrow',
      lastText: 'You on your way?',
      face: 'img/ben.png'
    }, {
      id: 1,
      name: 'Max Lynx',
      lastText: 'Hey, it\'s me',
      face: 'img/max.png'
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      lastText: 'I should buy a boat',
      face: 'img/adam.jpg'
    }, {
      id: 3,
      name: 'Perry Governor',
      lastText: 'Look at my mukluks!',
      face: 'img/perry.png'
    }, {
      id: 4,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/mike.png'
    }];

    return {

      all: function () {
        return chats;
      },
      remove: function (chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function (chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }
    };
  });
