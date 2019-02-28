import { Http, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";
import { Demographic } from "../demographic/demographic.model";
import { Subject } from "rxjs/Subject";

@Injectable()
export class PatientService {
  constructor(private http: Http) {}

  public demographic: Demographic = new Demographic();
  public demographicChange: Subject<string> = new Subject<string>();

  public getPatientInfo(patientNumber: string) {
    console.log("getting info for patient = " + patientNumber);

    let url =
      "https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/Patient?_id=" +
      patientNumber +
      "&status=active";

    let response = this.http.get(url);

    response.subscribe(
      res => {
        let json = res.json();
        console.log("patient info: " + JSON.stringify(json));

        this.demographic.name = json.entry[0].resource.name[0].text;
        this.demographic.dob = json.entry[0].resource.birthDate;
        this.demographic.gender = json.entry[0].resource.gender;

        this.demographicChange.next(this.demographic);
      },
      err => {}
    );

    return this.demographic;
  }
}
