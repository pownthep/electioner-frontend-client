import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatFormField, MatInputModule, MatNativeDateModule, MatGridListModule, MatMenuModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VoteComponent } from './vote/vote.component';
import { ResultComponent } from './result/result.component';
import { DataService } from './services/data.service';
import { MatCardModule } from '@angular/material/card';
import { LoaderComponent } from './loader/loader.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ChartsModule } from 'ng2-charts';
import { HorizontalComponent } from './horizontal/horizontal.component';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { PiechartComponent } from './piechart/piechart.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { CandidatesComponent } from './candidates/candidates.component';
import { AgmCoreModule } from '@agm/core';
import { OverviewComponent } from './overview/overview.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    VoteComponent,
    ResultComponent,
    LoaderComponent,
    StatisticsComponent,
    HorizontalComponent,
    DoughnutComponent,
    PiechartComponent,
    OverviewComponent,
    TestComponent,
    CandidatesComponent,
  ],
  imports: [
    RouterModule.forRoot([
      { path: '', component: HomeComponent, data: {depth: 1}},
      { path: 'login', component: LoginComponent, data: {depth: 2}},
      { path: 'vote', component: VoteComponent, data: {depth: 3}},
      { path: 'result', component: StatisticsComponent, data: {depth: 2}},
      { path: 'candidates', component: CandidatesComponent, data: {depth: 2}},
      {
        path: '**',
        component: LoginComponent, data: {depth: 2}
      }
    ]),
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatCardModule,
    ChartsModule,
    MatTabsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatGridListModule,
    MatMenuModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAv1WgLGclLIlhKvzIiIVOiqZqDA0EM9TI'
    })
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
