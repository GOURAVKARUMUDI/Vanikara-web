'use client';

import { useEffect } from 'react';
import { logger } from '@/utils/logger';

export default function ClientLogger() {
  useEffect(() => {
    logger.lifecycle('Application', 'mount');
  }, []);

  return null;
}
