export interface TestResult {
  selectedAnswers: string[];
  score: number;
  date: string;
  preguntasFalladas: PreguntaFallada[];
  testType: string;
}

export interface PreguntaFallada {
  enunciado: string;
  respuestaCorrecta: string;
  respuestaUsuario: string;
}

