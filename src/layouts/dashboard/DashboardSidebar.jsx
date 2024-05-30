import {Layout, Menu} from "antd";
import {get} from "lodash";
import React from "react";
import {useTranslation} from "react-i18next";
import {useLocation, useNavigate} from "react-router-dom";
import config from "../../config.js";
import {hasAccess} from "../../services/auth/HasAccess.jsx";
import {useStore} from "../../store/index.js";
const {Sider} = Layout
const DashboardSidebar = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const user = useStore(state => get(state,'user',{}))

    const items = [
        {
            label: t("Training center"),
            key: "/training-center",
            access: [config.ROLES.ROLE_SUPER_ADMIN],
        },
        {
            label: t("Exercise"),
            key: "/exercise",
            access: [config.ROLES.ROLE_ADMIN,config.ROLES.ROLE_SUPER_ADMIN],
        },
        {
            label: t("Exercise type"),
            key: "/exercise-type",
            access: [config.ROLES.ROLE_ADMIN,config.ROLES.ROLE_SUPER_ADMIN],
        },
        {
            label: t("Scoring criteria"),
            key: "/scoring-criteria",
            access: [config.ROLES.ROLE_ADMIN,config.ROLES.ROLE_SUPER_ADMIN],
        },
        {
            label: t("Students"),
            key: "/students",
            access: [config.ROLES.ROLE_ADMIN,config.ROLES.ROLE_SUPER_ADMIN],
        },
    ].filter((item) => {
        return hasAccess(get(user,'roles',[]),get(item,'access'));
    });

  return(
      <Sider
          theme={"light"}
          style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
              top: 0,
              bottom: 0,
          }}
      >
          <Menu
              mode="inline"
              style={{padding: 5}}
              onSelect={(event) => {navigate(get(event,'key','/'))}}
              items={items}
              selectedKeys={[get(location,'pathname','')]}
          />

      </Sider>
  )
}
export default DashboardSidebar
