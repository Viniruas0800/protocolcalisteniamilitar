import React, { useEffect, useState, memo, useMemo } from 'react';
import { Eye } from 'lucide-react';

// --- 1. COMPONENTE ISOLADO (ROCK SOLID STABILITY) ---
interface VturbPlayerProps {
  videoId: string;
}

const VturbPlayer = memo(({ videoId }: VturbPlayerProps) => {
  useEffect(() => {
    const scriptId = `vturb-script-${videoId}`;
    if (!document.getElementById(scriptId)) {
      const s = document.createElement("script");
      s.id = scriptId;
      s.src = `https://scripts.converteai.net/35e26b90-e4ad-45b6-80e3-d8bba2d5adb3/players/${videoId}/v4/player.js`;
      s.async = true;
      document.head.appendChild(s);
    }
  }, [videoId]);

  return (
    <div className="w-full h-full relative">
      <vturb-smartplayer
        id={`vid-${videoId}`}
        style={{ width: '100%', height: '100%' }}
      ></vturb-smartplayer>
    </div>
  );
});

VturbPlayer.displayName = 'VturbPlayer';


// --- 2. COMPONENTE PRINCIPAL (VSL SCREEN) ---
interface VSLScreenProps { }

export const VSLScreen: React.FC<VSLScreenProps> = () => {
  const [viewers, setViewers] = useState(842);

  // User Data State
  const [data, setData] = useState({
    id: 'R-7392',
    bodyType: 'ENDOMORFO',
    age: '30-39',
    imc: '26.5',
    zones: [] as string[],
    level: 'TÁCTICO',
    score: '96',
    obstacle: 'MOTIVACIÓN'
  });

  // --- INITIALIZATION & DATA ---
  useEffect(() => {
    // 1. ID Generation
    const randomId = `REC-${Math.floor(1000 + Math.random() * 9000)}`;

    // 2. Body Type Translation Map (Fix Truncation)
    const BODY_TYPE_MAP: Record<string, string> = {
      'ecto': 'ECTOMORFO',
      'meso': 'MESOMORFO',
      'endo': 'ENDOMORFO',
      'endo-sev': 'ENDO SEVERO'
    };
    const rawBody = localStorage.getItem('user_body_type');
    const bodyTypeFull = BODY_TYPE_MAP[rawBody || 'endo'] || 'ENDOMORFO';

    // 3. Zone Translation Map (Fix English Terms)
    const ZONE_TRANSLATIONS: Record<string, string> = {
      'chest': 'PECHO',
      'belly': 'ABDOMEN',
      'legs': 'PIERNAS',
      'arms': 'BRAZOS',
      'back': 'ESPALDA',
      'love_handles': 'FLOTADORES'
    };

    const zonesRaw = localStorage.getItem('user_problem_zones');
    let zonesFormatted = ['ABDOMEN', 'PECHO'];

    try {
      const parsedZones = zonesRaw ? JSON.parse(zonesRaw) : [];
      if (parsedZones.length > 0) {
        zonesFormatted = parsedZones.map((z: string) =>
          ZONE_TRANSLATIONS[z] || z.toUpperCase()
        );
      }
    } catch (e) {
      console.error("Error parsing zones", e);
    }

    // 4. Obstacle Mapping
    const obstacleRaw = localStorage.getItem('user_main_obstacle');
    const OBSTACLE_MAP: Record<string, string> = {
      'time': 'FALTA DE TIEMPO',
      'motivation': 'MOTIVACIÓN',
      'consistency': 'CONSTANCIA',
      'diet': 'DIETA',
      'knowledge': 'CONOCIMIENTO'
    };

    setData({
      id: randomId,
      bodyType: bodyTypeFull, // Agora usa o nome completo
      age: localStorage.getItem('user_age_range') || '30-39',
      imc: localStorage.getItem('user_imc') || '26.5',
      zones: zonesFormatted, // Agora usa os termos em Espanhol
      level: 'NIVEL TÁCTICO',
      score: '96',
      obstacle: OBSTACLE_MAP[obstacleRaw || 'time'] || 'FALTA DE TIEMPO'
    });

    const interval = setInterval(() => {
      setViewers(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // --- HELPER: FORMATTED ZONES STRING ---
  const formattedZones = useMemo(() => {
    if (data.zones.length === 0) return 'ABDOMEN';

    try {
      // Formats as "Zone A, Zone B y Zone C"
      // Fix: Cast Intl to any because ListFormat might be missing in TS config
      const formatter = new (Intl as any).ListFormat('es', { style: 'long', type: 'conjunction' });
      return formatter.format(data.zones);
    } catch (e) {
      return data.zones.join(', ');
    }
  }, [data.zones]);

  // --- BACK-TRAP (BACK-REDIRECT) IMPLEMENTATION ---
  useEffect(() => {
    // 1. Push state to history to ensure trap is active
    // We push twice to create a buffer
    window.history.pushState(null, '', window.location.href);
    window.history.pushState(null, '', window.location.href);

    // 2. Handle the back button (popstate)
    const handlePopState = (event: PopStateEvent) => {
      // Redirect immediately to the checkout/offer
      window.location.href = 'https://websiteoficial.mycartpanda.com/checkout/206840427:1';
    };

    // 3. Listen for the event
    window.addEventListener('popstate', handlePopState);

    // 4. Cleanup
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white font-sans overflow-x-hidden relative pb-10">

      {/* 0. BACKGROUND ATMOSPHERE */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[600px] bg-[#FF5722]/10 blur-[100px] rounded-full opacity-50"></div>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      {/* 1. STICKY STATUS BAR */}
      <div className="fixed top-0 left-0 w-full z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5 h-10 flex items-center justify-center px-4">
        <div className="w-full max-w-md flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
              TRANSMISIÓN PRIVADA
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 px-2 py-0.5 rounded text-[10px] font-mono text-zinc-300 border border-white/5">
            <Eye size={10} className="text-[#FF5722]" />
            <span className="tabular-nums font-bold">{viewers}</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto pt-16 px-5 relative z-10 flex flex-col items-center">

        {/* 2. HEADLINE GROUP */}
        <div className="w-full text-center mb-6">
          {/* FIX: Exibe nome completo do biotipo (data.bodyType) sem truncar */}
          <h1 className="font-bebas text-4xl leading-[0.95] text-white mb-3 tracking-wide drop-shadow-lg">
            RECLUTA <span className="text-[#FF5722]">{data.bodyType}</span>,<br />
            SU PROTOCOLO ESTÁ LISTO.
          </h1>

          {/* FIX: Exibe lista de zonas formatada (A, B y C) com pluralização correta */}
          <p className="text-zinc-300 text-sm font-normal max-w-[95%] mx-auto leading-relaxed font-sans">
            Presiona play para ver cómo atacar {data.zones.length > 1 ? 'tus zonas' : 'tu zona'} <span className="text-[#FF5722] font-bold uppercase">{formattedZones}</span> en los próximos 21 días.
          </p>
        </div>

        {/* 3. VIDEO STAGE */}
        <div className="relative w-full max-w-[450px] mx-auto mt-2 aspect-[3/4] mb-8">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[90%] bg-[#FF5722] blur-3xl opacity-15 -z-10 rounded-full pointer-events-none"></div>
          <VturbPlayer videoId="6983561bd7336fb6b1bd24ea" />
        </div>

        {/* 4. DATA SECTION (Technical Specs) */}
        <div className="w-full grid grid-cols-2 gap-2 opacity-70 hover:opacity-100 transition-opacity duration-500">

          <div className="flex flex-col p-2.5 rounded border border-white/5 bg-white/5 transition-colors hover:bg-white/10">
            <span className="text-[10px] uppercase text-zinc-500 tracking-wider font-medium mb-0.5">Score Alpha</span>
            <span className="text-sm font-mono font-bold text-white">{data.score}<span className="text-zinc-600 font-normal">/100</span></span>
          </div>

          <div className="flex flex-col p-2.5 rounded border border-white/5 bg-white/5 transition-colors hover:bg-white/10">
            <span className="text-[10px] uppercase text-zinc-500 tracking-wider font-medium mb-0.5">Objetivo</span>
            <span className="text-sm font-mono font-bold text-[#FF5722] truncate">{data.level}</span>
          </div>

          <div className="flex flex-col p-2.5 rounded border border-white/5 bg-white/5 transition-colors hover:bg-white/10">
            <span className="text-[10px] uppercase text-zinc-500 tracking-wider font-medium mb-0.5">IMC</span>
            <span className="text-sm font-mono font-bold text-white">{data.imc}</span>
          </div>

          <div className="flex flex-col p-2.5 rounded border border-white/5 bg-white/5 transition-colors hover:bg-white/10">
            <span className="text-[10px] uppercase text-zinc-500 tracking-wider font-medium mb-0.5">Obstáculo</span>
            <span className="text-sm font-mono font-bold text-white truncate text-[11px] leading-5">{data.obstacle}</span>
          </div>

        </div>

        {/* 6. ID FOOTER */}
        <div className="w-full text-center mt-6 opacity-30">
          <p className="text-[9px] text-zinc-600 font-mono tracking-widest">
            ID: {data.id} • SESSION_SECURE
          </p>
        </div>

      </div>

    </div>
  );
};
