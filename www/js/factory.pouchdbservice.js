/*
 * Pouch DB Service.
 * Author: LSajev
 * Date: 2-Nov-2015
 * 
 * */

//Ex creating a DB
/*
 $scope.dbObject = PouchDBService.createDB("dbName");
 */

//Ex accessing a method in controller.
/*
 PouchDBService.getById($scope.dbObject, id).then(function (response) {
 // handle response
 }).catch(function (err) {
 console.log(err);
 });

 */

//API returns a promise you should access each service using ".then() " method
/* Ex
 insert().then(function (response) {
 // handle response
 }).catch(function (err) {
 console.log(err);
 });


 getById(dbObj, id).then(function (response) {
 // handle response
 }).catch(function (err) {
 console.log(err);
 });

 */
angular.module('starter.services').factory('PouchDBService', function ($http, $log) {
//function to destroy a DB
    function deleteDB_(dbObj) {
        return dbObj.destroy();
    }

//function to create a new DB.
    function createDB_(dbName) {
        return new PouchDB(dbName);
    }

//function to fetch all records from DB.
    function getAll_(dbObj) {

        return dbObj.allDocs({
            include_docs: true,
            attachments: true
        });
    }

//function to insert a new record. it's compulsury to have a _id value in json object it should be unique.
    function insert_(dbObj, dbObj) {
        return dbObj.put(dbObj);
    }

//function to fetch a row by id
    function getById_(dbObj, id) {
        return dbObj.get(id);
    }

//function to remove a record
    function removeRecord_(dbObj, id) {
        return dbObj.get(id).then(function (doc) {
            return dbObj.remove(doc._id, doc._rev);
        });
    }

//function to insert the bulk json objects
    function insertBatchJson_(dbObj, jsonObj) {
        return dbObj.bulkDocs(dbObj, jsonObj);
    }

//function to get the db info
    /*
    It will return output
     {
     "db_name": "test",
     "doc_count": 4,
     "update_seq": 5
     }
     */
    function getDBInfo_(dbObj) {
        return dbObj.db.info();
    }

    return {
        getAll: function (dbObj) {
            return getAll_(dbObj);
        },
        createDB: function (dbName) {
            return createDB_(dbName);
        },
        insert: function (dbObj, jsonObj) {
            return insert_(dbName);
        },
        insertBatchJson: function () {
            return insertBatchJson_(dbObj, jsonObj);
        },
        deleteDB: function (dbObj) {
            return deleteDB_(dbName);
        },
        getById: function (dbObj, id) {
            return getById_(dbObj, id);
        },
        removeRecord: function (dbObj, id) {
            return removeRecord_(dbObj, id);
        },
        getDBInfo: function (dbObj) {
            return getDBInfo_(dbObj);
        }
    }

});