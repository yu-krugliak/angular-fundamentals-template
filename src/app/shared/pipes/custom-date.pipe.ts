import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
    // Add your code here
    transform(value: any): string {
        if (!value) {
            return '';
        }

        let date = new Date(value);
        if (isNaN(date.getTime())) {
            return ''; 
        }

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${this.padNumber(day)}.${this.padNumber(month)}.${year}`;
    }

    private padNumber(num: number): string {
        return num.toString().padStart(2, '0');
    }
}
