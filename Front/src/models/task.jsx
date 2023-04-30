class Task {
  constructor(id, title, description, status, duedate, priority) {
    this._id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.duedate = duedate;
    this.priority = priority;
  }
}

export default Task;
