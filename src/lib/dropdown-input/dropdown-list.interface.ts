import { DynamicComponentData } from '../common/dynamic-component-data.interface';

export interface DropDownItemComponentData extends DynamicComponentData {
    itemData: any;
    matchText: string;
}