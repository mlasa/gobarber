import React, { useState, FormEvent } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import Button from '../../components/Button/index';
import Input from '../../components/Input/index';

import { Container, Background, Content } from './styles';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    api.post('/sessions/', { email, password }).then(response => {
      localStorage.setItem('@GoBarber:login', JSON.stringify(response.data));
    });
  };

  return (
    <>
      <Container>
        <Content>
          <img src={logoImg} alt="GoBarber logo" />
          <form onSubmit={handleLogin}>
            <h1>Faça seu Login</h1>

            <Input
              name="email"
              icon={FiMail}
              placeholder="E-mail"
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
              onChange={e => setPassword(e.target.value)}
            />
            <Button type="submit">Entrar</Button>

            <a href="forgot">Esqueci minha senha</a>
          </form>

          <a href="login">
            <FiLogIn />
            Criar conta
          </a>
        </Content>
        <Background />
      </Container>
    </>
  );
};
export default SignIn;
