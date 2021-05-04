import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from 'src/app/core/services/cart.service';
import { LanguageService } from 'src/app/core/services/language.service';

import { HeaderComponent } from './header.component';

import {Pipe, PipeTransform} from '@angular/core';
@Pipe({name: 'translate'})
class MockPipe implements PipeTransform {
    transform(value: any): any {
        //Do stuff here, if you want
        return "Here Shopping Begins";
    }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ HeaderComponent, MockPipe ],
      providers: [CartService, LanguageService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change language with nearest call', () => {
    fixture.componentInstance.changeLanguage('de');
    fixture.componentInstance.changeLanguage('en');
    expect(fixture.componentInstance.Language).toEqual('en');
  });
});
