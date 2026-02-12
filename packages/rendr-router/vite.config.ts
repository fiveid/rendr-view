import { getBaseViteConfig } from '../../vite.config.base';
import { defineConfig, mergeConfig } from 'vite';

export default mergeConfig(
  getBaseViteConfig(__dirname),
  defineConfig({
    resolve: {
      alias: {
        stream: 'stream-browserify',
        util: 'util'
      }
    },
    define: {
      'process.env': {} 
    }
  })
);
