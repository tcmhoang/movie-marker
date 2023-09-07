import { constructMovieUrl } from '$lib/movies.api';
import type { MovieDetails, MovieList } from '$lib/types';

export async function load({ fetch }: { fetch: typeof globalThis.fetch }) {
	const [trending, playing, upcoming] = (
		await Promise.all(
			(
				await Promise.all([
					fetch(constructMovieUrl('/trending/movie/day')),
					fetch(constructMovieUrl('/movies/now_playing')),
					fetch(constructMovieUrl('/movies/upcoming'))
				])
			).map((resp) => resp.json())
		)
	).map((json) => json as MovieList);

	const f = trending.results[0];

	const fres = await fetch(
		constructMovieUrl(`/movie/${f.id}`, { append_to_response: 'images' })
	);

	const fdata = (await fres.json()) as MovieDetails;

	return {
		trending,
		fdata,
		playing,
		upcoming
	};
}
