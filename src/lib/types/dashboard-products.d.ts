export type DashboardProducts = {
  message: string;
  statistics: {
    topSellingProducts: [
      {
        _id: string;
        title: string;
        imgCover: string;
        price: number;
        sold: number;
        id: string;
      },
    ];
    lowStockProducts: [
      {
        _id: string;
        title: string;
        imgCover: string;
        price: number;
        quantity: number;
        id: string;
      },
    ];
  };
};
