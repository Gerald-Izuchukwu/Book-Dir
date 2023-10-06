import PasswordValidator from 'password-validator'
import EmailValidator from 'email-validator'

function validP(password, email) {
    const validPassword = new PasswordValidator()
    validPassword
        .is().min(6)
        .has().uppercase()
        .has().lowercase()
        .has().digits()
        .has().symbols()

    const isValidPassword = validPassword.validate(password)
    const isValdEmail = EmailValidator.validate(email)
    console.log(isValidPassword)
    console.log(isValdEmail)
}

validP('Ge@426759813', "geraldlouis@gmail.com")