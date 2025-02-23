/// <reference types="vite-plugin-glsl/ext" />
import type * as CSS from "csstype";

declare module "glsl-canvas-js" {
	export * from "glsl-canvas-js/dist/cjs/glsl.d.ts";
}

declare module "csstype" {
	interface Properties {
		[index: `--${string}`]: string | number;
	}
}
