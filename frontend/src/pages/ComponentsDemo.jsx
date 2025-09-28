// src/pages/ComponentsDemo.jsx
import React, { useState } from 'react';
import Button from '../components/ui/Button';
import FormInput from '../components/ui/FormInput';
import Modal from '../components/ui/Modal';
import DataTable from '../components/ui/DataTable';

const mockData = [
  { id: 1, name: 'Alice', role: 'Developer', status: 'Active' },
  { id: 2, name: 'Bob', role: 'Designer', status: 'Inactive' },
  { id: 3, name: 'Charlie', role: 'Manager', status: 'Active' },
];

const dataColumns = [
  { header: 'ID', accessor: 'id' },
  { header: 'Name', accessor: 'name' },
  { header: 'Role', accessor: 'role' },
  { header: 'Status', accessor: 'status' },
];

const ComponentsDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // --- Input Change Handler ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error on change
    setErrors({ ...errors, [name]: '' }); 
  };

  // --- Form Validation & Submission ---
  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};
    if (!form.name) formErrors.name = 'Name is required.';
    if (!form.email || !form.email.includes('@')) formErrors.email = 'Valid email is required.';
    if (form.password.length < 6) formErrors.password = 'Password must be at least 6 characters.';
    
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setIsLoading(true);
      // Mock API call
      setTimeout(() => {
        console.log('Form Submitted:', form);
        alert(`Form submitted for ${form.name}! Check console.`);
        setIsLoading(false);
        setForm({ name: '', email: '', password: '' });
      }, 1500);
    }
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Reusable Components Demo</h1>

      {/* --- Section 1: Button Component --- */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">1. Button Component</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary" size="lg">Large Secondary</Button>
          <Button variant="danger" size="sm" onClick={() => alert('Danger clicked!')}>Danger (Small)</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="text">Text Link</Button>
          <Button isLoading={isLoading} disabled={isLoading} variant="primary">
            {isLoading ? 'Processing' : 'Loading Button'}
          </Button>
          <Button disabled={true} variant="secondary">Disabled</Button>
        </div>
      </div>
      
      {/* --- Section 2: Form Input Component --- */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">2. Form Input Component</h2>
        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
          <FormInput
            id="name"
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Enter your full name"
          />
          <FormInput
            id="email"
            label="Email Address"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="name@example.com"
          />
          <FormInput
            id="password"
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Minimum 6 characters"
          />
          <Button type="submit" variant="primary" isLoading={isLoading}>
            Submit Form
          </Button>
        </form>
      </div>

      {/* --- Section 3: Data Table Component --- */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">3. Data Table Component</h2>
        <DataTable data={mockData} columns={dataColumns} />
      </div>

      {/* --- Section 4: Modal Component --- */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">4. Modal Component</h2>
        <Button onClick={() => setIsModalOpen(true)} variant="primary">
          Open Demo Modal
        </Button>
      </div>

      {/* Modal Instance */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Configuration Settings"
      >
        <p className="text-gray-700 mb-4">
          This is a reusable modal instance. Content is passed via the `children` prop. You can close it with the 'X' button, the escape key, or by clicking the backdrop.
        </p>
        <FormInput 
            id="config"
            label="Modal Input Example"
            placeholder="Type something here"
        />
        <div className="mt-6 flex justify-end">
          <Button 
            variant="secondary" 
            onClick={() => setIsModalOpen(false)} 
            className="mr-2"
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setIsModalOpen(false)}>
            Save Changes
          </Button>
        </div>
      </Modal>

    </div>
  );
};

export default ComponentsDemo;