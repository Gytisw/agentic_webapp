import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeToggle } from './components/ThemeToggle';
import { WorkflowCanvas } from './components/WorkflowCanvas';
import { Sidebar } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';
import { IntroPage } from './pages/IntroPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AuthProvider } from './components/AuthProvider';
import { useAuthStore } from './store/authStore';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function WorkflowEditor() {
  const signOut = useAuthStore((state) => state.signOut);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Agentic AI Workflow</h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button 
              onClick={signOut}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex gap-4">
        <Sidebar />
        <div className="flex-1 flex flex-col gap-4">
          <WorkflowCanvas />
          <ChatWindow />
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/workflow" element={
            <PrivateRoute>
              <WorkflowEditor />
            </PrivateRoute>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;