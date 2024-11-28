import { TRACKING_IDS } from '../config/tracking';

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

type TiktokMethod = (...args: unknown[]) => void;

interface TiktokMethods {
  page: TiktokMethod;
  track: (event: string, params?: TiktokEventParams) => void;
  identify: TiktokMethod;
  instances: TiktokMethod;
  debug: TiktokMethod;
  on: TiktokMethod;
  off: TiktokMethod;
  once: TiktokMethod;
  ready: TiktokMethod;
  alias: TiktokMethod;
  group: TiktokMethod;
  enableCookie: TiktokMethod;
  disableCookie: TiktokMethod;
  setPCMDomain: (domain: string) => void;
  instance: (id: string) => TiktokMethods;
  load: (pixelId: string) => void;
  [key: string]: TiktokMethod | unknown;
}

interface TiktokInstance extends Array<unknown> {
  loaded?: boolean;
  push: (args: unknown[]) => number;
  methods: string[];
  setAndDefer: (target: unknown, method: string) => void;
  instance: (id: string) => TiktokMethods;
  load: (pixelId: string) => void;
  setPCMDomain: (domain: string) => void;
  page: () => void;
}

// Meta Pixel types
interface MetaPixelInstance {
  callMethod?: (...args: FbqArgs) => void;
  queue: FbqArgs[];
  push: MetaPixelInstance;
  loaded: boolean;
  version: string;
  (...args: FbqArgs): void;
}

// Window interface
declare global {
  interface Window {
    _fbq: MetaPixelInstance;
    gtag: (...args: GtagArgs) => void;
    fbq: (...args: FbqArgs) => void;
    ttq: TiktokMethods;
    dataLayer: unknown[];
    TiktokAnalyticsObject?: string;
    [key: string]: unknown;
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

interface TrackingUserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
}

export const initializeAnalytics = (): void => {
  // Google Analytics
  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${TRACKING_IDS.GA_MEASUREMENT_ID}`;
  document.head.appendChild(gaScript);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...params: GtagArgs): void {
    window.dataLayer.push(params);
  };
  window.gtag('js', new Date());
  window.gtag('config', TRACKING_IDS.GA_MEASUREMENT_ID);

  // Meta Pixel
  (function initMetaPixel(): void {
    if (typeof window.fbq === 'function') return;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';

    const fbq = (function(): MetaPixelInstance {
      const f = function(...params: FbqArgs): void {
        if (f.callMethod) {
          f.callMethod(...params);
        } else {
          f.queue.push(params);
        }
      } as unknown as MetaPixelInstance;
      
      f.queue = [];
      f.push = f;
      f.loaded = true;
      f.version = '2.0';
      
      return f;
    })();

    window.fbq = fbq;
    window._fbq = fbq;

    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  })();

  window.fbq('init', TRACKING_IDS.META_PIXEL_ID);

  // TikTok Pixel
  (function initTikTok(w: Window, d: Document, t: string): void {
    w.TiktokAnalyticsObject = t;
    const ttq: TiktokInstance = (w[t] = w[t] || []);
    
    ttq.methods = [
      "page","track","identify","instances","debug","on","off",
      "once","ready","alias","group","enableCookie","disableCookie"
    ];

    ttq.setAndDefer = function(target: TiktokMethods, method: string): void {
      target[method] = function(...methodParams: unknown[]): void {
        (target as unknown as TiktokInstance).push([method, ...methodParams]);
      };
    };

    ttq.methods.forEach(method => ttq.setAndDefer(ttq as unknown as TiktokMethods, method));

    ttq.instance = function(id: string): TiktokMethods {
      const instanceMethods = (w[t] as Record<string, unknown>)._i?.[id] || [];
      ttq.methods.forEach(method => ttq.setAndDefer(instanceMethods as TiktokMethods, method));
      return instanceMethods as TiktokMethods;
    };

    ttq.load = function(): void {
      const scriptUrl = "https://analytics.tiktok.com/i18n/pixel/events.js";
      ttq.setPCMDomain("santaphonecalls.com");
      
      setTimeout(() => {
        const script = d.createElement("script");
        script.src = scriptUrl;
        script.async = true;
        script.onload = (): void => {
          if (!(w[t] as TiktokInstance).loaded) {
            (w[t] as TiktokInstance).loaded = true;
            (w[t] as TiktokInstance).instance("").track("PageView");
          }
        };
        const firstScript = d.getElementsByTagName("script")[0];
        firstScript?.parentNode?.insertBefore(script, firstScript);
      }, 0);
    };

    ttq.load(TRACKING_IDS.TIKTOK_PIXEL_ID);
    ttq.page();
  })(window, document, 'ttq');
};

// Rest of the tracking functions remain the same

export const trackPageView = (pageName: string): void => {
  window.gtag('event', 'page_view', {
    page_title: pageName,
    page_location: window.location.href,
    page_path: window.location.pathname,
  });

  window.fbq('track', 'PageView');

  window.ttq.track('ViewContent', {
    content_name: pageName,
    content_type: 'product_group',
  });
};

export const trackAddToCart = (plan: Plan): void => {
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

  window.gtag('event', 'add_to_cart', eventData);

  window.fbq('track', 'AddToCart', {
    currency: 'USD',
    value: plan.price,
    content_name: plan.name,
    content_type: 'product',
    content_ids: [plan.id],
  });

  window.ttq.track('AddToCart', {
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

  window.gtag('event', 'begin_checkout', eventData);

  window.fbq('track', 'InitiateCheckout', {
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
  const eventData: BaseEventData = {
    currency: 'USD',
    value: amount,
    items: [{
      item_id: paymentIntentId,
      item_name: packageName,
      price: amount,
    }],
  };

  window.gtag('event', 'purchase', {
    ...eventData,
    transaction_id: paymentIntentId,
  });

  window.fbq('track', 'Purchase', {
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