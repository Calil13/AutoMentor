import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { ChaptersResponseDto } from '../types';
import { 
  BookOpen, 
  ArrowRight, 
  FileText, 
  CheckCircle2, 
  GraduationCap
} from 'lucide-react';

// Comprehensive theoretical lessons for Azerbaijan traffic rules (DYP)
const DEFAULT_CHAPTERS = [
  {
    id: 1,
    title: 'Ümumi müddəalar və əsas anlayışlar',
    summary: 'Yol hərəkəti qaydalarında istifadə edilən əsas terminlər və onların hüquqi izahı.',
    content: [
      '“Yol” — nəqliyyat vasitələrinin və piyadaların hərəkəti üçün nəzərdə tutulmuş torpaq zolağı və ya süni qurğunun səthidir. Yola bir və ya bir neçə hərəkət hissəsi, tramvay xətləri, səkilər, çiyinlər və ayırıcı zolaqlar daxildir.',
      '“Hərəkət zolağı” — hərəkət hissəsinin uzununa zolaqlarından hər hansı biridir. Bu zolaq nişanlanmış və ya nişanlanmamış ola bilər və avtomobillərin bir sırada hərəkəti üçün yetərli enə malikdir.',
      '“Üstünlük (prioritet)” — digər hərəkət iştirakçılarına nisbətən nəzərdə tutulmuş istiqamətdə ilk növbədə hərəkət etmək hüququdur.',
      '“Yol vermək” — hərəkət iştirakçısının hərəkəti davam etdirməməsi və ya yenidən başlamaması tələbidir, əgər bu, digər üstünlüyə malik hərəkət iştirakçılarını hərəkət istiqamətini və ya sürətini kəskin dəyişməyə məcbur edərsə.'
    ]
  },
  {
    id: 2,
    title: 'Sürücülərin və piyadaların ümumi vəzifələri',
    summary: 'Sürücünün üzərində saxlamalı olduğu sənədlər və piyadaların təhlükəsizlik qaydaları.',
    content: [
      'Mexaniki nəqliyyat vasitəsinin sürücüsü yanında sürücülük vəsiqəsi, nəqliyyat vasitəsinin qeydiyyat şəhadətnaməsi və icbari sığorta şəhadətnaməsini saxlamalı və polis əməkdaşının tələbi ilə yoxlanılması üçün təqdim etməlidir.',
      'Sürücüyə nəqliyyat vasitəsini alkoqol, narkotik vasitələr və ya güclü təsir göstərən maddələrin təsiri altında, habelə yorğun və xəstə halda idarə etmək qəti qadağandır.',
      'Konstruksiyasında təhlükəsizlik kəmərləri nəzərdə tutulmuş avtomobildə hərəkət edərkən sürücü və bütün sərnişinlər kəməri bağlamalıdırlar.',
      'Piyadalar səki və ya piyada cığırları ilə, bunlar olmadıqda isə yolun çiyni ilə hərəkət etməlidirlər. Yaşayış məntəqələrindən kənarda piyadalar nəqliyyat vasitələrinin hərəkətinin əksi istiqamətində getməlidirlər.'
    ]
  },
  {
    id: 3,
    title: 'Yol nişanları və nişanlanma xətləri',
    summary: 'Nişanların 7 əsas qrupu və yol nişanlanma xətlərinin mənası.',
    content: [
      'Yol nişanları 7 qrupa bölünür: Xəbərdarlıq nişanları, Üstünlük nişanları, Qadağan nişanları, Məcburi hərəkət istiqaməti nişanları, Xüsusi nizamlama nişanları, Məlumatverici-göstərici nişanlar və Əlavə məlumat lövhəcikləri.',
      'Xəbərdarlıq nişanları yaşayış məntəqələrində təhlükəli sahəyə 50–100 metr, yaşayış məntəqələrindən kənarda isə 150–300 metr qalmış quraşdırılır.',
      'Bütöv ağ xətti (1.1) tapdalamaq və onun üzərindən keçmək qadağandır. Kəsik-kəsik xətti (1.5) isə manevr və zolağı dəyişmə zamanı istənilən tərəfdən kəsməyə icazə verilir.',
      'Müvəqqəti sarı xətlərin və daimi ağ xətlərin tələbləri ziddiyyət təşkil edərsə, sürücülər sarı rəngli müvəqqəti nişanlanma xətlərini rəhbər tutmalıdırlar.'
    ]
  },
  {
    id: 4,
    title: 'Svetoforun və nizamlayıcının siqnalları',
    summary: 'Svetofor işıqları və nizamlayıcının bədən/qol vəziyyətləri.',
    content: [
      'Svetoforun yaşıl işığı hərəkətə icazə verir. Yaşıl sayrışan işıq onun vaxtının bitdiyini və tezliklə qadağanedici siqnalın yanacağını bildirir.',
      'Sarı işıq hərəkəti qadağan edir və siqnalların dəyişəcəyini xəbərdar edir. Yalnız kəskin tormozlama etmədən dayana bilməyən sürücülərə hərəkəti davam etdirməyə icazə verilir.',
      'Nizamlayıcının siqnalları və göstərişləri svetoforun siqnallarından, yol nişanlarının və nişanlanma xətlərinin tələblərindən üstündür.',
      'Nizamlayıcı qollarını yana açdıqda və ya aşağı saldıqda: onun sağ və sol böyrü tərəfindən tramvaylara düzünə, relssiz nəqliyyat vasitələrinə düzünə və sağa hərəkətə icazə verilir, sinə və arxa tərəfdən isə bütün istiqamətlərə hərəkət qadağandır.'
    ]
  },
  {
    id: 5,
    title: 'Hərəkətə başlama, manevr etmə və sürət həddi',
    summary: 'Zolaq dəyişmə, dönmə, geriyə dönmə və icazə verilən maksimal sürət.',
    content: [
      'Sürücü hərəkətə başlamazdan, yerdəyişmə, dönmə və ya dayanmazdan əvvəl müvafiq istiqamətə dönmə işıq siqnalını yandırmalıdır.',
      'Yaşayış məntəqələrində bütün nəqliyyat vasitələrinin hərəkətinə 60 km/saatdan artıq olmayan sürətlə icazə verilir (yaşayış zonalarında və həyətlərdə 20 km/saat).',
      'Yaşayış məntəqələrindən kənarda minik avtomobillərinə: avtomagistrallarda 110 km/saat, digər yollarda 90 km/saat sürətlə hərəkət etməyə icazə verilir.',
      'Görmə məsafəsi 100 metrdən az olan döngələrdə, piyada keçidlərində, tunellərdə və körpülərdə geriyə dönmək qadağandır.'
    ]
  },
  {
    id: 6,
    title: 'Yolayrıclarını keçmə qaydaları',
    summary: 'Bərabər əhəmiyyətli, baş yol və nizamlanan yolayrıcılarının keçilməsi.',
    content: [
      'Nizamlanmayan bərabər əhəmiyyətli yolların kəsişməsində sürücü sağdan yaxınlaşan nəqliyyat vasitəsinə yol verməlidir (“Sağ əl qaydası”).',
      'İkinci dərəcəli yolda olan sürücü baş yolla yaxınlaşan bütün nəqliyyat vasitələrinə hərəkət istiqamətindən asılı olmayaraq yol verməlidir.',
      'Sola və ya geriyə dönərkən sürücü qarşıdan gələn və düzünə və ya sağa hərəkət edən nəqliyyat vasitələrinə yol verməlidir.',
      'Bərabər şəraitdə tramvay relssiz nəqliyyat vasitələrinə nisbətən hərəkət istiqamətindən asılı olmayaraq üstünlüyə malikdir.'
    ]
  },
  {
    id: 7,
    title: 'Dayanma, durma və parklanma qaydaları',
    summary: 'Dayanmanın və durmanın qadağan edildiyi yerlər.',
    content: [
      'Nəqliyyat vasitələrinin yolun sağ tərəfində yol çiynində, çiyin olmadıqda isə hərəkət hissəsinin kənarında bir cərgədə dayanmasına icazə verilir.',
      'Dayanmaq qadağandır: tramvay yollarında, dəmir yolu keçidlərində, körpülərdə və estakadalarda, piyada keçidlərində və onlara 5 metrdən az yaxınlıqda, görmə məsafəsi 100 metrdən az olan yerlərdə.',
      'Avtobus dayanacaqlarına və taksi duracaqlarına 15 metrdən az məsafədə digər nəqliyyat vasitələrinin dayanması qadağandır (sərnişin mindirib-düşürmək istisna olmaqla).',
      'Durmaq qadağandır: dayanmanın qadağan edildiyi bütün yerlərdə, habelə dəmir yolu keçidlərinə 50 metrdən az yaxınlıqda.'
    ]
  },
  {
    id: 8,
    title: 'Xüsusi siqnallı nəqliyyat vasitələri və təhlükəsizlik',
    summary: 'Göy/qırmızı sayrışan işıq siqnalları və səs siqnalı verən xüsusi operativ maşınlar.',
    content: [
      'Göy və ya qırmızı sayrışan mayakı və xüsusi səs siqnalı qoşulmuş operativ nəqliyyat vasitəsi (təcili yardım, yanğınsöndürən, polis) yaxınlaşdıqda digər sürücülər ona maneəsiz keçid üçün yol verməlidirlər.',
      'Sayrışan işığı qoşulmuş nəqliyyat vasitəsini ötmək qadağandır.',
      'Gecə vaxtı və görmə məsafəsi məhdud olduqda yolda hərəkət edən və ya dayanan nəqliyyat vasitələrində qabarit işıqları və ya yaxın/uzaq işıq fənərləri yandırılmalıdır.',
      'Məcburi dayanma zamanı xəbərdarlıq qəza nişanı yaşayış məntəqələrində avtomobildən ən azı 15 metr, yaşayış məntəqələrindən kənarda isə ən azı 30 metr arxada quraşdırılmalıdır.'
    ]
  }
];

export const ChaptersPage: React.FC = () => {
  const [activeChapterId, setActiveChapterId] = useState<number>(1);
  const [chaptersList, setChaptersList] = useState(DEFAULT_CHAPTERS);

  useEffect(() => {
    const loadBackendChapters = async () => {
      try {
        const res = await api.get<ChaptersResponseDto>('/chapter/chapters-name');
        if (res.data?.chapterTitle && res.data.chapterTitle.length > 0) {
          const mapped = res.data.chapterTitle.map((title, i) => {
            const fallback = DEFAULT_CHAPTERS[i % DEFAULT_CHAPTERS.length];
            return {
              id: i + 1,
              title: title,
              summary: fallback?.summary || 'Bu fəslin nəzəri qaydaları və müddəaları.',
              content: fallback?.content || [
                `${title} mövzusu üzrə kitab qaydaları və müddəaları.`,
                'Hərəkət iştirakçılarının hüquq və vəzifələri bu fəsildə ətraflı şərh olunmuşdur.'
              ]
            };
          });
          setChaptersList(mapped);
        }
      } catch (err) {
        // Fallback to DEFAULT_CHAPTERS
      }
    };

    loadBackendChapters();
  }, []);

  const currentChapter = chaptersList.find((c) => c.id === activeChapterId) || chaptersList[0];

  return (
    <div className="space-y-8 py-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          Lessons / Nəzəriyyə
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Chapters (Kitab üzrə Nəzəri Fəsillər)
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Kitabdakı fəsillərə uyğun tam nəzəri məlumatlar və yol hərəkəti qaydaları. Fəsli seçərək oxuyun.
        </p>
      </div>

      {/* Main Content: Left side Chapter list, Right side Theory Reader */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Chapter List (Chapter 1, Chapter 2 ... Chapter n) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
            Fəsillər ({chaptersList.length} Fəsil)
          </div>

          <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
            {chaptersList.map((chapter) => {
              const isSelected = chapter.id === activeChapterId;
              return (
                <div
                  key={chapter.id}
                  onClick={() => setActiveChapterId(chapter.id)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/10'
                      : 'bg-white text-slate-700 border-slate-200/80 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm flex-shrink-0 ${
                        isSelected
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {chapter.id}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-sm truncate">
                        Chapter {chapter.id}: {chapter.title}
                      </div>
                      <div className={`text-xs mt-0.5 truncate ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                        {chapter.summary}
                      </div>
                    </div>
                  </div>

                  <ArrowRight className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-emerald-400' : 'text-slate-300'}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Theory Reader */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
            
            {/* Chapter Title Badge */}
            <div className="pb-4 border-b border-slate-100">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold uppercase tracking-wider mb-2">
                <GraduationCap className="w-3.5 h-3.5" />
                Chapter {currentChapter.id}
              </span>
              <h2 className="text-2xl font-black text-slate-900 leading-snug">
                {currentChapter.title}
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                {currentChapter.summary}
              </p>
            </div>

            {/* Theory Points / Paragraphs */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-500" />
                Qaydalar və Nəzəri Müddəalar
              </h3>

              <div className="space-y-3.5">
                {currentChapter.content.map((point, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-slate-700 text-sm leading-relaxed flex items-start gap-3.5"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      {point}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Helpful Note */}
            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-indigo-900 text-xs leading-relaxed flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0" />
              <span>
                Bu fəsildəki nəzəri qaydalar Dövlət Yol Polisi (DYP) imtahan proqramının rəsmi dərslik materiallarına əsaslanır.
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
