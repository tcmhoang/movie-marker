<script lang="ts">
	import Hero from './Hero.svelte';
	import { views } from '$lib/movieViews';
	import Carousel from '$lib/Carousel.svelte';

	export let data;
</script>

<h1 class="column">Top trending movies</h1>

<Hero movie={data.fdata} />

<Carousel movies={data.trending.results} view={views.trending} href="/movies/trending" />
<Carousel movies={data.playing.results} view={views.now_playing} href="/movies/now_playing" />
<Carousel movies={data.upcoming.results} view={views.upcoming} href="/movies/trending" />
