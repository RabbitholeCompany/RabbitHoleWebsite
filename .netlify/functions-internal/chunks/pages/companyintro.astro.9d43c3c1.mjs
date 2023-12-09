import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, s as spreadAttributes, e as addAttribute, u as unescapeHTML, b as renderComponent, F as Fragment, f as renderSlot } from '../astro.836cabea.mjs';
import { S as SITE, g as getHomePermalink, a as getAsset, b as getPermalink, c as getBlogPermalink, $ as $$BaseLayout, d as getImage, e as getPicture } from './404.astro.ce65b8c2.mjs';
import { optimize } from 'svgo';
import 'http-cache-semantics';
import 'kleur/colors';
import 'node:fs/promises';
import 'node:os';
import 'node:path';
import 'node:url';
import 'magic-string';
import 'mime';
import 'node:stream';
import 'image-size';

const SPRITESHEET_NAMESPACE = `astroicon`;

const baseURL = "https://api.astroicon.dev/v1/";
const requests = /* @__PURE__ */ new Map();
const fetchCache = /* @__PURE__ */ new Map();
async function get(pack, name) {
  const url = new URL(`./${pack}/${name}`, baseURL).toString();
  if (requests.has(url)) {
    return await requests.get(url);
  }
  if (fetchCache.has(url)) {
    return fetchCache.get(url);
  }
  let request = async () => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(await res.text());
    }
    const contentType = res.headers.get("Content-Type");
    if (!contentType.includes("svg")) {
      throw new Error(`[astro-icon] Unable to load "${name}" because it did not resolve to an SVG!

Recieved the following "Content-Type":
${contentType}`);
    }
    const svg = await res.text();
    fetchCache.set(url, svg);
    requests.delete(url);
    return svg;
  };
  let promise = request();
  requests.set(url, promise);
  return await promise;
}

const splitAttrsTokenizer = /([a-z0-9_\:\-]*)\s*?=\s*?(['"]?)(.*?)\2\s+/gim;
const domParserTokenizer = /(?:<(\/?)([a-zA-Z][a-zA-Z0-9\:]*)(?:\s([^>]*?))?((?:\s*\/)?)>|(<\!\-\-)([\s\S]*?)(\-\->)|(<\!\[CDATA\[)([\s\S]*?)(\]\]>))/gm;
const splitAttrs = (str) => {
  let res = {};
  let token;
  if (str) {
    splitAttrsTokenizer.lastIndex = 0;
    str = " " + (str || "") + " ";
    while (token = splitAttrsTokenizer.exec(str)) {
      res[token[1]] = token[3];
    }
  }
  return res;
};
function optimizeSvg(contents, name, options) {
  return optimize(contents, {
    plugins: [
      "removeDoctype",
      "removeXMLProcInst",
      "removeComments",
      "removeMetadata",
      "removeXMLNS",
      "removeEditorsNSData",
      "cleanupAttrs",
      "minifyStyles",
      "convertStyleToAttrs",
      {
        name: "cleanupIDs",
        params: { prefix: `${SPRITESHEET_NAMESPACE}:${name}` }
      },
      "removeRasterImages",
      "removeUselessDefs",
      "cleanupNumericValues",
      "cleanupListOfValues",
      "convertColors",
      "removeUnknownsAndDefaults",
      "removeNonInheritableGroupAttrs",
      "removeUselessStrokeAndFill",
      "removeViewBox",
      "cleanupEnableBackground",
      "removeHiddenElems",
      "removeEmptyText",
      "convertShapeToPath",
      "moveElemsAttrsToGroup",
      "moveGroupAttrsToElems",
      "collapseGroups",
      "convertPathData",
      "convertTransform",
      "removeEmptyAttrs",
      "removeEmptyContainers",
      "mergePaths",
      "removeUnusedNS",
      "sortAttrs",
      "removeTitle",
      "removeDesc",
      "removeDimensions",
      "removeStyleElement",
      "removeScriptElement"
    ]
  }).data;
}
const preprocessCache = /* @__PURE__ */ new Map();
function preprocess(contents, name, { optimize }) {
  if (preprocessCache.has(contents)) {
    return preprocessCache.get(contents);
  }
  if (optimize) {
    contents = optimizeSvg(contents, name);
  }
  domParserTokenizer.lastIndex = 0;
  let result = contents;
  let token;
  if (contents) {
    while (token = domParserTokenizer.exec(contents)) {
      const tag = token[2];
      if (tag === "svg") {
        const attrs = splitAttrs(token[3]);
        result = contents.slice(domParserTokenizer.lastIndex).replace(/<\/svg>/gim, "").trim();
        const value = { innerHTML: result, defaultProps: attrs };
        preprocessCache.set(contents, value);
        return value;
      }
    }
  }
}
function normalizeProps(inputProps) {
  const size = inputProps.size;
  delete inputProps.size;
  const w = inputProps.width ?? size;
  const h = inputProps.height ?? size;
  const width = w ? toAttributeSize(w) : void 0;
  const height = h ? toAttributeSize(h) : void 0;
  return { ...inputProps, width, height };
}
const toAttributeSize = (size) => String(size).replace(/(?<=[0-9])x$/, "em");
async function load(name, inputProps, optimize) {
  const key = name;
  if (!name) {
    throw new Error("<Icon> requires a name!");
  }
  let svg = "";
  let filepath = "";
  if (name.includes(":")) {
    const [pack, ..._name] = name.split(":");
    name = _name.join(":");
    filepath = `/src/icons/${pack}`;
    let get$1;
    try {
      const files = /* #__PURE__ */ Object.assign({

});
      const keys = Object.fromEntries(
        Object.keys(files).map((key2) => [key2.replace(/\.[cm]?[jt]s$/, ""), key2])
      );
      if (!(filepath in keys)) {
        throw new Error(`Could not find the file "${filepath}"`);
      }
      const mod = files[keys[filepath]];
      if (typeof mod.default !== "function") {
        throw new Error(
          `[astro-icon] "${filepath}" did not export a default function!`
        );
      }
      get$1 = mod.default;
    } catch (e) {
    }
    if (typeof get$1 === "undefined") {
      get$1 = get.bind(null, pack);
    }
    const contents = await get$1(name, inputProps);
    if (!contents) {
      throw new Error(
        `<Icon pack="${pack}" name="${name}" /> did not return an icon!`
      );
    }
    if (!/<svg/gim.test(contents)) {
      throw new Error(
        `Unable to process "<Icon pack="${pack}" name="${name}" />" because an SVG string was not returned!

Recieved the following content:
${contents}`
      );
    }
    svg = contents;
  } else {
    filepath = `/src/icons/${name}.svg`;
    try {
      const files = /* #__PURE__ */ Object.assign({});
      if (!(filepath in files)) {
        throw new Error(`Could not find the file "${filepath}"`);
      }
      const contents = files[filepath];
      if (!/<svg/gim.test(contents)) {
        throw new Error(
          `Unable to process "${filepath}" because it is not an SVG!

Recieved the following content:
${contents}`
        );
      }
      svg = contents;
    } catch (e) {
      throw new Error(
        `[astro-icon] Unable to load "${filepath}". Does the file exist?`
      );
    }
  }
  const { innerHTML, defaultProps } = preprocess(svg, key, { optimize });
  if (!innerHTML.trim()) {
    throw new Error(`Unable to parse "${filepath}"!`);
  }
  return {
    innerHTML,
    props: { ...defaultProps, ...normalizeProps(inputProps) }
  };
}

const $$Astro$g = createAstro("https://rabbitholecompany.com");
const $$Icon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$Icon;
  let { name, pack, title, optimize = true, class: className, ...inputProps } = Astro2.props;
  let props = {};
  if (pack) {
    name = `${pack}:${name}`;
  }
  let innerHTML = "";
  try {
    const svg = await load(name, { ...inputProps, class: className }, optimize);
    innerHTML = svg.innerHTML;
    props = svg.props;
  } catch (e) {
    {
      throw new Error(`[astro-icon] Unable to load icon "${name}"!
${e}`);
    }
  }
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(props)}${addAttribute(name, "astro-icon")}>${unescapeHTML((title ? `<title>${title}</title>` : "") + innerHTML)}</svg>`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/node_modules/astro-icon/lib/Icon.astro", void 0);

const sprites = /* @__PURE__ */ new WeakMap();
function trackSprite(request, name) {
  let currentSet = sprites.get(request);
  if (!currentSet) {
    currentSet = /* @__PURE__ */ new Set([name]);
  } else {
    currentSet.add(name);
  }
  sprites.set(request, currentSet);
}
const warned = /* @__PURE__ */ new Set();
async function getUsedSprites(request) {
  const currentSet = sprites.get(request);
  if (currentSet) {
    return Array.from(currentSet);
  }
  if (!warned.has(request)) {
    const { pathname } = new URL(request.url);
    console.log(`[astro-icon] No sprites found while rendering "${pathname}"`);
    warned.add(request);
  }
  return [];
}

const $$Astro$f = createAstro("https://rabbitholecompany.com");
const $$Spritesheet = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$Spritesheet;
  const { optimize = true, style, ...props } = Astro2.props;
  const names = await getUsedSprites(Astro2.request);
  const icons = await Promise.all(names.map((name) => {
    return load(name, {}, optimize).then((res) => ({ ...res, name })).catch((e) => {
      {
        throw new Error(`[astro-icon] Unable to load icon "${name}"!
${e}`);
      }
    });
  }));
  return renderTemplate`${maybeRenderHead()}<svg${addAttribute(`position: absolute; width: 0; height: 0; overflow: hidden; ${style ?? ""}`.trim(), "style")}${spreadAttributes({ "aria-hidden": true, ...props })} astro-icon-spritesheet>
    ${icons.map((icon) => renderTemplate`<symbol${spreadAttributes(icon.props)}${addAttribute(`${SPRITESHEET_NAMESPACE}:${icon.name}`, "id")}>${unescapeHTML(icon.innerHTML)}</symbol>`)}
</svg>`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/node_modules/astro-icon/lib/Spritesheet.astro", void 0);

const $$Astro$e = createAstro("https://rabbitholecompany.com");
const $$SpriteProvider = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$SpriteProvider;
  const content = await Astro2.slots.render("default");
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(content)}` })}
${renderComponent($$result, "Spritesheet", $$Spritesheet, {})}`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/node_modules/astro-icon/lib/SpriteProvider.astro", void 0);

const $$Astro$d = createAstro("https://rabbitholecompany.com");
const $$Sprite = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$Sprite;
  let { name, pack, title, class: className, x, y, ...inputProps } = Astro2.props;
  const props = normalizeProps(inputProps);
  if (pack) {
    name = `${pack}:${name}`;
  }
  const href = `#${SPRITESHEET_NAMESPACE}:${name}`;
  trackSprite(Astro2.request, name);
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(props)}${addAttribute(className, "class")}${addAttribute(name, "astro-icon")}>
    ${title ? renderTemplate`<title>${title}</title>` : ""}
    <use${spreadAttributes({ "xlink:href": href, width: props.width, height: props.height, x, y })}></use>
</svg>`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/node_modules/astro-icon/lib/Sprite.astro", void 0);

Object.assign($$Sprite, { Provider: $$SpriteProvider });

const $$Astro$c = createAstro("https://rabbitholecompany.com");
const $$Logo = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$Logo;
  return renderTemplate`${maybeRenderHead()}<span class="self-center ml-2 text-2xl md:text-xl font-bold text-gray-900 whitespace-nowrap dark:text-white">
  🐰 RabbitHole</span>`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/src/components/Logo.astro", void 0);

const $$Astro$b = createAstro("https://rabbitholecompany.com");
const $$ToggleTheme = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$ToggleTheme;
  const {
    label = "Toggle between Dark and Light mode",
    class: className = "text-muted dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 inline-flex items-center",
    iconClass = "w-6 h-6",
    iconName = "tabler:sun"
  } = Astro2.props;
  return renderTemplate`${!(SITE?.defaultTheme && SITE.defaultTheme.endsWith(":only")) && renderTemplate`${maybeRenderHead()}<button type="button"${addAttribute(className, "class")}${addAttribute(label, "aria-label")} data-aw-toggle-color-scheme>
      ${renderComponent($$result, "Icon", $$Icon, { "name": iconName, "class": iconClass })}
    </button>`}`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/src/components/common/ToggleTheme.astro", void 0);

const $$Astro$a = createAstro("https://rabbitholecompany.com");
const $$ToggleMenu = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$ToggleMenu;
  const {
    label = "Toggle Menu",
    class: className = "ml-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 inline-flex items-center transition",
    iconClass = "w-6 h-6",
    iconName = "tabler:menu"
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<button type="button"${addAttribute(className, "class")}${addAttribute(label, "aria-label")} data-aw-toggle-menu>
  ${renderComponent($$result, "Icon", $$Icon, { "name": iconName, "class": iconClass, "optimize": false })}
</button>`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/src/components/common/ToggleMenu.astro", void 0);

const $$Astro$9 = createAstro("https://rabbitholecompany.com");
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Header;
  const {
    links = [],
    actions = [],
    isSticky = false,
    showToggleTheme = false,
    showRssFeed = false,
    position = "center"
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<header${addAttribute([
    { sticky: isSticky, relative: !isSticky },
    "top-0 z-40 flex-none mx-auto w-full transition-all ease-in duration-100 not-prose"
  ], "class:list")} id="header">
  <div class="py-3 px-3 md:py-3.5 md:px-4 mx-auto w-full md:flex md:justify-between max-w-7xl">
    <div${addAttribute([{ "mr-auto": position === "right" }, "flex justify-between"], "class:list")}>
      <a class="flex items-center"${addAttribute(getHomePermalink(), "href")}>
        ${renderComponent($$result, "Logo", $$Logo, {})}
      </a>
      <div class="flex items-center md:hidden">
        ${showToggleTheme && renderTemplate`${renderComponent($$result, "ToggleTheme", $$ToggleTheme, {})}`}
        ${renderComponent($$result, "ToggleMenu", $$ToggleMenu, {})}
      </div>
    </div>
    <nav class="items-center w-full md:w-auto hidden md:flex dark:text-slate-200 h-[calc(100vh-72px)] md:h-auto overflow-y-auto md:overflow-visible md:mx-5" aria-label="Main navigation">
      <ul class="flex flex-col pt-8 md:pt-0 md:flex-row md:self-center w-full md:w-auto text-xl md:text-base">
        ${links.map(({ text, href, links: links2 }) => renderTemplate`<li${addAttribute(links2?.length ? "dropdown" : "", "class")}>
              ${links2?.length ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`
                  <button class="font-medium hover:text-gray-900 dark:hover:text-white px-4 py-3 flex items-center transition duration-150 ease-in-out">
                    ${text} ${renderComponent($$result2, "Icon", $$Icon, { "name": "tabler:chevron-down", "class": "w-3.5 h-3.5 ml-0.5 hidden md:inline" })}
                  </button>
                  <ul class="dropdown-menu md:backdrop-blur-md dark:md:bg-dark rounded md:absolute pl-4 md:pl-0 md:hidden font-medium md:bg-white/90 md:min-w-[200px] drop-shadow-xl">
                    ${links2.map(({ text: text2, href: href2 }) => renderTemplate`<li>
                        <a class="first:rounded-t last:rounded-b md:hover:bg-gray-200 dark:hover:bg-gray-700 py-2 px-5 block whitespace-no-wrap"${addAttribute(href2, "href")}>
                          ${text2}
                        </a>
                      </li>`)}
                  </ul>
                ` })}` : renderTemplate`<a class="font-medium hover:text-gray-900 dark:hover:text-white px-4 py-3 flex items-center transition duration-150 ease-in-out"${addAttribute(href, "href")}>
                  ${text}
                </a>`}
            </li>`)}
      </ul>
    </nav>
    <div${addAttribute([{ "ml-auto": position === "left" }, "md:self-center flex items-center md:mb-0"], "class:list")}>
      <div class="hidden items-center md:flex">
        ${showToggleTheme && renderTemplate`${renderComponent($$result, "ToggleTheme", $$ToggleTheme, { "iconClass": "w-5 h-5" })}`}

        ${showRssFeed && renderTemplate`<a class="text-muted dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 inline-flex items-center" aria-label="RSS Feed"${addAttribute(getAsset("/rss.xml"), "href")}>
              ${renderComponent($$result, "Icon", $$Icon, { "name": "tabler:rss", "class": "w-5 h-5" })}
            </a>`}
        ${actions?.length ? renderTemplate`<span class="ml-4">
              ${actions.map(({ text, href, type }) => renderTemplate`<a${addAttribute([
    "btn ml-2 py-2.5 px-5.5 md:px-6 font-semibold shadow-none text-sm",
    { "btn-ghost": type === "ghost", "btn-primary": type === "primary" }
  ], "class:list")}${addAttribute(href, "href")}>
                  ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(text)}` })}
                </a>`)}
            </span>` : ""}
      </div>
    </div>
  </div>
</header>`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/src/components/widgets/Header.astro", void 0);

const $$Astro$8 = createAstro("https://rabbitholecompany.com");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Footer;
  const { socialLinks = [], secondaryLinks = [], links = [], footNote = "", theme = "light" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<footer${addAttribute([{ dark: theme === "dark" }, "relative border-t border-gray-200 dark:border-slate-800 not-prose"], "class:list")}>
  <div class="dark:bg-dark absolute inset-0 pointer-events-none" aria-hidden="true"></div>
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 dark:text-slate-300">
    <div class="grid grid-cols-12 gap-4 gap-y-8 sm:gap-8 py-8 md:py-12">
      <div class="col-span-12 lg:col-span-4">
        <div class="mb-2">
          <a class="inline-block font-bold text-xl"${addAttribute(getHomePermalink(), "href")}>${SITE?.name}</a>
        </div>
        <div class="text-sm text-muted">
          ${secondaryLinks.map(({ text, href }) => renderTemplate`<a class="text-muted hover:text-gray-700 dark:text-gray-400 hover:underline transition duration-150 ease-in-out mr-2"${addAttribute(href, "href")}>${unescapeHTML(text)}</a>`)}
        </div>
      </div>
      ${links.map(({ title, links: links2 }) => renderTemplate`<div class="col-span-6 md:col-span-3 lg:col-span-2">
            <div class="dark:text-gray-300 font-medium mb-2">${title}</div>
            ${links2 && Array.isArray(links2) && links2.length > 0 && renderTemplate`<ul class="text-sm">
                ${links2.map(({ text, href, ariaLabel }) => renderTemplate`<li class="mb-2">
                    <a class="text-muted hover:text-gray-700 hover:underline dark:text-gray-400 transition duration-150 ease-in-out"${addAttribute(href, "href")}${addAttribute(ariaLabel, "aria-label")}>
                      ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(text)}` })}
                    </a>
                  </li>`)}
              </ul>`}
          </div>`)}
    </div>
    <div class="md:flex md:items-center md:justify-between py-6 md:py-8">
      ${socialLinks?.length ? renderTemplate`<ul class="flex mb-4 md:order-1 -ml-2 md:ml-4 md:mb-0">
            ${socialLinks.map(({ ariaLabel, href, text, icon }) => renderTemplate`<li>
                <a class="text-muted dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 inline-flex items-center"${addAttribute(ariaLabel, "aria-label")}${addAttribute(href, "href")}>
                  ${icon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": icon, "class": "w-5 h-5" })}`}
                  ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(text)}` })}
                </a>
              </li>`)}
          </ul>` : ""}

      <div class="text-sm mr-4 dark:text-slate-400">
        ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(footNote)}` })}
      </div>
    </div>
  </div>
</footer>`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/src/components/widgets/Footer.astro", void 0);

const $$Astro$7 = createAstro("https://rabbitholecompany.com");
const $$Announcement = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Announcement;
  return renderTemplate`${maybeRenderHead()}<div class="hidden md:block bg-purple-700 dark:bg-slate-800 dark:border-slate-800 dark:text-slate-400 border-b border-purple-900 text-sm px-3 py-2 text-gray-200 overflow-hidden whitespace-nowrap text-ellipsis not-prose">
  <span class="text-xs py-0.5 px-1 bg-primary dark:bg-slate-700 dark:text-slate-300 font-semibold">NOTICE</span>
  <a href="#" class="hover:underline text-gray-200 dark:text-slate-400">
    사이트 작업 중 입니다.</a>
  <!-- <a
    target="_blank"
    rel="noopener"
    class="float-right"
    title="If you like AstroWind, give us a star."
    href="https://github.com/onwidget/astrowind"
  >
    <img
      src="https://img.shields.io/github/stars/onwidget/astrowind.svg?style=social&label=Stars&maxAge=86400"
      alt="Follow @onWidget"
      width="84"
      height="20"
    />
  </a> -->
</div>`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/src/components/widgets/Announcement.astro", void 0);

const headerData = {
  links: [
    {
      text: "래빗홀",
      links: [
        {
          text: "회사 소개",
          href: getPermalink("/landing/companyintro"),
        },
        {
          text: "팀 소개",
          href: getPermalink("/landing/details/teaminfo"),
        },
        {
          text: "투자 유치",
          href: getPermalink("/landing/details/investmentattr"),
        },
        {
          text: "컨텍",
          href: getPermalink("/landing/details/contact"),
        },
        {
          text: "마일스톤",
          href: getPermalink("/landing/details/milestone"),
        },
      ],
    },
    {
      text: "제품",
      links: [
        {
          text: "B2B 제품",
          href: getPermalink("/#features"),
        },
        {
          text: "B2C 제품",
          href: "#",
        },
      ],
    },
    {
      text: "Q & A",
      href: "#",
    },
    {
      text: "블로그",
      href: getBlogPermalink(),
    },
  ],
  actions: [
    {
      type: "button",
      text: "무료 체험 신청",
      href: "/landing/details/contact",
    },
  ],
};

const footerData = {
  links: [
    {
      title: "래빗홀",
      links: [
        { text: "회사 소개", href: getPermalink("/landing/companyintro") },
        { text: "팀 소개", href: "/landing/details/teaminfo" },
        { text: "투자 유치", href: "/landing/details/investmentattr" },
        { text: "컨텍", href: "/landing/details/contact" },
        { text: "마일스톤", href: "/landing/details/milestone" },
      ],
    },
    {
      title: "B2B",
      links: [
        { text: "깡총 영어", href: "#" },
        { text: "깡총 수학", href: "#" },
        { text: "당근 낚싯대", href: "#" },
      ],
    },
    {
      title: "B2C",
      links: [
        { text: "깡총 영어", href: "#" },
        { text: "깡총 수학", href: "#" },
      ],
    },
    {
      title: "Q & A",
      links: [
        { text: "문의하기", href: "#" },
        { text: "자주 묻는 질문", href: "#" },
      ],
    },
  ],
  secondaryLinks: [
    { text: "약관", href: getPermalink("/terms") },
    { text: "개인정보 정책", href: getPermalink("/privacy") },
  ],
  socialLinks: [
    { ariaLabel: "Twitter", icon: "tabler:brand-twitter", href: "#" },
    { ariaLabel: "Instagram", icon: "tabler:brand-instagram", href: "#" },
    { ariaLabel: "Facebook", icon: "tabler:brand-facebook", href: "#" },
    { ariaLabel: "RSS", icon: "tabler:rss", href: getAsset("/rss.xml") },
    {
      ariaLabel: "Github",
      icon: "tabler:brand-github",
      href: "https://github.com/codeztree",
    },
  ],
  footNote: `
    <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 float-left rounded-sm bg-[url(https://onwidget.com/favicon/favicon-32x32.png)]"></span>
    Template by <a class="text-blue-600 hover:underline dark:text-gray-200" href="https://onwidget.com/"> onWidget</a> · All rights reserved.
  `,
};

const $$Astro$6 = createAstro("https://rabbitholecompany.com");
const $$PageLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$PageLayout;
  const { meta } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$BaseLayout, { "meta": meta }, { "default": ($$result2) => renderTemplate`
  ${renderSlot($$result2, $$slots["announcement"], renderTemplate`
    ${renderComponent($$result2, "Announcement", $$Announcement, {})}
  `)}
  ${renderSlot($$result2, $$slots["header"], renderTemplate`
    ${renderComponent($$result2, "Header", $$Header, { ...headerData, "isSticky": true, "showRssFeed": true, "showToggleTheme": true })}
  `)}
  ${maybeRenderHead()}<main>
    ${renderSlot($$result2, $$slots["default"])}
  </main>
  ${renderSlot($$result2, $$slots["footer"], renderTemplate`
    ${renderComponent($$result2, "Footer", $$Footer, { ...footerData })}
  `)}
` })}`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/src/layouts/PageLayout.astro", void 0);

const $$Astro$5 = createAstro("https://rabbitholecompany.com");
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Image;
  const { loading = "lazy", decoding = "async", ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    warnForMissingAlt();
  }
  const attrs = await getImage(props);
  return renderTemplate`${maybeRenderHead()}<img${spreadAttributes(attrs)}${addAttribute(loading, "loading")}${addAttribute(decoding, "decoding")}>`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/node_modules/@astrojs/image/components/Image.astro", void 0);

const $$Astro$4 = createAstro("https://rabbitholecompany.com");
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Picture;
  const {
    src,
    alt,
    sizes,
    widths,
    aspectRatio,
    fit,
    background,
    position,
    formats = ["avif", "webp"],
    loading = "lazy",
    decoding = "async",
    ...attrs
  } = Astro2.props;
  if (alt === void 0 || alt === null) {
    warnForMissingAlt();
  }
  const { image, sources } = await getPicture({
    src,
    widths,
    formats,
    aspectRatio,
    fit,
    background,
    position,
    alt
  });
  delete image.width;
  delete image.height;
  return renderTemplate`${maybeRenderHead()}<picture>
	${sources.map((attrs2) => renderTemplate`<source${spreadAttributes(attrs2)}${addAttribute(sizes, "sizes")}>`)}
	<img${spreadAttributes(image)}${addAttribute(loading, "loading")}${addAttribute(decoding, "decoding")}${spreadAttributes(attrs)}>
</picture>`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/node_modules/@astrojs/image/components/Picture.astro", void 0);

let altWarningShown = false;
function warnForMissingAlt() {
  if (altWarningShown === true) {
    return;
  }
  altWarningShown = true;
  console.warn(`
[@astrojs/image] "alt" text was not provided for an <Image> or <Picture> component.

A future release of @astrojs/image may throw a build error when "alt" text is missing.

The "alt" attribute holds a text description of the image, which isn't mandatory but is incredibly useful for accessibility. Set to an empty string (alt="") if the image is not a key part of the content (it's decoration or a tracking pixel).
`);
}

const $$Astro$3 = createAstro("https://rabbitholecompany.com");
const $$Hero2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Hero2;
  const {
    title = await Astro2.slots.render("title"),
    subtitle = await Astro2.slots.render("subtitle"),
    content = await Astro2.slots.render("content"),
    callToAction = await Astro2.slots.render("callToAction"),
    callToAction2 = await Astro2.slots.render("callToAction2"),
    image = await Astro2.slots.render("image")
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="relative md:-mt-[76px] not-prose">
  <div class="absolute inset-0 pointer-events-none" aria-hidden="true"></div>
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6">
    <div class="pt-0 md:pt-[76px] pointer-events-none"></div>
    <div class="py-12 md:py-20 lg:py-0 lg:flex lg:items-center lg:h-screen lg:gap-8">
      <div class="basis-8/12 text-center lg:text-left pb-10 md:pb-16 mx-auto">
        ${title && renderTemplate`<h1 class="text-5xl md:text-6xl font-bold leading-tighter tracking-tighter mb-4 font-heading dark:text-gray-200">${unescapeHTML(title)}</h1>`}
        <div class="max-w-3xl mx-auto lg:max-w-none">
          ${subtitle && renderTemplate`<p class="text-xl text-muted mb-6 dark:text-slate-300">${unescapeHTML(subtitle)}</p>`}
          ${callToAction && renderTemplate`<div class="flex w-full sm:w-1/4 mt-16">
                ${typeof callToAction === "string" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(callToAction)}` })}` : renderTemplate`<a class="btn btn-primary sm:mb-0 w-full"${addAttribute(callToAction?.href, "href")} target="_blank" rel="noopener">
                    ${callToAction?.icon && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`
                        ${renderComponent($$result2, "Icon", $$Icon, { "name": callToAction.icon, "class": "w-5 h-5 mr-1 -ml-1.5" })}${" "}` })}`}
                    ${callToAction?.text}
                  </a>`}
              </div>`}
          <!-- <div
            class="max-w-xs sm:max-w-md m-auto flex flex-nowrap flex-col sm:flex-row sm:justify-center gap-4 lg:justify-start lg:m-0 lg:max-w-7xl">
            {
              callToAction && (
                <div class="flex w-full sm:w-auto">
                  {typeof callToAction === "string" ? (
                    <Fragment set:html={callToAction} />
                  ) : (
                    <a
                      class="btn btn-primary sm:mb-0 w-full"
                      href={callToAction?.href}
                      target="_blank"
                      rel="noopener">
                      {callToAction?.icon && (
                        <>
                          <Icon
                            name={callToAction.icon}
                            class="w-5 h-5 mr-1 -ml-1.5"
                          />{" "}
                        </>
                      )}
                      {callToAction?.text}
                    </a>
                  )}
                </div>
              )
            }
            {
              callToAction2 && (
                <div class="flex w-full sm:w-auto">
                  {typeof callToAction2 === "string" ? (
                    <Fragment set:html={callToAction2} />
                  ) : (
                    <a class="btn w-full" href={callToAction2?.href}>
                      {callToAction2?.icon && (
                        <>
                          <Icon
                            name={callToAction2.icon}
                            class="w-5 h-5 mr-1 -ml-1.5"
                          />{" "}
                        </>
                      )}
                      {callToAction2.text}
                    </a>
                  )}
                </div>
              )
            }
          </div> -->
        </div>
        ${content && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(content)}` })}`}
      </div>
      <div class="basis-1/3">
        <!-- 나중에 1/2 사이즈 가져와서 수정하기.. or lg 미만 크기에서 사진 중앙정렬 옵션 넣기 -->
        ${image && renderTemplate`<div class="relative m-auto mr-32 max-w-sm">
              ${typeof image === "string" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(image)}` })}` : renderTemplate`${renderComponent($$result, "Picture", $$Picture, { "class": "mx-auto rounded-md w-min", "widths": [400, 768, 1024, 2040], "sizes": "(max-width: 767px) 400px, (max-width: 1023px) 768px, (max-width: 2039px) 1024px, 2040px", "aspectRatio": 382 / 780, "loading": "eager", "width": 382, "height": 780, ...image })}`}
            </div>`}
      </div>
    </div>
  </div>
</section>`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/src/components/widgets/Hero2.astro", void 0);

const $$Astro$2 = createAstro("https://rabbitholecompany.com");
const $$Content = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Content;
  const {
    title = await Astro2.slots.render("title"),
    subtitle = await Astro2.slots.render("subtitle"),
    highlight,
    content = await Astro2.slots.render("content"),
    items = [],
    image = await Astro2.slots.render("image"),
    isReversed = false,
    isAfterContent = false
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute([
    { "pt-0 md:pt-0": isAfterContent },
    "bg-purple-50 dark:bg-slate-800 py-16 md:py-20 not-prose"
  ], "class:list")}>
  <div class="max-w-xl sm:mx-auto lg:max-w-2xl">
    ${(title || subtitle || highlight) && renderTemplate`<div class="mb-10 md:mx-auto text-center md:mb-12 max-w-3xl">
          ${highlight && renderTemplate`<p class="text-base text-primary dark:text-blue-200 font-semibold tracking-wide uppercase">${unescapeHTML(highlight)}</p>`}
          ${title && renderTemplate`<h2 class="text-4xl md:text-5xl font-bold leading-tighter tracking-tighter mb-4 font-heading">${unescapeHTML(title)}</h2>`}

          ${subtitle && renderTemplate`<p class="max-w-3xl mx-auto sm:text-center text-xl text-muted dark:text-slate-400">${unescapeHTML(subtitle)}</p>`}
        </div>`}
  </div>
  <div class="mx-auto max-w-7xl p-4 md:px-8">
    <div${addAttribute(`md:flex ${isReversed ? "md:flex-row-reverse" : ""} md:gap-16`, "class")}>
      <div class="md:basis-1/2 self-center">
        ${content && renderTemplate`<div class="mb-12 text-lg dark:text-slate-400">${unescapeHTML(content)}</div>`}

        ${items && renderTemplate`<div class="space-y-8">
              ${items.map(({ title: title2, description, icon }) => renderTemplate`<div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-gray-50">
                      ${renderComponent($$result, "Icon", $$Icon, { "name": icon ? icon : "tabler:check", "class": "w-5 h-5" })}
                    </div>
                  </div>
                  <div class="ml-4">
                    ${title2 && renderTemplate`<h3 class="text-lg font-medium leading-6 dark:text-white">
                        ${title2}
                      </h3>`}
                    ${description && renderTemplate`<p class="mt-2 text-muted dark:text-slate-400">${unescapeHTML(description)}</p>`}
                  </div>
                </div>`)}
            </div>`}
      </div>
      <div aria-hidden="true" class="mt-10 md:mt-0 md:basis-1/2">
        ${image && renderTemplate`<div class="relative m-auto max-w-4xl">
              ${typeof image === "string" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(image)}` })}` : renderTemplate`${renderComponent($$result, "Picture", $$Picture, { "class": "mx-auto w-full rounded-lg bg-gray-500 shadow-lg", "width": 500, "height": 500, "widths": [400, 768], "sizes": "(max-width: 768px) 100vw, 432px", "aspectRatio": "500:500", ...image })}`}
            </div>`}
      </div>
    </div>
  </div>
</section>`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/src/components/widgets/Content.astro", void 0);

const $$Astro$1 = createAstro("https://rabbitholecompany.com");
const $$ComIntroCallToAction = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ComIntroCallToAction;
  const {
    title = await Astro2.slots.render("title"),
    subtitle = await Astro2.slots.render("subtitle"),
    callToAction = await Astro2.slots.render("callToAction"),
    callToAction2 = await Astro2.slots.render("callToAction"),
    callToAction3 = await Astro2.slots.render("callToAction"),
    callToAction4 = await Astro2.slots.render("callToAction")
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="relative not-prose">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="py-12 md:py-20">
      <div class="max-w-3xl mx-auto text-center p-6 rounded-md shadow-xl dark:shadow-none dark:border dark:border-slate-600">
        ${title && renderTemplate`<h2 class="text-4xl md:text-4xl font-bold leading-tighter tracking-tighter mb-4 font-heading">${unescapeHTML(title)}</h2>`}
        ${subtitle && renderTemplate`<p class="text-xl text-muted dark:text-slate-400">${unescapeHTML(subtitle)}</p>`}
        <div class="flex mx-auto flex-row flex-wrap">
          ${typeof callToAction === "string" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(callToAction)}` })}` : callToAction && callToAction.text && callToAction.href && renderTemplate`<div class="mt-6 w-2/5 mx-auto">
                  <a class="btn btn-primary w-full"${addAttribute(callToAction.href, "href")} rel="noopener">
                    ${callToAction.icon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": callToAction.icon, "class": "w-5 h-5 mr-1 -ml-1.5" })}`}
                    ${callToAction.text}
                  </a>
                </div>`}
          ${typeof callToAction2 === "string" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(callToAction2)}` })}` : callToAction2 && callToAction2.text && callToAction2.href && renderTemplate`<div class="mt-6 w-2/5 mx-auto">
                  <a class="btn btn-primary w-full"${addAttribute(callToAction2.href, "href")} rel="noopener">
                    ${callToAction2.icon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": callToAction2.icon, "class": "w-5 h-5 mr-1 -ml-1.5" })}`}
                    ${callToAction2.text}
                  </a>
                </div>`}
          ${typeof callToAction3 === "string" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(callToAction3)}` })}` : callToAction3 && callToAction3.text && callToAction3.href && renderTemplate`<div class="mt-6 w-2/5 mx-auto">
                  <a class="btn btn-primary w-full"${addAttribute(callToAction3.href, "href")} rel="noopener">
                    ${callToAction3.icon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": callToAction3.icon, "class": "w-5 h-5 mr-1 -ml-1.5" })}`}
                    ${callToAction3.text}
                  </a>
                </div>`}
          ${typeof callToAction4 === "string" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(callToAction4)}` })}` : callToAction4 && callToAction4.text && callToAction4.href && renderTemplate`<div class="mt-6 w-2/5 mx-auto">
                  <a class="btn btn-primary w-full"${addAttribute(callToAction4.href, "href")} rel="noopener">
                    ${callToAction4.icon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": callToAction4.icon, "class": "w-5 h-5 mr-1 -ml-1.5" })}`}
                    ${callToAction4.text}
                  </a>
                </div>`}
        </div>
      </div>
    </div>
  </div>
</section>`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/src/components/widgets/ComIntroCallToAction.astro", void 0);

const $$Astro = createAstro("https://rabbitholecompany.com");
const $$Companyintro = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Companyintro;
  const meta = {
    title: "\uD68C\uC0AC \uC18C\uAC1C"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "meta": meta }, { "default": ($$result2) => renderTemplate`
  

  

  

  ${renderComponent($$result2, "Hero2", $$Hero2, { "image": {
    src: import('../rabbit.15a04b7d.mjs'),
    alt: "AstroWind Hero Image"
  } }, { "subtitle": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "subtitle" }, { "default": ($$result4) => renderTemplate`
      ${maybeRenderHead()}<span class="inline">
        래빗홀 컴퍼니는 <span class="font-semibold">VR</span>과
        <span class="font-semibold">생성형 AI</span>를 이용하여 모든 사람에게
        <span class="font-semibold">살아있는 교육 솔루션</span>을 제공합니다.
        <span class="hidden md:inline"><br></span>
        이상한 나라의 앨리스가 토끼굴을 통해 상상력만이 한계인 곳으로 모험을 떠난
        것처럼,
        <br>우리도 아이들에게
        <span class="font-semibold">상상력만이 한계인 모험</span>을
        선사해줍니다.
      </span>
    ` })}`, "title": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "title" }, { "default": ($$result4) => renderTemplate`
      모든 사람에게
      <span class="text-accent dark:text-white highlight">살아있는 교육</span>을
      <br>
      제공합니다.
    ` })}` })}

  

  ${renderComponent($$result2, "Content", $$Content, { "isReversed": true, "items": [
    {
      title: "\uC9C0\uC5ED\uACFC \uBE48\uBD80\uC5D0 \uD3B8\uD5A5\uC801\uC778 \uAD50\uC721\uC758 \uAC1C\uD601",
      description: "\uC9C0\uAE08\uC758 \uAD50\uC721\uC740 \uC9C0\uC5ED\uACFC \uBE48\uBD80\uC5D0 \uD3B8\uD5A5\uC801\uC785\uB2C8\uB2E4. \uB798\uBE57\uD640\uC740 \uAD50\uC721\uC758 \uBD88\uADE0\uD615\uC744 \uD601\uC2E0\uC801\uC73C\uB85C \uD574\uACB0\uD558\uACE0\uC790 \uD569\uB2C8\uB2E4. \uC6B0\uB9AC\uB294 \uBAA8\uB4E0 \uC0AC\uB78C\uB4E4\uC774 \uC800\uB834\uD55C \uAC00\uACA9\uC5D0 \uADE0\uC77C\uD55C \uAD50\uC721\uC744 \uC81C\uACF5\uBC1B\uC744 \uC218 \uC788\uAC8C \uD569\uB2C8\uB2E4."
    },
    {
      title: "VR\uC744 \uC774\uC6A9\uD55C \uC0B4\uC544\uC788\uB294 \uAD50\uC721",
      description: "\uAD50\uC721\uC774 \uAC16\uACE0 \uC788\uB294 \uB2E4\uB978 \uBB38\uC81C\uB294 \uB9E4\uCCB4\uC758 \uBB38\uC81C\uC785\uB2C8\uB2E4. \uC77C\uC0C1\uC0DD\uD65C\uC5D0\uC11C \uC0AC\uC6A9\uD558\uB294 \uB9E4\uCCB4\uB294 \uC785\uCCB4\uC801 \uC804\uC790\uAE30\uAE30\uC758 \uB4F1\uC7A5\uC73C\uB85C \uBC14\uB00C\uC5C8\uC9C0\uB9CC, \uAD50\uC721\uB9CC\uC740 \uC61B\uB0A0\uC758 \uD3C9\uBA74\uC801 \uB9E4\uCCB4\uC5D0 \uBA38\uBB3C\uB7EC\uC788\uC2B5\uB2C8\uB2E4. \uB798\uBE57\uD640\uC740 VR\uC774\uB77C\uB294 \uC0C8\uB85C\uC6B4 \uB9E4\uCCB4\uB85C \uC544\uC774\uB4E4\uC5D0\uAC8C \uC0B4\uC544\uC788\uB294 \uAD50\uC721\uC744 \uC81C\uACF5\uD558\uACE0\uC790 \uD569\uB2C8\uB2E4."
    }
  ], "image": {
    src: import('../virtual_study.b58d1ebe.mjs'),
    alt: "Colorful Image"
  } }, { "content": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "content" }, { "default": ($$result4) => renderTemplate`
      <h3 class="text-2xl font-bold tracking-tight dark:text-white sm:text-3xl mb-2">
        래빗홀 컴퍼니는 VR과 생성형 AI를 이용하여 <br>모든 사람에게 살아있는
        교육 솔루션을 제공합니다.
      </h3>
      <br>
      우리는 현 교육의 두 문제를 VR을 통해 획기적으로 해결하는 솔루션을 개발합니다.
    ` })}` })}

  
  

  
  

  
  

  

  ${renderComponent($$result2, "CallToAction", $$ComIntroCallToAction, { "callToAction": {
    text: "\u{1F4B5} \uD22C\uC790 \uC720\uCE58",
    href: "/landing/details/investmentattr"
  }, "callToAction2": {
    text: "\u{1F64B}\u200D\u2642\uFE0F \uD300\uC6D0 \uC18C\uAC1C",
    href: "/landing/details/teaminfo"
  }, "callToAction3": {
    text: "\u{1F4DE} \uCEE8\uD14D",
    href: "/landing/details/contact"
  }, "callToAction4": {
    text: "\u{1F4CA} \uB9C8\uC77C\uC2A4\uD1A4",
    href: "/landing/details/milestone"
  } }, { "subtitle": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "subtitle" }, { "default": ($$result4) => renderTemplate`
      언제든 자유롭게 우리들의 '업'을 구경하세요. <br>저희와 함께 이상한
      나라로의 여행을 원한다면 망설이지 마세요.
    ` })}`, "title": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "title" }, { "default": ($$result4) => renderTemplate`래빗홀의 여정이 궁금하시나요?` })}` })}
`, "header": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "header" }, { "default": ($$result3) => renderTemplate`
    ${renderComponent($$result3, "Header", $$Header, { ...headerData, "isSticky": true })}
  ` })}` })}`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/src/pages/landing/companyintro.astro", void 0);

const $$file = "/Users/codeztree/Github/RabbitHoleWebsite/src/pages/landing/companyintro.astro";
const $$url = "/landing/companyintro";

const companyintro = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Companyintro,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Icon as $, $$Header as a, $$PageLayout as b, $$Picture as c, $$Image as d, $$Hero2 as e, $$Logo as f, companyintro as g, headerData as h };
