"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();

  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) {
      setErrorMessage('Invalid verification link.');
      setLoading(false);
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, email }),
        });

        const data = await response.json(); // Only call once

        if (!response.ok) {
          setErrorMessage(data.message || 'Verification failed. Please try again.');
          return;
        }

        if (data.success) {
          setIsVerified(true);
        } else {
          setErrorMessage(data.message || 'Verification failed.');
        }
      } catch (error) {
        console.error('Error verifying email:', error);
        setErrorMessage('Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams]); // No need to depend on token, email separately

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  if (isVerified) {
    return <div>Email verified successfully!</div>;
  }

  return <div>Verification failed. Please check the link and try again.</div>;
};

export default VerifyEmailPage;
