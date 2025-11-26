import './App.css'
import { SignupForm } from './components/auth/SignupForm'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            FlipNLearn
          </h1>
          <p className="text-lg text-gray-600">
            Master your knowledge with interactive flashcards
          </p>
        </header>
        
        <main>
          <SignupForm />
        </main>
        
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2025 Flip&Learn. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App
