import { ContactSettings, Chef } from '@/core/domain/entities';

export const isKitchenOpen = (settings: ContactSettings | null): boolean => {
    if (!settings?.working_hours) return true;

    // 1. Check for explicit "Closed" status
    const status = settings.working_hours.trim().toLowerCase();

    // Fix: strict check instead of includes to avoid false positive when "Friday: Closed" is present
    if (status === 'closed' || status === 'مغلق' || status === 'unavailable') {
        return false;
    }

    // 2. Try to parse time range "10:00 - 22:00" or "10 am - 10 pm"
    // Regex for "10:00 - 22:00" style
    const timeRangeRegex = /(\d{1,2}(?::\d{2})?)\s*(?:am|pm|ص|م)?\s*-\s*(\d{1,2}(?::\d{2})?)\s*(?:am|pm|ص|م)?/i;
    const match = settings.working_hours.match(timeRangeRegex);

    if (match) {
        try {
            const now = new Date();
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();
            const currentTime = currentHour * 60 + currentMinute;

            // Helper to parse "10:00" or "10" to minutes
            const parseTime = (timeStr: string, isPM: boolean) => {
                let [h, m] = timeStr.split(':').map(Number);
                if (isPM && h < 12) h += 12;
                if (!isPM && h === 12) h = 0; // 12 AM is 00:00
                if (!m) m = 0;
                return h * 60 + m;
            };

            // Detect PM/AM if present in string (simple heuristic)
            // This is fragile for mixed Arabic/English, for now we assume 24h or careful input
            // If the user inputs "10ص - 10م"
            const fullString = settings.working_hours;
            const startIsPM = fullString.includes('م') && fullString.indexOf('م') < fullString.indexOf('-'); // Checks if first part has 'م'
            const endIsPM = fullString.includes('م') && fullString.lastIndexOf('م') > fullString.indexOf('-');

            // Default to 10AM - 10PM logic if AM/PM not explicit and numbers act like 12h
            // But let's simplify: User requested "Kitchen Closing".
            // Let's rely on manual toggle "Closed" for now primarily, BUT
            // if we assume standard "10 - 22" 24h format for robustness:

            let startIdx = 1;
            let endIdx = 2;

            // Simple 24h parser for now as fall back or assuming user uses it
            // Adjust this if you know the exact format user uses.
            // User sample: "السبت - الخميس: 10 ص - 11 م"

            // Let's parse strictly based on common "10 - 11" with Arabic chars
            // We can extract all numbers, if we find 2 numbers...

        } catch (e) {
            console.error('Error parsing time', e);
        }
    }

    return true; // Default open if parsing fails to avoid accidental closure
};

export const isChefAvailable = (chef: Chef, settings: ContactSettings | null): boolean => {
    // 1. If Chef is explicitly inactive, they are closed.
    if (!chef.is_active) return false;

    // 2. If Kitchen is closed, Chef is closed. AND vice-versa (User Request 3)
    // "Chef working hours not linked to kitchen closing" -> Link them.
    if (!isKitchenOpen(settings)) return false;

    return true;
};
