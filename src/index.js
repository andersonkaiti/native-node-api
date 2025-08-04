import http from "node:http";
import routes from "./routes.js";

const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`http://localhost:3000${request.url}`);

  console.log(
    `Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`
  );

  let { pathname } = parsedUrl;
  let id = null;

  const splitEndpoint = pathname.split("/").filter(Boolean);

  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
  }

  const route = routes.find(
    (routeObj) =>
      routeObj.endpoint === pathname && routeObj.method === request.method
  );

  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams);
    request.params = { id };

    response.status = (statusCode) => {
      return {
        send(body) {
          response.writeHead(statusCode, {
            "Content-Type": "application/json",
          });
          response.end(JSON.stringify(body));
        },
      };
    };

    route.handler(request, response);

    return;
  }

  response.writeHead(404, { "Content-Type": "text/html" });
  response.end(`Cannot ${request.method} ${pathname}`);
});

server.listen(3000, () =>
  console.log(`🚀 Server started at http://localhost:3000`)
);
