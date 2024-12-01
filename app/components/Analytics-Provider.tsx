import { TRACKING_IDS } from "../config/tracking";
import Script from "next/script";
import Image from "next/image";

export function AnalyticsProvider() {
  function GoogleAnalytics() {
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING_IDS.GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${TRACKING_IDS.GA_MEASUREMENT_ID}');
        `}
        </Script>
      </>
    );
  }

  function HyrosTracking() {
    return (
      <>
        <Script id="hyros-base" strategy="afterInteractive">
          {`
            window.hyrosSettings = window.hyrosSettings || {};
            window.hyrosSettings.ph = '04ff1b5fca6eeb38a77644bb978b85d0ec4e6c259f5c0e4f1b2b24af51ea5f17';
          `}
        </Script>
        <Script
          id="hyros-loader"
          strategy="afterInteractive"
          src={`https://t.santaphonecalls.com/v1/lst/universal-script?ph=04ff1b5fca6eeb38a77644bb978b85d0ec4e6c259f5c0e4f1b2b24af51ea5f17&tag=!clicked&ref_url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
        />
      </>
    );
  }

  function GoogleTagManager() {
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING_IDS.TAG_MANAGER_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${TRACKING_IDS.TAG_MANAGER_ID}');
        `}
        </Script>
      </>
    );
  }

  function MetaPixel() {
    return (
      <>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${TRACKING_IDS.META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
        </Script>
        <noscript>
          {/* 
            Since this is a tracking pixel, we'll use a priority attribute 
            and unoptimized to ensure it works as intended
          */}
          <Image
            priority
            unoptimized
            src={`https://www.facebook.com/tr?id=${TRACKING_IDS.META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
            width={1}
            height={1}
            style={{ display: "none" }}
          />
        </noscript>
      </>
    );
  }

  function TikTokPixel() {
    return (
      <Script id="tiktok-pixel" strategy="afterInteractive">
        {`
        !function (w, d, t) {
          w.TiktokAnalyticsObject=t;
          var ttq=w[t]=w[t]||[];
          ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
          ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
          for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
          ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
          ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
          ttq.load('${TRACKING_IDS.TIKTOK_PIXEL_ID}');
          ttq.page();
        }(window, document, 'ttq');
      `}
      </Script>
    );
  }

  return (
    <>
      <GoogleAnalytics />
      <GoogleTagManager />
      <MetaPixel />
      <TikTokPixel />
      <HyrosTracking />
    </>
  );
}
