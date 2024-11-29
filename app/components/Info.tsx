'use client';

import React, { useEffect, useState } from 'react';
import InfoFormWrapper from '../components/InfoFormWrapper';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Loader from '../components/Loader';

function Info() {
  const [userInfo, setUserInfo] = useState({ parentName: '', parentEmail: '', parentNumber: '' });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem('userFormData');
    if (!storedData) {
      toast.error('Please fill out your information first!');
      router.push('/');
      return;
    }

    try {
      const parsedData = JSON.parse(storedData);
      setUserInfo({
        childName: parsedData.childName || '',
        parentEmail: parsedData.parentEmail || '',
        parentNumber: parsedData.parentPhone || ''
      });
    } catch (error) {
      console.error('Error parsing stored data:', error);
      toast.error('Error loading your information');
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="bg-[url('/christmas.jpeg')] bg-cover bg-center bg-no-repeat min-h-screen w-full px-6 lg:px-6 xl:px-0 py-10 mx-auto relative z-10">
      <div className="relative z-30">
        <h2 className="text-4xl md:text-6xl 2xl:text-7xl font-black text-center font-seasons text-white">
          Personalize the Conversation
        </h2>
        <p className="text-lg my-4 font-medium md:text-4xl 2xl:text-4xl text-center font-seasons text-white">
          This part makes the call amazing
        </p>
      </div>
      <div><InfoFormWrapper userInfo={userInfo} /></div>
    </section>
  );
}

export default Info;