import React, { useState, useEffect, useCallback } from 'react';
import Input from '../../Components/Inputs/Input';  // Custom Input component
import Button from '../../Components/Buttons/Button';  // Custom Button component
import styles from './CSS/Auth.module.css';  // CSS module
import { register } from '../../services/authService'; 
import Left from '../../../src/images/left.svg'; // Regular import for SVG image

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Memoize handleSubmit to avoid unnecessary re-creation on each render
  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
  
    try {
      await register({
        name: username,
        email,
        password,
      });
      setSuccess('Registration successful');
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error: any) {
      // Display proper error message from API response
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Registration failed');
      } else {
        setError('An unexpected error occurred');
      }
    }
  }, [username, email, password]);

  // Handle error message display and timeout
  useEffect(() => {
    if (error) {
      const id = setTimeout(() => {
        setError(null);
      }, 3000);
      
      return () => {
        clearTimeout(id);
      };
    }
  }, [error]);

  return (
    <section>
      <div className="container">
        <div className={`d-flex justify-content-center align-items-center ${styles['login-page']}`}>
          <div>
            <form onSubmit={handleSubmit} className={styles['form-container']}>
              <Input
                type="text"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                className="custom-input"
              />
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
                label="Register"
                type="submit"
                styleType="primary"
              />
              {success && <p className={styles['success-message']}>{success}</p>}
              {error && <p className={styles['error-message']}>{error}</p>}
            </form>
          </div>
          <div>
            <img src={Left} alt="Illustration" className='w-100 m-auto' /> {/* Image import for SVG */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
