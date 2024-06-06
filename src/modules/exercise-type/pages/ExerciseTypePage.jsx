import React from 'react';
import ExerciseTypeContainer from "../containers/ExerciseTypeContainer.jsx";
import HasAccess from "../../../services/auth/HasAccess.jsx";
import config from "../../../config.js";

const ExerciseTypePage = () => {
    return <HasAccess access={[config.ROLES.ROLE_ADMIN,config.ROLES.ROLE_SUPER_ADMIN]}><ExerciseTypeContainer /></HasAccess>
};
export default ExerciseTypePage;
