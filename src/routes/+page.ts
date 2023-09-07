import { constructMovieUrl } from '$lib/movies.api';
import type { MovieDetails, MovieList } from '$lib/types';

export async function load({ fetch }: { fetch: typeof globalThis.fetch }) {
	const resp = await fetch(constructMovieUrl('/trending/movie/day'));

	const trending = (await resp.json()) as MovieList;

	const f = trending.results[0];

	const fres = await fetch(
		constructMovieUrl(`/movie/${f.id}`, { append_to_response: 'images' })
	);

	const fdata = (await fres.json()) as MovieDetails;

	return {
		trending,
		fdata
	};
}
