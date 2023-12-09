import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML, b as renderComponent, e as addAttribute, F as Fragment } from '../astro.836cabea.mjs';
import { $ as $$Icon, a as $$Header, h as headerData, b as $$PageLayout } from './companyintro.astro.9d43c3c1.mjs';
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
const $$InvestList = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$InvestList;
  const {
    title = await Astro2.slots.render("title"),
    subtitle = await Astro2.slots.render("subtitle"),
    highlight,
    callToAction = await Astro2.slots.render("callToAction"),
    items = []
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 overflow-hidden not-prose">
    <div class="py-12 md:py-20">
      <div class="py-4 sm:py-6 lg:py-8">
        <div class="flex flex-wrap md:-mx-8">
          <div class="w-full lg:w-1/3 px-0 sm:px-8 mb-12">
            <div>
              ${highlight && renderTemplate`<p class="text-base text-primary dark:text-blue-200 font-semibold tracking-wide uppercase">${unescapeHTML(highlight)}</p>`}
              ${title && renderTemplate`<h2 class="mb-4 text-3xl lg:text-4xl font-bold font-heading">${unescapeHTML(title)}</h2>`}
              ${subtitle && renderTemplate`<p class="mb-8 text-xl text-muted dark:text-slate-400">${unescapeHTML(subtitle)}</p>`}

              <div class="w-full">
                ${typeof callToAction === "string" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(callToAction)}` })}` : callToAction && callToAction.text && callToAction.href && renderTemplate`<a class="btn btn-primary mb-4 sm:mb-0"${addAttribute(callToAction.href, "href")} target="_blank" rel="noopener">
                        ${callToAction.icon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": callToAction.icon, "class": "w-5 h-5 mr-1 -ml-1.5" })}`}
                        ${callToAction.text}
                      </a>`}
              </div>
            </div>
          </div>
          <div class="w-full lg:w-2/3 px-0 sm:px-8 bg-purple-50 p-10">
            <ul class="space-y-10">
              ${items && items.length ? items.map(({ title: title2, description, icon }, index) => renderTemplate`<li class="flex md:-mx-4">
                        <div class="pr-4 sm:pl-4">
                          <span class="flex w-16 h-16 mx-auto items-center justify-center text-2xl font-bold rounded-full bg-blue-100 text-primary">
                            ${icon ? renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": icon, "class": "w-6 h-6 icon-bold" })}` : index + 1}
                          </span>
                        </div>
                        <div class="pl-4">
                          <h3 class="mb-4 text-xl font-semibold font-heading">${unescapeHTML(title2)}</h3>
                          <p class="text-muted dark:text-gray-400">${unescapeHTML(description)}</p>
                        </div>
                      </li>`) : ""}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/src/components/widgets/InvestList.astro", void 0);

const $$Astro = createAstro("https://rabbitholecompany.com");
const $$Investmentattr = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Investmentattr;
  const meta = {
    title: "\uD22C\uC790 \uC720\uCE58"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "meta": meta }, { "default": ($$result2) => renderTemplate`
  

  ${renderComponent($$result2, "InvestList", $$InvestList, { "title": "\uD22C\uC790 \uC720\uCE58 \uD604\uD669", "subtitle": "\uB798\uBE57\uD640 \uCEF4\uD37C\uB2C8\uC758 \uC18C\uC911\uD55C \uC778\uC5F0\uB4E4\uC785\uB2C8\uB2E4.", "items": [
    {
      title: "\uB9CE\uC740 \uD22C\uC790 \uBC14\uB78D\uB2C8\uB2E4.",
      description: "\uD22C\uC790 \uB300\uAE30 \uC911"
    }
  ] })}
`, "header": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "header" }, { "default": ($$result3) => renderTemplate`
    ${renderComponent($$result3, "Header", $$Header, { ...headerData, "isSticky": true })}
  ` })}` })}`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/src/pages/landing/details/investmentattr.astro", void 0);

const $$file = "/Users/codeztree/Github/RabbitHoleWebsite/src/pages/landing/details/investmentattr.astro";
const $$url = "/landing/details/investmentattr";

export { $$Investmentattr as default, $$file as file, $$url as url };
