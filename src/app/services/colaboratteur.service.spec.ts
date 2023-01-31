import { TestBed } from '@angular/core/testing';

import { ColaboratteurService } from './colaboratteur.service';

describe('ColaboratteurService', () => {
  let service: ColaboratteurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColaboratteurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
