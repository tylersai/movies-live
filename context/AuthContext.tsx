'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ACCESS_TOKEN_KEY } from '@/utils/constant';

interface AuthContextType {
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
      setIsLogged(true);
    }
  }, []);

  return <AuthContext.Provider value={{ isLogged, setIsLogged }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
