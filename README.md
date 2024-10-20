Task Management Application
This is a simple task management application built using React. The app allows users to add, edit, delete, and manage tasks. Tasks are categorized as either "ToDos" (non-executed) or "Executed." Additionally, tasks can be prioritized as High, Medium, or Low, and are sorted accordingly in the "ToDos" section.

Features
Add new tasks with title, description, and priority.
Edit existing tasks.
Mark tasks as executed.
Delete tasks from either category.
Sort tasks by priority.
Setup Instructions
Clone the repository:

bash
Copy code
git clone https://github.com/Patel-Utkarsh/assignment_3.git
Navigate to the project directory:

bash
Copy code
cd assignment_3
Install dependencies:

bash
Copy code
npm install
Run the application:

bash
Copy code
npm run dev
Open the application in your browser:

Visit http://localhost:3000.

Approach to Task Sorting by Priority
The application uses a priority-based sorting mechanism to display tasks. The priority levels are set as High, Medium, and Low. Tasks that have not been executed ("ToDos") are sorted in the following order:

High Priority tasks are displayed at the top.
Medium Priority tasks are displayed next.
Low Priority tasks are displayed at the bottom.
The sorting is achieved by assigning priority values to an array (priorityOrder) and using JavaScript's .sort() method to arrange tasks based on the index of their priority in that array.
