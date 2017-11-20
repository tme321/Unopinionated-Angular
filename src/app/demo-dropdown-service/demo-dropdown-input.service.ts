import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DropdownInputService, DropdownItemComponentData } from '../lib/dropdown-input';
import { NavigationLink } from '../menu-items/menu-items.components';

/**
 * An example service that extends the service the 
 * dynamic drop down search component will be 
 * provided with.
 */
@Injectable()
export class DemoDropdownInputService implements DropdownInputService {
	/**
	 * This observable will be listened to by the search
	 * service in order to fill its drop down results box.
	 */
	public items$: Observable<DropdownItemComponentData[]>;

    private itemsSub = new BehaviorSubject<DropdownItemComponentData[]>(null);

	private search_text: string;
	
    constructor() {
        this.items$ = this.itemsSub.asObservable();
    }

	/**
	 * Update the service when the search text has changed
	 * It is up to the service to decide if/when to get a 
	 * new results set.
	 */
    public setSearchText(text: string) {
        this.search_text = text;

		// When the user enters at least 3 characters 
		// fetch a new data set asynchronously
        if (this.search_text.length >= 3) {
            this.fetchData();
        }
        else {
            this.clearItems();
        }
    }

	/**
	 * Max results is provided as a function with no return.
	 * It is expected for the service to implement a way to 
	 * store the max results and filter the result set as 
	 * necessary or ignore it completely as desired.
	 */
    public setMaxItems(maxResults: number) {
		// no implementation
    }

	/**
	 * Emit a cleared results result and 
	 * perform any clean up necessary.
	 */
    public clearItems() {
        this.itemsSub.next([]);
    }

	/**
	 * Not specific to the interface, merely a custom function
	 * written to asynchronously emit the next results set.
	 */
    private fetchData() {
		setTimeout(()=>{
			this.itemsSub.next(
				[
					{
						component: NavigationLink,
						inputs:{
							model: {
								text: 'Home',
								value: '/',
								preserveQParams: false,
								queryParameters: {}
							}
						},
						matchText: 'Home'
					},
					{
						component: NavigationLink,
						inputs:{
							model: {
								text: 'Collapsing',
								value: '/collapsing',
								preserveQParams: false,
								queryParameters: {}
							}
						},
						matchText: 'collapsing'
					},
					{
						component: NavigationLink,
						inputs:{
							model: {
								text: 'Dropdown',
								value: '/dropdown',
								preserveQParams: false,
								queryParameters: {}
							}
						},
						matchText: 'dropdown'
					},
					{
						component: NavigationLink,
						inputs:{
							model: {
								text: 'Drag And Drop',
								value: '/draganddrop',
								preserveQParams: false,
								queryParameters: {}
							}
						},
						matchText: 'draganddrop'
					}

				]
			);
		},500);
    }
	
}