/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var app = angular.module('smartbins', []);

//watt = amp × volt
//we lock down the sensor ID's.
// Sensor 1 for Solar Panel. 
//Sensor 2 for PCB + Compactor
//Sensor 3 for Pi (optional) + Router.
app.controller("dataTableCtrl", [ "$scope", "$http", function($scope, $http) {
    var reqSensor1 = {
        method: 'GET',
        url: 'http://is439app.139.59.238.27.nip.io/api/power-sensors/1/wh-logs',
        headers: {
          'Content-Type': "undefined"
        }
    };
    //sensor 1, energy generation
    $http(reqSensor1).then(function(res){
        $scope.energyGenerationSensor1 = res.data.data;
        console.log(res.data.data);
        
    });
    
    
    var reqSensor2 = {
        method: 'GET',
        url: 'http://is439app.139.59.238.27.nip.io/api/power-sensors/2/wh-logs',
        headers: {
          'Content-Type': "undefined"
        }
    };
    //sensor 1, energy generation
    $http(reqSensor2).then(function(res){
        $scope.PCB_Compactor_Sensor2 = res.data.data;
        console.log(res.data.data);
        
    });
    
    var reqSensor3 = {
        method: 'GET',
        url: 'http://is439app.139.59.238.27.nip.io/api/power-sensors/3/wh-logs',
        headers: {
          'Content-Type': "undefined"
        }
    };
    //sensor 1, energy generation
    $http(reqSensor3).then(function(res){
        $scope.pi_router_Sensor3 = res.data.data;
        console.log(res.data.data);
        
    });
    
    
    var weatherRequest = {
            method: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/forecast?q=Singapore&APPID=98cb3df5da2dfe7e78d448befd911bb1',
            headers: {
              'Content-Type': "undefined"
            }
        };
    
    //The Bigbelly version is BB5 compactor running on chain and motor
    //PCB - I can pass you one and you can analyse it
    //
    //Battery - SLA 18 aH, 12V
    //
    //Solar Panel- monocrystalline 50W 18V Max Amp 2.8A
    //
    //Router - RansNet (see attached)
    $http(weatherRequest).then(function(res){
            $scope.weatherForecastList = res.data.list;
            console.log(res.data.list);
            
    }, function(){
        
    });
    
    var weatherHistoricalRequest = {
        method: 'GET',
        url: 'assets/weather/historicalWeather.json',
        headers: {
          'Content-Type': "undefined"
        }
    };
    
    //The Bigbelly version is BB5 compactor running on chain and motor
    //PCB - I can pass you one and you can analyse it
    //
    //Battery - SLA 18 aH, 12V
    //
    //Solar Panel- monocrystalline 50W 18V Max Amp 2.8A
    //
    //Router - RansNet (see attached)
    $http(weatherHistoricalRequest).then(function(res){
            $scope.weatherHistoricalList = res.data.list;
            console.log(res.data.list);
    }, function(){
        
    });
}]);