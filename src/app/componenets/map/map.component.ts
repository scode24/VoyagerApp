import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ScoreService } from 'src/app/services/score.service';
import { environment } from 'src/environments/environment';

declare let L: any

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  defaultZoomLevel: number = 9;
  map: any;
  stateList: any;
  stateMap = new Map();
  stateQuestionMap = new Map();
  statecorrectStateMap = new Map();
  isInitGame: boolean = true;
  optionList: any = [];
  lastCoordinate: any = null;
  noOfAllowedWrongAttempts = environment.gameConfig.noOfAllowedWrongAttempts;
  noOfAllowedWrongAttemptsBkp = this.noOfAllowedWrongAttempts;

  photoData: any;
  photoUrl: any;
  isImageLoading: boolean = false;
  correctState: string = "";
  score: number = 0;
  isAnswerCorrect: boolean = false;
  answer: string = "";
  lastCorrectState: string = "";
  isNewGame: boolean = false;
  locationNo: number = 1;

  constructor(private httpClient: HttpClient, private changeDetector: ChangeDetectorRef, private scoreService: ScoreService) {
    this.setUpMap();
  }

  ngOnInit(): void {

    this.httpClient.get("../../assets/stateList.json").subscribe(list => {
      this.stateList = list;
      this.setQuestion(this.stateList, true, false);
    });
  }

  setQuestion(stateList: any, isNewGame: boolean, isReloaded: boolean) {
    if (isNewGame) {
      this.score = 0;
      this.scoreService.setScore(this.score);
      this.isNewGame = true;
      this.stateQuestionMap.clear();
      this.statecorrectStateMap.clear();
      this.noOfAllowedWrongAttempts = environment.gameConfig.noOfAllowedWrongAttempts;
      this.setUpMap();
      this.locationNo = 1;
    } else {
      this.isNewGame = false;
      if (!isReloaded) {
        this.locationNo++;
      }
    }

    this.optionList = [];
    const bkpStateList = [...stateList];
    let initCount = 36;

    let index = Math.floor(Math.random() * initCount--);
    this.optionList.push(bkpStateList[index]);
    bkpStateList.splice(index, 1);

    index = Math.floor(Math.random() * initCount--);
    this.optionList.push(bkpStateList[index]);
    bkpStateList.splice(index, 1);

    index = Math.floor(Math.random() * initCount);
    this.optionList.push(bkpStateList[index]);

    index = Math.floor(Math.random() * 3);
    this.lastCorrectState = this.correctState;
    this.correctState = this.optionList[index].name;

    this.changeDetector.detectChanges();

    this.isImageLoading = true;
    this.httpClient.get("https://api.pexels.com/v1/search?query=" + this.correctState + "&per_page=1", {
      "headers": new HttpHeaders({
        Authorization: environment.gameConfig.pixerKey
      })
    }).subscribe(data => {
      this.photoData = data;

      if (this.photoData.length == 0) {
        this.setQuestion(this.stateList, false, false);
      } else {
        this.photoUrl = this.photoData.photos[0].src.landscape
        this.isImageLoading = false;
      }
    });


  }

  setUpMap() {
    navigator.geolocation.getCurrentPosition(position => {

      this.map = L.map('mapid').setView([position.coords.latitude, position.coords.longitude], this.defaultZoomLevel);

      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        'attribution': 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      this.placeMarker({ "lat": position.coords.latitude, "lng": position.coords.longitude }, this.lastCoordinate);
      this.lastCoordinate = { "lat": position.coords.latitude, "lng": position.coords.longitude };
    });
  }

  reloadImage() {
    this.setQuestion(this.stateList, false, true);
  }

  placeMarker(coordinate: any, lastCoordinate: any) {

    const marker = L.marker([coordinate.lat, coordinate.lng]).addTo(this.map);
    // marker.bindPopup("You are here").openPopup();

    if (lastCoordinate != null) {
      const pointA = new L.LatLng(coordinate.lat, coordinate.lng);
      const pointB = new L.LatLng(lastCoordinate.lat, lastCoordinate.lng);
      const pointList = [pointA, pointB];
      const firstpolyline = new L.Polyline(pointList, {
        color: 'blue',
        weight: 1,
        opacity: 0.5,
        smoothFactor: 1
      });
      firstpolyline.addTo(this.map);
    }

    this.map.setView([coordinate.lat, coordinate.lng]);
  }


  checkAnswer(answer: string, coordinate: any) {
    this.answer = answer;
    if (this.answer == this.correctState) {
      alert("Splendid");
      this.placeMarker(coordinate, this.lastCoordinate);
      this.lastCoordinate = coordinate;
      this.noOfAllowedWrongAttempts = environment.gameConfig.noOfAllowedWrongAttempts;
      this.score += environment.gameConfig.scoreIncrementBy;
      this.scoreService.setScore(this.score);

    } else {
      alert("OOPS! Wrong answer");
      this.noOfAllowedWrongAttempts--;
    }
    this.setQuestion(this.stateList, false, false);
  }


}
