import styled from 'styled-components'
import { theme } from 'styles/theme'

interface IStyledButton {
  variant?: 'contained' | 'text' | 'outline' | 'disabled'
}

const getButtonStyles = ({ variant }: IStyledButton) => {
  switch (variant) {
    case 'contained':
      return `
      background: ${theme.PRIMARYCOLOR};
      color: ${theme.WHITE};
      border: none;
      cursor: pointer;
      
      `
    case 'disabled':
      return `
      background: ${theme.NEUTRALGREYCOLOR};
      color: ${theme.BORDERCOLOR};
      border: none;
      cursor: not-allowed      
      `

    case 'outline':
      return `
      background:transparent;
      color: ${theme.PRIMARYCOLOR};
      border: 1px solid ${theme.PRIMARYCOLOR};
      cursor: pointer;
      `
    case 'text':
      return `
      background:transparent;
      color: ${theme.PRIMARYCOLOR};
      border: none;
      cursor: pointer;
      `
    default:
      return `
      background: ${theme.PRIMARYCOLOR};
      color: ${theme.WHITE};
      border: none;
      cursor: pointer;
  `
  }
}

export const StyledButton = styled.button<IStyledButton>`
  ${({ variant }) => getButtonStyles({ variant })};
  width: 100%;
  height: 48px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
`
