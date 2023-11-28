import styled from "styled-components";

export const StyledFildBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;

  .div {
    width: 100%;
    position: relative;
  }
`;
export const StyledInputs = styled.input`
  width: 100%;
  height: 2.4375rem;

  font-family: var(--font-primary);
  font-size: .75rem;
  font-weight: 600;
  color: var(--color-black);
  padding: 0 0.8125rem;
  background: var(--color-primary);
  border-radius: 0.1875rem;
  border: 1px solid var(--color-primary);
`;
export const StyledLaabel = styled.label`
  font-family: var(--font-primary);
  font-size: .875rem;
  font-weight: 600;
  color: var(--color-black);
  
`;