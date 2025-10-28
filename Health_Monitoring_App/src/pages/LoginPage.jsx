import React, { useContext } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useContext(AuthContext);

  const handleGoogleSuccess = async (credentialResponse) => {
    console.log(credentialResponse);
    try {
      const res = await axios.post('http://localhost:3001/api/users/google-signin', {
        credential: credentialResponse.credential,
      });
      login(res.data);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  const handleGoogleError = () => {
    console.log('Login Failed');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome to HealthPulse</h1>
          <p className="text-gray-500 mt-2">Sign in to continue</p>
        </div>

        <div className="flex items-center justify-center">
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
            />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
