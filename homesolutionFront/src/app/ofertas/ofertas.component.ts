import { Component, OnInit } from '@angular/core';
import { OfertaService } from '../oferta.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {
  ofertas: any[] = [];
  constructor(private ofertaService: OfertaService) { }
  ngOnInit(): void {
    this.llenarOfertas();
  }

  llenarOfertas(): void {
    this.ofertaService.getOfertas().subscribe(
      oferta => {
        this.ofertas = oferta;
        console.log(this.ofertas);
      },
      error => {
        console.error('Error al obtener las ofertas', error);
      }
    );
  }
}
