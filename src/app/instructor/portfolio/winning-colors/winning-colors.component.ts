import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-winning-colors',
  templateUrl: './winning-colors.component.html',
  styleUrls: ['./winning-colors.component.css']
})
export class WinningColorsComponent implements OnInit {

  winningColorsForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.winningColorsForm = new FormGroup({
      A: new FormGroup({
        A1: new FormControl('0'),
        A2: new FormControl('0'),
        A3: new FormControl('0'),
        A4: new FormControl('0'),
        A5: new FormControl('0')
      }),
      B: new FormGroup({
        B1: new FormControl('0'),
        B2: new FormControl('0'),
        B3: new FormControl('0'),
        B4: new FormControl('0'),
        B5: new FormControl('0')
      }),
      C: new FormGroup({
        C1: new FormControl('0'),
        C2: new FormControl('0'),
        C3: new FormControl('0'),
        C4: new FormControl('0'),
        C5: new FormControl('0')
      }),
      D: new FormGroup({
        D1: new FormControl('0'),
        D2: new FormControl('0'),
        D3: new FormControl('0'),
        D4: new FormControl('0'),
        D5: new FormControl('0')
      })
    });
  }

}
