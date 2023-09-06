import type { MovieDetails, MovieList } from '$lib/types';

const baseUrl = 'https://api.movies.tastejs.com';

export async function load({ fetch }: { fetch: typeof globalThis.fetch }) {
	const resp = await fetch(`${baseUrl}/trending/movie/day`);

	const trending = (await resp.json()) as MovieList;

	const f = trending.results[0];

	const rparams = new URLSearchParams({ append_to_response: 'images' });

	const fres = await fetch(`${baseUrl}/movie/${f.id}?${rparams}`);

	const fdata = (await fres.json()) as MovieDetails;

	return {
		trending,
		fdata
	};
}
