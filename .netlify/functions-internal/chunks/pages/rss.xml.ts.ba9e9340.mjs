import rss from '@astrojs/rss';
import { h as cleanSlug, P as POST_PERMALINK_PATTERN, t as trimSlash, j as BLOG, S as SITE, b as getPermalink } from './404.astro.ce65b8c2.mjs';
import { i as createCollectionToGlobResultMap, j as createGetCollection } from '../astro.836cabea.mjs';

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/post/astrowind-template-in-depth.md": () => import('../astrowind-template-in-depth.9447e990.mjs'),"/src/content/post/get-started-website-with-astro-tailwind-css.md": () => import('../get-started-website-with-astro-tailwind-css.0489cc6a.mjs'),"/src/content/post/how-to-customize-astrowind-to-your-brand.md": () => import('../how-to-customize-astrowind-to-your-brand.7fb34e39.mjs'),"/src/content/post/markdown-elements-demo-post.mdx": () => import('../markdown-elements-demo-post.bc652e79.mjs'),"/src/content/post/useful-resources-to-create-websites.md": () => import('../useful-resources-to-create-websites.e7e1d631.mjs')

});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({

});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"post":{"type":"content","entries":{"astrowind-template-in-depth":"/src/content/post/astrowind-template-in-depth.md","get-started-website-with-astro-tailwind-css":"/src/content/post/get-started-website-with-astro-tailwind-css.md","how-to-customize-astrowind-to-your-brand":"/src/content/post/how-to-customize-astrowind-to-your-brand.md","markdown-elements-demo-post":"/src/content/post/markdown-elements-demo-post.mdx","useful-resources-to-create-websites":"/src/content/post/useful-resources-to-create-websites.md"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/post/astrowind-template-in-depth.md": () => import('../astrowind-template-in-depth.92c3bd65.mjs'),"/src/content/post/get-started-website-with-astro-tailwind-css.md": () => import('../get-started-website-with-astro-tailwind-css.2e2c3a33.mjs'),"/src/content/post/how-to-customize-astrowind-to-your-brand.md": () => import('../how-to-customize-astrowind-to-your-brand.81c5f14c.mjs'),"/src/content/post/markdown-elements-demo-post.mdx": () => import('../markdown-elements-demo-post.fae03216.mjs'),"/src/content/post/useful-resources-to-create-websites.md": () => import('../useful-resources-to-create-websites.4d964434.mjs')

});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
});

const generatePermalink = async ({ id, slug, publishDate, category }) => {
  const year = String(publishDate.getFullYear()).padStart(4, "0");
  const month = String(publishDate.getMonth() + 1).padStart(2, "0");
  const day = String(publishDate.getDate()).padStart(2, "0");
  const hour = String(publishDate.getHours()).padStart(2, "0");
  const minute = String(publishDate.getMinutes()).padStart(2, "0");
  const second = String(publishDate.getSeconds()).padStart(2, "0");
  const permalink = POST_PERMALINK_PATTERN.replace("%slug%", slug).replace("%id%", id).replace("%category%", category || "").replace("%year%", year).replace("%month%", month).replace("%day%", day).replace("%hour%", hour).replace("%minute%", minute).replace("%second%", second);
  return permalink.split("/").map((el) => trimSlash(el)).filter((el) => !!el).join("/");
};
const getNormalizedPost = async (post) => {
  const { id, slug: rawSlug = "", data } = post;
  const { Content, remarkPluginFrontmatter } = await post.render();
  const {
    tags: rawTags = [],
    category: rawCategory,
    author = "Anonymous",
    publishDate: rawPublishDate = /* @__PURE__ */ new Date(),
    ...rest
  } = data;
  const slug = cleanSlug(rawSlug.split("/").pop());
  const publishDate = new Date(rawPublishDate);
  const category = rawCategory ? cleanSlug(rawCategory) : void 0;
  const tags = rawTags.map((tag) => cleanSlug(tag));
  return {
    id,
    slug,
    publishDate,
    category,
    tags,
    author,
    ...rest,
    Content,
    // or 'body' in case you consume from API
    permalink: await generatePermalink({ id, slug, publishDate, category }),
    readingTime: remarkPluginFrontmatter?.readingTime
  };
};
const load = async function() {
  const posts = await getCollection("post");
  const normalizedPosts = posts.map(async (post) => await getNormalizedPost(post));
  const results = (await Promise.all(normalizedPosts)).sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf()).filter((post) => !post.draft);
  return results;
};
let _posts;
const fetchPosts = async () => {
  if (!_posts) {
    _posts = await load();
  }
  return _posts;
};

const get = async () => {
  if (BLOG.disabled) {
    return new Response(null, {
      status: 404,
      statusText: "Not found"
    });
  }
  const posts = await fetchPosts();
  return rss({
    title: `${SITE.name}’s Blog`,
    description: SITE.description,
    site: "https://rabbitholecompany.com",
    items: posts.map((post) => ({
      link: getPermalink(post.permalink, "post"),
      title: post.title,
      description: post.description,
      pubDate: post.publishDate
    })),
    trailingSlash: SITE.trailingSlash
  });
};

const rss_xml = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	get
}, Symbol.toStringTag, { value: 'Module' }));

export { fetchPosts as f, rss_xml as r };
