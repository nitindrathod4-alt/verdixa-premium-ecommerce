export const FREE_SHIPPING_THRESHOLD=799;
export const STANDARD_SHIPPING=29;
export const COD_FEE=50;
export function getShipping(subtotal:number){return subtotal>=FREE_SHIPPING_THRESHOLD?0:STANDARD_SHIPPING}
export function getTotal(subtotal:number,paymentMethod:"prepaid"|"cod"){return subtotal+getShipping(subtotal)+(paymentMethod==="cod"?COD_FEE:0)}
export function getFreeShippingProgress(subtotal:number){return Math.min(100,(subtotal/FREE_SHIPPING_THRESHOLD)*100)}
