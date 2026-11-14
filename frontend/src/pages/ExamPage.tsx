import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { QuestionResponseDto } from '../types';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  RotateCcw,
  Flag,
  HelpCircle,
  LogIn,
  Shuffle
} from 'lucide-react';

export const ExamPage: React.FC = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<QuestionResponseDto[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({}); // question index -> variantId
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes (1800 seconds)
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If user is not logged in, enforce login as required by the user prompt
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login?redirect=/exam');
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Timer countdown: 30 minutes
  useEffect(() => {
    if (!isExamStarted || isExamFinished) return;

    if (timeLeft <= 0) {
      setIsExamFinished(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isExamStarted, isExamFinished, timeLeft]);

  const startExam = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get<QuestionResponseDto[]>('/questions/random');
      if (response.data && response.data.length > 0) {
        setQuestions(response.data);
        setCurrentIndex(0);
        setSelectedAnswers({});
        setTimeLeft(30 * 60); // 30 minutes
        setIsExamStarted(true);
        setIsExamFinished(false);
      } else {
        // Fallback demo questions if backend DB is empty
        const demoQuestions: QuestionResponseDto[] = [
          {
            txt: 'Yaşayış məntəqələrində minik avtomobilləri üçün icazə verilən maksimal sürət həddi nə qədərdir?',
            imgUrl: [],
            variants: [
              { id: 101, text: '60 km/saat', imageUrls: [] },
              { id: 102, text: '90 km/saat', imageUrls: [] },
              { id: 103, text: '50 km/saat', imageUrls: [] },
              { id: 104, text: '110 km/saat', imageUrls: [] },
            ]
          },
          {
            txt: 'Nizamlayıcı qollarını yana açdıqda və ya aşağı saldıqda onun sağ və sol tərəfindən hərəkət qaydası necədir?',
            imgUrl: [],
            variants: [
              { id: 105, text: 'Tramvaylara düzünə, relssiz nəqliyyat vasitələrinə düzünə və sağa hərəkətə icazə verilir', imageUrls: [] },
              { id: 106, text: 'Bütün istiqamətlərə hərəkət qadağandır', imageUrls: [] },
              { id: 107, text: 'Yalnız sola və geriyə hərəkətə icazə verilir', imageUrls: [] },
            ]
          },
          {
            txt: 'Bərabər əhəmiyyətli yolların kəsişməsində sürücü hansı nəqliyyat vasitəsinə yol verməlidir?',
            imgUrl: [],
            variants: [
              { id: 108, text: 'Sağ tərəfdən yaxınlaşan nəqliyyat vasitəsinə', imageUrls: [] },
              { id: 109, text: 'Sol tərəfdən yaxınlaşan nəqliyyat vasitəsinə', imageUrls: [] },
              { id: 110, text: 'Yalnız sürəti çox olan nəqliyyat vasitəsinə', imageUrls: [] },
            ]
          }
        ];
        setQuestions(demoQuestions);
        setCurrentIndex(0);
        setSelectedAnswers({});
        setTimeLeft(30 * 60);
        setIsExamStarted(true);
        setIsExamFinished(false);
      }
    } catch (err: any) {
      console.error(err);
      setError('Sualları yükləyərkən xəta baş verdi. Zəhmət olmasa backend serverin aktiv olduğunu yoxlayın.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectOption = (variantId: number) => {
    if (isExamFinished) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: variantId,
    }));
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentIndex];
  const answeredCount = Object.keys(selectedAnswers).length;

  // Unauthenticated view
  if (!isAuthenticated && !authLoading) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl shadow-xl border border-slate-200 text-center space-y-5">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
          <LogIn className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">Giriş Tələb Olunur</h2>
        <p className="text-slate-600 text-sm">
          İmtahan zalına daxil olmaq və testləri işləmək üçün hesabınıza daxil olmalısınız.
        </p>
        <Link
          to="/login?redirect=/exam"
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all"
        >
          <LogIn className="w-4 h-4" />
          Daxil Ol
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-600 font-semibold">İmtahan sualları hazırlanır...</p>
      </div>
    );
  }

  // Not started Screen
  if (!isExamStarted) {
    return (
      <div className="max-w-2xl mx-auto my-12 bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200 text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
          <Shuffle className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">
            DYP Sınaq İmtahanı
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">
            Qarışıq İmtahan (Random 10 Sual)
          </h1>
        </div>

        <p className="text-slate-600 text-base leading-relaxed">
          Bütün fəsillərə aid təsadüfi seçilmiş 10 sual təqdim olunacaq. İmtahanı tamamlamaq üçün sizə <span className="font-bold text-emerald-600">30 dəqiqə</span> vaxt ayrılır.
        </p>

        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">
            {error}
          </div>
        )}

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 text-left space-y-3 text-sm text-slate-700">
          <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            İmtahan Qaydaları:
          </div>
          <p>• İmtahan müddəti: <strong>30 dəqiqə</strong>.</p>
          <p>• Sualların sayı: <strong>10 random sual</strong>.</p>
          <p>• Hər sual üçün yalnız bir düzgün cavab variantı seçilə bilər.</p>
          <p>• Suallar arasında irəli və geri sərbəst keçid edə bilərsiniz.</p>
          <p>• Vaxt bitdikdə imtahan avtomatik olaraq tamamlanacaq.</p>
        </div>

        <div className="pt-2">
          <button
            onClick={startExam}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg shadow-xl shadow-emerald-500/25 transition-all hover:scale-105"
          >
            İmtahana Başla
          </button>
        </div>
      </div>
    );
  }

  // Exam Result Screen
  if (isExamFinished) {
    return (
      <div className="max-w-2xl mx-auto my-12 bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200 text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h2 className="text-3xl font-extrabold text-slate-900">İmtahan Başa Çatdı!</h2>
        <p className="text-slate-600">
          Siz {questions.length} sualdan <span className="font-bold text-emerald-600">{answeredCount}</span> dənəsini cavablandırdınız.
        </p>

        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
            <div className="text-2xl font-extrabold text-slate-800">{answeredCount} / {questions.length}</div>
            <div className="text-xs text-slate-500 font-semibold uppercase mt-1">Cavablandırılan</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
            <div className="text-2xl font-extrabold text-emerald-600">{formatTime(30 * 60 - timeLeft)}</div>
            <div className="text-xs text-slate-500 font-semibold uppercase mt-1">Sərf Olunan Vaxt</div>
          </div>
        </div>

        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <button
            onClick={startExam}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-all shadow-lg shadow-emerald-500/20 hover:scale-105"
          >
            <RotateCcw className="w-5 h-5" />
            Yenidən Sınaq Başla
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-all"
          >
            Ana Səhifəyə Qayıt
          </button>
        </div>
      </div>
    );
  }

  // Active Exam View
  return (
    <div className="max-w-4xl mx-auto my-6 space-y-6">
      {/* Top Header: Mode + Timer + Finish */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
            {currentIndex + 1}
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Qarışıq İmtahan
            </div>
            <div className="text-sm font-extrabold text-slate-800">
              Sual {currentIndex + 1} / {questions.length}
            </div>
          </div>
        </div>

        {/* Timer: 30 minutes */}
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-lg font-bold border transition-colors ${
          timeLeft < 300 ? 'bg-rose-50 border-rose-300 text-rose-600 animate-pulse' : 'bg-slate-50 border-slate-200 text-slate-800'
        }`}>
          <Clock className="w-5 h-5 text-emerald-600" />
          <span>{formatTime(timeLeft)}</span>
        </div>

        {/* Finish button */}
        <button
          onClick={() => {
            if (window.confirm('İmtahanı bitirmək istədiyinizdən əminsiniz?')) {
              setIsExamFinished(true);
            }
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-sm border border-rose-200 transition-colors"
        >
          <Flag className="w-4 h-4" />
          İmtahanı Bitir
        </button>
      </div>

      {/* Question Indicators Grid */}
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center gap-2 overflow-x-auto">
        {questions.map((_, idx) => {
          const isAnswered = selectedAnswers[idx] !== undefined;
          const isCurrent = idx === currentIndex;
          return (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-9 h-9 rounded-xl font-bold text-sm flex items-center justify-center transition-all ${
                isCurrent
                  ? 'ring-2 ring-emerald-500 bg-emerald-500 text-white shadow-md'
                  : isAnswered
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Main Question Card */}
      {currentQ && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-md border border-slate-200 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            {currentQ.txt}
          </h2>

          {/* Question Images if any */}
          {currentQ.imgUrl && currentQ.imgUrl.length > 0 && (
            <div className="flex flex-wrap gap-4 justify-center py-2">
              {currentQ.imgUrl.map((img, i) => (
                <img
                  key={i}
                  src={img.startsWith('http') ? img : `/image/get-image/${img}`}
                  alt="Sual təsviri"
                  className="max-h-72 object-contain rounded-2xl border border-slate-200 shadow-sm"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ))}
            </div>
          )}

          {/* Variants */}
          <div className="space-y-3 pt-2">
            {currentQ.variants?.map((v, i) => {
              const letter = String.fromCharCode(65 + i); // A, B, C, D...
              const isSelected = selectedAnswers[currentIndex] === v.id;

              return (
                <div
                  key={v.id}
                  onClick={() => handleSelectOption(v.id)}
                  className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl font-bold text-sm flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {letter}
                  </div>
                  <div className="pt-1 text-slate-800 font-medium text-sm sm:text-base flex-1">
                    {v.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Əvvəlki
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-colors shadow-sm"
              >
                Növbəti
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setIsExamFinished(true)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                İmtahanı Tamamla
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
