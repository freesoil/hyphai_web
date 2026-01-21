
export type Operation = 'Bed-making' | 'Transplanting' | 'Plastic Mulching' | 'Inter-row Weeding';
export type PowerType = 'Towed-behind' | 'Self-powered' | 'Manual-assist';
export type Scale = '1 Row' | '2 Rows' | '3 Rows' | 'Custom';
export type SoilType = 'Sandy' | 'Clay' | 'Loamy' | 'Rocky';
export type CropCategory = 'Berries' | 'Leafy Greens' | 'Root Veg' | 'Alliums' | 'Brassicas' | 'Other';

export interface Configuration {
  crop: CropCategory;
  operation: Operation;
  power: PowerType;
  scale: Scale;
  soil: SoilType;
  specialRequirements: string;
}

export interface ServiceApplication {
  acres: number;
  startDate: string;
  primaryReason: 'Labor Shortage' | 'Capex Avoidance' | 'Test Before Purchase' | 'Expert Execution';
  location: string;
  phone: string;
}

export interface BuildStatus {
  step: 'Parts Sourced' | 'Assembly' | 'Port of Shanghai' | 'In Transit' | 'Delivered';
  percentage: number;
  lastUpdated: string;
  factoryPhoto?: string;
}
