import { Observable } from 'rxjs/Observable';
import { DynamicComponentData } from '../../dynamic-component/dynamic-component-data.interface';

export interface DropdownItemComponentData extends DynamicComponentData {
    matchText: string;
}

export interface DropdownInputService {
    items$: Observable<DropdownItemComponentData[]>;
    setSearchText(text: string): void;
    setMaxItems(maxResults: number): void;
    clearItems(): void;
};


