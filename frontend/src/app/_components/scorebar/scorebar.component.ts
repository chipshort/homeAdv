import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scorebar',
  templateUrl: './scorebar.component.html',
  styleUrls: ['./scorebar.component.scss']
})
export class ScorebarComponent implements OnInit {

  // TODO: wuerfelda: Mocked for now.
  public dps = 203;
  public doneCount = 14;
  public ranking = 51;

  constructor() { }

  ngOnInit(): void {
  }

}
