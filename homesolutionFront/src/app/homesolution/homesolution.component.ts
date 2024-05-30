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
   
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }
}