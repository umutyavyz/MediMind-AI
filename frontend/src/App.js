import React, { useState, useEffect } from 'react';
import SymptomForm from './components/SymptomForm';
import ResultCard from './components/ResultCard';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Temayı ve geçmişi localStorage'dan yükle
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    const savedHistory = localStorage.getItem('predictionHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const addToHistory = (newResult) => {
    const newHistoryItem = {
      id: Date.now(),
      date: new Date().toLocaleDateString('tr-TR'),
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      ...newResult
    };
    
    const updatedHistory = [newHistoryItem, ...history].slice(0, 10); // Son 10 tanesini tut
    setHistory(updatedHistory);
    localStorage.setItem('predictionHistory', JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('predictionHistory');
  };

  const loadHistoryItem = (item) => {
    setResult(item);
    setIsHistoryOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrediction = async (selectedSymptoms) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms: selectedSymptoms }),
      });

      if (!response.ok) {
        throw new Error('Tahmin alınırken bir hata oluştu.');
      }

      const data = await response.json();
      const finalResult = { ...data, symptoms: selectedSymptoms };
      setResult(finalResult);
      addToHistory(finalResult);
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearResult = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col font-sans text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Gezinti Çubuğu */}
      <nav className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500 dark:from-blue-400 dark:to-blue-300">
              MediMind AI
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
                onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors relative"
                title="Geçmiş Aramalar"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {history.length > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
                )}
            </button>

            <button 
                onClick={toggleTheme}
                className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                title={darkMode ? "Aydınlık Mod" : "Karanlık Mod"}
            >
                {darkMode ? (
                    <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                )}
            </button>
          </div>
        </div>
      </nav>

      {/* Geçmiş Kenar Çubuğu */}
      <div className={`fixed inset-y-0 right-0 w-80 bg-white dark:bg-slate-800 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isHistoryOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Geçmiş Aramalar</h3>
                <button onClick={() => setIsHistoryOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            
            {history.length === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                    <svg className="w-12 h-12 mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <p>Henüz geçmiş kayıt yok.</p>
                </div>
            ) : (
                <>
                    <div className="flex-grow overflow-y-auto space-y-3 pr-2">
                        {history.map((item) => (
                            <div 
                                key={item.id} 
                                onClick={() => loadHistoryItem(item)}
                                className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-100 dark:border-slate-700 cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors group"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-medium text-slate-400 dark:text-slate-400">{item.date} • {item.time}</span>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.confidence > 0.5 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'}`}>
                                        %{Math.round(item.confidence * 100)}
                                    </span>
                                </div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.disease}</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
                                    {item.symptoms.map(s => s.split('_').join(' ')).join(', ')}
                                </p>
                            </div>
                        ))}
                    </div>
                    <button 
                        onClick={clearHistory}
                        className="mt-4 w-full py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                        Geçmişi Temizle
                    </button>
                </>
            )}
        </div>
      </div>

      {/* Kenar çubuğu için kaplama */}
      {isHistoryOpen && (
        <div onClick={() => setIsHistoryOpen(false)} className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"></div>
      )}

      <main className="flex-grow container mx-auto px-4 py-12 max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 transition-colors">
            Semptomlarınızı Analiz Edin
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto transition-colors">
            Yapay zeka destekli sistemimizle belirtilerinizi kontrol edin ve olası durumlar hakkında anında bilgi alın.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors">
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white transition-colors">Belirtilerinizi Seçin</h2>
            </div>
            
            <SymptomForm onSubmit={handlePrediction} onClear={handleClearResult} isLoading={loading} darkMode={darkMode} />
          </div>
        </div>

        {error && (
          <div className="mt-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg flex items-center gap-3 animate-fade-in">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-8">
            <ResultCard result={result} darkMode={darkMode} />
          </div>
        )}
      </main>
      
      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-8 mt-auto transition-colors">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            © 2025 MediMind AI. Tüm hakları saklıdır.
          </p>
          <p className="text-slate-400 dark:text-slate-500 text-xs mt-2">
            Yasal Uyarı: Bu bir yapay zeka tahminidir ve profesyonel tıbbi tavsiye yerine geçmez. 
            Acil durumlarda lütfen en yakın sağlık kuruluşuna başvurun.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
