import { useState, useEffect } from 'react';
import { sanitizeInput, detectThreat } from '../lib/security';

export function useSecurity(initialValue: string = '') {
  const [value, setValue] = useState(initialValue);
  const [risk, setRisk]   = useState<{ score: number; classification: 'low' | 'medium' | 'high' }>({ 
    score: 0, 
    classification: 'low' 
  });

  useEffect(() => {
    const { score, classification } = detectThreat(value);
    setRisk({ score, classification });
  }, [value]);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return {
    value,
    safeValue: sanitizeInput(value),
    riskScore: risk.score,
    classification: risk.classification,
    isBlocked: risk.score > 60,
    handleChange
  };
}
