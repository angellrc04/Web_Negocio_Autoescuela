import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AuthModule } from '@auth0/auth0-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaHorarioPreciosComponent } from './pagina-horario-precios/pagina-horario-precios.component';
import { PaginaConsejosComponent } from './pagina-consejos/pagina-consejos.component';
import { PaginaPreguntasRespuestasComponent } from './pagina-preguntas-respuestas/pagina-preguntas-respuestas.component';
import { PaginaInicioComponent } from './pagina-inicio/pagina-inicio.component';
import { PaginaTestComponent } from './pagina-test/pagina-test.component';
import { PaginaSeleccionTestComponent } from './pagina-seleccion-test/pagina-seleccion-test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Importa RxJS operators
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginaTestMedioComponent } from './pagina-test-medio/pagina-test-medio.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaHorarioPreciosComponent,
    PaginaConsejosComponent,
    PaginaPreguntasRespuestasComponent,
    PaginaInicioComponent,
    PaginaTestComponent,
    PaginaSeleccionTestComponent,
    PaginaTestMedioComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    AuthModule.forRoot({
      domain: 'dev-s6yixmmmt1x088fi.us.auth0.com',
      clientId:'MiBw37ab1ZzWHDNDpdaqDCLOiu0Ro1iw',
      authorizationParams: {
        redirect_uri:window.location.origin
      }

  }),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
