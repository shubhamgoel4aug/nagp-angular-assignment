import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject = new Subject<any>();

  constructor() { }

  changeLanguage(language: string) {
    this.languageSubject.next({language: language});
  }

  getLanguage(): Observable<any>{
    return this.languageSubject.asObservable();
  }
}
