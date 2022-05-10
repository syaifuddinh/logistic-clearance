/**
 * Asynchronously loads the component for DO
 */

import { lazyLoad } from "utils/loadable";

export const SP2GatePass = lazyLoad(
    () => import("./index"),
    module => module.default
);
