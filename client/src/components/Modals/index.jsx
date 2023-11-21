/* eslint-disable react/prop-types */
import { Box, Modal} from '@mui/material'
import styles from './modals.module.scss'
import AuthForm from '../AuthForm'

const Modals = ({type, handleModalClose}) => {
  return (
    <div>
      <Modal
        open={type === 'login'}
        onClose={handleModalClose}
      >
        <Box className={styles.formContainer}>
         <AuthForm formType={type} handleModalClose={handleModalClose}/>
        </Box>
      </Modal>

      <Modal
        open={type === 'register'}
        onClose={handleModalClose}
      >
        <Box className={styles.formContainer}>
          <AuthForm formType={type} handleModalClose={handleModalClose}/>
        </Box>
      </Modal>
    </div>
  )
}

export default Modals