export class ClockService {
  constructor ($log,$interval) {
    'ngInject';

    this.$log = $log;

    this.$interval=$interval;
  }

  getHour(clock) {
    let tick = function() {
      clock.Time= Date.now();
    }
    tick();
    this.$interval(tick, 1000);
  }
}
