
// Generic tracking types
type GtagEventParams = {
  page_title?: string;
  page_location?: string;
  page_path?: string;
  currency?: string;
  value?: number;
  transaction_id?: string;
  items?: TrackingItem[];
};

type GtagArgs = 
  | [string, string, GtagEventParams] 
  | [string, Date] 
  | [string, string];

type FbqEventParams = {
  currency?: string;
  value?: number;
  content_name?: string;
  content_type?: string;
  content_ids?: (string | number)[];
};

type FbqArgs = [string, string, FbqEventParams] | [string, string];

// TikTok types
interface TiktokEventParams {
  content_name?: string;
  content_type?: string;
  contents?: Array<{
    content_id: string;
    content_type: string;
    content_name: string;
    price: number;
  }>;
  value?: number;
  currency?: string;
  content_id?: string;
  email?: string;
  phone_number?: string;
}

interface TiktokMethods {
  track: (event: string, params?: TiktokEventParams) => void;
}

// Window interface
declare global {
  interface Window {
    gtag: (...args: GtagArgs) => void;
    fbq: (...args: FbqArgs) => void;
    ttq: TiktokMethods;
    dataLayer: unknown[];
  }
}

// Event interfaces
interface TrackingItem {
  item_id?: string;
  item_name: string;
  price: number;
  has_recording?: boolean;
}

interface Plan {
  id: number;
  name: string;
  price: number;
  hasRecording: boolean;
}

interface BaseEventData {
  currency: string;
  value: number;
  items: TrackingItem[];
}

export interface TrackingUserData {
  email?: string;
  phone?: string;
  fullName?: string;
}

export const trackPageView = (pageName: string): void => {
  if (typeof window === 'undefined') return;

  window.gtag?.('event', 'page_view', {
    page_title: pageName,
    page_location: window.location.href,
    page_path: window.location.pathname,
  });

  window.fbq?.('track', 'PageView');

  window.ttq?.track('ViewContent', {
    content_name: pageName,
    content_type: 'product_group',
  });
};

export const trackAddToCart = (plan: Plan): void => {
  if (typeof window === 'undefined') return;

  const eventData: BaseEventData = {
    currency: 'USD',
    value: plan.price,
    items: [{
      item_id: plan.id.toString(),
      item_name: plan.name,
      price: plan.price,
      has_recording: plan.hasRecording,
    }],
  };

  window.gtag?.('event', 'add_to_cart', eventData);

  window.fbq?.('track', 'AddToCart', {
    currency: 'USD',
    value: plan.price,
    content_name: plan.name,
    content_type: 'product',
    content_ids: [plan.id],
  });

  window.ttq?.track('AddToCart', {
    contents: [{
      content_id: plan.id.toString(),
      content_type: 'product',
      content_name: plan.name,
      price: plan.price,
    }],
    value: plan.price,
    currency: 'USD',
  });
};

export const trackCheckoutInitiated = (plan: Plan, userData?: TrackingUserData): void => {
  if (typeof window === 'undefined') return;

  const eventData: BaseEventData = {
    currency: 'USD',
    value: plan.price,
    items: [{
      item_id: plan.id.toString(),
      item_name: plan.name,
      price: plan.price,
      has_recording: plan.hasRecording,
    }],
  };

  window.gtag?.('event', 'begin_checkout', eventData);

  window.fbq?.('track', 'InitiateCheckout', {
    currency: 'USD',
    value: plan.price,
    content_name: plan.name,
    content_type: 'product',
    content_ids: [plan.id],
  });

  const tiktokEventData = {
    contents: [{
      content_id: plan.id.toString(),
      content_type: 'product',
      content_name: plan.name,
      price: plan.price,
    }],
    value: plan.price,
    currency: 'USD',
    content_id: plan.id.toString(),
    content_type: 'product',
    content_name: plan.name,
  };

  if (userData?.email) {
    Object.assign(tiktokEventData, { email: userData.email });
  }
  if (userData?.phone) {
    Object.assign(tiktokEventData, { phone_number: userData.phone });
  }

  window.ttq?.track('InitiateCheckout', tiktokEventData);
};

export const trackPurchase = (
  paymentIntentId: string,
  amount: number,
  packageName: string,
  userData?: TrackingUserData
): void => {
  if (typeof window === 'undefined') return;

  const eventData: BaseEventData = {
    currency: 'USD',
    value: amount,
    items: [{
      item_id: paymentIntentId,
      item_name: packageName,
      price: amount,
    }],
  };

  window.gtag?.('event', 'purchase', {
    ...eventData,
    transaction_id: paymentIntentId,
  });

  window.fbq?.('track', 'Purchase', {
    currency: 'USD',
    value: amount,
    content_name: packageName,
    content_type: 'product',
    content_ids: [paymentIntentId],
  });

  const tiktokEventData = {
    contents: [{
      content_id: paymentIntentId,
      content_type: 'product',
      content_name: packageName,
      price: amount,
    }],
    value: amount,
    currency: 'USD',
    content_id: paymentIntentId,
    content_type: 'product',
    content_name: packageName,
  };

  if (userData?.email) {
    Object.assign(tiktokEventData, { email: userData.email });
  }
  if (userData?.phone) {
    Object.assign(tiktokEventData, { phone_number: userData.phone });
  }

  window.ttq?.track('CompletePayment', tiktokEventData);
};