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
}

export interface CampaignsResponse {
    campaigns: Campaign[];
    total: number;
}

export interface CampaignResponse {
    campaign: Campaign;
}

