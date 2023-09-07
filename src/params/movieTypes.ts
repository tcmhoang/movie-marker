import { views } from '$lib/movieViews';

export function match(param: string) {
	return param in views;
}
