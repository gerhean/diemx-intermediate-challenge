# Challenges I faced

I was stuck trying to implement caching.



# To implement autodeploy:

Run on cmd:

`yarn add gh-pages`

Add to `package.json`

```
"scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
}
```

# To autodeploy:

`yarn run deploy`