import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {
  public candidates$;
  value = '';
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getRep("1","").subscribe(
      data => {
        this.candidates$ = data; console.log(this.candidates$);
        console.log(this.candidates$);
      },
      err => {this.candidates$ = {}}
    )
  }

}
