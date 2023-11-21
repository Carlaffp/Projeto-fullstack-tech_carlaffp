import { forwardRef } from "react";

export const Input = forwardRef(({label,error, children, ...rest}, ref) =>{
  return(
    <>
    <label>{label}</label>
    <div>
      <input ref={ref} {...rest}/>
        {children}
    </div>
    {error ? (<p>{error.message}</p>): null}
    </>
  )
})