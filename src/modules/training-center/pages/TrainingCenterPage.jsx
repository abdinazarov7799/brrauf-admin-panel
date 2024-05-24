import React from 'react';
import TrainingCenterContainer from "../containers/TrainingCenterContainer.jsx";
import HasAccess from "../../../services/auth/HasAccess.jsx";
import config from "../../../config.js";

const TrainingCenterPage = () => {
    return <HasAccess access={[config.ROLES.ROLE_ADMIN,config.ROLES.ROLE_SUPER_ADMIN]}><TrainingCenterContainer /></HasAccess>
};

export default TrainingCenterPage;