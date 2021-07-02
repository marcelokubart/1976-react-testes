import React from 'react';
import { render, screen } from '@testing-library/react';

import App, {calcularNovoSaldo} from './app';

describe('Componente principal', () => {
  describe('Quando eu abro o app do banco', () => {
    test('o nome é exibido', () => {
      render(<App />);

      expect(screen.getByText('ByteBank')).toBeInTheDocument();
    })
    it('o saldo é exibido', () => {
      render(<App />);

      expect(screen.getByText('Saldo:')).toBeInTheDocument();
    })
    it('o botão de realizar transação é exibido', () => {
      render(<App />);

      expect(screen.getByText('Realizar operação')).toBeInTheDocument();
    })
  })
  describe('Quando eu realizo uma transação', () =>{
    it('de saque, o valor diminui?', () => {
      const valores = {
        transacao: 'saque',
        valor: 250
      }
      const novoSaldo = calcularNovoSaldo(valores, 150)
      const novoSaldo2 = calcularNovoSaldo(valores, 250)
      expect(novoSaldo).toBe(-100)
      expect(novoSaldo2).toBe(0)
    })
    it('de deposito, o valor aumenta?', () => {
      const valores = {
        transacao: 'deposito',
        valor: 50
      }
      const novoSaldo = calcularNovoSaldo(valores, 150)
      expect(novoSaldo).toBe(200)
    })
  })
})
