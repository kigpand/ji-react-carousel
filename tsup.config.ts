import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // 라이브러리 진입점
  format: ["cjs", "esm"], // CommonJS와 ESM 형식
  dts: true, // 타입 정의 파일 생성
  sourcemap: true, // 소스맵 생성
  clean: true, // 기존 빌드 파일 삭제
  external: ["react", "react-dom"], // React만 외부 의존성으로 처리
});
