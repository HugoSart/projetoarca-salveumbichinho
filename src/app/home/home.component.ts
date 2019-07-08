import {Component} from '@angular/core';
import {DataService, IData} from '../services/data.service';
import {VakinhaService} from '../services/vakinha.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent {

    dataSource$: Observable<IData[]>;

    constructor(private dataService: DataService, private vakinha: VakinhaService) {
        this.dataSource$ = dataService.dataChange$;
    }

    onItemClick(data: IData): void {
        this.vakinha.oepnVakinhaInNewTab(data.vakinhaId);
    }

}
