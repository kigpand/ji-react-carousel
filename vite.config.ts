/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import type { UserConfig as VitestUserConfig } from "vitest/config";

declare module "vite" {
  export interface UserConfig {
    test: VitestUserConfig["test"];
  }
}

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.ts", // 라이브러리 진입점
      name: "JiReactCarousel", // 글로벌 네임스페이스 이름
      fileName: (format) => `ji-react-carousel.${format}.js`, // 파일 이름
    },
    rollupOptions: {
      external: ["react", "react-dom"], // React는 외부 의존성 처리
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
