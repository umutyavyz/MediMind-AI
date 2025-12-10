import React, { useRef, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

const ResultCard = ({ result, darkMode }) => {
  const { disease, confidence, description, precautions, top_predictions, symptoms } = result;
  const cardRef = useRef(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  const confidencePercent = Math.round(confidence * 100);
  
  // Güven oranına göre dinamik renkler
  let colorClass = 'blue';
  if (confidencePercent > 50) colorClass = 'green';
  else if (confidencePercent <= 50) colorClass = 'orange';

  // Pasta Grafiği için Renkler
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  // Grafik için verileri hazırla (backend henüz göndermemiş olsa bile verimiz olduğundan emin ol)
  const chartData = top_predictions || [
    { name: disease, value: confidence },
    { name: 'Diğer', value: 1 - confidence }
  ];

  const handleDownloadPDF = async () => {
    if (!cardRef.current) return;
    
    setIsGeneratingPDF(true);

    try {
      // Animasyonun PDF görüntüsünü bozmasını engellemek için geçici olarak stilleri temizliyoruz
      const canvas = await html2canvas(cardRef.current, {
        scale: 3, // Daha yüksek çözünürlük
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        onclone: (clonedDoc) => {
            // Klonlanan dökümanda animasyonları kaldır ve genişliği sabitle
            const element = clonedDoc.getElementById('result-card-container');
            if (element) {
                element.style.animation = 'none';
                element.style.opacity = '1';
                element.style.transform = 'none';
                element.style.boxShadow = 'none';
                // PDF'te her zaman masaüstü genişliğinde görünmesi için sabitle
                element.style.width = '1000px';
                element.style.maxWidth = 'none';
                element.style.margin = '0 auto';
            }

            // PDF için gizli olan belirtiler bölümünü görünür yap
            const symptomsSection = clonedDoc.getElementById('pdf-symptoms-section');
            if (symptomsSection) {
                symptomsSection.style.display = 'block';
                symptomsSection.style.height = 'auto';
                symptomsSection.style.overflow = 'visible';
            }
        }
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210; // A4 genişliği (mm)
      const pageHeight = 297; // A4 yüksekliği (mm)
      
      // İlk olarak genişliğe göre yüksekliği hesapla
      let finalWidth = imgWidth;
      let finalHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Eğer yükseklik sayfadan taşarsa, sayfaya sığdır (scale down)
      if (finalHeight > pageHeight) {
        finalHeight = pageHeight;
        finalWidth = (canvas.width * finalHeight) / canvas.height;
      }
      
      // Ortalamak için x pozisyonunu hesapla
      const xPos = (imgWidth - finalWidth) / 2;

      pdf.addImage(imgData, 'PNG', xPos, 0, finalWidth, finalHeight);
      pdf.save(`MediMind_Rapor_${new Date().toLocaleDateString('tr-TR')}.pdf`);
    } catch (error) {
      console.error("PDF oluşturulurken hata:", error);
      alert("PDF oluşturulurken bir hata oluştu.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <>
      {/* PDF Yükleme Kaplaması */}
      {isGeneratingPDF && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center flex-col gap-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-sm mx-4 text-center">
            <div className="w-16 h-16 border-4 border-blue-100 dark:border-blue-900 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin mb-4"></div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Rapor Hazırlanıyor</h3>
            <p className="text-slate-500 dark:text-slate-400">Lütfen bekleyin, detaylı sağlık raporunuz oluşturuluyor...</p>
          </div>
        </div>
      )}

      <div id="result-card-container" ref={cardRef} className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden animate-fade-in-up max-w-5xl mx-auto my-8 transition-colors">
        {/* Başlık */}
      <div className={`bg-${colorClass}-600 p-8 text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-black opacity-5 rounded-full blur-xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 opacity-90">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                <span className="text-sm font-bold uppercase tracking-wider">Teşhis Raporu</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">{disease}</h2>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20 shadow-lg">
            <span className="text-xs font-bold opacity-80 uppercase tracking-wide block mb-1">Olasılık</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg opacity-80 font-medium">%</span>
              <span className="text-4xl font-bold">{confidencePercent}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SADECE PDF: Belirtiler Bölümü */}
      {symptoms && symptoms.length > 0 && (
        <div id="pdf-symptoms-section" className="hidden bg-slate-50 border-b border-slate-100">
            <div className="px-8 py-6">
                <div className="flex items-center gap-2 mb-4">
                    <div className="bg-orange-100 p-1.5 rounded-lg">
                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Analiz Edilen Belirtiler</h4>
                </div>
                
                <div className="flex flex-wrap gap-3">
                    {symptoms.map((symptom, index) => (
                        <div key={index} className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-sm min-w-[200px]">
                            <div className="bg-green-50 p-1.5 rounded-full flex-shrink-0">
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-sm font-semibold text-slate-700 capitalize leading-tight">
                                {symptom.split('_').join(' ')}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      )}
      
      <div className="p-6 md:p-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
            {/* Grafik Bölümü */}
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col transition-colors">
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-6 flex items-center gap-2">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
                    Olasılık Dağılımı
                </h4>
                <div className="w-full h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="45%"
                                innerRadius={60}
                                outerRadius={90}
                                fill="#8884d8"
                                paddingAngle={4}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={darkMode ? 0 : 2} stroke={darkMode ? 'none' : '#f8fafc'} />
                                ))}
                            </Pie>
                            <Tooltip 
                                formatter={(value, name) => [`${(value * 100).toFixed(1)}%`, name]}
                                contentStyle={{ 
                                    borderRadius: '12px', 
                                    border: darkMode ? '1px solid #475569' : 'none', 
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.25)', 
                                    padding: '12px',
                                    backgroundColor: darkMode ? '#334155' : 'white',
                                }}
                                itemStyle={{
                                    color: darkMode ? '#ffffff' : '#0f172a'
                                }}
                            />
                            <Legend 
                                verticalAlign="bottom" 
                                wrapperStyle={{ paddingTop: '20px', fontSize: '12px', width: '100%', color: darkMode ? '#94a3b8' : '#475569' }}
                                iconType="circle"
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Açıklama Bölümü */}
            <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Hastalık Tanımı</h4>
                </div>
                <div className="bg-white dark:bg-slate-700/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm h-full leading-relaxed text-slate-600 dark:text-slate-300 text-lg transition-colors">
                    {description}
                </div>
            </div>
        </div>

        {/* Önlemler */}
        {precautions && precautions.length > 0 && (
          <div className="bg-blue-50/30 dark:bg-blue-900/10 rounded-2xl p-8 border border-blue-100/50 dark:border-blue-800/30 mb-8 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-slate-800 dark:text-white">Önerilen Tedaviler / Önlemler</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {precautions.map((precaution, index) => (
                <div key={index} className="flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-blue-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400 rounded-full p-2 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium capitalize">{precaution}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* İşlem Düğmeleri ve Yasal Uyarı */}
        <div className="flex flex-col gap-6 border-t border-slate-100 dark:border-slate-700 pt-8" data-html2canvas-ignore="true">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                    onClick={handleDownloadPDF}
                    className="flex items-center justify-center gap-2 bg-slate-800 dark:bg-slate-700 text-white px-6 py-3 rounded-xl hover:bg-slate-900 dark:hover:bg-slate-600 transition-colors shadow-lg hover:shadow-xl"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Sonucu PDF İndir
                </button>
                
                <a 
                    href="https://www.google.com/maps/search/hastane" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-red-500 dark:bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-600 dark:hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    En Yakın Hastaneyi Bul
                </a>
            </div>
            
            <div className="text-center">
                <p className="text-xs text-slate-400 max-w-2xl mx-auto">
                    ⚠️ Yasal Uyarı: Bu sistem yapay zeka destekli bir tahmin aracıdır ve profesyonel tıbbi tavsiye yerine geçmez. 
                    Kesin teşhis ve tedavi için lütfen sonuçları bir sağlık uzmanı ile paylaşınız.
                </p>
            </div>
        </div>

      </div>
    </div>
    </>
  );
};

export default ResultCard;
