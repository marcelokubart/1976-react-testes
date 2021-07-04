import React from 'react'
import { render, screen, fireEvent} from '@testing-library/react';

import Conta from './Conta'

describe('Componente Conta', () => {
  it('É exibido a unidade monetária?', () => {
    render(<Conta saldo={1000} />)
    const saldo = screen.getByTestId('saldo-conta')
    expect(saldo.textContent).toBe('R$ 1000')
  })

  it('A função Realizar Transação é realizada ao clicar no botão?', () => {
    const funcaoMock = jest.fn()
    render(<Conta saldo={1000} realizarTransacao={funcaoMock} />)

    fireEvent.click(screen.getByText('Realizar operação'))

    expect(funcaoMock).toHaveBeenCalled()
  })
})
