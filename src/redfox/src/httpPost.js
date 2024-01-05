/*jshint esversion: 9 */
/*jshint -W018 */
/*jshint -W069 */
/*jshint -W083 */
/*jshint -W088 */
/*jshint -W038 */

var utils = require("../utils");

module.exports = function (defaultFuncs, api, ctx) {
    return function httpGet(url, form, callback, notAPI) {
        var resolveFunc = function () {};
        var rejectFunc = function () {};

        var returnPromise = new Promise(function (resolve, reject) {
            resolveFunc = resolve;
            rejectFunc = reject;
        });

        if (!callback && (utils.getType(form) == "Function" || utils.getType(form) == "AsyncFunction")) {
            callback = form;
            form = {};
        }

        form = form || {};

        callback =
            callback ||
            function (err, data) {
                if (err) return rejectFunc(err);
                resolveFunc(data);
            };

        if (notAPI) {
            utils
                .post(url, ctx.jar, form, ctx.globalOptions)
                .then(function (resData) {
                    callback(null, resData.body.toString());
                })
                .catch(function (err) {
                    return callback(err);
                });
        } else {
            defaultFuncs
                .post(url, ctx.jar, form, {})
                .then(function (resData) {
                    callback(null, resData.body.toString());
                })
                .catch(function (err) {
                    return callback(err);
                });
        }

        return returnPromise;
    };
};
