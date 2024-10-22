import { metaBaseUrl } from "../connection/backUrl";
import { executeFetch } from "../connection/fetch";
import { HttpMethods } from "../connection/HttpMethods";

export const getMetabaseToken = async (id, token) => {
    const endpoint = metaBaseUrl + '/metabase/token?dashboardId=' + id;
    return await executeFetch(endpoint, null, HttpMethods.GET, token, 200);
};