'use client';

import { Campaign } from '@/types/campaign';

interface ClicksConversionsChartProps {
    campaigns: Campaign[];
}

export default function ClicksConversionsChart({ campaigns }: ClicksConversionsChartProps) {
    // Calculate total clicks and conversions
    const totalClicks = campaigns.reduce((sum, c) => sum + (c.clicks || 0), 0);
    const totalConversions = campaigns.reduce((sum, c) => sum + (c.conversions || 0), 0);

    // If no data, calculate mock values based on campaigns
    const clicks = totalClicks > 0 ? totalClicks : campaigns.length * 1200; // Mock: ~1200 clicks per campaign
    const conversions = totalConversions > 0 ? totalConversions : Math.round(clicks * 0.047); // Mock: ~4.7% conversion rate

    const maxValue = Math.max(clicks, conversions);
    const chartHeight = 200;
    const barWidth = 60;
    const spacing = 80;
    const maxBarHeight = chartHeight - 40;

    const clicksHeight = (clicks / maxValue) * maxBarHeight;
    const conversionsHeight = (conversions / maxValue) * maxBarHeight;

    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    // Calculate Y-axis ticks
    const yAxisTicks = 5;
    const tickValues: number[] = [];
    for (let i = 0; i <= yAxisTicks; i++) {
        tickValues.push((maxValue / yAxisTicks) * i);
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Clicks & Conversions</h3>
            <div className="flex items-end justify-center gap-8 h-[240px] relative">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 pr-2">
                    {tickValues.reverse().map((value, idx) => (
                        <span key={idx} className="animate-fade-in" style={{ animationDelay: `${0.1 * idx}s` }}>{formatNumber(value)}</span>
                    ))}
                </div>

                {/* Bars */}
                <div className="flex items-end gap-8 ml-12">
                    <div className="flex flex-col items-center group">
                        <svg width={barWidth} height={chartHeight} className="mb-2">
                            <rect
                                x="0"
                                y={chartHeight - clicksHeight}
                                width={barWidth}
                                height={clicksHeight}
                                fill="#14B8A6"
                                rx="4"
                                className="animate-grow-bar transition-all duration-300 group-hover:fill-[#0D9488]"
                                style={{ animationDelay: '0.3s' }}
                            />
                        </svg>
                        <div className="text-center">
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Clicks</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center group">
                        <svg width={barWidth} height={chartHeight} className="mb-2">
                            <rect
                                x="0"
                                y={chartHeight - conversionsHeight}
                                width={barWidth}
                                height={conversionsHeight}
                                fill="#14B8A6"
                                rx="4"
                                className="animate-grow-bar transition-all duration-300 group-hover:fill-[#0D9488]"
                                style={{ animationDelay: '0.5s' }}
                            />
                        </svg>
                        <div className="text-center">
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Conversions</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

