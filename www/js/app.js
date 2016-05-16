// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var db = null;
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngStorage'])

  .run(function ($ionicPlatform,$localStorage,$rootScope,$ionicLoading) {
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

      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        $ionicLoading.show({
          template: '<i class="icon ion-loading-b"></i>'
        });
      });
      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $ionicLoading.hide();
      });

      var dataBase = "person.db";
      if(angular.isUndefined($localStorage.databaseName)){
        $localStorage.databaseName = dataBase;
      }else{
        dataBase = $localStorage.databaseName;
      }

      document.addEventListener("deviceready", onDeviceReady, false);
      function onDeviceReady() {
        console.log('data base name : ' + dataBase);
        db = window.sqlitePlugin.openDatabase({name: dataBase});
        db.transaction(function (tx) {
          tx.executeSql('CREATE TABLE IF NOT EXISTS person (id TEXT primary key, data LONGTEXT)');
        });
      }
    });
  })
  .controller('mainCtr', function ($scope, sqlLiteServices) {

    $scope.dataLoaded = [];
    $scope.loadData = function () {
      insertBatchData();
      var tableName = "person";
      sqlLiteServices.getAllData(tableName).then(function (data) {
        $scope.dataLoaded = data;
      }, function (error) {
        alert('error : ' + JSON.stringify(error));
      });
    };
    $scope.data = {};
    function insertBatchData() {
      if($localStorage.databaseName =='dataSet.db'){
        var data = [
          {
            "lastUpdated": "2016-02-04T10:17:18.951+0000",
            "created": "2015-07-21T06:16:22.814+0000",
            "name": " RBF_RHMT Quarterly Assessment ",
            "id": "l8wJnfZhpZC",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/l8wJnfZhpZC"
          }, {
            "lastUpdated": "2016-04-15T08:18:36.662+0000",
            "created": "2015-08-27T10:47:43.216+0000",
            "name": "BRN_Dispensary Scoring",
            "id": "nqKkegk1y8U",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/nqKkegk1y8U"
          }, {
            "lastUpdated": "2016-04-15T08:22:55.302+0000",
            "created": "2015-09-02T02:15:03.176+0000",
            "name": "BRN_Health Center Scoring",
            "id": "RixTh0Xs0A7",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/RixTh0Xs0A7"
          }, {
            "lastUpdated": "2016-04-15T08:22:57.527+0000",
            "created": "2015-09-10T02:31:14.907+0000",
            "name": "BRN_Hospital scoring",
            "id": "fiDtcNUzKI6",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/fiDtcNUzKI6"
          }, {
            "lastUpdated": "2016-01-24T15:02:06.173+0000",
            "created": "2014-09-12T15:03:07.973+0000",
            "name": "CCHP Supervision Checklist",
            "id": "lYspXa5wSDz",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/lYspXa5wSDz"
          }, {
            "lastUpdated": "2016-04-15T09:39:45.505+0000",
            "created": "2016-04-13T08:20:52.918+0000",
            "name": "Cohort ya mama na mtoto",
            "id": "MZOBkG8d9Ju",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/MZOBkG8d9Ju"
          }, {
            "lastUpdated": "2016-01-24T15:02:06.362+0000",
            "created": "2013-04-16T12:44:35.854+0000",
            "name": "HMIS_CHMT Supportive Supervision",
            "id": "ESBYM6lsXTD",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/ESBYM6lsXTD"
          }, {
            "lastUpdated": "2016-01-24T15:02:06.460+0000",
            "created": "2014-05-07T13:12:08.204+0000",
            "name": "HMIS_Council Level Supportive Supervision",
            "id": "lhrv9Ba0vbz",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/lhrv9Ba0vbz"
          }, {
            "lastUpdated": "2016-02-08T12:17:10.716+0000",
            "created": "2013-04-20T15:02:51.854+0000",
            "name": "HMIS_Death Registry",
            "id": "ws4ZoC7SC1d",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/ws4ZoC7SC1d"
          }, {
            "lastUpdated": "2016-01-24T15:02:06.693+0000",
            "created": "2014-05-12T18:26:09.056+0000",
            "name": "HMIS_Facility Level Supportive Supervision",
            "id": "BDKp0VDJRDv",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/BDKp0VDJRDv"
          }, {
            "lastUpdated": "2016-02-09T13:39:38.305+0000",
            "code": "Postnatal",
            "created": "2013-04-17T07:32:23.618+0000",
            "name": "HMIS_Huduma Baada ya Kujifungua (Postnatal)",
            "id": "rm3y3VHPiFD",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/rm3y3VHPiFD"
          }, {
            "lastUpdated": "2016-02-08T11:19:54.997+0000",
            "code": "Idadi ya Watu(Population)",
            "created": "2013-04-16T12:44:41.500+0000",
            "name": "HMIS_Idadi ya Watu (Population)",
            "id": "FLR8w9ntW1R",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/FLR8w9ntW1R"
          }, {
            "lastUpdated": "2016-04-08T09:21:03.310+0000",
            "code": "ANC",
            "created": "2013-04-18T07:42:34.773+0000",
            "name": "HMIS_Kliniki ya Wajawazito (ANC)",
            "id": "zeEp4Xu2GOm",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/zeEp4Xu2GOm"
          }, {
            "lastUpdated": "2016-02-09T13:55:03.162+0000",
            "code": "Labour and Delivery - L&D",
            "created": "2013-04-17T07:32:52.654+0000",
            "name": "HMIS_Kutoka Wodi ya Wazazi (L&D)",
            "id": "GzvLb3XVZbR",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/GzvLb3XVZbR"
          }, {
            "lastUpdated": "2016-02-09T13:55:40.503+0000",
            "created": "2013-04-16T12:44:44.833+0000",
            "name": "HMIS_Magonjwa ya Kuhara (DTC) ",
            "id": "QntdhuQfgvT",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/QntdhuQfgvT"
          }, {
            "lastUpdated": "2016-01-24T15:02:09.819+0000",
            "code": "DTC Pilot",
            "created": "2013-04-08T11:03:49.171+0000",
            "name": "HMIS_Magonjwa ya Kuhara (DTC) Pilot",
            "id": "jNsYicUMUDr",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/jNsYicUMUDr"
          }, {
            "lastUpdated": "2016-02-09T12:56:48.312+0000",
            "created": "2015-02-19T12:18:54.165+0000",
            "name": "HMIS_Repoti Kutoka Kituo cha Huduma (Book 10)",
            "id": "bHrWIwZaVV2",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/bHrWIwZaVV2"
          }, {
            "lastUpdated": "2016-02-05T12:30:44.351+0000",
            "created": "2013-04-16T12:45:03.750+0000",
            "name": "HMIS_Taarifa za Wafanya Kazi(Human Resources Register)",
            "id": "Z8Hz5lc8utD",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/Z8Hz5lc8utD"
          }, {
            "lastUpdated": "2016-02-09T13:55:25.309+0000",
            "created": "2013-04-16T12:45:04.562+0000",
            "name": "HMIS_Tracer Medicine",
            "id": "ZOvFj2vtlor",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/ZOvFj2vtlor"
          }, {
            "lastUpdated": "2016-04-08T08:22:49.911+0000",
            "created": "2013-04-16T12:45:05.430+0000",
            "name": "HMIS_Ufuatiliaji wa Watoto (Child Health)",
            "id": "cap79mdf6Co",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/cap79mdf6Co"
          }, {
            "lastUpdated": "2016-02-09T13:43:19.656+0000",
            "code": "Uzazi wa Mpango- ",
            "created": "2013-04-17T07:31:52.841+0000",
            "name": "HMIS_Uzazi wa Mpango (FP)",
            "id": "TfoI3vTGv1f",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/TfoI3vTGv1f"
          }, {
            "lastUpdated": "2016-02-05T12:21:38.640+0000",
            "created": "2014-12-07T07:32:32.110+0000",
            "name": "HMIS_Wagonjwa wa Kinywa (Dental)",
            "id": "xQWse025yRw",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/xQWse025yRw"
          }, {
            "lastUpdated": "2016-02-08T12:23:59.951+0000",
            "created": "2013-04-18T07:40:32.605+0000",
            "name": "HMIS_Wagonjwa wa Kulazwa (IPD) ",
            "id": "qpcwPcj8D6u",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/qpcwPcj8D6u"
          }, {
            "lastUpdated": "2016-01-24T15:02:13.913+0000",
            "code": "IPD Pilot",
            "created": "2013-04-14T16:05:10.116+0000",
            "name": "HMIS_Wagonjwa wa Kulazwa (IPD) Pilot",
            "id": "lHmjFg0PftA",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/lHmjFg0PftA"
          }, {
            "lastUpdated": "2016-01-24T15:02:14.366+0000",
            "created": "2014-12-08T11:58:00.400+0000",
            "name": "HMIS_Wagonjwa wa Macho (Eye)",
            "id": "ExX34Bpv0qN",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/ExX34Bpv0qN"
          }, {
            "lastUpdated": "2016-02-09T13:55:41.216+0000",
            "created": "2013-04-18T07:38:40.755+0000",
            "name": "HMIS_Wagonjwa wa Nje (OPD) ",
            "id": "v6wdME3ouXu",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/v6wdME3ouXu"
          }, {
            "lastUpdated": "2016-01-24T15:02:15.403+0000",
            "code": "OPD Pilot",
            "created": "2013-04-08T10:59:43.317+0000",
            "name": "HMIS_Wagonjwa wa Nje (OPD) Pilot",
            "id": "FOzT56buu09",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/FOzT56buu09"
          }, {
            "lastUpdated": "2016-02-05T12:30:47.885+0000",
            "created": "2013-04-16T12:44:43.868+0000",
            "name": "IDSR Weekly Report",
            "id": "NDcgQeGaJC9",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/NDcgQeGaJC9"
          }, {
            "lastUpdated": "2016-01-24T15:02:17.414+0000",
            "created": "2014-08-29T11:26:59.540+0000",
            "name": "LEP07 Case notification report of leprosy",
            "id": "ykDbDeDvTcx",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/ykDbDeDvTcx"
          }, {
            "lastUpdated": "2016-01-24T15:02:17.733+0000",
            "created": "2014-11-30T19:38:09.872+0000",
            "name": "LEP08 Leprosy Drugs Order Calculation Form",
            "id": "UHDfKY2mUOQ",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/UHDfKY2mUOQ"
          }, {
            "lastUpdated": "2016-01-24T15:02:18.133+0000",
            "created": "2014-08-29T12:49:15.114+0000",
            "name": "LEP09 a) PB Leprosy patients treatment outcome",
            "id": "mns9UIMI76W",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/mns9UIMI76W"
          }, {
            "lastUpdated": "2016-01-24T15:02:18.558+0000",
            "created": "2014-11-29T20:47:32.943+0000",
            "name": "LEP09 b) MB Leprosy patients treatment outcome",
            "id": "FRvxYMRrvGw",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/FRvxYMRrvGw"
          }, {
            "lastUpdated": "2016-01-24T15:02:18.940+0000",
            "created": "2014-11-29T20:47:37.985+0000",
            "name": "LEP09 c) Outcome of standard treatment for reaaction",
            "id": "khoCLNBPaDA",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/khoCLNBPaDA"
          }, {
            "lastUpdated": "2016-01-24T15:02:19.322+0000",
            "created": "2014-08-29T04:54:50.083+0000",
            "name": "LEP10 Annual_Report on Prevention of Disability",
            "id": "O2V8r4UT8kB",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/O2V8r4UT8kB"
          }, {
            "lastUpdated": "2016-04-21T13:01:55.611+0000",
            "created": "2016-01-15T14:29:22.282+0000",
            "name": "Lars: Mod2",
            "id": "KXIWDEtpS8F",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/KXIWDEtpS8F"
          }, {
            "lastUpdated": "2016-02-22T10:42:52.448+0000",
            "created": "2014-11-16T09:00:26.818+0000",
            "name": "Lars: Mod2 Old",
            "id": "ERaKlYsCvEg",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/ERaKlYsCvEg"
          }, {
            "lastUpdated": "2016-04-21T13:01:57.620+0000",
            "created": "2015-01-25T06:14:57.124+0000",
            "name": "Lars: Mod3",
            "id": "JVMpcqMMLWZ",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/JVMpcqMMLWZ"
          }, {
            "lastUpdated": "2016-01-31T07:57:59.560+0000",
            "created": "2016-01-20T03:59:12.996+0000",
            "name": "NACP cohort on progress",
            "id": "mAG4ftrKx8I",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/mAG4ftrKx8I"
          }, {
            "lastUpdated": "2016-02-01T03:08:06.123+0000",
            "created": "2014-06-28T14:57:16.394+0000",
            "name": "NACP_Cohort Reporting Form",
            "id": "f9vXx9cMfjA",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/f9vXx9cMfjA"
          }, {
            "lastUpdated": "2016-02-12T08:10:22.172+0000",
            "created": "2016-01-19T12:07:37.352+0000",
            "name": "NACP_Cohort Reporting Form_new",
            "id": "O3YouyoQAz5",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/O3YouyoQAz5"
          }, {
            "lastUpdated": "2016-02-09T13:59:38.926+0000",
            "created": "2013-12-12T18:50:56.729+0000",
            "name": "NACP_HIV Care and Treatment Reporting Form",
            "id": "Hwcn7ajwZ1p",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/Hwcn7ajwZ1p"
          }, {
            "lastUpdated": "2016-02-12T07:57:32.628+0000",
            "created": "2015-12-06T16:34:56.044+0000",
            "name": "NACP_HIV Care and Treatment Reporting Form_new",
            "id": "USMiaLGIFOs",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/USMiaLGIFOs"
          }, {
            "lastUpdated": "2016-02-09T16:27:14.523+0000",
            "created": "2013-03-19T07:11:23.566+0000",
            "name": "NACP_HIV Testing and Counselling (HTC)",
            "id": "Dp0VF7ssmcH",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/Dp0VF7ssmcH"
          }, {
            "lastUpdated": "2016-01-24T15:02:22.400+0000",
            "created": "2015-12-04T03:06:31.869+0000",
            "name": "NACP_HIV Testing and Counselling (HTC)_new",
            "id": "yCzCXenFUBk",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/yCzCXenFUBk"
          }, {
            "lastUpdated": "2016-02-04T13:17:35.518+0000",
            "created": "2013-03-18T03:11:48.388+0000",
            "name": "NACP_Home Based Care ( HUWANYU)",
            "id": "CxaDPrjhmax",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/CxaDPrjhmax"
          }, {
            "lastUpdated": "2016-02-04T11:39:08.075+0000",
            "created": "2013-03-26T09:03:17.561+0000",
            "name": "NACP_Male Circumcision Services",
            "id": "f8QXtGOYdbb",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/f8QXtGOYdbb"
          }, {
            "lastUpdated": "2016-01-24T15:02:23.723+0000",
            "created": "2013-03-20T10:19:53.364+0000",
            "name": "NACP_PMTCT ANC",
            "id": "Z3YKwqr0QYE",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/Z3YKwqr0QYE"
          }, {
            "lastUpdated": "2016-01-24T15:02:24.087+0000",
            "created": "2013-03-18T03:11:49.881+0000",
            "name": "NACP_PMTCT MAT",
            "id": "QGBGjVAodLs",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/QGBGjVAodLs"
          }, {
            "lastUpdated": "2016-01-24T15:02:24.396+0000",
            "created": "2013-04-16T12:44:53.172+0000",
            "name": "NACP_PMTCT MC",
            "id": "LQHYnrTVHJp",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/LQHYnrTVHJp"
          }, {
            "lastUpdated": "2016-02-09T12:57:15.196+0000",
            "created": "2014-02-23T18:13:38.344+0000",
            "name": "NACP_PMTCT MC Quaterly",
            "id": "g1oggP7x124",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/g1oggP7x124"
          }, {
            "lastUpdated": "2016-01-24T15:02:25.219+0000",
            "created": "2013-04-16T12:44:54.053+0000",
            "name": "NACP_PMTCT PCR",
            "id": "tgItMSP1gzz",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/tgItMSP1gzz"
          }, {
            "lastUpdated": "2016-01-24T15:02:25.557+0000",
            "created": "2013-10-31T10:53:45.546+0000",
            "name": "NACP_Post Exposure Prophylaxis (PEP)",
            "id": "EfFfvLkrY2u",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/EfFfvLkrY2u"
          }, {
            "lastUpdated": "2016-02-09T16:23:56.328+0000",
            "created": "2013-04-17T06:00:31.914+0000",
            "name": "NACP_Sexually Transmitted Infections (STI)",
            "id": "db4lfMnttc6",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/db4lfMnttc6"
          }, {
            "lastUpdated": "2016-02-09T12:32:38.514+0000",
            "created": "2014-11-12T06:38:45.600+0000",
            "name": "NMCP Dispensing Monthly Report",
            "id": "GpPH69ru2po",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/GpPH69ru2po"
          }, {
            "lastUpdated": "2016-02-02T05:42:27.354+0000",
            "created": "2014-11-05T03:45:29.810+0000",
            "name": "NMCP_Malaria Lab Tests Monthly Report",
            "id": "V8bbSX0sFf2",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/V8bbSX0sFf2"
          }, {
            "lastUpdated": "2016-02-09T13:27:29.260+0000",
            "created": "2013-03-27T02:31:17.660+0000",
            "name": "NMCP_National Malaria Control Programme",
            "id": "cfj6Fogl0mk",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/cfj6Fogl0mk"
          }, {
            "lastUpdated": "2016-01-24T15:02:27.370+0000",
            "code": "P4P Evaluation Form",
            "created": "2013-04-16T12:44:52.149+0000",
            "name": "P4P Evaluation Form",
            "id": "dqB7PrDs2tN",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/dqB7PrDs2tN"
          }, {
            "lastUpdated": "2016-02-04T10:15:29.070+0000",
            "created": "2015-12-15T13:16:03.645+0000",
            "name": "RBF_Available Budgets",
            "id": "WoJdukGGbrV",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/WoJdukGGbrV"
          }, {
            "lastUpdated": "2016-02-04T10:15:18.298+0000",
            "created": "2015-08-11T18:12:48.013+0000",
            "name": "RBF_CHMT Quarterly Assessment ",
            "id": "xduuIE2umkJ",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/xduuIE2umkJ"
          }, {
            "lastUpdated": "2016-04-01T07:00:45.101+0000",
            "created": "2015-06-16T11:01:23.060+0000",
            "name": "RBF_Data Verification Form",
            "id": "XELEIBVBjEH",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/XELEIBVBjEH"
          }, {
            "lastUpdated": "2016-02-04T10:22:12.129+0000",
            "created": "2015-07-20T10:49:00.817+0000",
            "name": "RBF_Quarterly Quality Activities/Areas Assessment Results of the Facility",
            "id": "NFSj4e7z7mk",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/NFSj4e7z7mk"
          }, {
            "lastUpdated": "2016-02-04T10:21:02.892+0000",
            "created": "2015-07-20T15:57:02.430+0000",
            "name": "RBF_Quarterly Quality Activities/Areas Assessment Results of the Hospital",
            "id": "x6ZQGbpACPW",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/x6ZQGbpACPW"
          }, {
            "lastUpdated": "2016-02-04T11:12:17.554+0000",
            "created": "2015-08-12T05:22:31.374+0000",
            "name": "RBF_Regional Secretariat Quartely Assessment",
            "id": "BecvsHRyEZI",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/BecvsHRyEZI"
          }, {
            "lastUpdated": "2016-01-24T15:02:29.579+0000",
            "created": "2015-07-20T11:19:01.923+0000",
            "name": "RBF_Summary Form for Non-HMIS Indicators",
            "id": "uEdg4kUyYeQ",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/uEdg4kUyYeQ"
          }, {
            "lastUpdated": "2016-01-24T15:02:29.956+0000",
            "created": "2015-11-24T03:20:38.656+0000",
            "name": "RBF_Troubleshooting",
            "id": "Ua8izBpq2Tu",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/Ua8izBpq2Tu"
          }, {
            "lastUpdated": "2016-01-24T15:02:30.286+0000",
            "created": "2013-04-17T08:16:50.689+0000",
            "name": "RCHS_BEmONC FANC form",
            "id": "XMby1NMTx8A",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/XMby1NMTx8A"
          }, {
            "lastUpdated": "2016-01-26T08:14:33.531+0000",
            "created": "2013-10-22T13:06:37.604+0000",
            "name": "RCHS_Cervical Cancer Screening And Treatment CECAP",
            "id": "BgHYmy7kqId",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/BgHYmy7kqId"
          }, {
            "lastUpdated": "2016-03-15T12:41:25.504+0000",
            "created": "2013-09-25T08:37:55.266+0000",
            "name": "RCHS_Ukatili wa Kijinsia na Ukatili dhidi ya Watoto (GBV)",
            "id": "AYmj40WLSo7",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/AYmj40WLSo7"
          }, {
            "lastUpdated": "2016-01-24T15:02:31.649+0000",
            "created": "2015-08-21T01:45:09.471+0000",
            "name": "RCHS_Ukatili wa Kijinsia na Ukatili dhidi ya Watoto (GBV) Pilot",
            "id": "wckku7TWBzS",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/wckku7TWBzS"
          }, {
            "lastUpdated": "2016-01-24T15:02:30.931+0000",
            "created": "2013-04-16T12:26:40.200+0000",
            "name": "RCHS_cPAC",
            "id": "TfwpJ6blcEJ",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/TfwpJ6blcEJ"
          }, {
            "lastUpdated": "2016-01-24T15:02:31.972+0000",
            "created": "2014-05-07T14:52:33.584+0000",
            "name": "TB07 Tuberculosis and TB/HIV",
            "id": "IzUZXETYoyB",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/IzUZXETYoyB"
          }, {
            "lastUpdated": "2016-01-24T15:02:32.286+0000",
            "created": "2014-11-27T08:30:09.058+0000",
            "name": "TB08 Drugs and Lab Supplies Order Calculation Form",
            "id": "ZOkoQ7BtbVQ",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/ZOkoQ7BtbVQ"
          }, {
            "lastUpdated": "2016-01-24T15:02:32.609+0000",
            "created": "2014-08-28T07:48:30.884+0000",
            "name": "TB09 Tuberculosis and TB/HIV",
            "id": "SNoBbEptXth",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/SNoBbEptXth"
          }, {
            "lastUpdated": "2016-01-24T15:02:06.255+0000",
            "created": "2015-04-29T11:03:07.514+0000",
            "name": "eLMIS_Commodities Statistics",
            "id": "VyjgCnaJMRl",
            "href": "http://41.217.202.50:8080/dhis/api/dataSets/VyjgCnaJMRl"
          }
        ];
        var tableName = 'person';
        sqlLiteServices.insertBatchData(tableName, data).then(function (data) {
          alert("insertBatchData: " + JSON.stringify(data));
          $scope.data = {};
        }, function (error) {
          alert('error insertBatchData: ' + JSON.stringify(error));

        });
      }

    }

    $scope.addData = function () {
      var tableName = 'person';
      if ($scope.data.person) {
        var id = JSON.stringify($scope.dataLoaded.length + 1);
        var data = {id: id, name: $scope.data.person};
        sqlLiteServices.insertData(tableName, id, data).then(function (data) {
          alert("insertId: " + JSON.stringify(data));
          $scope.data = {};
        }, function (error) {
          alert('error : ' + JSON.stringify(error));

        });
      }
      $scope.loadData();
    };

    $scope.delete = function (person) {
      var tableName = "person";
      sqlLiteServices.deleteDataByAttribute(tableName, 'id', JSON.stringify(person.id)).then(function () {
        $scope.loadData();
      }, function (error) {
        alert('error : ' + JSON.stringify(error));
      });
    };
    $scope.update = function (person) {
      var tableName = "person";
      var UpdatedData = person;
      UpdatedData.name = person.name + person.id;
      sqlLiteServices.getDataByAttribute(tableName, 'id', JSON.stringify(person.id)).then(function (data) {
        alert('attribute values : ' + JSON.stringify(data));
        sqlLiteServices.updateDataByAttribute(tableName, 'id', JSON.stringify(person.id), UpdatedData).then(function (data) {
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
