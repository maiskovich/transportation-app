describe('service clock', () => {
  beforeEach(angular.mock.module('transportationApp'));


  it('should be registered', inject(clock => {
    expect(clock).not.toEqual(null);
  }));


  describe('getHour function', () => {
    it('should exist', inject(clock => {
      expect(clock.getHour).not.toEqual(null);
    }));

    it('should get time on data', inject((clock) => {
      let data= {Time: 0};
      clock.getHour(data);
      expect(Math.floor(data.Time / 1000)).toEqual(Math.floor(Date.now() / 1000));
    }));
  });
});
