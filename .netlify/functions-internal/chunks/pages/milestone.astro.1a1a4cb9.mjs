import { c as createAstro, a as createComponent, r as renderTemplate, b as renderComponent, m as maybeRenderHead, F as Fragment } from '../astro.836cabea.mjs';
import { d as $$Image, a as $$Header, h as headerData, b as $$PageLayout } from './companyintro.astro.9d43c3c1.mjs';

const mileImage = {"src":"/_astro/milestone.922df728.png","width":1560,"height":879,"format":"png"};

const milestone$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: mileImage
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro("https://rabbitholecompany.com");
const $$Milestone = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Milestone;
  const meta = {
    title: "\uB9C8\uC77C\uC2A4\uD1A4"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "meta": meta }, { "default": ($$result2) => renderTemplate`
  

  ${maybeRenderHead()}<div class="flex items-center justify-center">
    ${renderComponent($$result2, "Image", $$Image, { "src": mileImage, "alt": "milestone image" })}
  </div>
`, "header": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "header" }, { "default": ($$result3) => renderTemplate`
    ${renderComponent($$result3, "Header", $$Header, { ...headerData, "isSticky": true })}
  ` })}` })}`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/src/pages/landing/details/milestone.astro", void 0);

const $$file = "/Users/codeztree/Github/RabbitHoleWebsite/src/pages/landing/details/milestone.astro";
const $$url = "/landing/details/milestone";

const milestone = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Milestone,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { milestone as a, milestone$1 as m };
