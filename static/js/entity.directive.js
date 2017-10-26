(function() {
  'use strict';

  angular.module('ClimateAdaptationAndMitigation.demo')
    .directive('ClimateAdaptationAndMitigationEntity', EntityDirective);

    function EntityDirective() {
      return {
        templateUrl: '/html/entity.html',
        restrict: 'E' //use as an html "element"
      };
    }

})();
