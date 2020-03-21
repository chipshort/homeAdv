import { Component, OnInit } from '@angular/core';
import { challenge } from './challenge';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  challenge = challenge;
  constructor() { }

  ngOnInit(): void {
  }

}
