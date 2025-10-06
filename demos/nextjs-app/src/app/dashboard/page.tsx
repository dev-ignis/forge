'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ForgeCard,
  ForgeBadge,
  ForgeButton,
  ForgeProgress,
  ForgeDataTable,
  ForgeAvatar,
  ForgeIcon,
  ForgeSelect,
  ForgeDatePicker,
  ForgeProgressCircle,
} from '@nexcraft/forge/integrations/react';

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('7d');

  // Mock data
  const stats = [
    {
      id: 1,
      title: 'Total Revenue',
      value: '$45,231',
      change: '+20.1%',
      trend: 'up',
      icon: 'dollar-sign',
      color: 'blue',
    },
    {
      id: 2,
      title: 'Active Users',
      value: '2,345',
      change: '+15.3%',
      trend: 'up',
      icon: 'users',
      color: 'green',
    },
    {
      id: 3,
      title: 'Orders',
      value: '1,234',
      change: '-5.2%',
      trend: 'down',
      icon: 'shopping-cart',
      color: 'purple',
    },
    {
      id: 4,
      title: 'Conversion',
      value: '3.24%',
      change: '+8.1%',
      trend: 'up',
      icon: 'trending-up',
      color: 'orange',
    },
  ];

  const recentOrders = [
    {
      id: 'ORD-001',
      customer: 'John Doe',
      email: 'john@example.com',
      amount: '$120.00',
      status: 'completed',
      date: '2024-10-05',
      avatar: 'JD',
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      amount: '$85.50',
      status: 'processing',
      date: '2024-10-05',
      avatar: 'JS',
    },
    {
      id: 'ORD-003',
      customer: 'Bob Johnson',
      email: 'bob@example.com',
      amount: '$200.00',
      status: 'pending',
      date: '2024-10-04',
      avatar: 'BJ',
    },
    {
      id: 'ORD-004',
      customer: 'Alice Brown',
      email: 'alice@example.com',
      amount: '$150.75',
      status: 'completed',
      date: '2024-10-04',
      avatar: 'AB',
    },
  ];

  const columns = [
    {
      key: 'avatar',
      title: '',
      render: (_: string, row: any) => <ForgeAvatar initials={row.avatar} size="sm" />,
    },
    { key: 'id', title: 'Order ID' },
    { key: 'customer', title: 'Customer' },
    { key: 'amount', title: 'Amount' },
    {
      key: 'status',
      title: 'Status',
      render: (value: string) => (
        <ForgeBadge
          variant={
            value === 'completed'
              ? 'success'
              : value === 'processing'
              ? 'info'
              : 'warning'
          }
        >
          {value}
        </ForgeBadge>
      ),
    },
    { key: 'date', title: 'Date' },
  ];

  const activities = [
    { id: 1, user: 'Sarah Wilson', action: 'completed order', time: '2 mins ago', type: 'success' },
    { id: 2, user: 'Mike Davis', action: 'added review', time: '15 mins ago', type: 'info' },
    { id: 3, user: 'Emma Taylor', action: 'requested refund', time: '1 hour ago', type: 'warning' },
    { id: 4, user: 'James Lee', action: 'subscribed to newsletter', time: '2 hours ago', type: 'success' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
            </div>
            <div className="flex items-center gap-3">
              <ForgeSelect
                value={timeRange}
                onChange={(value) => setTimeRange(value as string)}
                className="w-32"
              >
                <option value="24h">Last 24h</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </ForgeSelect>
              <ForgeButton variant="primary">
                Download Report
              </ForgeButton>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat) => (
            <motion.div key={stat.id} variants={itemVariants}>
              <ForgeCard className="p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</h3>
                    <div className="flex items-center mt-3">
                      <ForgeBadge
                        variant={stat.trend === 'up' ? 'success' : 'error'}
                        size="sm"
                      >
                        {stat.change}
                      </ForgeBadge>
                      <span className="text-xs text-gray-500 ml-2">vs last period</span>
                    </div>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}
                  >
                    <ForgeIcon name={stat.icon} className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </ForgeCard>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2"
          >
            <ForgeCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                <ForgeButton variant="ghost" size="sm">
                  View All
                </ForgeButton>
              </div>
              <ForgeDataTable columns={columns} data={recentOrders} />
            </ForgeCard>
          </motion.div>

          {/* Activity Feed */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1"
          >
            <ForgeCard className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'success'
                          ? 'bg-green-500'
                          : activity.type === 'warning'
                          ? 'bg-yellow-500'
                          : 'bg-blue-500'
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user}</span>{' '}
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ForgeCard>

            {/* Performance Card */}
            <ForgeCard className="p-6 mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Overall Performance</h3>
              <div className="flex items-center justify-center py-6">
                <ForgeProgressCircle value={78} size={120} strokeWidth={8} showValue />
              </div>
              <div className="space-y-3 mt-6">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Sales Goal</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <ForgeProgress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Customer Satisfaction</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <ForgeProgress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Delivery Rate</span>
                    <span className="font-medium">96%</span>
                  </div>
                  <ForgeProgress value={96} className="h-2" />
                </div>
              </div>
            </ForgeCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
