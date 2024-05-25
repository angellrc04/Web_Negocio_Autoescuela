import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagina-inicio',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['../../styles.css']
})
export class PaginaInicioComponent {
  authRedirect = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.authRedirect = params['authRedirect'] === 'true';
    });
  }
}
