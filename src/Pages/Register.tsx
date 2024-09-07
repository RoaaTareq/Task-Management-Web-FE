// src/components/Register.tsx

import React, { useState } from 'react';
import Input from '../Components/Inputs/Input';  // Import your custom Input component
import Button from '../Components/Buttons/Button';  // Import your custom Button component
import styles from './Register.module.scss';  // Import your CSS module
import { register } from '../services/authService';  // Import the register function from your service

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
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
      setError('Registration failed');
    }
  };

  return (
    <section>
      <div className="container">
        <div className="d-flex justify-content-center">
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
        </div>
      </div>
    </section>
  );
};

export default Register;
