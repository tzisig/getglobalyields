import { getCollection } from 'astro:content';

async function test() {
    try {
        const guides = await getCollection('guides');
        console.log("Guides count:", guides.length);
        console.log("Categories of first:", guides[0].data.categories);
    } catch (e) {
        console.error("Error:", e);
    }
}
test();
