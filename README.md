# HTTP Server Library

A lightweight, TypeScript-based HTTP server library designed for use in other projects.

## 📦 Installation

```sh
npm install your-package-name
```

or using yarn:

```sh
yarn add your-package-name
```

## 🚀 Usage

### Import and Initialize

```ts
import { HttpClient } from "your-package-name";

const app = new HttpClient();

app.get("/hello", (req, res) => {
  res.status(200).setHeader("Content-Type", "text/plain").send("Hello, World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

### Middleware Support

```ts
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
};

app.use(logger);
```

## 📁 Project Structure

```
.
├── README.md
├── package.json
├── src
│   ├── index.ts
│   ├── modules
│   │   ├── HttpClient
│   │   │   └── HttpClient.ts
│   │   ├── HttpRequest
│   │   │   └── HttpRequest.ts
│   │   ├── HttpResponse
│   │   │   └── HttpResponse.ts
│   │   └── index.ts
│   └── types.ts
└── tsconfig.json
```

## 📝 License

MIT License.
