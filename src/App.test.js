import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

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

    it('de saque, a transação foi realizada?', () => {
      render(<App />)

      const saldo = screen.getByText('R$ 1000')
      const transacao = screen.getByLabelText('Saque')
      const valor = screen.getByTestId('valor')
      const botao = screen.getByText('Realizar operação')

      expect(saldo.textContent).toBe('R$ 1000')
      fireEvent.click(transacao, {target: {value: 'saque'}})
      fireEvent.change(valor, {target: {value: 50}})
      fireEvent.click(botao)
      expect(saldo.textContent).toBe('R$ 950')
    })
  })
})
