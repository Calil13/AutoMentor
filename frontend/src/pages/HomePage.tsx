import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  BookOpen, 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  GraduationCap, 
  Lock,
  Zap,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleStartExam = () => {
    if (!isAuthenticated) {
      // Exam butonuna basan zaman login tələb olunur
      navigate('/login?redirect=/exam');
    } else {
      navigate('/exam');
    }
  };

  return (
    <div className="space-y-12 py-6">
      {/* Top Banner / Welcome */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          Rəsmi DYP İmtahan Standartı
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Sürücülük İmtahanına <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
            Professional Hazırlıq
          </span> Platforması
        </h1>
        <p className="text-slate-600 text-base sm:text-lg">
          Nəzəri bilikləri fəsillər və yol nişanları üzrə öyrənin, sınaq imtahanı ilə biliklərinizi test edin.
        </p>
      </div>

      {/* 2 MAIN CORE PORTALS: EXAM & LESSONS */}
      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        
        {/* ================= 1. EXAM CARD ================= */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white p-8 sm:p-10 shadow-2xl border border-slate-700/60 flex flex-col justify-between group hover:border-emerald-500/50 transition-all">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/25 transition-all"></div>
          
          <div className="space-y-6 relative z-10">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                <FileText className="w-7 h-7" />
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                {!isAuthenticated ? <Lock className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5" />}
                {!isAuthenticated ? 'Giriş tələb olunur' : 'Aktivdir'}
              </span>
            </div>

            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2">
                EXAM (İmtahan Mərkəzi)
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                İmtahan zalına daxil olaraq biliklərinizi real DYP standartlarında yoxlayın.
              </p>
            </div>

            {/* Sub-item: Qarışıq İmtahan */}
            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Qarışıq İmtahan</h3>
                  <p className="text-xs text-slate-400">Bütün fəsillərə aid random 10 sual</p>
                </div>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 pl-2 border-l-2 border-emerald-500/40">
                <li>• 10 təsadüfi sual (Bütün fəsillərə aid)</li>
                <li>• 30 dəqiqə geri sayım taymeri</li>
                <li>• İmtahan bitdikdə ətraflı nəticə hesabatı</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 relative z-10">
            <button
              onClick={handleStartExam}
              className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 font-extrabold text-white text-base shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
            >
              <span>Qarışıq İmtahana Başla</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            {!isAuthenticated && (
              <p className="text-center text-xs text-slate-400 mt-2.5">
                * Exam düyməsinə kliklədikdə hesabınıza daxil olmanız tələb olunacaq.
              </p>
            )}
          </div>
        </div>

        {/* ================= 2. LESSONS CARD ================= */}
        <div className="relative overflow-hidden rounded-3xl bg-white text-slate-900 p-8 sm:p-10 shadow-xl border border-slate-200/90 flex flex-col justify-between group hover:border-indigo-400 transition-all">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
                <GraduationCap className="w-7 h-7" />
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
                Nəzəri Məlumatlar
              </span>
            </div>

            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">
                LESSONS (Dərslər)
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Bu bölmədə yalnız nəzəri materiallar, qaydalar və yol nişanları toplanmışdır:
              </p>
            </div>

            {/* Sub-items Grid */}
            <div className="space-y-4">
              {/* 1. Chapters */}
              <div
                onClick={() => navigate('/chapters')}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 cursor-pointer transition-all group/item"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base group-hover/item:text-indigo-600 transition-colors">
                        1. Chapters (Fəsillər)
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Kitabdakı fəsillərə uyğun hissələr (Chapter 1, 2... n). Hər fəslin daxilində tam nəzəri qaydalar və izahlar.
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover/item:text-indigo-600 group-hover/item:translate-x-1 transition-all" />
                </div>
              </div>

              {/* 2. Yol Nişanları */}
              <div
                onClick={() => navigate('/road-signs')}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/40 cursor-pointer transition-all group/item"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-sm">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base group-hover/item:text-cyan-700 transition-colors">
                        2. Yol Nişanları Kataloqu
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Ancaq yol nişanlarının şəkilləri, kateqoriyaları və onlar haqqında dəqiq məlumatlar.
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover/item:text-cyan-700 group-hover/item:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button
              onClick={() => navigate('/chapters')}
              className="w-full py-4 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 font-extrabold text-white text-base shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
            >
              <span>Nəzəriyyəyə Bax (Lessons)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

      {/* Quick Overview Features */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-6 pt-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Random 10 Sual</h4>
            <p className="text-xs text-slate-500 mt-1">Hər dəfə fərqli suallarla biliklərinizi hərtərəfli yoxlayın.</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Fəsil üzrə Testlər</h4>
            <p className="text-xs text-slate-500 mt-1">İstənilən fəslin daxilindəki suallara klik edib həmin bölmənin imtahanını işləyin.</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-cyan-100 text-cyan-600 rounded-xl">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Şəkilli Nişanlar</h4>
            <p className="text-xs text-slate-500 mt-1">Bütün kateqoriyalara aid yol nişanlarını axtarışla rahat tapın.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
