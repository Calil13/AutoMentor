import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { UserPlus, Mail, KeyRound, User, Lock, AlertCircle, CheckCircle } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Step 1: Send OTP to email
  const handleStartRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await api.post('/auth/register/start', { email });
      setSuccess('Təsdiq kodu email ünvanınıza göndərildi.');
      setStep(2);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'OTP göndərilərkən xəta baş verdi. Email ünvanını yoxlayın.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await api.post('/auth/register/verify', { email, otp });
      setSuccess('Kod uğurla təsdiqləndi! İndi məlumatlarınızı tamamlayın.');
      setStep(3);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Daxil edilən OTP kod yanlışdır və ya vaxtı bitib.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Finish Register
  const handleFinishRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Şifrələr bir-biri ilə uyğun gəlmir!');
      return;
    }

    if (password.length < 6) {
      setError('Şifrə ən azı 6 simvoldan ibarət olmalıdır.');
      return;
    }

    setIsLoading(true);

    try {
      await api.post('/auth/register/finish', {
        email,
        fullName,
        password,
      });
      setSuccess('Qeydiyyat uğurla tamamlandı! Giriş səhifəsinə yönləndirilirsiniz...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Qeydiyyat tamamlana bilmədi. Zəhmət olmasa yenidən yoxlayın.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-3xl shadow-xl border border-slate-200/80">
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <UserPlus className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">Hesab Yaradın</h2>
        <p className="text-slate-500 text-sm mt-1">
          {step === 1 && 'Email ünvanınızı daxil edin'}
          {step === 2 && 'Emailinizə göndərilən 6 rəqəmli OTP kodu yazın'}
          {step === 3 && 'Ad və şifrənizi təyin edin'}
        </p>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className={`h-2 rounded-full transition-all ${step >= 1 ? 'w-8 bg-emerald-500' : 'w-2 bg-slate-200'}`} />
          <div className={`h-2 rounded-full transition-all ${step >= 2 ? 'w-8 bg-emerald-500' : 'w-2 bg-slate-200'}`} />
          <div className={`h-2 rounded-full transition-all ${step === 3 ? 'w-8 bg-emerald-500' : 'w-2 bg-slate-200'}`} />
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm flex items-start gap-3">
          <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{success}</span>
        </div>
      )}

      {/* STEP 1: Enter Email */}
      {step === 1 && (
        <form onSubmit={handleStartRegister} className="space-y-5">
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span>OTP Kodu Göndər</span>
            )}
          </button>
        </form>
      )}

      {/* STEP 2: Enter OTP */}
      {step === 2 && (
        <form onSubmit={handleVerifyOtp} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Təsdiq Kodu (OTP)
            </label>
            <div className="relative">
              <KeyRound className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                maxLength={8}
                className="w-full pl-11 pr-4 py-3 text-center tracking-widest text-lg font-bold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">
              Kod {email} ünvanına göndərildi.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-1/3 py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all"
            >
              Geri
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="w-2/3 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span>Təsdiq Et</span>
              )}
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: Complete Name & Password */}
      {step === 3 && (
        <form onSubmit={handleFinishRegister} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Ad və Soyad
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Məs: Cəlil Əhmədov"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Şifrə Təyin Edin
            </label>
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

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Şifrənin Təkrarı
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span>Qeydiyyatı Tamamla</span>
            )}
          </button>
        </form>
      )}

      <div className="mt-8 text-center text-sm text-slate-500">
        Artıq hesabınız var?{' '}
        <Link to="/login" className="font-bold text-emerald-600 hover:text-emerald-700">
          Daxil olun
        </Link>
      </div>
    </div>
  );
};
