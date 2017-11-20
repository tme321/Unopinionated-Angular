import { DynamicComponentData } from "../dynamic-component/dynamic-component-data.interface";

export interface DropDownItemComponentData extends DynamicComponentData {
    itemData: any;
    matchText: string;
}