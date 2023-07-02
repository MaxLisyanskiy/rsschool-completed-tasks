export const levels = [
  {
    title: "<span>Select the dogs</span> 🐶",
    sidebarTitle: "Type Selector",
    sidebarSubtitle: "Select elements by their type",
    sidebarSyntax: "A",
    sidebarDescr:
      "Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.",
    sidebarExamples: [
      "<strong>div</strong> selects all <tag>div</tag> elements.",
      "<strong>p</strong> selects all <tag>p</tag> elements.",
    ],
    code: `
      <dog class="emoji bounce outline"></dog>
      <dog class="emoji bounce"></dog>
    `,
  },
  {
    title: "<span>Select the lion</span> 🦁",
    sidebarTitle: "Type Selector",
    sidebarSubtitle: "Select elements by their type",
    sidebarSyntax: "A",
    sidebarDescr:
      "Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.",
    sidebarExamples: [
      "<strong>div</strong> selects all <tag>div</tag> elements.",
      "<strong>p</strong> selects all <tag>p</tag> elements.",
    ],
    code: `
      <dog class="emoji"></dog>
      <lion class="emoji bounce outline"></lion>
      <pig class="emoji"></pig>
    `,
  },
];
