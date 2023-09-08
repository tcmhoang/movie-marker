<script lang="ts">
	import { constructMovieImageUrl } from '$lib/movies.api';
	import type { MovieListResult } from '$lib/types';
	import { createEventDispatcher, onMount } from 'svelte';

	export let movies: MovieListResult[];
	export let next: string | null;

	const dispatch = createEventDispatcher();

	let viewport: HTMLDivElement;
	let movieContainer: HTMLDivElement;

	let movieHeight: number,
		paddingTop: number,
		paddingBottom: number,
		fRenderedChild: number,
		lRenderedChild: number;

	let column = 4;

	function handleScroll() {
		fRenderedChild = Math.floor(viewport.scrollTop / movieHeight) * column;
		lRenderedChild = Math.min(
			Math.ceil((viewport.scrollTop + viewport.clientHeight) / movieHeight) *
				column,
			movies.length
		);

		if (lRenderedChild == movies.length) {
			dispatch('movieUpdated');
		}

		paddingTop = Math.floor((fRenderedChild / column) * movieHeight);
		paddingBottom = Math.floor(((movies.length - lRenderedChild) / 4) * movieHeight);

		movieContainer.style.paddingTop = `${paddingTop}px`;
		movieContainer.style.paddingBottom = `${paddingBottom}px`;
	}

	function handleResize() {
		if (movieContainer.childNodes.length != 0) {
			let a = movieContainer.firstElementChild as HTMLAnchorElement;

			movieHeight = a.offsetHeight;
			handleScroll();
		}
	}

	onMount(handleResize);
</script>

<svelte:window on:resize={handleResize} />

<div class="viewport" bind:this={viewport} on:scroll={handleScroll}>
	<div class="results" bind:this={movieContainer}>
		{#each movies.slice(fRenderedChild, lRenderedChild) as movie}
			<a href="/movies/${movie.id}">
				<img
					src={constructMovieImageUrl(movie.poster_path, 500)}
					alt={movie.title}
				/>
			</a>
		{/each}
	</div>

	{#if next}
		<a href={next}>Next page</a>
	{/if}
</div>

<style>
	.viewport {
		overflow-y: auto;
		height: 100vh;
	}
	.results {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		width: 100%;
	}
	a {
		height: auto;
		padding: 0.5rem;
	}

	img {
		width: 100%;
		aspect-ratio: 2/3;
	}
</style>
