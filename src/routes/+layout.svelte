<script>
	import '../style.css';
	import tmdb from '$lib/images/tmdb.svg';
</script>

<nav>
	<a href="/">Movies Marker</a>
	<div class="links">
		<a href="/search">Search</a>
		<a href="/watchlist">Watch List</a>
		<a href="/login">Log in</a>
	</div>
</nav>

<main>
	<slot />
</main>

<footer>
	<p>
		Data provided by <a href="https://www.themoviedb.org/"
			><img alt="The Movie DB" src={tmdb} /></a
		>
	</p>
</footer>

<style>
	nav {
		display: flex;
		width: 100%;
		height: 3rem;
		align-items: center;
		justify-content: space-between;
		max-width: var(--column);
		padding: 0 var(--padding);
		color: var(--accent);
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	.links {
		display: flex;
		gap: 1rem;
	}

	footer {
		display: flex;
		justify-content: center;
		height: 5rem;
	}
</style>
