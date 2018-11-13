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
  public location;
  public result;
  // google maps zoom level
  zoom: number = 6;
  
  // initial center position for the map
  lat: number = 13.7563;
  lng: number = 100.5018;

  constructor(private http: HttpClient, private data: DataService) {
    
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  mapClicked($event: MouseEvent) {
    this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+$event.coords.lat+","+$event.coords.lng+"&key="+'AIzaSyAv1WgLGclLIlhKvzIiIVOiqZqDA0EM9TI').subscribe(
      data => {
        this.location = data;
        this.location = this.location.plus_code.compound_code.split(',')[2];
      },
      err => {console.log(err)}
    );
    this.data.getResult("1").subscribe(
      data => {
        this.result = data;
        console.log(this.result[0]);
      },
      err => this.result = err
    );
    console.log($event.coords.lat);
    console.log($event.coords.lng);
    let tmp:marker = {
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      label: '',
      draggable: false
    }
    this.markers[0] = tmp;
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
