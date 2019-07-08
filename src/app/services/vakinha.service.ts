import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export interface IVakinhaInfo {
    id: number;
    goal: {
        objective: number,
        collected: number
    }
}

@Injectable({
    providedIn: 'root'
})
export class VakinhaService {

    constructor(private http: HttpClient) {
        // empty
    }

    requestVakinhaInfo(id: number): Observable<IVakinhaInfo> {
        return this.http.get('https://www.vakinha.com.br/vaquinha/' + id, {responseType: 'text'}).pipe(map(result => {
            const parser = new DOMParser();
            const parsedHtml = parser.parseFromString(result, 'text/html');

            // Objective
            // @ts-ignore
            const goalStr: string = parsedHtml.getElementsByClassName('goal').item(0).lastChild.previousSibling.innerText;
            const goal = +goalStr.replace('R$ ', '').replace(',', '.');

            // Collected
            // @ts-ignore
            const collectedStr: string = parsedHtml.getElementsByClassName('collected').item(0).lastChild.previousSibling.innerText;
            const collected = +collectedStr.replace('R$ ', '').replace(',', '.');

            return {id: id, goal: {objective: goal, collected: collected}};
        }));
    }

    oepnVakinhaInNewTab(id: number): void {
        window.open('http://vaka.me/' + id);
    }

}
