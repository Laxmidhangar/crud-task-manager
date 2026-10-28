import React, { useState, useEffect } from 'react';
import { getTasks, addTask, editTask, removeTask } from './services/api';

function App() {
  const [view, setView] = useState('form'); 
  const [tasks, setTasks] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    task: '',
    date: '',
    description: '',
    submitDate: '',
  });

  useEffect(() => {
    if (view === 'dashboard') {
      loadTasks();
    }
  }, [view]);

  const loadTasks = async () => {
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await editTask(currentId, formData);
        setIsEditMode(false);
        setCurrentId(null);
      } else {
        await addTask(formData);
      }
      setFormData({ name: '', task: '', date: '', description: '', submitDate: '' });
      setView('dashboard');
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await removeTask(id);
        loadTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleEdit = (taskItem) => {
    setIsEditMode(true);
    setCurrentId(taskItem._id);
    setFormData({
      name: taskItem.name,
      task: taskItem.task,
      date: taskItem.date ? taskItem.date.split('T')[0] : '',
      description: taskItem.description,
      submitDate: taskItem.submitDate ? taskItem.submitDate.split('T')[0] : '',
    });
    setView('form');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
      {view === 'form' ? (
        <div className="w-full max-w-lg bg-slate-800/90 backdrop-blur-md border border-slate-700 p-8 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            {isEditMode ? '✏️ Update Task' : '🚀 Create Task'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1">Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                placeholder="Enter your name"
                className="w-full px-4 py-2.5 rounded-lg bg-slate-900/60 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1">Task Name</label>
              <input 
                type="text" 
                name="task" 
                value={formData.task} 
                onChange={handleChange} 
                required 
                placeholder="Enter task name"
                className="w-full px-4 py-2.5 rounded-lg bg-slate-900/60 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">Date</label>
                <input 
                  type="date" 
                  name="date" 
                  value={formData.date} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-900/60 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">Submit Date</label>
                <input 
                  type="date" 
                  name="submitDate" 
                  value={formData.submitDate} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-900/60 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1">Description</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                required 
                rows="3"
                placeholder="Enter description"
                className="w-full px-4 py-2.5 rounded-lg bg-slate-900/60 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 resize-none"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full py-3 mt-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 font-bold text-white shadow-lg shadow-indigo-500/30 transform active:scale-95 transition duration-200"
            >
              {isEditMode ? 'Update Task' : 'Submit & View Table'}
            </button>
          </form>

          <button 
            onClick={() => setView('dashboard')}
            className="w-full mt-4 text-center text-sm font-medium text-slate-400 hover:text-indigo-400 transition duration-200"
          >
            📊 View Existing Task Table →
          </button>
        </div>
      ) : (
        <div className="w-full max-w-5xl space-y-6">
          <header className="flex justify-between items-center bg-slate-800/80 backdrop-blur-md p-6 rounded-2xl border border-slate-700 shadow-xl">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              📊 Task Management Dashboard
            </h2>
            <button 
              onClick={() => {
                setIsEditMode(false);
                setFormData({ name: '', task: '', date: '', description: '', submitDate: '' });
                setView('form');
              }}
              className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold rounded-xl border border-slate-600 transition duration-200"
            >
              ← Back to Form
            </button>
          </header>

          <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-2xl border border-slate-700 shadow-xl overflow-x-auto">
            <h3 className="text-lg font-semibold text-slate-300 mb-4">All Submitted Records</h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Task</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Submit Date</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60 text-slate-300 text-sm">
                {tasks.length > 0 ? (
                  tasks.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-700/40 transition duration-150">
                      <td className="py-3.5 px-4 font-semibold text-indigo-300">{item.name}</td>
                      <td className="py-3.5 px-4">{item.task}</td>
                      <td className="py-3.5 px-4">{item.date ? item.date.split('T')[0] : ''}</td>
                      <td className="py-3.5 px-4 text-slate-400 max-w-xs truncate">{item.description}</td>
                      <td className="py-3.5 px-4">{item.submitDate ? item.submitDate.split('T')[0] : ''}</td>
                      <td className="py-3.5 px-4 text-center space-x-2">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-semibold transition"
                        >
                          Update
                        </button>
                        <button 
                          onClick={() => handleDelete(item._id)}
                          className="px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-lg text-xs font-semibold transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-500 italic">
                      No tasks found. Click "Back to Form" to add a new task.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;