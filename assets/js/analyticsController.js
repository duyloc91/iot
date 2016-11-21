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
app.controller("analyticsCtrl", [ "$scope", "$http", function($scope, $http) {
        
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd;
    } 

    if(mm<10) {
        mm='0'+mm;
    } 

    today = mm+'/'+dd+'/'+yyyy;

    var reqSensor1 = {
        method: 'GET',
        url: 'https://is439app.139.59.238.27.nip.io/api/power-sensors/1/wh-logs',
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
        url: 'https://is439app.139.59.238.27.nip.io/api/power-sensors/2/wh-logs',
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
        url: 'https://is439app.139.59.238.27.nip.io/api/power-sensors/3/wh-logs',
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
        url: 'https://api.openweathermap.org/data/2.5/forecast?q=Singapore&APPID=98cb3df5da2dfe7e78d448befd911bb1',
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
    var fwl =[];  //forecasted weather list
    $scope.totalEGdays = [];
    
    
    $http(weatherRequest).then(function(res){
        $scope.weatherForecastList = res.data.list;
        console.log(res.data.list);
        fwl = res.data.list;
        //forecasting the trend of energy generation base on weather
        $scope.fEnergyGen = [];
        //calculate cumulatve
        var cumulatedWH = 0;
        var cumulatedWH2 = 0;
        var cumulatedWH3 = 0;
        $scope.cumulativeEGhours = [];
        $scope.sensor2CumulativeList = [];
        $scope.sensor3CumulativeList = [];
        var fEGday = {}; //total forecasted energy generation for a day
        for ( i = 0; i < fwl.length; i++) {
            
            var fegh1  = {}; //forecasted energy generation for an hour
            var fegh2  = {}; //forecasted energy generation for an hour
            var fegh3  = {}; //forecasted energy generation for an hour
            
            var cumulative_fegh1  = {}; //cumulative forecasted energy generation for an hour
            var cumulative_fegh2  = {}; //cumulative forecasted energy generation for an hour
            var cumulative_fegh3  = {}; // forecasted energy generation for an hour
            
            var sensor2Cumulative1  = {}; 
            var sensor2Cumulative2  = {}; 
            var sensor2Cumulative3  = {}; 
            
            var sensor3Cumulative1  = {}; 
            var sensor3Cumulative2  = {}; 
            var sensor3Cumulative3  = {}; 
            
            fegh1.power_sensor_id = 1;
            fegh2.power_sensor_id = 1;
            fegh3.power_sensor_id = 1;
            cumulative_fegh1.power_sensor_id = 1;
            cumulative_fegh2.power_sensor_id = 1;
            cumulative_fegh3.power_sensor_id = 1;
            
            sensor2Cumulative1.power_sensor_id = 2;
            sensor2Cumulative1.power_sensor_id = 2;
            sensor2Cumulative1.power_sensor_id = 2;
            
            sensor3Cumulative1.power_sensor_id = 3;
            sensor3Cumulative1.power_sensor_id = 3;
            sensor3Cumulative1.power_sensor_id = 3;
            
            var fw = fwl[i]; //forecasted weather record
            var date = fw.dt_txt.substring(0, 10);
            
            var uvIndex = 12;
            $http({
            method: 'GET',
            url: 'https://api.openweathermap.org/v3/uvi/1.3,103.8/' + date + 'Z.json?appid=cb0705c8ed5c851213846170b6328fe7',
            }).then(function(res){
                uvIndex = res.data.data;
            });
            
            var hour = fw.dt_txt.substring(11, 13);
            fegh1.measurement_taken_date_hour = fw.dt_txt.substring(0, 11) + hour + ":00";
            fegh2.measurement_taken_date_hour = fw.dt_txt.substring(0, 11) + (Number(hour)+1) + ":00";
            fegh3.measurement_taken_date_hour = fw.dt_txt.substring(0, 11) + (Number(hour)+2) + ":00";
            
            cumulative_fegh1.measurement_taken_date_hour = fw.dt_txt.substring(0, 11) + hour + ":00";
            cumulative_fegh2.measurement_taken_date_hour = fw.dt_txt.substring(0, 11) + (Number(hour)+1) + ":00";
            cumulative_fegh3.measurement_taken_date_hour = fw.dt_txt.substring(0, 11) + (Number(hour)+2) + ":00";
            
            
            sensor2Cumulative1.measurement_taken_date_hour = fw.dt_txt.substring(0, 11) + hour + ":00";
            sensor2Cumulative2.measurement_taken_date_hour = fw.dt_txt.substring(0, 11) + (Number(hour)+1) + ":00";
            sensor2Cumulative3.measurement_taken_date_hour = fw.dt_txt.substring(0, 11) + (Number(hour)+2) + ":00";
            
            sensor3Cumulative1.measurement_taken_date_hour = fw.dt_txt.substring(0, 11) + hour + ":00";
            sensor3Cumulative2.measurement_taken_date_hour = fw.dt_txt.substring(0, 11) + (Number(hour)+1) + ":00";
            sensor3Cumulative3.measurement_taken_date_hour = fw.dt_txt.substring(0, 11) + (Number(hour)+2) + ":00";
            
            var wH1 = 50;
            var wH2 = 50;
            var wH3 = 50;
            var hour1 = Number(hour);
            var hour2 = Number(hour) + 1;
            var hour3 = Number(hour) + 2;
            //before 5 am and after 7pm there is not much solar energy
            if (hour1 > 5 && hour1 < 19){
                //12 noon is the peak of solar energy
                if (hour1 >= 12){
                    wH1 = wH1 * (1 - (hour1 - 12)/7);    
                } else {
                    wH1 = wH1 * (1 - (12 - hour1)/7);
                }
            //no sun     
            } else {
                wH1 = 0;
            }
            
            //sensor 2 operates from 11am to 9pm
            if(hour1 >= 11 && hour1 <= 21){
                sensor2Cumulative1.wh = 24;
                cumulatedWH2 = cumulatedWH2 + 24;
                sensor2Cumulative1.cumulatedWH2 = cumulatedWH2;
                cumulative_fegh1.cumulatedWH2 = cumulatedWH2;
            } else {
                sensor2Cumulative1.wh = 0;
                sensor2Cumulative1.cumulatedWH2 = cumulatedWH2;
                cumulative_fegh1.cumulatedWH2 = cumulatedWH2;
            }
            if(hour2 >= 11 && hour2 <= 21){
                sensor2Cumulative2.wh = 24;
                cumulatedWH2 = cumulatedWH2 + 24;
                sensor2Cumulative2.cumulatedWH2 = cumulatedWH2;
                cumulative_fegh2.cumulatedWH2 = cumulatedWH2;
            } else {
                sensor2Cumulative2.wh = 0;
                sensor2Cumulative2.cumulatedWH2 = cumulatedWH2;
                cumulative_fegh2.cumulatedWH2 = cumulatedWH2;
            }
            if(hour3 >= 11 && hour3 <= 21){
                sensor2Cumulative3.wh = 24;
                cumulatedWH2 = cumulatedWH2 + 24;
                sensor2Cumulative3.cumulatedWH2 = cumulatedWH2;
                cumulative_fegh3.cumulatedWH2 = cumulatedWH2;
            } else {
                sensor2Cumulative3.wh = 0;
                sensor2Cumulative3.cumulatedWH2 = cumulatedWH2;
                cumulative_fegh3.cumulatedWH2 = cumulatedWH2;
            }
            $scope.sensor2CumulativeList.push(sensor2Cumulative1);
            $scope.sensor2CumulativeList.push(sensor2Cumulative2);
            $scope.sensor2CumulativeList.push(sensor2Cumulative3);
            
            //sensor 3
            if(hour1 === 7 || hour1 === 8 || hour1 === 12 || hour1 === 13 || hour1 === 18 || hour1 === 19 || hour1 === 20 ){
                sensor3Cumulative1.wh = 20;
                cumulatedWH3 = cumulatedWH3 + 20;
                sensor3Cumulative1.cumulatedWH3 = cumulatedWH3;
                cumulative_fegh1.cumulatedWH3 = cumulatedWH3;
            } else if(hour1 <= 5){
                sensor3Cumulative1.wh = 5;
                cumulatedWH3 = cumulatedWH3 + 5;
                sensor3Cumulative1.cumulatedWH3 = cumulatedWH3;
                cumulative_fegh1.cumulatedWH3 = cumulatedWH3;
            }else {
                sensor3Cumulative1.wh = 10;
                cumulatedWH3 = cumulatedWH3 + 10;
                sensor3Cumulative1.cumulatedWH3 = cumulatedWH3;
                cumulative_fegh1.cumulatedWH3 = cumulatedWH3;
            }
            if(hour2 === 7 || hour2 === 8 || hour2 === 12 || hour2 === 13 || hour2 === 18 || hour2 === 19 || hour2 === 20 ){
                sensor3Cumulative2.wh = 20;
                cumulatedWH3 = cumulatedWH3 + 20;
                sensor3Cumulative2.cumulatedWH3 = cumulatedWH3;
                cumulative_fegh2.cumulatedWH3 = cumulatedWH3;
            } else if(hour2 <= 5){
                sensor3Cumulative2.wh = 5;
                cumulatedWH3 = cumulatedWH3 + 5;
                sensor3Cumulative2.cumulatedWH3 = cumulatedWH3;
                cumulative_fegh2.cumulatedWH3 = cumulatedWH3;
            }else {
                sensor3Cumulative2.wh = 10;
                cumulatedWH3 = cumulatedWH3 + 10;
                sensor3Cumulative2.cumulatedWH3 = cumulatedWH3;
                cumulative_fegh3.cumulatedWH3 = cumulatedWH3;
            }
            
            if(hour3 === 7 || hour3 === 8 || hour3 === 12 || hour3 === 13 || hour3 === 18 || hour3 === 19 || hour3 === 20 ){
                sensor3Cumulative3.wh = 20;
                cumulatedWH3 = cumulatedWH3 + 20;
                sensor3Cumulative3.cumulatedWH3 = cumulatedWH3;
                cumulative_fegh3.cumulatedWH3 = cumulatedWH3;
            } else if(hour2 <= 5){
                sensor3Cumulative3.wh = 5;
                cumulatedWH3 = cumulatedWH3 + 5;
                sensor3Cumulative3.cumulatedWH3 = cumulatedWH3;
                cumulative_fegh3.cumulatedWH3 = cumulatedWH3;
            }else {
                sensor3Cumulative3.wh = 10;
                cumulatedWH3 = cumulatedWH3 + 10;
                sensor3Cumulative3.cumulatedWH3 = cumulatedWH3;
                cumulative_fegh3.cumulatedWH3 = cumulatedWH3;
            }
            $scope.sensor3CumulativeList.push(sensor3Cumulative1);
            $scope.sensor3CumulativeList.push(sensor3Cumulative2);
            $scope.sensor3CumulativeList.push(sensor3Cumulative3);
            
            //before 5 am and after 7pm there is not much solar energy
            if (hour2 > 5 && hour2 < 19){
                //12 noon is the peak of solar energy
                if (hour2 >= 12){
                    wH2 = wH2 * (1 - (hour2 - 12)/7);    
                } else {
                    wH2 = wH2 * (1 - (12 - hour2)/7);
                }
            //no sun     
            } else {
                wH2 = 0;
            }
            
            //before 5 am and after 7pm there is not much solar energy
            if (hour3 > 5 && hour3 < 19){
                //12 noon is the peak of solar energy
                if (hour3 >= 12){
                    wH3 = wH3 * (1 - (hour3 - 12)/7);    
                } else {
                    wH3 = wH3 * (1 - (12 - hour3)/7);
                }
            //no sun     
            } else {
                wH3 = 0;
            }
            
            var cloudiness = Number(fw.clouds.all);
            wH1 = wH1 * (1 - cloudiness/150) * (13 + uvIndex)/26;
            wH2 = wH2 * (1 - cloudiness/150) * (13 + uvIndex)/26;
            wH3 = wH3 * (1 - cloudiness/150) * (13 + uvIndex)/26;
            
            fegh1.wH = wH1.toFixed(2);
            fegh2.wH = wH2.toFixed(2);
            fegh3.wH = wH3.toFixed(2);
            
            cumulatedWH = Number(cumulatedWH) + Number(wH1.toFixed(2));
            cumulative_fegh1.wH = cumulatedWH;
            cumulatedWH = Number(cumulatedWH) + Number(wH2.toFixed(2));
            cumulative_fegh2.wH = cumulatedWH;
            cumulatedWH = Number(cumulatedWH) + Number(wH3.toFixed(2));
            cumulative_fegh3.wH = cumulatedWH;
            
            if (Number(hour) === 0){
                fEGday = {};
                fEGday.date = date;
                fEGday.totalEG = 0 + wH1.toFixed(2) + wH2.toFixed(2) + wH3.toFixed(2);
            } else if (Number(hour) === 21){
                fEGday.totalEG = 0 + wH1.toFixed(2) + wH2.toFixed(2) + wH3.toFixed(2);
                $scope.totalEGdays.push(fEGday);
                fEGday = {};
            } else {
                fEGday.totalEG = 0 + wH1.toFixed(2) + wH2.toFixed(2) + wH3.toFixed(2);
            }
            
            sensor2Cumulative1.wH = 14;
            sensor2Cumulative2.wH = 14
            sensor2Cumulative3.wH = 14;
            
            $scope.cumulativeEGhours.push(cumulative_fegh1);
            $scope.cumulativeEGhours.push(cumulative_fegh2);
            $scope.cumulativeEGhours.push(cumulative_fegh3);
            
            fegh1.cloudiness = fw.clouds.all;
            fegh2.cloudiness = fw.clouds.all;
            fegh3.cloudiness = fw.clouds.all;
            
            $scope.fEnergyGen.push(fegh1);
            $scope.fEnergyGen.push(fegh2);
            $scope.fEnergyGen.push(fegh3);
        }
        
        var chart = AmCharts.makeChart( "chartdivSolarEnergy", {
            "type": "serial",
            "theme": "light",
            "dataProvider": $scope.fEnergyGen,
            "gridAboveGraphs": true,
            "valueAxes": [{
                "id":"v1",
                "axisColor": "rgb(103, 183, 220)",
                "axisThickness": 2,
                "axisAlpha": 1,
                "position": "left"
            }, {
                "id":"v2",
                "axisColor": "#FCD202",
                "axisThickness": 2,
                "axisAlpha": 1,
                "position": "right"
            }],
            "graphs": [ {
                "id": "graph1",
                "valueAxis": "v1",
                "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
                "fillAlphas": 0.8,
                "lineAlpha": 0.2,
                "title": "Solar Energy",
                "type": "column",
                "valueField": "wH"
            },
            {
                "id": "graph2",
                "valueAxis": "v2",
                "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
                "bullet": "round",
                "lineThickness": 3,
                "bulletSize": 7,
                "bulletBorderAlpha": 1,
                "bulletColor": "#FFFFFF",
                "useLineColorForBulletBorder": true,
                "bulletBorderThickness": 3,
                "fillAlphas": 0,
                "lineAlpha": 1,
                "title": "Cloudy Percentage",
                "valueField": "cloudiness",
                "dashLengthField": "dashLengthLine"
            }],
            "chartCursor": {
              "categoryBalloonEnabled": false,
              "cursorAlpha": 0,
              "zoomable": false
            },
            "categoryField": "measurement_taken_date_hour",
            "categoryAxis": {
              "gridPosition": "start",
              "gridAlpha": 0,
              "tickPosition": "start",
              "tickLength": 20
            },
            "export": {
              "enabled": true
            },
            "legend": {
                "useGraphSettings": true
            }

          } );
          
        
        //cumulative chart
        var chart = AmCharts.makeChart( "chartdivCumulativeSolarEnergy", {
            "type": "serial",
            "theme": "light",
            "dataProvider": $scope.cumulativeEGhours,
            "gridAboveGraphs": true,
            "valueAxes": [{
                "id":"v1",
                "axisColor": "rgb(103, 183, 220)",
                "axisThickness": 2,
                "axisAlpha": 1,
                "position": "left"
            }],
            "graphs": [ {
                "id": "graph1",
                "valueAxis": "v1",
                "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
                "fillAlphas": 0.8,
                "lineAlpha": 0.2,
                "title": "Solar Energy",
                "type": "column",
                "valueField": "wH"
            },
            {
                "id": "graph2",
                "valueAxis": "v2",
                "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
                "bullet": "round",
                "lineThickness": 2,
                "bulletSize": 2,
                "bulletBorderAlpha": 1,
                "bulletColor": "#FFFFFF",
                "useLineColorForBulletBorder": true,
                "bulletBorderThickness": 3,
                "fillAlphas": 0,
                "lineAlpha": 1,
                "title": "PCB & Compactor",
                "valueField": "cumulatedWH2",
                "dashLengthField": "dashLengthLine"
            },
            {
                "id": "graph3",
                "valueAxis": "v2",
                "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
                "bullet": "round",
                "lineThickness": 2,
                "bulletSize": 2,
                "bulletBorderAlpha": 1,
                "bulletColor": "#FFFFFF",
                "useLineColorForBulletBorder": true,
                "bulletBorderThickness": 3,
                "fillAlphas": 0,
                "lineAlpha": 1,
                "title": "Pi & Router",
                "valueField": "cumulatedWH3",
                "dashLengthField": "dashLengthLine"
            }],
            "chartCursor": {
              "categoryBalloonEnabled": false,
              "cursorAlpha": 0,
              "zoomable": false
            },
            "categoryField": "measurement_taken_date_hour",
            "categoryAxis": {
              "gridPosition": "start",
              "gridAlpha": 0,
              "tickPosition": "start",
              "tickLength": 20
            },
            "export": {
              "enabled": true
            },
            "legend": {
                "useGraphSettings": true
            }

          } );
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
    var hwl = [];
    $http(weatherHistoricalRequest).then(function(res){
        $scope.weatherHistoricalList = res.data.list;
        hwl = res.data.list;
        console.log(res.data.list);
    }, function(){
        
    });
    
    
    //recommendation of operational windows
    var operationalChart = AmCharts.makeChart("chartdivOperationalWindows", {
	"theme": "light",
        "type": "serial",
        "dataProvider": [{
            "name": "Pi & Router",
            "startTime": 11,
            "endTime": 7,
            "color": "#FF0F00"
        }, {
            "name": "PCB & Compactor",
            "startTime": 5,
            "endTime": 24,
            "color": "#FF9E01"
        }],
        "valueAxes": [{
            "axisAlpha": 0,
            "gridAlpha": 0.1
        }],
        "startDuration": 0.5,
        "graphs": [{
            "balloonText": "<b>[[category]]</b><br>starts at [[startTime]]<br>ends at [[endTime]]",
            "colorField": "color",
            "fillAlphas": 0.8,
            "lineAlpha": 0,
            "openField": "startTime",
            "type": "column",
            "valueField": "endTime"
        }],
        "rotate": true,
        "columnWidth": 1,
        "categoryField": "name",
        "categoryAxis": {
            "gridPosition": "start",
            "axisAlpha": 0,
            "gridAlpha": 0.1,
            "position": "left",
            "minimum" : 0,
            "maximum" : 23
        },
        "export": {
            "enabled": true
         }
    });
    
}]);
