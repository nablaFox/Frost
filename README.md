# Frost ![Static Badge](https://img.shields.io/badge/npm-v1.14.0-blue) ![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FnablaFox%2Ffrost%2Fmain%2Fpackage.json&query=engines.node&label=node&color=green1)

> A simple CLI to organize your workflow

- ⚡ Productivity Boost
- 🎯 Minimalistic
- 🐙 GitHub Integration 
- 📈 Progress Tracking
- 📁 Project Organization

**Frost** is a command-line interface designed to help manage projects efficiently. It provides various features to streamline project organization and enhance productivity. It is intended to be used as a personal tool for organizing individual work (rather than for team work).

## Install

```sh
npm install -g frost-cli
```

## Configuration

To configure the CLI run:

```sh
frost init
```

This will asks for:
  - Your github token
  - Your usual editor
  - The path where to save projects locally

To update one of the the previous configurations run:

```sh
frost update [config] [value]
```

## Project Management

```frost list``` lists all the projects.

```frost create [project]``` creates a new project.  
By default will create and configure also a github repo. This behavior is customizable, see ```frost help create```.

```frost remove [project]``` deletes a project.  
You can delete the github repo, the local version, or both. See ```frost help remove```.

```frost select [project]``` selects a project.  
By running this you can omit the ```[project]``` argument in commands like ```open```, ```status```, or ```task``` since they will refer to the selected project.

```frost open [project]``` opens a project.

## Tasks

How many times have you started a project and abandoned it after a while? One mistake that is often made is _feature overload_. Start with **small**, **easily achievable** goals that define the overall structure of your project. Whenever you complete something and see a nice green color you will get dopamine which will keep you addicted 🔁

```frost task --assign [project]``` assigns a task to a project.

```frost task --complete [task] [project]``` marks a task as completed.

```frost status [options] [project]``` shows the selected project tasks. For a global view you can use the ```-A``` flag.

You can use ```subtask``` to to break down a task into smaller goals, as the name suggests.

\
For a more complete experience feel free to explore all the features. Run ```frost help``` and enjoy! 🍀