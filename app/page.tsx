import { fetchCampaigns } from '@/lib/api';
import { Campaign } from '@/types/campaign';
import SummaryCard from '@/components/SummaryCard';
import CampaignTable from '@/components/CampaignTable';
import StatusPieChart from '@/components/StatusPieChart';
import ClicksConversionsChart from '@/components/ClicksConversionsChart';
import ThemeToggle from '@/components/ThemeToggle';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function Home() {
  let data;
  let campaigns: Campaign[] = [];

  try {
    data = await fetchCampaigns();
    campaigns = data.campaigns;
  } catch (error) {
    console.error('Failed to fetch campaigns:', error);
    // Return empty state if API fails
  }

  // Calculate summary metrics
  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;

  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalDailyBudget = campaigns.reduce((sum, c) => sum + c.daily_budget, 0);
  const activeBudget = campaigns
    .filter(c => c.status === 'active')
    .reduce((sum, c) => sum + c.budget, 0);

  // Calculate performance metrics
  // If API provides these values, use them; otherwise calculate mock values
  const totalClicks = campaigns.reduce((sum, c) => sum + (c.clicks || 0), 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + (c.conversions || 0), 0);
  const totalSpend = campaigns.reduce((sum, c) => sum + (c.budget * 0.3), 0); // Mock: assume 30% of budget spent

  // Calculate averages
  const avgCTR = campaigns.length > 0
    ? campaigns.reduce((sum, c) => sum + (c.ctr || 4.42), 0) / campaigns.length
    : 4.42;

  const avgConversionRate = campaigns.length > 0 && totalClicks > 0
    ? (totalConversions / totalClicks) * 100
    : campaigns.length > 0
      ? campaigns.reduce((sum, c) => sum + (c.conversion_rate || 4.74), 0) / campaigns.length
      : 4.74;

  const avgCPC = totalClicks > 0
    ? totalSpend / totalClicks
    : campaigns.length > 0
      ? campaigns.reduce((sum, c) => sum + (c.cpc || 2.26), 0) / campaigns.length
      : 2.26;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Campaign Insights</h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {campaigns.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center animate-fade-in transition-colors duration-300">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Unable to load campaigns</h2>
            <p className="text-gray-600 dark:text-gray-400">Please check your connection and try again.</p>
          </div>
        ) : (
          <>
            {/* Performance Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <SummaryCard
                  title="Avg CTR"
                  value={`${avgCTR.toFixed(2)}%`}
                />
              </div>
              <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <SummaryCard
                  title="Avg Conversion Rate"
                  value={`${avgConversionRate.toFixed(2)}%`}
                />
              </div>
              <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <SummaryCard
                  title="Avg CPC"
                  value={formatCurrency(avgCPC)}
                />
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="animate-scale-in" style={{ animationDelay: '0.4s' }}>
                <StatusPieChart campaigns={campaigns} />
              </div>
              <div className="animate-scale-in" style={{ animationDelay: '0.5s' }}>
                <ClicksConversionsChart campaigns={campaigns} />
              </div>
            </div>

            {/* Campaign Table */}
            <div className="mb-8">
              <CampaignTable campaigns={campaigns} />
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Mixo Ads Campaign Dashboard
          </p>
        </div>
      </footer>
    </div>
  );
}
