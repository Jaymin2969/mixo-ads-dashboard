interface SummaryCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon?: React.ReactNode;
}

export default function SummaryCard({ title, value, subtitle, icon }: SummaryCardProps) {
    return (
        <div className="bg-white dark:bg-[#1e293b] rounded-lg shadow-sm border border-gray-200 dark:border-[#334155] p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2 transition-colors duration-300">{value}</p>
                    {subtitle && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{subtitle}</p>
                    )}
                </div>
                {icon && (
                    <div className="text-gray-400 dark:text-gray-500">
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
}

