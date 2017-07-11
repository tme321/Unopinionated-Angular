import { 
    Component, 
    Input, 
    ChangeDetectionStrategy, 
    ViewChild, 
    EventEmitter, 
    Output } from '@angular/core';
import { Router } from '@angular/router';
import { 
    NavigationLinkModel, 
    MenuLabelModel, 
    MenuButtonModel } from './menu-items.interfaces';

@Component({
    template: `
                <a class="nav-link"
                   [routerLink]="[model.value]"
                   routerLinkActive="selected"
                   [queryParams]="model.queryParameters"
                   [preserveQueryParams]="model.preserveQParams">
                    {{model.text}}
                </a>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationLink {
    @Input() model: NavigationLinkModel;

    constructor(private router: Router) {
    }

    navigate() {
        this.router.navigate([this.model.value],
        {
            queryParams: this.model.queryParameters,
            preserveQueryParams: this.model.preserveQParams
        })
    }
}

@Component({
    template: `<input class="menu-input"
				[(ngModel)]="input"
				(ngModelChange)="inputChanged($event)"				
                placeholder="Type something..."/>
	`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuInput {
    input: string;
	
    constructor() {
    }
	
	inputChanged(e: any){
		
	}
}

