import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DogSearchPage } from './dog-search.page';

describe('DogSearchPage', () => {
  let component: DogSearchPage;
  let fixture: ComponentFixture<DogSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DogSearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DogSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
