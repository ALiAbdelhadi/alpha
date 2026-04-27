import { useCallback, useState } from "react";

export type ProjectType = "website" | "webapp" | "ecommerce" | "pwa" | null;
export type Complexity = "basic" | "standard" | "premium" | null;
export type Timeline = "urgent" | "standard" | "flexible" | null;
export type BrandIdentity = "complete" | "partial" | "scratch" | null;
export type ContentReadiness = "provide" | "need-help" | "unsure" | null;
export type DeadlineUrgency =
  | "flexible"
  | "2months"
  | "1month"
  | "urgent"
  | null;
export type Budget = "small" | "medium" | "large" | "custom" | null;

interface TransparencyState {
  step: number;
  budget: Budget;
  brandIdentity: BrandIdentity;
  contentReadiness: ContentReadiness;
  deadlineUrgency: DeadlineUrgency;
  projectType: ProjectType;
  complexity: Complexity;
  timeline: Timeline;
}

interface EstimateResult {
  minWeeks: number;
  maxWeeks: number;
  minPrice: number;
  maxPrice: number;
}

const TOTAL_STEPS = 8;

const ESTIMATE_ROUNDING = 5_000;

function roundEstimate(value: number): number {
  return Math.round(value / ESTIMATE_ROUNDING) * ESTIMATE_ROUNDING;
}

const PRICING_TABLE = {
  website: {
    basic: [75_000, 110_000],
    standard: [110_000, 150_000],
    premium: [150_000, 210_000],
  },
  webapp: {
    basic: [180_000, 260_000],
    standard: [260_000, 380_000],
    premium: [380_000, 550_000],
  },
  ecommerce: {
    basic: [140_000, 210_000],
    standard: [210_000, 320_000],
    premium: [320_000, 480_000],
  },
  pwa: {
    basic: [220_000, 300_000],
    standard: [300_000, 430_000],
    premium: [430_000, 620_000],
  },
};

const TIMELINE_TABLE = {
  website: {
    basic: [3, 5],
    standard: [5, 8],
    premium: [8, 12],
  },
  webapp: {
    basic: [6, 10],
    standard: [10, 16],
    premium: [16, 24],
  },
  ecommerce: {
    basic: [5, 8],
    standard: [8, 14],
    premium: [14, 20],
  },
  pwa: {
    basic: [8, 12],
    standard: [12, 18],
    premium: [18, 28],
  },
};

const TIMELINE_MULTIPLIERS = {
  urgent: 1.15,
  standard: 1,
  flexible: 0.95,
};

const TIMELINE_WEEK_MULTIPLIERS = {
  urgent: 0.85,
  standard: 1,
  flexible: 1.15,
};

interface UseTransparencyOptions {
  initialBudget?: Budget | null;
}

export function useTransparency({
  initialBudget = null,
}: UseTransparencyOptions = {}) {
  const skipBudget = initialBudget !== null;
  const createInitialState = useCallback((): TransparencyState => ({
    step: 1,
    budget: initialBudget ?? null,
    brandIdentity: null,
    contentReadiness: null,
    deadlineUrgency: null,
    projectType: null,
    complexity: null,
    timeline: null,
  }), [initialBudget]);

  const [state, setState] = useState<TransparencyState>(createInitialState);

  const setBudget = useCallback((v: Budget) => {
    setState((prev) => ({ ...prev, budget: v }));
  }, []);
  const setBrandIdentity = useCallback((v: BrandIdentity) => {
    setState((prev) => ({ ...prev, brandIdentity: v }));
  }, []);
  const setContentReadiness = useCallback((v: ContentReadiness) => {
    setState((prev) => ({ ...prev, contentReadiness: v }));
  }, []);
  const setDeadlineUrgency = useCallback((v: DeadlineUrgency) => {
    setState((prev) => ({ ...prev, deadlineUrgency: v }));
  }, []);
  const setProjectType = useCallback((v: ProjectType) => {
    setState((prev) => ({ ...prev, projectType: v }));
  }, []);
  const setComplexity = useCallback((v: Complexity) => {
    setState((prev) => ({ ...prev, complexity: v }));
  }, []);
  const setTimeline = useCallback((v: Timeline) => {
    setState((prev) => ({ ...prev, timeline: v }));
  }, []);

  const nextStep = useCallback(() => {
    setState((prev) => {
      let next = prev.step + 1;
      if (next === 2 && skipBudget) next = 3;
      return { ...prev, step: Math.min(next, TOTAL_STEPS) };
    });
  }, [skipBudget]);

  const prevStep = useCallback(() => {
    setState((prev) => {
      let back = prev.step - 1;
      if (back === 2 && skipBudget) back = 1;
      return { ...prev, step: Math.max(back, 1) };
    });
  }, [skipBudget]);

  const reset = useCallback(() => {
    setState(createInitialState());
  }, [createInitialState]);

  const canProceed = useCallback((): boolean => {
    switch (state.step) {
      case 1:
        return state.brandIdentity !== null;
      case 2:
        return skipBudget ? true : state.budget !== null;
      case 3:
        return state.contentReadiness !== null;
      case 4:
        return state.deadlineUrgency !== null;
      case 5:
        return state.projectType !== null;
      case 6:
        return state.complexity !== null;
      case 7:
        return state.timeline !== null;
      default:
        return false;
    }
  }, [state, skipBudget]);

  const getEstimate = useCallback((): EstimateResult | null => {
    if (!state.projectType || !state.complexity || !state.timeline) return null;

    const priceRange = PRICING_TABLE[state.projectType][state.complexity];
    const timelineRange = TIMELINE_TABLE[state.projectType][state.complexity];
    const multiplier = TIMELINE_MULTIPLIERS[state.timeline];
    const weekMultiplier = TIMELINE_WEEK_MULTIPLIERS[state.timeline];

    return {
      minWeeks: Math.max(Math.round(timelineRange[0] * weekMultiplier), 1),
      maxWeeks: Math.max(Math.round(timelineRange[1] * weekMultiplier), 1),
      minPrice: roundEstimate(priceRange[0] * multiplier),
      maxPrice: roundEstimate(priceRange[1] * multiplier),
    };
  }, [state]);

  return {
    step: state.step,
    budget: state.budget,
    brandIdentity: state.brandIdentity,
    contentReadiness: state.contentReadiness,
    deadlineUrgency: state.deadlineUrgency,
    projectType: state.projectType,
    complexity: state.complexity,
    timeline: state.timeline,
    setBudget,
    setBrandIdentity,
    setContentReadiness,
    setDeadlineUrgency,
    setProjectType,
    setComplexity,
    setTimeline,
    nextStep,
    prevStep,
    reset,
    canProceed,
    getEstimate,
  };
}

export const useTransparencyFlow = useTransparency;
