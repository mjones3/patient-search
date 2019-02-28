import { Component, OnInit } from "@angular/core";
import { ConditionService } from "../services/condition.service";
import { Condition } from "./condition.model";

@Component({
  selector: "conditions",
  templateUrl: "./conditions.component.html",
  styleUrls: ["./conditions.component.css"]
})
export class ConditionsComponent implements OnInit {
  public data: any;
  public loading = false;

  constructor(private conditionService: ConditionService) {}
  ngOnInit() {
    this.conditionService.conditionsChange.subscribe(conditions => {
      this.data = conditions;
    });
  }
}
