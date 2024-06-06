import React from 'react';
import ScoringCriteriaContainer from "../containers/ScoringCriteriaContainer.jsx";
import HasAccess from "../../../services/auth/HasAccess.jsx";
import config from "../../../config.js";

const ScoringCriteriaPage = () => {
    return <HasAccess access={[config.ROLES.ROLE_ADMIN,config.ROLES.ROLE_SUPER_ADMIN]}><ScoringCriteriaContainer /></HasAccess>
};
export default ScoringCriteriaPage;
