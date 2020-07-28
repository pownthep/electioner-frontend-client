import { Component } from "@angular/core";
import { DataService } from "../services/data.service";

@Component({
  selector: "app-candidates",
  templateUrl: "./candidates.component.html",
  styleUrls: ["./candidates.component.scss"],
})
export class CandidatesComponent {
  candidates$: any = [];
  parties$: any = [];

  constructor(private data: DataService) {
    this.data.getParties().subscribe(
      (data) => this.parties$ = data,
      (err) => {}
    );
    this.data.getReps().subscribe(
      (data) => this.candidates$ = data,
      (err) => {}
    );
  }
}
