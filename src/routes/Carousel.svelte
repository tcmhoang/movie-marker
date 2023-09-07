<script lang="ts">
	import { constructMovieImageUrl } from '$lib/movies.api';
	import type { MovieListResult } from '$lib/types';

	export let movies: MovieListResult[];
</script>

<div class="carousel">
	{#each movies as movie}
		<a href="/movie/{movie.id}">
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
		scroll-snap-type: mandatory;
		scroll-padding-left: var(--cpad);
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
