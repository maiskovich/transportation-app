/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { ClockService } from '../app/components/clock/clock.service';
import { TransportDataService } from '../app/components/transportData/transportData.service';
import { TransportCalculationService } from '../app/components/transportCalculation/transportCalculation.service';
import { ServiceWorkerService } from '../app/components/serviceWorker/serviceWorker.service';
import { TripsdisplayDirective } from '../app/components/tripsdisplay/tripsdisplay.directive';

angular.module('transportationApp', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ngMaterial', 'toastr', 'scDateTime'])
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('clock', ClockService)
  .service('transportData', TransportDataService)
  .service('transportCalculation', TransportCalculationService)
  .service('serviceWorker', ServiceWorkerService)
  .filter('asDate', function () {
    return function (input) {
      input=input.split(':');
      input[0]=(input[0] > 23) ? input[0]-24 : input[0];
      return new Date('1/1/2016 '+input[0]+':'+input[1]+':'+input[2]);
    }
  })
  .controller('MainController', MainController)
  .directive('tripsDisplay', TripsdisplayDirective)
