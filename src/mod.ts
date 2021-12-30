import { initPackFolder } from "./pack.ts"
import createRootAdvancement from "./advancement/rootAdvancement.ts"
import createAllFishAdvancements from "./advancement/fishAdvancement.ts"

await initPackFolder()
await createRootAdvancement()
await createAllFishAdvancements()

console.log("Generated datapack folder, zip the contents of the pack/ folder to turn it into a datapack")