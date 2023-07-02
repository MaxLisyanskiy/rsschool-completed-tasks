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
      <dog class="emoji bounce"></dog>
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
      <lion class="emoji bounce"></lion>
      <pig class="emoji"></pig>
    `,
  },
  {
    title: "<span>Select the rainy cloud</span> 🌧️",
    sidebarTitle: "ID Selector",
    sidebarSubtitle: "Select elements with an ID",
    sidebarSyntax: "#id",
    sidebarDescr:
      "Selects the element with a specific <strong>id</strong>. You can also combine the ID selector with the type selector.",
    sidebarExamples: [
      '<strong>#cool</strong> selects any element with <strong>id="cool"</strong>',
      '<strong>ul#long</strong> selects <tag>ul id="long"</tag>',
    ],
    code: `
      <cloud id="rainy" class="emoji bounce"></cloud>
      <cloud class="emoji"></cloud>
      <sun class="emoji"></sun>
    `,
  },
  {
    title: "<span>Select the donut on the plate</span> 🍩",
    sidebarTitle: "Descendant Selector",
    sidebarSubtitle: "Select an element inside another element",
    sidebarSyntax: "A&nbsp;&nbsp;B",
    sidebarDescr:
      "Selects all <strong>B</strong> inside of <strong>A</strong>. <strong>B</strong> is called a descendant because it is inside of another element.",
    sidebarExamples: [
      "<strong>p&nbsp;&nbsp;strong</strong> selects all <tag>strong</tag> elements that are inside of any <tag>p</tag>",
      '<strong>#fancy&nbsp;&nbsp;span</strong> selects any <tag>span</tag> elements that are inside of the element with <strong>id="fancy"</strong>',
    ],
    code: `
      <lollipop class="emoji"></lollipop>
      <plate class="emoji">
        <donut class="emoji bounce"></donut>
      </plate>
      <cookie class="emoji"></cookie>
    `,
  },
  {
    title: "<span>Select the rocket on the rainy cloud</span> 🚀",
    sidebarTitle: "",
    sidebarSubtitle: "Combine the Descendant & ID Selectors",
    sidebarSyntax: "#id&nbsp;&nbsp;A",
    sidebarDescr: "You can combine any selector with the descendent selector.",
    sidebarExamples: [
      '<strong>#cool&nbsp;span</strong> selects all <tag>span</tag> elements that are inside of elements with <strong>id="cool"</strong>',
    ],
    code: `
      <cloud class="emoji">
        <rocket class="emoji"></rocket>
      </cloud>
      <sun class="emoji">
        <rocket class="emoji"></rocket>
      </sun>
      <cloud id="rainy" class="emoji">
        <rocket class="emoji bounce"></rocket>
      </cloud>
    `,
  },
  {
    title: "<span>Select the small bombs</span> 💣",
    sidebarTitle: "Class Selector",
    sidebarSubtitle: "Select elements by their class",
    sidebarSyntax: ".classname",
    sidebarDescr:
      "The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.",
    sidebarExamples: ['<strong>.neato</strong> selects all elements with <strong>class="neato"</strong>'],
    code: `
      <bomb class="emoji"></bomb>
      <earth class="emoji">
        <bomb class="emoji small bounce"></bomb>
      </earth>
      <bomb class="emoji small bounce"></bomb>
    `,
  },
  {
    title: "<span>Select the small planes</span> ✈️",
    sidebarTitle: "",
    sidebarSubtitle: "Combine the Class Selector",
    sidebarSyntax: "A.className",
    sidebarDescr: "You can combine the class selector with other selectors, like the type selector.",
    sidebarExamples: [
      '<strong>ul.important</strong> selects all <tag>ul</tag> elements that have <strong>class="important"</strong>',
      '<strong>#big.wide</strong> selects all elements with <strong>id="big"</strong> that also have <strong>class="wide"</strong>',
    ],
    code: `
      <earth class="emoji">
        <plane class="emoji small bounce"></plane>
      </earth>
      <plane class="emoji"></plane>
      <cloud class="emoji">
        <plane class="emoji small bounce"></plane>
      </cloud>
    `,
  },
  {
    title: "<span>Select the small burgers in the plates</span> 🍔",
    sidebarTitle: "",
    sidebarSubtitle: "You can do it...",
    sidebarSyntax: "Put your back into it!",
    sidebarDescr: "Combine what you learned in the last few levels to solve this one!",
    sidebarExamples: [],
    code: `
      <plate class="emoji">
        <burger class="emoji small bounce"></burger>
      </plate>
      <plate class="emoji">
        <donut class="emoji small"></donut>
      </plate>
      <burger class="emoji small"></burger>
      <plate class="emoji">
        <burger class="emoji small bounce"></burger>
      </plate>
    `,
  },
  {
    title: "<span>Select all the monkeys and fishes</span> 🐵,🐟",
    sidebarTitle: "Comma Combinator",
    sidebarSubtitle: "Combine, selectors, with... commas!",
    sidebarSyntax: "A, B",
    sidebarDescr:
      "Thanks to Shatner technology, this selects all <strong>A</strong> and <strong>B</strong> elements. You can combine any selectors this way, and you can specify more than two.",
    sidebarExamples: [
      '<strong>p, .fun</strong> selects all <tag>p</tag> elements as well as all elements with <strong>class="fun"</strong>',
      "<strong>a, p, div</strong> selects all <tag>a</tag>, <tag>p</tag> and <tag>div</tag> elements",
    ],
    code: `
      <monkey class="emoji bounce"></monkey>
      <pig class="emoji"></pig>
      <plate class="emoji">
        <fish class="emoji small bounce"></fish>
      </plate>
      <fish class="emoji small bounce"></fish>
    `,
  },
  {
    title: "<span>Select all the things!</span>",
    sidebarTitle: "The Universal Selector",
    sidebarSubtitle: "You can select everything!",
    sidebarSyntax: "*",
    sidebarDescr: "You can select all elements with the universal selector!",
    sidebarExamples: ["<strong>p *</strong> selects any element inside all <tag>p</tag> elements."],
    code: `
      <rocket class="emoji bounce"></rocket>
      <earth class="emoji bounce">
        <bomb class="emoji small bounce"></bomb>
      </earth>
      <plane class="emoji small bounce"></plane>
      <dog class="emoji bounce"></dog>
    `,
  },
];
