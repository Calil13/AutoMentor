import React from 'react';
import { Car, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
              <Car className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Auto<span className="text-emerald-400">Mentor</span>
            </span>
          </div>

          <p className="text-sm text-center md:text-left">
            Yol Hərəkəti Qaydaları və Sürücülük İmtahanına Müasir Hazırlıq Platforması.
          </p>

          <div className="flex items-center gap-1 text-xs text-slate-500">
            <span>Hazırlandı</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>AutoMentor Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
