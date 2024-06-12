import { Component } from '@angular/core';

@Component({
  selector: 'app-pladur',
  templateUrl: './pladur.component.html',
  styleUrls: ['./pladur.component.css']
})
export class PladurComponent {
  goBack() {
    window.history.back();
}
}
