import { useState, useCallback } from "react"

export type ProjectType = "website" | "webapp" | "ecommerce" | "pwa" | null
export type Complexity = "basic" | "standard" | "premium" | null
export type Timeline = "urgent" | "standard" | "flexible" | null

interface EstimatorState {
    step: number
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

const PRICING_TABLE = {
    website: { basic: [2000, 5000], standard: [5000, 12000], premium: [12000, 25000] },
    webapp: { basic: [5000, 10000], standard: [10000, 25000], premium: [25000, 50000] },
    ecommerce: { basic: [5000, 12000], standard: [12000, 30000], premium: [30000, 60000] },
    pwa: { basic: [6000, 12000], standard: [12000, 28000], premium: [28000, 55000] },
}

const TIMELINE_TABLE = {
    website: { basic: [2, 3], standard: [4, 6], premium: [6, 10] },
    webapp: { basic: [4, 6], standard: [8, 12], premium: [12, 20] },
    ecommerce: { basic: [4, 6], standard: [8, 12], premium: [12, 18] },
    pwa: { basic: [5, 8], standard: [10, 14], premium: [14, 22] },
}

const TIMELINE_MULTIPLIERS = {
    urgent: 1.3,
    standard: 1,
    flexible: 0.85,
}

export function useEstimator() {
    const [state, setState] = useState<EstimatorState>({
        step: 1,
        projectType: null,
        complexity: null,
        timeline: null,
    })

    const setProjectType = useCallback((type: ProjectType) => {
        setState((prev) => ({ ...prev, projectType: type }))
    }, [])

    const setComplexity = useCallback((complexity: Complexity) => {
        setState((prev) => ({ ...prev, complexity }))
    }, [])

    const setTimeline = useCallback((timeline: Timeline) => {
        setState((prev) => ({ ...prev, timeline }))
    }, [])

    const nextStep = useCallback(() => {
        setState((prev) => ({ ...prev, step: Math.min(prev.step + 1, 4) }))
    }, [])

    const prevStep = useCallback(() => {
        setState((prev) => ({ ...prev, step: Math.max(prev.step - 1, 1) }))
    }, [])

    const reset = useCallback(() => {
        setState({
            step: 1,
            projectType: null,
            complexity: null,
            timeline: null,
        })
    }, [])

    const canProceed = useCallback((): boolean => {
        switch (state.step) {
            case 1:
                return state.projectType !== null
            case 2:
                return state.complexity !== null
            case 3:
                return state.timeline !== null
            default:
                return false
        }
    }, [state])

    const getEstimate = useCallback((): EstimateResult | null => {
        if (!state.projectType || !state.complexity || !state.timeline) {
            return null
        }

        const priceRange = PRICING_TABLE[state.projectType][state.complexity]
        const timelineRange = TIMELINE_TABLE[state.projectType][state.complexity]
        const multiplier = TIMELINE_MULTIPLIERS[state.timeline]

        return {
            minWeeks: Math.ceil(timelineRange[0] / (state.timeline === "urgent" ? 1.2 : 1)),
            maxWeeks: Math.ceil(timelineRange[1] / (state.timeline === "urgent" ? 1.2 : 1)),
            minPrice: Math.round(priceRange[0] * multiplier),
            maxPrice: Math.round(priceRange[1] * multiplier),
        }
    }, [state])

    return {
        step: state.step,
        projectType: state.projectType,
        complexity: state.complexity,
        timeline: state.timeline,
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
