// Supported Locales Type
export type SupportedLocales = 'en' | 'ar';

// Layout Children Type 
export type layoutChildren = {
    children: React.ReactNode
}

// Props Type (Root Layout)
export type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: SupportedLocales }>;
};

export type NoteColor = "red" | "amber" | "green" | "gray"

export interface AnnotationNote {
    id: string
    label: string
    body: string
    color: NoteColor
}

export interface StageAction {
    type: "underline" | "strike" | "highlight" | "note" | "connector"
    target: string
    delay: number
}

export interface Stage {
    key: string
    label: string
    actions: StageAction[]
}

export interface OutcomeItem {
    label: string
    value: string
    sub: string
    badge?: string
}