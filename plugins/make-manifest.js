
    import * as fs from 'fs';
    import { resolve } from 'path';
    import manifest from '../src/manifest';
    
    const outDir = resolve(__dirname, '..', 'dist');
    
    export default function makeManifest() {
      return {
        name: 'make-manifest',
        buildEnd() {
          if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir);
          }
    
          const manifestPath = resolve(outDir, 'manifest.json');
    
          fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    
          console.log('\x1b[32m', `\nManifest file copy complete: ${manifestPath}`);
        },
      };
    }