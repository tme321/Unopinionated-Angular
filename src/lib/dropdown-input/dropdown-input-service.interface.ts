import { OpaqueToken} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DynamicComponentData } from '../common/dynamic-component-data.interface';

export interface DropdownItemComponentData extends DynamicComponentData {
    matchText: string;
}

export interface DropdownInputService {
    items$: Observable<DropdownItemComponentData[]>;
    setSearchText(text: string): void;
    setMaxItems(maxResults: number): void;
    clearItems(): void;
};


