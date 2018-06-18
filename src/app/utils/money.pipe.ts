import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "money"
})
export class MoneyPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value == null) return "";

    let index = 0;
    let m = "";

    let montant = value.toString();
    for (let i = montant.length - 1; i >= 0; i--) {
      index++;

      if (index == 3 && i > 0) {
        m += montant[i];
        m += ".";
        index = 0;
      } else {
        m += montant[i];
      }
    }

    return m
      .split("")
      .reverse()
      .join("");
  }
}
