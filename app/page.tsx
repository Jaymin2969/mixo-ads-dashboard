import { fetchCampaigns } from '@/lib/api';
import { Campaign } from '@/types/campaign';
import SummaryCard from '@/components/SummaryCard';
import CampaignTable from '@/components/CampaignTable';
import StatusChart from '@/components/StatusChart';
import PlatformChart from '@/components/PlatformChart';

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Campaign Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Monitor and manage your advertising campaigns
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {campaigns.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to load campaigns</h2>
            <p className="text-gray-600">Please check your connection and try again.</p>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <SummaryCard
                title="Total Campaigns"
                value={totalCampaigns}
                subtitle={`${activeCampaigns} active`}
              />
              <SummaryCard
                title="Active Campaigns"
                value={activeCampaigns}
                subtitle={`${((activeCampaigns / totalCampaigns) * 100).toFixed(1)}% of total`}
              />
              <SummaryCard
                title="Total Budget"
                value={formatCurrency(totalBudget)}
                subtitle={`${formatCurrency(totalDailyBudget)} daily`}
              />
              <SummaryCard
                title="Active Budget"
                value={formatCurrency(activeBudget)}
                subtitle={`${((activeBudget / totalBudget) * 100).toFixed(1)}% of total`}
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <StatusChart campaigns={campaigns} />
              <PlatformChart campaigns={campaigns} />
            </div>

            {/* Campaign Table */}
            <div className="mb-8">
              <CampaignTable campaigns={campaigns} />
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            Mixo Ads Campaign Dashboard
          </p>
        </div>
      </footer>
    </div>
  );
}
