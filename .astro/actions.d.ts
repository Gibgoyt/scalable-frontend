declare module "astro:actions" {
	type Actions = typeof import("/Users/ahmed/Projects/Astro/scalable-frontend/src/actions")["server"];

	export const actions: Actions;
}