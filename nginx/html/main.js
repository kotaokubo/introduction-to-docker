const tasksTableBodyElement = document.getElementById('tasks-table-body')
const taskTitleInputElement = document.getElementById('task-title-input')
const taskAddButtonElement = document.getElementById('task-add-button')

async function loadTasks() {
  const response = await fetch('/api/tasks')
  const responseBody = await response.json()

  while (tasksTableBodyElement.firstChild) {
    tasksTableBodyElement.removeChild(tasksTableBodyElement.firstChild)
  }
  
  responseBody.tasks.forEach(task => {
    const titleTdElement = document.createElement('td')
    titleTdElement.innerText = task.title

    const createdAtElement = document.createElement('td')
    createdAtElement.innerText = task.createdAt

    const trElement = document.createElement('tr')
    trElement.appendChild(titleTdElement)
    trElement.appendChild(createdAtElement)
    tasksTableBodyElement.appendChild(trElement)
  });
}

async function registerTask() {
  const requestBody = { title: taskTitleInputElement.value }
  await fetch('/api/tasks', {
    method: 'POST', body: JSON.stringify(requestBody)
  })
  await loadTasks()
}

async function main() {
  taskAddButtonElement.addEventListener('click', registerTask)
  await loadTasks()
}

main()