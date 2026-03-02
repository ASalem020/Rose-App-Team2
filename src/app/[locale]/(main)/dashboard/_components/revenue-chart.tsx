'use client';

import * as React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import type {
  DailyRevenue,
  MonthlyRevenue,
} from '@/lib/types/dashboard';

type Props = {
  dailyRevenue: DailyRevenue[];
  monthlyRevenue: MonthlyRevenue[];
};

/**
 * RevenueChart
 * ------------
 * Displays revenue data in two modes:
 * - Monthly: shows Jan → Oct
 * - Weekly: shows last 7 days
 */
export default function RevenueChart({
  dailyRevenue,
  monthlyRevenue,
}: Props) {
  const [mode, setMode] = React.useState<
    'monthly' | 'weekly'
  >('monthly');

  /**
   * Build fixed Jan → Oct months
   */
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
  ];

  const monthlyData = months.map((monthName, index) => {
    const found = monthlyRevenue.find(item => {
      const [, month] = item._id.split('-');
      return Number(month) === index + 1;
    });

    return {
      label: monthName,
      revenue: found ? found.revenue : 0,
    };
  });

  const weeklyData = dailyRevenue.slice(-7).map(item => ({
    label: new Date(item._id).toLocaleDateString('en-US', {
      weekday: 'short',
    }),
    revenue: item.revenue,
  }));

  const chartData =
    mode === 'monthly' ? monthlyData : weeklyData;

  return (
    <Card className="overflow-hidden rounded-2xl shadow-sm">
      {/* Header */}
      <CardHeader className="px-6 pt-6">
        <div className="flex w-full items-center">
          <CardTitle className="text-xl font-semibold">
            Revenue
          </CardTitle>

          <div className="ml-auto flex items-center gap-6 text-sm font-medium">
            <button
              onClick={() => setMode('monthly')}
              className={
                mode === 'monthly'
                  ? 'text-red-600'
                  : 'text-muted-foreground'
              }
            >
              Monthly
            </button>

            <button
              onClick={() => setMode('weekly')}
              className={
                mode === 'weekly'
                  ? 'text-red-600'
                  : 'text-muted-foreground'
              }
            >
              Last Week
            </button>
          </div>
        </div>
      </CardHeader>

      {/* Chart Area */}
      <CardContent className="px-0 pb-0">
        <div className="bg-gradient-to-b from-zinc-50 to-white pt-6">
          <div className="h-[420px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#ef4444"
                      stopOpacity={0.7}
                    />
                    <stop
                      offset="95%"
                      stopColor="#ef4444"
                      stopOpacity={0.05}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  horizontal={false}
                  stroke="#e4e4e7"
                />

                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={value =>
                    value.toLocaleString()
                  }
                />

                <Tooltip
                  formatter={(value: number) =>
                    `${value.toLocaleString()} EGP`
                  }
                />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#dc2626"
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
