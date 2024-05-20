const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());

var CookieDate = new Date();
CookieDate.setFullYear(CookieDate.getFullYear() + 10);

app.get("/", (req, res) => {
  //   res.set("Content-Type", "application/json");

  //***** uncomment this
  // res.set("Access-Control-Allow-Origin", "*");
  
  // let cookiesTest = document.cookie.split(";");
  // if (cookiesTest && cookiesTest.length > 1) {
  //   console.log(cookiesTest);
  //   console.log("Success");
  //   // return true;
  // } else {
  console.log("Setting fresh cookies");

  res.cookie("StrictSecure", "testFromServerStrict", {
    domain: "onrender.com",
    expires: new Date(Date.now() + 900000),
    // domain: ".rbsres01.net",
    // path: "/",
    sameSite: "strict",
    secure: true,
  });
  res.cookie("NoneSecure", "testFromServernone", {
    // domain: "https://parentpageonrender.com/",
    domain: "onrender.com",
    // domain: "localhost",
    expires: new Date(Date.now() + 900000),
    // path: "/",
    sameSite: "none",
    secure: true,
  });
  res.cookie("LAXSecure", "testFromServerLax", {
    expires: new Date(Date.now() + 900000),
    sameSite: "Lax",
    domain: "onrender.com",
    // domain: "https://parentpageonrender.com/",
    secure: true,
  });
  res.cookie("StrictNotSecure", "testFromServerStrict", {
    // domain: "localhost",
    expires: new Date(Date.now() + 900000),
    domain: "onrender.com",
    // domain: "https://parentpageonrender.com/",
    // domain: ".rbsres01.net",
    // path: "/",
    sameSite: "strict",
    secure: false,
  });
  res.cookie("NoneNotSecure", "testFromServernone", {
    // domain: ".rbsres01.net",
    // domain: "localhost",
    // domain: "https://parentpageonrender.com/",
    domain: "onrender.com",
    expires: new Date(Date.now() + 900000),
    // path: "/",
    sameSite: "none",
    secure: false,
  });
  res.cookie("LAXNotSecure", "testFromServerLax", {
    // domain: ".rbsres01.net",
    // domain: "localhost",
    // path: "/",
    // domain: "https://parentpageonrender.com/",
    domain: "onrender.com",
    expires: new Date(Date.now() + 900000),
    sameSite: "Lax",
    secure: false,
  });
  // }

  res.status(200).sendFile(path.join(__dirname, "/index.html"));
});

app.post("/post", function (req, res) {
  //   console.log(req);
  //***** uncomment this
  // res.set("Access-Control-Allow-Origin", "*");
  // res.set("Content-Type", "*");
  console.log("body is ", req.body);
  var cookie = getcookie(req);
  console.log(cookie);

  res.send({ status: "SUCCESS", ...req.body, ...cookie });
  //   res.send(req.body);
});

function getcookie(req) {
  var cookie = req.headers.cookie;
  return cookie?.split("; ");
}

app.listen(3001);
