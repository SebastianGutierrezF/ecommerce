import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from './services/data.service';

@Pipe({
  name: 'eth'
})
export class EthPipe implements PipeTransform {

  constructor(private ds: DataService) {
  }

  transform(value: unknown): number {
    return value as number * this.ds.usd;
  }

}
