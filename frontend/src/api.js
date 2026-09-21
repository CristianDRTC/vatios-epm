const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export async function getReadings() {
	const response = await fetch(`${API_URL}/readings`);
	if (!response.ok) throw new Error('No se pudieron cargar las lecturas');
	return response.json();
}
