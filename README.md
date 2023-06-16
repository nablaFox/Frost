# Project Management Tool 🔧

> The CLI created and used by nablaFox

**PMT** is a simple command-line interface designed to help manage projects efficiently. It provides various features to streamline project organization and enhance productivity 🔥

## Configuration

To configure the CLI run:

```pmt init```

This will asks for:
  - A github account
  - A path where to save the projects
  - An editor. Will be used to open the projects

To update the previous configurations:

```pmt --update [config] [new-config]```

## Project Management

```pmt --list``` lists all the projects

```pmt --create [project]``` creates an empty project

```pmt --clone [project]``` clones a project from your GitHub account

```pmt --remove [project] ``` delete (locally) a project

```pmt --select [project]``` selects a project

```pmt --selected``` shows the selected project

```pmt --open``` opens the selected project

``pmt`` is equivalent to ```cd ProjectsDIR```

## Tasks

How many times have you started a project and abandoned it after a while? A mistake that is often made is the _overload of features_. Start with small, easily achievable goals. Make a Todo List! 

Every time you complete something and you see a nice green color you will receive some dopamine which will essentially keep you addicted to what you are doing 🔁

```pmt status [options]``` shows the selected project tasks

You have several options:
  - **a**: show all the tasks, including completed ones
  - **A**: show the status of all projects
  - **compact**: omit id's and dates

```pmt task --assign [task]``` to assign a task to the project

```pmt task --complete [task-id]``` to mark a task as completed

Run ```pmt --help``` for more