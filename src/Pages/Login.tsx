import React, { useState } from 'react';
import Input from '../Components/Inputs/Input';
import Button from '../Components/Buttons/Button';
import styles from './Login.module.scss';  // Import the CSS module
import { login } from '../services/authService';  // Import login function from your service

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      // Call the login service function
      const response = await login({ email, password });
      
      // If successful, set success message
      setSuccess('Login successful');
      
      // Optional: Redirect to dashboard or another page
      window.location.href = "/task";
      
      // Reset form fields
      setEmail('');
      setPassword('');
      
    } catch (error: any) {
      // If error occurs during login, set error message
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <section>
      <div className="container">
        <div className="d-flex justify-content-center">
          <div>
            <form onSubmit={handleLogin} className={styles['form-container']}>
              <Input
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="custom-input"
              />
              <Input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="custom-input"
              />
              <Button
                label="Login"
                type="submit"
                styleType="primary"
              />
              {error && <p className={styles['error-message']}>{error}</p>}
              {success && <p className={styles['success-message']}>{success}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
