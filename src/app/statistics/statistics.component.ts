import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from '../services/data.service';
export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  foods: Food[] = [
    {value: 'steak-0', viewValue: '01'},
    {value: 'pizza-1', viewValue: '02'},
    {value: 'tacos-2', viewValue: '03'}
  ];
  candidateBallotCounts$;
  partyBallotCounts$;
  public barChartLabels1 = [];
  public barChartLabels2 = [];
  public candidateCount = [];
  public partyCount = [];
  constructor(private data: DataService) { 
    this.data.getResult("01").subscribe(
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
        console.log(this.barChartLabels1);
        console.log(this.barChartLabels2);
      },
      err => this.candidateBallotCounts$ = {}
    )
  }

  public barChartOptions1 = {
    scaleShowVerticalLines: false,
    responsive: true,
    title: {
      display: true,
      text: 'Candidates'
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
    {data: this.candidateCount, label: 'Ballot counts',  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"]}
  ];
  public barChartData2 = [
    {data: this.partyCount, label: 'Ballot counts'}
  ];
  ngOnInit() {

  }

}
