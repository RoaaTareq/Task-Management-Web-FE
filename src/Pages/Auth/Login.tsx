import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import Input from '../../Components/Inputs/Input';
import Button from '../../Components/Buttons/Button';
import styles from './CSS/Auth.module.css';  
import { login } from '../../services/authService';  
import Left from '../../../src/images/left.svg'; // Regular import for SVG image

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // Memoize the handleLogin function
  const handleLogin = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const response = await login({ email, password });
      setSuccess('Login successful');

      // Store the token in localStorage (this happens inside the `login` function)
      localStorage.setItem('token', response.token);

      // Redirect after successful login
      window.location.href = "/tasks";
      
      // Clear email and password inputs
      setEmail('');
      setPassword('');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
    }
  }, [email, password]);

  useEffect(() => {
    if (error) {
      const id = setTimeout(() => setError(null), 3000);
      setTimeoutId(id);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [error, timeoutId]);

  return (
    <section>
      <div className="container">
        <div className={`d-flex justify-content-center align-items-center ${styles['login-page']}`}>
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
          <div>
            <Suspense fallback={<div>Loading...</div>}>
              <img src={Left} alt="" className='w-100 m-auto' />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
