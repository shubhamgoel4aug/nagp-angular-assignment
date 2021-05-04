import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

import {Pipe, PipeTransform} from '@angular/core';
import { By } from "@angular/platform-browser";

@Pipe({name: 'translate'})
class MockPipe implements PipeTransform {
    transform(value: any): any {
        //Do stuff here, if you want
        return "Here Shopping Begins";
    }
}

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent, MockPipe ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have tagline', () => {
    let tagline = "Here Shopping Begins";
    let footerTagline = fixture.debugElement.query(By.css("#tagline"));
    expect(footerTagline.nativeElement.textContent).toContain(tagline);
  });
});
