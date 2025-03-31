export interface PageConfig {
  pageId: number;
  Path: string;
  Title: string;
  MenuButton: string;
}

export enum Pages {
  Login = "Login",
  Articles = "Articles",
  Reacted = "Reacted",
  MyArticles = "MyArticles",
  Profile = "Profile",
}

export const pageConfig: Record<Pages, PageConfig> = {
  [Pages.Login]: {
    pageId: 0,
    Path: "/login",
    Title: "Login",
    MenuButton: "Login",
  },
  [Pages.Articles]: {
    pageId: 1,
    Path: "/articles",
    Title: "Articles",
    MenuButton: "All Articles",
  },
  [Pages.Reacted]: {
    pageId: 2,
    Path: "/reacted",
    Title: "Articles Reacted To",
    MenuButton: "Articles Reacted To",
  },
  [Pages.MyArticles]: {
    pageId: 2,
    Path: "/myArticles",
    Title: "My Articles",
    MenuButton: "My Articles",
  },
  [Pages.Profile]: {
    pageId: 3,
    Path: "/profile",
    Title: "Profile",
    MenuButton: "Profile",
  },
};
