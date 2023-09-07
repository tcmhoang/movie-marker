<script lang="ts">
	import ResultPage from './ResultPage.svelte';

	export let data;
</script>

<div class="column">
	<h1>{data.title}</h1>

	<ResultPage
		movies={data.movies}
		next={data.next ? `/movies/${data.view}?page=${data.next}` : null}
	/>
</div>
