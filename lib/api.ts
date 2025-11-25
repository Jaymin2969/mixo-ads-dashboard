import { CampaignsResponse, CampaignResponse } from '@/types/campaign';

const API_BASE_URL = 'https://mixo-fe-backend-task.vercel.app';

export async function fetchCampaigns(status?: string): Promise<CampaignsResponse> {
    const url = status
        ? `${API_BASE_URL}/campaigns?status=${status}`
        : `${API_BASE_URL}/campaigns`;

    const response = await fetch(url, {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
        throw new Error('Failed to fetch campaigns');
    }

    return response.json();
}

export async function fetchCampaign(id: string): Promise<CampaignResponse> {
    const response = await fetch(`${API_BASE_URL}/campaigns/${id}`, {
        next: { revalidate: 60 },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch campaign');
    }

    return response.json();
}

