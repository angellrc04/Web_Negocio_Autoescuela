import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaHorarioPreciosComponent } from './pagina-horario-precios/pagina-horario-precios.component';
import { PaginaConsejosComponent } from './pagina-consejos/pagina-consejos.component';
import { PaginaPreguntasRespuestasComponent } from './pagina-preguntas-respuestas/pagina-preguntas-respuestas.component';
import { PaginaInicioComponent } from './pagina-inicio/pagina-inicio.component';
import { PaginaTestComponent } from './pagina-test/pagina-test.component';
import { PaginaSeleccionTestComponent } from './pagina-seleccion-test/pagina-seleccion-test.component';
import { PaginaTestMedioComponent } from './pagina-test-medio/pagina-test-medio.component';
import { PaginaTestDificilComponent } from './pagina-test-dificil/pagina-test-dificil.component';
import { authGuard } from './auth.guard'; // Asegúrate de importar el guard

const routes: Routes = [
  { path: 'PaginaHorarioPreciosComponent', component: PaginaHorarioPreciosComponent },
  { path: 'PaginaConsejosComponent', component: PaginaConsejosComponent},
  { path: 'PaginaPreguntasRespuestasComponent', component: PaginaPreguntasRespuestasComponent, canActivate: [authGuard] },
  { path: 'PaginaInicioComponent', component: PaginaInicioComponent},
  { path: 'PaginaTestComponent', component: PaginaTestComponent},
  { path: 'PaginaTestMedioComponent', component: PaginaTestMedioComponent},
  { path: 'PaginaTestDificilComponent', component: PaginaTestDificilComponent},
  { path: 'PaginaSeleccionTestComponent', component: PaginaSeleccionTestComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/PaginaInicioComponent', pathMatch: 'full' }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
