import { Component } from '@angular/core';
import { DbService } from '../db.service';
import { Router } from '@angular/router';
import { TestResult, PreguntaFallada } from '../models/test-result.model';

@Component({
  selector: 'app-pagina-test-medio',
  templateUrl: './pagina-test-medio.component.html',
  styleUrls: ['./pagina-test-medio.component.css']
})
export class PaginaTestMedioComponent {
  constructor(private dbService: DbService, private router: Router) { }

  enviarTest(event: Event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    // Definir las preguntas y respuestas correctas para el test medio
    const preguntas = [
      { enunciado: '¿Qué significa una señal triangular con un borde rojo y una figura de ciervo en el centro?', respuestaCorrecta: 'a11' },
      { enunciado: '¿Qué debes hacer si tu coche comienza a derrapar en una curva?', respuestaCorrecta: 'a12' },
      { enunciado: '¿Qué significa una luz amarilla intermitente en un semáforo?', respuestaCorrecta: 'b13' },
      { enunciado: '¿Cuál es la forma correcta de adelantar a otro vehículo en carretera?', respuestaCorrecta: 'b14' },
      { enunciado: '¿Qué indica una línea amarilla discontinua en el borde de la calzada?', respuestaCorrecta: 'a15' },
      { enunciado: '¿Cómo se debe reaccionar ante una señal de STOP?', respuestaCorrecta: 'b16' },
      { enunciado: '¿Cuál es la distancia de seguridad mínima recomendada entre vehículos en una carretera?', respuestaCorrecta: 'b17' },
      { enunciado: '¿Qué significa una señal de límite de velocidad con el número 50?', respuestaCorrecta: 'b18' },
      { enunciado: '¿Qué debes hacer si te acercas a una intersección sin señales y hay otro vehículo a tu derecha?', respuestaCorrecta: 'a19' },
      { enunciado: '¿Qué es el aquaplaning?', respuestaCorrecta: 'b20' },
    ];

    // Obtener las respuestas seleccionadas por el usuario
    const selectedAnswers: string[] = [];
    for (let i = 1; i <= preguntas.length; i++) {
      const pregunta = `pregunta${i}`;
      const selectedAnswer = (document.querySelector(`input[name="${pregunta}"]:checked`) as HTMLInputElement)?.value || '';
      selectedAnswers.push(selectedAnswer);
    }
    console.log('Respuestas seleccionadas:', selectedAnswers);


    // Crear un objeto TestResult con las respuestas del test medio
    const resultados: TestResult = {
      selectedAnswers: selectedAnswers,
      testType: 'medio',
      score: this.calcularPuntuacion(preguntas, selectedAnswers), // Calcular la puntuación
      date: new Date().toLocaleString('es-ES'),
      preguntasFalladas: this.calcularPreguntasFalladas(preguntas, selectedAnswers)
    };

    // Llamar a una función para guardar los resultados
    this.guardarResultados(resultados);

    // Navegar al componente de resultados
    this.router.navigate(['/PaginaPreguntasRespuestasComponent']);
  }

  // Método para guardar los resultados del test medio
  guardarResultados(resultados: TestResult) {
    // Guardar los resultados en la base de datos Dexie utilizando el servicio DbService
    this.dbService.saveTestResults(resultados, 'medio').subscribe(() => {
      // Acción adicional después de guardar los resultados
      console.log('Resultados del test guardados correctamente en la base de datos.');
      // Por ejemplo, mostrar un mensaje de éxito
      alert('Resultados del test guardados correctamente.');
    }, error => {
      // Manejar errores en caso de    // Manejar errores en caso de que falle la operación de guardado
      console.error('Error al guardar los resultados del test:', error);
      // Por ejemplo, mostrar un mensaje de error
      alert('Error al guardar los resultados del test. Por favor, inténtalo de nuevo.');
    });
  }

  // Método para calcular la puntuación del test medio
  private calcularPuntuacion(preguntas: { enunciado: string, respuestaCorrecta: string }[], selectedAnswers: string[]): number {
    let score = 0;
    for (let i = 0; i < selectedAnswers.length; i++) {
      console.log('Respuesta seleccionada:', selectedAnswers[i]);
      console.log('Respuesta correcta:', preguntas[i].respuestaCorrecta);
      if (selectedAnswers[i] === preguntas[i].respuestaCorrecta) {
        score++; // Incrementar la puntuación si la respuesta seleccionada es correcta
      }
    }
    return score;
  }




  // Método para calcular las preguntas falladas del test medio
  private calcularPreguntasFalladas(preguntas: { enunciado: string, respuestaCorrecta: string }[], selectedAnswers: string[]): PreguntaFallada[] {
    const preguntasFalladas: PreguntaFallada[] = [];

    for (let i = 0; i < preguntas.length; i++) {
      if (preguntas[i].respuestaCorrecta !== selectedAnswers[i]) {
        preguntasFalladas.push({
          enunciado: preguntas[i].enunciado,
          respuestaCorrecta: preguntas[i].respuestaCorrecta,
          respuestaUsuario: selectedAnswers[i]
        });
      }
    }

    return preguntasFalladas;
  }
}

