export interface WooCommerceOrder {
    id? : number;
    parent_id? : number;
    order_key? : string;
    status? :  WooCommerceStatus;
    number? : string;
    currency? : string;
    version?: string;
    prices_inclues_tax?: boolean;
    date_created?: string; // iso date format
    date_modifieid?: string; // iso date format
    customer_id? : number;
    discount_total?: string;
    discout_tax?: string;
    shipping_total?: string;
    shhiping_tax? : string;
    cart_tax?: string;
    total?: string;
    total_tax?: string;
    billing? : WooCommerceBilling;
    shipping? : WooCommerceShipping;
    payment_method?: string; // WooCommercePaymentMethod
    payment_method_title?: string;
    transaction_id?: string;
    customer_ip_address?: string;
    customer_user_agent?: string;
    created_via?: string;
    customer_note?: string;
    date_completed?: string; // iso date format
    date_paid?: string; // iso date format
    cart_hash?: string;
    line_items?: WooCommerceLineItem[];
    tax_lines?: WooCommerceTaxLine[];
    shipping_lines?: WooCommerceShippingLine[];
    fee_lines?: any[];
    coupon_lines?: any[];
    refunds?: any[];
    _links?: any;
    meta_data?: any[];
}

export interface WooCommerceBilling {
    first_name?: string;
    last_name?: string;
    company?: string;
    adress_1?: string;
    adress_2?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
    email?: string;
    phone?: string;
}

export interface WooCommerceShipping {
    first_name?: string;
    last_name?: string;
    company?: string;
    adress_1?: string;
    adress_2?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
}

export interface WooCommerceLineItem {
    id?: number;
    name?: string;
    sku?: string;
    product_id?: number;
    variation_id?: number;
    quantity?: number;
    tax_class?: string;
    price?: string;
    subtotal?: string;
    subtotal_tax?: string;
    total?: string;
    total_tax?: string;
    taxes?: any[];
    meta?: any[];
}

export interface WooCommerceTaxLine {
    id?: number;
    rate_code?: string;
    rate_id?: number;
    label?: string;
    compound?: false
    tax_total?: string;
    shipping_tax_total?: string;
}

export interface WooCommerceShippingLine {
    id?: number;
    method_title?: string;
    method_id?: string; //MethodId type
    total?: string;
    total_tax?: string;
}

export enum WooCommerceStatus {
    Pending,
    Processing,
    OnHold,
    Completed,
    Cancelled,
    Refunded,
    Failed,
    Trash
}