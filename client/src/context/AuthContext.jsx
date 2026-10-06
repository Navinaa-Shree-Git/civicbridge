import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginUser, registerUser, logoutUser } from '../services/authService';

const AuthContext = createContext(null);
const KEY = 'civicbridge_user';
const AUTH_KEY = 'auth_user';

const demoUsers = [
  { id: 'user-priya', name: 'Priya Sharma', email: 'priya.sharma@example.com', age: 21, gender: 'Female', state: 'Tamil Nadu', district: 'Chennai', city: 'Chennai', residence: 'Urban', education: 'Undergraduate', employment: 'Student', occupation: 'B.Tech Student', income: 450000, householdSize: 4, dependents: 1, interests: ['Education', 'Skill Development', 'Employment', 'Digital Literacy'] },
  { id: 'user-arun', name: 'Arun Kumar', email: 'arun.kumar@example.com', age: 29, gender: 'Male', state: 'Tamil Nadu', district: 'Coimbatore', city: 'Coimbatore', residence: 'Urban', education: 'Graduate', employment: 'Self-employed', occupation: 'Small Business Owner', income: 380000, householdSize: 3, dependents: 2, interests: ['Entrepreneurship', 'Skill Development', 'Financial Assistance', 'Renewable Energy'] },
  { id: 'user-lakshmi', name: 'Lakshmi Narayanan', email: 'lakshmi.farmer@example.com', age: 44, gender: 'Male', state: 'Tamil Nadu', district: 'Madurai', city: 'Madurai', residence: 'Rural', education: 'High School', employment: 'Self-employed', occupation: 'Farmer', income: 240000, householdSize: 5, dependents: 3, interests: ['Agriculture', 'Renewable Energy', 'Housing'] },
  { id: 'user-meenakshi', name: 'Meenakshi Sundaram', email: 'meenakshi.senior@example.com', age: 64, gender: 'Female', state: 'Tamil Nadu', district: 'Tiruchirappalli', city: 'Tiruchirappalli', residence: 'Urban', education: 'High School', employment: 'Unemployed', occupation: 'Retired / Homemaker', income: 150000, householdSize: 2, dependents: 0, interests: ['Healthcare', 'Social Security', 'Women Welfare'] }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(KEY) || localStorage.getItem(AUTH_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(KEY, JSON.stringify(user));
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(KEY);
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem('auth_token');
    }
  }, [user]);

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    setUser(data.user);
    return data;
  };

  const register = async (userData) => {
    const data = await registerUser(userData);
    setUser(data.user);
    return data;
  };

  const loginWithGoogle = async (email) => {
    const selected = demoUsers.find((u) => u.email === email) || demoUsers[0];
    setUser(selected);
    return selected;
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, demoUsers, login, register, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
