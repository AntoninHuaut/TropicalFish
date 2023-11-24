import { ensureDir } from 'https://deno.land/std@0.208.0/fs/mod.ts';

import { config } from '../config.ts';
import { RESOURCEPACK_FOLDER_PATH, writeFile } from '../utils/pack.ts';
import { colors, types } from '../utils/variant.ts';

export async function createAtlases() {
    const content: { sources: { type: string; resource: string }[] } = {
        sources: [],
    };

    for (const type of types) {
        for (const colorBody of colors) {
            for (const colorPattern of colors) {
                content.sources.push({
                    type: 'single',
                    resource: `minecraft:${config.techName}/${type}/${colorBody}/${colorPattern}`,
                });
            }
        }
    }

    await ensureDir(`${RESOURCEPACK_FOLDER_PATH}/assets/minecraft/atlases`);
    await writeFile(`${RESOURCEPACK_FOLDER_PATH}/assets/minecraft/atlases/blocks.json`, content);
}
