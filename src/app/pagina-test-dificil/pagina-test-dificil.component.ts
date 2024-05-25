import { Component } from '@angular/core';
import { DbService } from '../db.service';
import { Router } from '@angular/router';
import { TestResult, PreguntaFallada } from '../models/test-result.model';

@Component({
  selector: 'app-pagina-test-dificil',
  templateUrl: './pagina-test-dificil.component.html',
  styleUrls: ['./pagina-test-dificil.component.css']
})
export class PaginaTestDificilComponent {
  constructor(private dbService: DbService, private router: Router) { }

  enviarTest(event: Event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    // Definir las preguntas y respuestas correctas para el test medio
    const preguntas = [
      { enunciado: '¿Qué indica una señal circular con una flecha en dirección hacia arriba?', respuestaCorrecta: 'c21' },
      { enunciado: '¿Cuál es la sanción por circular con una tasa de alcohol en sangre superior a la permitida?', respuestaCorrecta: 'c22' },
      { enunciado: '¿Cuál es la función principal de un diferencial en un vehículo?', respuestaCorrecta: 'a23' },
      { enunciado: '¿Qué se debe hacer si se aproxima un vehículo de emergencia con luces y sirenas encendidas?', respuestaCorrecta: 'b24' },
      { enunciado: '¿Qué distancia de seguridad se debe mantener con el vehículo que nos precede en una autovía?', respuestaCorrecta: 'b25' },
      { enunciado: '¿Qué es el efecto Venturi y cómo puede afectar al rendimiento de un vehículo?', respuestaCorrecta: 'a26' },
      { enunciado: '¿Qué significa una señal de tráfico triangular con el vértice hacia abajo?', respuestaCorrecta: 'a27' },
      { enunciado: '¿Cuál es la velocidad máxima permitida en una vía urbana?', respuestaCorrecta: 'a28' },
      { enunciado: '¿Qué indica una señal de tráfico con una franja horizontal roja sobre fondo blanco?', respuestaCorrecta: 'a29' },
      { enunciado: '¿Qué factores pueden afectar significativamente la distancia de frenado de un vehículo?', respuestaCorrecta: 'a30' },
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
      testType: 'dificil',
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
    this.dbService.saveTestResults(resultados, 'dificil').subscribe(() => {
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

