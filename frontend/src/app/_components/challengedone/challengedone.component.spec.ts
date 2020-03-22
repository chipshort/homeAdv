import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengedoneComponent } from './challengedone.component';

describe('ChallengedoneComponent', () => {
  let component: ChallengedoneComponent;
  let fixture: ComponentFixture<ChallengedoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengedoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengedoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
