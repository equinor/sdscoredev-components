# {product}-internal

{Template for internal repos where we store information that does not fit in our open source product repos. When creating an -internal repo, use this template and replace all strings within curly brackets {}. (Markdown does not have any placeholder markers, curly brackets made sense - better ideas are welcome}

> {_Note, the structure in this template are just suggestions, feel free to change everything to best fit your product!}

Equinor internal documentation for {product}.equinor.com. This repo is open to everyone in Equinor. It contains information and Issues about {product} that fit in GitHub, but does not fit on public (open-source) repos. **It must not contain any secrets or restricted information.**

## About the product

### Where to find the solution

Issues (Feature requests and bugs) are managed in GitHub Issues in the various repos we use. All issues are connected to our project board for a full overview.

Project board: [{project} board](https://github.com/orgs/equinor/projects/{board-id})

> _Note!_ This is an automated board reflecting the status of issues in the various repos we use. Moving issues between lanes in the board will NOT update the status of the Issue. It is thus recommented no not move Issues in the board. See [Linking a pull request to an issue](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue) for how pull requests are linked to issues. (We do not control this, it's how GitHub boards work)

#### Source code

Repo | Link | Access control | Comment
-|-|-|-
Application documentation | [{product}-internal](https://github.com/equinor/{product}-internal) | [{github-team}](https://github.com/orgs/equinor/teams/{team})
Website (frontend) | [{product-web}](https://github.com/equinor/{product-web}) | [{github-team}](https://github.com/orgs/equinor/teams/{team})
API (backend) | [{product-api}](https://github.com/equinor/{product-api}) | [{github-team}](https://github.com/orgs/equinor/teams/{team})
Infrastructure | [{product}-infra](https://github.com/equinor/{product-infra}) | [{github-team}](https://github.com/orgs/equinor/teams/{team})
Application documentation | [{product}-internal](https://github.com/equinor/{product}-internal) | [{github-team}](https://github.com/orgs/equinor/teams/{team})

#### Runtime environment

Environment | Link
-|-
Frontend hosting | <https://console.radix.equinor.com/applications/{radix application}>
Backend hosting | <https://console.radix.equinor.com/applications/{radix application}>

### Devopment and test environments

Website: <https://{product}.equinor.com>
API: <https://api.equinor.com/{...}>

Environment | Link
-|-
Production environment | [{...}-prod.azurewebsites.net](https://{...}-prod.azurewebsites.net) (same as {product}.equinor.com)
QA environment | [{...}-qa.azurewebsites.net](https://{...}-qa.azurewebsites.net)
Test environment | [{...}-test.azurewebsites.net](https://{...}-test.azurewebsites.net)
Development environment | [{...}-dev.azurewebsites.net](https://{...}-dev.azurewebsites.net)

### People

DevOps team:

- Members from
  - Dev: SDS CoreDev(<https://github.com/orgs/equinor/teams/sds-coredev>)
  - Ops: Ops(<https://github.com/orgs/equinor/teams/ops>).
- See [Contributors](https://docs.github.com/en/free-pro-team@latest/github/visualizing-repository-data-with-graphs/viewing-a-projects-contributors) in the repos for individuals

Stakeholders:
List of PO, user reps and anyone not on the DevOps team

### Links

- Software Development Life Cycle, see <https://github.com/equinor/sdscoredev-handbook>
- Service alignment: CI=[{CIname}]({https://equinor.service-now.com/nav_to.do?uri=%2Fcmdb_ci_spkg_list.do})
- Architecture contract: [{product.md}](<https://github.com/equinor/architecturecontract/blob/master/contracts/{ac_contract}>)
- User documentation: [{name}]({link})
- EITA: [{name}]({link})
- Runbook: [{name}]({link})
- Teams channel: [{name}]({link})
- Slack channel: [{name}]({link})

## For the DevOps team

{Getting Started}

{How to setup the solution on local dev machine}

{Azure Portal Configuration}

{Running tests locally}

{Running tests in CI/CD}

{Test coverage}

{APIM/Swagger}

Environment | Link
-|-
Dev | <https://{...}.azurewebsites.net/api/swagger>
Test | <https://{...}.azurewebsites.net/api/swagger>
QA | <https://{...}.azurewebsites.net/api/swagger>
Prod | <https://{...}.azurewebsites.net/api/swagger>

{Logging and Monitoring}

{Azure AD management]
