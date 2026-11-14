import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { 
  User, 
  Mail, 
  Lock, 
  CheckCircle, 
  AlertCircle, 
  Save, 
  Trash2, 
  KeyRound 
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, isAuthenticated, isLoading: authLoading, refreshUserData, logout } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [deletePassword, setDeletePassword] = useState('');

  const [nameMsg, setNameMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [passMsg, setPassMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [deleteMsg, setDeleteMsg] = useState<string | null>(null);

  const [isUpdatingName, setIsUpdatingName] = useState(false);
  const [isUpdatingPass, setIsUpdatingPass] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
    if (user?.fullName) {
      setFullName(user.fullName);
    }
  }, [authLoading, isAuthenticated, user, navigate]);

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameMsg(null);
    setIsUpdatingName(true);

    try {
      await api.patch('/users/update/full-name', { fullName });
      setNameMsg({ type: 'success', text: 'Ad və soyadınız uğurla yeniləndi.' });
      await refreshUserData();
    } catch (err: any) {
      console.error(err);
      setNameMsg({ type: 'error', text: err.response?.data?.message || 'Xəta baş verdi.' });
    } finally {
      setIsUpdatingName(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassMsg(null);

    if (newPassword !== confirmNewPassword) {
      setPassMsg({ type: 'error', text: 'Yeni şifrələr bir-biri ilə eyni deyil!' });
      return;
    }

    setIsUpdatingPass(true);

    try {
      await api.patch('/users/update/password', {
        currentPassword,
        newPassword,
        confirmNewPassword,
      });
      setPassMsg({ type: 'success', text: 'Şifrəniz uğurla dəyişdirildi.' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err: any) {
      console.error(err);
      setPassMsg({ type: 'error', text: err.response?.data?.message || 'Cari şifrə yanlışdır və ya xəta baş verdi.' });
    } finally {
      setIsUpdatingPass(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      setDeleteMsg('Hesabı silmək üçün cari şifrənizi daxil etməlisiniz.');
      return;
    }

    if (!window.confirm('Hesabınızı birdəfəlik silmək istədiyinizdən tam əminsiniz? Bu əməliyyat geri qaytarıla bilməz!')) {
      return;
    }

    setIsDeleting(true);
    setDeleteMsg(null);

    try {
      await api.delete('/users/delete', {
        data: { password: deletePassword },
      });
      await logout();
      navigate('/login');
    } catch (err: any) {
      console.error(err);
      setDeleteMsg(err.response?.data?.message || 'Hesab silinərkən xəta baş verdi. Şifrəni yoxlayın.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8">
      {/* User Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white text-3xl font-extrabold shadow-lg shadow-emerald-500/20">
          {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
        </div>
        <div className="text-center sm:text-left flex-1">
          <h1 className="text-2xl font-extrabold text-slate-900">{user?.fullName || 'İstifadəçi'}</h1>
          <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-500 text-sm mt-1">
            <Mail className="w-4 h-4 text-emerald-500" />
            <span>{user?.email}</span>
          </div>
        </div>
      </div>

      {/* Update Full Name */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <User className="w-5 h-5 text-emerald-600" />
          Şəxsi Məlumatlar
        </h2>

        {nameMsg && (
          <div className={`p-4 rounded-xl text-sm flex items-center gap-3 ${
            nameMsg.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
          }`}>
            {nameMsg.type === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
            <span>{nameMsg.text}</span>
          </div>
        )}

        <form onSubmit={handleUpdateName} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Ad və Soyad
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isUpdatingName}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            Yadda Saxla
          </button>
        </form>
      </div>

      {/* Update Password */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-emerald-600" />
          Şifrəni Dəyiş
        </h2>

        {passMsg && (
          <div className={`p-4 rounded-xl text-sm flex items-center gap-3 ${
            passMsg.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
          }`}>
            {passMsg.type === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
            <span>{passMsg.text}</span>
          </div>
        )}

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Cari Şifrə
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Yeni Şifrə
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Yeni Şifrə Təkrarı
              </label>
              <input
                type="password"
                required
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isUpdatingPass}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all disabled:opacity-50"
          >
            <Lock className="w-4 h-4" />
            Şifrəni Yenilə
          </button>
        </form>
      </div>

      {/* Danger Zone: Delete Account */}
      <div className="bg-rose-50/50 rounded-3xl p-6 sm:p-8 border border-rose-200/80 space-y-4">
        <h2 className="text-lg font-bold text-rose-700 flex items-center gap-2">
          <Trash2 className="w-5 h-5" />
          Hesabı Sil
        </h2>
        <p className="text-xs text-rose-600/90 leading-relaxed">
          Diqqət: Hesabınızı sildiyiniz zaman bütün imtahan nəticələriniz və məlumatlarınız geri qaytarılmamaq şərtilə silinəcək.
        </p>

        {deleteMsg && (
          <div className="p-3 rounded-xl bg-rose-100 text-rose-800 text-xs font-semibold">
            {deleteMsg}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <input
            type="password"
            placeholder="Təsdiq üçün cari şifrənizi yazın"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-white"
          />
          <button
            type="button"
            onClick={handleDeleteAccount}
            disabled={isDeleting}
            className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-all disabled:opacity-50 flex-shrink-0"
          >
            Hesabı Birdəfəlik Sil
          </button>
        </div>
      </div>
    </div>
  );
};
