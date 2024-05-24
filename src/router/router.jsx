import React, {Suspense} from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// LAYOUTS
import DashboardLayout from "../layouts/dashboard/DashboardLayout.jsx";
import AuthLayout from "../layouts/auth/AuthLayout.jsx";
// LAYOUTS

// AUTH
import IsAuth from "../services/auth/IsAuth";
import IsGuest from "../services/auth/IsGuest";
import LoginPage from "../modules/auth/pages/LoginPage";
// AUTH

// 404
import NotFoundPage from  "../modules/auth/pages/NotFoundPage";
// 404

// PAGES
import OverlayLoader from "../components/OverlayLoader.jsx";
import IsHasProfile from "../services/auth/IsHasProfile.jsx";
import TrainingCenterPage from "../modules/training-center/pages/TrainingCenterPage.jsx";
// PAGES


const Router = ({ ...rest }) => {
  return (
    <BrowserRouter>
      <Suspense fallback={<OverlayLoader />}>
        <IsAuth>
          <IsHasProfile>
            <Routes>
              <Route path={"/"} element={<DashboardLayout />}>
                <Route
                    path={"/training-center"}
                    element={<TrainingCenterPage />}
                />
                <Route
                    path={"auth/*"}
                    element={<Navigate to={"/training-center"} replace />}
                />
                <Route
                    path={"/"}
                    element={<Navigate to={"/training-center"} replace />}
                />
                <Route path={"*"} element={<NotFoundPage />} />
              </Route>
            </Routes>
          </IsHasProfile>
        </IsAuth>

        <IsGuest>
          <Routes>
            <Route path={"/auth"} element={<AuthLayout />}>
              <Route index element={<LoginPage />} />
            </Route>
            <Route path={"*"} element={<Navigate to={"/auth"} replace />} />
          </Routes>
        </IsGuest>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
