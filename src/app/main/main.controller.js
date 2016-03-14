export class MainController {
  constructor (clock,$scope) {
    'ngInject';
    $scope.clock= {Time: 0};
    clock.getHour($scope.clock);
  }


}
