import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DogFormPage } from './dog-form.page';

describe('DogFormPage', () => {
  let component: DogFormPage;
  let fixture: ComponentFixture<DogFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DogFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DogFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
