import { useState } from 'react';
import { useNavigate } from 'react-router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email обязателен';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email некорректен';
    
    if (!password) newErrors.password = 'Пароль обязателен';
    else if (password.length < 6) newErrors.password = 'Пароль должен быть не менее 6 символов';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsLoading(true);
    try {
      // Здесь будет запрос к API
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/dashboard');
    } catch (error) {
      setErrors({ api: 'Неверный email или пароль' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Декоративные элементы */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-100 opacity-70 mix-blend-multiply blur-xl"></div>
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-100 opacity-70 mix-blend-multiply blur-xl"></div>
      
      {/* Карточка входа */}
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Заголовок */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Добро пожаловать</h1>
          <p className="mt-2 text-gray-600">Введите свои данные для входа</p>
        </div>
        
        {/* Ошибки API */}
        {errors.api && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {errors.api}
          </div>
        )}
        
        {/* Форма */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Поле Email */}
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          
          {/* Дополнительные опции */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex cursor-pointer items-center space-x-2 text-gray-600">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <span>Запомнить меня</span>
            </label>
            <a href="/forgot-password" className="text-indigo-600 hover:text-indigo-500 hover:underline">
              Забыли пароль?
            </a>
          </div>
          
          {/* Кнопка входа */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isLoading ? (
              <>
                <svg className="-ml-1 mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Обработка...
              </>
            ) : (
              'Войти'
            )}
          </button>
        </form>
        
        {/* Футер с ссылкой на регистрацию */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Ещё нет аккаунта?{' '}
          <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">
            Зарегистрироваться
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;