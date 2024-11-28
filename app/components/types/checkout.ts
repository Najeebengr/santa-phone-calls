// types/checkout.ts
export interface Child {
    name: string;
    age: number;
    gender: string;
    connections: string;
    details: string;
    hobbies: string;
  }
  
  export interface CheckoutPageProps {
    // Payment Info
    packageName: string;
    totalAmount: number;
    planId: number;
    hasRecording: boolean;
  
    // Contact Info
    parentName: string;
    parentEmail: string;
    parentPhone: string;
    
    // Children Info
    children: Child[];
    
    // Appointment Info
    selectedSlot: string;
    selectedTimezone: string;
    callNow: boolean;
    when?: number | null;

    recipientName?: string;
    recipientPhone?: string;
  }