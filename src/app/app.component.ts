import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LanguageService } from './core/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shoptrox';
  private subscriptionName: Subscription;

  constructor(private router: Router, public translate: TranslateService, private languageService: LanguageService){
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');
    let l = localStorage.getItem("language");
    if(l != null || l != undefined)
      translate.use(l);
    else {
      translate.use('en');
      localStorage.setItem("language", 'en');
    }
    this.subscriptionName = this.languageService.getLanguage().subscribe(x => {
      translate.use(x.language);
      localStorage.setItem("language", x.language);
    })
  }

  ngOnInit() {
  }

  navigateLogin() {
  }
}
