export interface OverallStatistics {
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;
  totalRevenue: number;
}

export interface ProductSummary {
  title: string;
  price: number;
  imgCover: string;
  quantity: number;
  sold: number;
}

export interface CategoryProductGroup {
  _id: string;
  count: number;
  category: string;
  products: ProductSummary[];
}

export interface TopSellingProduct {
  _id: string;
  title: string;
  imgCover: string;
  price: number;
  sold: number;
  id: string;
}

export interface LowStockProduct {
  _id: string;
  title: string;
  imgCover: string;
  price: number;
  quantity: number;
  id: string;
}

export interface ProductsStatistics {
  productsByCategory: CategoryProductGroup[];
  topSellingProducts: TopSellingProduct[];
  lowStockProducts: LowStockProduct[];
}

export interface OrderStatusCount {
  _id: string | null;
  count: number;
}

export interface RevenueMetric {
  _id: string;
  revenue: number;
  count: number;
}

export interface OrdersStatistics {
  ordersByStatus: OrderStatusCount[];
  dailyRevenue: RevenueMetric[];
  monthlyRevenue: RevenueMetric[];
}

export interface CategoryStatistic {
  _id: string;
  name: string;
  totalProducts: number;
  totalRevenue: number;
}

export interface StatisticsData {
  overall: OverallStatistics;
  products: ProductsStatistics;
  orders: OrdersStatistics;
  categories: CategoryStatistic[];
}

export interface StatisticsResponse {
  message: string;
  statistics: StatisticsData;
}
