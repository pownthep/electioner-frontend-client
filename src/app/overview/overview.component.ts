import { Component } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
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
    { data: this.candidateCount, label: 'Ballot counts' }
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
        this.candidateBallotCounts$ = data;
      },
      err => this.candidateBallotCounts$ = []
    );
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  async getData() {
    return this.data.getResult();
  }

  mapClicked($event: MouseEvent) {
    this.candidateCount.length = 0;
    this.barChartLabels1.length = 0;
    this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + $event.coords.lat + "," + $event.coords.lng + "&key=" + 'AIzaSyAv1WgLGclLIlhKvzIiIVOiqZqDA0EM9TI').subscribe(
      data => {
        console.log(data);
        this.location = data;
        this.districts = [];
        if (this.location.plus_code.compound_code.split(',').length < 4) {
          this.location = 'Bangkok';
          this.districts = this.candidateBallotCounts$.filter(candidate => candidate.district.split(' ')[0] === this.location.replace(/ +/g, ""));
        }
        else {
          this.location = this.location.plus_code.compound_code.split(',')[2];
          this.districts = this.candidateBallotCounts$.filter(candidate => candidate.district.split(' ')[0] === this.location.replace(/ +/g, ""));
        }
      },
      err => { console.log(err) }
    );
    let tmp: marker = {
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
    this.barChartLabels2.length = 0;
    this.barChartData2.length = 0;
    let tmp = {};
    this.districts.forEach(rep => {
      if (rep.district === this.selected) {
        this.candidateCount.push(rep.votes);
        this.barChartLabels1.push(`${rep.fname} ${rep.lname}`);
        tmp[rep.party] = tmp[rep.party] ? tmp[rep.party] + rep.votes : rep.votes;
      }
    });
    for (const key in tmp) {
      this.barChartLabels2.push(key);
      this.barChartData2.push(tmp[key]);
    }

    this.barChartData1 = [
      { data: this.candidateCount, label: 'Ballot counts' }
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
