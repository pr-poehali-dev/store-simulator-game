import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

// Типы данных
interface Product {
  id: string;
  name: string;
  category: 'vegetables' | 'fruits' | 'electronics' | 'cars';
  buyPrice: number;
  sellPrice: number;
  stock: number;
  image: string;
  description: string;
  unlocked: boolean;
}

interface Quest {
  id: string;
  title: string;
  description: string;
  requirement: number;
  reward: number;
  type: 'sales' | 'revenue' | 'purchase';
  isVip: boolean;
  completed: boolean;
}

interface GameStats {
  totalSales: number;
  totalRevenue: number;
  currentLevel: number;
  money: number;
  himCoins: number;
  experience: number;
  hasVipSubscription: boolean;
  hasUltraSubscription: boolean;
  vipExpiresAt: number;
  ultraExpiresAt: number;
  totalPurchases: number;
}

interface Subscription {
  name: string;
  price: number;
  duration: number;
  benefits: string[];
  icon: string;
}

// Данные товаров
const VEGETABLES: Product[] = [
  { id: 'v1', name: 'Помидоры', category: 'vegetables', buyPrice: 50, sellPrice: 80, stock: 20, image: '🍅', description: 'Свежие красные помидоры', unlocked: true },
  { id: 'v2', name: 'Огурцы', category: 'vegetables', buyPrice: 40, sellPrice: 65, stock: 25, image: '🥒', description: 'Хрустящие зеленые огурцы', unlocked: true },
  { id: 'v3', name: 'Морковь', category: 'vegetables', buyPrice: 30, sellPrice: 50, stock: 30, image: '🥕', description: 'Сладкая оранжевая морковь', unlocked: true },
  { id: 'v4', name: 'Капуста', category: 'vegetables', buyPrice: 35, sellPrice: 55, stock: 15, image: '🥬', description: 'Белокочанная капуста', unlocked: true },
  { id: 'v5', name: 'Картофель', category: 'vegetables', buyPrice: 25, sellPrice: 40, stock: 50, image: '🥔', description: 'Молодой картофель', unlocked: true },
  { id: 'v6', name: 'Лук', category: 'vegetables', buyPrice: 20, sellPrice: 35, stock: 40, image: '🧅', description: 'Репчатый лук', unlocked: true },
  { id: 'v7', name: 'Перец', category: 'vegetables', buyPrice: 60, sellPrice: 95, stock: 18, image: '🌶️', description: 'Болгарский перец', unlocked: true },
  { id: 'v8', name: 'Баклажаны', category: 'vegetables', buyPrice: 70, sellPrice: 110, stock: 12, image: '🍆', description: 'Фиолетовые баклажаны', unlocked: true },
  { id: 'v9', name: 'Кабачки', category: 'vegetables', buyPrice: 45, sellPrice: 70, stock: 22, image: '🥒', description: 'Молодые кабачки', unlocked: true },
  { id: 'v10', name: 'Свекла', category: 'vegetables', buyPrice: 35, sellPrice: 55, stock: 28, image: '🍠', description: 'Сладкая красная свекла', unlocked: true },
];

const FRUITS: Product[] = [
  { id: 'f1', name: 'Яблоки', category: 'fruits', buyPrice: 60, sellPrice: 90, stock: 30, image: '🍎', description: 'Сочные красные яблоки', unlocked: true },
  { id: 'f2', name: 'Бананы', category: 'fruits', buyPrice: 80, sellPrice: 120, stock: 25, image: '🍌', description: 'Спелые желтые бананы', unlocked: true },
  { id: 'f3', name: 'Апельсины', category: 'fruits', buyPrice: 70, sellPrice: 105, stock: 20, image: '🍊', description: 'Сладкие апельсины', unlocked: true },
  { id: 'f4', name: 'Груши', category: 'fruits', buyPrice: 65, sellPrice: 95, stock: 18, image: '🍐', description: 'Сочные груши', unlocked: true },
  { id: 'f5', name: 'Виноград', category: 'fruits', buyPrice: 120, sellPrice: 180, stock: 15, image: '🍇', description: 'Кисло-сладкий виноград', unlocked: true },
  { id: 'f6', name: 'Киви', category: 'fruits', buyPrice: 100, sellPrice: 150, stock: 12, image: '🥝', description: 'Экзотические киви', unlocked: true },
  { id: 'f7', name: 'Манго', category: 'fruits', buyPrice: 200, sellPrice: 280, stock: 8, image: '🥭', description: 'Тропические манго', unlocked: true },
  { id: 'f8', name: 'Ананасы', category: 'fruits', buyPrice: 250, sellPrice: 350, stock: 6, image: '🍍', description: 'Сладкие ананасы', unlocked: true },
  { id: 'f9', name: 'Персики', category: 'fruits', buyPrice: 90, sellPrice: 135, stock: 16, image: '🍑', description: 'Нежные персики', unlocked: true },
  { id: 'f10', name: 'Клубника', category: 'fruits', buyPrice: 150, sellPrice: 220, stock: 10, image: '🍓', description: 'Сладкая клубника', unlocked: true },
  { id: 'f11', name: 'Арбуз', category: 'fruits', buyPrice: 80, sellPrice: 120, stock: 8, image: '🍉', description: 'Сочный арбуз', unlocked: true },
  { id: 'f12', name: 'Лимоны', category: 'fruits', buyPrice: 55, sellPrice: 85, stock: 20, image: '🍋', description: 'Кислые лимоны', unlocked: true },
];

const ELECTRONICS: Product[] = [
  { id: 'e1', name: 'iPhone 15', category: 'electronics', buyPrice: 80000, sellPrice: 95000, stock: 5, image: '📱', description: 'Новейший смартфон Apple', unlocked: false },
  { id: 'e2', name: 'Samsung Galaxy S24', category: 'electronics', buyPrice: 75000, sellPrice: 88000, stock: 4, image: '📱', description: 'Флагман Samsung', unlocked: false },
  { id: 'e3', name: 'MacBook Pro', category: 'electronics', buyPrice: 150000, sellPrice: 175000, stock: 2, image: '💻', description: 'Профессиональный ноутбук', unlocked: false },
  { id: 'e4', name: 'iPad Air', category: 'electronics', buyPrice: 60000, sellPrice: 72000, stock: 6, image: '📟', description: 'Планшет для творчества', unlocked: false },
  { id: 'e5', name: 'AirPods Pro', category: 'electronics', buyPrice: 25000, sellPrice: 30000, stock: 10, image: '🎧', description: 'Беспроводные наушники', unlocked: false },
  { id: 'e6', name: 'PlayStation 5', category: 'electronics', buyPrice: 50000, sellPrice: 60000, stock: 3, image: '🎮', description: 'Игровая консоль Sony', unlocked: false },
  { id: 'e7', name: 'Nintendo Switch', category: 'electronics', buyPrice: 30000, sellPrice: 36000, stock: 7, image: '🎮', description: 'Портативная консоль', unlocked: false },
  { id: 'e8', name: 'Apple Watch', category: 'electronics', buyPrice: 35000, sellPrice: 42000, stock: 8, image: '⌚', description: 'Умные часы Apple', unlocked: false },
  { id: 'e9', name: 'Samsung TV 4K', category: 'electronics', buyPrice: 100000, sellPrice: 120000, stock: 2, image: '📺', description: '65" Smart TV', unlocked: false },
  { id: 'e10', name: 'Dyson V15', category: 'electronics', buyPrice: 45000, sellPrice: 54000, stock: 4, image: '🔌', description: 'Беспроводной пылесос', unlocked: false },
  { id: 'e11', name: 'iPhone 15 Pro Max', category: 'electronics', buyPrice: 130000, sellPrice: 150000, stock: 3, image: '📱', description: 'Топовый iPhone', unlocked: false },
  { id: 'e12', name: 'Meta Quest 3', category: 'electronics', buyPrice: 60000, sellPrice: 75000, stock: 5, image: '🥽', description: 'VR гарнитура', unlocked: false },
  { id: 'e13', name: 'Steam Deck OLED', category: 'electronics', buyPrice: 50000, sellPrice: 60000, stock: 4, image: '🎮', description: 'Портативная консоль', unlocked: false },
  { id: 'e14', name: 'Canon EOS R5', category: 'electronics', buyPrice: 300000, sellPrice: 350000, stock: 1, image: '📷', description: 'Профессиональная камера', unlocked: false },
  { id: 'e15', name: 'Tesla Model S', category: 'electronics', buyPrice: 8000000, sellPrice: 9500000, stock: 1, image: '🚗', description: 'Электромобиль премиум', unlocked: false },
  // Добавлено 35+ дополнительных товаров техники
  { id: 'e16', name: 'Xbox Series X', category: 'electronics', buyPrice: 50000, sellPrice: 60000, stock: 4, image: '🎮', description: 'Игровая консоль Microsoft', unlocked: false },
  { id: 'e17', name: 'AirPods Max', category: 'electronics', buyPrice: 60000, sellPrice: 72000, stock: 4, image: '🎧', description: 'Премиум наушники Apple', unlocked: false },
  { id: 'e18', name: 'iMac 24" M3', category: 'electronics', buyPrice: 150000, sellPrice: 180000, stock: 2, image: '🖥️', description: 'Моноблок Apple', unlocked: false },
  { id: 'e19', name: 'Sony A7R V', category: 'electronics', buyPrice: 400000, sellPrice: 480000, stock: 1, image: '📷', description: 'Профессиональная камера Sony', unlocked: false },
  { id: 'e20', name: 'Nintendo Switch OLED', category: 'electronics', buyPrice: 35000, sellPrice: 42000, stock: 6, image: '🎮', description: 'Улучшенная Switch', unlocked: false },
  { id: 'e21', name: 'Tesla Model 3', category: 'electronics', buyPrice: 4000000, sellPrice: 4800000, stock: 1, image: '🚗', description: 'Популярный электрокар', unlocked: false },
  { id: 'e22', name: 'Mac Studio', category: 'electronics', buyPrice: 250000, sellPrice: 300000, stock: 2, image: '💻', description: 'Мощный Mac для профи', unlocked: false },
  { id: 'e23', name: 'LG OLED C3 55"', category: 'electronics', buyPrice: 150000, sellPrice: 180000, stock: 2, image: '📺', description: 'OLED телевизор LG', unlocked: false },
  { id: 'e24', name: 'Framework Laptop', category: 'electronics', buyPrice: 100000, sellPrice: 120000, stock: 3, image: '💻', description: 'Модульный ноутбук', unlocked: false },
  { id: 'e25', name: 'Steam Controller', category: 'electronics', buyPrice: 8000, sellPrice: 10000, stock: 20, image: '🎮', description: 'Геймпад Steam', unlocked: false },
  { id: 'e26', name: 'Razer Blade 15', category: 'electronics', buyPrice: 200000, sellPrice: 240000, stock: 2, image: '💻', description: 'Игровой ноутбук', unlocked: false },
  { id: 'e27', name: 'Elgato Stream Deck', category: 'electronics', buyPrice: 15000, sellPrice: 18000, stock: 8, image: '🎛️', description: 'Панель для стримеров', unlocked: false },
  { id: 'e28', name: 'Asus ROG Phone 8', category: 'electronics', buyPrice: 80000, sellPrice: 96000, stock: 3, image: '📱', description: 'Игровой смартфон', unlocked: false },
  { id: 'e29', name: 'Valve Index VR Kit', category: 'electronics', buyPrice: 120000, sellPrice: 144000, stock: 2, image: '🥽', description: 'VR система Valve', unlocked: false },
  { id: 'e30', name: 'DJI Air 3', category: 'electronics', buyPrice: 120000, sellPrice: 140000, stock: 2, image: '🚁', description: 'Дрон с 4K камерой', unlocked: false },
  { id: 'e31', name: 'Rolex Submariner', category: 'electronics', buyPrice: 1200000, sellPrice: 1500000, stock: 1, image: '⌚', description: 'Швейцарские часы', unlocked: false },
  { id: 'e32', name: 'MacBook Pro M3 Max', category: 'electronics', buyPrice: 400000, sellPrice: 480000, stock: 2, image: '💻', description: 'Топовый ноутбук Apple', unlocked: false },
  { id: 'e33', name: 'Samsung QLED 85"', category: 'electronics', buyPrice: 500000, sellPrice: 600000, stock: 1, image: '📺', description: 'Огромный Smart TV', unlocked: false },
  { id: 'e34', name: 'Bose QuietComfort', category: 'electronics', buyPrice: 35000, sellPrice: 42000, stock: 8, image: '🎧', description: 'Наушники с шумодавом', unlocked: false },
  { id: 'e35', name: 'Microsoft Surface Pro', category: 'electronics', buyPrice: 100000, sellPrice: 120000, stock: 3, image: '💻', description: 'Планшет-ноутбук', unlocked: false },
  { id: 'e36', name: 'GoPro Hero 12', category: 'electronics', buyPrice: 45000, sellPrice: 54000, stock: 6, image: '📹', description: 'Экшн-камера', unlocked: false },
  { id: 'e37', name: 'HomePod', category: 'electronics', buyPrice: 30000, sellPrice: 36000, stock: 5, image: '🔊', description: 'Умная колонка Apple', unlocked: false },
  { id: 'e38', name: 'Kindle Oasis', category: 'electronics', buyPrice: 25000, sellPrice: 30000, stock: 10, image: '📖', description: 'Электронная книга', unlocked: false },
  { id: 'e39', name: 'Ring Doorbell Pro', category: 'electronics', buyPrice: 20000, sellPrice: 25000, stock: 8, image: '🔔', description: 'Умный дверной звонок', unlocked: false },
  { id: 'e40', name: 'Sonos Arc', category: 'electronics', buyPrice: 80000, sellPrice: 95000, stock: 3, image: '🔊', description: 'Саундбар премиум', unlocked: false },
  { id: 'e41', name: 'Apple Studio Display', category: 'electronics', buyPrice: 180000, sellPrice: 210000, stock: 2, image: '🖥️', description: 'Профессиональный монитор', unlocked: false },
  { id: 'e42', name: 'AirTag 4-pack', category: 'electronics', buyPrice: 12000, sellPrice: 15000, stock: 15, image: '🏷️', description: 'Трекеры Apple', unlocked: false },
  { id: 'e43', name: 'Tesla Cybertruck', category: 'electronics', buyPrice: 6000000, sellPrice: 7200000, stock: 1, image: '🚛', description: 'Электропикап будущего', unlocked: false },
  { id: 'e44', name: 'Magic Keyboard', category: 'electronics', buyPrice: 35000, sellPrice: 42000, stock: 8, image: '⌨️', description: 'Клавиатура для iPad', unlocked: false },
  { id: 'e45', name: 'Apple Pencil Pro', category: 'electronics', buyPrice: 15000, sellPrice: 18000, stock: 12, image: '✏️', description: 'Стилус для iPad', unlocked: false },
  { id: 'e46', name: 'Dyson Airwrap', category: 'electronics', buyPrice: 50000, sellPrice: 60000, stock: 4, image: '💨', description: 'Стайлер для волос', unlocked: false },
  { id: 'e47', name: 'Philips Hue Starter Kit', category: 'electronics', buyPrice: 15000, sellPrice: 18000, stock: 10, image: '💡', description: 'Умное освещение', unlocked: false },
  { id: 'e48', name: 'Oculus Rift S', category: 'electronics', buyPrice: 40000, sellPrice: 48000, stock: 3, image: '🥽', description: 'VR гарнитура для ПК', unlocked: false },
  { id: 'e49', name: 'Surface Studio', category: 'electronics', buyPrice: 350000, sellPrice: 420000, stock: 1, image: '🖥️', description: 'Творческий компьютер', unlocked: false },
  { id: 'e50', name: 'iPad Pro 12.9"', category: 'electronics', buyPrice: 120000, sellPrice: 140000, stock: 3, image: '📱', description: 'Большой iPad Pro', unlocked: false }
];

const CARS: Product[] = [
  { id: 'c1', name: 'Toyota Camry', category: 'cars', buyPrice: 800000, sellPrice: 950000, stock: 0, image: '🚗', description: 'Седан после ремонта', unlocked: false },
  { id: 'c2', name: 'BMW X5', category: 'cars', buyPrice: 1500000, sellPrice: 1800000, stock: 0, image: '🚙', description: 'Кроссовер после ремонта', unlocked: false },
  { id: 'c3', name: 'Mercedes E-Class', category: 'cars', buyPrice: 1200000, sellPrice: 1450000, stock: 0, image: '🚗', description: 'Бизнес-седан после ремонта', unlocked: false },
  { id: 'c4', name: 'Audi Q7', category: 'cars', buyPrice: 1800000, sellPrice: 2100000, stock: 0, image: '🚙', description: 'Премиум кроссовер', unlocked: false },
  { id: 'c5', name: 'Ford Focus', category: 'cars', buyPrice: 600000, sellPrice: 720000, stock: 0, image: '🚗', description: 'Компактный седан', unlocked: false },
  { id: 'c6', name: 'Hyundai Tucson', category: 'cars', buyPrice: 1000000, sellPrice: 1200000, stock: 0, image: '🚙', description: 'Кроссовер Hyundai', unlocked: false },
  { id: 'c7', name: 'Volkswagen Tiguan', category: 'cars', buyPrice: 1300000, sellPrice: 1560000, stock: 0, image: '🚙', description: 'Немецкий кроссовер', unlocked: false },
  { id: 'c8', name: 'Honda Civic', category: 'cars', buyPrice: 700000, sellPrice: 840000, stock: 0, image: '🚗', description: 'Надежный седан', unlocked: false },
];

const QUESTS: Quest[] = [
  // Обычные квесты
  { id: 'q1', title: 'Первые шаги', description: 'Продать 5 товаров', requirement: 5, reward: 50, type: 'sales', isVip: false, completed: false },
  { id: 'q2', title: 'Торговец', description: 'Заработать 5000₽', requirement: 5000, reward: 75, type: 'revenue', isVip: false, completed: false },
  { id: 'q3', title: 'Инвестор', description: 'Купить товары на 10000₽', requirement: 10000, reward: 100, type: 'purchase', isVip: false, completed: false },
  { id: 'q4', title: 'Большой торговец', description: 'Продать 25 товаров', requirement: 25, reward: 150, type: 'sales', isVip: false, completed: false },
  
  // VIP квесты
  { id: 'vq1', title: 'VIP Продажи', description: 'Продать 50 товаров', requirement: 50, reward: 100, type: 'sales', isVip: true, completed: false },
  { id: 'vq2', title: 'VIP Доход', description: 'Заработать 50000₽', requirement: 50000, reward: 100, type: 'revenue', isVip: true, completed: false },
  { id: 'vq3', title: 'VIP Закупки', description: 'Купить товары на 75000₽', requirement: 75000, reward: 100, type: 'purchase', isVip: true, completed: false },
  { id: 'vq4', title: 'VIP Магнат', description: 'Продать 100 товаров', requirement: 100, reward: 200, type: 'sales', isVip: true, completed: false },
];

const ULTRA_QUESTS: Quest[] = [
  { id: 'uq1', title: 'Ultra Магнат', description: 'Продать 200 товаров', requirement: 200, reward: 300, type: 'sales', isVip: false, completed: false },
  { id: 'uq2', title: 'Ultra Империя', description: 'Заработать 500000₽', requirement: 500000, reward: 300, type: 'revenue', isVip: false, completed: false },
  { id: 'uq3', title: 'Ultra Инвестор', description: 'Купить товары на 300000₽', requirement: 300000, reward: 300, type: 'purchase', isVip: false, completed: false },
  { id: 'uq4', title: 'Ultra Король', description: 'Продать 500 товаров', requirement: 500, reward: 500, type: 'sales', isVip: false, completed: false },
];

const SUBSCRIPTIONS: Subscription[] = [
  {
    name: 'HimShop+',
    price: 500,
    duration: 7,
    benefits: ['50,000₽ бонус', 'Быстрые продажи x2', 'VIP квесты', 'Приоритет в закупках'],
    icon: '⭐'
  },
  {
    name: 'HimShop Ultra',
    price: 3499,
    duration: 7,
    benefits: ['Бесплатные овощи/фрукты до 100₽', 'Ultra квесты', 'Премиум товары', 'Эксклюзивные автомобили'],
    icon: '👑'
  }
];

export default function Index() {
  const [gameStats, setGameStats] = useState<GameStats>(() => {
    const saved = localStorage.getItem('himshop-game');
    if (saved) {
      const data = JSON.parse(saved);
      return {
        ...data,
        hasVipSubscription: data.vipExpiresAt > Date.now(),
        hasUltraSubscription: data.ultraExpiresAt > Date.now(),
        totalPurchases: data.totalPurchases || 0,
      };
    }
    return {
      totalSales: 0,
      totalRevenue: 0,
      currentLevel: 1,
      money: 1000,
      himCoins: 0,
      experience: 0,
      hasVipSubscription: false,
      hasUltraSubscription: false,
      vipExpiresAt: 0,
      ultraExpiresAt: 0,
      totalPurchases: 0
    };
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('himshop-products');
    if (saved) {
      return JSON.parse(saved);
    }
    return [...VEGETABLES, ...FRUITS, ...ELECTRONICS, ...CARS];
  });

  const [quests, setQuests] = useState<Quest[]>(() => {
    const saved = localStorage.getItem('himshop-quests');
    if (saved) {
      return JSON.parse(saved);
    }
    return [...QUESTS, ...ULTRA_QUESTS];
  });

  const [selectedBlock, setSelectedBlock] = useState('shop');
  const [notification, setNotification] = useState<string>('');

  // Автосохранение
  useEffect(() => {
    localStorage.setItem('himshop-game', JSON.stringify(gameStats));
  }, [gameStats]);

  useEffect(() => {
    localStorage.setItem('himshop-products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('himshop-quests', JSON.stringify(quests));
  }, [quests]);

  // Разблокировка уровней
  useEffect(() => {
    if (gameStats.totalSales >= 100 && gameStats.currentLevel === 1) {
      setGameStats(prev => ({ ...prev, currentLevel: 2 }));
      setProducts(prev => prev.map(p => 
        p.category === 'electronics' ? { ...p, unlocked: true } : p
      ));
      showNotification('🎉 Открыт уровень "Техника"!');
    }
    
    if (gameStats.totalSales >= 500 && gameStats.currentLevel === 2) {
      setGameStats(prev => ({ ...prev, currentLevel: 3 }));
      setProducts(prev => prev.map(p => 
        p.category === 'cars' ? { ...p, unlocked: true } : p
      ));
      showNotification('🚗 Открыт уровень "Автосервис"!');
    }
  }, [gameStats.totalSales]);

  // Проверка квестов
  useEffect(() => {
    setQuests(prev => prev.map(quest => {
      if (quest.completed) return quest;
      
      let currentValue = 0;
      switch (quest.type) {
        case 'sales':
          currentValue = gameStats.totalSales;
          break;
        case 'revenue':
          currentValue = gameStats.totalRevenue;
          break;
        case 'purchase':
          currentValue = gameStats.totalPurchases;
          break;
      }
      
      if (currentValue >= quest.requirement) {
        setGameStats(stats => ({ ...stats, himCoins: stats.himCoins + quest.reward }));
        showNotification(`🎊 Квест завершен: ${quest.title} (+${quest.reward} HimCoins)`);
        return { ...quest, completed: true };
      }
      
      return quest;
    }));
  }, [gameStats.totalSales, gameStats.totalRevenue, gameStats.totalPurchases]);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 4000);
  };

  const sellProduct = (productId: string) => {
    setProducts(prev => prev.map(product => {
      if (product.id === productId && product.stock > 0) {
        const profit = product.sellPrice - product.buyPrice;
        const sellSpeed = gameStats.hasVipSubscription ? 2 : 1;
        
        setGameStats(stats => ({
          ...stats,
          totalSales: stats.totalSales + sellSpeed,
          totalRevenue: stats.totalRevenue + (product.sellPrice * sellSpeed),
          money: stats.money + (profit * sellSpeed),
          himCoins: stats.himCoins + sellSpeed,
        }));

        showNotification(`Продано: ${product.name} (+${(profit * sellSpeed).toLocaleString()}₽, +${sellSpeed} HimCoins)`);
        
        return { ...product, stock: Math.max(0, product.stock - sellSpeed) };
      }
      return product;
    }));
  };

  const restockProduct = (productId: string, quantity: number = 10) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Ultra подписка дает бесплатные овощи и фрукты до 100₽
    const isFree = gameStats.hasUltraSubscription && 
                   (product.category === 'vegetables' || product.category === 'fruits') && 
                   product.buyPrice <= 100;
    
    const cost = isFree ? 0 : product.buyPrice * quantity;
    
    if (!isFree && gameStats.money < cost) {
      showNotification('Недостаточно средств для закупки!');
      return;
    }

    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, stock: p.stock + quantity } : p
    ));
    
    if (!isFree) {
      setGameStats(prev => ({ 
        ...prev, 
        money: prev.money - cost,
        totalPurchases: prev.totalPurchases + cost
      }));
    }
    
    showNotification(`Закуплено: ${product.name} x${quantity} ${isFree ? '(БЕСПЛАТНО Ultra!)' : `(-${cost.toLocaleString()}₽)`}`);
  };

  const buySubscription = (subscriptionName: string) => {
    const subscription = SUBSCRIPTIONS.find(s => s.name === subscriptionName);
    if (!subscription) return;

    if (gameStats.himCoins < subscription.price) {
      showNotification('Недостаточно HimCoins!');
      return;
    }

    const expiresAt = Date.now() + (subscription.duration * 24 * 60 * 60 * 1000);
    
    setGameStats(prev => ({
      ...prev,
      himCoins: prev.himCoins - subscription.price,
      money: subscriptionName === 'HimShop+' ? prev.money + 50000 : prev.money,
      hasVipSubscription: subscriptionName === 'HimShop+' ? true : prev.hasVipSubscription,
      hasUltraSubscription: subscriptionName === 'HimShop Ultra' ? true : prev.hasUltraSubscription,
      vipExpiresAt: subscriptionName === 'HimShop+' ? expiresAt : prev.vipExpiresAt,
      ultraExpiresAt: subscriptionName === 'HimShop Ultra' ? expiresAt : prev.ultraExpiresAt,
    }));

    showNotification(`🎉 Подписка ${subscriptionName} активирована!`);
  };

  const repairCar = (carId: string) => {
    const car = products.find(p => p.id === carId);
    if (!car || car.stock > 0) return;

    const repairCost = car.buyPrice;
    if (gameStats.money < repairCost) {
      showNotification('Недостаточно средств для ремонта!');
      return;
    }

    setProducts(prev => prev.map(p => 
      p.id === carId ? { ...p, stock: 1 } : p
    ));
    
    setGameStats(prev => ({ 
      ...prev, 
      money: prev.money - repairCost,
      totalPurchases: prev.totalPurchases + repairCost
    }));
    
    showNotification(`🔧 ${car.name} отремонтирован! (-${repairCost.toLocaleString()}₽)`);
  };

  const availableProducts = products.filter(p => p.unlocked);
  const vegetables = availableProducts.filter(p => p.category === 'vegetables');
  const fruits = availableProducts.filter(p => p.category === 'fruits');
  const electronics = availableProducts.filter(p => p.category === 'electronics');
  const cars = availableProducts.filter(p => p.category === 'cars');

  const blocks = [
    { id: 'shop', name: 'Торговля', icon: 'Store', description: 'Продажа товаров', color: 'bg-blue-500' },
    { id: 'inventory', name: 'Склад', icon: 'Package', description: 'Управление запасами', color: 'bg-green-500' },
    { id: 'purchase', name: 'Закупка', icon: 'ShoppingBag', description: 'Пополнение товаров', color: 'bg-purple-500' },
    { id: 'subscriptions', name: 'Подписки', icon: 'Crown', description: 'Premium возможности', color: 'bg-yellow-500' },
  ];

  if (gameStats.hasVipSubscription) {
    blocks.push({ id: 'vip', name: 'VIP', icon: 'Star', description: 'Эксклюзивные квесты', color: 'bg-orange-500' });
  }

  if (gameStats.hasUltraSubscription) {
    blocks.push({ id: 'ultra', name: 'Ultra', icon: 'Gem', description: 'Ультра возможности', color: 'bg-pink-500' });
  }

  if (gameStats.currentLevel >= 3) {
    blocks.push({ id: 'autoservice', name: 'Автосервис', icon: 'Car', description: 'Ремонт автомобилей', color: 'bg-red-500' });
  }

  blocks.push({ id: 'stats', name: 'Статистика', icon: 'BarChart3', description: 'Аналитика и достижения', color: 'bg-slate-500' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Уведомления */}
        {notification && (
          <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg shadow-xl animate-bounce">
            {notification}
          </div>
        )}

        {/* Заголовок и валюты */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-slate-800 flex items-center justify-center gap-3">
            <Icon name="Store" size={50} className="text-blue-600" />
            HimShop Simulator
          </h1>
          <div className="flex justify-center gap-6 flex-wrap">
            <div className="bg-white rounded-lg p-4 shadow-md min-w-[120px]">
              <div className="text-2xl font-bold text-green-600">{gameStats.money.toLocaleString()}₽</div>
              <div className="text-sm text-slate-600">Баланс</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-4 shadow-md min-w-[120px]">
              <div className="text-2xl font-bold">{gameStats.himCoins}</div>
              <div className="text-sm">HimCoins</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md min-w-[120px]">
              <div className="text-2xl font-bold text-blue-600">Уровень {gameStats.currentLevel}</div>
              <div className="text-sm text-slate-600">
                {gameStats.currentLevel === 1 ? 'Овощи/Фрукты' : 
                 gameStats.currentLevel === 2 ? 'Техника' : 'Автосервис'}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md min-w-[120px]">
              <div className="text-2xl font-bold text-orange-600">{gameStats.totalSales}</div>
              <div className="text-sm text-slate-600">Продажи</div>
            </div>
          </div>
          
          {/* Подписки статус */}
          <div className="flex justify-center gap-4 flex-wrap">
            {gameStats.hasVipSubscription && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2">
                ⭐ HimShop+ активна
              </Badge>
            )}
            {gameStats.hasUltraSubscription && (
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2">
                👑 HimShop Ultra активна
              </Badge>
            )}
          </div>

          {/* Прогресс до следующего уровня */}
          {gameStats.currentLevel < 3 && (
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm mb-2">
                <span>До уровня {gameStats.currentLevel + 1}</span>
                <span>{gameStats.totalSales}/{gameStats.currentLevel === 1 ? 100 : 500} продаж</span>
              </div>
              <Progress 
                value={gameStats.currentLevel === 1 ? 
                  Math.min((gameStats.totalSales / 100) * 100, 100) :
                  Math.min(((gameStats.totalSales - 100) / 400) * 100, 100)
                } 
                className="h-3" 
              />
            </div>
          )}
        </div>

        {/* Блоки навигации */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {blocks.map(block => (
            <Card 
              key={block.id}
              className={`cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                selectedBlock === block.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => setSelectedBlock(block.id)}
            >
              <CardHeader className="text-center pb-2 pt-4">
                <div className={`w-12 h-12 rounded-full ${block.color} flex items-center justify-center mx-auto mb-2`}>
                  <Icon name={block.icon as any} size={24} className="text-white" />
                </div>
                <CardTitle className="text-lg">{block.name}</CardTitle>
                <CardDescription className="text-xs">{block.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Контент блоков */}
        <div className="space-y-6">
          {/* Торговля */}
          {selectedBlock === 'shop' && (
            <div className="space-y-8">
              {/* Овощи */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Icon name="Carrot" size={32} className="text-orange-500" />
                  Овощи
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {vegetables.map(product => (
                    <Card key={product.id} className="hover:shadow-lg transition-all duration-200 hover:scale-105">
                      <CardHeader className="text-center pb-2">
                        <div className="text-4xl mb-2">{product.image}</div>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <CardDescription className="text-xs">{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-green-600">{product.sellPrice.toLocaleString()}₽</span>
                          <Badge variant={product.stock > 0 ? 'default' : 'destructive'}>
                            {product.stock} шт
                          </Badge>
                        </div>
                        <Button 
                          onClick={() => sellProduct(product.id)}
                          disabled={product.stock === 0}
                          className="w-full"
                          size="sm"
                        >
                          <Icon name="ShoppingCart" size={16} className="mr-2" />
                          Продать {gameStats.hasVipSubscription ? 'x2' : ''}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Фрукты */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Icon name="Apple" size={32} className="text-red-500" />
                  Фрукты
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {fruits.map(product => (
                    <Card key={product.id} className="hover:shadow-lg transition-all duration-200 hover:scale-105 border-red-200">
                      <CardHeader className="text-center pb-2">
                        <div className="text-4xl mb-2">{product.image}</div>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <CardDescription className="text-xs">{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-red-600">{product.sellPrice.toLocaleString()}₽</span>
                          <Badge variant={product.stock > 0 ? 'default' : 'destructive'}>
                            {product.stock} шт
                          </Badge>
                        </div>
                        <Button 
                          onClick={() => sellProduct(product.id)}
                          disabled={product.stock === 0}
                          className="w-full"
                          size="sm"
                        >
                          <Icon name="ShoppingCart" size={16} className="mr-2" />
                          Продать {gameStats.hasVipSubscription ? 'x2' : ''}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Техника */}
              {gameStats.currentLevel >= 2 && (
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold flex items-center gap-3">
                    <Icon name="Smartphone" size={32} className="text-blue-500" />
                    Техника
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {electronics.slice(0, 20).map(product => (
                      <Card key={product.id} className="hover:shadow-lg transition-all duration-200 hover:scale-105 border-blue-200">
                        <CardHeader className="text-center pb-2">
                          <div className="text-4xl mb-2">{product.image}</div>
                          <CardTitle className="text-lg">{product.name}</CardTitle>
                          <CardDescription className="text-xs">{product.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-blue-600">{product.sellPrice.toLocaleString()}₽</span>
                            <Badge variant={product.stock > 0 ? 'default' : 'destructive'}>
                              {product.stock} шт
                            </Badge>
                          </div>
                          <Button 
                            onClick={() => sellProduct(product.id)}
                            disabled={product.stock === 0}
                            className="w-full"
                            size="sm"
                          >
                            <Icon name="ShoppingCart" size={16} className="mr-2" />
                            Продать {gameStats.hasVipSubscription ? 'x2' : ''}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Склад */}
          {selectedBlock === 'inventory' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Package" size={24} />
                  Управление складом
                </CardTitle>
                <CardDescription>Отслеживайте остатки товаров</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {availableProducts.filter(p => p.stock > 0 || p.category === 'cars').map(product => (
                    <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{product.image}</span>
                        <div>
                          <div className="font-semibold">{product.name}</div>
                          <div className="text-sm text-slate-600">{product.sellPrice.toLocaleString()}₽</div>
                        </div>
                      </div>
                      <Badge variant={product.stock > 5 ? 'default' : product.stock > 0 ? 'secondary' : 'destructive'}>
                        {product.stock} шт
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Закупка */}
          {selectedBlock === 'purchase' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="ShoppingBag" size={24} />
                  Закупка товаров
                </CardTitle>
                <CardDescription>Пополните запасы для продажи</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {availableProducts.map(product => (
                    <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{product.image}</span>
                        <div>
                          <div className="font-semibold flex items-center gap-2">
                            {product.name}
                            {gameStats.hasUltraSubscription && 
                             (product.category === 'vegetables' || product.category === 'fruits') && 
                             product.buyPrice <= 100 && (
                              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                                БЕСПЛАТНО
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-slate-600">
                            Закупочная цена: {product.buyPrice.toLocaleString()}₽ | 
                            Прибыль: {(product.sellPrice - product.buyPrice).toLocaleString()}₽
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          onClick={() => restockProduct(product.id, 5)}
                          size="sm"
                          variant="outline"
                          disabled={!gameStats.hasUltraSubscription && 
                                   !((product.category === 'vegetables' || product.category === 'fruits') && product.buyPrice <= 100) &&
                                   gameStats.money < product.buyPrice * 5}
                        >
                          +5
                        </Button>
                        <Button 
                          onClick={() => restockProduct(product.id, 10)}
                          size="sm"
                          disabled={!gameStats.hasUltraSubscription && 
                                   !((product.category === 'vegetables' || product.category === 'fruits') && product.buyPrice <= 100) &&
                                   gameStats.money < product.buyPrice * 10}
                        >
                          +10
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Подписки */}
          {selectedBlock === 'subscriptions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SUBSCRIPTIONS.map(subscription => (
                <Card key={subscription.name} className="relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    subscription.name === 'HimShop+' 
                      ? 'from-yellow-400/10 to-orange-500/10' 
                      : 'from-purple-500/10 to-pink-500/10'
                  }`} />
                  <CardHeader className="relative">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <span className="text-3xl">{subscription.icon}</span>
                      {subscription.name}
                    </CardTitle>
                    <CardDescription>
                      {subscription.price} HimCoins на {subscription.duration} дней
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative space-y-4">
                    <div className="space-y-2">
                      {subscription.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Icon name="Check" size={16} className="text-green-500" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    <Button 
                      onClick={() => buySubscription(subscription.name)}
                      disabled={gameStats.himCoins < subscription.price || 
                               (subscription.name === 'HimShop+' && gameStats.hasVipSubscription) ||
                               (subscription.name === 'HimShop Ultra' && gameStats.hasUltraSubscription)}
                      className="w-full"
                    >
                      {(subscription.name === 'HimShop+' && gameStats.hasVipSubscription) ||
                       (subscription.name === 'HimShop Ultra' && gameStats.hasUltraSubscription)
                        ? 'Уже активна' 
                        : `Купить за ${subscription.price} HimCoins`}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* VIP блок */}
          {selectedBlock === 'vip' && gameStats.hasVipSubscription && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-yellow-600 flex items-center justify-center gap-3">
                  ⭐ VIP Квесты ⭐
                </h2>
                <p className="text-slate-600">Эксклюзивные задания для VIP подписчиков</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quests.filter(q => q.isVip).map(quest => (
                  <Card key={quest.id} className={`${quest.completed ? 'bg-green-50 border-green-200' : ''}`}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {quest.title}
                        {quest.completed && <Icon name="Check" className="text-green-500" size={20} />}
                      </CardTitle>
                      <CardDescription>{quest.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">
                          Прогресс: {Math.min(
                            quest.type === 'sales' ? gameStats.totalSales :
                            quest.type === 'revenue' ? gameStats.totalRevenue :
                            gameStats.totalPurchases,
                            quest.requirement
                          )}/{quest.requirement}
                        </span>
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                          +{quest.reward} HimCoins
                        </Badge>
                      </div>
                      <Progress 
                        value={Math.min((
                          (quest.type === 'sales' ? gameStats.totalSales :
                           quest.type === 'revenue' ? gameStats.totalRevenue :
                           gameStats.totalPurchases) / quest.requirement
                        ) * 100, 100)}
                        className="mt-2"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Ultra блок */}
          {selectedBlock === 'ultra' && gameStats.hasUltraSubscription && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent flex items-center justify-center gap-3">
                  👑 Ultra Квесты 👑
                </h2>
                <p className="text-slate-600">Самые прибыльные задания для Ultra подписчиков</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quests.filter(q => !q.isVip && q.reward >= 300).map(quest => (
                  <Card key={quest.id} className={`${quest.completed ? 'bg-purple-50 border-purple-200' : 'border-purple-200'}`}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {quest.title}
                        {quest.completed && <Icon name="Check" className="text-purple-500" size={20} />}
                      </CardTitle>
                      <CardDescription>{quest.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">
                          Прогресс: {Math.min(
                            quest.type === 'sales' ? gameStats.totalSales :
                            quest.type === 'revenue' ? gameStats.totalRevenue :
                            gameStats.totalPurchases,
                            quest.requirement
                          )}/{quest.requirement}
                        </span>
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                          +{quest.reward} HimCoins
                        </Badge>
                      </div>
                      <Progress 
                        value={Math.min((
                          (quest.type === 'sales' ? gameStats.totalSales :
                           quest.type === 'revenue' ? gameStats.totalRevenue :
                           gameStats.totalPurchases) / quest.requirement
                        ) * 100, 100)}
                        className="mt-2"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Автосервис */}
          {selectedBlock === 'autoservice' && gameStats.currentLevel >= 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-red-600 flex items-center justify-center gap-3">
                  <Icon name="Car" size={32} />
                  Автосервис
                </h2>
                <p className="text-slate-600">Ремонтируйте автомобили и продавайте их с прибылью</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cars.map(car => (
                  <Card key={car.id} className="hover:shadow-lg transition-all duration-200">
                    <CardHeader className="text-center">
                      <div className="text-4xl mb-2">{car.image}</div>
                      <CardTitle className="text-lg">{car.name}</CardTitle>
                      <CardDescription className="text-xs">{car.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-blue-600">{car.sellPrice.toLocaleString()}₽</span>
                        <Badge variant={car.stock > 0 ? 'default' : 'destructive'}>
                          {car.stock > 0 ? 'Готов к продаже' : 'Требует ремонта'}
                        </Badge>
                      </div>
                      <div className="text-sm text-slate-600">
                        Стоимость ремонта: {car.buyPrice.toLocaleString()}₽ | 
                        Прибыль: {(car.sellPrice - car.buyPrice).toLocaleString()}₽
                      </div>
                      {car.stock === 0 ? (
                        <Button 
                          onClick={() => repairCar(car.id)}
                          disabled={gameStats.money < car.buyPrice}
                          className="w-full"
                          size="sm"
                        >
                          <Icon name="Wrench" size={16} className="mr-2" />
                          Отремонтировать
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => sellProduct(car.id)}
                          className="w-full"
                          size="sm"
                        >
                          <Icon name="ShoppingCart" size={16} className="mr-2" />
                          Продать {gameStats.hasVipSubscription ? 'x2' : ''}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Статистика */}
          {selectedBlock === 'stats' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Достижения */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Trophy" size={24} className="text-yellow-500" />
                      Достижения
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className={`p-4 rounded-lg border-2 ${gameStats.totalSales >= 10 ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🏪</span>
                        <div>
                          <div className="font-semibold">Первые продажи</div>
                          <div className="text-sm text-gray-600">Продать 10 товаров</div>
                        </div>
                        {gameStats.totalSales >= 10 && <Icon name="Check" className="text-green-500 ml-auto" size={20} />}
                      </div>
                    </div>
                    
                    <div className={`p-4 rounded-lg border-2 ${gameStats.totalRevenue >= 10000 ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">💰</span>
                        <div>
                          <div className="font-semibold">Первая тысяча</div>
                          <div className="text-sm text-gray-600">Заработать 10,000₽</div>
                        </div>
                        {gameStats.totalRevenue >= 10000 && <Icon name="Check" className="text-green-500 ml-auto" size={20} />}
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg border-2 ${gameStats.currentLevel >= 2 ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📱</span>
                        <div>
                          <div className="font-semibold">Торговец техникой</div>
                          <div className="text-sm text-gray-600">Открыть уровень "Техника"</div>
                        </div>
                        {gameStats.currentLevel >= 2 && <Icon name="Check" className="text-green-500 ml-auto" size={20} />}
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg border-2 ${gameStats.currentLevel >= 3 ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🚗</span>
                        <div>
                          <div className="font-semibold">Автомеханик</div>
                          <div className="text-sm text-gray-600">Открыть уровень "Автосервис"</div>
                        </div>
                        {gameStats.currentLevel >= 3 && <Icon name="Check" className="text-green-500 ml-auto" size={20} />}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Аналитика */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="BarChart3" size={24} className="text-blue-500" />
                      Аналитика
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">{gameStats.totalSales}</div>
                        <div className="text-xs text-gray-600">Общие продажи</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-xl font-bold text-green-600">
                          {gameStats.totalSales > 0 ? Math.round(gameStats.totalRevenue / gameStats.totalSales) : 0}₽
                        </div>
                        <div className="text-xs text-gray-600">Средний чек</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-xl font-bold text-purple-600">{vegetables.reduce((acc, p) => acc + p.stock, 0)}</div>
                        <div className="text-xs text-gray-600">Овощи на складе</div>
                      </div>
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <div className="text-xl font-bold text-red-600">{fruits.reduce((acc, p) => acc + p.stock, 0)}</div>
                        <div className="text-xs text-gray-600">Фрукты на складе</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="text-xl font-bold text-orange-600">{electronics.reduce((acc, p) => acc + p.stock, 0)}</div>
                        <div className="text-xs text-gray-600">Техника на складе</div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-xl font-bold text-slate-600">{cars.reduce((acc, p) => acc + p.stock, 0)}</div>
                        <div className="text-xs text-gray-600">Авто готовы</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Квесты */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Target" size={24} className="text-green-500" />
                    Обычные квесты
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quests.filter(q => !q.isVip && q.reward < 300).map(quest => (
                      <div key={quest.id} className={`p-4 rounded-lg border-2 ${quest.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{quest.title}</h4>
                          {quest.completed && <Icon name="Check" className="text-green-500" size={20} />}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{quest.description}</p>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">
                            {Math.min(
                              quest.type === 'sales' ? gameStats.totalSales :
                              quest.type === 'revenue' ? gameStats.totalRevenue :
                              gameStats.totalPurchases,
                              quest.requirement
                            )}/{quest.requirement}
                          </span>
                          <Badge variant="outline">+{quest.reward} HimCoins</Badge>
                        </div>
                        <Progress 
                          value={Math.min((
                            (quest.type === 'sales' ? gameStats.totalSales :
                             quest.type === 'revenue' ? gameStats.totalRevenue :
                             gameStats.totalPurchases) / quest.requirement
                          ) * 100, 100)}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}