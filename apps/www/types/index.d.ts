// Supported Locales Type
export type SupportedLocales = 'en' | 'ar' | string;

// Layout Children Type 
export type layoutChildren = {
    children: React.ReactNode
}

// Props Type (Root Layout)
export type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: SupportedLocales }>;
};

