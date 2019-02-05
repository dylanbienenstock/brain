import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'leftPad'
})
export class LeftPadPipe implements PipeTransform {
    transform(value: string, args?: any): any {
        if (!value.startsWith(" ")) {
            return " " + value;
        }

        return value;
    }
}
