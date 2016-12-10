/**!
 * tru.jwis.cn - .js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Create Date: 16-11-4
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

function parseLanguage(header) {
    let language = header.language;
    try {
        if (!language) language = header["accept-language"];
        language = language.split(";")[0];
        let co = language.split(",");
        language = co.find(c => "en-US" == c);
        if (!language) throw new Error();
    } catch (error) {
        language = "zh-CN";
    }
    return language;

};

function success(data) {
  return {code:200, error:null, result: data};
}

export default async function (ctx, next) {
    const [start, {ip = "0.0.0.0", header} ] = [new Date, ctx["request"]];
    ctx['requestIp'] = ip; // 绑定请求Ip到 this对象上
    ctx['language'] = parseLanguage(header); // 绑定语言
    ctx['success'] = success;
    try {
        await next();
    } catch (error) {
        ctx.body = {message: error.message};
        ctx.status = error.status || 500;
    }
    const ms = new Date - start;
    console.log(`${start.toLocaleString()} [${ctx["requestIp"]}] ${ctx["method"]} ${ctx["url"]} - ${ms} ms`);
};
