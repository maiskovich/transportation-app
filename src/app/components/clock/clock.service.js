export class ClockService {
  constructor ($log,$interval) {
    'ngInject';

    this.$log = $log;

    this.$interval=$interval;
  }

  getHour(clock) {
    //recieves a clock variable, assign to ti it actual time
    let tick = function() {
      clock.Time= Date.now();
    }
    tick();
    //Updates the clock every 1 second
    this.$interval(tick, 1000);
  }
}
