import { Component } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent{ 
  showFiller = false;
  public selected = '';
  public styles = [
    {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [{color: '#c9b2a6'}]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'geometry.stroke',
      stylers: [{color: '#dcd2be'}]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [{color: '#ae9e90'}]
    },
    {
      featureType: 'landscape.natural',
      elementType: 'geometry',
      stylers: [{color: '#dfd2ae'}]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{color: '#dfd2ae'}]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#93817c'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry.fill',
      stylers: [{color: '#a5b076'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#447530'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#f5f1e6'}]
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [{color: '#fdfcf8'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#f8c967'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{color: '#e9bc62'}]
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry',
      stylers: [{color: '#e98d58'}]
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry.stroke',
      stylers: [{color: '#db8555'}]
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [{color: '#806b63'}]
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [{color: '#dfd2ae'}]
    },
    {
      featureType: 'transit.line',
      elementType: 'labels.text.fill',
      stylers: [{color: '#8f7d77'}]
    },
    {
      featureType: 'transit.line',
      elementType: 'labels.text.stroke',
      stylers: [{color: '#ebe3cd'}]
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [{color: '#dfd2ae'}]
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [{color: '#b9d3c2'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#92998d'}]
    }
  ];
  public candidateBallotCounts$;
  public partyBallotCounts$;
  public barChartLabels1 = [];
  public barChartLabels2 = [];
  public candidateCount = [];
  public partyCount = [];
  public pieChartType = 'pie';
  public location;
  public districts;
  public barChartOptions1 = {
    scaleShowVerticalLines: false,
    responsive: true,
    title: {
      display: true
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
  // google maps zoom level
  zoom: number = 6;
  
  // initial center position for the map
  lat: number = 13.7563;
  lng: number = 100.5018;

  constructor(private http: HttpClient, private data: DataService) {
    this.data.getResult().subscribe(
      data => {
        console.log(data);
        this.candidateBallotCounts$ = data[0];
        this.partyBallotCounts$ = data[1];
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

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  mapClicked($event: MouseEvent) {
    this.candidateCount.length = 0;
    this.barChartLabels1.length = 0;
    this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+$event.coords.lat+","+$event.coords.lng+"&key="+'AIzaSyAv1WgLGclLIlhKvzIiIVOiqZqDA0EM9TI').subscribe(
      data => {
        this.location = data;
        this.districts = [];
        if(this.location.plus_code.compound_code.split(',').length < 4) {
          this.location = 'Bangkok';
          if(this.candidateBallotCounts$[this.location]) {
            for(let district of this.candidateBallotCounts$[this.location]) {
              this.districts.push(district.district);
            }
          }
        }
        else {
          this.location = this.location.plus_code.compound_code.split(',')[2];
          if(this.candidateBallotCounts$[this.location.replace(/ /g,'')]) {
            for(let district of this.candidateBallotCounts$[this.location.replace(/ /g,'')]) {
              this.districts.push(district.district);
            }
          }
        }
      },
      err => {console.log(err)}
    );
    let tmp:marker = {
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      label: '',
      draggable: false
    }
    this.markers[0] = tmp;
  }
  onSelect() {
    this.candidateCount.length = 0;
    this.barChartLabels1.length = 0;
    if(this.candidateBallotCounts$[this.location.replace(/ /g,'')]) {
      //console.log(this.candidateBallotCounts$[this.location.replace(/ /g,'')]);
      for(let district of this.candidateBallotCounts$[this.location.replace(/ /g,'')]) {
        if(this.selected.localeCompare(district.district) == 0) {
          for(let candidate in district.candidates) {
            this.candidateCount.push(district.candidates[candidate]);
            this.barChartLabels1.push(candidate);
            //console.log(district.candidates[candidate]);
          }
        }
      }
    }
    this.barChartData1 = [
      {data: this.candidateCount, label: 'Ballot counts'}
    ];
  }
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  
  markers: marker[] = [
	  {
		  lat: 13.7563,
		  lng: 100.5018,
		  label: '',
		  draggable: false
	  }
  ]
}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
