import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportTable } from './transport-table';

describe('TransportTable', () => {
  let component: TransportTable;
  let fixture: ComponentFixture<TransportTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransportTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
