import 'kleur/colors';
import 'node:fs/promises';
import 'node:path';
import 'node:url';
import 'http-cache-semantics';
import 'node:os';
import 'image-size';
import 'magic-string';
import mime from 'mime';
import 'node:stream';
import { c as createAstro, a as createComponent, r as renderTemplate, b as renderComponent, u as unescapeHTML, F as Fragment, d as defineScriptVars, s as spreadAttributes, e as addAttribute, f as renderSlot, g as renderHead, m as maybeRenderHead } from '../astro.836cabea.mjs';
/* empty css                             */import { escape } from 'html-escaper';
import slugify from 'limax';
import path from 'path';
import { fileURLToPath } from 'url';

function isOutputFormat(value) {
  return ["avif", "jpeg", "jpg", "png", "webp", "svg"].includes(value);
}
function isOutputFormatSupportsAlpha(value) {
  return ["avif", "png", "webp"].includes(value);
}
function isAspectRatioString(value) {
  return /^\d*:\d*$/.test(value);
}
function parseAspectRatio(aspectRatio) {
  if (!aspectRatio) {
    return void 0;
  }
  if (typeof aspectRatio === "number") {
    return aspectRatio;
  } else {
    const [width, height] = aspectRatio.split(":");
    return parseInt(width) / parseInt(height);
  }
}
function isSSRService(service) {
  return "transform" in service;
}
class BaseSSRService {
  async getImageAttributes(transform) {
    const { width, height, src, format, quality, aspectRatio, ...rest } = transform;
    return {
      ...rest,
      width,
      height
    };
  }
  serializeTransform(transform) {
    const searchParams = new URLSearchParams();
    if (transform.quality) {
      searchParams.append("q", transform.quality.toString());
    }
    if (transform.format) {
      searchParams.append("f", transform.format);
    }
    if (transform.width) {
      searchParams.append("w", transform.width.toString());
    }
    if (transform.height) {
      searchParams.append("h", transform.height.toString());
    }
    if (transform.aspectRatio) {
      searchParams.append("ar", transform.aspectRatio.toString());
    }
    if (transform.fit) {
      searchParams.append("fit", transform.fit);
    }
    if (transform.background) {
      searchParams.append("bg", transform.background);
    }
    if (transform.position) {
      searchParams.append("p", encodeURI(transform.position));
    }
    searchParams.append("href", transform.src);
    return { searchParams };
  }
  parseTransform(searchParams) {
    if (!searchParams.has("href")) {
      return void 0;
    }
    let transform = { src: searchParams.get("href") };
    if (searchParams.has("q")) {
      transform.quality = parseInt(searchParams.get("q"));
    }
    if (searchParams.has("f")) {
      const format = searchParams.get("f");
      if (isOutputFormat(format)) {
        transform.format = format;
      }
    }
    if (searchParams.has("w")) {
      transform.width = parseInt(searchParams.get("w"));
    }
    if (searchParams.has("h")) {
      transform.height = parseInt(searchParams.get("h"));
    }
    if (searchParams.has("ar")) {
      const ratio = searchParams.get("ar");
      if (isAspectRatioString(ratio)) {
        transform.aspectRatio = ratio;
      } else {
        transform.aspectRatio = parseFloat(ratio);
      }
    }
    if (searchParams.has("fit")) {
      transform.fit = searchParams.get("fit");
    }
    if (searchParams.has("p")) {
      transform.position = decodeURI(searchParams.get("p"));
    }
    if (searchParams.has("bg")) {
      transform.background = searchParams.get("bg");
    }
    return transform;
  }
}

function isRemoteImage(src) {
  return /^(https?:)?\/\//.test(src);
}
function removeQueryString(src) {
  const index = src.lastIndexOf("?");
  return index > 0 ? src.substring(0, index) : src;
}
function extname(src) {
  const base = basename(src);
  const index = base.lastIndexOf(".");
  if (index <= 0) {
    return "";
  }
  return base.substring(index);
}
function basename(src) {
  return removeQueryString(src.replace(/^.*[\\\/]/, ""));
}

const defaultImage = {"src":"/_astro/default.5cdc518a.png","width":2400,"height":1256,"format":"png"};

const _default = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: defaultImage
}, Symbol.toStringTag, { value: 'Module' }));

const CONFIG = {
  name: "RabbitHole Company",

  origin: "https://rabbitholecompany.com",
  basePathname: "/",
  trailingSlash: false,

  title: "RabbitHole Education - new generation of VR education",
  description:
    "🐰 Provide English, Mathematics and Science Education with lastest VR technology",
  defaultImage: defaultImage,

  defaultTheme: "light:only", // Values: "system" | "light" | "dark" | "light:only" | "dark:only"

  language: "ko",
  textDirection: "ltr",

  dateFormatter: new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }),

  googleAnalyticsId: false, // or "G-XXXXXXXXXX",
  googleSiteVerificationId: false, //"orcPxI47GSa-cRvY11tUe6iGg2IO_RPvnA1q95iEM3M",

  blog: {
    disabled: false,
    postsPerPage: 4,

    post: {
      permalink: "/%slug%", // Variables: %slug%, %year%, %month%, %day%, %hour%, %minute%, %second%, %category%
      noindex: false,
      disabled: false,
    },

    list: {
      pathname: "blog", // Blog main path, you can change this to "articles" (/articles)
      noindex: false,
      disabled: false,
    },

    category: {
      pathname: "category", // Category main path /category/some-category
      noindex: true,
      disabled: false,
    },

    tag: {
      pathname: "tag", // Tag main path /tag/some-tag
      noindex: true,
      disabled: false,
    },
  },
};

const SITE = { ...CONFIG, blog: undefined };
const BLOG = CONFIG.blog;
const DATE_FORMATTER = CONFIG.dateFormatter;

const defaults = {
  templateTitle: "",
  noindex: false,
  nofollow: false,
  defaultOpenGraphImageWidth: 0,
  defaultOpenGraphImageHeight: 0,
  defaultOpenGraphVideoWidth: 0,
  defaultOpenGraphVideoHeight: 0
};
const buildOpenGraphMediaTags = (mediaType, media = [], { defaultWidth, defaultHeight } = {}) => {
  return media.reduce((tags, medium, index) => {
    tags.push(`<meta property="og:${mediaType}" content="${medium.url}" />`);
    if (medium.alt) {
      tags.push(`<meta property="og:${mediaType}:alt" content="${medium.alt}" />`);
    }
    if (medium.secureUrl) {
      tags.push(`<meta property="og:${mediaType}:secure_url" content="${medium.secureUrl.toString()}" />`);
    }
    if (medium.type) {
      tags.push(`<meta property="og:${mediaType}:type" content="${medium.type.toString()}" />`);
    }
    if (medium.width) {
      tags.push(`<meta property="og:${mediaType}:width" content="${medium.width.toString()}" />`);
    } else if (defaultWidth) {
      tags.push(`<meta property="og:${mediaType}:width" content="${defaultWidth.toString()}" />`);
    }
    if (medium.height) {
      tags.push(`<meta property="og:${mediaType}:height" content="${medium.height.toString()}" />`);
    } else if (defaultHeight) {
      tags.push(`<meta property="og:${mediaType}:height" content="${defaultHeight.toString()}" />`);
    }
    return tags;
  }, []);
};
const buildTags = (config) => {
  const tagsToRender = [];
  if (config.titleTemplate) {
    defaults.templateTitle = config.titleTemplate;
  }
  let updatedTitle = "";
  if (config.title) {
    updatedTitle = config.title;
    if (defaults.templateTitle) {
      updatedTitle = defaults.templateTitle.replace(/%s/g, () => updatedTitle);
    }
  } else if (config.defaultTitle) {
    updatedTitle = config.defaultTitle;
  }
  if (updatedTitle) {
    tagsToRender.push(`<title>${escape(updatedTitle)}</title>`);
  }
  const noindex = config.noindex || defaults.noindex || config.dangerouslySetAllPagesToNoIndex;
  const nofollow = config.nofollow || defaults.nofollow || config.dangerouslySetAllPagesToNoFollow;
  let robotsParams = "";
  if (config.robotsProps) {
    const {
      nosnippet,
      maxSnippet,
      maxImagePreview,
      maxVideoPreview,
      noarchive,
      noimageindex,
      notranslate,
      unavailableAfter
    } = config.robotsProps;
    robotsParams = `${nosnippet ? ",nosnippet" : ""}${maxSnippet ? `,max-snippet:${maxSnippet}` : ""}${maxImagePreview ? `,max-image-preview:${maxImagePreview}` : ""}${noarchive ? ",noarchive" : ""}${unavailableAfter ? `,unavailable_after:${unavailableAfter}` : ""}${noimageindex ? ",noimageindex" : ""}${maxVideoPreview ? `,max-video-preview:${maxVideoPreview}` : ""}${notranslate ? ",notranslate" : ""}`;
  }
  if (noindex || nofollow) {
    if (config.dangerouslySetAllPagesToNoIndex) {
      defaults.noindex = true;
    }
    if (config.dangerouslySetAllPagesToNoFollow) {
      defaults.nofollow = true;
    }
    tagsToRender.push(
      `<meta name="robots" content="${noindex ? "noindex" : "index"},${nofollow ? "nofollow" : "follow"}${robotsParams}" />`
    );
  } else {
    tagsToRender.push(`<meta name="robots" content="index,follow${robotsParams}" />`);
  }
  if (config.description) {
    tagsToRender.push(`<meta name="description" content="${escape(config.description)}" />`);
  }
  if (config.mobileAlternate) {
    tagsToRender.push(
      `<link rel="alternate" media="${config.mobileAlternate.media}" href="${config.mobileAlternate.href}" />`
    );
  }
  if (config.languageAlternates && config.languageAlternates.length > 0) {
    config.languageAlternates.forEach((languageAlternate) => {
      tagsToRender.push(
        `<link rel="alternate" hrefLang="${languageAlternate.hrefLang}" href="${languageAlternate.href}" />`
      );
    });
  }
  if (config.twitter) {
    if (config.twitter.cardType) {
      tagsToRender.push(`<meta name="twitter:card" content="${config.twitter.cardType}" />`);
    }
    if (config.twitter.site) {
      tagsToRender.push(`<meta name="twitter:site" content="${config.twitter.site}" />`);
    }
    if (config.twitter.handle) {
      tagsToRender.push(`<meta name="twitter:creator" content="${config.twitter.handle}" />`);
    }
  }
  if (config.facebook) {
    if (config.facebook.appId) {
      tagsToRender.push(`<meta property="fb:app_id" content="${config.facebook.appId}" />`);
    }
  }
  if (config.openGraph?.title || updatedTitle) {
    tagsToRender.push(`<meta property="og:title" content="${escape(config.openGraph?.title || updatedTitle)}" />`);
  }
  if (config.openGraph?.description || config.description) {
    tagsToRender.push(
      `<meta property="og:description" content="${escape(config.openGraph?.description || config.description)}" />`
    );
  }
  if (config.openGraph) {
    if (config.openGraph.url || config.canonical) {
      tagsToRender.push(`<meta property="og:url" content="${config.openGraph.url || config.canonical}" />`);
    }
    if (config.openGraph.type) {
      const type = config.openGraph.type.toLowerCase();
      tagsToRender.push(`<meta property="og:type" content="${type}" />`);
      if (type === "profile" && config.openGraph.profile) {
        if (config.openGraph.profile.firstName) {
          tagsToRender.push(`<meta property="profile:first_name" content="${config.openGraph.profile.firstName}" />`);
        }
        if (config.openGraph.profile.lastName) {
          tagsToRender.push(`<meta property="profile:last_name" content="${config.openGraph.profile.lastName}" />`);
        }
        if (config.openGraph.profile.username) {
          tagsToRender.push(`<meta property="profile:username" content="${config.openGraph.profile.username}" />`);
        }
        if (config.openGraph.profile.gender) {
          tagsToRender.push(`<meta property="profile:gender" content="${config.openGraph.profile.gender}" />`);
        }
      } else if (type === "book" && config.openGraph.book) {
        if (config.openGraph.book.authors && config.openGraph.book.authors.length) {
          config.openGraph.book.authors.forEach((author, index) => {
            tagsToRender.push(`<meta property="book:author" content="${author}" />`);
          });
        }
        if (config.openGraph.book.isbn) {
          tagsToRender.push(`<meta property="book:isbn" content="${config.openGraph.book.isbn}" />`);
        }
        if (config.openGraph.book.releaseDate) {
          tagsToRender.push(`<meta property="book:release_date" content="${config.openGraph.book.releaseDate}" />`);
        }
        if (config.openGraph.book.tags && config.openGraph.book.tags.length) {
          config.openGraph.book.tags.forEach((tag, index) => {
            tagsToRender.push(`<meta property="book:tag" content="${tag}" />`);
          });
        }
      } else if (type === "article" && config.openGraph.article) {
        if (config.openGraph.article.publishedTime) {
          tagsToRender.push(
            `<meta property="article:published_time" content="${config.openGraph.article.publishedTime}" />`
          );
        }
        if (config.openGraph.article.modifiedTime) {
          tagsToRender.push(
            `<meta property="article:modified_time" content="${config.openGraph.article.modifiedTime}" />`
          );
        }
        if (config.openGraph.article.expirationTime) {
          tagsToRender.push(
            `<meta property="article:expiration_time" content="${config.openGraph.article.expirationTime}" />`
          );
        }
        if (config.openGraph.article.authors && config.openGraph.article.authors.length) {
          config.openGraph.article.authors.forEach((author, index) => {
            tagsToRender.push(`<meta property="article:author" content="${author}" />`);
          });
        }
        if (config.openGraph.article.section) {
          tagsToRender.push(`<meta property="article:section" content="${config.openGraph.article.section}" />`);
        }
        if (config.openGraph.article.tags && config.openGraph.article.tags.length) {
          config.openGraph.article.tags.forEach((tag, index) => {
            tagsToRender.push(`<meta property="article:tag" content="${tag}" />`);
          });
        }
      } else if ((type === "video.movie" || type === "video.episode" || type === "video.tv_show" || type === "video.other") && config.openGraph.video) {
        if (config.openGraph.video.actors && config.openGraph.video.actors.length) {
          config.openGraph.video.actors.forEach((actor, index) => {
            if (actor.profile) {
              tagsToRender.push(`<meta property="video:actor" content="${actor.profile}" />`);
            }
            if (actor.role) {
              tagsToRender.push(`<meta property="video:actor:role" content="${actor.role}" />`);
            }
          });
        }
        if (config.openGraph.video.directors && config.openGraph.video.directors.length) {
          config.openGraph.video.directors.forEach((director, index) => {
            tagsToRender.push(`<meta property="video:director" content="${director}" />`);
          });
        }
        if (config.openGraph.video.writers && config.openGraph.video.writers.length) {
          config.openGraph.video.writers.forEach((writer, index) => {
            tagsToRender.push(`<meta property="video:writer" content="${writer}" />`);
          });
        }
        if (config.openGraph.video.duration) {
          tagsToRender.push(
            `<meta property="video:duration" content="${config.openGraph.video.duration.toString()}" />`
          );
        }
        if (config.openGraph.video.releaseDate) {
          tagsToRender.push(`<meta property="video:release_date" content="${config.openGraph.video.releaseDate}" />`);
        }
        if (config.openGraph.video.tags && config.openGraph.video.tags.length) {
          config.openGraph.video.tags.forEach((tag, index) => {
            tagsToRender.push(`<meta property="video:tag" content="${tag}" />`);
          });
        }
        if (config.openGraph.video.series) {
          tagsToRender.push(`<meta property="video:series" content="${config.openGraph.video.series}" />`);
        }
      }
    }
    if (config.defaultOpenGraphImageWidth) {
      defaults.defaultOpenGraphImageWidth = config.defaultOpenGraphImageWidth;
    }
    if (config.defaultOpenGraphImageHeight) {
      defaults.defaultOpenGraphImageHeight = config.defaultOpenGraphImageHeight;
    }
    if (config.openGraph.images && config.openGraph.images.length) {
      tagsToRender.push(
        ...buildOpenGraphMediaTags("image", config.openGraph.images, {
          defaultWidth: defaults.defaultOpenGraphImageWidth,
          defaultHeight: defaults.defaultOpenGraphImageHeight
        })
      );
    }
    if (config.defaultOpenGraphVideoWidth) {
      defaults.defaultOpenGraphVideoWidth = config.defaultOpenGraphVideoWidth;
    }
    if (config.defaultOpenGraphVideoHeight) {
      defaults.defaultOpenGraphVideoHeight = config.defaultOpenGraphVideoHeight;
    }
    if (config.openGraph.videos && config.openGraph.videos.length) {
      tagsToRender.push(
        ...buildOpenGraphMediaTags("video", config.openGraph.videos, {
          defaultWidth: defaults.defaultOpenGraphVideoWidth,
          defaultHeight: defaults.defaultOpenGraphVideoHeight
        })
      );
    }
    if (config.openGraph.locale) {
      tagsToRender.push(`<meta property="og:locale" content="${config.openGraph.locale}" />`);
    }
    if (config.openGraph.site_name) {
      tagsToRender.push(`<meta property="og:site_name" content="${config.openGraph.site_name}" />`);
    }
  }
  if (config.canonical) {
    tagsToRender.push(`<link rel="canonical" href="${config.canonical}" />`);
  }
  if (config.additionalMetaTags && config.additionalMetaTags.length > 0) {
    config.additionalMetaTags.forEach((tag) => {
      tagsToRender.push(
        `<meta key="meta:${tag.keyOverride ?? tag.name ?? tag.property ?? tag.httpEquiv}" ${Object.keys(tag).map((key) => `${key}="${tag[key]}"`).join(" ")} />`
      );
    });
  }
  if (config.additionalLinkTags?.length) {
    config.additionalLinkTags.forEach((tag) => {
      tagsToRender.push(
        `<link key="link${tag.keyOverride ?? tag.href}${tag.rel}" ${Object.keys(tag).map((key) => `${key}="${tag[key]}"`).join(" ")} />`
      );
    });
  }
  return tagsToRender ? tagsToRender.join("\n") : "";
};

const $$Astro$7 = createAstro("https://rabbitholecompany.com");
const $$AstroSeo = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$AstroSeo;
  const {
    title,
    noindex = false,
    nofollow,
    robotsProps,
    description,
    canonical,
    openGraph,
    facebook,
    twitter,
    additionalMetaTags,
    titleTemplate,
    defaultTitle,
    mobileAlternate,
    languageAlternates,
    additionalLinkTags
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(buildTags({
    title,
    noindex,
    nofollow,
    robotsProps,
    description,
    canonical,
    facebook,
    openGraph,
    additionalMetaTags,
    twitter,
    titleTemplate,
    defaultTitle,
    mobileAlternate,
    languageAlternates,
    additionalLinkTags
  }))}` })}`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/node_modules/@astrolib/seo/src/AstroSeo.astro", void 0);

var __freeze$3 = Object.freeze;
var __defProp$3 = Object.defineProperty;
var __template$3 = (cooked, raw) => __freeze$3(__defProp$3(cooked, "raw", { value: __freeze$3(raw || cooked.slice()) }));
var _a$3;
const $$Astro$6 = createAstro("https://rabbitholecompany.com");
const $$GoogleAnalytics = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$GoogleAnalytics;
  const { id = "GA_MEASUREMENT_ID", partytown = false } = Astro2.props;
  const attrs = partytown ? { type: "text/partytown" } : {};
  return renderTemplate(_a$3 || (_a$3 = __template$3(["\n<script async", "", "><\/script>\n\n<script", ">(function(){", '\n  window.dataLayer = window.dataLayer || [];\n  function gtag() {\n    window.dataLayer.push(arguments);\n  }\n  gtag("js", new Date());\n  gtag("config", id);\n})();<\/script>\n'])), addAttribute(`https://www.googletagmanager.com/gtag/js?id=${id}`, "src"), spreadAttributes(attrs), spreadAttributes(attrs), defineScriptVars({ id }));
}, "/Users/codeztree/Github/RabbitHoleWebsite/node_modules/@astrolib/analytics/src/GoogleAnalytics.astro", void 0);

function resolveSize(transform) {
  if (transform.width && transform.height) {
    return transform;
  }
  if (!transform.width && !transform.height) {
    throw new Error(`"width" and "height" cannot both be undefined`);
  }
  if (!transform.aspectRatio) {
    throw new Error(
      `"aspectRatio" must be included if only "${transform.width ? "width" : "height"}" is provided`
    );
  }
  let aspectRatio;
  if (typeof transform.aspectRatio === "number") {
    aspectRatio = transform.aspectRatio;
  } else {
    const [width, height] = transform.aspectRatio.split(":");
    aspectRatio = Number.parseInt(width) / Number.parseInt(height);
  }
  if (transform.width) {
    return {
      ...transform,
      width: transform.width,
      height: Math.round(transform.width / aspectRatio)
    };
  } else if (transform.height) {
    return {
      ...transform,
      width: Math.round(transform.height * aspectRatio),
      height: transform.height
    };
  }
  return transform;
}
async function resolveTransform(input) {
  if (typeof input.src === "string") {
    return resolveSize(input);
  }
  const metadata = "then" in input.src ? (await input.src).default : input.src;
  let { width, height, aspectRatio, background, format = metadata.format, ...rest } = input;
  if (!width && !height) {
    width = metadata.width;
    height = metadata.height;
  } else if (width) {
    let ratio = parseAspectRatio(aspectRatio) || metadata.width / metadata.height;
    height = height || Math.round(width / ratio);
  } else if (height) {
    let ratio = parseAspectRatio(aspectRatio) || metadata.width / metadata.height;
    width = width || Math.round(height * ratio);
  }
  return {
    ...rest,
    src: metadata.src,
    width,
    height,
    aspectRatio,
    format,
    background
  };
}
async function getImage(transform) {
  var _a, _b, _c;
  if (!transform.src) {
    throw new Error("[@astrojs/image] `src` is required");
  }
  let loader = (_a = globalThis.astroImage) == null ? void 0 : _a.loader;
  if (!loader) {
    const { default: mod } = await import('./endpoint.js.00dbaead.mjs').then(n => n.s).catch(() => {
      throw new Error(
        "[@astrojs/image] Builtin image loader not found. (Did you remember to add the integration to your Astro config?)"
      );
    });
    loader = mod;
    globalThis.astroImage = globalThis.astroImage || {};
    globalThis.astroImage.loader = loader;
  }
  const resolved = await resolveTransform(transform);
  const attributes = await loader.getImageAttributes(resolved);
  const isDev = (_b = (Object.assign({"BASE_URL":"/","MODE":"production","DEV":false,"PROD":true,"SSR":true,"SITE":"https://rabbitholecompany.com","ASSETS_PREFIX":undefined},{_:process.env._,SSR:true,}))) == null ? void 0 : _b.DEV;
  const isLocalImage = !isRemoteImage(resolved.src);
  const _loader = isDev && isLocalImage ? globalThis.astroImage.defaultLoader : loader;
  if (!_loader) {
    throw new Error("@astrojs/image: loader not found!");
  }
  const { searchParams } = isSSRService(_loader) ? _loader.serializeTransform(resolved) : globalThis.astroImage.defaultLoader.serializeTransform(resolved);
  const imgSrc = !isLocalImage && resolved.src.startsWith("//") ? `https:${resolved.src}` : resolved.src;
  let src;
  if (/^[\/\\]?@astroimage/.test(imgSrc)) {
    src = `${imgSrc}?${searchParams.toString()}`;
  } else {
    searchParams.set("href", imgSrc);
    src = `/_image?${searchParams.toString()}`;
  }
  if ((_c = globalThis.astroImage) == null ? void 0 : _c.addStaticImage) {
    src = globalThis.astroImage.addStaticImage(resolved);
  }
  return {
    ...attributes,
    src
  };
}

async function resolveAspectRatio({ src, aspectRatio }) {
  if (typeof src === "string") {
    return parseAspectRatio(aspectRatio);
  } else {
    const metadata = "then" in src ? (await src).default : src;
    return parseAspectRatio(aspectRatio) || metadata.width / metadata.height;
  }
}
async function resolveFormats({ src, formats }) {
  const unique = new Set(formats);
  if (typeof src === "string") {
    unique.add(extname(src).replace(".", ""));
  } else {
    const metadata = "then" in src ? (await src).default : src;
    unique.add(extname(metadata.src).replace(".", ""));
  }
  return Array.from(unique).filter(Boolean);
}
async function getPicture(params) {
  const { src, alt, widths, fit, position, background } = params;
  if (!src) {
    throw new Error("[@astrojs/image] `src` is required");
  }
  if (!widths || !Array.isArray(widths)) {
    throw new Error("[@astrojs/image] at least one `width` is required. ex: `widths={[100]}`");
  }
  const aspectRatio = await resolveAspectRatio(params);
  if (!aspectRatio) {
    throw new Error("`aspectRatio` must be provided for remote images");
  }
  const allFormats = await resolveFormats(params);
  const lastFormat = allFormats[allFormats.length - 1];
  const maxWidth = Math.max(...widths);
  let image;
  async function getSource(format) {
    const imgs = await Promise.all(
      widths.map(async (width) => {
        var _a;
        const img = await getImage({
          src,
          alt,
          format,
          width,
          fit,
          position,
          background,
          aspectRatio
        });
        if (format === lastFormat && width === maxWidth) {
          image = img;
        }
        return `${(_a = img.src) == null ? void 0 : _a.replaceAll(" ", encodeURI)} ${width}w`;
      })
    );
    return {
      type: mime.getType(format) || format,
      srcset: imgs.join(",")
    };
  }
  const sources = await Promise.all(allFormats.map((format) => getSource(format)));
  return {
    sources,
    // @ts-expect-error image will always be defined
    image
  };
}

const formatter = DATE_FORMATTER || new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC"
});
const getFormattedDate = (date) => date ? formatter.format(date) : "";
const trim = (str = "", ch) => {
  let start = 0, end = str.length || 0;
  while (start < end && str[start] === ch)
    ++start;
  while (end > start && str[end - 1] === ch)
    --end;
  return start > 0 || end < str.length ? str.substring(start, end) : str;
};

const trimSlash = (s) => trim(trim(s, "/"));
const createPath = (...params) => {
  const paths = params.map((el) => trimSlash(el)).filter((el) => !!el).join("/");
  return "/" + paths + (SITE.trailingSlash && paths ? "/" : "");
};
const BASE_PATHNAME = SITE.basePathname;
const cleanSlug = (text = "") => trimSlash(text).split("/").map((slug) => slugify(slug)).join("/");
const POST_PERMALINK_PATTERN = trimSlash(
  BLOG?.post?.permalink || "/%slug%"
);
const BLOG_BASE = cleanSlug(BLOG?.list?.pathname);
const CATEGORY_BASE = cleanSlug(BLOG?.category?.pathname || "category");
const TAG_BASE = cleanSlug(BLOG?.tag?.pathname) || "tag";
const getCanonical = (path = "") => {
  const url = String(new URL(path, SITE.origin));
  if (SITE.trailingSlash == false && path && url.endsWith("/")) {
    return url.slice(0, -1);
  } else if (SITE.trailingSlash == true && path && !url.endsWith("/")) {
    return url + "/";
  }
  return url;
};
const getPermalink = (slug = "", type = "page") => {
  let permalink;
  switch (type) {
    case "category":
      permalink = createPath(CATEGORY_BASE, trimSlash(slug));
      break;
    case "tag":
      permalink = createPath(TAG_BASE, trimSlash(slug));
      break;
    case "post":
      permalink = createPath(trimSlash(slug));
      break;
    case "page":
    default:
      permalink = createPath(slug);
      break;
  }
  return definitivePermalink(permalink);
};
const getHomePermalink = () => getPermalink("/");
const getBlogPermalink = () => getPermalink(BLOG_BASE);
const getAsset = (path) => "/" + [BASE_PATHNAME, path].map((el) => trimSlash(el)).filter((el) => !!el).join("/");
const definitivePermalink = (permalink) => createPath(BASE_PATHNAME, permalink);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getProjectRootDir = () => {
  return path.join(__dirname, "../") ;
};
const __srcFolder = path.join(getProjectRootDir(), "/src");
const getRelativeUrlByFilePath = (filepath) => {
  return filepath.replace(__srcFolder, "");
};

const $$Astro$5 = createAstro("https://rabbitholecompany.com");
const $$CustomStyles = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$CustomStyles;
  return renderTemplate`<style is:global>
  :root {
    --aw-font-sans: "InterVariable";
    --aw-font-serif: var(--aw-font-sans);
    --aw-font-heading: var(--aw-font-sans);

    --aw-color-primary: rgb(145, 71, 202);
    --aw-color-secondary: rgb(114, 21, 140);
    --aw-color-accent: rgb(188, 124, 244);
    --aw-color-text-page: rgb(17 24 39);
    --aw-color-text-muted: rgb(75 85 99);
    --aw-color-bg-page: rgb(255 255 255);
  }
</style>`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/src/components/CustomStyles.astro", void 0);

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(raw || cooked.slice()) }));
var _a$2;
const $$Astro$4 = createAstro("https://rabbitholecompany.com");
const $$SplitbeeAnalytics = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$SplitbeeAnalytics;
  const { doNotTrack = true, noCookieMode = false, url = "https://cdn.splitbee.io/sb.js" } = Astro2.props;
  return renderTemplate(_a$2 || (_a$2 = __template$2(["<!-- Splitbee Analytics --><script", "", " async", "><\/script>"])), addAttribute(doNotTrack, "data-respect-dnt"), addAttribute(noCookieMode, "data-no-cookie"), addAttribute(url, "src"));
}, "/Users/codeztree/Github/RabbitHoleWebsite/src/components/common/SplitbeeAnalytics.astro", void 0);

const $$Astro$3 = createAstro("https://rabbitholecompany.com");
const $$MetaTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$MetaTags;
  const defaultImage = SITE.defaultImage ? (await getImage({
    src: SITE.defaultImage,
    alt: "Default image",
    width: 1200,
    height: 628
  })).src : "";
  const {
    title = SITE.name,
    description = "",
    image: _image = defaultImage,
    canonical = getCanonical(String(Astro2.url.pathname)),
    noindex = false,
    nofollow = false,
    ogTitle = title,
    ogType = "website",
    dontUseTitleTemplate = false
  } = Astro2.props;
  const image = typeof _image === "string" ? new URL(_image, Astro2.site) : _image && typeof _image["src"] !== "undefined" ? (
    // @ts-ignore
    new URL(getRelativeUrlByFilePath(_image.src), Astro2.site)
  ) : null;
  return renderTemplate`<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

${renderComponent($$result, "AstroSeo", $$AstroSeo, { "title": title, "titleTemplate": dontUseTitleTemplate ? "%s" : `%s \u2014 ${SITE.name}`, "description": description, "canonical": String(canonical), "noindex": noindex, "nofollow": nofollow, "openGraph": {
    url: String(canonical),
    title: ogTitle,
    description,
    type: ogType,
    images: image ? [
      {
        url: image.toString(),
        alt: ogTitle
      }
    ] : void 0
    // site_name: 'SiteName',
  }, "twitter": {
    // handle: '@handle',
    // site: '@site',
    cardType: image ? "summary_large_image" : void 0
  } })}

${renderComponent($$result, "CustomStyles", $$CustomStyles, {})}

<!-- Google Site Verification -->
${SITE.googleSiteVerificationId && renderTemplate`<meta name="google-site-verification"${addAttribute(SITE.googleSiteVerificationId, "content")}>`}

<!-- Google Analytics -->
${SITE.googleAnalyticsId && renderTemplate`${renderComponent($$result, "GoogleAnalytics", $$GoogleAnalytics, { "id": String(SITE.googleAnalyticsId), "partytown": true })}`}

${SITE.splitbeeAnalytics?.enabled && renderTemplate`${renderComponent($$result, "SplitbeeAnalytics", $$SplitbeeAnalytics, { ...SITE.splitbeeAnalytics })}`}

<link rel="shortcut icon"${addAttribute(getAsset("/favicon.ico"), "href")}>
<link rel="icon" type="image/svg+xml"${addAttribute(getAsset("/favicon.svg"), "href")}>
<link rel="mask-icon"${addAttribute(getAsset("/favicon.svg"), "href")} color="#8D46E7">
<link rel="sitemap"${addAttribute(getAsset("/sitemap-index.xml"), "href")}>`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/src/components/common/MetaTags.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Astro$2 = createAstro("https://rabbitholecompany.com");
const $$BasicScripts = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$BasicScripts;
  return renderTemplate(_a$1 || (_a$1 = __template$1(["<script>(function(){", "\n  function applyTheme(theme) {\n    if (theme === 'dark') {\n      document.documentElement.classList.add('dark');\n    } else {\n      document.documentElement.classList.remove('dark');\n    }\n  }\n\n  if ((defaultTheme && defaultTheme.endsWith(':only')) || (!localStorage.theme && defaultTheme !== 'system')) {\n    applyTheme(defaultTheme.replace(':only', ''));\n  } else if (\n    localStorage.theme === 'dark' ||\n    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)\n  ) {\n    applyTheme('dark');\n  } else {\n    applyTheme('light');\n  }\n\n  function attachEvent(selector, event, fn) {\n    const matches = typeof selector === 'string' ? document.querySelectorAll(selector) : selector;\n    if (matches && matches.length) {\n      matches.forEach((elem) => {\n        elem.addEventListener(event, (e) => fn(e, elem), false);\n      });\n    }\n  }\n\n  window.onload = function () {\n    let lastKnownScrollPosition = window.scrollY;\n    let ticking = true;\n\n    attachEvent('#header nav', 'click', function () {\n      document.querySelector('[data-aw-toggle-menu]')?.classList.remove('expanded');\n      document.body.classList.remove('overflow-hidden');\n      document.getElementById('header')?.classList.remove('h-screen');\n      document.querySelector('#header nav')?.classList.add('hidden');\n    });\n\n    attachEvent('[data-aw-toggle-menu]', 'click', function (_, elem) {\n      elem.classList.toggle('expanded');\n      document.body.classList.toggle('overflow-hidden');\n      document.getElementById('header')?.classList.toggle('h-screen');\n      document.querySelector('#header nav')?.classList.toggle('hidden');\n    });\n\n    attachEvent('[data-aw-toggle-color-scheme]', 'click', function () {\n      if (defaultTheme.endsWith(':only')) {\n        return;\n      }\n      document.documentElement.classList.toggle('dark');\n      localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';\n    });\n\n    attachEvent('[data-aw-social-share]', 'click', function (_, elem) {\n      const network = elem.getAttribute('data-aw-social-share');\n      const url = encodeURIComponent(elem.getAttribute('data-aw-url'));\n      const text = encodeURIComponent(elem.getAttribute('data-aw-text'));\n\n      let href;\n      switch (network) {\n        case 'facebook':\n          href = `https://www.facebook.com/sharer.php?u=${url}`;\n          break;\n        case 'twitter':\n          href = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;\n          break;\n        case 'linkedin':\n          href = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`;\n          break;\n        case 'whatsapp':\n          href = `https://wa.me/?text=${text}%20${url}`;\n          break;\n        case 'mail':\n          href = `mailto:?subject=%22${text}%22&body=${text}%20${url}`;\n          break;\n\n        default:\n          return;\n      }\n\n      const newlink = document.createElement('a');\n      newlink.target = '_blank';\n      newlink.href = href;\n      newlink.click();\n    });\n\n    function appyHeaderStylesOnScroll() {\n      const header = document.getElementById('header');\n      if (lastKnownScrollPosition > 60 && !header.classList.contains('scroll')) {\n        document.getElementById('header').classList.add('scroll');\n      } else if (lastKnownScrollPosition <= 60 && header.classList.contains('scroll')) {\n        document.getElementById('header').classList.remove('scroll');\n      }\n      ticking = false;\n    }\n    appyHeaderStylesOnScroll();\n\n    attachEvent([document], 'scroll', function () {\n      lastKnownScrollPosition = window.scrollY;\n\n      if (!ticking) {\n        window.requestAnimationFrame(() => {\n          appyHeaderStylesOnScroll();\n        });\n        ticking = true;\n      }\n    });\n  };\n\n  window.onpageshow = function () {\n    document.documentElement.classList.add('motion-safe:scroll-smooth');\n    const elem = document.querySelector('[data-aw-toggle-menu]');\n    if (elem) {\n      elem.classList.remove('expanded');\n    }\n    document.body.classList.remove('overflow-hidden');\n    document.getElementById('header')?.classList.remove('h-screen');\n    document.querySelector('#header nav')?.classList.add('hidden');\n  };\n})();<\/script>"], ["<script>(function(){", "\n  function applyTheme(theme) {\n    if (theme === 'dark') {\n      document.documentElement.classList.add('dark');\n    } else {\n      document.documentElement.classList.remove('dark');\n    }\n  }\n\n  if ((defaultTheme && defaultTheme.endsWith(':only')) || (!localStorage.theme && defaultTheme !== 'system')) {\n    applyTheme(defaultTheme.replace(':only', ''));\n  } else if (\n    localStorage.theme === 'dark' ||\n    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)\n  ) {\n    applyTheme('dark');\n  } else {\n    applyTheme('light');\n  }\n\n  function attachEvent(selector, event, fn) {\n    const matches = typeof selector === 'string' ? document.querySelectorAll(selector) : selector;\n    if (matches && matches.length) {\n      matches.forEach((elem) => {\n        elem.addEventListener(event, (e) => fn(e, elem), false);\n      });\n    }\n  }\n\n  window.onload = function () {\n    let lastKnownScrollPosition = window.scrollY;\n    let ticking = true;\n\n    attachEvent('#header nav', 'click', function () {\n      document.querySelector('[data-aw-toggle-menu]')?.classList.remove('expanded');\n      document.body.classList.remove('overflow-hidden');\n      document.getElementById('header')?.classList.remove('h-screen');\n      document.querySelector('#header nav')?.classList.add('hidden');\n    });\n\n    attachEvent('[data-aw-toggle-menu]', 'click', function (_, elem) {\n      elem.classList.toggle('expanded');\n      document.body.classList.toggle('overflow-hidden');\n      document.getElementById('header')?.classList.toggle('h-screen');\n      document.querySelector('#header nav')?.classList.toggle('hidden');\n    });\n\n    attachEvent('[data-aw-toggle-color-scheme]', 'click', function () {\n      if (defaultTheme.endsWith(':only')) {\n        return;\n      }\n      document.documentElement.classList.toggle('dark');\n      localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';\n    });\n\n    attachEvent('[data-aw-social-share]', 'click', function (_, elem) {\n      const network = elem.getAttribute('data-aw-social-share');\n      const url = encodeURIComponent(elem.getAttribute('data-aw-url'));\n      const text = encodeURIComponent(elem.getAttribute('data-aw-text'));\n\n      let href;\n      switch (network) {\n        case 'facebook':\n          href = \\`https://www.facebook.com/sharer.php?u=\\${url}\\`;\n          break;\n        case 'twitter':\n          href = \\`https://twitter.com/intent/tweet?url=\\${url}&text=\\${text}\\`;\n          break;\n        case 'linkedin':\n          href = \\`https://www.linkedin.com/shareArticle?mini=true&url=\\${url}&title=\\${text}\\`;\n          break;\n        case 'whatsapp':\n          href = \\`https://wa.me/?text=\\${text}%20\\${url}\\`;\n          break;\n        case 'mail':\n          href = \\`mailto:?subject=%22\\${text}%22&body=\\${text}%20\\${url}\\`;\n          break;\n\n        default:\n          return;\n      }\n\n      const newlink = document.createElement('a');\n      newlink.target = '_blank';\n      newlink.href = href;\n      newlink.click();\n    });\n\n    function appyHeaderStylesOnScroll() {\n      const header = document.getElementById('header');\n      if (lastKnownScrollPosition > 60 && !header.classList.contains('scroll')) {\n        document.getElementById('header').classList.add('scroll');\n      } else if (lastKnownScrollPosition <= 60 && header.classList.contains('scroll')) {\n        document.getElementById('header').classList.remove('scroll');\n      }\n      ticking = false;\n    }\n    appyHeaderStylesOnScroll();\n\n    attachEvent([document], 'scroll', function () {\n      lastKnownScrollPosition = window.scrollY;\n\n      if (!ticking) {\n        window.requestAnimationFrame(() => {\n          appyHeaderStylesOnScroll();\n        });\n        ticking = true;\n      }\n    });\n  };\n\n  window.onpageshow = function () {\n    document.documentElement.classList.add('motion-safe:scroll-smooth');\n    const elem = document.querySelector('[data-aw-toggle-menu]');\n    if (elem) {\n      elem.classList.remove('expanded');\n    }\n    document.body.classList.remove('overflow-hidden');\n    document.getElementById('header')?.classList.remove('h-screen');\n    document.querySelector('#header nav')?.classList.add('hidden');\n  };\n})();<\/script>"])), defineScriptVars({ defaultTheme: SITE.defaultTheme }));
}, "/Users/codeztree/Github/RabbitHoleWebsite/src/components/common/BasicScripts.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro("https://rabbitholecompany.com");
const $$BaseLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { meta = {} } = Astro2.props;
  const { language = "en", textDirection = "ltr" } = SITE;
  return renderTemplate(_a || (_a = __template(["<html", "", ' class="2xl:text-[20px]">\n  <head>\n    ', '\n    <script src="https://www.google.com/recaptcha/api.js"><\/script>\n  ', '</head>\n\n  <body class="antialiased text-page bg-light dark:text-slate-300 tracking-tight dark:bg-dark">\n    ', "\n    ", "\n    \n  </body>\n</html>"])), addAttribute(language, "lang"), addAttribute(textDirection, "dir"), renderComponent($$result, "MetaTags", $$MetaTags, { ...meta }), renderHead(), renderSlot($$result, $$slots["default"]), renderComponent($$result, "BasicScripts", $$BasicScripts, {}));
}, "/Users/codeztree/Github/RabbitHoleWebsite/src/layouts/BaseLayout.astro", void 0);

const $$Astro = createAstro("https://rabbitholecompany.com");
const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  const title = `Error 404`;
  return renderTemplate`${renderComponent($$result, "Layout", $$BaseLayout, { "meta": { title } }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead()}<section class="flex items-center h-full p-16">
    <div class="container flex flex-col items-center justify-center px-5 mx-auto my-8">
      <div class="max-w-md text-center">
        <h2 class="mb-8 font-bold text-9xl">
          <span class="sr-only">Error</span>
          <span class="text-primary">404</span>
        </h2>
        <p class="text-3xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
        <p class="mt-4 mb-8 text-lg text-muted dark:text-slate-400">
          But dont worry, you can find plenty of other things on our homepage.
        </p>
        <a rel="noopener noreferrer"${addAttribute(getHomePermalink(), "href")} class="btn ml-4">Back to homepage</a>
      </div>
    </div>
  </section>
` })}`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/src/pages/404.astro", void 0);

const $$file = "/Users/codeztree/Github/RabbitHoleWebsite/src/pages/404.astro";
const $$url = "/404";

const _404 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$BaseLayout as $, BaseSSRService as B, CATEGORY_BASE as C, POST_PERMALINK_PATTERN as P, SITE as S, TAG_BASE as T, _default as _, getAsset as a, getPermalink as b, getBlogPermalink as c, getImage as d, getPicture as e, isRemoteImage as f, getHomePermalink as g, cleanSlug as h, isOutputFormatSupportsAlpha as i, BLOG as j, getFormattedDate as k, BLOG_BASE as l, getCanonical as m, _404 as n, trimSlash as t };
