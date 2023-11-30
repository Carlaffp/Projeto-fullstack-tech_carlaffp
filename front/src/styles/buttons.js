import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const ButtonStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.4s;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  font-family: var(--font-primary);
  font-size: .875rem;
  ${({ fontWeight }) => {
    switch (fontWeight) {
      case "lg":
        return css`
          font-weight: 700;
        `;
      case "md":
        return css`
          font-weight: 600;
        `;
    }
  }};
  border-radius: 4px;

  ${({ buttonSize }) => {
    switch (buttonSize) {
      case "lg":
        return css`
          width: 100%;
          padding: 0 1.375rem;
          height: 2.375rem;
        `;
      case "md":
        return css`
          width: 4.875rem;
          padding: 0 1rem;
          height: 2rem;
        `;
      case "sm":
        return css`
          width: 2rem;
          padding: 0 1rem;
          height: 2rem;
          font-size: 1.125rem;
        `;
    }
  }}

  ${({ buttonStyle }) => {
    switch (buttonStyle) {
      case "primary":
        return css`
          background: var(--color-secondary);
          border: 0.0625rem solid var(--color-secondary);
          color: var(--color-white);

          &:hover {
            background: var(--color-primary-focus);
            border: 0.0625rem solid var(--color-primary-focus);
          }
        `;

      case "disabled":
        return css`
          background: var(--color-gray-2);
          border: 0.0625rem solid var(--color-gray-2);
          color: var(--color-black);

          &:hover {
            background: var(--color-gray-2);
            border: 0.0625rem solid var(--color-gray-2);
          }
        `;

      case "negative":
        return css`
          background: var(--color-negative);
          color: var(--color-white);
          border: 0.0625rem solid var(--color-negative);

          &:hover {
            background: var(--color-black);
            border: 0.0625rem solid var(--color-black);
          }
        `;
      case "black":
        return css`
          background: var(--color-primary);
          color: var(--color-white);
          border: 0.0625rem solid var(--color-primary);

          &:hover {
            background: var(--color-primary-focus);
            border: 0.0625rem solid var(--color-primary-focus);
          }
        `;
    }
  }}
`;

export const StyledButton = styled.button`
  ${ButtonStyles};
`;

export const StyledButtonUpdateModal = styled.button`
  ${ButtonStyles};
  height: 2.375rem;
  ${({ buttonSize }) => {
    switch (buttonSize) {
      case "lg":
        return css`
          width: 12.75rem;
          padding: 0 1.375rem;
        `;
      case "md":
        return css`
          width: 6.125rem;
          padding: 0 1rem;
        `;
    }
  }}
`;
export const StyledLink = styled(Link)`
  ${ButtonStyles};
`;