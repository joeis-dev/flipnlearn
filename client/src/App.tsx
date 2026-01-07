import './App.css'
import { SignupForm } from './components/auth/SignupForm'
import { Footer } from './components/footer/Footer';

function App() {
  return (
    <div className="bg-gray-50 py-12 rounded-lg">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Flip & Learn
          </h1>
          <p className="text-lg text-gray-600">
            Master your knowledge with interactive flashcards
          </p>
        </header>
        
        <main>
          <SignupForm />
        </main>

        <Footer />
        
      </div>
    </div>
  );
}

export default App
