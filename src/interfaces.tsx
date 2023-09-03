interface BaseItem {
    price_type: string;
    start_date: string;
    end_date: string;
    selected?: boolean;
}

export interface SsdItem extends BaseItem {
    brand: string;
    spec: string;
    series: string;
}

export interface OtherItem extends BaseItem {
    item: string;
}

export interface Category {
    name: string;
    item_list: (SsdItem | OtherItem)[];
}
