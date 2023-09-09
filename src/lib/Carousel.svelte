<script lang="ts">
	import type { View } from '$lib/movieViews';
	import { constructMovieImageUrl } from '$lib/movies.api';
	import type { MovieListResult } from '$lib/types';

	export let movies: MovieListResult[];
	export let view: View;
	export let href: string | null;
</script>

<h2 class="column">
	{view.title}
	{#if href}
		<a {href}>see all</a>
	{/if}
</h2>

<div class="carousel">
	{#each movies as movie}
		<a href="/movies/{movie.id}">
			<img
				src={constructMovieImageUrl(movie.poster_path, 500)}
				alt={movie.title}
			/>
		</a>
	{/each}
</div>

<style>
	.carousel {
		--cpad: max(var(--padding), var(--padding) + (100vw - var(--column)) /2);
		display: flex;
		height: 10rem;
		gap: 1rem;
		overflow-x: scroll;
		scroll-snap-type: x mandatory;
		scroll-padding-left: var(--cpad);
		overscroll-behavior-x: contain;

		padding: 0 var(--cpad);
	}

	.carousel::-webkit-scrollbar {
		display: none;
	}

	a,
	img {
		height: 100%;
	}
</style>
