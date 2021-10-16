import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit, OnChanges {

  @Input() stateList: any = [];
  @Input() correctState: string = "";
  @Input() correctAnswer: string = "";
  @Input() isNewGame: boolean = false;
  stateMap = new Map();
  statusMap = new Map<string, status>();
  status = new status(0, 0);
  bkpStateList: any = [];

  displayedColumns: string[] = ["name", "accuracy"];

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {

    if (this.bkpStateList.length == 0 || this.isNewGame) {
      this.bkpStateList = [...this.stateList];
    }

    if (this.stateMap.size == 0) {
      let i = 0;
      this.bkpStateList.forEach((element: any) => {
        this.stateMap.set(element.name, i++);
      });
    }

    if (this.isNewGame) {
      this.statusMap.clear();
    } else {
      if (this.correctState != "") {
        let existingStatus = this.statusMap.get(this.correctState);

        if (existingStatus != null) {
          existingStatus.addOneQuestion();
          if (this.isAnswerCorrect()) {
            existingStatus.addOneCorrect();
          }
          this.statusMap.set(this.correctState, existingStatus);
        } else {
          let newStatus = new status(1, 0);
          if (this.isAnswerCorrect()) {
            newStatus.addOneCorrect();
          }
          this.statusMap.set(this.correctState, newStatus);
        }

        for (const [key, value] of this.statusMap) {
          const index = this.stateMap.get(key);
          this.bkpStateList[index].accuracy = (value.noOfCorrect / value.noOfQuestion) * 100;
        }
      }
    }
  }

  isAnswerCorrect(): boolean {
    return this.correctAnswer == this.correctState;
  }

}

class status {
  noOfQuestion: number;
  noOfCorrect: number;

  constructor(noq: number, noc: number) {
    this.noOfQuestion = noq;
    this.noOfCorrect = noc;
  }

  addOneCorrect() {
    this.noOfCorrect++;
  }

  addOneQuestion() {
    this.noOfQuestion++;
  }
}
