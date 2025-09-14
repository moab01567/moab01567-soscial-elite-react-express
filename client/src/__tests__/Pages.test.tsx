import { describe, expect, test, vi } from "vitest";
import * as articleServiceAn from "../features/articleAnonymous/ArticleAnonymousService";
import * as articleService from "../features/article/ArticleService";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { LoginPage } from "../pages/login/LoginPage";
import { pageConfig } from "../PageConfig";
import { APIAnonymousArticle } from "../../../shared/ArticlesInterfaceAndEnum";
import { ReactionsEmoji } from "../../../shared/ReactionsInterfaceAndEnum";
import { PrivatePage } from "../pages/PrivatePage";
import { PageLayout } from "../pages/PageLayout";
import { APIUsers, EAuthority, ELoginType } from "../../../shared/interface";
import { MainPage } from "../pages/main/MainPage";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { MyArticles } from "../pages/myArticles/MyArticles";
import { ReactionPage } from "../pages/reactionArticles/ReactionPage";
import { ProfilePage } from "../pages/profile/ProfilePage";
import * as profile from "../components/profile/Profile";

const user: APIUsers = {
  userId: "1",
  authority: EAuthority.publisher,
  name: "fist",
  picture: "http://test.no",
  loginType: ELoginType.github,
  email: "",
};
const articles: APIAnonymousArticle[] = [
  {
    articleId: "1",
    title: "title1",
    reactionsEmoji: {
      [ReactionsEmoji.THUMBS_UP]: 0,
      [ReactionsEmoji.LAUGHING]: 0,
      [ReactionsEmoji.HART]: 0,
    },
  },
  {
    articleId: "2",
    title: "title2",
    reactionsEmoji: {
      [ReactionsEmoji.THUMBS_UP]: 0,
      [ReactionsEmoji.LAUGHING]: 0,
      [ReactionsEmoji.HART]: 0,
    },
  },
  {
    articleId: "3",
    title: "title3",
    reactionsEmoji: {
      [ReactionsEmoji.THUMBS_UP]: 0,
      [ReactionsEmoji.LAUGHING]: 0,
      [ReactionsEmoji.HART]: 0,
    },
  },
];

describe("Login Page", () => {
  test("Login Page without Anonymous Article ", async () => {
    //arrange
    const GETAnonymousArticlesSpy = vi.spyOn(
      articleServiceAn,
      "GETAnonymousArticles",
    );
    GETAnonymousArticlesSpy.mockResolvedValue([]);

    //act
    render(<LoginPage path={pageConfig.Login.Path} />);

    //assert
    expect(screen.getByText("Welcome to Social Elite News")).toBeDefined();

    await waitFor(() =>
      expect(screen.getByText("No Articles here")).toBeDefined(),
    );
  });

  test("Login Page Rendering Login Page with Anonymous Article", async () => {
    const GETAnonymousArticlesSpy = vi.spyOn(
      articleServiceAn,
      "GETAnonymousArticles",
    );
    GETAnonymousArticlesSpy.mockResolvedValue(articles);
    render(<LoginPage path={pageConfig.Login.Path} />);
    //expect(screen.getByText("Welcome to Social Elite News")).toBeDefined();
    await waitFor(() =>
      expect(screen.getByText("Title: title1")).toBeDefined(),
    );
  });
});

describe("Privet Page", () => {
  test("Render Privet Page no enter", async () => {
    //Arrange
    const getAllArticlesSpy = vi.spyOn(articleService, "getAllArticles");
    getAllArticlesSpy.mockResolvedValue([]);

    //act
    render(
      <PrivatePage
        authenticated={false}
        fallBackPage={<p>enter===false</p>}
        enterPage={<p>enter===true</p>}
      />,
    );

    //expect
    expect(screen.getByText("enter===false")).toBeDefined();
  });

  test("Render Privet Page yes enter ", async () => {
    //Arrange
    const getAllArticlesSpy = vi.spyOn(articleService, "getAllArticles");
    getAllArticlesSpy.mockResolvedValue([]);

    //act
    render(
      <PrivatePage
        authenticated={true}
        fallBackPage={<p>enter===false</p>}
        enterPage={<p>enter===true</p>}
      />,
    );

    //expect
    expect(screen.getByText("enter===true")).toBeDefined();
  });
});

describe("Render pages to check if header title follow page config", () => {
  test("Render Main Page", async () => {
    //Arrange
    const getAllArticlesSpy = vi.spyOn(articleService, "getAllArticles");
    getAllArticlesSpy.mockResolvedValue([]);
    const router = createMemoryRouter([
      {
        path: "*",
        element: (
          <PageLayout
            user={user}
            pageConfig={pageConfig}
            currentPage={pageConfig.Articles}
          >
            <MainPage path={pageConfig.Articles.Path} user={user} />
          </PageLayout>
        ),
      },
    ]);
    //act
    render(<RouterProvider router={router} />);

    //expect
    waitFor(() =>
      expect(screen.getByText(pageConfig.Articles.Title)).toBeDefined(),
    );
  });
  test("Render My Articles Page", async () => {
    //Arrange
    const getAllArticlesSpy = vi.spyOn(articleService, "getAllArticles");
    getAllArticlesSpy.mockResolvedValue([]);
    const router = createMemoryRouter([
      {
        path: "*",
        element: (
          <PageLayout
            user={user}
            pageConfig={pageConfig}
            currentPage={pageConfig.MyArticles}
          >
            <MyArticles path={pageConfig.Articles.Path} user={user} />
          </PageLayout>
        ),
      },
    ]);
    //act
    render(<RouterProvider router={router} />);

    //expect
    waitFor(() =>
      expect(screen.getByText(pageConfig.MyArticles.Title)).toBeDefined(),
    );
  });

  test("Render Reaction Page", async () => {
    //Arrange
    const getAllArticlesSpy = vi.spyOn(articleService, "getAllArticles");
    getAllArticlesSpy.mockResolvedValue([]);
    const router = createMemoryRouter([
      {
        path: "*",
        element: (
          <PageLayout
            user={user}
            pageConfig={pageConfig}
            currentPage={pageConfig.Reacted}
          >
            <ReactionPage path={pageConfig.Articles.Path} user={user} />
          </PageLayout>
        ),
      },
    ]);
    //act
    render(<RouterProvider router={router} />);
    //expect
    waitFor(() =>
      expect(screen.getByText(pageConfig.MyArticles.Title)).toBeDefined(),
    );
  });
  test("Render Profile Page", async () => {
    //Arrange
    const profilePictureExistSpy = vi.spyOn(profile, "checkIfGetAble");
    profilePictureExistSpy.mockReturnValue(new Promise(() => false));
    const router = createMemoryRouter([
      {
        path: "*",
        element: (
          <PageLayout
            user={user}
            pageConfig={pageConfig}
            currentPage={pageConfig.Reacted}
          >
            <ProfilePage user={user} path={pageConfig.Profile.Path} />
          </PageLayout>
        ),
      },
    ]);
    //act
    render(<RouterProvider router={router} />);
    //expect
    waitFor(() =>
      expect(screen.getByText(pageConfig.Profile.Title)).toBeDefined(),
    );
  });
});
