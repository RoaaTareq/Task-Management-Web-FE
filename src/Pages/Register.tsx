import React, { useState } from 'react';
import Input from '../Components/Inputs/Input';  // Import your custom Input component
import Button from '../Components/Buttons/Button';  // Import your custom Button component
import styles from './Register.module.scss';  // Import your CSS module

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ username, email, password });
    setUsername('');
    setEmail('');
    setPassword('');
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
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
