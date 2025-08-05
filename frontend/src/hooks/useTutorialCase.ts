import { useState, useEffect } from 'react';
import { Case } from '../types/api';
import { caseService } from '../services/api';

interface TutorialCaseData {
  case: Case | null;
  loading: boolean;
  error: string | null;
}

export const useTutorialCase = (): TutorialCaseData => {
  const [tutorialCase, setTutorialCase] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTutorialCase = async () => {
      try {
        setLoading(true);
        setError(null);
        const caseData = await caseService.getTutorialCase();
        setTutorialCase(caseData);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao carregar caso tutorial');
        console.error('Erro ao buscar caso tutorial:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorialCase();
  }, []);

  return {
    case: tutorialCase,
    loading,
    error
  };
};
