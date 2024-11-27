import React, { Suspense } from 'react';
; // Your client component
import Loader from '../components/Loader'; // Fallback loader
import Info from '../components/Info';

export default function InfoPage() {
  return (
    <Suspense fallback={<Loader />}>
      <Info />
    </Suspense>
  );
}