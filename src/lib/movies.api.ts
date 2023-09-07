export const mediaBase = 'https://image.tmdb.org/t/p';

const baseUrl = 'https://api.movies.tastejs.com';

export function constructMovieUrl(endpoint: string, params?: Record<string, string>) {
	return params != null
		? `${baseUrl}${endpoint}?${new URLSearchParams(params)}`
		: `${baseUrl}${endpoint}`;
}

export function constructMovieImageUrl(path: string, width?: number) {
	return `${mediaBase}/w${width || 1280}${path}`;
}
