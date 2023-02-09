import { v4 as uuidV4 } from 'uuid';

// console.log(uuidV4());

const list = document.querySelector('#list') as HTMLUListElement;
const form = document.querySelector('#new-task-form') as HTMLFormElement;
const input = document.querySelector<HTMLInputElement>('#new-task-title');

class Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;

  constructor(value: string) {
    this.id = uuidV4();
    this.title = value;
    this.completed = false;
    this.createdAt = new Date();
  }
}

const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

form.addEventListener('submit', (e: Event) => {
  e.preventDefault();

  if (input?.value == '' || input?.value == null) return;

  const task = new Task(input.value);
  addListItem(task);
  tasks.push(task);
  saveTasks();
  input.value = '';
});

function addListItem(task: Task) {
  const li = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    saveTasks();
  });
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  li.append(label);
  list.append(li);
}

function saveTasks() {
  localStorage.setItem('TASKS', JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const tasksJson = localStorage.getItem('TASKS');
  if (tasksJson == null) return [];
  return JSON.parse(tasksJson);
}
