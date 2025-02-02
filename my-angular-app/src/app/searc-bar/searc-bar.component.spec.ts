import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearcBarComponent } from './searc-bar.component';

describe('SearcBarComponent', () => {
  let component: SearcBarComponent;
  let fixture: ComponentFixture<SearcBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearcBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearcBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
