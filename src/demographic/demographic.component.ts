import { Component, OnInit } from "@angular/core";
import { PatientService } from "../services/patient.service";
import { Demographic } from "./demographic.model";
@Component({
  selector: "demo",
  templateUrl: "./demographic.component.html",
  styleUrls: ["./demographic.component.css"]
})
export class DemoComponent implements OnInit {
  public demo: Demographic;

  constructor(private patientService: PatientService) {}

  ngOnInit() {
    this.demo = new Demographic();

    this.patientService.demographicChange.subscribe(demo => {
      this.demo = demo;
    });
  }
}
