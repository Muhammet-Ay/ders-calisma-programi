import { useState } from "react";

const SUBJECTS = {
  turkce: { name: "Türkçe", emoji: "📖", color: "#E74C3C", light: "#FDEDEC" },
  mat: { name: "Matematik", emoji: "🔢", color: "#2E86C1", light: "#D6EAF8" },
  fen: { name: "Fen Bilimleri", emoji: "🔬", color: "#27AE60", light: "#D5F5E3" },
  sosyal: { name: "Sosyal Bilgiler", emoji: "🌍", color: "#F39C12", light: "#FEF5E7" },
  ingilizce: { name: "İngilizce", emoji: "🇬🇧", color: "#8E44AD", light: "#F4ECF7" },
  din: { name: "Din Kültürü", emoji: "🕌", color: "#1ABC9C", light: "#D1F2EB" },
  kitap: { name: "Kitap Okuma", emoji: "📚", color: "#E67E22", light: "#FDEBD0" },
  tekrar: { name: "Haftalık Tekrar", emoji: "🔄", color: "#34495E", light: "#EAECEE" },
  test: { name: "Test / Deneme", emoji: "✍️", color: "#C0392B", light: "#F9EBEA" },
};

const SCHOOL_SCHEDULE = {
  pazartesi: ["Din Kültürü (2 ders)", "Türkçe (2 ders)"],
  sali: ["Fen Bilimleri (2)", "Sosyal Bilgiler (1)", "Matematik (1)", "Ahlak Bilgisi (1)", "Türkçe (2)"],
  carsamba: ["İngilizce (2)", "Matematik (2)", "Seçmeli İngilizce (2)"],
  persembe: ["İngilizce (1)", "Türkçe (2)", "Sosyal Bilgiler (2)"],
  cuma: ["Fen Bilimleri (2)", "Matematik (2)"],
};

const STUDY_PLAN = [
  {
    day: "Pazartesi",
    dayKey: "pazartesi",
    icon: "🌸",
    theme: "#E74C3C",
    blocks: [
      { subject: "turkce", title: "Türkçe Tekrar", duration: 30, detail: "Bugün okulda işlenen Türkçe konusunu defterden tekrar et. Bilmediğin kelimeleri sözlükten bul ve küçük bir kelime defterine yaz.", type: "tekrar" },
      { subject: "din", title: "Din Kültürü Tekrar", duration: 20, detail: "Bugün işlenen konuyu bir kez oku ve ana başlıkları defterine not al. Anlamadığın kısımları işaretle.", type: "tekrar" },
      { subject: "fen", title: "Fen Bilimleri Hazırlık", duration: 30, detail: "Yarın (Salı) okulda Fen dersi var. Konuyu kitaptan bir kez oku, resimlere ve şemalara dikkat et. Aklına gelen soruları kenara yaz.", type: "hazirlik" },
      { subject: "mat", title: "Matematik Hazırlık", duration: 25, detail: "Yarın Matematik dersi var. Yeni konunun kitaptaki açıklamalarını oku, örnek soruları incele. Anlamadığın yerleri işaretle.", type: "hazirlik" },
      { subject: "kitap", title: "Kitap Okuma", duration: 20, detail: "Yaşına uygun bir roman veya hikâye kitabından en az 10-15 sayfa oku. Okuduklarını kafanda canlandırmaya çalış.", type: "okuma" },
    ],
    tips: "💡 Pazartesi günü haftanın başlangıcı! Enerjini iyi kullan. Okuldan gelince 30 dk dinlen, atıştır, sonra çalışmaya başla."
  },
  {
    day: "Salı",
    dayKey: "sali",
    icon: "🌼",
    theme: "#27AE60",
    blocks: [
      { subject: "fen", title: "Fen Bilimleri Tekrar", duration: 30, detail: "Bugün okulda işlenen Fen konusunu defterden ve kitaptan tekrar et. Deneyleri ve gözlemleri hatırlamaya çalış. 5 tane konu ile ilgili soru çöz.", type: "tekrar" },
      { subject: "mat", title: "Matematik Tekrar", duration: 30, detail: "Bugünkü Matematik konusunu tekrar et. En az 10 soru çöz. Yanlış yaptığın soruları tekrar dene ve çözümlerini anla.", type: "tekrar" },
      { subject: "ingilizce", title: "İngilizce Hazırlık", duration: 25, detail: "Yarın (Çarşamba) İngilizce dersi var. Yeni kelimeleri öğren, ünite metnini bir kez oku. Bilmediğin kelimeleri İngilizce defterine yaz.", type: "hazirlik" },
      { subject: "kitap", title: "Kitap Okuma", duration: 20, detail: "Kitabına kaldığın yerden devam et. Bugün okuduğun bölümde en çok hoşuna giden yeri bir cümleyle yaz.", type: "okuma" },
    ],
    tips: "💡 Salı yoğun bir okul günü. Tekrarlara önem ver ve yorulursan molalarda biraz hareket et (dans, zıplama vs.)."
  },
  {
    day: "Çarşamba",
    dayKey: "carsamba",
    icon: "🌻",
    theme: "#2E86C1",
    blocks: [
      { subject: "ingilizce", title: "İngilizce Tekrar", duration: 25, detail: "Bugün okulda işlenen İngilizce konusunu tekrar et. Yeni kelimeleri 3 kez yaz, cümle içinde kullan. Dinleme varsa tekrar dinle.", type: "tekrar" },
      { subject: "mat", title: "Matematik Tekrar + Soru", duration: 35, detail: "Bugünkü Matematik konusunu tekrar et ve 15 soru çöz. Bu hafta öğrendiğin tüm konulardan karışık 5 soru da ekle.", type: "tekrar" },
      { subject: "turkce", title: "Türkçe Hazırlık", duration: 25, detail: "Perşembe Türkçe dersi var. Yeni konuyu kitaptan oku. Paragraf sorusu varsa bir paragraf çalışması yap.", type: "hazirlik" },
      { subject: "sosyal", title: "Sosyal Bilgiler Hazırlık", duration: 25, detail: "Perşembe Sosyal Bilgiler dersi var. Konuyu kitaptan oku, haritaları ve görselleri incele. Tarih konusuysa olayları sıraya koy.", type: "hazirlik" },
      { subject: "kitap", title: "Kitap Okuma", duration: 20, detail: "Kitabından 10-15 sayfa oku. Bugün okuduğun bölümdeki ana karakterin ne hissettiğini düşün.", type: "okuma" },
    ],
    tips: "💡 Çarşamba haftanın tam ortası! Hem tekrar hem hazırlık var. Aralarında 10'ar dakika mola unutma."
  },
  {
    day: "Perşembe",
    dayKey: "persembe",
    icon: "🌺",
    theme: "#8E44AD",
    blocks: [
      { subject: "turkce", title: "Türkçe Tekrar + Paragraf", duration: 30, detail: "Bugün okulda işlenen Türkçe konusunu tekrar et. 2 paragraf sorusu çöz. Dil bilgisi konusu varsa kuralları defterine özetle.", type: "tekrar" },
      { subject: "sosyal", title: "Sosyal Bilgiler Tekrar", duration: 25, detail: "Bugünkü Sosyal konusunu tekrar et. Önemli kavramları ve tarihleri küçük kartlara yaz (bilgi kartları).", type: "tekrar" },
      { subject: "fen", title: "Fen Bilimleri Hazırlık", duration: 30, detail: "Yarın (Cuma) Fen dersi var. Konuyu oku, deneyleri anlamaya çalış. Formül varsa defterine yaz ve ezberle.", type: "hazirlik" },
      { subject: "mat", title: "Matematik Hazırlık", duration: 30, detail: "Yarın Matematik var. Konuyu oku ve 10 alıştırma sorusu çöz. Daha önceki konulardan da 5 karışık soru çöz.", type: "hazirlik" },
      { subject: "kitap", title: "Kitap Okuma", duration: 20, detail: "Kitabından 10-15 sayfa oku. Eğer kitabı bitirdiysen yeni bir kitaba başla!", type: "okuma" },
    ],
    tips: "💡 Perşembe biraz yoğun ama Cuma'ya güzel hazırlanırsan hafta sonunu rahat geçirirsin!"
  },
  {
    day: "Cuma",
    dayKey: "cuma",
    icon: "🌈",
    theme: "#F39C12",
    blocks: [
      { subject: "fen", title: "Fen Bilimleri Tekrar", duration: 25, detail: "Bugün okulda işlenen Fen konusunu tekrar et. Bu hafta işlenen tüm Fen konularından 10 soru çöz.", type: "tekrar" },
      { subject: "mat", title: "Matematik Tekrar", duration: 30, detail: "Bugünkü Matematik konusunu tekrar et. Bu hafta işlenen tüm Matematik konularından 15 soru çöz.", type: "tekrar" },
      { subject: "turkce", title: "Türkçe Paragraf Çalışması", duration: 20, detail: "3 paragraf sorusu çöz. Her paragrafı dikkatlice oku, ana fikri ve yardımcı fikirleri bul.", type: "pekistirme" },
      { subject: "kitap", title: "Kitap Okuma", duration: 25, detail: "Cuma akşamı biraz daha uzun oku. 15-20 sayfa hedefle. Hafta sonu kitap hakkında düşüneceksin.", type: "okuma" },
    ],
    tips: "💡 Cuma günü biraz daha rahat! Tekrarlarını yap ve hafta sonuna hazırlan. Erken bitirirsen ödül olarak sevdiğin bir şeyi yap 🎮"
  },
  {
    day: "Cumartesi",
    dayKey: "cumartesi",
    icon: "⭐",
    theme: "#1ABC9C",
    blocks: [
      { subject: "turkce", title: "Türkçe Genel Tekrar", duration: 40, detail: "Bu hafta işlenen tüm Türkçe konularını tekrar et. 5 paragraf sorusu + 10 dil bilgisi sorusu çöz. Yanlışlarını analiz et.", type: "tekrar" },
      { subject: "mat", title: "Matematik Genel Tekrar", duration: 40, detail: "Bu haftanın tüm Matematik konularından 20 soru çöz. Yanlış yaptığın soruların konularını tekrar çalış. Problem çözmeye ağırlık ver.", type: "tekrar" },
      { subject: "ingilizce", title: "İngilizce Genel Tekrar", duration: 30, detail: "Bu haftanın kelimelerini tekrar et. Küçük bir İngilizce paragraf oku. 10 kelimeyle cümle kur. Mümkünse İngilizce bir şarkı dinle ve sözlerini anlamaya çalış.", type: "tekrar" },
      { subject: "test", title: "Mini Deneme Testi", duration: 30, detail: "Türkçe + Matematik karışık 20 soruluk mini bir deneme çöz. Süre tut (20 dakika). Bunu her hafta yap, gelişimini takip et!", type: "test" },
      { subject: "kitap", title: "Kitap Okuma + Özet", duration: 30, detail: "Bu hafta okuduklarını düşün ve 5-6 cümlelik kısa bir özet yaz. Kitaptaki en beğendiğin sahneyi anlat.", type: "okuma" },
    ],
    tips: "💡 Cumartesi en önemli gün! Haftalık genel tekrar + mini deneme ile eksiklerini gör. Sabah erken başla, öğleden sonran serbest!"
  },
  {
    day: "Pazar",
    dayKey: "pazar",
    icon: "🌟",
    theme: "#E67E22",
    blocks: [
      { subject: "fen", title: "Fen Bilimleri Genel Tekrar", duration: 35, detail: "Bu haftanın Fen konularını tekrar et. 10 soru çöz. Deneyleri ve gözlemleri defterine çiz veya şema yap.", type: "tekrar" },
      { subject: "sosyal", title: "Sosyal Bilgiler Genel Tekrar", duration: 30, detail: "Bu haftanın Sosyal konularını tekrar et. Bilgi kartlarını gözden geçir, 10 soru çöz. Harita çalışması varsa haritayı incele.", type: "tekrar" },
      { subject: "din", title: "Din Kültürü Hazırlık", duration: 20, detail: "Pazartesi Din Kültürü dersi var. Yeni konuyu kitaptan oku ve önemli kavramları not al.", type: "hazirlik" },
      { subject: "turkce", title: "Türkçe Hazırlık", duration: 20, detail: "Pazartesi Türkçe dersi var. Yeni konuya göz at, metni bir kez oku.", type: "hazirlik" },
      { subject: "kitap", title: "Kitap Okuma", duration: 25, detail: "Pazar günü rahat rahat kitap oku. Yeni bir bölüme geç veya yeni kitaba başla.", type: "okuma" },
    ],
    tips: "💡 Pazar günü hafif çalış ama Pazartesi'ye hazır ol! Öğleden sonra dinlen, oyun oyna, enerji topla 🌿"
  },
];

const BOOK_SUGGESTIONS = [
  { title: "Küçük Prens", author: "Antoine de Saint-Exupéry", why: "Hayal gücünü geliştirir, hayat dersleri verir" },
  { title: "Pollyanna", author: "Eleanor H. Porter", why: "Pozitif düşünmeyi öğretir" },
  { title: "Şeker Portakalı", author: "José Mauro de Vasconcelos", why: "Empati ve duygusal gelişim" },
  { title: "Charlie'nin Çikolata Fabrikası", author: "Roald Dahl", why: "Eğlenceli ve hayal gücü dolu" },
  { title: "Kafamda Bir Tuhaflık", author: "Orhan Pamuk", why: "İstanbul sevgisi, Türk edebiyatı tanışması" },
  { title: "Kaşağı", author: "Ömer Seyfettin", why: "Kısa ve etkili, Türkçe becerisi geliştirir" },
  { title: "Tom Sawyer'ın Maceraları", author: "Mark Twain", why: "Macera dolu, okuma sevgisi aşılar" },
  { title: "Hayvan Çiftliği", author: "George Orwell", why: "Eleştirel düşünme becerisi kazandırır" },
];

const WEEKLY_GOALS = [
  "📝 Haftada en az 50 Matematik sorusu çöz",
  "📖 Haftada en az 70 sayfa kitap oku",
  "✍️ Her gün en az 5 yeni kelime öğren (Türkçe + İngilizce)",
  "📊 Cumartesi mini deneme çöz ve puanını kaydet",
  "🔄 Yanlış soruları hata defterine yaz",
  "🗣️ Haftada 1 kez ailene öğrendiğin bir konuyu anlat",
];

export default function StudyPlanner() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [completedBlocks, setCompletedBlocks] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState("program");
  const [showSchool, setShowSchool] = useState(false);

  const toggleBlock = (dayIdx: number, blockIdx: number) => {
    const key = `${dayIdx}-${blockIdx}`;
    setCompletedBlocks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const currentDay = STUDY_PLAN[selectedDay];
  const totalMinutes = currentDay.blocks.reduce((s, b) => s + b.duration, 0);
  const completedCount = currentDay.blocks.filter((_, i) => completedBlocks[`${selectedDay}-${i}`] === true).length;
  const progress = Math.round((completedCount / currentDay.blocks.length) * 100);

  const typeLabels: Record<string, string> = { tekrar: "Tekrar", hazirlik: "Hazırlık", okuma: "Okuma", pekistirme: "Pekiştirme", test: "Test" };
  const typeColors: Record<string, string> = { tekrar: "#3498DB", hazirlik: "#E67E22", okuma: "#27AE60", pekistirme: "#9B59B6", test: "#E74C3C" };

  return (
    <div style={{ fontFamily: "'Nunito', 'Segoe UI', sans-serif", background: "linear-gradient(135deg, #FFECD2 0%, #FCB69F 50%, #FFECD2 100%)", minHeight: "100vh", padding: "0" }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Baloo+2:wght@700;800&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FED766 100%)", padding: "28px 20px 22px", textAlign: "center", borderRadius: "0 0 30px 30px", boxShadow: "0 8px 32px rgba(255,107,107,0.3)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -20, left: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
        <div style={{ position: "absolute", bottom: -10, right: 30, width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
        <h1 style={{ fontFamily: "'Baloo 2', cursive", fontSize: "28px", color: "#fff", margin: 0, textShadow: "2px 2px 4px rgba(0,0,0,0.15)", letterSpacing: "0.5px" }}>
          📚 Ders Çalışma Programı
        </h1>
        <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "14px", margin: "6px 0 0", fontWeight: 600 }}>
          5. Sınıf • Haftalık Akıllı Çalışma Planı
        </p>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: "flex", gap: "8px", padding: "16px 16px 0", justifyContent: "center" }}>
        {[
          { key: "program", label: "📅 Program", },
          { key: "kitaplar", label: "📚 Kitaplar" },
          { key: "hedefler", label: "🎯 Hedefler" },
          { key: "ipuclari", label: "💡 İpuçları" },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: "8px 14px", border: "none", borderRadius: "20px", fontSize: "13px", fontWeight: 700,
              fontFamily: "'Nunito', sans-serif", cursor: "pointer", transition: "all 0.3s",
              background: activeTab === tab.key ? "#FF6B6B" : "rgba(255,255,255,0.7)",
              color: activeTab === tab.key ? "#fff" : "#555",
              boxShadow: activeTab === tab.key ? "0 4px 15px rgba(255,107,107,0.4)" : "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "program" && (
        <div style={{ padding: "16px" }}>
          {/* Day Selector */}
          <div style={{ display: "flex", gap: "6px", overflowX: "auto", padding: "4px 0 12px", WebkitOverflowScrolling: "touch" }}>
            {STUDY_PLAN.map((day, idx) => {
              const dayCompleted = day.blocks.every((_, i) => completedBlocks[`${idx}-${i}`] === true);
              const dayPartial = day.blocks.some((_, i) => completedBlocks[`${idx}-${i}`] === true);
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDay(idx)}
                  style={{
                    minWidth: "52px", padding: "10px 6px", border: "3px solid",
                    borderColor: selectedDay === idx ? day.theme : dayCompleted ? "#27AE60" : "transparent",
                    borderRadius: "16px", fontSize: "11px", fontWeight: 800, cursor: "pointer",
                    fontFamily: "'Nunito', sans-serif", transition: "all 0.3s",
                    background: selectedDay === idx ? `${day.theme}15` : dayCompleted ? "#D5F5E315" : "rgba(255,255,255,0.8)",
                    color: selectedDay === idx ? day.theme : "#555",
                    boxShadow: selectedDay === idx ? `0 4px 15px ${day.theme}30` : "0 2px 8px rgba(0,0,0,0.06)",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: "2px",
                  }}
                >
                  <span style={{ fontSize: "18px" }}>{day.icon}</span>
                  <span>{day.day.slice(0, 3)}</span>
                  {dayCompleted && <span style={{ fontSize: "10px" }}>✅</span>}
                  {dayPartial && !dayCompleted && <span style={{ fontSize: "8px", color: "#F39C12" }}>●●●</span>}
                </button>
              );
            })}
          </div>

          {/* Day Header */}
          <div style={{
            background: `linear-gradient(135deg, ${currentDay.theme}15, ${currentDay.theme}08)`,
            borderRadius: "20px", padding: "16px 18px", marginBottom: "12px",
            border: `2px solid ${currentDay.theme}25`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <h2 style={{ margin: 0, fontSize: "20px", color: currentDay.theme, fontFamily: "'Baloo 2', cursive" }}>
                {currentDay.icon} {currentDay.day}
              </h2>
              <div style={{ display: "flex", gap: "10px", fontSize: "12px", fontWeight: 700, color: "#666" }}>
                <span>⏱ {totalMinutes} dk</span>
                <span>📋 {currentDay.blocks.length} ders</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ background: "rgba(0,0,0,0.08)", borderRadius: "10px", height: "10px", overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: "10px", transition: "width 0.5s ease",
                width: `${progress}%`,
                background: progress === 100 ? "linear-gradient(90deg, #27AE60, #2ECC71)" : `linear-gradient(90deg, ${currentDay.theme}, ${currentDay.theme}AA)`,
              }} />
            </div>
            <p style={{ margin: "6px 0 0", fontSize: "12px", fontWeight: 700, color: progress === 100 ? "#27AE60" : "#888", textAlign: "right" }}>
              {progress === 100 ? "🎉 Bugünkü hedef tamamlandı!" : `${completedCount}/${currentDay.blocks.length} tamamlandı`}
            </p>
          </div>

          {/* School Schedule Toggle */}
          <button
            onClick={() => setShowSchool(!showSchool)}
            style={{
              width: "100%", padding: "10px", border: "2px dashed #ccc", borderRadius: "12px",
              background: showSchool ? "#f8f9fa" : "rgba(255,255,255,0.5)", cursor: "pointer",
              fontSize: "13px", fontWeight: 700, color: "#777", fontFamily: "'Nunito', sans-serif",
              marginBottom: "12px", transition: "all 0.3s",
            }}
          >
            {showSchool ? "▲" : "▼"} Okul Ders Programı {showSchool ? "Gizle" : "Göster"}
          </button>

          {showSchool && SCHOOL_SCHEDULE[currentDay.dayKey as keyof typeof SCHOOL_SCHEDULE] && (
            <div style={{
              background: "rgba(255,255,255,0.7)", borderRadius: "14px", padding: "14px",
              marginBottom: "12px", border: "1px solid #eee",
            }}>
              <p style={{ margin: "0 0 8px", fontSize: "13px", fontWeight: 800, color: "#555" }}>🏫 Bugünkü Okul Dersleri:</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {SCHOOL_SCHEDULE[currentDay.dayKey as keyof typeof SCHOOL_SCHEDULE].map((s, i) => (
                  <span key={i} style={{
                    background: "#fff", padding: "4px 10px", borderRadius: "8px", fontSize: "12px",
                    fontWeight: 600, color: "#555", border: "1px solid #e0e0e0",
                  }}>{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Study Blocks */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {currentDay.blocks.map((block, idx) => {
              const isCompleted = completedBlocks[`${selectedDay}-${idx}`] === true;
              const subj = SUBJECTS[block.subject as keyof typeof SUBJECTS];
              return (
                <div
                  key={idx}
                  onClick={() => toggleBlock(selectedDay, idx)}
                  style={{
                    background: isCompleted ? `${subj.color}08` : "rgba(255,255,255,0.85)",
                    borderRadius: "18px", padding: "16px", cursor: "pointer",
                    border: `2px solid ${isCompleted ? subj.color + "40" : "#eee"}`,
                    boxShadow: isCompleted ? "none" : "0 3px 15px rgba(0,0,0,0.06)",
                    transition: "all 0.3s", opacity: isCompleted ? 0.7 : 1,
                    position: "relative", overflow: "hidden",
                  }}
                >
                  {isCompleted && (
                    <div style={{
                      position: "absolute", top: 10, right: 12, fontSize: "22px",
                    }}>✅</div>
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <span style={{
                      fontSize: "28px", width: "44px", height: "44px", display: "flex",
                      alignItems: "center", justifyContent: "center", borderRadius: "14px",
                      background: subj.light,
                    }}>
                      {subj.emoji}
                    </span>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        margin: 0, fontSize: "15px", fontWeight: 800, color: subj.color,
                        textDecoration: isCompleted ? "line-through" : "none",
                      }}>
                        {block.title}
                      </h3>
                      <div style={{ display: "flex", gap: "8px", marginTop: "3px" }}>
                        <span style={{
                          fontSize: "11px", fontWeight: 700, color: "#888",
                          background: "#f0f0f0", padding: "2px 8px", borderRadius: "6px",
                        }}>⏱ {block.duration} dk</span>
                        <span style={{
                          fontSize: "11px", fontWeight: 700, color: typeColors[block.type],
                          background: typeColors[block.type] + "15", padding: "2px 8px", borderRadius: "6px",
                        }}>{typeLabels[block.type]}</span>
                      </div>
                    </div>
                  </div>
                  <p style={{
                    margin: 0, fontSize: "13px", color: "#666", lineHeight: "1.6", fontWeight: 500,
                  }}>
                    {block.detail}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Daily Tip */}
          <div style={{
            marginTop: "14px", background: "linear-gradient(135deg, #FFF9C4, #FFECB3)",
            borderRadius: "16px", padding: "14px 16px", border: "2px solid #FFD54F",
          }}>
            <p style={{ margin: 0, fontSize: "13px", color: "#7B6B2E", fontWeight: 600, lineHeight: 1.6 }}>
              {currentDay.tips}
            </p>
          </div>

          {/* Mola Hatırlatması */}
          <div style={{
            marginTop: "12px", background: "rgba(255,255,255,0.6)", borderRadius: "14px",
            padding: "12px 16px", textAlign: "center",
          }}>
            <p style={{ margin: 0, fontSize: "12px", color: "#666", fontWeight: 600, lineHeight: 1.6 }}>
              ⏸️ Her ders bloğu arasında <span style={{ color: "#E74C3C", fontSize: "14px" }}>10 dakika mola</span> ver!
              <br />Su iç 💧 • Biraz yürü 🚶‍♀️ • Gözlerini dinlendir 👀
            </p>
          </div>
        </div>
      )}

      {activeTab === "kitaplar" && (
        <div style={{ padding: "16px" }}>
          <div style={{
            background: "rgba(255,255,255,0.85)", borderRadius: "20px", padding: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          }}>
            <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: "22px", color: "#E67E22", margin: "0 0 4px" }}>
              📚 Önerilen Kitaplar
            </h2>
            <p style={{ fontSize: "13px", color: "#888", margin: "0 0 16px", fontWeight: 600 }}>
              5. sınıf seviyesine uygun, gelişim destekleyici kitaplar
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {BOOK_SUGGESTIONS.map((book, idx) => (
                <div key={idx} style={{
                  background: idx % 2 === 0 ? "#FFF8F0" : "#F0F8FF", borderRadius: "14px",
                  padding: "14px", border: "1px solid #eee",
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ fontSize: "28px", marginTop: "2px" }}>
                      {["📕", "📗", "📘", "📙", "📓", "📔", "📒", "📚"][idx]}
                    </span>
                    <div>
                      <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 800, color: "#333" }}>{book.title}</h3>
                      <p style={{ margin: "2px 0 4px", fontSize: "12px", color: "#888", fontWeight: 600 }}>{book.author}</p>
                      <p style={{ margin: 0, fontSize: "12px", color: "#27AE60", fontWeight: 700 }}>✨ {book.why}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: "16px", background: "linear-gradient(135deg, #E8F8F5, #D5F5E3)",
              borderRadius: "14px", padding: "14px", border: "2px solid #82E0AA",
            }}>
              <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#1E8449", lineHeight: 1.6 }}>
                📖 <strong>Okuma Hedefi:</strong> Haftada en az 70 sayfa, ayda 1-2 kitap bitirmek. Her gün 15-25 dakika düzenli okuma alışkanlığı kazan!
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "hedefler" && (
        <div style={{ padding: "16px" }}>
          <div style={{
            background: "rgba(255,255,255,0.85)", borderRadius: "20px", padding: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          }}>
            <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: "22px", color: "#E74C3C", margin: "0 0 16px" }}>
              🎯 Haftalık Hedefler
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {WEEKLY_GOALS.map((goal, idx) => (
                <div key={idx} style={{
                  background: "#fff", borderRadius: "12px", padding: "12px 14px",
                  border: "1px solid #eee", fontSize: "14px", fontWeight: 600, color: "#444",
                  display: "flex", alignItems: "center", gap: "10px",
                }}>
                  <span style={{
                    width: "28px", height: "28px", borderRadius: "50%", display: "flex",
                    alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 900,
                    background: ["#FF6B6B", "#FFC107", "#4CAF50", "#2196F3", "#9C27B0", "#FF9800"][idx] + "20",
                    color: ["#FF6B6B", "#FFC107", "#4CAF50", "#2196F3", "#9C27B0", "#FF9800"][idx],
                  }}>{idx + 1}</span>
                  {goal}
                </div>
              ))}
            </div>

            <div style={{
              marginTop: "18px", background: "linear-gradient(135deg, #FCE4EC, #F8BBD0)",
              borderRadius: "14px", padding: "16px", border: "2px solid #F48FB1",
            }}>
              <h3 style={{ margin: "0 0 8px", fontSize: "15px", color: "#AD1457", fontWeight: 800 }}>
                📊 Gelişim Takibi
              </h3>
              <p style={{ margin: 0, fontSize: "13px", color: "#880E4F", fontWeight: 600, lineHeight: 1.7 }}>
                Her Cumartesi çözdüğün mini denemenin puanını bir deftere yaz. Hafta hafta puanlarını karşılaştır.
                4 hafta sonunda belirgin bir gelişim göreceksin! Hedef: Her hafta bir öncekinden daha iyi yapmak.
              </p>
            </div>

            <div style={{
              marginTop: "12px", background: "linear-gradient(135deg, #E8F5E9, #C8E6C9)",
              borderRadius: "14px", padding: "16px", border: "2px solid #81C784",
            }}>
              <h3 style={{ margin: "0 0 8px", fontSize: "15px", color: "#2E7D32", fontWeight: 800 }}>
                📝 Hata Defteri
              </h3>
              <p style={{ margin: 0, fontSize: "13px", color: "#1B5E20", fontWeight: 600, lineHeight: 1.7 }}>
                Bir defter al ve adını "Hata Defteri" koy. Yanlış yaptığın her soruyu buraya yaz, doğru çözümünü yanına ekle.
                Sınav öncesi sadece bu defteri tekrar etmen bile büyük fark yaratır!
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "ipuclari" && (
        <div style={{ padding: "16px" }}>
          <div style={{
            background: "rgba(255,255,255,0.85)", borderRadius: "20px", padding: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          }}>
            <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: "22px", color: "#8E44AD", margin: "0 0 16px" }}>
              💡 Etkili Çalışma İpuçları
            </h2>

            {[
              { emoji: "🧠", title: "Pomodoro Tekniği", desc: "25 dakika çalış, 5 dakika mola ver. Her 4 turdan sonra 15-20 dakika uzun mola yap. Bu teknik odaklanmayı artırır." },
              { emoji: "📝", title: "Aktif Öğrenme", desc: "Sadece okuma yapma! Okuduğunu kendi cümlelerinle defterine yaz, birine anlatıyormuş gibi sesli tekrar et." },
              { emoji: "🔄", title: "Aralıklı Tekrar", desc: "Bir konuyu öğrendiğin gün, 1 gün sonra, 3 gün sonra ve 1 hafta sonra tekrar et. Bu şekilde kalıcı hafızaya yerleşir." },
              { emoji: "🎨", title: "Renkli Notlar", desc: "Farklı renkli kalemler kullan. Önemli kavramları kırmızı, formülleri mavi, örnekleri yeşil ile yaz. Görsel hafıza güçlenir." },
              { emoji: "⏰", title: "Düzenli Saat", desc: "Her gün aynı saatte çalışmaya başla. Beden ve zihin o saatte otomatik çalışma moduna geçer." },
              { emoji: "🍎", title: "Beslenme & Uyku", desc: "Çalışmadan önce hafif atıştır (meyve, kuruyemiş). Günde en az 8-9 saat uyu. Yorgun beyinle çalışmak verimli değildir." },
              { emoji: "📱", title: "Dikkat Dağıtıcılar", desc: "Çalışırken telefon ve tablet kapalı veya başka odada olsun. TV kapalı olsun. Sessiz bir ortam bul." },
              { emoji: "🏆", title: "Ödül Sistemi", desc: "Günlük hedefini tamamlayınca kendine küçük bir ödül ver: sevdiğin bir oyunu oyna, dizi izle, arkadaşlarınla oyna." },
            ].map((tip, idx) => (
              <div key={idx} style={{
                background: idx % 2 === 0 ? "#FAFAFA" : "#F5F0FF",
                borderRadius: "14px", padding: "14px", marginBottom: "10px",
                border: "1px solid #eee",
              }}>
                <h3 style={{ margin: "0 0 6px", fontSize: "15px", fontWeight: 800, color: "#333" }}>
                  {tip.emoji} {tip.title}
                </h3>
                <p style={{ margin: 0, fontSize: "13px", color: "#555", lineHeight: 1.6, fontWeight: 500 }}>
                  {tip.desc}
                </p>
              </div>
            ))}

            <div style={{
              marginTop: "8px", background: "linear-gradient(135deg, #FFF3E0, #FFE0B2)",
              borderRadius: "14px", padding: "14px", border: "2px solid #FFB74D", textAlign: "center",
            }}>
              <p style={{ margin: 0, fontSize: "14px", fontWeight: 800, color: "#E65100", lineHeight: 1.7 }}>
                🌟 Unutma: Düzenli ve az çalışmak, düzensiz ve çok çalışmaktan HER ZAMAN daha iyidir!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "20px 16px 30px", fontSize: "11px", color: "#999", fontWeight: 600 }}>
        Tıkla ve tamamladığın dersleri işaretle ✅ • Her gün düzenli çalış 💪
      </div>
    </div>
  );
}
