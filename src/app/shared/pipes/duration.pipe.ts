import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {
    transform(value: number  | undefined): string {
        if (value === undefined) {
            return '00:00 hours';
        }

        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        const hourSuffix = hours === 1 ? 'hour' : 'hours';

        return `${this.padNumber(hours)}:${this.padNumber(minutes)} ${hourSuffix}`;
    }

    private padNumber(num: number): string {
        return num.toString().padStart(2, '0');
    }
}
