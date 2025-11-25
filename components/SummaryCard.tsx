interface SummaryCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon?: React.ReactNode;
}

export default function SummaryCard({ title, value, subtitle, icon }: SummaryCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
                    {subtitle && (
                        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
                    )}
                </div>
                {icon && (
                    <div className="text-gray-400">
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
}

