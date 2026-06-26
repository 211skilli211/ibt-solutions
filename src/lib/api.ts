const ISLANDHUB_API_URL = process.env.NEXT_PUBLIC_ISLANDHUB_API_URL || 'https://islandhub-render.onrender.com';

export interface ServiceInquiry {
  service_type: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  message?: string;
  budget_range?: string;
  source: string;
}

export interface AuditRequest {
  business_name: string;
  website?: string;
  email: string;
  phone?: string;
  request_type?: string;
}

export async function submitServiceInquiry(inquiry: ServiceInquiry) {
  try {
    const response = await fetch(`${ISLANDHUB_API_URL}/api/audit/inquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inquiry),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return { success: true, data: await response.json() };
  } catch (error) {
    console.error('Failed to submit inquiry:', error);
    return { success: false, error: String(error) };
  }
}

export async function submitAuditRequest(request: AuditRequest) {
  try {
    const response = await fetch(`${ISLANDHUB_API_URL}/api/audit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return { success: true, data: await response.json() };
  } catch (error) {
    console.error('Failed to submit audit request:', error);
    return { success: false, error: String(error) };
  }
}

export async function runBusinessAudit(auditId: number) {
  try {
    const response = await fetch(`${ISLANDHUB_API_URL}/api/audit/${auditId}/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return { success: true, data: await response.json() };
  } catch (error) {
    console.error('Failed to run audit:', error);
    return { success: false, error: String(error) };
  }
}

export async function discoverBusinessesWithoutWebsites(country?: string, category?: string) {
  try {
    const params = new URLSearchParams();
    if (country) params.append('country', country);
    if (category) params.append('category', category);
    
    const response = await fetch(`${ISLANDHUB_API_URL}/api/audit/discover?${params}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return { success: true, data: await response.json() };
  } catch (error) {
    console.error('Failed to discover businesses:', error);
    return { success: false, error: String(error) };
  }
}