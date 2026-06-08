import { useState, useEffect } from 'react';
import { 
  Check, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  Heart, 
  Copy, 
  FolderOpen, 
  BookOpen,
  Award,
  BookMarked,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MODULES, MATERIALS, MAIN_DRIVE_FOLDER, PIX_CONFIG } from './data';

export default function App() {
  // Persistence of completed lesson IDs
  const [completedLessons, setCompletedLessons] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('dofioaoterco_completed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Track which modules are visually expanded
  const [expandedModules, setExpandedModules] = useState<string[]>(['modulo-1']);

  // Track which lessons are currently playing their video
  const [playingLessons, setPlayingLessons] = useState<Record<number, boolean>>({});

  // Active lesson in Cinema Mode Modal
  const [activeVideoLesson, setActiveVideoLesson] = useState<typeof MODULES[0]['lessons'][0] | null>(null);

  // Elegant notifications (Toasts)
  const [toasts, setToasts] = useState<{ id: string; message: string }[]>([]);

  // Sound/Vibration/State synchronization
  useEffect(() => {
    localStorage.setItem('dofioaoterco_completed', JSON.stringify(completedLessons));
  }, [completedLessons]);

  const toggleLessonCompleted = (lessonId: number, lessonTitle: string) => {
    const isCompleted = completedLessons.includes(lessonId);
    if (isCompleted) {
      setCompletedLessons(prev => prev.filter(id => id !== lessonId));
      addToast(`Aula "${lessonTitle}" revertida.`);
    } else {
      setCompletedLessons(prev => [...prev, lessonId]);
      addToast(`✨ Aula "${lessonTitle}" marcada como concluída!`);
    }
  };

  const toggleModuleExpanded = (moduleId: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const playVideo = (lesson: typeof MODULES[0]['lessons'][0]) => {
    setActiveVideoLesson(lesson);
  };

  const addToast = (message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(PIX_CONFIG.key).then(() => {
      addToast("❤ Chave PIX copiada para a área de transferência!");
    }).catch(() => {
      addToast("Chave PIX: " + PIX_CONFIG.key);
    });
  };

  // Stats
  const totalLessons = 12;
  const completedCount = completedLessons.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="min-h-screen relative font-sans text-text-dark pb-20 select-none overflow-x-hidden bg-marfim selection:bg-rose selection:text-text-dark">
      
      {/* 1. Ambient Decorative Canvas Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-gradient-to-b from-marfim to-areia-light">
        {/* Paper texture overlay with sutil noise (1.5% opacity) */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />

        {/* Ambient Gaussian Halos */}
        <div className="absolute top-[-10%] right-[-5%] w-[45vw] h-[45vw] bg-rose rounded-full blur-[140px] opacity-[0.35] animate-glow-1" />
        <div className="absolute bottom-[-15%] left-[-5%] w-[40vw] h-[40vw] bg-areia rounded-full blur-[140px] opacity-[0.35] animate-glow-2" />
        <div className="absolute top-[35%] left-[15%] w-[30vw] h-[30vw] bg-gold-light rounded-full blur-[140px] opacity-[0.15] animate-glow-3" />

        {/* Ambient Subtle SVGs - Left Rosary */}
        <svg className="absolute top-0 left-[3%] w-[90px] h-[80vh] opacity-[0.025] text-gold" viewBox="0 0 100 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 0 L50 500" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 12" strokeLinecap="round"/>
          <circle cx="50" cy="120" r="3.5" fill="currentColor"/>
          <circle cx="50" cy="250" r="3.5" fill="currentColor"/>
          <circle cx="50" cy="380" r="3.5" fill="currentColor"/>
          <circle cx="50" cy="480" r="4.5" fill="currentColor"/>
          <path d="M46 492 L54 492 L50 500 Z" fill="currentColor"/>
          <line x1="50" y1="500" x2="50" y2="540" stroke="currentColor" strokeWidth="1.2"/>
          <circle cx="50" cy="520" r="3" fill="currentColor"/>
          <path d="M50 540 V600 M42 558 H58" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>

        {/* Ambient Subtle SVGs - Right Rosary */}
        <svg className="absolute top-[10vh] right-[3%] w-[90px] h-[80vh] opacity-[0.025] text-gold" viewBox="0 0 100 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 0 L50 600" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 12" strokeLinecap="round"/>
          <circle cx="50" cy="180" r="3" fill="currentColor"/>
          <circle cx="50" cy="360" r="3" fill="currentColor"/>
          <circle cx="50" cy="540" r="3.5" fill="currentColor"/>
          <path d="M46 550 L54 550 L50 558 Z" fill="currentColor"/>
          <line x1="50" y1="558" x2="50" y2="598" stroke="currentColor" strokeWidth="1"/>
          <circle cx="50" cy="578" r="2.5" fill="currentColor"/>
          <path d="M50 598 V650 M44 614 H56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>

        {/* Top Right Decorative Arabesque */}
        <svg className="absolute top-0 right-0 w-[320px] h-[320px] opacity-[0.025] text-gold origin-top-right" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M300 0 C250 50, 180 80, 100 80 C60 80, 20 60, 0 40" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          <path d="M300 0 C220 70, 160 120, 120 180 C90 220, 80 260, 80 300" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          <path d="M250 0 C200 40, 150 90, 150 140 C150 170, 170 200, 200 200 C230 200, 250 170, 250 140" stroke="currentColor" strokeWidth="0.8"/>
          <circle cx="150" cy="140" r="2" fill="currentColor"/>
          <circle cx="200" cy="200" r="2" fill="currentColor"/>
          <circle cx="100" cy="80" r="2" fill="currentColor"/>
          <path d="M220 80 L220 100 M210 90 H230" stroke="currentColor" strokeWidth="1"/>
          <path d="M80 180 L80 200 M70 190 H90" stroke="currentColor" strokeWidth="1"/>
        </svg>

        {/* Bottom Left Decorative Arabesque */}
        <svg className="absolute bottom-0 left-0 w-[300px] h-[300px] opacity-[0.025] text-gold origin-bottom-left" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 300 C50 250, 120 220, 200 220 C240 220, 280 240, 300 260" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          <path d="M0 300 C80 230, 140 180, 180 120 C210 80, 220 40, 220 0" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          <circle cx="150" cy="160" r="2" fill="currentColor"/>
          <path d="M80 220 L80 200 M70 210 H90" stroke="currentColor" strokeWidth="1"/>
        </svg>
      </div>

      {/* 2. Sticky Header with Course Completion Progress */}
      <span id="topo" />
      <header className="sticky top-0 z-50 bg-marfim/85 backdrop-blur-md border-b border-gold/12 shadow-[0_2px_20px_rgba(88,73,62,0.02)] transition-all">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <a href="#topo" className="font-serif text-2xl font-normal tracking-[0.16em] text-text-dark hover:opacity-85 transition-opacity">
            DO FIO AO <span className="text-gold">TERÇO</span>
          </a>

          {/* Progress Widget */}
          <div className="flex items-center gap-4 bg-white/85 border border-gold/20 px-5 py-2.5 rounded-full shadow-sm backdrop-blur">
            <span className="text-xs font-semibold tracking-wide text-text-dark uppercase">
              {completedCount} de {totalLessons} aulas concluídas
            </span>
            <div className="w-24 sm:w-32 h-2.5 bg-areia-light rounded-full overflow-hidden relative">
              <motion.div 
                className="h-full bg-gold rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <span className="text-xs font-bold text-gold shrink-0">
              {progressPercent}%
            </span>
          </div>
        </div>
      </header>

      {/* 3. Hero Section */}
      <section className="relative px-6 pt-16 pb-12 max-w-4xl mx-auto text-center flex flex-col items-center">
        <div className="text-gold text-lg tracking-[0.25em] mb-3 select-none font-serif">✦ ✟ ✦</div>
        <span className="text-[10px] font-bold tracking-[0.3em] font-sans text-gold uppercase mb-5">
          MÉTODOS EXCLUSIVOS • ÁREA DE ESTUDOS
        </span>

        <div className="relative mb-6 select-none group">
          {/* Subtle Golden halo behind title */}
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-72 h-72 bg-gold-light/20 rounded-full blur-[60px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
          <h1 className="relative font-serif text-5xl md:text-7xl font-light tracking-[0.12em] text-text-dark">
            DO FIO AO TERÇO
          </h1>
        </div>

        <p className="max-w-xl text-lg md:text-xl font-serif text-text-muted italic leading-relaxed mb-8">
          Aprenda a montar terços com beleza, significado e propósito.
        </p>

        {/* Ornamental separator divider */}
        <div className="w-full max-w-sm mb-10 text-gold opacity-80">
          <svg viewBox="0 0 400 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[85%] mx-auto">
            <path d="M0 10 L170 10 C185 10, 192 5, 200 0 C208 5, 215 10, 230 10 L400 10" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M196 10 L200 6 L204 10 L200 14 Z" fill="currentColor"/>
            <circle cx="170" cy="10" r="2.5" fill="currentColor"/>
            <circle cx="230" cy="10" r="2.5" fill="currentColor"/>
          </svg>
        </div>

        <a 
          href="#modulos" 
          className="px-10 py-4 font-sans text-xs font-bold tracking-[0.25em] uppercase text-white bg-gold hover:bg-gold-dark rounded-full shadow-[0_12px_24px_rgba(201,168,106,0.25)] hover:shadow-[0_15px_30px_rgba(168,134,72,0.35)] shrink-0 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
        >
          COMEÇAR AGORA
        </a>
      </section>

      {/* 4. Support Materials Section (Apostilas e Materiais) */}
      <section className="px-6 py-12 max-w-[1200px] mx-auto" id="materiais">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch bg-white/70 border border-gold/15 p-8 md:p-12 rounded-3xl backdrop-blur-sm shadow-md">
          {/* Header col */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <span className="text-[10px] font-bold tracking-[0.2em] text-gold uppercase mb-3">
              ✦ MATERIAL DE APOIO
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-normal tracking-wide text-text-dark mb-4">
              Apostilas e Materiais
            </h2>
            <p className="text-sm text-text-muted leading-relaxed mb-6">
              Baixe ou visualize os materiais complementares para acompanhar sua jornada no Do Fio ao Terço.
            </p>
            <a 
              href={MAIN_DRIVE_FOLDER} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 self-start text-xs font-bold tracking-wider text-gold hover:text-gold-dark transition-colors group"
            >
              <FolderOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Abrir Pasta Completa →</span>
            </a>
          </div>

          {/* Grid col */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {MATERIALS.map((mat) => (
              <a 
                key={mat.id}
                href={mat.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col p-6 bg-white/90 border border-gold/12 hover:border-gold/30 rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <span className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block self-start">
                  {mat.icon}
                </span>
                <h3 className="font-serif text-base font-semibold text-text-dark group-hover:text-gold transition-colors leading-snug mb-3 min-h-[44px]">
                  {mat.title}
                </h3>
                <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-gold/80 hover:text-gold">
                  <BookMarked className="w-3.5 h-3.5" />
                  Abrir PDF
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Course Modules & Interactive Accordions */}
      <main className="px-6 py-8 max-w-[1000px] mx-auto" id="modulos">
        <div className="space-y-8">
          {MODULES.map((mod) => {
            const isExpanded = expandedModules.includes(mod.id);
            const totalModLessons = mod.lessons.length;
            const completedModLessons = mod.lessons.filter(l => completedLessons.includes(l.id)).length;

            return (
              <div 
                key={mod.id} 
                className="bg-white/80 border border-gold/15 rounded-3xl overflow-hidden shadow-md group hover:border-gold/25 transition-colors"
              >
                {/* Accordion Trigger Header */}
                <button 
                  onClick={() => toggleModuleExpanded(mod.id)}
                  aria-expanded={isExpanded}
                  className="w-full flex flex-col md:flex-row justify-between items-start md:items-center p-6 md:p-8 text-left hover:bg-white/40 transition-colors gap-4"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-gold text-lg select-none font-serif">✦</span>
                    <div>
                      <span className="text-[10px] font-bold tracking-[0.25em] text-gold uppercase block mb-1">
                        Módulo {mod.number}
                      </span>
                      <h2 className="font-serif text-2xl md:text-3xl font-light text-text-dark">
                        {mod.title}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-stretch md:self-auto justify-between border-t border-gold/5 pt-4 md:pt-0 md:border-0">
                    <span className={`text-xs font-semibold px-4 py-1.5 rounded-full ${
                      completedModLessons === totalModLessons 
                        ? 'bg-success/15 text-success-dark font-bold' 
                        : 'bg-areia-light/60 text-text-muted'
                    }`}>
                      {completedModLessons} / {totalModLessons} concluídas
                    </span>
                    <div className="text-gold p-1.5 rounded-full border border-gold/15 hover:bg-gold/10 transition-colors">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </button>

                {/* Collapsible Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <div className="border-t border-gold/10 p-6 md:p-8 bg-[#FDFBF9]/50 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {mod.lessons.map((lesson) => {
                            const isCompleted = completedLessons.includes(lesson.id);
                            const isPlaying = playingLessons[lesson.id];

                            return (
                              <div 
                                key={lesson.id}
                                className={`flex flex-col bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${
                                  isCompleted ? 'border-success/30 ring-1 ring-success/10' : 'border-gold/10'
                                }`}
                              >
                                {/* Video Container */}
                                <div className="aspect-video relative bg-neutral-950 flex items-center justify-center group/video overflow-hidden">
                                  {/* High Resolution Thumbnail from YouTube */}
                                  <button
                                    onClick={() => playVideo(lesson)}
                                    className="w-full h-full border-0 p-0 m-0 block relative outline-none focus:ring-2 focus:ring-gold/40"
                                    aria-label={`Assistir à aula de ${lesson.title}`}
                                  >
                                    <img 
                                      src={`https://img.youtube.com/vi/${lesson.youtubeId}/hqdefault.jpg`} 
                                      alt={lesson.title}
                                      className="w-full h-full object-cover opacity-80 group-hover/video:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-neutral-900/30 group-hover/video:bg-neutral-900/40 transition-colors" />
                                    
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-full bg-white/95 text-gold group-hover/video:scale-110 group-hover/video:text-gold-dark transition-all shadow-lg flex items-center justify-center z-10">
                                      <Play className="w-6 h-6 fill-gold" />
                                    </div>
                                    
                                    <span className="absolute bottom-3 left-3 bg-neutral-900/70 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full backdrop-blur-sm">
                                      Assistir Aula {lesson.id}
                                    </span>
                                  </button>
                                </div>

                                {/* Class Info Content */}
                                <div className="p-5 flex-1 flex flex-col justify-between">
                                  <div>
                                    <div className="flex items-center gap-3 mb-2">
                                      <span className="font-serif text-sm font-semibold text-gold bg-gold/10 px-2.5 py-0.5 rounded-md">
                                        {lesson.id < 10 ? `0${lesson.id}` : lesson.id}
                                      </span>
                                      <span className="h-[1px] w-8 bg-gold/35" />
                                      <Award className={`w-4 h-4 ${isCompleted ? 'text-success' : 'text-gold/40'}`} />
                                    </div>

                                    <h3 className="font-serif text-lg font-bold text-text-dark leading-snug mb-2">
                                      {lesson.title}
                                    </h3>
                                    <p className="text-xs text-text-muted leading-relaxed">
                                      {lesson.description}
                                    </p>
                                  </div>

                                  {/* Completion Action */}
                                  <div className="mt-5 pt-4 border-t border-gold/5">
                                    <button
                                      onClick={() => toggleLessonCompleted(lesson.id, lesson.title)}
                                      className={`w-full flex items-center justify-center gap-2 p-2.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                                        isCompleted 
                                          ? 'bg-success/15 hover:bg-success/25 text-success-dark' 
                                          : 'bg-marfim border border-gold/25 hover:border-gold text-text-dark hover:bg-gold/5'
                                      }`}
                                    >
                                      {isCompleted ? (
                                        <>
                                          <Check className="w-4 h-4 text-success" />
                                          <span>Aula Concluída</span>
                                        </>
                                      ) : (
                                        <span>Concluir Aula</span>
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </main>

      {/* 6. Support / PIX Section Card */}
      <section className="px-6 py-12 max-w-[1000px] mx-auto" id="apoiar">
        <div className="bg-white/90 border border-gold/20 p-8 md:p-12 rounded-[2rem] text-center max-w-xl mx-auto shadow-md relative overflow-hidden">
          {/* Subtle gold lines block */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-rose via-gold to-rose-light" />
          
          <div className="inline-flex p-3 rounded-full bg-rose/30 text-rose-dark animate-pulse mb-4">
            <Heart className="w-8 h-8 fill-rose-dark" />
          </div>

          <h2 className="font-serif text-2xl md:text-3xl font-normal text-text-dark mb-4">
            Apoie o Projeto
          </h2>
          <p className="text-xs md:text-sm text-text-muted leading-relaxed mb-8">
            Se estas aulas ajudaram você a aprender a montar terços e quiser apoiar este projeto de forma espontânea, sua contribuição ajuda a manter esta área organizada e acessível.
          </p>

          <div className="bg-marfim border border-gold/20 p-5 rounded-2xl flex flex-col sm:flex-row justify-around gap-4 mb-6 relative">
            <div className="text-center sm:text-left">
              <span className="text-[10px] font-bold tracking-widest text-gold block mb-1">
                PIX CELULAR
              </span>
              <h3 className="font-serif text-lg font-bold text-text-dark select-all">
                {PIX_CONFIG.key}
              </h3>
            </div>
            
            <div className="hidden sm:block w-[1px] bg-gold/20 self-stretch" />
            <hr className="sm:hidden border-gold/20 w-full" />

            <div className="text-center sm:text-right">
              <span className="text-[10px] font-bold tracking-widest text-gold block mb-1">
                CONTRIBUIÇÃO SUGERIDA
              </span>
              <h3 className="font-serif text-lg font-bold text-text-dark">
                {PIX_CONFIG.suggestedValue}
              </h3>
            </div>
          </div>

          <button 
            onClick={handleCopyPix}
            className="w-full flex items-center justify-center gap-3 px-8 py-3.5 font-sans text-xs font-bold tracking-widest uppercase text-white bg-gold hover:bg-gold-dark rounded-xl transition-all shadow-md active:translate-y-px"
          >
            <Copy className="w-4 h-4" />
            <span>Copiar Chave PIX</span>
          </button>
        </div>
      </section>

      {/* 7. Toast Container */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="pointer-events-auto bg-text-dark text-white px-5 py-3.5 rounded-xl shadow-lg flex items-center justify-between gap-4 border border-white/10"
            >
              <span className="text-xs font-semibold leading-relaxed">
                {toast.message}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 8. Footer Section with Ornamental Lines */}
      <footer className="mt-16 text-center select-none">
        <div className="w-full max-w-sm mx-auto mb-8 text-gold opacity-[0.55]">
          <svg viewBox="0 0 400 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[85%] mx-auto">
            <path d="M0 10 L180 10 C190 10, 195 5, 200 0 C205 5, 210 10, 220 10 L400 10" stroke="currentColor" strokeWidth="0.8"/>
            <path d="M198 10 L200 8 L202 10 L200 12 Z" fill="currentColor"/>
          </svg>
        </div>

        <div className="max-w-2xl mx-auto px-6">
          <h3 className="font-serif text-lg font-light tracking-[0.16em] mb-3">
            DO FIO AO <span className="text-gold">TERÇO</span>
          </h3>
          <div className="text-gold opacity-80 text-lg mb-4">✟</div>
          
          <p className="text-[11px] text-text-muted leading-relaxed mb-6 italic">
            Observação: Algumas videoaulas foram produzidas por parceiros e organizadas nesta área exclusivamente para facilitar seu aprendizado e proporcionar uma experiência mais prática dentro do método Do Fio ao Terço.
          </p>
          
          <p className="text-[10px] text-text-muted/65 uppercase tracking-widest font-semibold border-t border-gold/10 pt-4">
            &copy; Do Fio ao Terço. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* 9. Floating Support CTA Button (sticky bottom-right) */}
      <a 
        href="#apoiar" 
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-gold/90 hover:bg-gold-dark text-white px-5 py-3.5 rounded-full shadow-lg border border-gold-light/25 hover:shadow-xl transition-all font-sans text-xs font-bold tracking-[0.15em] uppercase hover:-translate-y-px active:translate-y-0"
      >
        <Heart className="w-4 h-4 fill-white" />
        <span>APOIAR</span>
      </a>

      {/* 10. Cinematic Active Video Player Modal (LMS Focus Mode) */}
      <AnimatePresence>
        {activeVideoLesson && (() => {
          // Find prev and next lesson to allow smooth transition inside modal
          const allLessons = MODULES.flatMap(m => m.lessons);
          const currentIndex = allLessons.findIndex(l => l.id === activeVideoLesson.id);
          const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
          const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
          const isCompleted = completedLessons.includes(activeVideoLesson.id);

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-md"
            >
              {/* Dismiss backdrop click */}
              <div 
                className="absolute inset-0 cursor-pointer" 
                onClick={() => setActiveVideoLesson(null)} 
                aria-hidden="true"
              />

              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-5xl bg-neutral-900 border border-gold/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row z-10"
              >
                {/* Close Button Pin */}
                <button
                  onClick={() => setActiveVideoLesson(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-neutral-400 hover:text-white hover:bg-black/60 z-20 backdrop-blur border border-white/5 transition-all cursor-pointer"
                  aria-label="Fechar reprodutor"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Left Side: Cinematic Video Screen */}
                <div className="w-full lg:w-8/12 bg-black flex items-center justify-center h-full relative">
                  <div className="w-full aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${activeVideoLesson.youtubeId}?autoplay=1&rel=0&playsinline=1&modestbranding=1&enablejsapi=1`}
                      title={activeVideoLesson.title}
                      className="w-full h-full border-0 animate-fade-in"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>

                {/* Right Side: Learning Progression Sidebar */}
                <div className="w-full lg:w-4/12 p-6 flex flex-col justify-between bg-neutral-900 text-neutral-100 min-h-[300px] lg:min-h-0 border-t lg:border-t-0 lg:border-l border-white/5">
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] font-bold tracking-[0.2em] text-gold uppercase block mb-1">
                        AULA {activeVideoLesson.id < 10 ? `0${activeVideoLesson.id}` : activeVideoLesson.id}
                      </span>
                      <h2 className="font-serif text-xl md:text-2xl font-semibold leading-snug text-white">
                        {activeVideoLesson.title}
                      </h2>
                    </div>

                    <div className="h-[1px] w-full bg-white/5" />

                    <div className="bg-white/5 p-4 rounded-xl space-y-2">
                      <p className="text-xs text-neutral-350 leading-relaxed max-h-[140px] overflow-y-auto pr-1">
                        {activeVideoLesson.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Navigation row */}
                  <div className="space-y-4 mt-6">
                    {/* Status Completion Toggle */}
                    <button
                      onClick={() => toggleLessonCompleted(activeVideoLesson.id, activeVideoLesson.title)}
                      className={`w-full flex items-center justify-center gap-2.5 py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                        isCompleted 
                          ? 'bg-success text-white hover:bg-success-dark shadow-[0_4px_12px_rgba(151,171,139,0.25)]' 
                          : 'bg-white/10 text-neutral-100 hover:bg-white/15 border border-white/10'
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <Check className="w-4 h-4 text-white" />
                          <span>Aula Concluída ✔</span>
                        </>
                      ) : (
                        <span>Marcar como Concluída</span>
                      )}
                    </button>

                    <div className="h-[1px] w-full bg-white/5" />

                    {/* Prev/Next buttons */}
                    <div className="flex justify-between gap-3 text-[11px] font-bold tracking-widest uppercase">
                      <button
                        onClick={() => prevLesson && setActiveVideoLesson(prevLesson)}
                        disabled={!prevLesson}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-white/5 transition-all cursor-pointer ${
                          prevLesson 
                            ? 'text-neutral-300 hover:text-white hover:bg-white/5' 
                            : 'text-neutral-600 cursor-not-allowed opacity-40'
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4 shrink-0" />
                        <span>Anterior</span>
                      </button>

                      <button
                        onClick={() => nextLesson && setActiveVideoLesson(nextLesson)}
                        disabled={!nextLesson}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-white/5 transition-all cursor-pointer ${
                          nextLesson 
                            ? 'text-neutral-300 hover:text-white hover:bg-white/5' 
                            : 'text-neutral-600 cursor-not-allowed opacity-40'
                        }`}
                      >
                        <span>Próxima</span>
                        <ChevronRight className="w-4 h-4 shrink-0" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

    </div>
  );
}
