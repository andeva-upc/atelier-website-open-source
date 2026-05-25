import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IconGauge, 
  IconCalendarEvent, 
  IconClipboardCheck, 
  IconReceipt, 
  IconPackage, 
  IconSparkles,
  IconArrowRight,
  IconChevronDown,
  IconAlertTriangle,
  IconCheck,
  IconPlus,
  IconRobot,
  IconInfoCircle,
  IconPhoto
} from '@tabler/icons-react';

interface Feature {
  id: string;
  icon: React.ComponentType<any>;
  themeColor: string; // Tailwind class for text / accent
  bgColor: string;    // Tailwind class for active card background
  accentColor: string;// HEX code
  image: string;      // Expected path to real dashboard image
}

const features: Feature[] = [
  {
    id: 'telemetria',
    icon: IconGauge,
    themeColor: 'text-[#0071eb]',
    bgColor: 'bg-[#B3D4F8]/20',
    accentColor: '#0071eb',
    image: '/images/features/telemetria.png',
  },
  {
    id: 'mantenimiento',
    icon: IconClipboardCheck,
    themeColor: 'text-[#0D9488]',
    bgColor: 'bg-[#E6F9F6]/25',
    accentColor: '#0D9488',
    image: '/images/features/mantenimiento.png',
  },
  {
    id: 'finanzas',
    icon: IconReceipt,
    themeColor: 'text-[#16A34A]',
    bgColor: 'bg-[#EEF9F0]/25',
    accentColor: '#16A34A',
    image: '/images/features/finanzas.png',
  },
  {
    id: 'inventario',
    icon: IconPackage,
    themeColor: 'text-[#EA580C]',
    bgColor: 'bg-[#FFF3EB]/30',
    accentColor: '#EA580C',
    image: '/images/features/inventario.png',
  },
  {
    id: 'agenda',
    icon: IconCalendarEvent,
    themeColor: 'text-[#7C3AED]',
    bgColor: 'bg-[#F3EEFF]/25',
    accentColor: '#7C3AED',
    image: '/images/features/agenda.png',
  },
  {
    id: 'asistente',
    icon: IconSparkles,
    themeColor: 'text-[#DB2777]',
    bgColor: 'bg-[#FFF0F5]/35',
    accentColor: '#DB2777',
    image: '/images/features/asistente.png',
  }
];

const featuresData = {
  es: [
    {
      id: 'telemetria',
      title: 'Telemetría en Vivo',
      description: 'Monitorea presión de aceite, revoluciones y sensores del motor en tiempo real. Detecta y traduce códigos de falla (DTC) antes de que causen daños mayores.',
    },
    {
      id: 'mantenimiento',
      title: 'Mantenimiento Digital',
      description: 'Crea inspecciones con notas técnicas en segundos. Genera un historial clínico digital completo de cada vehículo para generar confianza.',
    },
    {
      id: 'finanzas',
      title: 'Facturación',
      description: 'Genera cotizaciones basadas en mano de obra y repuestos. Conviértelos en facturas electrónicas con un clic y gestiona cuentas por cobrar.',
    },
    {
      id: 'inventario',
      title: 'Inventario Inteligente',
      description: 'Controla repuestos y consumibles con alertas automáticas de bajo stock.',
    },
    {
      id: 'agenda',
      title: 'Citas',
      description: 'Agenda turnos de mantenimiento sin fricción y mantén informados a tus clientes.',
    },
    {
      id: 'asistente',
      title: 'Órdenes de Trabajo',
      description: 'Asigna mecánicos a bahías de trabajo automáticamente y los repuestos utilizados de manera automática.',
    }
  ],
  en: [
    {
      id: 'telemetria',
      title: 'Live Telemetry',
      description: 'Monitor oil pressure, RPM, and engine sensors in real time. Detect and translate diagnostic trouble codes (DTC) before they cause major damage.',
    },
    {
      id: 'mantenimiento',
      title: 'Digital Maintenance',
      description: 'Create inspections with technical notes in seconds. Generate a complete digital health history for each vehicle to build trust.',
    },
    {
      id: 'finanzas',
      title: 'Invoicing',
      description: 'Generate quotes based on labor and parts. Convert them into electronic invoices with one click and manage accounts receivable.',
    },
    {
      id: 'inventario',
      title: 'Smart Inventory',
      description: 'Control parts and supplies with automatic low-stock alerts.',
    },
    {
      id: 'agenda',
      title: 'Appointments',
      description: 'Schedule maintenance shifts seamlessly and keep your clients informed.',
    },
    {
      id: 'asistente',
      title: 'Work Orders',
      description: 'Assign mechanics to service bays automatically and track the spare parts used automatically.',
    }
  ]
};

const sectionContent = {
  es: {
    headerTitle: 'Conozca <span class="text-[#0071eb]">atelier</span>',
    headerDesc: 'Reemplaza múltiples hojas de Excel y herramientas obsoletas con Atelier, el único software inteligente de gestión de talleres mecánicos y telemetría.',
    fallbackBadge: 'Reemplazar con: /public',
  },
  en: {
    headerTitle: 'Get to know <span class="text-[#0071eb]">atelier</span>',
    headerDesc: 'Replace multiple Excel sheets and legacy tools with Atelier, the only smart mechanical workshop management and telemetry software.',
    fallbackBadge: 'Replace with: /public',
  }
};

const mockupText = {
  es: {
    oilPress: 'Presión Aceite',
    rpm: 'RPM',
    temp: 'Temperatura',
    realtimePerf: 'Rendimiento en Tiempo Real',
    obdConnected: 'OBD-II Conectado',
    dtcActive: 'DTC Activo Detectado',
    dtcDesc: 'P0301 (Misfire en Cilindro 1) - Revisión sugerida: Bobina',
    schedBay: 'Agenda - Bahía Principal',
    newApp: 'Nueva Cita',
    morning: 'MAÑANA',
    afternoon: 'TARDE',
    mechanics: 'MECÁNICOS',
    padsChange: 'Cambio Pastillas',
    genInsp: 'Inspección Gral',
    alignment: 'Alineamiento',
    bayAvail: 'Bahía Disponible',
    active: 'Activo',
    inBay2: 'En Bahía 2',
    notifSent: 'Notificación automática enviada a Honda Civic',
    digitalInsp: 'Hoja de Inspección Digital',
    genHealth: 'Salud General',
    brakeFluid: 'Nivel de Líquido de Frenos',
    approved: 'Aprobado',
    brakePads: 'Pastillas de Freno (Delanteras)',
    wearAlert: 'Desgaste 15% - Sugerir cambio',
    airFilter: 'Filtro de Aire Motor',
    clean: 'Limpio',
    inspNote: 'El reporte incluye 2 fotos del desgaste de balatas delanteras. El cliente puede autorizar el cambio digitalmente desde el reporte de su teléfono.',
    invoiceNum: 'Factura FAC-2026-084',
    sent: 'Enviado',
    client: 'Cliente',
    date: 'Fecha',
    servedBy: 'Atendido por: Lucía M.',
    bremboPads: 'Pastillas de Freno delanteras Brembo',
    laborInstall: 'Mano de Obra - Instalación',
    boschFilter: 'Filtro de Aceite sintético Fram',
    paymentPlatform: 'Plataforma de Pago',
    stripeMethod: 'Stripe Tarjeta / SPEI',
    invoiceTotal: 'Total Factura',
    paymentActive: 'Link de pago activo',
    viewOnline: 'Ver Cobro Online',
    stockAlerts: 'Stock & Alertas de Repuestos',
    activeAlertsCount: '2 Alertas Activas',
    mobilOil: 'Aceite Sintético Mobil 1 5W-30',
    critical: 'CRÍTICO (2 u.)',
    boschFiltersStock: 'Filtros de Aceite Bosch (M)',
    medStock: 'Stock Medio (9 u.)',
    brakePadsStock: 'Pastillas de Freno Delanteras (Universal)',
    optimalStock: 'Óptimo (24 u.)',
    suggestedOrder: 'Orden Sugerida Automática',
    reorderText: 'Reordenar 20 botes de 5W-30 al distribuidor.',
    sendOrder: 'Enviar Orden',
    aiAssistant: 'Asistente IA Mecánico',
    obdConn: 'Conectado a Base de Datos OBD-II',
    whatProc: '¿Qué procedimiento sigo para el código P0301 en un motor Mazda Skyactiv 2.0?',
    suggDiag: 'Diagnóstico sugerido:',
    coilsStep: 'Bobinas: Intercambia la bobina del cil 1 al cil 2. Si la falla migra al cil 2, reemplaza bobina.',
    plugsStep: 'Bujía: Inspecciona si hay acumulación de carbón o electrodo desgastado (luz ideal: 0.044\").',
    injectorStep: 'Inyector: Mide resistencia del inyector (típico Mazda: 11.6-12.4 Ω).',
    askInput: 'Preguntar sobre DTCs, diagramas o partes...'
  },
  en: {
    oilPress: 'Oil Pressure',
    rpm: 'RPM',
    temp: 'Temperature',
    realtimePerf: 'Real-Time Performance',
    obdConnected: 'OBD-II Connected',
    dtcActive: 'Active DTC Detected',
    dtcDesc: 'P0301 (Cylinder 1 Misfire) - Suggested check: Ignition Coil',
    schedBay: 'Schedule - Main Bay',
    newApp: 'New Appointment',
    morning: 'MORNING',
    afternoon: 'AFTERNOON',
    mechanics: 'MECHANICS',
    padsChange: 'Brake Pads Change',
    genInsp: 'General Inspection',
    alignment: 'Alignment',
    bayAvail: 'Bay Available',
    active: 'Active',
    inBay2: 'In Bay 2',
    notifSent: 'Automatic notification sent to Honda Civic',
    digitalInsp: 'Digital Inspection Sheet',
    genHealth: 'General Health',
    brakeFluid: 'Brake Fluid Level',
    approved: 'Approved',
    brakePads: 'Brake Pads (Front)',
    wearAlert: '15% Wear - Suggest replacement',
    airFilter: 'Engine Air Filter',
    clean: 'Clean',
    inspNote: "The report includes 2 photos of front brake pad wear. The client can authorize repairs digitally from their phone's report.",
    invoiceNum: 'Invoice INV-2026-084',
    sent: 'Sent',
    client: 'Client',
    date: 'Date',
    servedBy: 'Served by: Lucia M.',
    bremboPads: 'Brembo Front Brake Pads',
    laborInstall: 'Labor - Installation',
    boschFilter: 'Fram Synthetic Oil Filter',
    paymentPlatform: 'Payment Platform',
    stripeMethod: 'Stripe Card / Wire Transfer',
    invoiceTotal: 'Invoice Total',
    paymentActive: 'Payment link active',
    viewOnline: 'View Online Payment',
    stockAlerts: 'Stock & Parts Alerts',
    activeAlertsCount: '2 Active Alerts',
    mobilOil: 'Mobil 1 5W-30 Synthetic Oil',
    critical: 'CRITICAL (2 u.)',
    boschFiltersStock: 'Bosch Oil Filters (M)',
    medStock: 'Medium Stock (9 u.)',
    brakePadsStock: 'Front Brake Pads (Universal)',
    optimalStock: 'Optimal (24 u.)',
    suggestedOrder: 'Automatic Suggested Order',
    reorderText: 'Reorder 20 cans of 5W-30 from distributor.',
    sendOrder: 'Send Order',
    aiAssistant: 'AI Mechanic Assistant',
    obdConn: 'Connected to OBD-II Database',
    whatProc: 'What procedure should I follow for code P0301 on a Mazda Skyactiv 2.0 engine?',
    suggDiag: 'Suggested Diagnosis:',
    coilsStep: 'Coils: Swap coil from cyl 1 to cyl 2. If misfire migrates to cyl 2, replace coil.',
    plugsStep: 'Spark Plug: Inspect for carbon buildup or worn electrode (ideal gap: 0.044\").',
    injectorStep: 'Injector: Measure injector resistance (typical Mazda: 11.6-12.4 Ω).',
    askInput: 'Ask about DTCs, diagrams or parts...'
  }
};

export default function FeaturesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [currentLang, setCurrentLang] = useState<'es' | 'en'>('en');

  useEffect(() => {
    const initial = (localStorage.getItem('atelier-lang') || 'en') as 'es' | 'en';
    setCurrentLang(initial);

    const handleLangChange = (e: any) => {
      setCurrentLang(e.detail.lang);
    };
    window.addEventListener('languagechange', handleLangChange);
    return () => window.removeEventListener('languagechange', handleLangChange);
  }, []);

  // Merge dynamic translation texts with structural attributes
  const activeFeaturesList = features.map(f => {
    const trans = featuresData[currentLang].find(td => td.id === f.id);
    return {
      ...f,
      title: trans ? trans.title : '',
      description: trans ? trans.description : ''
    };
  });

  const activeFeature = activeFeaturesList[activeIndex];
  const activeSection = sectionContent[currentLang];
  const activeMockText = mockupText[currentLang];

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
  };

  const nextTab = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % features.length);
  };

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  // Check if we should use the simulated mockup fallback for the active feature
  const useSimulatedFallback = imageErrors[activeFeature.id] || !activeFeature.image;

  return (
    <div className="w-full max-w-7xl mx-auto px-1 md:px-10">
      
      {/* Header section identical to tryplayground layout */}
      <div className="flex flex-col lg:flex-row md:items-start justify-between mb-6 md:mb-8 gap-6 md:gap-10">
        <div className="max-w-2xl">
          <h2 
            className="font-['Mona_Sans'] text-5xl md:text-6xl font-bold tracking-tight text-[#212121] mb-4"
            dangerouslySetInnerHTML={{ __html: activeSection.headerTitle }}
          />
        </div>
        <p className="font-['Arimo'] text-[#666666] text-lg md:text-[22px] max-w-2xl">
          {activeSection.headerDesc}
        </p>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left column: Trigger List (Ultra-Minimalist tryplayground style) */}
        <div className="lg:col-span-5 flex flex-col justify-start border-t border-b border-gray-200/60 divide-y divide-gray-200/60">
          {activeFeaturesList.map((feature, index) => {
            const isActive = index === activeIndex;
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                onClick={() => handleTabClick(index)}
                className="group text-left py-6 cursor-pointer transition-all duration-300 relative select-none"
              >
                {/* Accordion header with layout shift for clean baseline */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Raw outlines icon matching the screenshot */}
                    <Icon className={`w-6 h-6 shrink-0 mt-0.5 transition-colors duration-300 ${
                      isActive ? feature.themeColor : 'text-gray-400 group-hover:text-gray-900'
                    }`} />
                    
                    <div className="flex-1 flex flex-col">
                      <h3 className={`font-['Mona_Sans'] text-[19px] font-bold tracking-tight transition-colors ${
                        isActive ? 'text-gray-900' : 'text-gray-800 group-hover:text-black'
                      }`}>
                        {feature.title}
                      </h3>
                      
                      {/* Animated expandable description */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: 'auto', opacity: 1, marginTop: 10 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <p className="font-['Arimo'] text-[#666666] text-[15px] leading-relaxed pr-4 mb-4">
                              {feature.description}
                            </p>
                            
                            {/* Minimal progress bar sitting direct under the description */}
                            <div className="h-[2px] bg-gray-150/70 rounded-full overflow-hidden w-full relative">
                              <div 
                                key={activeIndex} // This key triggers animation reset
                                onAnimationEnd={nextTab}
                                className={`h-full absolute left-0 top-0 rounded-full origin-left ${
                                  feature.id === 'telemetria' ? 'bg-[#0071eb]' :
                                  feature.id === 'agenda' ? 'bg-[#7C3AED]' :
                                  feature.id === 'mantenimiento' ? 'bg-[#0D9488]' :
                                  feature.id === 'finanzas' ? 'bg-[#16A34A]' :
                                  feature.id === 'inventario' ? 'bg-[#EA580C]' : 'bg-[#DB2777]'
                                }`}
                                style={{
                                  width: '100%',
                                  animation: 'features-progress 6s linear forwards'
                                }}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  
                  {/* Circular toggle arrow button */}
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all shrink-0 shadow-sm ${
                    isActive 
                      ? 'border-gray-300 bg-gray-50' 
                      : 'border-gray-200 bg-white group-hover:border-gray-300 group-hover:bg-gray-50'
                  }`}>
                    <IconChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                      isActive ? 'text-gray-800 rotate-180' : 'text-gray-400 group-hover:text-gray-700'
                    }`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right column: Interactive Visual Preview (Playground Shifted-Crop Layout for Mobile/Desktop, Centered for Tablet) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className={`w-full aspect-[4/3] lg:h-[520px] rounded-[24px] md:rounded-[32px] transition-colors duration-500 relative overflow-hidden md:p-8 md:flex md:items-center md:justify-center lg:p-0 lg:block shadow-inner ${activeFeature.bgColor}`}>
            
            {/* Background absolute graphic grid lines */}
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none text-slate-900">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid-pattern" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-pattern)" />
              </svg>
            </div>

            {/* Browser Mockup Container - Cropped on Mobile & Desktop, Centered & Fully Fitted on Tablet */}
            <div className="absolute left-5 top-5 w-[140%] h-[140%] md:relative md:left-0 md:top-0 md:w-full md:h-full lg:absolute lg:left-8 lg:top-8 lg:w-[125%] lg:h-[125%] bg-white rounded-tl-2xl rounded-tr-lg rounded-bl-lg md:rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden flex flex-col">
              
              {/* Simulated Browser Title Bar */}
              <div className="bg-gray-50 px-4 py-3 flex items-center border-b border-gray-150/60 shrink-0">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>

              {/* Browser body area with AnimatePresence for content transitions */}
              <div className="flex-1 overflow-hidden relative bg-gray-50/50">
                
                {/* 1. Real Image Slot (Loads if image exists and hasn't errored out) */}
                {!useSimulatedFallback && (
                  <img 
                    src={activeFeature.image} 
                    alt={activeFeature.title} 
                    onError={() => handleImageError(activeFeature.id)}
                    className="w-full h-full object-cover object-left-top select-none pointer-events-none"
                  />
                )}

                {/* 2. Simulated Dashboard Mockups (Serves as both initial visual placeholder & image error fallback) */}
                {useSimulatedFallback && (
                  <div className="w-full h-full p-4 md:p-6 font-['Arimo']">
                    
                    {/* Placeholder hint badge overlay */}
                    <div className="absolute top-2.5 right-2.5 bg-gray-900/85 hover:bg-gray-900 text-white rounded-full px-3.5 py-1 text-[10px] font-semibold flex items-center gap-1.5 shadow-md z-15 transition-all">
                      <IconPhoto className="w-3.5 h-3.5 text-[#0071eb]" />
                      <span>{activeSection.fallbackBadge}: /public{activeFeature.image}</span>
                    </div>

                    <AnimatePresence mode="wait">
                      
                      {activeFeature.id === 'telemetria' && (
                        <motion.div
                          key="telemetria-mock"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.3 }}
                          className="h-full flex flex-col justify-between"
                        >
                          {/* Top stats bar */}
                          <div className="grid grid-cols-3 gap-3 mb-4 shrink-0">
                            <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                              <span className="text-gray-400 text-xs block">{activeMockText.oilPress}</span>
                              <span className="text-[#0071eb] font-bold text-lg">54 PSI</span>
                            </div>
                            <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                              <span className="text-gray-400 text-xs block">{activeMockText.rpm}</span>
                              <span className="text-[#0071eb] font-bold text-lg">3,120</span>
                            </div>
                            <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                              <span className="text-gray-400 text-xs block">{activeMockText.temp}</span>
                              <span className="text-[#0071eb] font-bold text-lg">92 °C</span>
                            </div>
                          </div>

                          {/* Line Chart Graphic */}
                          <div className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between overflow-hidden">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="text-sm font-bold text-gray-700">{activeMockText.realtimePerf}</h4>
                              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">{activeMockText.obdConnected}</span>
                            </div>
                            <div className="relative flex-1 min-h-[90px] md:min-h-[120px] flex items-end">
                              <svg className="w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
                                <defs>
                                  <linearGradient id="blue-grad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#0071eb" stopOpacity="0.25"/>
                                    <stop offset="100%" stopColor="#0071eb" stopOpacity="0.0"/>
                                  </linearGradient>
                                </defs>
                                <motion.path 
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{ duration: 0.8 }}
                                  d="M0 100 Q 50 40, 100 80 T 200 30 T 300 70 T 400 20 L 400 120 L 0 120 Z" 
                                  fill="url(#blue-grad)"
                                />
                                <motion.path 
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{ duration: 1.2, ease: 'easeOut' }}
                                  d="M0 100 Q 50 40, 100 80 T 200 30 T 300 70 T 400 20" 
                                  fill="none" 
                                  stroke="#0071eb" 
                                  strokeWidth="3.5"
                                  strokeLinecap="round"
                                />
                                <circle cx="200" cy="30" r="4.5" fill="#0071eb" className="animate-ping" />
                                <circle cx="200" cy="30" r="3.5" fill="#0071eb" stroke="white" strokeWidth="1.5" />
                              </svg>
                            </div>
                          </div>

                          {/* Warning log footer */}
                          <div className="mt-3 bg-red-50 border border-red-100 rounded-xl p-3 flex items-center gap-2 shrink-0">
                            <IconAlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                            <div className="text-xs">
                              <span className="font-bold text-red-700 block">{activeMockText.dtcActive}</span>
                              <span className="text-red-600">{activeMockText.dtcDesc}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeFeature.id === 'agenda' && (
                        <motion.div
                          key="agenda-mock"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.3 }}
                          className="h-full flex flex-col justify-between"
                        >
                          <div className="flex justify-between items-center mb-3 shrink-0">
                            <h4 className="text-sm font-bold text-gray-700">{activeMockText.schedBay}</h4>
                            <div className="flex gap-2">
                              <button className="bg-[#7C3AED] text-white p-1 rounded-md text-[11px] font-bold px-2.5 flex items-center gap-1 shadow-sm">
                                <IconPlus className="w-3.5 h-3.5" />
                                {activeMockText.newApp}
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-3 flex-1 overflow-hidden mb-1">
                            
                            <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2 overflow-hidden">
                              <span className="text-[10px] text-gray-400 font-bold block border-b border-gray-100 pb-1">{activeMockText.morning}</span>
                              <div className="bg-purple-50 border-l-4 border-[#7C3AED] p-2 rounded-r-lg">
                                <span className="text-[11px] font-bold text-gray-800 block truncate">{activeMockText.padsChange}</span>
                                <span className="text-[9px] text-[#7C3AED] block truncate">09:00 AM - Honda Civ.</span>
                              </div>
                              <div className="bg-gray-50 border-l-4 border-gray-300 p-2 rounded-r-lg">
                                <span className="text-[11px] font-bold text-gray-600 block truncate">{activeMockText.genInsp}</span>
                                <span className="text-[9px] text-gray-500 block truncate">11:30 AM - Ford Fi.</span>
                              </div>
                            </div>

                            <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2 overflow-hidden">
                              <span className="text-[10px] text-gray-400 font-bold block border-b border-gray-100 pb-1">{activeMockText.afternoon}</span>
                              <div className="bg-purple-100/60 border-l-4 border-[#7C3AED] p-2 rounded-r-lg">
                                <span className="text-[11px] font-bold text-gray-800 block truncate">{activeMockText.alignment}</span>
                                <span className="text-[9px] text-[#7C3AED] block truncate">02:00 PM - Audi A4</span>
                              </div>
                              <div className="border border-dashed border-gray-200 rounded-lg p-2 flex items-center justify-center h-12">
                                <span className="text-[10px] text-gray-400">{activeMockText.bayAvail}</span>
                              </div>
                            </div>

                            <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2 overflow-hidden">
                              <span className="text-[10px] text-gray-400 font-bold block border-b border-gray-100 pb-1">{activeMockText.mechanics}</span>
                              <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-lg">
                                <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-[9px] font-bold">CG</div>
                                <div className="overflow-hidden">
                                  <span className="text-[10px] font-bold block truncate">Carlos G.</span>
                                  <span className="text-[8px] text-green-600 block">{activeMockText.active}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-lg">
                                <div className="w-6 h-6 rounded-full bg-[#7C3AED] flex items-center justify-center text-white text-[9px] font-bold">LM</div>
                                <div className="overflow-hidden">
                                  <span className="text-[10px] font-bold block truncate">Lucía M.</span>
                                  <span className="text-[8px] text-green-600 block">{activeMockText.inBay2}</span>
                                </div>
                              </div>
                            </div>

                          </div>

                          <div className="bg-white border border-gray-100 rounded-xl p-2.5 mt-2 flex items-center justify-between shrink-0 shadow-sm">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              <span className="text-xs text-gray-500">{activeMockText.notifSent}</span>
                            </div>
                            <span className="text-[9px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded">{activeMockText.morning} SMS</span>
                          </div>
                        </motion.div>
                      )}

                      {activeFeature.id === 'mantenimiento' && (
                        <motion.div
                          key="mantenimiento-mock"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.3 }}
                          className="h-full flex flex-col justify-between"
                        >
                          <div className="flex justify-between items-center mb-3 shrink-0">
                            <div>
                              <h4 className="text-sm font-bold text-gray-700">{activeMockText.digitalInsp}</h4>
                              <span className="text-[10px] text-gray-400">Porsche 911 Carrera S - 2021</span>
                            </div>
                            <div className="bg-teal-50 border border-teal-100 rounded-full px-3 py-1 flex items-center gap-1">
                              <div className="w-5 h-5 rounded-full bg-[#0D9488] flex items-center justify-center text-white text-[9px] font-bold">88%</div>
                              <span className="text-[10px] text-[#0D9488] font-bold">{activeMockText.genHealth}</span>
                            </div>
                          </div>

                          <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3 overflow-y-auto">
                            
                            <div className="flex items-center justify-between border-b border-gray-50 pb-2.5">
                              <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                  <IconCheck className="w-3.5 h-3.5 text-green-600" />
                                </div>
                                <span className="text-xs font-semibold text-gray-700">{activeMockText.brakeFluid}</span>
                              </div>
                              <span className="text-[10px] bg-green-50 text-green-700 font-bold px-2.5 py-0.5 rounded-full">{activeMockText.approved}</span>
                            </div>

                            <div className="flex items-center justify-between border-b border-gray-50 pb-2.5">
                              <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center">
                                  <IconAlertTriangle className="w-3.5 h-3.5 text-yellow-600" />
                                </div>
                                <span className="text-xs font-semibold text-gray-700">{activeMockText.brakePads}</span>
                              </div>
                              <span className="text-[10px] bg-yellow-50 text-yellow-700 font-bold px-2.5 py-0.5 rounded-full">{activeMockText.wearAlert}</span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                  <IconCheck className="w-3.5 h-3.5 text-green-600" />
                                </div>
                                <span className="text-xs font-semibold text-gray-700">{activeMockText.airFilter}</span>
                              </div>
                              <span className="text-[10px] bg-green-50 text-green-700 font-bold px-2.5 py-0.5 rounded-full">{activeMockText.clean}</span>
                            </div>

                          </div>

                          <div className="bg-[#E6F9F6] rounded-xl p-3 border border-teal-100 flex items-center gap-2 mt-3 shrink-0">
                            <IconInfoCircle className="w-5 h-5 text-[#0D9488] shrink-0" />
                            <p className="text-[10.5px] text-[#0A6B62] leading-tight">
                              {activeMockText.inspNote}
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {activeFeature.id === 'finanzas' && (
                        <motion.div
                          key="finanzas-mock"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.3 }}
                          className="h-full flex flex-col justify-between"
                        >
                          <div className="flex justify-between items-center mb-3 shrink-0">
                            <h4 className="text-sm font-bold text-gray-700">{activeMockText.invoiceNum}</h4>
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded font-bold">{activeMockText.sent}</span>
                          </div>

                          <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between">
                            
                            <div className="flex justify-between border-b border-gray-100 pb-3 mb-2 text-xs">
                              <div>
                                <span className="text-gray-400 block text-[9px] uppercase font-bold">{activeMockText.client}</span>
                                <span className="font-bold text-gray-700">Eduardo Torres</span>
                                <span className="text-gray-500 block text-[10px]">Mazda CX-5 (2020)</span>
                              </div>
                              <div className="text-right">
                                <span className="text-gray-400 block text-[9px] uppercase font-bold">{activeMockText.date}</span>
                                <span className="text-gray-700">23 Mayo, 2026</span>
                                <span className="text-gray-500 block text-[10px]">{activeMockText.servedBy}</span>
                              </div>
                            </div>

                            <div className="flex-1 flex flex-col gap-2">
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-600">{activeMockText.bremboPads}</span>
                                <span className="font-bold text-gray-800">$85.00</span>
                              </div>
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-600">{activeMockText.laborInstall}</span>
                                <span className="font-bold text-gray-800">$45.00</span>
                              </div>
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-600">{activeMockText.boschFilter}</span>
                                <span className="font-bold text-gray-800">$18.00</span>
                              </div>
                            </div>

                            <div className="border-t border-gray-100 pt-3 mt-2 flex justify-between items-end">
                              <div>
                                <span className="text-[10px] text-gray-400 block">{activeMockText.paymentPlatform}</span>
                                <span className="text-[10px] text-gray-600 font-bold bg-gray-100 px-2 py-0.5 rounded">{activeMockText.stripeMethod}</span>
                              </div>
                              <div className="text-right">
                                <span className="text-[10px] text-gray-400 block">{activeMockText.invoiceTotal}</span>
                                <span className="text-lg font-bold text-green-600">$148.00 USD</span>
                              </div>
                            </div>

                          </div>

                          <div className="mt-3 flex items-center justify-between bg-green-50 p-2.5 border border-green-100 rounded-xl shrink-0">
                            <div className="flex items-center gap-1.5 text-xs text-green-600">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                              </span>
                              <span>{activeMockText.paymentActive}</span>
                            </div>
                            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3.5 rounded-lg text-xs shadow-sm transition-all cursor-pointer">
                              {activeMockText.viewOnline}
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {activeFeature.id === 'inventario' && (
                        <motion.div
                          key="inventario-mock"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.3 }}
                          className="h-full flex flex-col justify-between"
                        >
                          <div className="flex justify-between items-center mb-3 shrink-0">
                            <h4 className="text-sm font-bold text-gray-700">{activeMockText.stockAlerts}</h4>
                            <span className="text-xs text-[#EA580C] bg-orange-50 border border-orange-100 px-2 py-0.5 rounded font-bold">{activeMockText.activeAlertsCount}</span>
                          </div>

                          <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3.5 overflow-hidden">
                            
                            <div className="flex flex-col gap-1 pb-2 border-b border-gray-50">
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-gray-700">{activeMockText.mobilOil}</span>
                                <span className="text-[#EA580C] font-extrabold text-xs">{activeMockText.critical}</span>
                              </div>
                              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-[#EA580C] h-full w-[12%] rounded-full"></div>
                              </div>
                            </div>

                            <div className="flex flex-col gap-1 pb-2 border-b border-gray-50">
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-gray-700">{activeMockText.boschFiltersStock}</span>
                                <span className="text-gray-500 font-semibold">{activeMockText.medStock}</span>
                              </div>
                              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-yellow-500 h-full w-[45%] rounded-full"></div>
                              </div>
                            </div>

                            <div className="flex flex-col gap-1">
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-gray-700">{activeMockText.brakePadsStock}</span>
                                <span className="text-green-600 font-semibold">{activeMockText.optimalStock}</span>
                              </div>
                              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-green-500 h-full w-[85%] rounded-full"></div>
                              </div>
                            </div>

                          </div>

                          <div className="bg-orange-50/70 border border-orange-100 rounded-xl p-3 flex items-center justify-between mt-3 shrink-0">
                            <div className="text-xs text-orange-950 pr-4">
                              <span className="font-bold block">{activeMockText.suggestedOrder}</span>
                              <span className="text-gray-600">{activeMockText.reorderText}</span>
                            </div>
                            <button className="bg-[#EA580C] hover:bg-[#d04e0a] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-sm whitespace-nowrap cursor-pointer">
                              {activeMockText.sendOrder}
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {activeFeature.id === 'asistente' && (
                        <motion.div
                          key="asistente-mock"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.3 }}
                          className="h-full flex flex-col justify-between"
                        >
                          <div className="flex justify-between items-center mb-3 shrink-0 border-b border-gray-100 pb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-[#DB2777] flex items-center justify-center text-white">
                                <IconRobot className="w-4.5 h-4.5" />
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-gray-700">{activeMockText.aiAssistant}</h4>
                                <span className="text-[9px] text-[#DB2777] font-semibold">{activeMockText.obdConn}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex-1 flex flex-col gap-3 overflow-y-auto mb-2 pr-1">
                            
                            <div className="self-end max-w-[85%] bg-gray-200 text-gray-800 text-xs p-3 rounded-2xl rounded-tr-none shadow-sm font-['Arimo']">
                              {activeMockText.whatProc}
                            </div>

                            <div className="self-start max-w-[90%] bg-[#FFF0F5] border border-pink-100 text-gray-800 text-[11px] leading-relaxed p-3 rounded-2xl rounded-tl-none shadow-sm flex items-start gap-2">
                              <IconSparkles className="w-4 h-4 text-[#DB2777] shrink-0 mt-0.5" />
                              <div>
                                <p className="font-bold text-[#DB2777] mb-1">{activeMockText.suggDiag}</p>
                                <ol className="list-decimal pl-4 flex flex-col gap-1.5">
                                  <li><strong>Bobinas:</strong> {activeMockText.coilsStep}</li>
                                  <li><strong>Bujía:</strong> {activeMockText.plugsStep}</li>
                                  <li><strong>Inyector:</strong> {activeMockText.injectorStep}</li>
                                </ol>
                              </div>
                            </div>

                          </div>

                          <div className="bg-white border border-gray-200 rounded-xl p-2 flex items-center justify-between shrink-0 shadow-sm">
                            <span className="text-xs text-gray-400 pl-2">{activeMockText.askInput}</span>
                            <div className="w-6 h-6 rounded-lg bg-[#DB2777] flex items-center justify-center text-white cursor-pointer">
                              <IconArrowRight className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </motion.div>
                      )}

                    </AnimatePresence>
                  </div>
                )}

              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Embedded CSS custom Keyframes for the linear animated loading bar */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes features-progress {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
      `}} />

    </div>
  );
}
