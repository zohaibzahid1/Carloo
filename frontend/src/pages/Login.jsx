import React from 'react';
import LoginForm from '../components/authentication/LoginForm';
import LoginVisual from '../components/authentication/LoginVisual';
import Layout from '../components/layout/Layout';
import Register from './Register';
const LoginPage = () => {
  return (
    <Layout>
    <div className="min-h-screen flex flex-col md:flex-row my-4">
      <LoginVisual />
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-sm text-gray-600">
              Please sign in to your account
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default LoginPage;