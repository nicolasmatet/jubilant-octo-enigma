import {TestBed} from '@angular/core/testing';

import {FinDataService} from './fin-data.service';

describe('FinDataService', () => {
  let service: FinDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get column data', () => {
    const data = [
      ['france', 'pbt', 1],
      ['germany', 'pbt', 10],
      ['france', 'tax', 2],
      ['germany', 'tax', 20]
    ]
    const columnData = service.getColumnData(data, ['tag'], [1], 2);
    expect(columnData).toEqual({tag: ['france', 'germany'], pbt: [1, 10], tax: [2, 20]});
  });

  it('CBC 2019', () => {
    const cbc2019 = service.getData('CBCR 2019');
    expect(cbc2019.length()).toBe(12);
    // expect(cbc2019.line('france')).toEqual({a: 1});
    expect(cbc2019.loc('france', 'Revenue Related Parties')).toBe(423.17);
  });
});
