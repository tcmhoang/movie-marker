import { constructMovieUrl } from '$lib/movies.api';
import type { MovieList } from '$lib/types';

export async function load({ url, fetch }: { url: URL; fetch: typeof globalThis.fetch }) {
	const query = url.searchParams.get('query');
	return {
		query,
		movies: query
			? (
					(await (
						await fetch(
							constructMovieUrl('/search/movie', {
								query
							})
						)
					).json()) as MovieList
			  ).results
			: []
	};
}
