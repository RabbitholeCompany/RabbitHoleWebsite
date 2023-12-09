import { c as createAstro, a as createComponent, r as renderTemplate, b as renderComponent, F as Fragment, m as maybeRenderHead } from '../astro.836cabea.mjs';
import { a as $$Header, h as headerData, b as $$PageLayout } from './companyintro.astro.9d43c3c1.mjs';
import { $ as $$Hero } from './index.astro.e4f5a7e6.mjs';
import { $ as $$CallToAction } from './mobile-app.astro.0008079d.mjs';
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

const $$Astro = createAstro("https://rabbitholecompany.com");
const $$Startup = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Startup;
  const meta = {
    title: "Startup Landing Page"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "meta": meta }, { "default": ($$result2) => renderTemplate`
  

  

  ${renderComponent($$result2, "Hero", $$Hero, { "callToAction": { text: "Get template", href: "https://github.com/onwidget/astrowind", icon: "tabler:download" }, "callToAction2": { text: "Learn more", href: "#features" } }, { "image": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "image" }, { "default": ($$result4) => renderTemplate`
      ${maybeRenderHead()}<iframe width="560" height="315" src="https://www.youtube.com/embed/dsTXcSeAZq8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="width:100%"></iframe>
    ` })}`, "subtitle": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "subtitle" }, { "default": ($$result4) => renderTemplate`
      <span class="hidden sm:inline">
        <span class="font-semibold">AstroWind</span> is a free, customizable and production-ready template for Astro 2.0 +
        Tailwind CSS.</span>
      <span class="block mb-1 sm:hidden font-bold text-blue-600">AstroWind: Production-ready.</span> Suitable for Startups,
      Small Business, Sass Websites, Professional Portfolios, Marketing Websites, Landing Pages & Blogs.
    ` })}`, "title": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "title" }, { "default": ($$result4) => renderTemplate`
      Free template for <span class="hidden lg:inline">create your website <br>with</span>
      <span class="text-accent dark:text-white highlight"> Astro 2.0</span> + Tailwind CSS
    ` })}` })}

  

  ${renderComponent($$result2, "CallToAction", $$CallToAction, { "callToAction": {
    text: "Get template",
    href: "https://github.com/onwidget/astrowind",
    icon: "tabler:download"
  } }, { "subtitle": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "subtitle" }, { "default": ($$result4) => renderTemplate`
      Be very surprised by these huge fake numbers you are seeing on this page. <br class="hidden md:inline">Don't
      waste more time! :P
    ` })}`, "title": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "title" }, { "default": ($$result4) => renderTemplate`
      Astro + <br class="block sm:hidden"><span class="sm:whitespace-nowrap"> Tailwind CSS</span>
    ` })}` })}
`, "header": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "header" }, { "default": ($$result3) => renderTemplate`
    ${renderComponent($$result3, "Header", $$Header, { ...headerData, "showRssFeed": true, "showToggleTheme": true, "position": "left" })}
  ` })}` })}`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/src/pages/landing/startup.astro", void 0);

const $$file = "/Users/codeztree/Github/RabbitHoleWebsite/src/pages/landing/startup.astro";
const $$url = "/landing/startup";

export { $$Startup as default, $$file as file, $$url as url };
