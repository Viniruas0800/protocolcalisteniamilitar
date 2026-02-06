import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { ProgressBar } from './components/ProgressBar';
import { QuizOption } from './components/QuizOption';
import { FooterInfo } from './components/FooterInfo';
import { BodyTypeCard } from './components/BodyTypeCard';
import { BiometricForm } from './components/BiometricForm';
import { MissionObjectiveCard } from './components/MissionObjectiveCard';
import { VisualObjectiveCard } from './components/VisualObjectiveCard';
import { ProblemZoneCard } from './components/ProblemZoneCard';
import { CombatHistoryStep } from './components/CombatHistoryStep';
import { FinalEvaluationStep } from './components/FinalEvaluationStep';
import { ProcessingScreen } from './components/ProcessingScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { VSLScreen } from './components/VSLScreen'; // New Import
import { HormonalGraph } from './components/HormonalGraph';
import { QuizOptionData, BodyTypeData, VisualObjectiveData, ProblemZoneData } from './types';
import { Scan, Activity, Flame, Dumbbell, Zap, BatteryCharging, ArrowRight, Target } from 'lucide-react';

// --- DATA CONFIGURATION ---

const AGE_OPTIONS: QuizOptionData[] = [
  { id: '1', ageRange: '18-29', label: 'Pico de testosterona' },
  { id: '2', ageRange: '30-39', label: 'Inicio de declive hormonal' },
  { id: '3', ageRange: '40-49', label: 'Resistencia metabolica activa' },
  { id: '4', ageRange: '50+', label: 'Protocolo de reactivacion' },
];

const BODY_TYPES: BodyTypeData[] = [
  {
    id: 'ecto',
    title: 'ECTOMORFO',
    description: 'Estructura Delgada',
    imageUrl: 'https://i.postimg.cc/656TfMZR/SLIM.webp'
  },
  {
    id: 'meso',
    title: 'MESOMORFO',
    description: 'Estructura Promedio',
    imageUrl: 'https://i.postimg.cc/Jzvnmm2Y/FROM-25-TO-29.webp'
  },
  {
    id: 'endo',
    title: 'ENDOMORFO',
    description: 'Grasa Localizada',
    imageUrl: 'https://i.postimg.cc/tJ4yWmcR/FROM-35-TO-39.webp'
  },
  {
    id: 'endo-sev',
    title: 'ENDO SEVERO',
    description: 'Sobrepeso Activo',
    imageUrl: 'https://i.postimg.cc/sD1s2qSc/MORE-THAN-40.webp'
  },
];

const MISSION_OBJECTIVES = [
  {
    id: 'fat_loss',
    title: 'ELIMINAR GRASA',
    description: 'Protocolo de secado táctico — ataque directo a la grasa visceral.',
    icon: Flame
  },
  {
    id: 'muscle_gain',
    title: 'GANAR MASA',
    description: 'Protocolo de construcción militar — hipertrofia con peso corporal.',
    icon: Dumbbell
  },
  {
    id: 'recomp',
    title: 'SECAR Y CONSTRUIR',
    description: 'Protocolo de recomposición — quema grasa y construye músculo.',
    icon: Zap
  },
  {
    id: 'reactivation',
    title: 'REACTIVAR CUERPO',
    description: 'Protocolo de reactivación — para quienes llevan 6+ meses parados.',
    icon: BatteryCharging
  }
];

const PROBLEM_ZONES: ProblemZoneData[] = [
  { id: 'chest', title: 'Pecho débil', imageUrl: 'https://i.postimg.cc/3JQPvwy8/chest.webp' },
  { id: 'arms', title: 'Brazos delgados', imageUrl: 'https://i.postimg.cc/wBMPpyrj/arms.webp' },
  { id: 'belly', title: 'Barriga cervecera', imageUrl: 'https://i.postimg.cc/s2LLDfF6/abs.webp' },
  { id: 'legs', title: 'Piernas delgadas', imageUrl: 'https://i.postimg.cc/x8DFMs1H/legs.webp' }
];

const VISUAL_OBJECTIVES: VisualObjectiveData[] = [
  {
    id: 'operative',
    title: 'NIVEL OPERATIVO',
    subtitle: 'Cuerpo Funcional',
    description: 'Seco, definido, ágil.',
    intensity: 80,
    imageUrl: 'https://i.postimg.cc/jj7XcxfW/nivel-operativo.jpg',
  },
  {
    id: 'tactical',
    title: 'NIVEL TÁCTICO',
    subtitle: 'Cuerpo de Combate',
    description: 'Masa muscular visible.',
    intensity: 90,
    imageUrl: 'https://i.postimg.cc/TYjhrZhK/nivel-tactico.jpg',
    badge: 'MÁS ELEGIDO',
    badgeColor: 'orange'
  },
  {
    id: 'elite',
    title: 'NIVEL ELITE',
    subtitle: 'Cuerpo de Alto Rendimiento',
    description: 'Máxima definición.',
    intensity: 100,
    imageUrl: 'https://i.postimg.cc/jj25Y2ch/nivel-elite.jpg',
    badge: '⚠️ SOLO 12% DE LOS RECLUTAS CALIFICAN',
    badgeColor: 'yellow'
  }
];

export default function App() {
  // State Machine UPDATED: 
  // 1 = Age (FASE 1)
  // 2 = BodyType (FASE 2)
  // 3 = Biometrics (No Phase)
  // 4 = Mission (FASE 3)
  // 5 = VisualObjective (FASE 4)
  // 6 = ZoneDiagnosis (FASE 5)
  // 7 = HormonalGraph (Interstitial)
  // 8 = CombatHistory (FASE 6) 
  // 9 = FinalEvaluation (FASE 7)
  // 10 = ProcessingScreen (Loading)
  // 11 = ResultsScreen (Results)
  // 12 = VSLScreen (Video Sales Letter) <-- NEW FINAL STEP

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAgeId, setSelectedAgeId] = useState<string | null>(null);
  const [selectedBodyId, setSelectedBodyId] = useState<string | null>(null);
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(null);
  const [selectedZones, setSelectedZones] = useState<string[]>([]); // Multi-select array
  const [selectedVisualId, setSelectedVisualId] = useState<string | null>(null);

  // --- STEP 1 LOGIC (AGE) ---
  const handleAgeSelect = (id: string) => {
    setSelectedAgeId(id);

    const selectedOption = AGE_OPTIONS.find(opt => opt.id === id);
    if (selectedOption) {
      localStorage.setItem('user_age_range', selectedOption.ageRange);
      localStorage.setItem('user_hormonal_label', selectedOption.label);
    }

    // Go to Body Type (Step 2)
    setTimeout(() => {
      setCurrentStep(2);
      setSelectedAgeId(null);
    }, 600);
  };

  // --- STEP 2 LOGIC (BODY TYPE) ---
  const handleBodySelect = (id: string) => {
    setSelectedBodyId(id);
    localStorage.setItem('user_body_type', id);

    // Transition to Biometrics (Step 3)
    setTimeout(() => {
      setCurrentStep(3);
    }, 400);
  };

  // --- STEP 3 LOGIC (BIOMETRICS) ---
  const handleBiometricNext = () => {
    // Proceed to Mission Objective (Step 4)
    setCurrentStep(4);
  };

  // --- STEP 4 LOGIC (MISSION) ---
  const handleMissionSelect = (id: string) => {
    setSelectedMissionId(id);
    localStorage.setItem('user_mission_objective', id);

    // Transition to Visual Objective (Step 5)
    setTimeout(() => {
      setCurrentStep(5);
    }, 400);
  };

  // --- STEP 5 LOGIC (VISUAL OBJECTIVE) ---
  const handleVisualSelect = (id: string) => {
    setSelectedVisualId(id);
    localStorage.setItem('user_target_level', id);

    // Transition to Zone Diagnosis (Step 6)
    setTimeout(() => {
      setCurrentStep(6);
    }, 500);
  };

  // --- STEP 6 LOGIC (ZONE DIAGNOSIS) ---
  const handleZoneToggle = (id: string) => {
    setSelectedZones(prev => {
      if (prev.includes(id)) {
        return prev.filter(z => z !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleZoneNext = () => {
    if (selectedZones.length === 0) return;
    localStorage.setItem('user_problem_zones', JSON.stringify(selectedZones));
    // Transition to Hormonal Graph (Step 7)
    setCurrentStep(7);
  };

  // --- STEP 7 LOGIC (HORMONAL GRAPH - INTERSTITIAL) ---
  const handleHormonalNext = () => {
    // Transition to Combat History (Step 8)
    setCurrentStep(8);
  };

  // --- STEP 8 LOGIC (COMBAT HISTORY) ---
  const handleHistoryNext = () => {
    // Transition to Final Evaluation (Step 9)
    setCurrentStep(9);
  };

  // --- STEP 9 LOGIC (FINAL EVALUATION) ---
  const handleFinalEvaluationNext = () => {
    // Transition to Processing Screen (Step 10)
    setCurrentStep(10);
  };

  // --- STEP 10 LOGIC (PROCESSING COMPLETE) ---
  const handleProcessingComplete = () => {
    // Transition to Results Screen (Step 11)
    setCurrentStep(11);
  };

  // --- STEP 11 LOGIC (CTA CLICK) ---
  const handleResultsCtaClick = () => {
    // Transition to VSL (Step 12)
    setCurrentStep(12);
  };

  // Check for existing body type on mount of Step 2
  useEffect(() => {
    if (currentStep === 2) {
      const savedBody = localStorage.getItem('user_body_type');
      if (savedBody) {
        setSelectedBodyId(savedBody);
      }
    }
  }, [currentStep]);

  // --- FACEBOOK PIXEL INIT ---
  useEffect(() => {
    const pixelId = '1517817469315161';

    if (!window.fbq) {
      // Base Pixel Code
      (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = true;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = true;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

      window.fbq('init', pixelId);
      window.fbq('track', 'PageView');

      // Noscript injection for compatibility
      const noscript = document.createElement('noscript');
      const img = document.createElement('img');
      img.height = 1;
      img.width = 1;
      img.style.display = 'none';
      img.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
      noscript.appendChild(img);
      document.body.appendChild(noscript);
    } else {
      // If already initialized, just track PageView
      window.fbq('track', 'PageView');
    }
  }, []);

  // --- RENDER HELPERS ---

  // Generate particle trail for visual effect (reused)
  const particles = useMemo(() => {
    const count = 30;
    const trailLength = 2.5;
    return Array.from({ length: count }).map((_, i) => {
      const progress = i / (count - 1);
      const opacity = Math.sin(progress * Math.PI);
      const width = 0.5 + 3 * Math.sin(progress * Math.PI);
      const delay = -(progress * trailLength);
      return { id: i, opacity, width, delay };
    });
  }, []);

  // --- MAIN RENDER ---
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-sans antialiased selection:bg-[#FF5722] selection:text-white">
      {/* Conditionally render Header only on Step 1 */}
      {currentStep === 1 && <Header />}

      {/* Adjust top padding for container */}
      {/* If Step 10 (Processing), 11 (Results), or 12 (VSL), remove constraints */}
      <main className={`
        ${(currentStep >= 10) ? 'w-full' : 'max-w-md mx-auto px-5 pb-10'} 
        flex flex-col 
        ${currentStep === 1 ? 'pt-20' : (currentStep >= 10) ? 'pt-0' : 'pt-6'}
      `}>

        {/* STEP 1: AGE SELECTION */}
        {currentStep === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ProgressBar progress={15} label="FASE 1 DE 7" />

            <div className="space-y-4 mb-8 text-center">
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white">
                ¿Tienes lo que se necesita para transformar tu cuerpo en <span className="text-[#FF5722]">21 días</span> con el Protocolo de{' '}
                <span className="relative inline-block">
                  Calistenia Militar
                  <svg viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -bottom-1 left-0 w-full h-[10px] text-[#FF5722] pointer-events-none">
                    <path d="M2.00025 6.99997C35.5002 6.99997 100.5 2.00002 198 2.00002" stroke="currentColor" strokeWidth="4" strokeLinecap="round" style={{ strokeDasharray: 200, strokeDashoffset: 200, animation: 'draw-scribble 0.8s ease-out forwards 0.5s' }} />
                  </svg>
                </span>?
              </h1>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Esta evaluación de 60 segundos determina exactamente qué hacer para secar, definir y tranformar tu cuerpo.
              </p>
            </div>

            {/* Kinetic Border Container */}
            <div className="relative w-full aspect-video mb-6 rounded-2xl shadow-2xl shadow-black z-0 group">
              <style>{`
                @keyframes border-flow { 0% { stroke-dashoffset: 100; } 100% { stroke-dashoffset: 0; } }
                @keyframes draw-scribble { to { stroke-dashoffset: 0; } }
              `}</style>
              <div className="absolute inset-0 rounded-2xl overflow-hidden bg-[#0D0D0D]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-60 z-10" />
                <img src="https://i.postimg.cc/mk2R41LL/imagem1.webp" alt="Transformación Física" className="w-full h-full object-cover grayscale-[20%]" />
              </div>
              <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none rounded-2xl overflow-visible">
                {particles.map((p) => (
                  <React.Fragment key={p.id}>
                    <rect x="-1" y="-1" width="calc(100% + 2px)" height="calc(100% + 2px)" rx="17" fill="none" stroke="#FF5722" strokeWidth={p.width * 2} strokeLinecap="round" pathLength="100" strokeDasharray="0.5 100" className="blur-[2px]" style={{ opacity: p.opacity * 0.5, animation: `border-flow 10s linear infinite`, animationDelay: `${p.delay}s` }} />
                    <rect x="-1" y="-1" width="calc(100% + 2px)" height="calc(100% + 2px)" rx="17" fill="none" stroke="#FF5722" strokeWidth={p.width} strokeLinecap="round" pathLength="100" strokeDasharray="0.5 100" style={{ opacity: p.opacity, animation: `border-flow 10s linear infinite`, animationDelay: `${p.delay}s` }} />
                  </React.Fragment>
                ))}
              </svg>
            </div>

            <div className="flex justify-center mb-4 mt-2">
              <span className="text-xs font-bold text-[#FF5722] uppercase tracking-[0.2em]">Selecciona tu edad</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {AGE_OPTIONS.map((option) => (
                <QuizOption key={option.id} option={option} isSelected={selectedAgeId === option.id} onSelect={handleAgeSelect} />
              ))}
            </div>

            <FooterInfo />
            <div className="mt-4 flex justify-center -space-x-2">
              {[1, 2, 3, 4].map((i) => <img key={i} className="w-8 h-8 rounded-full border-2 border-[#0D0D0D]" src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" />)}
              <div className="h-8 w-8 rounded-full bg-[#1A1A1A] border-2 border-[#0D0D0D] flex items-center justify-center text-[8px] font-bold text-zinc-400">+4k</div>
            </div>
            <p className="text-center text-[10px] text-zinc-600 mt-2">Unirse a 4,837 hombres que ya han comenzado hoy.</p>
          </div>
        )}

        {/* STEP 2: BODY TYPE SELECTION */}
        {currentStep === 2 && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <ProgressBar progress={28} label="FASE 2 DE 7 — ANALISIS CORPORAL" />

            <div className="space-y-3 mb-6 text-center">
              <h2 className="text-2xl font-semibold text-white leading-tight">
                ¿Cuál de estos cuerpos se parece más al tuyo hoy?
              </h2>
              <p className="text-zinc-400 text-sm">
                Tu biotipo determina el nivel de resistencia que tu cuerpo opone a la quema de grasa.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {BODY_TYPES.map((type) => (
                <BodyTypeCard
                  key={type.id}
                  data={type}
                  isSelected={selectedBodyId === type.id}
                  onSelect={handleBodySelect}
                />
              ))}
            </div>

            <p className="text-center text-[10px] text-zinc-600 font-medium">
              Selecciona el que más se aproxime a tu complexión actual
            </p>
          </div>
        )}

        {/* STEP 3: BIOMETRIC DATA (NO PROGRESS BAR) */}
        {currentStep === 3 && (
          <div>
            <div className="space-y-3 mb-6 mt-4 text-center">
              <h2 className="text-2xl font-semibold text-white leading-tight">
                REGISTRO DE DATOS BIOMÉTRICOS
              </h2>
              <p className="text-zinc-400 text-sm">
                Introduce tus datos reales. La precisión de tu protocolo depende de esta información.
              </p>
            </div>

            <BiometricForm onNext={handleBiometricNext} />
          </div>
        )}

        {/* STEP 4: MISSION OBJECTIVE */}
        {currentStep === 4 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <ProgressBar progress={42} label="FASE 3 DE 7 — OBJETIVO DE MISIÓN" />

            <div className="space-y-3 mb-6 text-center">
              <h2 className="text-2xl font-semibold text-white leading-tight">
                Basado en tu perfil, estos son los protocolos disponibles para ti.
              </h2>
              <p className="text-zinc-400 text-sm">
                ¿Cuál es la transformación que necesitas lograr en los próximos 21 días?
              </p>
            </div>

            <div className="flex flex-col gap-4 mb-8">
              {MISSION_OBJECTIVES.map((mission) => (
                <MissionObjectiveCard
                  key={mission.id}
                  data={mission}
                  isSelected={selectedMissionId === mission.id}
                  onSelect={handleMissionSelect}
                />
              ))}
            </div>

            <p className="text-center text-[10px] text-zinc-500 font-medium">
              Tu selección afecta directamente el tipo de protocolo que recibirás.
            </p>
          </div>
        )}

        {/* STEP 5: VISUAL OBJECTIVE */}
        {currentStep === 5 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <ProgressBar progress={57} label="FASE 4 DE 7 — OBJETIVO VISUAL" />

            <div className="space-y-3 mb-6 text-center">
              <h2 className="text-2xl font-semibold text-white leading-tight">
                Selecciona el nivel de transformación que buscas.
              </h2>
              <p className="text-zinc-400 text-sm">
                Esto define la intensidad de tu protocolo. No hay respuesta incorrecta.
              </p>
            </div>

            <div className="flex flex-col gap-5 mb-8">
              {VISUAL_OBJECTIVES.map((visual) => (
                <VisualObjectiveCard
                  key={visual.id}
                  data={visual}
                  isSelected={selectedVisualId === visual.id}
                  onSelect={handleVisualSelect}
                />
              ))}
            </div>

            <div className="flex justify-center items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-center text-[10px] text-zinc-500 font-medium">
                El 73% de los reclutas que completan el protocolo eligen Nivel Tactico.
              </p>
            </div>
          </div>
        )}

        {/* STEP 6: ZONE DIAGNOSIS */}
        {currentStep === 6 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <ProgressBar progress={71} label="FASE 5 DE 7 — DIAGNÓSTICO DE ZONAS" />

            <div className="space-y-3 mb-6 text-center">
              <h2 className="text-2xl font-semibold text-white leading-tight">
                ¿Dónde está almacenando grasa tu cuerpo?
              </h2>
              <p className="text-zinc-400 text-sm">
                Selecciona todas las que apliquen. Tu protocolo sera calibrado para atacar estas zonas en orden de prioridad.
              </p>
            </div>

            <div className="flex flex-col gap-3 mb-6">
              {PROBLEM_ZONES.map((zone) => (
                <ProblemZoneCard
                  key={zone.id}
                  data={zone}
                  isSelected={selectedZones.includes(zone.id)}
                  onToggle={handleZoneToggle}
                />
              ))}
            </div>

            {/* Gamification Area */}
            <div className="mb-6 px-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  Zonas: <span className="text-white">{selectedZones.length} de 4</span>
                </span>
                <div className="flex items-center gap-2">
                  <Target size={12} className={selectedZones.length > 0 ? "text-[#FF5722]" : "text-zinc-700"} />
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    Personalización:
                    <span className={`ml-1 ${selectedZones.length === 0 ? 'text-zinc-600' :
                      selectedZones.length < 3 ? 'text-yellow-500' : 'text-[#FF5722]'
                      }`}>
                      {selectedZones.length === 0 ? 'BAJA' : selectedZones.length < 3 ? 'MEDIA' : 'ALTA'}
                    </span>
                  </span>
                </div>
              </div>
              {/* Visual Progress Bar for Personalization */}
              <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FF5722] transition-all duration-500"
                  style={{ width: `${(selectedZones.length / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* Dynamic Action Button */}
            <button
              onClick={handleZoneNext}
              disabled={selectedZones.length === 0}
              className={`w-full py-4 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2
                 ${selectedZones.length === 0
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  : 'bg-[#FF5722] text-white hover:bg-[#F4511E] shadow-lg shadow-orange-900/30'
                }`}
            >
              {selectedZones.length === 0 ? 'SELECCIONA PARA CONTINUAR' : 'EVALUAR HISTORIAL'}
              {selectedZones.length > 0 && <ArrowRight size={16} />}
            </button>
          </div>
        )}

        {/* STEP 7: HORMONAL INTERSTITIAL SCREEN */}
        {currentStep === 7 && <HormonalGraph onNext={handleHormonalNext} />}

        {/* STEP 8: COMBAT HISTORY */}
        {currentStep === 8 && <CombatHistoryStep onNext={handleHistoryNext} />}

        {/* STEP 9: FINAL EVALUATION */}
        {currentStep === 9 && <FinalEvaluationStep onNext={handleFinalEvaluationNext} />}

        {/* STEP 10: PROCESSING SCREEN */}
        {currentStep === 10 && <ProcessingScreen onComplete={handleProcessingComplete} />}

        {/* STEP 11: RESULTS SCREEN */}
        {currentStep === 11 && <ResultsScreen onCtaClick={handleResultsCtaClick} />}

        {/* STEP 12: VSL SCREEN (NEW) */}
        {currentStep === 12 && <VSLScreen />}

      </main>
    </div>
  );
}