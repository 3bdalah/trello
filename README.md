## Trello

tool to track the status of tasks for employees and assign tasks to another user.

### Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Structure](#structure)
- [Components](#components)
- [Routes](#routes)
- [Context](#context)
- [Redux](#redux)
- [Utilities](#utilities)

### Installation

To install and run the project, follow these steps:

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install the dependencies.
4. Run `npm start` to start the development server.

### Usage

You can add tasks and assign them to other users, as well as edit, remove, or drag tasks to another status.

### Project Structure

.../trello
.
| App.css
| App.jsx
| index.css
| main.jsx
|
+---assets
| react.svg
|
+---components
| +---About-header
| | About-header.jsx
| | About-header.module.css
| |
| +---CardTask
| | CardTask.jsx
| | CardTask.module.css
| |
| ... (other components listed here)
|
+---Context
| UserContext.jsx
|
+---Redux
| EmployeesSlice.jsx
| Store.jsx
| TasksSlice.jsx
| UserSlice.jsx
|
\---Utils
Consts.jsx

### Components

List of all components in the project:

- About-header
- CardTask
- Chat
- ColumnTask
- CreatedTasks
- ... (other components listed here)

### Context

The project includes the following context:

- UserContext

### Redux

The project utilizes Redux for state management. The following slices are implemented:

- EmployeesSlice
- Store
- TasksSlice
- UserSlice

### Utilities

The project includes the following utility file:

- Consts

Feel free to expand this documentation with more details specific to your project.
