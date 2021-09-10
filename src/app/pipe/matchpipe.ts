import { Injectable, Pipe,PipeTransform } from "@angular/core";

@Pipe({
  name: "MatchPipe"
})
@Injectable()

export class MatchPipe implements PipeTransform {
  transform(items: any[], field: string, value: string): any[] {
      if(!items) return[];
      if(!value || value =='All') return items;
      return items.filter(itemeach =>
             {return value == itemeach[field]})
  }
}
