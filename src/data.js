import { getPermalink, getBlogPermalink, getAsset } from "./utils/permalinks";

export const headerData = {
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
      href: "https://github.com/onwidget/astrowind",
    },
  ],
};

export const footerData = {
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
