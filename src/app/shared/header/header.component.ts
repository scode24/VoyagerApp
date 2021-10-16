import { Component, OnInit } from '@angular/core';
import { ScoreService } from 'src/app/services/score.service';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string = "";
  score: number = 0;

  constructor(private scoreService: ScoreService) { }

  ngOnInit(): void {
    this.title = environment.title;

    this.scoreService.scoreSubject.subscribe(score => {
      this.score = score;
    })
  }

}
