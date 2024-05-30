import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-urgencias',
  templateUrl: './urgencias.component.html',
  styleUrls: ['./urgencias.component.css']
})
export class UrgenciasComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    
    const ruta = localStorage.getItem('navegarA');
    if (ruta) {
      localStorage.removeItem('navegarA'); 
      this.router.navigateByUrl(ruta); 
    }
  }

  recargarYnavegar(ruta: string) {
    localStorage.setItem('navegarA', ruta); 
    window.location.reload(); 
  }
}
