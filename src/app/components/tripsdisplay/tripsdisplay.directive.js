export function TripsdisplayDirective() {
  'ngInject';
  //Directive to show the possible trips that have been found
  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/tripsdisplay/tripsdisplay.html'
  };

  return directive;
}
