import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactoComponent {

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('es'); 
    this.translate.use('es'); 
  }
}