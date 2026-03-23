export const sanitizeInput = (val: string): string => {
  if (typeof val !== 'string') return val;
  return val
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, '')
    .trim();
};

export const detectThreat = (val: string): { score: number; classification: 'low' | 'medium' | 'high' } => {
  let score = 0;
  const patterns = [
    { regex: /<script\b[^>]*>([\s\S]*?)<\/script>/gim, weight: 50 },
    { regex: /javascript:/gim, weight: 40 },
    { regex: /onerror\s*=/gim, weight: 40 },
    { regex: /onload\s*=/gim, weight: 40 },
    { regex: /<iframe>/gim, weight: 30 },
    { regex: /SELECT\s+.*\s+FROM/gim, weight: 50 },
    { regex: /UNION\s+SELECT/gim, weight: 50 },
    { regex: /OR\s+1\s*=\s*1/gim, weight: 50 },
    { regex: /--/g, weight: 10 },
    { regex: /https?:\/\/[^\s$.?#].[^\s]*/gim, weight: 5 }
  ];

  patterns.forEach(({ regex, weight }) => {
    if (regex.test(val)) score += weight;
  });

  const finalScore = Math.min(score, 100);
  let classification: 'low' | 'medium' | 'high' = 'low';

  if (finalScore >= 80) classification = 'high';
  else if (finalScore >= 40) classification = 'medium';

  return { score: finalScore, classification };
};

export const validatePayload = (payload: Record<string, any>): { isSafe: boolean; threats: string[] } => {
  const threats: string[] = [];
  let isSafe = true;

  Object.entries(payload).forEach(([key, val]) => {
    if (typeof val === 'string') {
      const { score } = detectThreat(val);
      if (score > 60) {
        isSafe = false;
        threats.push(key);
      }
    }
  });

  return { isSafe, threats };
};
