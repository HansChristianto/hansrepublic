// Service Category - Types of services offered by each brand
export type ServiceCategory =
  | "web-development"
  | "digital-marketing"
  | "affiliate-marketing"
  | "e-commerce"
  | "media";

// Service category display labels
export const SERVICE_CATEGORY_LABELS: Record<ServiceCategory, string> = {
  "web-development": "Web Development",
  "digital-marketing": "Digital Marketing",
  "affiliate-marketing": "Affiliate Marketing",
  "e-commerce": "E-Commerce",
  media: "Media",
};

// Brand entity
export interface Brand {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  logo?: string;
  imageUrl?: string;
  services: ServiceCategory[];
  websiteUrl?: string;
  order: number;
}

// Property Type - Types of digital properties
export type PropertyType = "website" | "webapp" | "api";

// Monitor Status - Health state of a digital property
export type MonitorStatus = "online" | "offline" | "unknown";

// Digital Property - A website or application that needs monitoring
export interface DigitalProperty {
  id: string;
  brandId: string;
  name: string;
  url: string;
  type: PropertyType;
  status: MonitorStatus;
  lastChecked: string;
  responseTime?: number;
  isPublic: boolean;
  monitorId?: string;
}

// Monitoring Summary
export interface MonitoringSummary {
  total: number;
  online: number;
  offline: number;
  unknown: number;
}

// Monitoring API Response
export interface MonitoringResponse {
  success: boolean;
  data?: {
    properties: DigitalProperty[];
    summary: MonitoringSummary;
    lastUpdated: string;
  };
  error?: {
    code: string;
    message: string;
  };
}

// Brand with computed properties
export interface BrandWithProperties extends Brand {
  properties?: DigitalProperty[];
}
