/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var app = angular.module('smartbins', []);

app.controller("smartbinsCtrl", [ "$scope", "$http", function($scope, $http) {
        // insert sensor reading into database
//        $scope.date = "08/11/2016";
//        $scope.time = "13:00";
//        $scope.sensorId = "1";
//        $scope.reading = "23";
//        
//        $scope.sendReading = function(date, time, sensorId, reading){
//            console.log(date + time + sensorId + reading);
//            var req = {
//                method: 'POST',
//                url: 'insertReading',
//                headers: {
//                  'Content-Type': "undefined"
//                },
//                data: { date: date, time: time, sensorId: sensorId, reading: reading}
//            };
//            $http(req).then(function(){
//                console.log("inserted successfully the reading");
//            }, function(){
//
//            });
//        };
        
        var reqSensor1 = {
            method: 'GET',
            url: 'https://is439app.139.59.238.27.nip.io/api/power-sensors/1/wh-logs',
            headers: {
              'Content-Type': "undefined"
            }
        };
        //sensor 1
        $http(reqSensor1).then(function(res){
            var kwh_logs = res.data.data;
            console.log(res.data.data);
            var chart = AmCharts.makeChart("chartdiv1", {
    "type": "serial",
    "theme": "light",
    "legend": {
        "useGraphSettings": true
    },
    "dataProvider": kwh_logs,
    "synchronizeGrid":true,
    "valueAxes": [{
        "id":"v1",
        "axisColor": "#FCD202",
        "axisThickness": 2,
        "axisAlpha": 1,
        "position": "left"
    }, {
        "id":"v2",
        "axisColor": "#FCD202",
        "axisThickness": 2,
        "axisAlpha": 1,
        "position": "right"
    }, {
        "id":"v3",
        "axisColor": "#B0DE09",
        "axisThickness": 2,
        "gridAlpha": 0,
        "offset": 50,
        "axisAlpha": 1,
        "position": "left"
    }],
    "graphs": [{
        "valueAxis": "v1",
        "lineColor": "#B0DE09",
        "bullet": "round",
        "bulletBorderThickness": 1,
        "hideBulletsCount": 30,
        "title": "sensor 1 - energy generation",
        "valueField": "wH",
		"fillAlphas": 0
    }],
    "chartScrollbar": {},
    "chartCursor": {
        "cursorPosition": "mouse"
    },
    "categoryField": "measurement_taken_date_hour",
    "categoryAxis": {
        "parseDates": false,
        "axisColor": "#DADADA",
        "minorGridEnabled": true
    },
    "export": {
    	"enabled": true,
        "position": "bottom-right"
     }
});
        }, function(){

        });
        
    
    var reqSensor2 = {
            method: 'GET',
            url: 'https://is439app.139.59.238.27.nip.io/api/power-sensors/2/wh-logs',
            headers: {
              'Content-Type': "undefined"
            }
        };
    //sensor 2
    $http(reqSensor2).then(function(res){
            var kwh_logs = res.data.data;
            console.log(res.data.data);
            var chart = AmCharts.makeChart("chartdiv2", {
    "type": "serial",
    "theme": "light",
    "legend": {
        "useGraphSettings": true
    },
    "dataProvider": kwh_logs,
    "synchronizeGrid":true,
    "valueAxes": [{
        "id":"v1",
        "axisColor": "#FF6600",
        "axisThickness": 2,
        "axisAlpha": 1,
        "position": "left"
    }, {
        "id":"v2",
        "axisColor": "#FCD202",
        "axisThickness": 2,
        "axisAlpha": 1,
        "position": "right"
    }, {
        "id":"v3",
        "axisColor": "#B0DE09",
        "axisThickness": 2,
        "gridAlpha": 0,
        "offset": 50,
        "axisAlpha": 1,
        "position": "left"
    }],
    "graphs": [{
        "valueAxis": "v1",
        "lineColor": "#FF6600",
        "bullet": "round",
        "bulletBorderThickness": 1,
        "hideBulletsCount": 30,
        "title": "sensor 2 - PCB & Compactor",
        "valueField": "wH",
		"fillAlphas": 0
    }],
    "chartScrollbar": {},
    "chartCursor": {
        "cursorPosition": "mouse"
    },
    "categoryField": "measurement_taken_date_hour",
    "categoryAxis": {
        "parseDates": false,
        "axisColor": "#DADADA",
        "minorGridEnabled": true
    },
    "export": {
    	"enabled": true,
        "position": "bottom-right"
     }
});
        }, function(){

        });
        
        
        var reqSensor3 = {
            method: 'GET',
            url: 'https://is439app.139.59.238.27.nip.io/api/power-sensors/3/wh-logs',
            headers: {
              'Content-Type': "undefined"
            }
        };
        
        //sensor 3
        $http(reqSensor3).then(function(res){
            var kwh_logs = res.data.data;
            console.log(res.data.data);
            var chart = AmCharts.makeChart("chartdiv3", {
    "type": "serial",
    "theme": "light",
    "legend": {
        "useGraphSettings": true
    },
    "dataProvider": kwh_logs,
    "synchronizeGrid":true,
    "valueAxes": [{
        "id":"v1",
        "axisColor": "#FF6600",
        "axisThickness": 2,
        "axisAlpha": 1,
        "position": "left"
    }, {
        "id":"v2",
        "axisColor": "#FCD202",
        "axisThickness": 2,
        "axisAlpha": 1,
        "position": "right"
    }, {
        "id":"v3",
        "axisColor": "#B0DE09",
        "axisThickness": 2,
        "gridAlpha": 0,
        "offset": 50,
        "axisAlpha": 1,
        "position": "left"
    }],
    "graphs": [{
        "valueAxis": "v1",
        "lineColor": "#FF6600",
        "bullet": "round",
        "bulletBorderThickness": 1,
        "hideBulletsCount": 30,
        "title": "sensor 3 - pi & router",
        "valueField": "wH",
		"fillAlphas": 0
    }],
    "chartScrollbar": {},
    "chartCursor": {
        "cursorPosition": "mouse"
    },
    "categoryField": "measurement_taken_date_hour",
    "categoryAxis": {
        "parseDates": false,
        "axisColor": "#DADADA",
        "minorGridEnabled": true
    },
    "export": {
    	"enabled": true,
        "position": "bottom-right"
     }
});
        }, function(){

        });
        
    
            
}]);