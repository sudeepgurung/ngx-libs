/* created by sudeep gurung 23rd July 2023 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ad2BsPipe } from './ad2bs.pipe';
import { NgxMitiService } from './ngx-miti.service';
import { inject } from '@angular/core';

describe('Ad2BsPipe', () => {
  let pipe: Ad2BsPipe;
  let nms: NgxMitiService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [NgxMitiService],
    });
    nms = TestBed.get(NgxMitiService);
    pipe = new Ad2BsPipe(nms);
  });

  it('should return nepali date in english format yyyy-mm-dd', () => {
    const ans = pipe.transform('2024-01-19');
    expect(ans).toMatch(/\d{4}-\d{2}-\d{2}/);
  });

  it('should return nepali date in nepali format yyyy-mm-dd', () => {
    const ans = pipe.transform('2023-07-23', 'ne');
    expect(ans).toBe('२०८०-०४-०७');
  });
});
