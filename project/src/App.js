import React, { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Edit2, Check, X } from 'lucide-react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    completed: false
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.title.trim()) return;
    
    const task = {
      ...newTask,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    
    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      completed: false
    });
    
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const startEditing = (task) => {
    setEditingTask({ ...task });
  };

  const saveEdit = () => {
    setTasks(tasks.map(task => 
      task.id === editingTask.id ? editingTask : task
    ));
    setEditingTask(null);
  };

  const getFilteredTasks = () => {
    return tasks.filter(task => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' || 
        task.title?.toLowerCase().includes(searchLower) ||
        task.description?.toLowerCase().includes(searchLower);

      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
      const matchesStatus = 
        statusFilter === 'all' || 
        (statusFilter === 'completed' && task.completed) ||
        (statusFilter === 'active' && !task.completed);

      return matchesSearch && matchesPriority && matchesStatus;
    });
  };

  const filteredTasks = getFilteredTasks();

  const getSections = () => {
    const now = new Date();
    
    return {
      upcoming: filteredTasks.filter(task => {
        const dueDate = new Date(task.dueDate);
        return !task.completed && dueDate > now;
      }),
      overdue: filteredTasks.filter(task => {
        const dueDate = new Date(task.dueDate);
        return !task.completed && dueDate < now;
      }),
      completed: filteredTasks.filter(task => task.completed)
    };
  };

  const sections = getSections();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {showAlert && (
        <div className="mb-4 bg-green-100 p-4 rounded">
          <p className="text-green-800">Task added successfully!</p>
        </div>
      )}

      <div className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-medium mb-4">Add New Task</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Task title"
            className="w-full p-2 border rounded"
            value={newTask.title}
            onChange={e => setNewTask({...newTask, title: e.target.value})}
          />
          <textarea
            placeholder="Description"
            className="w-full p-2 border rounded"
            value={newTask.description}
            onChange={e => setNewTask({...newTask, description: e.target.value})}
          ></textarea>
          <div className="flex gap-4">
            <input
              type="date"
              className="p-2 border rounded"
              value={newTask.dueDate}
              onChange={e => setNewTask({...newTask, dueDate: e.target.value})}
            />
            <select
              className="p-2 border rounded"
              value={newTask.priority}
              onChange={e => setNewTask({...newTask, priority: e.target.value})}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded flex items-center gap-2"
              onClick={addTask}
            >
              <Plus size={16} /> Add Task
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6 bg-white p-4 rounded shadow">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full p-2 pl-10 border rounded"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <select
            className="p-2 border rounded"
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <select
            className="p-2 border rounded"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {Object.entries(sections).map(([sectionName, sectionTasks]) => (
        <div key={sectionName} className="mb-6 bg-white p-4 rounded shadow">
          <h3 className="text-lg font-medium mb-4 capitalize">{sectionName} Tasks ({sectionTasks.length})</h3>
          <div className="space-y-4">
            {sectionTasks.map(task => (
              <div key={task.id} className="p-4 border rounded hover:bg-gray-50">
                {editingTask?.id === task.id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={editingTask.title}
                      onChange={e => setEditingTask({...editingTask, title: e.target.value})}
                    />
                    <textarea
                      className="w-full p-2 border rounded"
                      value={editingTask.description}
                      onChange={e => setEditingTask({...editingTask, description: e.target.value})}
                    ></textarea>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        className="p-2 border rounded"
                        value={editingTask.dueDate}
                        onChange={e => setEditingTask({...editingTask, dueDate: e.target.value})}
                      />
                      <select
                        className="p-2 border rounded"
                        value={editingTask.priority}
                        onChange={e => setEditingTask({...editingTask, priority: e.target.value})}
                      >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                      </select>
                      <button
                        className="p-2 text-green-600 hover:bg-green-50 rounded"
                        onClick={saveEdit}
                      >
                        <Check size={16} />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                        onClick={() => setEditingTask(null)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleComplete(task.id)}
                        />
                        <h3 className={`font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}>
                          {task.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-sm ${
                          task.priority === 'high' ? 'bg-red-100 text-red-800' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {task.priority}
                        </span>
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          onClick={() => startEditing(task)}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                          onClick={() => deleteTask(task.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-600">{task.description}</p>
                    <p className="mt-1 text-sm text-gray-500">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            ))}
            {sectionTasks.length === 0 && (
              <p className="text-gray-500 text-center py-4">No tasks found</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;