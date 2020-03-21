import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DochallengeComponent } from './challenge.component';

describe('DochallengeComponent', () => {
  let component: DochallengeComponent;
  let fixture: ComponentFixture<DochallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DochallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DochallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
