const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userRepository = require('../repositories/userRepositoryORM')

const register = async ({ email, password }) => {
  //робимо перевірку чи не було вже зареєстровано такого користувача з таким email
  const existingUser = await userRepository.findByEmail(email)

  if (existingUser) {
    throw new Error('User already exists')
  }
  //хешуємо пароль за допомогою bcrypt. 10 - кількість раундів хешування (salt rounds). вважається золотим стандартом
  const passwordHash = await bcrypt.hash(password, 10)

  /*повертаємо функцію яка міститься у userRepository. Відповіідна функція має записати у базу данних 
  користувача, де email та password_hash ми записуємо за допомогою цієї функції, а інші данні вже є дефолтними в SQL таблиці.
  */
 
  return userRepository.create({
    email,
    passwordHash
  })
}


const login = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email)

  if (!user) {
    throw new Error('Invalid credentials')
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password_hash
  )

  if (!isMatch) {
    throw new Error('Invalid credentials')
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '8h'
    }
  )

  return { token }
}

module.exports = {register, login}