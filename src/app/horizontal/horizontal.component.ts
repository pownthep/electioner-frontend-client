import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-horizontal',
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.scss']
})
export class HorizontalComponent implements OnInit {
  ballotCounts$;
  public barChartLabels = [];
  public count = [];
  constructor(private data: DataService) { 
    this.data.getResult("01").subscribe(
      data => {
        console.log(data);
        this.ballotCounts$ = data[0];
        for (var key in this.ballotCounts$) {
          if (this.ballotCounts$.hasOwnProperty(key)) {
            console.log(key);
            this.barChartLabels.push(key.toString());
            this.count.push(this.ballotCounts$[key]);
          }
        }

      },
      err => this.ballotCounts$ = {}
    )
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    title: {
      display: true,
      text: 'Candidates in distance '
    }
  };
  public barChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartData = [
    {data: this.count, label: 'Ballot counts'}
  ];
  ngOnInit() {

  }

}
