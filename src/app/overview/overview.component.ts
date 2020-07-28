import { DataService } from "../services/data.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.scss"],
})
export class OverviewComponent implements OnInit {
  public data;
  public selectedElection;
  public result;

  displayedColumns: string[] = ["url", "name", "party", "district", "votes"];
  dataSource = new MatTableDataSource(this.result);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  constructor(private service: DataService) {
    service.getElections().subscribe(
      (data) => (this.data = data),
      (err) => {}
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectionChange($event) {
    console.log($event);
    this.service.getResult($event).subscribe(
      (data) => {
        this.result = data.map((e) => ({
          url: e.url,
          name: e.fname + " " + e.lname,
          party: e.party,
          district: e.district,
          votes: e.votes,
        }));
        this.dataSource = new MatTableDataSource(this.result);
      },
      (err) => {}
    );
  }
}
