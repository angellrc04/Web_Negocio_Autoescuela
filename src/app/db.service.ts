import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { from, Observable } from 'rxjs';
import { TestResult } from './models/test-result.model'; // Importa el modelo TestResult

@Injectable({
  providedIn: 'root'
})
export class DbService extends Dexie {
  private testResultsTable: Dexie.Table<TestResult, number>; // Nueva tabla para los resultados del test

  constructor() {
    super('MyAppDatabase');

    this.version(1).stores({
      testResults: '++id,selectedAnswers,score,date' // Definición de la tabla para los resultados del test
    });

    this.testResultsTable = this.table('testResults'); // Obtén una referencia a la tabla de resultados del test
  }



  saveTestResults(resultados: TestResult, testType: string): Observable<any> {
    // Calcula la puntuación según las respuestas seleccionadas
    resultados.score = this.calcularPuntuacion(resultados.selectedAnswers, testType);

    // Asigna el tipo de test
    resultados.testType = testType;

    // Formatea la fecha
    resultados.date = this.formatDate(new Date());

    // Guarda los resultados en la base de datos Dexie utilizando el servicio DbService
    return from(this.testResultsTable.add(resultados));
  }


  // Método para obtener los resultados del test desde la base de datos
  getTestResults(): Observable<TestResult[]> {
    return from(this.testResultsTable.toArray());
  }

  // Método para calcular la puntuación del test
  private calcularPuntuacion(selectedAnswers: string[], testType: string): number {
    // Definimos las respuestas correctas y su puntuación asociada según el tipo de test
    let respuestasCorrectas: string[] = [];

    switch (testType) {
      case 'facil':
        respuestasCorrectas = ['a1', 'a2', 'b3', 'a4', 'b5', 'b6', 'a7', 'a8', 'a9', 'c10'];
        break;
      case 'medio':
        respuestasCorrectas = ['a11', 'a12', 'b13', 'b14', 'a15', 'b16', 'b17', 'b18', 'a19', 'b20'];
        break;
      case 'dificil':
        // Define las respuestas para el test difícil
        respuestasCorrectas = ['c21', 'c22', 'a23', 'b24', 'b25', 'a26', 'a27', 'a28', 'a29', 'a30'];
        break;
      default:
        respuestasCorrectas = [];
    }

    // Inicializamos la puntuación en cero
    let score = 0;

    // Iteramos sobre las respuestas seleccionadas por el usuario
    for (let i = 0; i < selectedAnswers.length; i++) {
      const respuestaUsuario = selectedAnswers[i];
      const respuestaCorrecta = respuestasCorrectas[i];

      // Comparamos la respuesta del usuario con la respuesta correcta
      if (respuestaUsuario === respuestaCorrecta) {
        // Si son iguales, incrementamos la puntuación
        score++;
      }
    }

    // Retornamos la puntuación obtenida
    return score;
  }


  // Método para formatear la fecha en el formato deseado
  private formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };

    return date.toLocaleDateString('es-ES', options);
  }

}
