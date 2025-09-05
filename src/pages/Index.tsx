import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

// Типы данных
interface Product {
  id: string;
  name: string;
  category: 'vegetables' | 'electronics';
  buyPrice: number;
  sellPrice: number;
  stock: number;
  image: string;
  description: string;
  unlocked: boolean;
}

interface GameStats {
  totalSales: number;
  totalRevenue: number;
  currentLevel: number;
  money: number;
  experience: number;
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
  { id: 'e11', name: 'Canon EOS R5', category: 'electronics', buyPrice: 300000, sellPrice: 350000, stock: 1, image: '📷', description: 'Профессиональная камера', unlocked: false },
  { id: 'e12', name: 'DJI Air 3', category: 'electronics', buyPrice: 120000, sellPrice: 140000, stock: 2, image: '🚁', description: 'Дрон с 4K камерой', unlocked: false },
  { id: 'e13', name: 'Tesla Model S Plaid', category: 'electronics', buyPrice: 8000000, sellPrice: 9500000, stock: 1, image: '🚗', description: 'Электромобиль премиум', unlocked: false },
  { id: 'e14', name: 'Rolex Submariner', category: 'electronics', buyPrice: 1200000, sellPrice: 1500000, stock: 1, image: '⌚', description: 'Швейцарские часы', unlocked: false },
  { id: 'e15', name: 'MacBook Pro M3 Max', category: 'electronics', buyPrice: 400000, sellPrice: 480000, stock: 2, image: '💻', description: 'Топовый ноутбук Apple', unlocked: false },
  { id: 'e16', name: 'Meta Quest 3', category: 'electronics', buyPrice: 60000, sellPrice: 75000, stock: 5, image: '🥽', description: 'VR гарнитура', unlocked: false },
  { id: 'e17', name: 'iPhone 15 Pro Max', category: 'electronics', buyPrice: 130000, sellPrice: 150000, stock: 3, image: '📱', description: 'Топовый iPhone', unlocked: false },
  { id: 'e18', name: 'Samsung QLED 85"', category: 'electronics', buyPrice: 500000, sellPrice: 600000, stock: 1, image: '📺', description: 'Огромный Smart TV', unlocked: false },
  { id: 'e19', name: 'Bose QuietComfort', category: 'electronics', buyPrice: 35000, sellPrice: 42000, stock: 8, image: '🎧', description: 'Наушники с шумодавом', unlocked: false },
  { id: 'e20', name: 'Steam Deck OLED', category: 'electronics', buyPrice: 50000, sellPrice: 60000, stock: 4, image: '🎮', description: 'Портативная игровая консоль', unlocked: false },
  { id: 'e21', name: 'Microsoft Surface Pro', category: 'electronics', buyPrice: 100000, sellPrice: 120000, stock: 3, image: '💻', description: 'Планшет-ноутбук', unlocked: false },
  { id: 'e22', name: 'GoPro Hero 12', category: 'electronics', buyPrice: 45000, sellPrice: 54000, stock: 6, image: '📹', description: 'Экшн-камера', unlocked: false },
  { id: 'e23', name: 'HomePod', category: 'electronics', buyPrice: 30000, sellPrice: 36000, stock: 5, image: '🔊', description: 'Умная колонка Apple', unlocked: false },
  { id: 'e24', name: 'Kindle Oasis', category: 'electronics', buyPrice: 25000, sellPrice: 30000, stock: 10, image: '📖', description: 'Электронная книга', unlocked: false },
  { id: 'e25', name: 'Ring Doorbell Pro', category: 'electronics', buyPrice: 20000, sellPrice: 25000, stock: 8, image: '🔔', description: 'Умный дверной звонок', unlocked: false },
  { id: 'e26', name: 'Sonos Arc', category: 'electronics', buyPrice: 80000, sellPrice: 95000, stock: 3, image: '🔊', description: 'Саундбар премиум', unlocked: false },
  { id: 'e27', name: 'Apple Studio Display', category: 'electronics', buyPrice: 180000, sellPrice: 210000, stock: 2, image: '🖥️', description: 'Профессиональный монитор', unlocked: false },
  { id: 'e28', name: 'Xbox Series X', category: 'electronics', buyPrice: 50000, sellPrice: 60000, stock: 4, image: '🎮', description: 'Игровая консоль Microsoft', unlocked: false },
  { id: 'e29', name: 'AirTag 4-pack', category: 'electronics', buyPrice: 12000, sellPrice: 15000, stock: 15, image: '🏷️', description: 'Трекеры Apple', unlocked: false },
  { id: 'e30', name: 'Tesla Cybertruck', category: 'electronics', buyPrice: 6000000, sellPrice: 7200000, stock: 1, image: '🚛', description: 'Электропикап будущего', unlocked: false },
  { id: 'e31', name: 'Magic Keyboard', category: 'electronics', buyPrice: 35000, sellPrice: 42000, stock: 8, image: '⌨️', description: 'Клавиатура для iPad', unlocked: false },
  { id: 'e32', name: 'Apple Pencil Pro', category: 'electronics', buyPrice: 15000, sellPrice: 18000, stock: 12, image: '✏️', description: 'Стилус для iPad', unlocked: false },
  { id: 'e33', name: 'Dyson Airwrap', category: 'electronics', buyPrice: 50000, sellPrice: 60000, stock: 4, image: '💨', description: 'Стайлер для волос', unlocked: false },
  { id: 'e34', name: 'Philips Hue Starter Kit', category: 'electronics', buyPrice: 15000, sellPrice: 18000, stock: 10, image: '💡', description: 'Умное освещение', unlocked: false },
  { id: 'e35', name: 'Oculus Rift S', category: 'electronics', buyPrice: 40000, sellPrice: 48000, stock: 3, image: '🥽', description: 'VR гарнитура для ПК', unlocked: false },
  { id: 'e36', name: 'Surface Studio', category: 'electronics', buyPrice: 350000, sellPrice: 420000, stock: 1, image: '🖥️', description: 'Творческий компьютер', unlocked: false },
  { id: 'e37', name: 'iPad Pro 12.9"', category: 'electronics', buyPrice: 120000, sellPrice: 140000, stock: 3, image: '📱', description: 'Большой iPad Pro', unlocked: false },
  { id: 'e38', name: 'AirPods Max', category: 'electronics', buyPrice: 60000, sellPrice: 72000, stock: 4, image: '🎧', description: 'Премиум наушники Apple', unlocked: false },
  { id: 'e39', name: 'iMac 24" M3', category: 'electronics', buyPrice: 150000, sellPrice: 180000, stock: 2, image: '🖥️', description: 'Моноблок Apple', unlocked: false },
  { id: 'e40', name: 'Sony A7R V', category: 'electronics', buyPrice: 400000, sellPrice: 480000, stock: 1, image: '📷', description: 'Профессиональная камера Sony', unlocked: false },
  { id: 'e41', name: 'Nintendo Switch OLED', category: 'electronics', buyPrice: 35000, sellPrice: 42000, stock: 6, image: '🎮', description: 'Улучшенная Switch', unlocked: false },
  { id: 'e42', name: 'Tesla Model 3', category: 'electronics', buyPrice: 4000000, sellPrice: 4800000, stock: 1, image: '🚗', description: 'Популярный электрокар', unlocked: false },
  { id: 'e43', name: 'Mac Studio', category: 'electronics', buyPrice: 250000, sellPrice: 300000, stock: 2, image: '💻', description: 'Мощный Mac для профи', unlocked: false },
  { id: 'e44', name: 'LG OLED C3 55"', category: 'electronics', buyPrice: 150000, sellPrice: 180000, stock: 2, image: '📺', description: 'OLED телевизор LG', unlocked: false },
  { id: 'e45', name: 'Framework Laptop', category: 'electronics', buyPrice: 100000, sellPrice: 120000, stock: 3, image: '💻', description: 'Модульный ноутбук', unlocked: false },
  { id: 'e46', name: 'Steam Controller', category: 'electronics', buyPrice: 8000, sellPrice: 10000, stock: 20, image: '🎮', description: 'Геймпад Steam', unlocked: false },
  { id: 'e47', name: 'Razer Blade 15', category: 'electronics', buyPrice: 200000, sellPrice: 240000, stock: 2, image: '💻', description: 'Игровой ноутбук', unlocked: false },
  { id: 'e48', name: 'Elgato Stream Deck', category: 'electronics', buyPrice: 15000, sellPrice: 18000, stock: 8, image: '🎛️', description: 'Панель для стримеров', unlocked: false },
  { id: 'e49', name: 'Asus ROG Phone 8', category: 'electronics', buyPrice: 80000, sellPrice: 96000, stock: 3, image: '📱', description: 'Игровой смартфон', unlocked: false },
  { id: 'e50', name: 'Valve Index VR Kit', category: 'electronics', buyPrice: 120000, sellPrice: 144000, stock: 2, image: '🥽', description: 'VR система Valve', unlocked: false }
];

export default function Index() {
  const [gameStats, setGameStats] = useState<GameStats>({
    totalSales: 0,
    totalRevenue: 0,
    currentLevel: 1,
    money: 1000,
    experience: 0
  });

  const [products, setProducts] = useState<Product[]>([...VEGETABLES, ...ELECTRONICS]);
  const [selectedTab, setSelectedTab] = useState('shop');
  const [notification, setNotification] = useState<string>('');

  // Разблокировка техники при 100 продажах
  useEffect(() => {
    if (gameStats.totalSales >= 100 && gameStats.currentLevel === 1) {
      setGameStats(prev => ({ ...prev, currentLevel: 2 }));
      setProducts(prev => prev.map(p => 
        p.category === 'electronics' ? { ...p, unlocked: true } : p
      ));
      showNotification('🎉 Поздравляем! Открыт уровень "Техника"!');
    }
  }, [gameStats.totalSales]);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const sellProduct = (productId: string) => {
    setProducts(prev => prev.map(product => {
      if (product.id === productId && product.stock > 0) {
        const profit = product.sellPrice - product.buyPrice;
        
        setGameStats(stats => ({
          ...stats,
          totalSales: stats.totalSales + 1,
          totalRevenue: stats.totalRevenue + product.sellPrice,
          money: stats.money + profit,
          experience: stats.experience + Math.floor(profit / 10)
        }));

        showNotification(`Продано: ${product.name} (+${profit.toLocaleString()}₽)`);
        
        return { ...product, stock: product.stock - 1 };
      }
      return product;
    }));
  };

  const restockProduct = (productId: string, quantity: number = 10) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cost = product.buyPrice * quantity;
    if (gameStats.money < cost) {
      showNotification('Недостаточно средств для закупки!');
      return;
    }

    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, stock: p.stock + quantity } : p
    ));
    
    setGameStats(prev => ({ ...prev, money: prev.money - cost }));
    showNotification(`Закуплено: ${product.name} x${quantity} (-${cost.toLocaleString()}₽)`);
  };

  const availableProducts = products.filter(p => p.unlocked);
  const vegetables = availableProducts.filter(p => p.category === 'vegetables');
  const electronics = availableProducts.filter(p => p.category === 'electronics');

  const progressToNext = Math.min((gameStats.totalSales / 100) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Уведомления */}
        {notification && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
            {notification}
          </div>
        )}

        {/* Заголовок */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-slate-800 flex items-center justify-center gap-3">
            <Icon name="Store" size={40} className="text-blue-600" />
            Симулятор Магазина
          </h1>
          <p className="text-slate-600">Развивайте свой бизнес от овощей до техники</p>
        </div>

        {/* Статистика игрока */}
        <Card className="border-2 border-blue-200 bg-white/80 backdrop-blur">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Icon name="TrendingUp" size={24} className="text-blue-600" />
              Статистика магазина
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{gameStats.money.toLocaleString()}₽</div>
                <div className="text-sm text-slate-600">Баланс</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{gameStats.totalSales}</div>
                <div className="text-sm text-slate-600">Продаж</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{gameStats.totalRevenue.toLocaleString()}₽</div>
                <div className="text-sm text-slate-600">Оборот</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">Уровень {gameStats.currentLevel}</div>
                <div className="text-sm text-slate-600">{gameStats.currentLevel === 1 ? 'Овощи' : 'Техника'}</div>
              </div>
            </div>
            
            {gameStats.currentLevel === 1 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Прогресс до уровня "Техника"</span>
                  <span>{gameStats.totalSales}/100 продаж</span>
                </div>
                <Progress value={progressToNext} className="h-3" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Основной интерфейс */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur border">
            <TabsTrigger value="shop" className="flex items-center gap-2">
              <Icon name="ShoppingCart" size={18} />
              Торговля
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Icon name="Package" size={18} />
              Склад
            </TabsTrigger>
            <TabsTrigger value="purchase" className="flex items-center gap-2">
              <Icon name="ShoppingBag" size={18} />
              Закупка
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <Icon name="BarChart3" size={18} />
              Статистика
            </TabsTrigger>
          </TabsList>

          {/* Торговля */}
          <TabsContent value="shop" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Icon name="Carrot" size={24} className="text-orange-500" />
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
                        <span className="text-lg font-bold text-green-600">{product.sellPrice}₽</span>
                        <Badge variant={product.stock > 0 ? 'default' : 'destructive'}>
                          {product.stock > 0 ? `${product.stock} шт` : 'Нет в наличии'}
                        </Badge>
                      </div>
                      <Button 
                        onClick={() => sellProduct(product.id)}
                        disabled={product.stock === 0}
                        className="w-full"
                        size="sm"
                      >
                        <Icon name="ShoppingCart" size={16} className="mr-2" />
                        Продать
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {gameStats.currentLevel >= 2 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <Icon name="Smartphone" size={24} className="text-blue-500" />
                  Техника
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {electronics.map(product => (
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
                            {product.stock > 0 ? `${product.stock} шт` : 'Нет в наличии'}
                          </Badge>
                        </div>
                        <Button 
                          onClick={() => sellProduct(product.id)}
                          disabled={product.stock === 0}
                          className="w-full"
                          size="sm"
                        >
                          <Icon name="ShoppingCart" size={16} className="mr-2" />
                          Продать
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Склад */}
          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Package" size={24} />
                  Управление складом
                </CardTitle>
                <CardDescription>Отслеживайте остатки товаров</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availableProducts.map(product => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{product.image}</span>
                        <div>
                          <div className="font-semibold">{product.name}</div>
                          <div className="text-sm text-slate-600">Цена продажи: {product.sellPrice.toLocaleString()}₽</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={product.stock > 5 ? 'default' : product.stock > 0 ? 'secondary' : 'destructive'}>
                          {product.stock} шт
                        </Badge>
                        <Button 
                          onClick={() => restockProduct(product.id)}
                          size="sm"
                          variant="outline"
                          disabled={gameStats.money < product.buyPrice * 10}
                        >
                          Пополнить +10
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Закупка */}
          <TabsContent value="purchase">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="ShoppingBag" size={24} />
                  Закупка товаров
                </CardTitle>
                <CardDescription>Пополните запасы для продажи</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availableProducts.map(product => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{product.image}</span>
                        <div>
                          <div className="font-semibold">{product.name}</div>
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
                          disabled={gameStats.money < product.buyPrice * 5}
                        >
                          +5 за {(product.buyPrice * 5).toLocaleString()}₽
                        </Button>
                        <Button 
                          onClick={() => restockProduct(product.id, 10)}
                          size="sm"
                          disabled={gameStats.money < product.buyPrice * 10}
                        >
                          +10 за {(product.buyPrice * 10).toLocaleString()}₽
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Статистика */}
          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </CardContent>
              </Card>

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
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-xl font-bold text-orange-600">{electronics.reduce((acc, p) => acc + p.stock, 0)}</div>
                      <div className="text-xs text-gray-600">Техника на складе</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}