import { PaisService } from './../../services/pais.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from "rxjs/operators";
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  paises!: Country[];

  constructor( 
    private activatedRoute: ActivatedRoute, 
    private paisService: PaisService 
    ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe (
        switchMap( (param) => this.paisService.getPaisPorAlpha(param.id) ), 
        tap(console.log)
      )
      .subscribe( paises => { this.paises = paises; })

    // Alternativa sin Rx
    //
    // this.activatedRoute.params
    //   .subscribe( ({id}) => {
    //       console.log("Ver pais:", id);
    //       this.paisService.getPaisPorAlpha(id).subscribe ( pais => {
    //         console.log(pais);
    //       });
    //   })

  }

}
