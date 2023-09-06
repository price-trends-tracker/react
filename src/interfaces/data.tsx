// ========== for Plot ==========

export interface BaseData {
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
