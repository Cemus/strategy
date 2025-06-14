import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statSign',
})
export class StatSignPipe implements PipeTransform {
  transform(current: number, prev: number): string {
    const diff = current - prev;

    if (diff > 0) {
      return '+' + diff;
    } else if (diff < 0) {
      return diff.toString();
    } else {
      return '—';
    }
  }
}
