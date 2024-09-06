import React, { useState } from 'react';
import Input from '../Components/Inputs/Input';
import Button from '../Components/Buttons/Button';
import styles from './Login.module.scss';  // Import the CSS module

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ email, password });
    
    // Reset form after submission
    setEmail('');
    setPassword('');
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
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
