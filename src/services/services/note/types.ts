// src/services/services/note/types.ts

export interface ServiceNoteItem {
  id: number;
  serviceType: string;
  vehicleType: string;
  startingPrice: string;
  vehicleCapacity: string;
  luggages: string;
  withDriverPrice: string;
  withGuidePrice: string;
  withDriverAndGuidePrice: string;
  notes: string[];
  createdAt: string;
  updatedAt: string;
}