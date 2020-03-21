import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-errormessage',
  templateUrl: './errormessage.component.html',
  styleUrls: ['./errormessage.component.css']
})
export class ErrormessageComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }

  ngOnInit(): void {
  }

}
