import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML, b as renderComponent, e as addAttribute, F as Fragment } from '../astro.836cabea.mjs';
import { b as getPermalink, S as SITE } from './404.astro.ce65b8c2.mjs';
import { c as $$Picture, $ as $$Icon, b as $$PageLayout } from './companyintro.astro.9d43c3c1.mjs';

const $$Astro$1 = createAstro("https://rabbitholecompany.com");
const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Hero;
  const {
    title = await Astro2.slots.render("title"),
    subtitle = await Astro2.slots.render("subtitle"),
    content = await Astro2.slots.render("content"),
    callToAction = await Astro2.slots.render("callToAction"),
    callToAction2 = await Astro2.slots.render("callToAction2"),
    callToAction3 = await Astro2.slots.render("callToAction3"),
    image = await Astro2.slots.render("image")
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="relative md:-mt-[76px] not-prose">
  <div class="absolute inset-0 pointer-events-none" aria-hidden="true"></div>
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6">
    <div class="pt-0 md:pt-[76px] pointer-events-none"></div>
    <div class="py-12 md:py-20">
      <div class="text-center pb-10 md:pb-16 max-w-screen-lg mx-auto">
        ${title && renderTemplate`<h1 class="text-5xl md:text-6xl font-bold leading-tighter tracking-tighter mb-4 font-heading dark:text-gray-200">${unescapeHTML(title)}</h1>`}
        <div class="max-w-3xl mx-auto">
          ${subtitle && renderTemplate`<p class="text-xl text-muted mb-6 dark:text-slate-300">${unescapeHTML(subtitle)}</p>`}
          <!-- <div
            class="max-w-xs sm:max-w-md m-5 flex flex-nowrap flex-col sm:flex-row sm:justify-end gap-4"
          > -->
          <div class="flex flex-col flex-nowrap gap-4 m-auto max-w-xs sm:flex-row sm:justify-center sm:max-w-xl">
            ${callToAction && renderTemplate`<div class="flex sm:basis-1/3">
                  ${typeof callToAction === "string" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(callToAction)}` })}` : renderTemplate`<a class="btn w-full "${addAttribute(callToAction?.href, "href")} rel="noopener">
                      ${callToAction?.icon && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`
                          ${renderComponent($$result2, "Icon", $$Icon, { "name": callToAction.icon, "class": "w-5 h-5 mr-1 -ml-1.5" })}
                          &nbsp;
                        ` })}`}
                      ${callToAction?.text}
                    </a>`}
                </div>`}
            ${callToAction2 && renderTemplate`<div class="flex sm:basis-1/3">
                  ${typeof callToAction2 === "string" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(callToAction2)}` })}` : renderTemplate`<a class="btn w-full text-white transition-all duration-500 bg-gradient-to-br from-blue-400 via-purple-500 to-purple-800 bg-size-200 hover:bg-right-bottom border-purple-800"${addAttribute(callToAction2?.href, "href")}>
                      ${callToAction2?.icon && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`
                          ${renderComponent($$result2, "Icon", $$Icon, { "name": callToAction2.icon, "class": "w-5 h-5 mr-1 -ml-1.5" })}
                          &nbsp;
                        ` })}`}
                      ${callToAction2.text}
                    </a>`}
                </div>`}
            ${callToAction3 && renderTemplate`<div class="flex sm:basis-1/3">
                  ${typeof callToAction3 === "string" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(callToAction3)}` })}` : renderTemplate`<a class="btn w-full"${addAttribute(callToAction3?.href, "href")}>
                      ${callToAction3?.icon && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`
                          ${renderComponent($$result2, "Icon", $$Icon, { "name": callToAction3.icon, "class": "w-5 h-5 mr-1 -ml-1.5" })}
                          &nbsp;
                        ` })}`}
                      ${callToAction3.text}
                    </a>`}
                </div>`}
          </div>
        </div>
        ${content && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(content)}` })}`}
      </div>
      <div>
        ${image && renderTemplate`<div class="relative m-auto max-w-5xl">
              ${typeof image === "string" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(image)}` })}` : renderTemplate`${renderComponent($$result, "Picture", $$Picture, { "class": "mx-auto rounded-md max-w-xs", "widths": [100, 300, 500], "loading": "eager", "width": 300, ...image })}`}
            </div>`}
      </div>
    </div>
  </div>
</section>`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/src/components/widgets/Hero.astro", void 0);

const $$Astro = createAstro("https://rabbitholecompany.com");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const meta = {
    title: SITE.title,
    description: SITE.description,
    dontUseTitleTemplate: true
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "meta": meta }, { "default": ($$result2) => renderTemplate`
  

  ${renderComponent($$result2, "Hero", $$Hero, { "callToAction": {
    text: "\u{1F430} \uD68C\uC0AC \uC18C\uAC1C",
    href: getPermalink("landing/companyintro")
  }, "callToAction2": { text: "\u{1F381} \uC81C\uD488 \uC18C\uAC1C", href: "#features" }, "callToAction3": { text: "\u{1F4A1} Q & A", href: "#questionanswer" } }, { "subtitle": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "subtitle" }, { "default": ($$result4) => renderTemplate`
      ${maybeRenderHead()}<span class="hidden sm:inline">
        상호작용이 없는 주입식 교육을
        <span class="font-semibold">죽어있는</span>
        교육이라고 생각합니다. 이러한 교육에서 탈피해,
        <span class="font-semibold">VR</span>과
        <span class="font-semibold">AI</span>를 활용하여 학생
        <span class="font-semibold">스스로</span> 인터렉션을 통해서 배우는
        <span class="font-semibold">살아있는</span>
        교육을 제공하고자 합니다.
        <!-- <span class="block mb-1 sm:hidden font-bold text-blue-600"
        >깡총 영어 & 깡총 수학 : 준비 완료
      </span> -->
        <!-- <span class="hidden sm:inline"><br /></span>학교, 학원, 가정에서
      아이들에게 '진짜' 교육의 기회이자 최고의 선물. -->
      </span>
    ` })}`, "title": ($$result3) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "slot": "title" }, { "default": ($$result4) => renderTemplate`
      죽어있는 교육을 <span class="lg:hidden"><br></span>
      <span class="text-accent highlight">살아있는 교육</span>으로.<br>
      
    ` })}` })}

  

  

  

  

  

  

  

  

  

  

  
  

  

  

  

  

  

  

  

  
` })}`;
}, "/Users/codeztree/Github/RabbitHoleWebsite/src/pages/index.astro", void 0);

const $$file = "/Users/codeztree/Github/RabbitHoleWebsite/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Hero as $, index as i };
