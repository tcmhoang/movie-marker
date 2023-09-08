import { constructMovieUrl } from '$lib/movies.api';
import type { MovieDetails } from '$lib/types';

export async function load({
	params,
	fetch
}: {
	params: Partial<Record<'id', string>>;
	fetch: typeof globalThis.fetch;
}) {
	const movie = (await (
		await fetch(
			constructMovieUrl(`/movie/${params.id}`, {
				append_to_response: 'images,videos,recommendations'
			})
		)
	).json()) as MovieDetails;

	const trailer = movie.videos.results.find(
		(v) =>
			v.official &&
			v.site == 'YouTube' &&
			(v.type == 'Trailer' || v.type == 'Teaser')
	);
	return { movie, trailer };
}
