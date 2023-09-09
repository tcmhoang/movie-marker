<script lang="ts">
	import { constructMovieImageUrl } from '$lib/movies.api';
	import type { MovieDetails } from '$lib/types';

	export let movie: MovieDetails;

	$: backdrop = movie.images.backdrops.find((i) => !i.iso_639_1) || movie.images.backdrops[0];
</script>

<div class="hero">
	<div class="backdrop">
		<img src={constructMovieImageUrl(backdrop.file_path)} alt={movie.title} />
	</div>
	<div class="info">
		<h1>{movie.title}</h1>
		<p>{movie.overview}</p>
	</div>
</div>

<style>
	.hero {
		display: grid;
		background: black;
	}

	.info {
		padding: 0 var(--padding);
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: -4rem;
	}

	.info h1,
	.info p {
		margin: 0;
	}

	.backdrop img {
		width: 100%;
	}

	.backdrop::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 8rem;
		left: 0;
		bottom: 0;
		background: linear-gradient(to top, black, transparent);
	}

	@media (min-width: 60rem) {
		.hero {
			grid-template: auto / 1fr 60rem;
		}

		.backdrop {
			grid-column: 2/3;
		}

		.backdrop::after {
			content: '';
			width: 15rem;
			height: 100%;
			left: 0;
			bottom: 0;
			background: linear-gradient(to right, black, transparent);
		}

		.info {
			position: absolute;
			justify-content: center;
			top: 0;
			left: 0;
			width: 40rem;
			height: 100%;
			grid-column: 1/2;
			margin-top: 0;
			filter: drop-shadow(0 0 1rem black);
		}
	}
</style>
