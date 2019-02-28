import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { PatientService } from "../services/patient.service";
import { ConditionService } from "../services/condition.service";
import { AppComponent } from "./app.component";
import { SearchComponent } from "../search/search.component";
import { DemoComponent } from "../demographic/demographic.component";
import { ConditionsComponent } from "../conditions/conditions.component";
import { DataTableModule } from "angular-6-datatable";
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    DemoComponent,
    ConditionsComponent
  ],
  imports: [BrowserModule, HttpModule, DataTableModule],
  providers: [PatientService, ConditionService],
  bootstrap: [AppComponent]
})
export class AppModule {}
