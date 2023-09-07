<script lang="ts">
	import { constructMovieImageUrl } from '$lib/movies.api';
	import type { MovieDetails } from '$lib/types';

	export let movie: MovieDetails;

	$: imgs = movie.images;
	$: backdrop = imgs.backdrops.find((img) => !img.iso_639_1) || imgs.backdrops[0];
	$: logo = imgs.logos.find((img) => img.iso_639_1 == 'en') || imgs.logos[0];
</script>

<a href="/movie/{movie.id}" class="column">
	<img
		class="backdrop"
		src={constructMovieImageUrl(backdrop.file_path)}
		alt={movie.title}
		style="aspect-ratio: {backdrop.aspect_ratio} ;"
	/>

	<img src={constructMovieImageUrl(logo.file_path)} alt={movie.title} class="logo" />
</a>

<style>
	a {
		display: flex;
	}

	.backdrop {
		width: 100%;
	}

	.logo {
		position: absolute;
		left: 1rem;
		top: 0;
		height: 100%;
		width: 30%;
		object-fit: contain;
		filter: drop-shadow(0 0 1rem black);
	}
</style>
