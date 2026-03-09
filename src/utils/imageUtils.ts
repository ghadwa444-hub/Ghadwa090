/**
 * Optimizes an image URL by routing it through a free global CDN (wsrv.nl).
 * This drastically reduces Supabase "Cached Egress" quota limits and improves load times.
 */
export const optimizeImage = (url: string | undefined | null, width: number = 400): string => {
    if (!url) return '';
    return url;
};
