# Challenges I faced

I was stuck trying to implement caching.

[Deploying to subdirectory was hard](https://stackoverflow.com/questions/49429906/how-should-i-configure-create-react-app-to-serve-app-from-subdirectory)

[Play nice with ghpages](https://github.com/rafgraph/spa-github-pages)



# To implement autodeploy:

Run on cmd:

`yarn add gh-pages`

Add to `package.json`

```
"homepage": "http://xxx.github.io/xxx",

...

"scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
}
```


# To autodeploy:

`yarn run deploy`