import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-homesolution',
  templateUrl: './homesolution.component.html',
  styleUrls: ['./homesolution.component.css']
})
export class HomesolutionComponent implements OnInit {
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    const idiomaActual = localStorage.getItem('idioma') || 'es';
    this.translate.setDefaultLang(idiomaActual);
    this.translate.use(idiomaActual);
  }
}
