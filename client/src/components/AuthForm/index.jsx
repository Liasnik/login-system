/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, TextField, Typography } from "@mui/material"
import styles from './authForm.module.scss'
import {useForm} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import { login, registration } from "../../redux/slices/auth"

const AuthForm = ({formType, handleModalClose}) => {
  const dispatch = useDispatch()
  const isRegisterFormType = formType === 'register'

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {email: "", password: ""},
    mode: "onChange",
  })

  const onSubmit = async (values) => {
    console.log(values)

    const data = await dispatch(isRegisterFormType ? 
      registration(values) : login(values))

    console.log(data)
    
    if (!data.payload) {
      alert(`${isRegisterFormType ? "Register" : 'Login'} failed!`)
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
    
    handleModalClose()
  }


  return (
    <>
      <Typography sx={{mb: 4}} variant="h3" className={styles.title}>
        {isRegisterFormType ? 'Register' : 'Login'}
      </Typography>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField      
         label="Email"
          type="email"
          {...register("email", {required: "Email field is required"})}
          error={Boolean(errors?.email?.message)}
          helperText={errors.email ? "Email field is required" : ""}
          />
        <TextField
            style={{color: 'white'}}
            sx={{mb: '18px'}}
            label="Password"
            type="password"
             {
              ...register("password", {
                required: "Password must contain at least 5 characters",
                minLength:5
            })}
            error={Boolean(errors?.password?.message)}
            helperText={errors.password ? "Password should by at least 5 symbols" : ""}
        />
        <Button
        style={{color: 'white'}}
          disabled={!isValid}
          variant="contained"
          type="submit">
          Submit
        </Button>
      </form>
    </>
  )
}

export default AuthForm