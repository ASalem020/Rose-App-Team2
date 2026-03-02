export interface DashboardOverall {
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;
  totalRevenue: number;
}

export interface OrdersByStatus {
  _id: string | null;
  count: number;
}

export interface DailyRevenue {
  _id: string;
  revenue: number;
  count: number;
}

export interface MonthlyRevenue {
  _id: string;
  revenue: number;
  count: number;
}

export interface DashboardOrders {
  ordersByStatus: OrdersByStatus[];
  dailyRevenue: DailyRevenue[];
  monthlyRevenue: MonthlyRevenue[];
}

export interface DashboardStatistics {
  overall: DashboardOverall;
  orders: DashboardOrders;
}

export interface DashboardResponse {
  message: string;
  statistics: DashboardStatistics;
}
