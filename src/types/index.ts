export interface StockItem {
  id: string;
  name: string;
  quantity: number;
  minQuantity: number;
  price: number;
  category: string;
  lastUpdated: string;
}

export type StockFormData = Omit<StockItem, 'id' | 'lastUpdated'>;