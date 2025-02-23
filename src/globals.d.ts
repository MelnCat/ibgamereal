/// <reference types="vite-plugin-glsl/ext" />
import type * as CSS from "csstype";

declare module "csstype" {
	interface Properties {
		[index: `--${string}`]: string | number;
	}
}
