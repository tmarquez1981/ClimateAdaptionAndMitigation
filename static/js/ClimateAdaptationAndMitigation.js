(function(){
    'use strict';
    angular.module('ClimateAdaptationAndMitigation.demo', ['ngRoute'])
    .controller('ClimateAdaptationAndMitigationController', [ '$scope', '$http',
    ClimateAdaptationAndMitigationController ]);

    function ClimateAdaptationAndMitigationController($scope, $http) {
      
        var lat = [];
        var long = [];

        //reads data from csv file and pulls out lat and long
        d3.csv("/static/files/SOAClimateMappingProject_Entities.csv")
          .row(function(d) {
            return {
              lat: +d.Lat,
              long: +d.Lng,
            };
          })
          .get(function(error, csv) {
            if (!error) {
              csv.forEach(function(d,i) {
                console.log("lat", d.lat, "long", d.long)
              });
            } else {

            }
          });

          console.log(lat);

          var svg = d3.select("svg");

          var path = d3.geoPath();

          d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
            if (error) throw error;

            svg.append("g")
                .attr("class", "states")
              .selectAll("path")
              .data(topojson.feature(us, us.objects.states).features)
              .enter().append("path")
                .attr("d", path);

            svg.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));
          });
          /*

          var width = 1100,
          height = 800

          var svg = d3.select("body").append("svg")
              .attr("width", width)
              .attr("height", height);

          var force = d3.layout.force()
            .gravity(.05)
            .distance(150)
            .charge(-100)
            .size([width, height]);
            */

    }

}());
