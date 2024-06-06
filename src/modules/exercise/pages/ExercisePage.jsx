import React from 'react';
import HasAccess from "../../../services/auth/HasAccess.jsx";
import config from "../../../config.js";
import ExerciseContainer from "../containers/ExerciseContainer.jsx";

const ExercisePage = () => {
    return <HasAccess access={[config.ROLES.ROLE_ADMIN,config.ROLES.ROLE_SUPER_ADMIN]}><ExerciseContainer /></HasAccess>
};
export default ExercisePage;
