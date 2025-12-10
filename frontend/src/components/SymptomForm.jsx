import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const SymptomForm = ({ onSubmit, onClear, isLoading, darkMode }) => {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Backend'den mevcut semptomları getir
    const fetchSymptoms = async () => {
      try {
        const response = await fetch('http://localhost:8000/symptoms');
        if (!response.ok) throw new Error('Sunucuya bağlanılamadı');
        const data = await response.json();
        setOptions(data.symptoms);
      } catch (error) {
        console.error("Semptomlar yüklenirken hata:", error);
        setError("Semptom listesi yüklenemedi. Lütfen sayfayı yenileyin.");
      }
    };

    fetchSymptoms();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedOptions.length === 0) return;
    
    const symptoms = selectedOptions.map(option => option.value);
    onSubmit(symptoms);
  };

  const handleClear = () => {
    setSelectedOptions([]);
    if (onClear) {
      onClear();
    }
  };

  // Tailwind ve Koyu Mod ile eşleşmesi için react-select özel stilleri
  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: darkMode ? '#1e293b' : 'white',
      borderColor: state.isFocused ? '#3b82f6' : (darkMode ? '#334155' : '#e2e8f0'),
      boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : 'none',
      padding: '4px',
      borderRadius: '0.5rem',
      '&:hover': {
        borderColor: '#3b82f6'
      }
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: darkMode ? '#1e293b' : 'white',
      border: darkMode ? '1px solid #334155' : '1px solid #e2e8f0',
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: darkMode ? '#1e3a8a' : '#eff6ff',
      borderRadius: '0.375rem',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: darkMode ? '#bfdbfe' : '#1e40af',
      fontWeight: '500',
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: darkMode ? '#bfdbfe' : '#1e40af',
      ':hover': {
        backgroundColor: darkMode ? '#1e40af' : '#dbeafe',
        color: darkMode ? '#ffffff' : '#1e3a8a',
      },
    }),
    input: (base) => ({
      ...base,
      color: darkMode ? '#f1f5f9' : '#0f172a',
    }),
    singleValue: (base) => ({
      ...base,
      color: darkMode ? '#f1f5f9' : '#0f172a',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused 
        ? (darkMode ? '#334155' : '#eff6ff') 
        : 'transparent',
      color: darkMode ? '#f1f5f9' : '#0f172a',
      padding: '10px 12px',
      cursor: 'pointer',
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: '400px',
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Şikayetlerinizi Seçiniz:
          </label>
          {selectedOptions.length > 0 && (
            <button 
              type="button" 
              onClick={handleClear}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              Temizle
            </button>
          )}
        </div>
        
        <Select
          isMulti
          name="symptoms"
          options={options}
          styles={customStyles}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Semptom arayın (örn: baş ağrısı, ateş)..."
          noOptionsMessage={() => "Semptom bulunamadı"}
          onChange={setSelectedOptions}
          value={selectedOptions}
          isDisabled={isLoading}
          menuPortalTarget={document.body}
          menuPosition={'fixed'}
        />
        <p className="mt-2 text-xs text-slate-500">
          * Birden fazla semptom seçebilirsiniz.
        </p>
      </div>
      
      <button
        type="submit"
        disabled={isLoading || selectedOptions.length === 0}
        className={`w-full py-3.5 px-4 rounded-xl text-white font-semibold shadow-lg transition-all duration-200 flex items-center justify-center gap-2
          ${isLoading || selectedOptions.length === 0 
            ? 'bg-slate-300 cursor-not-allowed shadow-none' 
            : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-blue-200 hover:-translate-y-0.5'}`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analiz Ediliyor...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Hastalığı Tahmin Et
          </>
        )}
      </button>
    </form>
  );
};

export default SymptomForm;
