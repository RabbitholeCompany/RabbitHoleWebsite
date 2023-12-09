import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML, e as addAttribute, b as renderComponent, F as Fragment } from '../astro.836cabea.mjs';
import { c as $$Picture, a as $$Header, h as headerData, b as $$PageLayout } from './companyintro.astro.9d43c3c1.mjs';
import 'cookie';
import 'kleur/colors';
import '@astrojs/internal-helpers/path';
import 'path-to-regexp';
import 'mime';
import 'string-width';
import 'html-escaper';
import './404.astro.ce65b8c2.mjs';
import 'node:fs/promises';
import 'node:path';
import 'node:url';
import 'http-cache-semantics';
import 'node:os';
import 'image-size';
import 'magic-string';
import 'node:stream';
/* empty css                             */import 'limax';
import 'path';
import 'url';
import 'svgo';

const $$Astro$1 = createAstro("https://rabbitholecompany.com");
const $$Teamlist = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Teamlist;
  const {
    title = await Astro2.slots.render("title"),
    subtitle = await Astro2.slots.render("subtitle"),
    highlight,
    items = []
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="relative not-prose mb-14">
  <div class="absolute inset-0 bg-purple-50 dark:bg-slate-800 pointer-events-none mb-32" aria-hidden="true">
  </div>
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 -mb-12">
    <div class="py-4 pt-8 sm:py-6 lg:py-8 lg:pt-12">
      ${(title || subtitle || highlight) && renderTemplate`<div class="mb-8 md:mx-auto text-center max-w-3xl">
            ${highlight && renderTemplate`<p class="text-base text-primary dark:text-blue-200 font-semibold tracking-wide uppercase">${unescapeHTML(highlight)}</p>`}
            ${title && renderTemplate`<h2 class="text-4xl md:text-5xl font-bold leading-tighter tracking-tighter mb-4 font-heading">${unescapeHTML(title)}</h2>`}

            ${subtitle && renderTemplate`<p class="max-w-3xl mx-auto sm:text-center text-xl text-muted dark:text-slate-400">${unescapeHTML(subtitle)}</p>`}
          </div>`}
      <div${addAttribute(`grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-14 dark:text-white items-stretch`, "class")}>
        ${items.map(({ name, position, image }) => renderTemplate`<div class="relative flex flex-col p-6 bg-white rounded shadow-lg hover:shadow-xl transition border border-transparent dark:border-slate-800 rounded-2xl">
              <div class="flex items-center">
                ${image && renderTemplate`<div class="relative m-auto max-w-sm mt-4">
                    ${typeof image == "string" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(image)}` })}` : renderTemplate`${renderComponent($$result, "Picture", $$Picture, { "class": "mx-auto rounded-2xl w-min", "widths": [120, 200, 280, 360], "sizes": "220px", "aspectRatio": 1, "loading": "eager", "width": 360, "height": 360, ...image })}`}
                  </div>`}
              </div>
              <div class="text-xl font-bold text-center mt-6">${name}</div>
              ${position && renderTemplate`<p class="text-muted dark:text-gray-400 text-md text-center">${unescapeHTML(position)}</p>`}
            </div>`)}
      </div>
    </div>
  </div>
</section>`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/src/components/widgets/Teamlist.astro", void 0);

const $$Astro = createAstro("https://rabbitholecompany.com");
const $$Teaminfo = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Teaminfo;
  const meta = {
    title: "\uD300\uC6D0 \uC18C\uAC1C"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "meta": meta }, { "Header": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "Header" }, { "default": ($$result3) => renderTemplate`
    ${renderComponent($$result3, "Header", $$Header, { ...headerData, "isSticky": true })}
  ` })}`, "default": ($$result2) => renderTemplate`
  

  ${renderComponent($$result2, "Teamlist", $$Teamlist, { "title": "\uD300 \uC18C\uAC1C", "subtitle": "\uB798\uBE57\uD640 \uCEF4\uD37C\uB2C8 \uB098\uB77C\uC758 \u{1F430}\uB4E4\uC744 \uC18C\uAC1C\uD569\uB2C8\uB2E4.", "items": [
    {
      name: "\uBC15\uC7AC\uBBFC",
      position: "Chairman",
      image: {
        src: import('../pjm_crop.9e28eae1.mjs'),
        alt: "PJM image"
      }
    },
    {
      name: "\uBB38\uCC3D\uC900",
      position: "PM / App Product",
      image: {
        src: import('../mcj_crop.dea3210e.mjs'),
        alt: "MCJ image"
      }
    },
    {
      name: "\uC2E0\uCC44\uC6D0",
      position: "UI/UX Design",
      image: {
        src: import('../scw_crop.45f503fe.mjs'),
        alt: "SCW image"
      }
    },
    {
      name: "\uC5EC\uB2E4\uACB8",
      position: "VR Product / Server",
      image: {
        src: import('../ydg_crop.485d8cb5.mjs'),
        alt: "YDG image"
      }
    },
    {
      name: "\uC774\uC7AC\uD6C8",
      position: "AI",
      image: {
        src: import('../ljh_crop.75903c24.mjs'),
        alt: "LJH image"
      }
    },
    {
      name: "\uC774\uCC3D\uC11D",
      position: "Law / Finance",
      image: {
        src: import('../lcs_crop.0845b0d9.mjs'),
        alt: "LCS image"
      }
    },
    {
      name: "\uCD5C\uC18C\uC815",
      position: "Product Design / Marketing",
      image: {
        src: import('../csj_crop.ed891d51.mjs'),
        alt: "CSJ image"
      }
    },
    {
      name: "\uD669\uC724\uC815",
      position: "Art Design / Modeling",
      image: {
        src: import('../hyj_crop.9451d1bd.mjs'),
        alt: "HYJ image"
      }
    }
  ] })}
` })}`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/src/pages/landing/details/teaminfo.astro", void 0);

const $$file = "/Users/codeztree/Github/RabbitHoleWebsite/src/pages/landing/details/teaminfo.astro";
const $$url = "/landing/details/teaminfo";

export { $$Teaminfo as default, $$file as file, $$url as url };
