import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  scoreSubject = new BehaviorSubject<number>(0);

  constructor() { }

  setScore(score: number) {
    this.scoreSubject.next(score);
  }
}
