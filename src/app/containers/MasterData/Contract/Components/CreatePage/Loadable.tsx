/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from "utils/loadable";

export const CreatePage = lazyLoad(
    () => import("./index"),
    module => module.default
);
