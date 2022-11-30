import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from './services/data.service';

@Pipe({
  name: 'eth'
})
export class EthPipe implements PipeTransform {

  constructor(private ds: DataService) {
  }

  transform(value: unknown, ...args: unknown[]): unknown {
    return Math.round(value as number * this.ds.usd);
  }

}
