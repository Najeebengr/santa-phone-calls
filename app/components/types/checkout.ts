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
    id: string;
    packageName: string;
    price: number;
    totalAmount: number;
    planId: number;
    hasRecording: boolean;
    selectedSlot: string;
    selectedTimezone: string;
    parentEmail: string;
    parentPhone: string;
    parentName: string;
    children: Array<Child>;
    callNow: boolean;
    when?: number | null;
    recipientName?: string;
    recipientPhone?: string;
  }