import { useCallback, useState } from "react"

export type ProjectType = "website" | "webapp" | "ecommerce" | "pwa" | null
export type Complexity = "basic" | "standard" | "premium" | null
export type Timeline = "urgent" | "standard" | "flexible" | null
export type BrandIdentity = "complete" | "partial" | "scratch" | null
export type ContentReadiness = "provide" | "need-help" | "unsure" | null
export type DeadlineUrgency = "flexible" | "2months" | "1month" | "urgent" | null
export type Budget = "small" | "medium" | "large" | "custom" | null

interface EstimatorState {
    step: number
    budget: Budget
    brandIdentity: BrandIdentity
    contentReadiness: ContentReadiness
    deadlineUrgency: DeadlineUrgency
    projectType: ProjectType
    complexity: Complexity
    timeline: Timeline
}

interface EstimateResult {
    minWeeks: number
    maxWeeks: number
    minPrice: number
    maxPrice: number
}

const TOTAL_STEPS = 8


const PRICING_TABLE = {
    website: {
        basic: [50_000, 100_000],
        standard: [75_000, 150_000],
        premium: [100_000, 150_000],
    },
    webapp: {
        basic: [150_000, 250_000],
        standard: [250_000, 350_000],
        premium: [350_000, 450_000],
    },
    ecommerce: {
        basic: [150_000, 250_000],
        standard: [250_000, 350_000],
        premium: [350_000, 450_000],
    },
    pwa: {
        basic: [150_000, 250_000],
        standard: [250_000, 350_000],
        premium: [350_000, 450_000],
    },
}

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
        basic: [5, 9],
        standard: [9, 14],
        premium: [14, 20],
    },
    pwa: {
        basic: [6, 10],
        standard: [10, 16],
        premium: [16, 24],
    },
}

const TIMELINE_MULTIPLIERS = {
    urgent: 1.3,
    standard: 1,
    flexible: 0.85,
}

interface UseEstimatorOptions {
    initialBudget?: Budget | null
}

export function useEstimator({ initialBudget = null }: UseEstimatorOptions = {}) {
    const skipBudget = initialBudget !== null

    const initialState: EstimatorState = {
        step: 1,
        budget: initialBudget ?? null,
        brandIdentity: null,
        contentReadiness: null,
        deadlineUrgency: null,
        projectType: null,
        complexity: null,
        timeline: null,
    }

    const [state, setState] = useState<EstimatorState>(initialState)

    const setBudget = useCallback((v: Budget) => {
        setState((prev) => ({ ...prev, budget: v }))
    }, [])
    const setBrandIdentity = useCallback((v: BrandIdentity) => {
        setState((prev) => ({ ...prev, brandIdentity: v }))
    }, [])
    const setContentReadiness = useCallback((v: ContentReadiness) => {
        setState((prev) => ({ ...prev, contentReadiness: v }))
    }, [])
    const setDeadlineUrgency = useCallback((v: DeadlineUrgency) => {
        setState((prev) => ({ ...prev, deadlineUrgency: v }))
    }, [])
    const setProjectType = useCallback((v: ProjectType) => {
        setState((prev) => ({ ...prev, projectType: v }))
    }, [])
    const setComplexity = useCallback((v: Complexity) => {
        setState((prev) => ({ ...prev, complexity: v }))
    }, [])
    const setTimeline = useCallback((v: Timeline) => {
        setState((prev) => ({ ...prev, timeline: v }))
    }, [])

    const nextStep = useCallback(() => {
        setState((prev) => {
            let next = prev.step + 1
            if (next === 2 && skipBudget) next = 3
            return { ...prev, step: Math.min(next, TOTAL_STEPS) }
        })
    }, [skipBudget])

    const prevStep = useCallback(() => {
        setState((prev) => {
            let back = prev.step - 1
            if (back === 2 && skipBudget) back = 1
            return { ...prev, step: Math.max(back, 1) }
        })
    }, [skipBudget])

    // eslint-disable-next-line react-hooks/preserve-manual-memoization
    const reset = useCallback(() => {
        setState(initialState)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    const canProceed = useCallback((): boolean => {
        switch (state.step) {
            case 1: return state.brandIdentity !== null
            case 2: return skipBudget ? true : state.budget !== null
            case 3: return state.contentReadiness !== null
            case 4: return state.deadlineUrgency !== null
            case 5: return state.projectType !== null
            case 6: return state.complexity !== null
            case 7: return state.timeline !== null
            default: return false
        }
    }, [state, skipBudget])

    const getEstimate = useCallback((): EstimateResult | null => {
        if (!state.projectType || !state.complexity || !state.timeline) return null

        const priceRange = PRICING_TABLE[state.projectType][state.complexity]
        const timelineRange = TIMELINE_TABLE[state.projectType][state.complexity]
        const multiplier = TIMELINE_MULTIPLIERS[state.timeline]
        const urgencyDiv = state.timeline === "urgent" ? 1.2 : 1

        return {
            minWeeks: Math.ceil(timelineRange[0] / urgencyDiv),
            maxWeeks: Math.ceil(timelineRange[1] / urgencyDiv),
            minPrice: Math.round(priceRange[0] * multiplier),
            maxPrice: Math.round(priceRange[1] * multiplier),
        }
    }, [state])

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
    }
}