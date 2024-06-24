import { Hono } from "hono";
import {
  setCookie,
  getCookie,
  deleteCookie,
  getSignedCookie,
  setSignedCookie,
} from "hono/cookie";
import { z } from "zod";

const app = new Hono();

const authRoute = app
  .post("/login", (c) => {
    setCookie;
    return c.json({ msg: "User loggedin" }, { status: 200 });
  })

  .get("/cookie", (c) => {
    const allCookies = getCookie(c);

    setCookie(c, "auth-cookie", "userIn", {
      path: "/",
      secure: true,
      domain: "",
      httpOnly: true,
      maxAge: 1000,
      expires: new Date(Date.UTC(2000, 11, 24, 10, 30, 59, 900)),
      sameSite: "Strict",
    });
    deleteCookie(c, "delicious_cookie");
    const delicious_cookie = getCookie(c, "delicious_cookie");

    return c.json({ delicious_cookie, allCookies });
  });

export default authRoute;
