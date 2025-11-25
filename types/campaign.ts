export type CampaignStatus = 'active' | 'paused' | 'completed';

export type Platform = 'meta' | 'google' | 'linkedin' | 'other';

export interface Campaign {
    id: string;
    name: string;
    brand_id: string;
    status: CampaignStatus;
    budget: number;
    daily_budget: number;
    platforms: Platform[];
    created_at: string;
    // Performance metrics (optional - may not be in API response)
    ctr?: number; // Click-through rate as percentage
    conversion_rate?: number; // Conversion rate as percentage
    cpc?: number; // Cost per click in USD
    clicks?: number;
    conversions?: number;
}

export interface CampaignsResponse {
    campaigns: Campaign[];
    total: number;
}

export interface CampaignResponse {
    campaign: Campaign;
}

