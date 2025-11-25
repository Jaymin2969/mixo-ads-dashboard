'use client';

import { Campaign } from '@/types/campaign';

interface PlatformChartProps {
    campaigns: Campaign[];
}

export default function PlatformChart({ campaigns }: PlatformChartProps) {
    const platformCounts = campaigns.reduce((acc, campaign) => {
        campaign.platforms.forEach(platform => {
            acc[platform] = (acc[platform] || 0) + 1;
        });
        return acc;
    }, {} as Record<string, number>);

    const totalPlatforms = Object.values(platformCounts).reduce((sum, count) => sum + count, 0);

    const platforms = Object.entries(platformCounts).sort((a, b) => b[1] - a[1]);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Distribution</h3>
            <div className="space-y-3">
                {platforms.map(([platform, count]) => {
                    const percentage = (count / totalPlatforms) * 100;
                    return (
                        <div key={platform}>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600 capitalize">{platform}</span>
                                <span className="font-medium text-gray-900">{count} campaigns</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

