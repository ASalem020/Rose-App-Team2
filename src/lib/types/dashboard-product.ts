/**
 * Shared base product structure.
 * Contains common fields across all product types.
 */
export interface BaseProduct {
  _id: string;
  title: string;
  price: number;
}

/**
 * Product inside category grouping.
 * `sold` is optional because not all products include it.
 */
export interface CategoryProduct extends BaseProduct {
  imgCover: string;
  quantity: number;
  sold?: number;
}

/**
 * Products grouped by category.
 */
export interface ProductsByCategory {
  _id: string;
  count: number;
  category: string;
  products: CategoryProduct[];
}

/**
 * Top selling product structure.
 */
export interface TopSellingProduct extends BaseProduct {
  id: string;
  imgCover: string;
  sold: number;
}

/**
 * Low stock product structure.
 */
export interface LowStockProduct extends BaseProduct {
  id: string;
  imgCover: string;
  quantity: number;
}

/**
 * Main statistics object returned from API.
 */
export interface ProductStatistics {
  productsByCategory: ProductsByCategory[];
  topSellingProducts: TopSellingProduct[];
  lowStockProducts: LowStockProduct[];
}

/**
 * Full API response.
 */
export interface ProductStatisticsResponse {
  message: string;
  statistics: ProductStatistics;
}
