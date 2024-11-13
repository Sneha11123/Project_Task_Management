# Task Management Application

This is a simple and user-friendly task management application built using React. It allows users to create, edit, and manage tasks with various features such as priority levels, search, and filtering.

## Features

- **Dashboard**: Upon accessing the application, users see a dashboard displaying a list of tasks organized into Upcoming, Overdue, and Completed sections.
- **Task Management**: Users can add, edit, and delete tasks. Each task includes a title, description, due date, and priority level.
- **Priority Levels**: Tasks can be assigned one of three priority levels: High, Medium, or Low. The priority is displayed with color-coded badges.
- **Search and Filtering**: Users can search for tasks by title or description, and filter tasks by priority and completion status.
- **Data Persistence**: All tasks are saved to the browser's localStorage, ensuring data persistence across page refreshes.

## Setup and Installation

To run the Task Management Application locally, follow these steps:

1. **Clone the repository**:

   ```
   git clone https://github.com/Sneha11123/Project_Task_Management/tree/master
   ```

2. **Install dependencies**:

   ```
   cd project
   npm install
   ```

3. **Start the development server**:

   ```
   npm start
   ```

   The application should now be running at `http://localhost:3000`.

## Assumptions and Design Decisions

1. **Data Storage**: The application uses the browser's `localStorage` to store task data. This ensures data persistence, but may not be suitable for larger-scale applications that require a more robust data storage solution.

2. **Responsive Design**: The user interface is designed to be responsive and work well on various screen sizes, but no specific mobile or tablet layouts have been implemented.

3. **Task Prioritization**: The three priority levels (High, Medium, Low) were chosen as a simple and common way to represent task importance. More advanced prioritization methods could be added in the future.

4. **Search and Filtering**: The search functionality allows users to search across both task titles and descriptions. The filtering options include priority and completion status, as these were deemed the most important criteria for this application.

5. **Error Handling**: The application does not include advanced error handling mechanisms, such as displaying error messages to the user. This was omitted to keep the focus on the core functionality.

6. **Testing**: Unit tests and integration tests have not been included in this initial version of the application. Implementing a comprehensive testing suite would be an important next step for a production-ready application.
