System.config({
    baseURL: "/",
    defaultJSExtensions: true,
    transpiler: "typescript",
    paths: {
        "npm:*": "jspm_packages/npm/*",
        "github:*": "jspm_packages/github/*",
        "components/*": "dist/components/*"
    }
});
