import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { RoadSignCategoryResponseDto, RoadSignResponseDto, PageResponse } from '../types';
import { Compass, Search, ChevronLeft, ChevronRight, AlertCircle, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

export const RoadSignsPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [categories, setCategories] = useState<RoadSignCategoryResponseDto[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [signs, setSigns] = useState<RoadSignResponseDto[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories (public)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get<RoadSignCategoryResponseDto[]>('/road-sign/categories');
        setCategories(response.data);
        if (response.data.length > 0 && selectedCategoryId === null) {
          setSelectedCategoryId(response.data[0].id);
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch road signs when category or page changes
  useEffect(() => {
    if (!selectedCategoryId || !isAuthenticated) return;

    const fetchSigns = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get<PageResponse<RoadSignResponseDto>>(
          `/road-sign/category/${selectedCategoryId}?page=${currentPage}&size=12`
        );
        setSigns(response.data.content || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (err: any) {
        console.error('Failed to load signs:', err);
        setError('Yol nişanları yüklənərkən xəta baş verdi.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSigns();
  }, [selectedCategoryId, currentPage, isAuthenticated]);

  const filteredSigns = signs.filter((sign) =>
    sign.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sign.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 py-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            Yol Nişanları Kataloqu
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Bütün kateqoriyalar üzrə yol nişanları və onların təsvirləri
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Nişan axtar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white shadow-sm"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategoryId(cat.id);
              setCurrentPage(0);
            }}
            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
              selectedCategoryId === cat.id
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat.categoryName}
          </button>
        ))}
      </div>

      {/* Unauthenticated notice */}
      {!isAuthenticated && (
        <div className="p-8 bg-white rounded-3xl border border-slate-200 text-center max-w-lg mx-auto shadow-sm space-y-4">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Hesaba Giriş Tələb Olunur</h3>
          <p className="text-sm text-slate-600">
            Kateqoriyalar üzrə nişanların tam siyahısına və izahlarına baxmaq üçün daxil olun.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition-all"
          >
            <LogIn className="w-4 h-4" />
            Daxil Ol
          </Link>
        </div>
      )}

      {/* Road signs grid */}
      {isAuthenticated && (
        <>
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-semibold text-slate-500">Nişanlar yüklənir...</p>
            </div>
          ) : error ? (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">
              {error}
            </div>
          ) : filteredSigns.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500">
              Bu kateqoriyada və ya axtarış üzrə heç bir nişan tapılmadı.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSigns.map((sign) => (
                <div
                  key={sign.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center group"
                >
                  <div className="w-28 h-28 bg-slate-50 rounded-xl flex items-center justify-center p-2 mb-4 group-hover:scale-105 transition-transform">
                    {sign.imageUrl ? (
                      <img
                        src={sign.imageUrl.startsWith('http') ? sign.imageUrl : `/image/get-image/${sign.imageUrl}`}
                        alt={sign.name}
                        className="max-h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <Compass className="w-12 h-12 text-slate-300" />
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{sign.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {sign.description || 'Bu nişan haqqında əlavə məlumat yoxdur.'}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 pt-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                className="p-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm font-semibold text-slate-700">
                Səhifə {currentPage + 1} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={currentPage >= totalPages - 1}
                className="p-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
