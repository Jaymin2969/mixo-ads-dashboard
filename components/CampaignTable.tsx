'use client';

import { Campaign, CampaignStatus } from '@/types/campaign';
import { useState } from 'react';

interface CampaignTableProps {
    campaigns: Campaign[];
}

export default function CampaignTable({ campaigns }: CampaignTableProps) {
    const [filterStatus, setFilterStatus] = useState<CampaignStatus | 'all'>('all');
    const [sortBy, setSortBy] = useState<'name' | 'budget' | 'created_at'>('created_at');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const filteredCampaigns = campaigns.filter(campaign =>
        filterStatus === 'all' || campaign.status === filterStatus
    );

    const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;

        if (sortBy === 'name') {
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
        } else if (sortBy === 'budget') {
            aValue = a.budget;
            bValue = b.budget;
        } else {
            aValue = new Date(a.created_at).getTime();
            bValue = new Date(b.created_at).getTime();
        }

        if (sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    const handleSort = (column: 'name' | 'budget' | 'created_at') => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('desc');
        }
    };

    const getStatusBadge = (status: CampaignStatus) => {
        const styles = {
            active: 'bg-green-100 text-green-800',
            paused: 'bg-yellow-100 text-yellow-800',
            completed: 'bg-gray-100 text-gray-800',
        };

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h2 className="text-lg font-semibold text-gray-900">Campaigns</h2>
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">Filter:</label>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value as CampaignStatus | 'all')}
                            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All</option>
                            <option value="active">Active</option>
                            <option value="paused">Paused</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('name')}
                            >
                                <div className="flex items-center gap-1">
                                    Campaign Name
                                    {sortBy === 'name' && (
                                        <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Brand ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('budget')}
                            >
                                <div className="flex items-center gap-1">
                                    Budget
                                    {sortBy === 'budget' && (
                                        <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Daily Budget
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Platforms
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('created_at')}
                            >
                                <div className="flex items-center gap-1">
                                    Created
                                    {sortBy === 'created_at' && (
                                        <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sortedCampaigns.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                                    No campaigns found
                                </td>
                            </tr>
                        ) : (
                            sortedCampaigns.map((campaign) => (
                                <tr key={campaign.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                                        <div className="text-xs text-gray-500">{campaign.id}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {campaign.brand_id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(campaign.status)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatCurrency(campaign.budget)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {formatCurrency(campaign.daily_budget)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-wrap gap-1">
                                            {campaign.platforms.map((platform) => (
                                                <span
                                                    key={platform}
                                                    className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs font-medium"
                                                >
                                                    {platform}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {formatDate(campaign.created_at)}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <p className="text-sm text-gray-600">
                    Showing {sortedCampaigns.length} of {campaigns.length} campaigns
                </p>
            </div>
        </div>
    );
}

