import { Component } from "@angular/core";
import { Http, RequestOptions } from "@angular/http";
import { PatientService } from "../services/patient.service";
import { ConditionService } from "../services/condition.service";
import { Condition } from "../conditions/condition.model";

@Component({
  selector: "search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent {
  private name: string;
  private gender: string;
  private dob: string;
  private demographic: Demographic;
  private conditions: Condition[];

  constructor(
    private http: Http,
    private patientService: PatientService,
    private conditionService: ConditionService
  ) {}

  doSearch(patientNumber: string) {
    patientNumber = patientNumber.trim();
    this.demographic = this.patientService.getPatientInfo(patientNumber);
    this.conditions = this.conditionService.getConditions(patientNumber);
  }
}
