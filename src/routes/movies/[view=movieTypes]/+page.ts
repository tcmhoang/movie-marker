import { views } from '$lib/movieViews';
import { constructMovieUrl } from '$lib/movies.api';
import type { MovieList } from '$lib/types';

export async function load({
	params,
	fetch,
	url
}: {
	fetch: typeof globalThis.fetch;
	params: Partial<Record<'view', string>>;
	url: URL;
}) {
	const view = views[params.view || ''];
	const page = url.searchParams.get('page') || '1';

	const data = (await (
		await fetch(constructMovieUrl(view.endpoint, { page }))
	).json()) as MovieList;

	return {
		view: view,
		title: view.title,
		endpoint: view.endpoint,
		movies: data.results,
		next: data.page < data.total_pages ? data.page + 1 : null
	};
}
