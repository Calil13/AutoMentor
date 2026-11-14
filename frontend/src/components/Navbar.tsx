import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Car, 
  FileText, 
  Compass, 
  BookOpen, 
  User, 
  LogOut, 
  Menu, 
  X,
  LogIn,
  UserPlus,
  ChevronDown,
  GraduationCap
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lessonsDropdownOpen, setLessonsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleExamClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      navigate('/login?redirect=/exam');
    }
  };

  const isLessonsActive = location.pathname.startsWith('/chapters') || location.pathname.startsWith('/road-signs');

  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-900 font-bold shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Car className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Auto<span className="text-emerald-400">Mentor</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                location.pathname === '/'
                  ? 'text-emerald-400 bg-slate-800'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Ana Səhifə
            </Link>

            {/* Exam Button */}
            <Link
              to="/exam"
              onClick={handleExamClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-md ${
                location.pathname === '/exam'
                  ? 'bg-emerald-600 text-white shadow-emerald-500/25 ring-2 ring-emerald-400'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20 hover:scale-105'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Exam (İmtahan)</span>
            </Link>

            {/* Lessons Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLessonsDropdownOpen(!lessonsDropdownOpen)}
                onBlur={() => setTimeout(() => setLessonsDropdownOpen(false), 200)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isLessonsActive
                    ? 'text-emerald-400 bg-slate-800'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Lessons (Dərslər)</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${lessonsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {lessonsDropdownOpen && (
                <div className="absolute left-0 mt-2 w-60 rounded-2xl bg-slate-800 border border-slate-700 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    to="/chapters"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-200 hover:text-white hover:bg-slate-700/70 transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <div>
                      <div className="font-bold">Chapters (Fəsillər)</div>
                      <div className="text-xs text-slate-400">Kitabdakı mövzular və testlər</div>
                    </div>
                  </Link>

                  <Link
                    to="/road-signs"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-200 hover:text-white hover:bg-slate-700/70 transition-colors"
                  >
                    <Compass className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <div>
                      <div className="font-bold">Yol Nişanları</div>
                      <div className="text-xs text-slate-400">Bütün nişanlar və izahları</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* User Auth Info */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-medium text-slate-200 border border-slate-700 transition-colors"
                >
                  <User className="w-4 h-4 text-emerald-400" />
                  <span>{user?.fullName || 'Profil'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                  title="Çıxış"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Daxil ol
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  Qeydiyyat
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 pt-3 pb-6 space-y-2">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:bg-slate-800/80 hover:text-white"
          >
            <Car className="w-5 h-5" />
            Ana Səhifə
          </Link>
          <Link
            to="/exam"
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleExamClick(e);
            }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-bold text-white bg-emerald-600"
          >
            <FileText className="w-5 h-5" />
            Exam (Qarışıq İmtahan)
          </Link>
          <Link
            to="/chapters"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:bg-slate-800/80 hover:text-white"
          >
            <BookOpen className="w-5 h-5 text-emerald-400" />
            Lessons: Chapters (Fəsillər)
          </Link>
          <Link
            to="/road-signs"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:bg-slate-800/80 hover:text-white"
          >
            <Compass className="w-5 h-5 text-cyan-400" />
            Lessons: Yol Nişanları
          </Link>

          <div className="pt-4 border-t border-slate-800">
            {isAuthenticated ? (
              <div className="space-y-2">
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 text-base font-medium text-emerald-400"
                >
                  <User className="w-5 h-5" />
                  {user?.fullName || 'Profil'}
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-3 w-full text-left px-3 py-2 text-base font-medium text-rose-400 hover:bg-slate-800 rounded-lg"
                >
                  <LogOut className="w-5 h-5" />
                  Çıxış et
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-slate-800 text-white font-medium"
                >
                  <LogIn className="w-4 h-4" />
                  Daxil ol
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-emerald-500 text-white font-medium"
                >
                  <UserPlus className="w-4 h-4" />
                  Qeydiyyatdan keç
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
