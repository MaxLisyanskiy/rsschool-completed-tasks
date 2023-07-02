export interface StateLevels {
  title: string;
  sidebarTitle: string;
  sidebarSubtitle: string;
  sidebarSyntax: string;
  sidebarDescr: string;
  sidebarExamples: string[];
  code: string;
}

export enum SidebarActionType {
  PREV = "prev",
  NEXT = "next",
  LIST = "list",
}
