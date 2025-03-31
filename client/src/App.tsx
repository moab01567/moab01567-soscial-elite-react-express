import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/login/LoginPage";
import { MainPage } from "./pages/main/MainPage";
import { PrivatePage } from "./pages/PrivatePage";
import { APIUsers } from "../../shared/interface";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { pageConfig } from "./PageConfig";
import { MyArticles } from "./pages/myArticles/MyArticles";
import { ReactionPage } from "./pages/reactionArticles/ReactionPage";
import { getAuthenticationFromServer } from "./AppService";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);
  const [user, setUser] = useState<APIUsers | null>(null);

  async function checkAuthentication() {
    const user = await getAuthenticationFromServer();
    if (!user) {
      setIsAuthenticated(false);
      setUser(null);
    } else {
      setUser(user);
      setIsAuthenticated(true);
    }
  }

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path={pageConfig.Login.Path}
            element={
              <PrivatePage
                authenticated={isAuthenticated}
                enterPage={
                  <MainPage
                    path={pageConfig.Articles.Path}
                    user={user as APIUsers}
                  ></MainPage>
                }
                fallBackPage={<LoginPage path={pageConfig.Login.Path} />}
              />
            }
          />
          <Route
            path={pageConfig.Articles.Path}
            element={
              <PrivatePage
                authenticated={isAuthenticated}
                enterPage={
                  <MainPage
                    path={pageConfig.Articles.Path}
                    user={user as APIUsers}
                  />
                }
                fallBackPage={<LoginPage path={pageConfig.Login.Path} />}
              />
            }
          />
          <Route
            path={pageConfig.MyArticles.Path}
            element={
              <PrivatePage
                fallBackPage={<LoginPage path={pageConfig.Login.Path} />}
                authenticated={isAuthenticated}
                enterPage={
                  <MyArticles
                    path={pageConfig.MyArticles.Path}
                    user={user as APIUsers}
                  ></MyArticles>
                }
              />
            }
          />
          <Route
            path={pageConfig.Reacted.Path}
            element={
              <PrivatePage
                authenticated={isAuthenticated}
                enterPage={
                  <ReactionPage
                    user={user as APIUsers}
                    path={pageConfig.Reacted.Path}
                  />
                }
                fallBackPage={<LoginPage path={pageConfig.Login.Path} />}
              />
            }
          />
          <Route
            path={pageConfig.Profile.Path}
            element={
              <PrivatePage
                fallBackPage={<LoginPage path={pageConfig.Login.Path} />}
                authenticated={isAuthenticated}
                enterPage={
                  <ProfilePage
                    path={pageConfig.Profile.Path}
                    user={user as APIUsers}
                  />
                }
              />
            }
          />
          <Route
            path={"/*"}
            element={
              <PrivatePage
                authenticated={isAuthenticated}
                enterPage={
                  <MainPage
                    path={pageConfig.Articles.Path}
                    user={user as APIUsers}
                  />
                }
                fallBackPage={<LoginPage path={pageConfig.Login.Path} />}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
