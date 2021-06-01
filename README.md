### Tests
Each test will be in its on js file.

We can also provide --dev or --headless flag when running the test.

--dev will generate a drupal one time login for the webapp, suitable for testing on localhost, and also not close the web browser at the end of the test.

--headless will run the test in a headless web browser.

e.g.
```
node Main.js --dev
```

### Env variables
Create a .env file to store sensitive data, this is gitignored and won't be commited.

```
loginUser={replace_this}
loginPassword={replace_this}
```
