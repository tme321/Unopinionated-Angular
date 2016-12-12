
export interface NavigationLinkModel {
    text: string;
    value: string;
    preserveQParams?: boolean;
    queryParameters: any;
    onClick?: (e: MouseEvent) => any;
}

export interface MenuLabelModel {
    text: string;
}

export interface MenuButtonModel {
    onClick: (e: MouseEvent)=>any,
    text: string,
}