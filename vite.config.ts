import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Custom plugin to modify HTML output
const htmlPathPlugin = () => {
  return {
    name: 'html-path-modifier',
    transformIndexHtml: {
      enforce: 'post',
      transform(html, context) {
        // Only modify in build mode
        if (context.bundle) {
          return html.replace(/src="\.\/main\.js"/g, 'src="main.js"');
        }
        return html;
      }
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  plugins: [react(), htmlPathPlugin()],
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'html') {
        return filename; // Return just the filename without path prefix
      }
      return { relative: true };
    }
  },
  build: {
    outDir: "dist/ciExtension",
    sourcemap: true,
    assetsDir: "",
    // Ensure the HTML file is emitted
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        //transcriptionWorker: path.resolve(__dirname, 'src/transcriptionWorker.js'),
        // sw: path.resolve(__dirname, 'src/sw.js'),
        // gemma: path.resolve(__dirname, 'src/gemma.js'),
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name]-[hash].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});