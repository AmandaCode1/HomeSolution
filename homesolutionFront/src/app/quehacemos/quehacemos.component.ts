import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-quehacemos',
  templateUrl: './quehacemos.component.html',
  styleUrls: ['./quehacemos.component.css']
})
export class QuehacemosComponent implements OnInit {
  data: any[] = [];
  constructor(private servicioService: ServiciosService) { }
  ngOnInit(): void {
    this.llenarData();
  }


  llenarData(): void {
    this.servicioService.getData().subscribe(
      data => {
        this.data = data;
        console.log(this.data);
      },
      error => {
        console.error('Error al obtener los datos', error);
      }
    );
  }
}
