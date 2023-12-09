import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML, b as renderComponent, e as addAttribute, F as Fragment } from '../astro.836cabea.mjs';
import { $ as $$Icon, e as $$Hero2, a as $$Header, b as $$PageLayout } from './companyintro.astro.9d43c3c1.mjs';

const $$Astro$1 = createAstro("https://rabbitholecompany.com");
const $$CallToAction = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$CallToAction;
  const {
    title = await Astro2.slots.render("title"),
    subtitle = await Astro2.slots.render("subtitle"),
    callToAction = await Astro2.slots.render("callToAction")
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="relative not-prose">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="py-12 md:py-20">
      <div class="max-w-3xl mx-auto text-center p-6 rounded-md shadow-xl dark:shadow-none dark:border dark:border-slate-600">
        ${title && renderTemplate`<h2 class="text-4xl md:text-4xl font-bold leading-tighter tracking-tighter mb-4 font-heading">${unescapeHTML(title)}</h2>`}
        ${subtitle && renderTemplate`<p class="text-xl text-muted dark:text-slate-400">${unescapeHTML(subtitle)}</p>`}
        ${typeof callToAction === "string" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(callToAction)}` })}` : callToAction && callToAction.text && callToAction.href && renderTemplate`<div class="mt-6 max-w-xs mx-auto">
                <a class="btn btn-primary w-full sm:w-auto"${addAttribute(callToAction.href, "href")} target="_blank" rel="noopener">
                  ${callToAction.icon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": callToAction.icon, "class": "w-5 h-5 mr-1 -ml-1.5" })}`}
                  ${callToAction.text}
                </a>
              </div>`}
      </div>
    </div>
  </div>
</section>`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/src/components/widgets/CallToAction.astro", void 0);

const $$Astro = createAstro("https://rabbitholecompany.com");
const $$MobileApp = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MobileApp;
  const meta = {
    title: "Mobile App Landing Page"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "meta": meta }, { "announcement": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "announcement" })}`, "default": ($$result2) => renderTemplate`
  
  

  

  ${renderComponent($$result2, "Hero2", $$Hero2, { "callToAction": { text: "Get template", href: "https://github.com/onwidget/astrowind", icon: "tabler:download" }, "callToAction2": { text: "Learn more", href: "#features" }, "image": { src: import('../hero.1625d002.mjs'), alt: "AstroWind Hero Image" } }, { "subtitle": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "subtitle" }, { "default": ($$result4) => renderTemplate`
      ${maybeRenderHead()}<span class="hidden sm:inline">
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
    ${renderComponent($$result3, "Header", $$Header, { "links": [], "actions": [
    {
      type: "ghost",
      text: "Login",
      href: "#"
    },
    {
      type: "primary",
      text: "Sign Up",
      href: "#"
    }
  ] })}
  ` })}` })}`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/src/pages/landing/mobile-app.astro", void 0);

const $$file = "/Users/codeztree/Github/RabbitHoleWebsite/src/pages/landing/mobile-app.astro";
const $$url = "/landing/mobile-app";

const mobileApp = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$MobileApp,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$CallToAction as $, mobileApp as m };
