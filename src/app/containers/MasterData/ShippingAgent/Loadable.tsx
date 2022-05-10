/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from "utils/loadable";

export const ShippingAgentPage = lazyLoad(
    () => import("./index"),
    module => module.default
);
