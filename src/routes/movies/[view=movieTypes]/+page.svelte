<script lang="ts">
	import MovieViewer from '$lib/MovieViewer.svelte';
	import { constructMovieUrl } from '$lib/movies.api';
	import type { MovieList } from '$lib/types';

	export let data;

	let semaphore = false;

	async function update() {
		if (semaphore || !data.next) return;

		semaphore = true;
		const next = (await (
			await fetch(constructMovieUrl(data.endpoint, { page: data.next + '' }))
		).json()) as MovieList;

		data.movies = [...data.movies, ...next.results];
		data.next = next.page < next.total_pages ? next.page + 1 : null;

		semaphore = false;
	}
</script>

<div class="column">
	<h1>{data.title}</h1>

	<MovieViewer
		movies={data.movies}
		next={data.next ? `/movies/${data.view}?page=${data.next}` : null}
		on:movieUpdated={update}
	/>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>
