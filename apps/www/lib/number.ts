export function localizeNumbers(input: string, locale: string): string {
    if (!input) return ""

    const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]
    const latinDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

    const lang = locale.split("-")[0]

    let result = input

    if (lang === "ar") {
        // convert 0-9 → ٠-٩
        for (let i = 0; i < 10; i++) {
            result = result.replace(new RegExp(latinDigits[i], "g"), arabicDigits[i])
        }
    } else {
        // convert ٠-٩ → 0-9
        for (let i = 0; i < 10; i++) {
            result = result.replace(new RegExp(arabicDigits[i], "g"), latinDigits[i])
        }
    }

    return result
}
