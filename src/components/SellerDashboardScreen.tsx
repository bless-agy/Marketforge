import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  Receipt,
  BarChart3,
  CreditCard,
  Settings,
  HelpCircle,
  Plus,
  Download,
  Wallet,
  TrendingUp,
  AlertTriangle,
  Info,
  Check,
  Search,
  MoreHorizontal,
  ArrowUpRight,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { Product, Order, SellerStats, DashboardTab } from '../types';
import { SALES_TREND_DATA } from '../data/mockData';

interface SellerDashboardScreenProps {
  stats: SellerStats;
  orders: Order[];
  products: Product[];
  onOpenNewListing: () => void;
  onUpdateOrderStatus: (orderId: string, newStatus: Order['status']) => void;
  onDeleteProduct: (productId: string) => void;
}

export const SellerDashboardScreen: React.FC<SellerDashboardScreenProps> = ({
  stats,
  orders,
  products,
  onOpenNewListing,
  onUpdateOrderStatus,
  onDeleteProduct,
}) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d');
  const [inventorySearch, setInventorySearch] = useState('');
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [newPriceVal, setNewPriceVal] = useState('');

  // CSV Report Export
  const handleDownloadReport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Order ID,Date,Customer,Amount,Status\n' +
      orders.map((o) => `${o.id},${o.date},"${o.customer}",${o.amount},${o.status}`).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MarketForge_Sales_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusChipClass = (status: Order['status']) => {
    switch (status) {
      case 'Processing':
        return 'bg-amber-100 text-amber-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div id="seller-dashboard-screen" className="flex min-h-[calc(100vh-80px)] bg-[#f8fafc]">
      {/* SideNavBar */}
      <nav id="seller-sidenav" className="bg-[#f2f4f6] text-[#191c1e] font-medium text-sm w-64 fixed left-0 top-20 bottom-0 border-r border-[#c6c6cd] flex flex-col p-4 gap-2 z-40 hidden md:flex overflow-y-auto">
        {/* Merchant Header */}
        <div className="mb-6 px-2 flex items-center gap-3">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa9-Cp7A1BeUE9ku7rDlsk7j64hdjSxAoFfRIobustJzidbdyXNWjoWUpkZQymsyn1kf1v95U7zr19zvyhPxpiK_37p5R1-Tkp_ikkD_Soun1ugX4z_JVtQkk0LKlNd8Sf6ABjuGsRkB98xcTPzzf6Ny9aHJtlKWaQ7Oxp_RNhc-4VNIOpwk8mpBenSoC7TsYxNTg2MUyVqMuSJ0H9F-CmhmXC5TFgY2_C0_kw2C4ypjiqu_wrCwsf"
            alt="Seller Forge Merchant Profile"
            className="w-12 h-12 rounded-full object-cover border border-[#c6c6cd]"
          />
          <div>
            <h1 className="font-bold text-base text-[#000000]">Seller Forge</h1>
            <p className="text-xs text-[#76777d]">Elite Merchant</p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          id="new-listing-btn"
          onClick={onOpenNewListing}
          className="bg-[#131b2e] text-white font-semibold text-sm rounded-lg py-2.5 px-4 mb-4 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>New Listing</span>
        </button>

        {/* Navigation Links */}
        <div className="flex-1 flex flex-col gap-1">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'inventory', label: 'Inventory', icon: Package },
            { id: 'orders', label: 'Orders', icon: Receipt },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'commission', label: 'Commission', icon: CreditCard },
          ].map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                onClick={() => setActiveTab(item.id as DashboardTab)}
                className={`rounded-lg font-bold flex items-center gap-3 p-3 cursor-pointer transition-colors text-left ${
                  isActive
                    ? 'bg-[#6cf8bb] text-[#00714d]'
                    : 'text-[#45464d] hover:bg-[#e0e3e5]'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Footer Navigation */}
        <div className="mt-auto border-t border-[#c6c6cd] pt-4 flex flex-col gap-1">
          <button
            onClick={() => setActiveTab('settings')}
            className={`rounded-lg flex items-center gap-3 p-3 cursor-pointer transition-colors text-left ${
              activeTab === 'settings' ? 'bg-[#e0e3e5] text-[#000000] font-bold' : 'text-[#45464d] hover:bg-[#e0e3e5]'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <button
            onClick={() => setActiveTab('support')}
            className={`rounded-lg flex items-center gap-3 p-3 cursor-pointer transition-colors text-left ${
              activeTab === 'support' ? 'bg-[#e0e3e5] text-[#000000] font-bold' : 'text-[#45464d] hover:bg-[#e0e3e5]'
            }`}
          >
            <HelpCircle className="w-5 h-5" />
            <span>Support</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="md:ml-64 p-4 md:p-8 min-h-screen flex-grow w-full">
        {/* Header Actions */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#191c1e] capitalize">
              {activeTab} Overview
            </h2>
            <p className="text-xs md:text-sm text-[#45464d] mt-1">
              Here is what&apos;s happening with your marketplace today.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="download-report-btn"
              onClick={handleDownloadReport}
              className="px-4 py-2 bg-white border border-[#c6c6cd] text-[#000000] rounded-lg font-medium text-sm hover:bg-[#f2f4f6] transition-colors flex items-center gap-2 shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Download Sales Report</span>
            </button>
          </div>
        </header>

        {/* Mobile Sub-Nav Selector */}
        <div className="md:hidden flex overflow-x-auto gap-2 mb-6 pb-2 scrollbar-none">
          {['overview', 'inventory', 'orders', 'analytics', 'commission'].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t as DashboardTab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase whitespace-nowrap ${
                activeTab === t ? 'bg-[#000000] text-white' : 'bg-white border border-[#c6c6cd] text-[#45464d]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stat Cards Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="bg-white border border-[#c6c6cd] rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs font-semibold text-[#45464d]">Total Sales</p>
                  <Wallet className="w-5 h-5 text-[#76777d]" />
                </div>
                <h3 className="text-2xl font-bold text-[#191c1e]">
                  ${stats.totalSales.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </h3>
                <p className="text-xs font-semibold text-[#006c49] mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  +{stats.salesGrowth}% from last month
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-[#c6c6cd] rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs font-semibold text-[#45464d]">Active Listings</p>
                  <Package className="w-5 h-5 text-[#76777d]" />
                </div>
                <h3 className="text-2xl font-bold text-[#191c1e]">
                  {stats.activeListings.toLocaleString()}
                </h3>
                <p className="text-xs text-[#76777d] mt-2">
                  — Stable inventory
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-[#c6c6cd] rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs font-semibold text-[#45464d]">Pending Orders</p>
                  <Receipt className="w-5 h-5 text-[#76777d]" />
                </div>
                <h3 className="text-2xl font-bold text-[#191c1e]">{stats.pendingOrders}</h3>
                <p className="text-xs font-semibold text-red-600 mt-2 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {stats.immediateActionOrders} require immediate action
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white border border-[#c6c6cd] rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs font-semibold text-[#45464d]">Total Commission Paid</p>
                  <CreditCard className="w-5 h-5 text-[#76777d]" />
                </div>
                <h3 className="text-2xl font-bold text-[#191c1e]">
                  ${stats.totalCommissionPaid.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </h3>
                <p className="text-xs text-[#76777d] mt-2 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" />
                  {(stats.commissionRate * 100).toFixed(0)}% platform fee
                </p>
              </div>
            </section>

            {/* Bento Grid Layout for Charts and Tables */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chart Area (Spans 2 columns) */}
              <div className="bg-white border border-[#c6c6cd] rounded-lg lg:col-span-2 p-5 flex flex-col hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-center mb-4 border-b border-[#c6c6cd] pb-3">
                  <h3 className="text-base font-bold text-[#191c1e]">Sales Trends (30 Days)</h3>
                  <div className="flex items-center gap-2">
                    {(['7d', '30d', '90d'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTimeframe(t)}
                        className={`px-2.5 py-1 text-xs font-semibold rounded ${
                          timeframe === t ? 'bg-[#000000] text-white' : 'text-[#76777d] hover:bg-[#f2f4f6]'
                        }`}
                      >
                        {t.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 min-h-[300px] w-full pt-4">
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={SALES_TREND_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e3e5" />
                      <XAxis dataKey="day" stroke="#76777d" fontSize={12} />
                      <YAxis stroke="#76777d" fontSize={12} tickFormatter={(v) => `$${v}`} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #c6c6cd' }}
                        formatter={(val: number | string | Array<number | string> | undefined) => [
                          `$${Number(val ?? 0).toLocaleString()}`,
                          'Sales Volume',
                        ]}
                      />
                      <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#006c49"
                        strokeWidth={3}
                        dot={{ r: 4, fill: '#006c49' }}
                        activeDot={{ r: 7 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Orders Table (Spans 1 column) */}
              <div className="bg-white border border-[#c6c6cd] rounded-lg lg:col-span-1 flex flex-col hover:shadow-sm transition-shadow overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b border-[#c6c6cd]">
                  <h3 className="text-base font-bold text-[#191c1e]">Recent Orders</h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-semibold text-[#000000] hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="overflow-x-auto flex-1">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#f2f4f6] border-b border-[#c6c6cd]">
                      <tr>
                        <th className="py-2.5 px-3 text-xs font-semibold text-[#45464d]">Order ID</th>
                        <th className="py-2.5 px-3 text-xs font-semibold text-[#45464d]">Amount</th>
                        <th className="py-2.5 px-3 text-xs font-semibold text-[#45464d]">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#c6c6cd] text-xs">
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order.id} className="hover:bg-[#f7f9fb] transition-colors">
                          <td className="py-3 px-3 font-semibold text-[#000000]">{order.id}</td>
                          <td className="py-3 px-3 font-medium text-[#191c1e]">
                            ${order.amount.toFixed(2)}
                          </td>
                          <td className="py-3 px-3">
                            <span
                              className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${getStatusChipClass(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: INVENTORY */}
        {activeTab === 'inventory' && (
          <div className="bg-white border border-[#c6c6cd] rounded-xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#76777d] w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search inventory..."
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[#c6c6cd] rounded-lg text-sm outline-none focus:border-[#000000]"
                />
              </div>

              <button
                onClick={onOpenNewListing}
                className="px-4 py-2 bg-[#000000] text-white font-semibold text-sm rounded-lg hover:bg-[#000000]/90 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#f2f4f6] border-b border-[#c6c6cd]">
                  <tr>
                    <th className="py-3 px-4 text-xs font-semibold text-[#45464d]">Product</th>
                    <th className="py-3 px-4 text-xs font-semibold text-[#45464d]">SKU</th>
                    <th className="py-3 px-4 text-xs font-semibold text-[#45464d]">Category</th>
                    <th className="py-3 px-4 text-xs font-semibold text-[#45464d]">Price</th>
                    <th className="py-3 px-4 text-xs font-semibold text-[#45464d]">Stock</th>
                    <th className="py-3 px-4 text-xs font-semibold text-[#45464d]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c6c6cd] text-sm">
                  {products
                    .filter((p) => p.title.toLowerCase().includes(inventorySearch.toLowerCase()))
                    .map((item) => (
                      <tr key={item.id} className="hover:bg-[#f7f9fb]">
                        <td className="py-3 px-4 font-medium text-[#000000] flex items-center gap-3">
                          <img src={item.images[0]} alt="" className="w-10 h-10 object-cover rounded border border-[#c6c6cd]" />
                          <span className="line-clamp-1 max-w-xs">{item.title}</span>
                        </td>
                        <td className="py-3 px-4 text-xs text-[#76777d]">{item.sku}</td>
                        <td className="py-3 px-4 text-xs text-[#45464d]">{item.category}</td>
                        <td className="py-3 px-4 font-bold text-[#000000]">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-xs">
                          <span
                            className={`px-2 py-1 rounded font-semibold ${
                              item.stockStatus === 'In Stock'
                                ? 'bg-[#6cf8bb]/30 text-[#006c49]'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {item.stockCount ?? 20} units
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs">
                          <button
                            onClick={() => onDeleteProduct(item.id)}
                            className="text-red-600 hover:underline font-medium"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS */}
        {activeTab === 'orders' && (
          <div className="bg-white border border-[#c6c6cd] rounded-xl p-6 space-y-6">
            <h3 className="text-lg font-bold text-[#000000]">Order Management</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#f2f4f6] border-b border-[#c6c6cd]">
                  <tr>
                    <th className="py-3 px-4 text-xs font-semibold text-[#45464d]">Order ID</th>
                    <th className="py-3 px-4 text-xs font-semibold text-[#45464d]">Date</th>
                    <th className="py-3 px-4 text-xs font-semibold text-[#45464d]">Customer</th>
                    <th className="py-3 px-4 text-xs font-semibold text-[#45464d]">Items</th>
                    <th className="py-3 px-4 text-xs font-semibold text-[#45464d]">Total Amount</th>
                    <th className="py-3 px-4 text-xs font-semibold text-[#45464d]">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c6c6cd] text-sm">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#f7f9fb]">
                      <td className="py-3 px-4 font-bold text-[#000000]">{order.id}</td>
                      <td className="py-3 px-4 text-xs text-[#76777d]">{order.date}</td>
                      <td className="py-3 px-4 font-medium text-[#191c1e]">{order.customer}</td>
                      <td className="py-3 px-4 text-xs text-[#45464d]">{order.itemsCount} items</td>
                      <td className="py-3 px-4 font-bold text-[#000000]">${order.amount.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <select
                          value={order.status}
                          onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as Order['status'])}
                          className="text-xs border border-[#c6c6cd] rounded px-2.5 py-1 bg-white focus:border-[#000000] font-semibold"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white border border-[#c6c6cd] rounded-xl p-6">
              <h3 className="text-lg font-bold text-[#000000] mb-4">Revenue by Category</h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { category: 'Electronics', revenue: 45200 },
                      { category: 'Machinery', revenue: 32100 },
                      { category: 'Office Supplies', revenue: 24500 },
                      { category: 'IT Infra', revenue: 18900 },
                      { category: 'Security', revenue: 12400 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip formatter={(val: number | string | Array<number | string> | undefined) => [`$${Number(val ?? 0).toLocaleString()}`, 'Revenue']} />
                    <Bar dataKey="revenue" fill="#000000" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: COMMISSION */}
        {activeTab === 'commission' && (
          <div className="bg-white border border-[#c6c6cd] rounded-xl p-6 space-y-6">
            <h3 className="text-lg font-bold text-[#000000]">Commission & Payout Ledger</h3>
            <p className="text-sm text-[#45464d]">
              MarketForge applies a flat 15% platform fee on completed merchant transactions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-4 bg-[#f7f9fb] border border-[#c6c6cd] rounded-lg">
                <span className="text-xs text-[#76777d] block">Total Gross Revenue</span>
                <span className="text-2xl font-bold text-[#000000]">$124,592.00</span>
              </div>
              <div className="p-4 bg-[#f7f9fb] border border-[#c6c6cd] rounded-lg">
                <span className="text-xs text-[#76777d] block">MarketForge Platform Fee (15%)</span>
                <span className="text-2xl font-bold text-red-600">-$18,688.80</span>
              </div>
              <div className="p-4 bg-[#6cf8bb]/20 border border-[#006c49]/30 rounded-lg">
                <span className="text-xs text-[#00714d] block font-semibold">Net Merchant Payout</span>
                <span className="text-2xl font-bold text-[#006c49]">$105,903.20</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6 & 7: SETTINGS & SUPPORT */}
        {(activeTab === 'settings' || activeTab === 'support') && (
          <div className="bg-white border border-[#c6c6cd] rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-[#000000] capitalize">{activeTab} Panel</h3>
            <p className="text-sm text-[#45464d]">
              {activeTab === 'settings'
                ? 'Manage your merchant profile, payout bank accounts, tax documents, and notification triggers.'
                : 'Connect with MarketForge merchant support, submit priority inquiry tickets, or read the Seller Handbook.'}
            </p>
            <div className="pt-4">
              <button
                onClick={() => alert(`Saved ${activeTab} preferences successfully!`)}
                className="px-6 py-2.5 bg-[#000000] text-white font-semibold text-sm rounded-lg"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
