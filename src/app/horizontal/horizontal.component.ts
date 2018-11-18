import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-horizontal',
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.scss']
})
export class HorizontalComponent implements OnInit {
  candidateBallotCounts$;
  partyBallotCounts$;
  public barChartLabels1 = [];
  public barChartLabels2 = [];
  public candidateCount = [];
  public partyCount = [];
  public pieChartType = 'pie';
  constructor(private data: DataService) { 
    this.data.getResult().subscribe(
      data => {
        this.candidateBallotCounts$ = data[0];
        this.partyBallotCounts$ = data[1];
        for (var key in this.candidateBallotCounts$) {
          if (this.candidateBallotCounts$.hasOwnProperty(key)) {
            this.barChartLabels1.push(key.toString());
            this.candidateCount.push(this.candidateBallotCounts$[key]);
          }
        }
        for (var key in this.partyBallotCounts$) {
          if (this.partyBallotCounts$.hasOwnProperty(key)) {
            this.barChartLabels2.push(key.toString());
            this.partyCount.push(this.partyBallotCounts$[key]);
          }
        }
      },
      err => this.candidateBallotCounts$ = {}
    )
  }

  public barChartOptions1 = {
    scaleShowVerticalLines: false,
    responsive: true,
    title: {
      display: true
    }
  };
  public barChartOptions2 = {
    scaleShowVerticalLines: false,
    responsive: true,
    title: {
      display: true,
      text: 'Party '
    }
  };
  public barChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartData1 = [
    {data: this.candidateCount, label: 'Ballot counts'}
  ];
  public pieChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    title: {
      display: true,
      text: 'Party ratio'
    }
  };
  public barChartData2 = this.partyCount;
  ngOnInit() {

  }

}
