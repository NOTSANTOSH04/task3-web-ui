# Task 3: Web UI with React and TypeScript

**Name:** Santosh  
**Date:** October 18, 2025  
**GitHub:** [@NOTSANTOSH04](https://github.com/NOTSANTOSH04)

---

## Project Overview

A modern, responsive web user interface for the Task Manager application built with React 19, TypeScript, and Ant Design. This UI provides a clean and intuitive interface to interact with the Task Manager REST API (Task 1), allowing users to create, execute, search, view, and delete tasks through an accessible web interface.

### Key Features

- ✅ **Create Tasks** - User-friendly form with validation
- ✅ **View All Tasks** - Interactive table with pagination
- ✅ **Search Functionality** - Search by task name OR task ID
- ✅ **Execute Tasks** - Run commands and view execution history
- ✅ **Task Details** - Modal view with complete execution timeline
- ✅ **Delete Tasks** - Confirmation dialog for safety
- ✅ **Real-time Updates** - Automatic refresh after operations
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Accessibility** - ARIA labels and keyboard navigation
- ✅ **Error Handling** - User-friendly error messages

---

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.x | Frontend framework |
| **TypeScript** | 5.x | Type safety and better DX |
| **Ant Design** | 5.x | UI component library |
| **Vite** | 6.x | Build tool and dev server |
| **Axios** | 1.x | HTTP client for API calls |
| **React Icons** | Latest | Icon components |

---

## Prerequisites

Before running this project, ensure you have:

- ✅ Node.js 18+ installed
- ✅ npm or yarn package manager
- ✅ Task 1 backend running on `http://localhost:8081`
- ✅ Git for version control

---

## Installation & Setup

### Step 1: Clone Repository

git clone https://github.com/NOTSANTOSH04/task3-web-ui.git
cd task3-web-ui

### Step 2: Install Dependencies

npm install


This installs:
- React and React DOM
- TypeScript
- Ant Design
- Axios
- Vite and development tools

---

### Step 3: Configure Backend URL

The application is pre-configured to connect to the backend at `http://localhost:8081`.

If the backend runs on a different port, edit `src/services/taskService.ts`:

const API_BASE_URL = 'http://localhost:YOUR_PORT/api';

---

### Step 4: Start Backend (Task 1)

**IMPORTANT:** The backend must be running!
In separate terminal, navigate to Task 1 project

cd path/to/task1-java-rest-api
mvn spring-boot:run


Wait for: `Started TaskManagerApplication`

---

### Step 5: Start Development Server

npm run dev

Expected output:

VITE v6.x.x ready in XXX ms

➜ Local: http://localhost:5173/
➜ Network: use --host to expose


---

### Step 6: Open in Browser

Navigate to: [**http://localhost:5173/**](http://localhost:5173/)

You should see the Task Manager interface! 🎉

---

## Application Screenshots

### Home Page - Empty State

<img width="1858" height="948" alt="image" src="https://github.com/user-attachments/assets/ed2ae575-9a51-4ec3-951d-35259b9d68ae" />
<img width="1864" height="941" alt="image" src="https://github.com/user-attachments/assets/ebd5ee92-8690-446d-834c-c4a57e15f046" />



The initial state shows the task creation form at the top and an empty task table below.

---

### Create Task

<img width="1864" height="949" alt="image" src="https://github.com/user-attachments/assets/3c39d73a-c19f-47bb-a3b4-43474d2bd4a4" />


**Creating a new task:**
1. Enter a unique **Task ID** (e.g., `task-001`)
2. Enter a **Task Name** (descriptive name)
3. Enter **Owner** (your name)
4. Enter **Command** to execute (e.g., `echo Hello World`)
5. Click **"Create Task"** button

<img width="1857" height="940" alt="image" src="https://github.com/user-attachments/assets/eeb847b4-aeb4-4e0e-9fc9-3eaecf3f947b" />


Success message confirms task creation and the form resets.

---

### Task List

<img width="1853" height="939" alt="image" src="https://github.com/user-attachments/assets/bac00239-675d-426e-8ed4-e6119d1b8bed" />


The table displays all tasks with columns:
- **ID** - Unique identifier
- **Name** - Task name
- **Owner** - Task creator
- **Command** - Command to execute
- **Executions** - Number of times executed (green badge if > 0)
- **Actions** - Execute, View, Delete buttons

**Features:**
- ✅ Sortable columns
- ✅ Pagination (10 tasks per page)
- ✅ Refresh button to reload data
- ✅ Responsive table with horizontal scroll

---

### Search Functionality

#### Search by Name

<img width="1865" height="943" alt="image" src="https://github.com/user-attachments/assets/33a8c5d7-7a6f-4e1c-9f3c-f3e2e33592b3" />

<img width="1826" height="785" alt="image" src="https://github.com/user-attachments/assets/cd1a850c-1557-488d-bcf9-1f397895f213" />

<img width="1635" height="611" alt="image" src="https://github.com/user-attachments/assets/99ab4ed5-581b-4bd8-85ed-77a7ca8b58bc" />

**How to search by name:**
1. Select **"By Name"** from dropdown
2. Enter part of task name (e.g., "Hello")
3. Click **"Search"** or press Enter
4. Results show all tasks containing the search term

**Features:**
- Case-insensitive
- Partial matching
- Shows count of results

---

#### Search by ID

<img width="1849" height="800" alt="image" src="https://github.com/user-attachments/assets/265da098-c421-4de3-bc48-454890cfa3c5" />


**How to search by ID:**
1. Select **"By ID"** from dropdown
2. Enter exact task ID (e.g., "task-001")
3. Click **"Search"** or press Enter
4. Results show exactly one task (if found)

**Clear button** resets search and shows all tasks.

---

### Execute Task

<img width="1861" height="848" alt="image" src="https://github.com/user-attachments/assets/b0118edd-1586-4bf0-aa04-9c9f3a8e82c4" />


Click the **"Execute"** button to run the task's command.

<img width="1858" height="925" alt="image" src="https://github.com/user-attachments/assets/78752637-3046-429c-883a-2d22735c0654" />


**What happens:**
1. Backend receives execute request
2. Command is executed (or pod created in Task 2)
3. Output is captured
4. Execution record is saved
5. Execution count badge updates

---

### Task Details Modal

<img width="1861" height="943" alt="image" src="https://github.com/user-attachments/assets/0d840581-9e25-486e-a069-aaa2bd70e1a6" />



Click **"View"** button to open detailed modal showing:
- Task ID, Name, Owner, Command
- Total number of executions
- Complete execution history

---

### Execution History Timeline

<img width="1862" height="936" alt="image" src="https://github.com/user-attachments/assets/54053961-9571-45a2-956a-860f8741c232" />


**Timeline shows:**
- ✅ Execution number (#1, #2, etc.)
- ✅ Start timestamp
- ✅ End timestamp
- ✅ Command output (formatted in code block)
- ✅ Green checkmark for successful execution

**Multiple executions:**
- Each time you execute the same task, a new entry is added
- History is preserved and displayed chronologically
- Latest execution appears at the top

---

### Delete Task

<img width="1865" height="934" alt="image" src="https://github.com/user-attachments/assets/e49a6108-936d-4fdc-8d2d-b56b05967912" />


**Safety feature:**
- Confirmation dialog prevents accidental deletion
- Click **"Yes"** to confirm deletion
- Click **"No"** or close dialog to cancel

After deletion:
- Task is removed from database
- Success message is displayed
- Table updates automatically

---


## Features in Detail

### 1. Form Validation

The create task form includes:
- **Required field validation** - All fields must be filled
- **Real-time feedback** - Error messages appear immediately
- **Format validation** - Ensures proper data types
- **Auto-reset** - Form clears after successful submission

---

### 2. Error Handling

**User-friendly error messages:**
- Network errors: "Failed to connect to server"
- Task not found: "Task not found"
- Validation errors: Specific field errors
- Server errors: "An error occurred, please try again"

**Error scenarios handled:**
- Backend not running
- Network timeout
- Invalid API responses
- CORS issues

---

## API Integration

The frontend communicates with the backend REST API:

### API Endpoints Used:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks?id={id}` | Get task by ID |
| GET | `/api/tasks/search?name={name}` | Search tasks by name |
| PUT | `/api/tasks` | Create new task |
| PUT | `/api/tasks/{id}/execute` | Execute task |
| DELETE | `/api/tasks/{id}` | Delete task |

### API Service (`src/services/taskService.ts`)







