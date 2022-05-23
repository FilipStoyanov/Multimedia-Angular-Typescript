import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendPreferencesComponent } from './friend-preferences.component';

describe('FriendPreferencesComponent', () => {
  let component: FriendPreferencesComponent;
  let fixture: ComponentFixture<FriendPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendPreferencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
