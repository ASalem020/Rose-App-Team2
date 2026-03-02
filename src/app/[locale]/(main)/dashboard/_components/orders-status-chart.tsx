'use client';

import * as React from 'react';
import {
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { OrdersByStatus } from '@/lib/types/dashboard';

type Props = {
  data: OrdersByStatus[];
};

export default function OrdersStatusChart({ data }: Props) {
  /**
   * Filter only the three required statuses
   */
  const allowedStatuses = [
    'completed',
    'inProgress',
    'canceled',
  ];

  const chartData = data
    .filter(item =>
      allowedStatuses.includes(item._id ?? ''),
    )
    .map(item => ({
      status: item._id ?? 'unknown',
      value: item.count,
      fill: getStatusColor(item._id),
    }));

  const totalOrders = React.useMemo(() => {
    return chartData.reduce(
      (acc, curr) => acc + curr.value,
      0,
    );
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Orders Status</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-6">
        <div className="h-[260px] w-full max-w-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip />

              <Pie
                data={chartData}
                dataKey="value"
                nameKey="status"
                innerRadius={65}
                strokeWidth={4}
              >
                <Label
                  content={({ viewBox }) => {
                    if (
                      viewBox &&
                      'cx' in viewBox &&
                      'cy' in viewBox
                    ) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="text-3xl font-bold"
                          >
                            {totalOrders}
                          </tspan>

                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="text-muted-foreground"
                          >
                            Orders
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="w-full space-y-3 text-sm">
          {chartData.map(item => {
            const percentage = (
              (item.value / totalOrders) *
              100
            ).toFixed(0);

            return (
              <div
                key={item.status}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.fill }}
                  />
                  <span className="capitalize">
                    {item.status}
                  </span>
                </div>

                <span className="text-muted-foreground">
                  {item.value} ({percentage}%)
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Status colors matching Tailwind palette
 */
function getStatusColor(status: string | null) {
  switch (status) {
    case 'completed':
      return '#00BC7D'; // emerald-500
    case 'inProgress':
      return '#2B7FFF'; // blue-500
    case 'canceled':
      return '#dc2626'; // red-600
    default:
      return '#9ca3af';
  }
}
