/**
 * Asynchronously loads the component for LoginPage
 */

import { lazyLoad } from "utils/loadable";

export const RegistrationPage = lazyLoad(
    () => import("./index"),
    module => module.default
);
