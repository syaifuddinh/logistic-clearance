/**
 * Asynchronously loads the component for DO
 */

import { lazyLoad } from "utils/loadable";

export const UserProfile = lazyLoad(
    () => import("./index"),
    module => module.default
);
