import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';

export default function App() {
  const [lang, setLang] = useState('ar');
  const [noPos, setNoPos] = useState({ top: '65%', left: '60%' });
  const [yesScale, setYesScale] = useState(1);
  const [isAccepted, setIsAccepted] = useState(false);
  const cardRef = useRef(null);

  const content = {
    ar: { 
      title: "أميرتي.. هل تحبينني؟ 🌸✨", 
      hint: "زر (لا) مهارب للابد.. ما في مفر من الحب! 🥺💖", 
      yesBtn: "نعم أحبك! 💖", 
      noBtn: "لا 💔", 
      winTitle: "كنت أعلم ذلك! 👑💖", 
      winDesc: "أنتِ أجمل هدية في حياتي! ✨" 
    },
    en: { 
      title: "My Princess.. Do you love me? 🌸✨", 
      hint: "The 'No' button runs forever.. No escape from love! 🥺💖", 
      yesBtn: "Yes, I do! 💖", 
      noBtn: "No 💔", 
      winTitle: "I knew it! 👑💖", 
      winDesc: "You are the best gift in my life! ✨" 
    },
    fr: { 
      title: "Ma Princesse.. M'aimes-tu? 🌸✨", 
      hint: "Le bouton 'Non' s'enfuit.. Pas d'échappatoire! 🥺💖", 
      yesBtn: "Oui, je t'aime! 💖", 
      noBtn: "Non 💔", 
      winTitle: "Je le savais! 👑💖", 
      winDesc: "Tu es le plus beau cadeau! ✨" 
    }
  };

  const t = content[lang];

  // دالة هروب زر "لا" للأبد داخل المربع الأبيض بدقة تامة للهواتف والكمبيوتر
  const dodgeNo = (e) => {
    if (e) e.preventDefault();
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const btnWidth = 90;
    const btnHeight = 40;
    const padding = 25;

    const maxLeft = rect.width - btnWidth - padding;
    const maxTop = rect.height - btnHeight - padding;

    const randomLeft = Math.max(padding, Math.random() * maxLeft);
    const randomTop = Math.max(padding + 80, Math.random() * maxTop); // ترك مساحة للنص في الأعلى

    setNoPos({ top: `${randomTop}px`, left: `${randomLeft}px` });
    setYesScale(prev => Math.min(prev + 0.12, 2.2)); // تكبير زر نعم تدريجياً

    // اهتزاز خفيف للهاتف إن أمكن
    if (navigator.vibrate) navigator.vibrate(40);
  };

  const handleAccept = () => {
    setIsAccepted(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-pink-200 via-rose-100 to-purple-200 flex flex-col items-center justify-center p-4 overflow-hidden select-none ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
      
      {/* أزرار تغيير اللغات */}
      <div className="absolute top-4 right-4 flex gap-2 z-30">
        {['ar', 'en', 'fr'].map(l => (
          <button 
            key={l} 
            onClick={() => setLang(l)} 
            className={`px-3 py-1 rounded-full text-xs font-bold shadow transition-all ${lang === l ? 'bg-pink-600 text-white scale-105' : 'bg-white/80 text-pink-700 hover:bg-white'}`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* المربع الأبيض الأساسي (الحاضنة لهروب زر لا) */}
      <div 
        ref={cardRef} 
        className="relative w-full max-w-sm h-[480px] bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-2xl p-6 flex flex-col items-center justify-between text-center overflow-hidden"
      >
        {!isAccepted ? (
          <>
            <div className="mt-4">
              <div className="text-5xl mb-2 animate-bounce">👸🏻✨</div>
              <h1 className="text-xl font-extrabold text-pink-700 leading-snug">{t.title}</h1>
              <p className="text-xs text-pink-500 mt-2 font-medium px-2">{t.hint}</p>
            </div>

            <div className="w-full h-full relative my-2">
              {/* زر نعم (يكبر تدريجياً) */}
              <button
                onClick={handleAccept}
                style={{ transform: `scale(${yesScale})` }}
                className="absolute top-[45%] left-[28%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform duration-200 active:scale-95 z-20"
              >
                {t.yesBtn}
              </button>

              {/* زر لا (يهرب للأبد داخل المربع فقط عند اللمس أو الاقتراب) */}
              <button
                onPointerDown={dodgeNo}
                onMouseEnter={dodgeNo}
                onTouchStart={dodgeNo}
                style={{ top: noPos.top, left: noPos.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-5 rounded-full shadow transition-all duration-150 ease-out z-10 touch-none"
              >
                {t.noBtn}
              </button>
            </div>
          </>
        ) : (
          <div className="my-auto flex flex-col items-center animate-fade-in">
            <div className="text-6xl mb-4 animate-pulse">🎉👑💖</div>
            <h2 className="text-3xl font-extrabold text-pink-600">{t.winTitle}</h2>
            <p className="text-sm text-pink-400 mt-2">{t.winDesc}</p>
          </div>
        )}
      </div>
    </div>
  );
}