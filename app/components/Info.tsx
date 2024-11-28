'use client';

import React, { useEffect, useState, useCallback } from 'react';
import InfoFormWrapper from '../components/InfoFormWrapper';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import Loader from '../components/Loader';

function Info() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [userInfo, setUserInfo] = useState({ childName: '', parentEmail: '', parentNumber: '' });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const setLoginSession = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/loginSession', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
      } else {
        toast.error(result.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error during API call:', error);
      toast.error('An unexpected error occurred');
    }
    setLoading(false);
  };

  const getCurrenUser = useCallback(async () => {
    try {
      const response = await fetch('/api/currentUser', { method: 'GET' });
      const result = await response.json();

      if (response.ok) {
        if (!result.user.parentEmail) {
          toast.error('Kindly Fill out this Info First!');
          router.push('/');
          return;
        }
        setUserInfo(result.user);
      } else {
        toast.error(result.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error during API call:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, [router]); // Include router in dependencies since it's used inside the function

  useEffect(() => {
    const handleSessionAndUser = async () => {
      if (id) {
        await setLoginSession(id);
      }
      await getCurrenUser();
    };

    handleSessionAndUser();
  }, [id, getCurrenUser]);

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
      <div>{loading ? <Loader /> : userInfo.parentEmail && <InfoFormWrapper />}</div>
    </section>
  );
}

export default Info;