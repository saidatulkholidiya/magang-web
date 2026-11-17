// Pakai ||, bukan ??. Jika variabel ada tetapi kosong (""), ?? tidak menggantinya.
export const BASE_URL: string = import.meta.env.VITE_API_URL || "/api/v1";