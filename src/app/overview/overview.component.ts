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
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#181818"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8a8a8a"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#373737"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3c3c3c"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
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
      for(let district of this.candidateBallotCounts$[this.location.replace(/ /g,'')]) {
        if(this.selected.localeCompare(district.district) == 0) {
          for(let key in district.candidates) {
            this.candidateCount.push(district.candidates[key].votes);
            this.barChartLabels1.push(district.candidates[key].name);
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
