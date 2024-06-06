import React from 'react';
import StudentsContainer from "../containers/StudentsContainer.jsx";
import HasAccess from "../../../services/auth/HasAccess.jsx";
import config from "../../../config.js";

const StudentsPage = () => {
    return <HasAccess access={[config.ROLES.ROLE_ADMIN,config.ROLES.ROLE_SUPER_ADMIN]}><StudentsContainer /></HasAccess>
};
export default StudentsPage;
