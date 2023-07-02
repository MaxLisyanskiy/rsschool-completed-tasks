export interface StateLevels {
  title: string;
  sidebarTitle: string;
  sidebarSubtitle: string;
  sidebarSyntax: string;
  sidebarDescr: string;
  sidebarExamples: string[];
  cssSelector: string;
  code: string;
}

export enum SidebarActionType {
  PREV = "prev",
  NEXT = "next",
  LIST = "list",
}

export enum GameLevelResult {
  TODO = "todo",
  DONE = "done",
  HELP = "help",
}

export interface GameLevelResultStorage {
  [level: string]: { result: GameLevelResult };
}
