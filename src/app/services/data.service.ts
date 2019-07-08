import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {VakinhaService} from './vakinha.service';
import {map} from 'rxjs/operators';

export interface IData {
    specie: string;
    gender: string;
    title: string;
    description: string;
    remaining: number;
    vakinhaId: number;
    imageSrc?: string;
}

@Injectable({
    providedIn: 'root'
})
export class DataService {

    dataChange$: Observable<IData[]>;

    constructor(private db: AngularFireDatabase, private vakinha: VakinhaService) {
        this.dataChange$ = this.db.list<IData>('goals').valueChanges().pipe(map(datas => {
            datas.forEach(data => this.vakinha.requestVakinhaInfo(data.vakinhaId).toPromise().then(value =>
                data.remaining = value.goal.objective - value.goal.collected
            ));
            return datas;
        }));
    }

}
