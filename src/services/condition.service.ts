import { Http, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";
import { Condition } from "../conditions/condition.model";
import { Subject } from "rxjs/Subject";

@Injectable()
export class ConditionService {
  constructor(private http: Http) {}

  public numberOfConditions = 0;
  public conditions: Condition[] = [];
  public conditionsChange: Subject<Condition[]> = new Subject<Condition[]>();

  public getConditions(patientNumber: string) {
    console.log("getting conditions for patient = " + patientNumber);

    let url =
      "https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/Condition?patient=" +
      patientNumber +
      "&status=active";

    let response = this.http.get(url);

    response.subscribe(
      res => {
        let json = res.json();
        this.conditions = [];

        let entries = json.entry;
        console.log("number of conditions = " + entries.length);

        for (let entry of entries) {
          let condition = new Condition();
          condition.dateFirstRecorded = entry.resource.dateRecorded;

          if (entry.resource.resourceType == "Condition") {
            if ("coding" in entry.resource.code) {
              condition.name = entry.resource.code.coding[0].display;
              //  console.log("condition name= " + JSON.stringify(condition.name));
            } else if ("text" in entry.resource.code) {
              condition.name = entry.resource.code.text;
              // console.log("condition name= " + JSON.stringify(condition.name));
            }
          }
          this.conditions.push(condition);
        }

        this.conditionsChange.next(this.conditions);
      },
      err => {}
    );

    return this.conditions;
  }
}
