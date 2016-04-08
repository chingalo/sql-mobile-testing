/**
 * Created by chingalo on 4/8/16.
 */

var db = null;

function getAllData(tableName){
  db = window.sqlitePlugin.openDatabase({name: "my.db"});
  var data = [];
  db.transaction(function(tx) {
    var query = "select * from "+tableName+";";
    tx.executeSql(query,[],function(tx, results){
      var len = results.rows.length;

      for (var i=0; i<len; i++){
        data.push(eval("(" + results.rows.item(i).data + ")"));
      }
      return data;
    },function(error){
      //error
      return data;
    });
  });
}
function insertData(tableName, data){
  db.transaction(function(tx) {
    var query = "INSERT INTO "+tableName+" (data) VALUES (?)";
    tx.executeSql(query, [JSON.stringify(data)], function(tx, res) {
      //success adding data
    }, function(e) {
      alert.log("ERROR: " + e);
    });
  });
}
