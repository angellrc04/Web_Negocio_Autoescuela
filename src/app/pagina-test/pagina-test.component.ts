import { Component } from '@angular/core';
import { DbService } from '../db.service';
import { Router } from '@angular/router';
import { TestResult, PreguntaFallada } from '../models/test-result.model';

@Component({
  selector: 'app-pagina-test',
  templateUrl: './pagina-test.component.html',
  styleUrls: ['./pagina-test.component.css']
})
export class PaginaTestComponent {
  constructor(private dbService: DbService, private router: Router) { }


  enviarTest(event: Event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    // Definir las preguntas y respuestas correctas para el test fácil
    const preguntas = [
      { enunciado: '¿Cuál de las siguientes luces te obliga a detenerte?', respuestaCorrecta: 'a1' },
      { enunciado: '¿Cuál es la tasa más segura de alcohol en aire para conducir?', respuestaCorrecta: 'a2' },
      { enunciado: '¿Cuál es la distancia mínima lateral que hay que dejar cuando rebase un ciclista?', respuestaCorrecta: 'b3' },
      { enunciado: '¿Qué me indica esta señal?', respuestaCorrecta: 'a4' },
      { enunciado: '¿Qué vehículo pasará en primer lugar?', respuestaCorrecta: 'b5' },
      { enunciado: '¿Qué significa esta señal?', respuestaCorrecta: 'b6' },
      { enunciado: '¿Qué es el ABS?', respuestaCorrecta: 'a7' },
      { enunciado: '¿Qué se debe hacer al aproximarse a un paso de peatones?', respuestaCorrecta: 'a8' },
      { enunciado: '¿Qué indica esta señal de tráfico?', respuestaCorrecta: 'a9' },
      { enunciado: '¿Que permiso es necesario para poder conducir un turismo?', respuestaCorrecta: 'c10' },
    ];

    // Obtener las respuestas seleccionadas por el usuario
    const selectedAnswers: string[] = [];
    for (let i = 1; i <= preguntas.length; i++) {
      const pregunta = `pregunta${i}`;
      const selectedAnswer = (document.querySelector(`input[name="${pregunta}"]:checked`) as HTMLInputElement)?.value || '';
      selectedAnswers.push(selectedAnswer);
    }

    // Crear un objeto TestResult con las respuestas del test fácil
    const resultados: TestResult = {
      selectedAnswers: selectedAnswers,
      testType: 'facil',
      score: this.calcularPuntuacion(preguntas, selectedAnswers), // Calcular la puntuación
      date: new Date().toLocaleString('es-ES'),
      preguntasFalladas: this.calcularPreguntasFalladas(preguntas, selectedAnswers)
    };

    // Llamar a una función para guardar los resultados
    this.guardarResultados(resultados);

    // Navegar al componente de resultados
    this.router.navigate(['/PaginaPreguntasRespuestasComponent']);
  }

  // Método para guardar los resultados del test en la base de datos
  guardarResultados(resultados: TestResult) {
    // Guardar los resultados en la base de datos Dexie utilizando el servicio DbService
    this.dbService.saveTestResults(resultados, 'facil').subscribe(() => {
      // Acción adicional después de guardar los resultados
      console.log('Resultados del test guardados correctamente en la base de datos.');
      // Por ejemplo, mostrar un mensaje de éxito
      alert('Resultados del test guardados correctamente.');
    }, error => {
      // Manejar errores en caso de que falle la operación de guardado
      console.error('Error al guardar los resultados del test:', error);
      // Por ejemplo, mostrar un mensaje de error
      alert('Error al guardar los resultados del test. Por favor, inténtalo de nuevo.');
    });
  }

  // Método para calcular la puntuación del test fácil
  private calcularPuntuacion(preguntas: { enunciado: string, respuestaCorrecta: string }[], selectedAnswers: string[]): number {
    let score = 0;
    for (let i = 0; i < selectedAnswers.length; i++) {
      if (selectedAnswers[i] === preguntas[i].respuestaCorrecta) {
        score++;
      }
    }
    return score;
  }

  // Método para calcular las preguntas falladas del test fácil
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
