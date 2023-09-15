import React from 'react'
import { IButtonProps } from 'interfaces'
import { StyledButton } from 'styles/components/Button'

const Button: React.FC<IButtonProps> = ({ label, variant, type, className, children, ...rest }: IButtonProps) => (
  <StyledButton variant={variant} type={type} className={className} {...rest}>
    {label}
    {children}
  </StyledButton>
)

export default Button
