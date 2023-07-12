import { getPermalink, getBlogPermalink, getAsset } from "./utils/permalinks";

export const headerData = {
  links: [
    {
      text: "래빗 홀",
      links: [
        {
          text: "회사 소개",
          href: getPermalink("/landing/saas"),
        },
        {
          text: "회사 연혁",
          href: getPermalink("/landing/startup"),
        },
        {
          text: "대표 소개",
          href: getPermalink("/landing/mobile-app"),
        },
      ],
    },
    {
      text: "제품 소개",
      links: [
        {
          text: "깡총 영어 (V 1.0)",
          href: getPermalink("/#features"),
        },
        {
          text: "깡총 수학 (Beta)",
          href: "#",
        },
        {
          text: "깡총 학습 시리즈",
          href: "#",
        },
        {
          text: "문의",
          href: "#",
        },
        {
          text: "이용약관",
          href: getPermalink("/terms"),
        },
        {
          text: "개인정보 정책",
          href: getPermalink("/privacy"),
        },
      ],
    },
    {
      text: "가격 정책",
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
      text: "Free Trial 다운로드",
      href: "https://github.com/onwidget/astrowind",
    },
  ],
};

export const footerData = {
  links: [
    {
      title: "Product",
      links: [
        { text: "Features", href: "#" },
        { text: "Security", href: "#" },
        { text: "Team", href: "#" },
        { text: "Enterprise", href: "#" },
        { text: "Customer stories", href: "#" },
        { text: "Pricing", href: "#" },
        { text: "Resources", href: "#" },
      ],
    },
    {
      title: "Platform",
      links: [
        { text: "Developer API", href: "#" },
        { text: "Partners", href: "#" },
        { text: "Atom", href: "#" },
        { text: "Electron", href: "#" },
        { text: "AstroWind Desktop", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { text: "Docs", href: "#" },
        { text: "Community Forum", href: "#" },
        { text: "Professional Services", href: "#" },
        { text: "Skills", href: "#" },
        { text: "Status", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About", href: "#" },
        { text: "Blog", href: "#" },
        { text: "Careers", href: "#" },
        { text: "Press", href: "#" },
        { text: "Inclusion", href: "#" },
        { text: "Social Impact", href: "#" },
        { text: "Shop", href: "#" },
      ],
    },
  ],
  secondaryLinks: [
    { text: "Terms", href: getPermalink("/terms") },
    { text: "Privacy Policy", href: getPermalink("/privacy") },
  ],
  socialLinks: [
    { ariaLabel: "Twitter", icon: "tabler:brand-twitter", href: "#" },
    { ariaLabel: "Instagram", icon: "tabler:brand-instagram", href: "#" },
    { ariaLabel: "Facebook", icon: "tabler:brand-facebook", href: "#" },
    { ariaLabel: "RSS", icon: "tabler:rss", href: getAsset("/rss.xml") },
    {
      ariaLabel: "Github",
      icon: "tabler:brand-github",
      href: "https://github.com/onwidget/astrowind",
    },
  ],
  footNote: `
    <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 float-left rounded-sm bg-[url(https://onwidget.com/favicon/favicon-32x32.png)]"></span>
    Made by <a class="text-blue-600 hover:underline dark:text-gray-200" href="https://onwidget.com/"> onWidget</a> · All rights reserved.
  `,
};
