import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavComponent } from "./nav/nav.component";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { HttpClientModule } from "@angular/common/http";
import { DataService } from "./services/data.service";
import { CandidatesComponent } from "./candidates/candidates.component";
import { OverviewComponent } from "./overview/overview.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { CommonModule } from "@angular/common";
import { MatListModule } from "@angular/material/list";
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    OverviewComponent,
    CandidatesComponent,
  ],
  imports: [
    RouterModule.forRoot([
      { path: "", component: HomeComponent, data: { depth: 1 } },
      { path: "result", component: OverviewComponent, data: { depth: 2 } },
      {
        path: "candidates",
        component: CandidatesComponent,
        data: { depth: 2 },
      },
      {
        path: "**",
        component: HomeComponent,
        data: { depth: 1 },
      },
    ]),
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    HttpClientModule,
    MatMenuModule,
    CommonModule,
    MatListModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
