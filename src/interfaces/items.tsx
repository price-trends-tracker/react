// ========== for Navbar & Filter ==========

interface BaseItem {
    id: number;
    start_date: string;
    end_date: string;
}

interface SsdItem extends BaseItem {
    price_type: string;
    brand: string;
    spec: string;
}

interface PvItem extends BaseItem {
    material: string;
    item: string;
}

interface OtherItem extends BaseItem {
    price_type: string;
    item: string;
}

export type Item = SsdItem | PvItem | OtherItem;

export function getItemName(item: Item): string {
    return "brand" in item ? `${item.brand} / ${item.spec}` : item.item;
}
