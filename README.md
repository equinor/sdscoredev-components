# equinor-sdscoredev-components

Composite react components that extend Equinor Design Systems (EDS)

### [Storybook](https://equinor.github.io/sdscoredev-components/?path=/story/introduction--page)

---

## Main Components

### `<DataTable>`

SDSCoredev Components provides an advanced datatable that offer you pagination, sorting, filter
integration, column settings, query handling, sticky headers and much more. It is based on Equinor
Design System components to comply with Equinor design standards.

It is created so that developers can easily integrate it into their applications. The complexity that
a datatable generate over time is avoided by abstractions and combined reducers.

---

## Development

1. Clone the repo from [https://github.com/equinor/sdscoredev-components](https://github.com/equinor/sdscoredev-components) as a sibling to your local project.
2. Run

```
cd sdscoredev-components && npm install
```

3. Link dependencies

```
npm link ..\thelma-web\node_modules\react
```

```
npm link ..\thelma-web\node_modules\react-dom
```

```
npm link ..\thelma-web\node_modules\styled-components
```

4. In your local project run

```
npm install ../sdscoredev-components
```

5. Run

```
npm start
```

---

## Contributing

It is appreciated that you would like to contribute.

1. Fork it
2. Create a branch: `git checkout -b your-branch`
3. Commit changes: `git commit -am 'feat: add feature'`
4. Push changes: `git push origin your-branch`
5. Submit a Pull Request

Some points to remember:

-   Make sure the storybook is building before you think about creating pull request.
-   Follow conventional commit guidelines to enable automatic versioning.
-   Diligently add typing.
