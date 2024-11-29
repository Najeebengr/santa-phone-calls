'use client'

import Link from 'next/link'
import { CheckCircle2, Calendar, ArrowRight } from 'lucide-react'
import { trackPageView, trackPurchase } from '../utils/analytics'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

// Separate component to handle search params
function SuccessContent() {
  const searchParams = useSearchParams()
  const amount = searchParams.get('totalAmount') || '0.00'
  const rawPackageName = searchParams.get('packageName') || 'Package'
  const packageName = rawPackageName.replace(/\+/g, ' ')
  const paymentIntent = searchParams.get('payment_intent')
  const redirectStatus = searchParams.get('redirect_status')
  const email = searchParams.get('email')
  const phone = searchParams.get('phone')
  
  useEffect(() => {
    trackPageView('success');
    if (paymentIntent && redirectStatus === 'succeeded') {
      trackPurchase(
        paymentIntent,
        parseFloat(amount),
        packageName,
        {
          email: email || undefined,
          phone: phone || undefined
        }
      );
    }
  }, [paymentIntent, redirectStatus, amount, packageName, email, phone]);

  return (
    <div 
      className="w-full max-w-2xl mx-auto rounded-2xl p-8 backdrop-blur-xl"
      style={{
        background: 'linear-gradient(176.55deg, #51422F -9.63%, #121212 97.16%)',
        border: '3px solid #D9C999CC',
        boxShadow: '0px 0px 40px 0px #00000080 inset',
      }}
    >
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-16 h-16 mb-6 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(92.63deg, #D7C798 34.94%, #EDE4CC 53.8%, #D7C798 78.45%)',
          }}
        >
          <CheckCircle2 className="w-8 h-8 text-[#51422F]" />
        </div>
        
        <h1 
          className="text-4xl md:text-5xl font-seasons text-white mb-4"
          style={{ textShadow: "0 0 20px #FCCC73" }}
        >
          Thank You&#33;	
        </h1>
        
        <p className="text-xl md:text-2xl font-harmonia text-[#D7C798] mb-2">
          Your Magical Call with Santa is Confirmed
        </p>
        
        <p className="text-lg font-harmonia text-white/80">
          Order #{paymentIntent?.slice(-6)}
        </p>
      </div>

      <div className="space-y-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center p-4 rounded-xl bg-white/5">
          <div className="flex items-center gap-3 mb-3 md:mb-0">
            <Calendar className="w-5 h-5 text-[#D7C798]" />
            <span className="font-harmonia text-white">{packageName}</span>
          </div>
          <span className="font-harmonia text-[#D7C798]">${amount}</span>
        </div>

        <div className="p-4 rounded-xl bg-white/5">
          <p className="font-harmonia text-white/80 text-center">
            Check your email for your booking confirmation and instructions for your upcoming call with Santa!
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          href="/"
          className="flex items-center justify-center gap-2 px-8 py-3 rounded-full font-seasons text-lg font-bold transition-transform hover:scale-105"
          style={{
            background: 'linear-gradient(92.63deg, #D7C798 34.94%, #EDE4CC 53.8%, #D7C798 78.45%)',
            color: '#51422F',
          }}
        >
          Return Home
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
      <div className="mt-8 text-center">
        <p className="font-harmonia text-white/80 text-md">
          Need help? Contact us at{' '}
          <a href="mailto:support@santaphonecalls.com" className="text-[#D7C798] hover:underline">
            support@santaphonecalls.com
          </a>
        </p>
      </div>
    </div>
  )
}

// Loading component
function Loading() {
  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl p-8 backdrop-blur-xl text-center">
      <p className="text-white">Loading...</p>
    </div>
  )
}

// Main Success component
function Success() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div 
        className="fixed inset-0 bg-[url('/christmas.jpeg')] bg-cover bg-center bg-no-repeat"
        aria-hidden="true"
      />
      <div 
        className="fixed inset-0 bg-gradient-to-b from-black/30 to-transparent"
        aria-hidden="true"
      />
      
      <main className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col items-center justify-center">
        <Suspense fallback={<Loading />}>
          <SuccessContent />
        </Suspense>
      </main>
    </section>
  )
}

export default Success