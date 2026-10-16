import React, { useState, useRef } from 'react';

export default function LoveQuestionApp() {
  const [lang, setLang] = useState('ar');
  const [noPos, setNoPos] = useState({ top: '65%', left: '60%' });
  const [yesScale, setYesScale] = useState(1);
  const [isAccepted, setIsAccepted] = useState(false);
  const cardRef = useRef(null);

  const content = {
    ar: { title: "أميرتي.. هل تحبينني؟ 🌸✨", hint: "فكري جيداً، القلب اختار خلاص! 🥺💖", yesBtn: "نعم أحبك! 💖", noBtn: "لا 💔", winTitle: "كنت أعلم ذلك! 👑💖", winDesc: "أنتِ أجمل هدية في حياتي! ✨" },
    en: { title: "My Princess.. Do you love me? 🌸✨", hint: "Think carefully, my heart already decided! 🥺💖", yesBtn: "Yes, I do! 💖", noBtn: "No 💔", winTitle: "I knew it! 👑💖", winDesc: "You are the best gift in my life! ✨" },
    fr: { title: "Ma Princesse.. M'aimes-tu? 🌸✨", hint: "Réfléchis bien, mon cœur a déjà choisi! 🥺💖", yesBtn: "Oui, je t'aime! 💖", noBtn: "Non 💔", winTitle: "Je le savais! 👑💖", winDesc: "Tu es le plus beau cadeau! ✨" }
  };

  const t = content[lang];

  const dodgeNo = () => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const btnWidth = 100, btnHeight = 45, padding = 20;

    const maxLeft = rect.width - btnWidth - padding;
    const maxTop = rect.height - btnHeight - padding;

    const randomLeft = Math.max(padding, Math.random() * maxLeft);
    const randomTop = Math.max(padding, Math.random() * maxTop);

    setNoPos({ top: `${randomTop}px`, left: `${randomLeft}px` });
    setYesScale(prev => Math.min(prev + 0.15, 2.2));
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-rose-200 flex flex-col items-center justify-center p-4 ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
      
      {/* Switch Language */}
      <div className="absolute top-4 right-4 flex gap-2">
        {['ar', 'en', 'fr'].map(l => (
          <button key={l} onClick={() => setLang(l)} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === l ? 'bg-pink-500 text-white shadow-md' : 'bg-white/80 text-pink-700'}`}>
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Main Card */}
      <div ref={cardRef} className="relative w-full max-w-sm h-[450px] bg-white/70 backdrop-blur-md rounded-3xl border border-white/80 shadow-2xl p-6 flex flex-col items-center justify-between text-center overflow-hidden">
        
        {!isAccepted ? (
          <>
            <div className="mt-6">
              <div className="text-5xl mb-3 animate-bounce">👸🏻✨</div>
              <h1 className="text-2xl font-bold text-pink-700">{t.title}</h1>
              <p className="text-xs text-pink-500 mt-2 font-medium">{t.hint}</p>
            </div>

            <div className="w-full h-full relative my-4">
              {/* YES BUTTON */}
              <button
                onClick={() => setIsAccepted(true)}
                style={{ transform: `translate(-50%, -50%) scale(${yesScale})` }}
                className="absolute top-[40%] left-[30%] bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform duration-200 active:scale-95 z-20"
              >
                {t.yesBtn}
              </button>

              {/* NO BUTTON (DODGING) */}
              <button
                onPointerDown={dodgeNo}
                onMouseEnter={dodgeNo}
                style={{ top: noPos.top, left: noPos.left }}
                className="absolute bg-gray-200 text-gray-700 font-bold py-2 px-5 rounded-full shadow transition-all duration-300 ease-out z-10 touch-none"
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