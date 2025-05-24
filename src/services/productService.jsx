// Simulación de una API con datos de productos
const products = [
  {
    id: '1',
    title: 'Samsung Galaxy S25 Ultra',
    category: 'electronica',
    description: 'El Samsung Galaxy S25 Ultra combina potencia y diseño premium en un smartphone de última generación. ' +
                'Pantalla: Dynamic AMOLED 2X de 6,9" QHD+ con tasa de refresco de 120 Hz para imágenes nítidas y fluidas. ' +
                'Rendimiento: Procesador Snapdragon 8 Elite, 12 GB de RAM y hasta 1 TB de almacenamiento.' +
                'Cámaras: Cuádruple cámara trasera con sensor principal de 200 MP y zoom óptico 5x; cámara frontal de 12 MP. Batería: 5.000 mAh con carga rápida y carga inalámbrica.' +
                'Extras: S Pen integrado, conectividad 5G, resistencia IP68 y Android 15 con One UI 7.',
    price: 2499999.99,
    imageUrl: '/src/assets/samsung-s25.png',
    stock: 15
  },
  {
    id: '2',
    title: 'Notebook Lenovo IdeaPad 5 2en1 9na Gen (14" AMD)',
    category: 'electronica',
    description: 'Potencia y desempeño para una mayor productividad.Obtén potencia en cada tarea en la que estés trabajando con la laptop Lenovo   IdeaPad 5 2 en 1 9.ª Gen de 14", impulsada por procesadores AMD Ryzen™. Ya sea que estés transmitiendo por streaming, editando contenido o realizando tareas empresariales complejas, te proporciona desempeño y eficiencia superiores sobre la marcha. Además, con la tarjeta gráfica AMD Radeon™, disfrutarás de imágenes nítidas y realistas como nunca antes. Por si fuera poco, podrás realizar múltiples tareas a la vez como un profesional gracias a su gran capacidad de almacenamiento y a su memoria receptiva, que facilitan la ejecución de proyectos sin problemas y el fácil acceso a los datos en cualquier momento del día. ' +
                'Procesador AMD Ryzen™ 5 8645HS (4,30 GHz hasta 5,00 GHz).' +
                'Windows 11 Home idioma único 64.'  +
                '16 GB LPDDR5X-6400MT/s (soldado).' +
                '512 GB SSD M.2 2242 PCIe Gen4 TLC.' +
                '14" WUXGA (1920 x 1200), IPS, brillante, táctil, 45 % NTSC, 300 nits, 60 Hz, vidrio.' +
                '1080p FHD con micrófono doble y obturador para privacidad.' +
                'Lector de huellas dactilares.' +
                'Wi-Fi 6E 2x2 AX & Bluetooth® 5.1 o superior.' ,
    price: 1359999.00,
    imageUrl: '/src/assets/notebook lenovo.webp',
    stock: 8
  },
  {
    id: '3',
    title: 'Camiseta Titular Adidas Authentic Boca Juniors 24/25',
    category: 'deportes',
    description: 'Esta nueva camiseta titular de Boca Juniors adidas une la pasión y el barrio con diferentes tonos que resaltan sus colores, el azul y oro. Un diseño innovador para un equipo en constante evolución, inspirado en el icónico tren que bordea La Bombonera. Su tejido ligero, los modernos paneles de mesh y la tecnología de absorción AEROREADY se combinan para mantener cómodos a los hinchas del club. ' +
                'Hecho con materiales 100% reciclados, este producto representa solo una de nuestras soluciones para acabar con los residuos plásticos. ' + 
                'Disponible en tallas desde XS hasta XXL.',
    price: 139999.99,
    imageUrl: '/src/assets/camiseta de boca.png',
    stock: 50
  },
  {
    id: '4',
    title: 'Nike Metcon 9 Zapatillas de Entrenamiento Hombre',
    category: 'deportes',
    description: 'Cualquiera que sea tu motivación para hacer ejercicio, el Metcon 9 hace que todo valga la pena. Mejoramos el 8 con una placa Hyperlift más grande y un refuerzo para la cuerda de goma adicional. Es el elegido por algunos de los mejores atletas del mundo y está diseñado para los levantadores de peso, los runners y los que luchan por sus metas. ' +
                'Hicimos la placa Hyperlift en el talón aún más grande para brindar estabilidad después de entrenamientos duros como sentadillas divididas, peso muerto y otros ejercicios para la parte inferior del cuerpo. La placa ayuda a forzar el peso hacia abajo y hacia afuera, a la vez que agrega rigidez en el talón. Esa firmeza te da soporte, específicamente con cargas más pesadas. ' +
                'La malla ligera y transpirable ayuda a mantener el pie fresco y a la vez brinda el tipo de durabilidad que puede resistir rasguños, cortes y movimientos de arrastre rápidos.'+
                'La entresuela de doble densidad, espuma firme en el exterior y espuma suave en el interior, proporciona una amortiguación responsiva para brindar comodidad duradera en los movimientos y cardio continuos.' ,
    price: 289999.99,
    imageUrl: '/src/assets/Zapatillas Nike .webp',
    stock: 25
  },
  {
    id: '5',
    title: 'Remera Mujer Graphic Ringer Tee Levis Arona',
    category: 'ropa',
    description: 'Remera Mujer Manga corta y cuello redondo ' +
                'Composicion 100% Algodon. ' ,
    price: 59000.00,
    imageUrl: '/src/assets/Remera Levis mujer.webp',
    stock: 12
  },
  {
    id: '6',
    title: 'Juego De Sartenes Tramontina Linz 3 Piezas Teflon Antiadherente Color Negro',
    category: 'hogar',
    description: 'Juego de Sartenes Tramontina Linz Revestimiento Interno Antiadherente Starflon Max y Externo de Poliéster Negro 3 Piezas ' +
                'El juego de sartenes Tramontina Linz le aportará mayor practicidad y versatilidad a su cocina. Desarrolladas en aluminio con revestimiento interno con antiadherente Starflon Max, las piezas cocinan los alimentos de manera rápida y uniforme, evitan que se peguen en la superficie y son muy fáciles de limpiar. ' +
                'Los mangos son de baquelita, un material antitérmico que proporciona mayor seguridad de manejo. ¡Su revestimiento externo es de poliéster y proporciona aún más belleza a las preparaciones!'+
                'Cuerpos de aluminio de 1.2 mm de espesor.' +
                'Apta para: Lavavajillas, Cocina a Gas, Vitrocerámica y Eléctrica'+
                'El set contiene: 1 sarten de 16cm de diametro,1 sarten de 20cm de diametro y 1 sarten de 24cm de diametro',
    price: 27550.00,
    imageUrl: '/src/assets/Sartenes Tramontina.webp',
    stock: 30
  }
];

// Simulación de delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Función para obtener todos los productos
export const getProducts = async () => {
try {
  await delay(500);
  console.log("getProducts: Devolviendo todos los productos:", products.length);
  return [...products];
} catch (error) {
  console.error("Error en getProducts:", error);
  return [];
}
};

// Función para obtener productos por categoría
export const getProductsByCategory = async (categoryId) => {
if (!categoryId) {
  console.error("getProductsByCategory: categoryId es undefined o null");
  return [];
}

try {
  await delay(500);
  
  // Convertir a minúsculas para comparación no sensible a mayúsculas/minúsculas
  const categoryIdLower = categoryId.toLowerCase();
  
  // Filtrar productos por categoría
  const filtered = products.filter(
    product => product.category.toLowerCase() === categoryIdLower
  );
  
  console.log(`getProductsByCategory: Categoría "${categoryId}" - Encontrados ${filtered.length} productos`);
  
  return filtered;
} catch (error) {
  console.error(`Error en getProductsByCategory para "${categoryId}":`, error);
  return [];
}
};

// Función para obtener un producto por ID
export const getProductById = async (id) => {
if (!id) {
  console.error("getProductById: id es undefined o null");
  return null;
}

try {
  await delay(500);
  
  // Buscar el producto por ID (convertir a string para comparación)
  const product = products.find(product => product.id === String(id));
  
  if (product) {
    console.log(`getProductById: Producto encontrado con ID "${id}":`, product.title);
    return { ...product };
  } else {
    console.log(`getProductById: No se encontró producto con ID "${id}"`);
    return null;
  }
} catch (error) {
  console.error(`Error en getProductById para ID "${id}":`, error);
  return null;
}
};
