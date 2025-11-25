'use client';

import { Campaign } from '@/types/campaign';

interface StatusPieChartProps {
    campaigns: Campaign[];
}

export default function StatusPieChart({ campaigns }: StatusPieChartProps) {
    const statusCounts = campaigns.reduce((acc, campaign) => {
        acc[campaign.status] = (acc[campaign.status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const total = campaigns.length;
    const active = statusCounts.active || 0;
    const paused = statusCounts.paused || 0;
    const completed = statusCounts.completed || 0;

    const getPercentage = (count: number) => (count / total) * 100;

    const activePercent = getPercentage(active);
    const pausedPercent = getPercentage(paused);
    const completedPercent = getPercentage(completed);

    // Calculate pie chart segments
    const radius = 80;
    const centerX = 120;
    const centerY = 120;

    // Convert percentages to angles
    const activeAngle = (activePercent / 100) * 360;
    const pausedAngle = (pausedPercent / 100) * 360;
    const completedAngle = (completedPercent / 100) * 360;

    // Calculate path for each segment
    const createArc = (startAngle: number, endAngle: number) => {
        const start = (startAngle * Math.PI) / 180;
        const end = (endAngle * Math.PI) / 180;
        const x1 = centerX + radius * Math.cos(start);
        const y1 = centerY + radius * Math.sin(start);
        const x2 = centerX + radius * Math.cos(end);
        const y2 = centerY + radius * Math.sin(end);
        const largeArc = endAngle - startAngle > 180 ? 1 : 0;

        return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    };

    let currentAngle = -90; // Start from top
    const activePath = createArc(currentAngle, currentAngle + activeAngle);
    currentAngle += activeAngle;
    const pausedPath = createArc(currentAngle, currentAngle + pausedAngle);
    currentAngle += pausedAngle;
    const completedPath = createArc(currentAngle, currentAngle + completedAngle);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6 transition-colors duration-300 hover:shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Campaign Status Breakdown</h3>
            <div className="flex flex-col items-center">
                <svg width="240" height="240" viewBox="0 0 240 240" className="mb-6">
                    {/* Active segment - Purple */}
                    <path
                        d={activePath}
                        fill="#9333EA"
                        stroke="white"
                        strokeWidth="2"
                        className="animate-draw-arc transition-all duration-300 hover:opacity-90 hover:scale-105 cursor-pointer"
                        style={{ animationDelay: '0.2s', transformOrigin: '120px 120px' }}
                    />
                    {/* Paused segment - Green */}
                    <path
                        d={pausedPath}
                        fill="#10B981"
                        stroke="white"
                        strokeWidth="2"
                        className="animate-draw-arc transition-all duration-300 hover:opacity-90 hover:scale-105 cursor-pointer"
                        style={{ animationDelay: '0.4s', transformOrigin: '120px 120px' }}
                    />
                    {/* Completed segment - Orange */}
                    <path
                        d={completedPath}
                        fill="#F97316"
                        stroke="white"
                        strokeWidth="2"
                        className="animate-draw-arc transition-all duration-300 hover:opacity-90 hover:scale-105 cursor-pointer"
                        style={{ animationDelay: '0.6s', transformOrigin: '120px 120px' }}
                    />
                </svg>
                <div className="space-y-3 w-full">
                    <div className="flex items-center justify-between animate-fade-in" style={{ animationDelay: '0.7s' }}>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-purple-600 animate-scale-in" style={{ animationDelay: '0.8s' }}></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">Active</span>
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white">{activePercent.toFixed(0)}%</span>
                    </div>
                    <div className="flex items-center justify-between animate-fade-in" style={{ animationDelay: '0.9s' }}>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-green-500 animate-scale-in" style={{ animationDelay: '1s' }}></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">Paused</span>
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white">{pausedPercent.toFixed(0)}%</span>
                    </div>
                    <div className="flex items-center justify-between animate-fade-in" style={{ animationDelay: '1.1s' }}>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-orange-500 animate-scale-in" style={{ animationDelay: '1.2s' }}></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">Completed</span>
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white">{completedPercent.toFixed(0)}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

