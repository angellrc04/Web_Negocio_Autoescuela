import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DbService } from '../db.service';
import { TestResult } from '../models/test-result.model';

@Component({
  selector: 'app-pagina-preguntas-respuestas',
  templateUrl: './pagina-preguntas-respuestas.component.html',
  styleUrls: ['./pagina-preguntas-respuestas.component.css']
})
export class PaginaPreguntasRespuestasComponent implements OnInit {
  testResults$!: Observable<TestResult[]>;

  constructor(private dbService: DbService) { }

  ngOnInit(): void {
    this.testResults$ = this.dbService.getTestResults();
  }
}
