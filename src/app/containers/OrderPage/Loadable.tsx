/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from "utils/loadable";

export const OrderPage = lazyLoad(
    () => import("./index"),
    module => module.default
);
