'use client';

import { Campaign } from '@/types/campaign';

interface StatusChartProps {
    campaigns: Campaign[];
}

export default function StatusChart({ campaigns }: StatusChartProps) {
    const statusCounts = campaigns.reduce((acc, campaign) => {
        acc[campaign.status] = (acc[campaign.status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const total = campaigns.length;
    const active = statusCounts.active || 0;
    const paused = statusCounts.paused || 0;
    const completed = statusCounts.completed || 0;

    const getPercentage = (count: number) => (count / total) * 100;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Status Distribution</h3>
            <div className="space-y-4">
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Active</span>
                        <span className="font-medium text-gray-900">{active} ({getPercentage(active).toFixed(1)}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${getPercentage(active)}%` }}
                        />
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Paused</span>
                        <span className="font-medium text-gray-900">{paused} ({getPercentage(paused).toFixed(1)}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-yellow-500 h-2 rounded-full"
                            style={{ width: `${getPercentage(paused)}%` }}
                        />
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Completed</span>
                        <span className="font-medium text-gray-900">{completed} ({getPercentage(completed).toFixed(1)}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-gray-500 h-2 rounded-full"
                            style={{ width: `${getPercentage(completed)}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

