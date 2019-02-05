import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dayOnly'
})
export class DayOnlyPipe implements PipeTransform {
    transform(value: string, args?: any): any {
        if (value.includes(" at")) {
            return value.split(" at")[0];
        }

        return null;
    }
}
