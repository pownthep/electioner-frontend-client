import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit, OnChanges {
  public candidates$;
  public party$;
  public selected = '';

  constructor(private data: DataService) { }

  onSelect() {
    //console.log(this.selected['name']);
    this.data.getRepByParty(this.selected['name']).subscribe(
      data => {
        this.candidates$ = data;
        console.log(data);
      },
      err => {this.candidates$ = {}}
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.selected);
    // changes.prop contains the old and the new value...
  }

  ngOnInit() {
    this.data.getParties().subscribe(
      data => {
        this.party$ = data;
      },
      err => {
        console.log(err);
      }
    );
  }

}
