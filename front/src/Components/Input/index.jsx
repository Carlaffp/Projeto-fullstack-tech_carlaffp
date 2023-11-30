import { forwardRef } from "react";
import { StyledFildBox, StyledInputs, StyledLaabel } from "../../styles/input";
import { StyledParagraph } from "../../styles/typography";

export const Input = forwardRef(({label,error, children, ...rest}, ref) =>{
  return(
    <StyledFildBox>
    <StyledLaabel>{label}</StyledLaabel>
    <div className="div">
      <StyledInputs ref={ref} {...rest}/>
        {children}
    </div>
    {error ? (<StyledParagraph fontWeight="sm" fontColor=" #DA2C43">{error.message}</StyledParagraph>): null}
    </StyledFildBox>
  )
})