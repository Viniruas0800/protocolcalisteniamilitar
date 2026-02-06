import React, { useState, useEffect } from 'react';
import { Info } from 'lucide-react';

interface BiometricFormProps {
  onNext: () => void;
}

export const BiometricForm: React.FC<BiometricFormProps> = ({ onNext }) => {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');

  // Save data and continue
  const handleContinue = () => {
    if (!height || !weight || !targetWeight) return;

    // Calculate IMC (BMI)
    let heightInMeters = 0;
    let weightInKg = 0;

    if (unitSystem === 'metric') {
      heightInMeters = parseFloat(height) / 100;
      weightInKg = parseFloat(weight);
    } else {
      // Imperial: Height input assumed as cm equivalent or just feet?
      // UX Decision: Standard text input for imperial usually implies Feet (e.g. 5.9) or Inches.
      // For simplicity in this text input: Inputting Feet.Decimal (e.g. 5.11)
      const feet = parseFloat(height);
      heightInMeters = feet * 0.3048; 
      
      // lbs to kg
      weightInKg = parseFloat(weight) * 0.453592;
    }

    const imc = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2);

    // Persistence
    localStorage.setItem('user_height', height);
    localStorage.setItem('user_current_weight', weight);
    localStorage.setItem('user_target_weight', targetWeight);
    localStorage.setItem('user_unit_system', unitSystem);
    localStorage.setItem('user_imc', imc);

    console.log(`Biometrics Saved: IMC ${imc}`);
    onNext();
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Unit Toggles - Recolor to Standard Dark Mode */}
      <div className="flex justify-center mb-8">
        <div className="bg-[#1A1A1A] p-1 rounded-full border border-[#27272A] flex">
          <button
            onClick={() => setUnitSystem('metric')}
            className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
              unitSystem === 'metric' 
                ? 'bg-[#FF5722] text-white shadow-lg shadow-orange-900/20' 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Metric (cm/kg)
          </button>
          <button
            onClick={() => setUnitSystem('imperial')}
            className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
              unitSystem === 'imperial' 
                ? 'bg-[#FF5722] text-white shadow-lg shadow-orange-900/20' 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Imperial (ft/lb)
          </button>
        </div>
      </div>

      {/* Form Fields - Recolor inputs and labels */}
      <div className="space-y-5">
        
        {/* Height */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">
            Altura ({unitSystem === 'metric' ? 'cm' : 'ft'})
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder={unitSystem === 'metric' ? '175' : '5.9'}
            className="w-full bg-[#1A1A1A] border border-[#27272A] text-white text-lg font-medium px-4 py-3.5 rounded-lg focus:outline-none focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722] transition-all placeholder:text-zinc-700"
          />
        </div>

        {/* Current Weight */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">
            Peso Actual ({unitSystem === 'metric' ? 'kg' : 'lb'})
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder={unitSystem === 'metric' ? '75' : '165'}
            className="w-full bg-[#1A1A1A] border border-[#27272A] text-white text-lg font-medium px-4 py-3.5 rounded-lg focus:outline-none focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722] transition-all placeholder:text-zinc-700"
          />
        </div>

        {/* Target Weight */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">
            Peso Objetivo ({unitSystem === 'metric' ? 'kg' : 'lb'})
          </label>
          <input
            type="number"
            value={targetWeight}
            onChange={(e) => setTargetWeight(e.target.value)}
            placeholder={unitSystem === 'metric' ? '70' : '155'}
            className="w-full bg-[#1A1A1A] border border-[#27272A] text-white text-lg font-medium px-4 py-3.5 rounded-lg focus:outline-none focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722] transition-all placeholder:text-zinc-700"
          />
        </div>

      </div>

      {/* Disclaimer Box - Recolor Icon */}
      <div className="mt-8 bg-[#1A1A1A] border border-[#27272A] rounded-lg p-4 flex gap-3 items-start">
        <Info className="text-[#FF5722] shrink-0 mt-0.5" size={18} />
        <p className="text-[11px] text-zinc-400 leading-relaxed">
          <span className="font-bold text-zinc-200">Importante:</span> Estos datos son esenciales para calcular tu Indice de Masa Corporal (IMC), estimacion de grasa corporal y tus necesidades caloricas diarias.
        </p>
      </div>

      {/* Action Button - Ensure Orange, Remove Neon Glow */}
      <button
        onClick={handleContinue}
        disabled={!height || !weight || !targetWeight}
        className={`mt-8 w-full py-4 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-300 
          ${(!height || !weight || !targetWeight) 
            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
            : 'bg-[#FF5722] text-white hover:bg-[#F4511E] active:scale-[0.98]'
          }`}
      >
        Continuar
      </button>

    </div>
  );
};