// ========== Item Info (Navbar) ==========

interface BaseItem {
    start_date: string;
    end_date: string;
}

export interface SsdItem extends BaseItem {
    price_type: string;
    brand: string;
}

export interface PvItem extends BaseItem {
    material: string;
    item: string;
}

export interface OtherItem extends BaseItem {
    price_type: string;
    item: string;
}

export function getItemName(item: (SsdItem | PvItem | OtherItem)): string {
    return "brand" in item ? item.brand : item.item
}

export interface Category {
    name: string;
    item_list: (SsdItem | PvItem | OtherItem)[];
}


// ========== Item Data (Plot) ==========

interface BaseData {
    id: number;
    currency: string;
    high: number;
    low: number;
    average: number;
    change: number;
    last_update: string;
    created_at: string;
    updated_at: string;
    price_type: string;
}

export interface SsdData extends BaseData {
    brand: string;
    spec: string;
    series: string;
    capacity: number;
}

export interface OtherData extends BaseData {
    item: string;
}
