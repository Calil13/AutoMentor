import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { LogIn, Mail, Lock, AlertCircle, Shield, Info } from 'lucide-react';
import { AuthResponseDto } from '../types';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/exam';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const endpoint = isAdmin ? '/auth/admin/login' : '/auth/login';
      const response = await api.post<AuthResponseDto>(endpoint, { email, password });
      
      await login(response.data.accessToken, response.data.refreshToken);
      navigate(redirectUrl);
    } catch (err: any) {
      console.error('Login failed:', err);
      const msg = err.response?.data?.message || 'Email və ya şifrə yanlışdır. Yenidən cəhd edin.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-3xl shadow-xl border border-slate-200/80">
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          {isAdmin ? <Shield className="w-7 h-7" /> : <LogIn className="w-7 h-7" />}
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">
          {isAdmin ? 'Admin Panelə Giriş' : 'AutoMentor-a Giriş'}
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          {isAdmin ? 'İnzibatçı məlumatlarınızla daxil olun' : 'Hesabınıza daxil olaraq testlərə davam edin'}
        </p>
      </div>

      {searchParams.get('redirect') && (
        <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold flex items-center gap-2.5">
          <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>İmtahana başlamaq üçün əvvəlcə hesabınıza daxil olmalısınız.</span>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Email Ünvanı
          </label>
          <div className="relative">
            <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nümunə@mail.com"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Şifrə
            </label>
            <Link to="/forgot-password" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">
              Şifrəni unutmusunuz?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 font-medium">
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
            />
            <span>Admin kimi daxil ol</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              <span>Daxil Ol</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-slate-500">
        Hesabınız yoxdur?{' '}
        <Link to="/register" className="font-bold text-emerald-600 hover:text-emerald-700">
          Qeydiyyatdan keçin
        </Link>
      </div>
    </div>
  );
};
