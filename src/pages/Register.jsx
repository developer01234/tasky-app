import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Имя обязательно';
    else if (formData.name.length < 2) newErrors.name = 'Имя слишком короткое';
    
    if (!formData.email) newErrors.email = 'Email обязателен';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email некорректен';
    
    if (!formData.password) newErrors.password = 'Пароль обязателен';
    else if (formData.password.length < 6) newErrors.password = 'Пароль должен быть не менее 6 символов';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsLoading(true);
    try {
      // Здесь будет запрос к API для регистрации
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/dashboard');
    } catch (error) {
      setErrors({ api: error.message || 'Ошибка при регистрации' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Декоративные элементы */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-100 opacity-70 mix-blend-multiply blur-xl"></div>
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-100 opacity-70 mix-blend-multiply blur-xl"></div>
      
      {/* Карточка регистрации */}
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Заголовок */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Создайте аккаунт</h1>
          <p className="mt-2 text-gray-600">Заполните форму для регистрации</p>
        </div>
        
        {/* Ошибки API */}
        {errors.api && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {errors.api}
          </div>
        )}
        
        {/* Форма */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Поле Имя */}
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
              Ваше имя
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 ${
                errors.name 
                  ? 'border-red-300 focus:ring-red-200' 
                  : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
              }`}
              placeholder="Иван Иванов"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>
          
          {/* Поле Email */}
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 ${
                errors.email 
                  ? 'border-red-300 focus:ring-red-200' 
                  : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
              }`}
              placeholder="example@mail.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>
          
          {/* Поле Пароль */}
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
              Пароль
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 ${
                errors.password 
                  ? 'border-red-300 focus:ring-red-200' 
                  : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
              }`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>
          
          {/* Подтверждение пароля */}
          <div>
            <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-gray-700">
              Подтвердите пароль
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 ${
                errors.confirmPassword 
                  ? 'border-red-300 focus:ring-red-200' 
                  : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
              }`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
          
          {/* Чекбокс согласия */}
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-medium text-gray-700">
                Я согласен с{' '}
                <a href="login" className="text-indigo-600 hover:text-indigo-500 hover:underline">
                  условиями использования
                </a>
              </label>
            </div>
          </div>
          
          {/* Кнопка регистрации */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isLoading ? (
              <>
                <svg className="-ml-1 mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Регистрация...
              </>
            ) : (
              'Зарегистрироваться'
            )}
          </button>
        </form>
        
        {/* Ссылка на вход */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Уже есть аккаунт?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
